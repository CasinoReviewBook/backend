import nodemailer from 'nodemailer';
import prisma from './prisma';
import { buildProfessionalEmailHtml } from './emailTemplate';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP Connection Failed');
    console.error(error);
  } else {
    console.log('SMTP Server Ready');
  }
});

const getBrandName = async (): Promise<string> => {
  try {
    const settings = await prisma.siteSetting.findUnique({
      where: { id: 1 },
      select: { site_name: true },
    });
    return settings?.site_name?.trim() || 'CasinoLab';
  } catch {
    return 'CasinoLab';
  }
};

export const scheduleCampaign = async (
  campaignId: string,
  subject: string,
  body: string,
  target: string
) => {
  try {
    const brandName = await getBrandName();
    const html = buildProfessionalEmailHtml(subject, body, brandName);

    let recipients: string[] = [];

    if (target === 'newsletter') {
      const subscribers =
        await prisma.newsletterSubscriber.findMany({
          select: {
            email: true,
          },
        });

      recipients = subscribers.map(s => s.email);
    }

    if (target === 'all_users') {
      const users =
        await prisma.user.findMany({
          select: {
            email: true,
          },
        });

      recipients = users.map(u => u.email);
    }

    if (recipients.length === 0) {
      console.warn('No recipients found for campaign. Target:', target);
      
      await prisma.emailCampaign.update({
        where: {
          id: campaignId,
        },
        data: {
          status: 'completed',
          sent_count: 0,
        },
      });

      return {
        sentCount: 0,
        failedCount: 0,
      };
    }

    await prisma.emailCampaign.update({
      where: {
        id: campaignId,
      },
      data: {
        status: 'sending',
      },
    });

    let sentCount = 0;
    let failedCount = 0;

    for (const email of recipients) {
      try {
        await transporter.sendMail({
          from: process.env.SMTP_FROM,
          to: email,
          subject,
          html,
        });

        sentCount++;

        console.log(`Email sent to ${email}`);
      } catch (error) {
        failedCount++;

        console.error(`Failed sending to ${email}`);
        console.error(error);
      }
    }

    await prisma.emailCampaign.update({
      where: {
        id: campaignId,
      },
      data: {
        status: 'completed',
        sent_count: sentCount,
      },
    });

    console.log(
      `Campaign completed. Sent: ${sentCount}, Failed: ${failedCount}`
    );

    return {
      sentCount,
      failedCount,
    };
  } catch (error) {
    console.error(error);

    await prisma.emailCampaign.update({
      where: {
        id: campaignId,
      },
      data: {
        status: 'failed',
      },
    });

    throw error;
  }
};