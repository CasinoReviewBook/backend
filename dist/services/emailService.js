"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleCampaign = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const prisma_1 = __importDefault(require("./prisma"));
const emailTemplate_1 = require("./emailTemplate");
const transporter = nodemailer_1.default.createTransport({
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
    }
    else {
        console.log('SMTP Server Ready');
    }
});
const getBrandName = async () => {
    try {
        const settings = await prisma_1.default.siteSetting.findUnique({
            where: { id: 1 },
            select: { site_name: true },
        });
        return settings?.site_name?.trim() || 'CasinoLab';
    }
    catch {
        return 'CasinoLab';
    }
};
const scheduleCampaign = async (campaignId, subject, body, target) => {
    try {
        const brandName = await getBrandName();
        const html = (0, emailTemplate_1.buildProfessionalEmailHtml)(subject, body, brandName);
        let recipients = [];
        if (target === 'newsletter') {
            const subscribers = await prisma_1.default.newsletterSubscriber.findMany({
                select: {
                    email: true,
                },
            });
            recipients = subscribers.map(s => s.email);
        }
        if (target === 'all_users') {
            const users = await prisma_1.default.user.findMany({
                select: {
                    email: true,
                },
            });
            recipients = users.map(u => u.email);
        }
        if (recipients.length === 0) {
            console.warn('No recipients found for campaign. Target:', target);
            await prisma_1.default.emailCampaign.update({
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
        await prisma_1.default.emailCampaign.update({
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
            }
            catch (error) {
                failedCount++;
                console.error(`Failed sending to ${email}`);
                console.error(error);
            }
        }
        await prisma_1.default.emailCampaign.update({
            where: {
                id: campaignId,
            },
            data: {
                status: 'completed',
                sent_count: sentCount,
            },
        });
        console.log(`Campaign completed. Sent: ${sentCount}, Failed: ${failedCount}`);
        return {
            sentCount,
            failedCount,
        };
    }
    catch (error) {
        console.error(error);
        await prisma_1.default.emailCampaign.update({
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
exports.scheduleCampaign = scheduleCampaign;
//# sourceMappingURL=emailService.js.map