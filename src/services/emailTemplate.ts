export const buildProfessionalEmailHtml = (
  sectionTitle: string,
  bodyContent: string,
  brandName: string
) => {
  const year = new Date().getFullYear();

  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>${sectionTitle}</title>

<style>
@media only screen and (max-width: 620px) {
  .container {
    width: 100% !important;
    max-width: 100% !important;
  }

  .mobile-padding {
    padding: 24px !important;
  }

  .hero-title {
    font-size: 26px !important;
  }

  .body-text {
    font-size: 15px !important;
  }

  .logo-text {
    font-size: 24px !important;
  }

  .button {
    width: 100% !important;
    box-sizing: border-box;
  }
}
</style>
</head>

<body style="
    margin: 0;
    padding: 0;
    background-color: #f8fafc;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
">

<table width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td align="center" style="padding: 40px 20px;">

<table
    class="container"
    width="600"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="
        max-width: 600px;
        background-color: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    "
>

<!-- HEADER -->
<tr>
<td
    style="
        background-color: #ffffff;
        padding: 32px 40px;
        border-bottom: 1px solid #e5e7eb;
    "
>

<table width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td>

<table cellpadding="0" cellspacing="0" border="0">
<tr>
<td
    style="
        width: 48px;
        height: 48px;
        background: linear-gradient(135deg, #3b82f6, #1d4ed8);
        border-radius: 12px;
        text-align: center;
        vertical-align: middle;
        font-size: 24px;
    "
>
🎰
</td>
<td style="padding-left: 16px; vertical-align: middle;">
<span
    class="logo-text"
    style="
        color: #1e293b;
        font-size: 22px;
        font-weight: 700;
        letter-spacing: -0.5px;
    "
>
${brandName}
</span>
</td>
</tr>
</table>

</td>
<td align="right" style="vertical-align: middle;">
<a
    href="https://casinoreviewsbook.com"
    style="
        color: #64748b;
        font-size: 13px;
        text-decoration: none;
    "
>
View in browser →
</a>
</td>
</tr>
</table>

</td>
</tr>

<!-- TITLE -->
<tr>
<td class="mobile-padding" style="padding: 48px 40px 24px 40px;">

<h2 class="hero-title" style="
    margin: 0;
    color: #0f172a;
    font-size: 32px;
    line-height: 1.25;
    font-weight: 700;
    letter-spacing: -0.5px;
">
${sectionTitle}
</h2>

</td>
</tr>

<!-- CONTENT -->
<tr>
<td class="mobile-padding" style="padding: 0 40px 32px 40px;">

<div
    class="body-text"
    style="
        color: #475569;
        font-size: 16px;
        line-height: 1.75;
    "
>
${bodyContent}
</div>

</td>
</tr>

<!-- CTA -->
<tr>
<td class="mobile-padding" align="center" style="padding: 0 40px 48px 40px;">

<table cellpadding="0" cellspacing="0" border="0">
<tr>
<td align="center">
<a
    class="button"
    href="https://casinoreviewsbook.com"
    style="
        display: inline-block;
        background-color: #3b82f6;
        color: #ffffff;
        text-decoration: none;
        padding: 14px 32px;
        border-radius: 6px;
        font-size: 15px;
        font-weight: 600;
        letter-spacing: 0.25px;
    "
>
Visit Website
</a>
</td>
</tr>
</table>

</td>
</tr>

<!-- DIVIDER -->
<tr>
<td style="padding: 0 40px;">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td style="border-top: 1px solid #e5e7eb; height: 1px;"></td>
</tr>
</table>
</td>
</tr>

<!-- SOCIAL -->
<tr>
<td style="
    padding: 32px 40px;
    text-align: center;
">

<p style="
    color: #64748b;
    font-size: 13px;
    margin: 0 0 16px 0;
    font-weight: 500;
">
Connect with us
</p>

<table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
<tr>
<td style="padding: 0 8px;">
<a
    href="https://facebook.com"
    style="
        display: inline-block;
        width: 36px;
        height: 36px;
        background-color: #f1f5f9;
        border-radius: 50%;
        text-align: center;
        line-height: 36px;
        text-decoration: none;
        font-size: 16px;
    "
>
📘
</a>
</td>
<td style="padding: 0 8px;">
<a
    href="https://instagram.com"
    style="
        display: inline-block;
        width: 36px;
        height: 36px;
        background-color: #f1f5f9;
        border-radius: 50%;
        text-align: center;
        line-height: 36px;
        text-decoration: none;
        font-size: 16px;
    "
>
📷
</a>
</td>
<td style="padding: 0 8px;">
<a
    href="https://x.com"
    style="
        display: inline-block;
        width: 36px;
        height: 36px;
        background-color: #f1f5f9;
        border-radius: 50%;
        text-align: center;
        line-height: 36px;
        text-decoration: none;
        font-size: 16px;
    "
>
𝕏
</a>
</td>
<td style="padding: 0 8px;">
<a
    href="https://telegram.org"
    style="
        display: inline-block;
        width: 36px;
        height: 36px;
        background-color: #f1f5f9;
        border-radius: 50%;
        text-align: center;
        line-height: 36px;
        text-decoration: none;
        font-size: 16px;
    "
>
✈️
</a>
</td>
</tr>
</table>

</td>
</tr>

<!-- FOOTER -->
<tr>
<td
    style="
        background-color: #f8fafc;
        padding: 40px;
        text-align: center;
        border-top: 1px solid #e5e7eb;
    "
>

<p style="
    margin: 0;
    color: #1e293b;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: -0.25px;
">
${brandName}
</p>

<p style="
    margin: 8px 0;
    color: #64748b;
    font-size: 13px;
">
support@casinoreviewsbook.com
</p>

<p style="
    margin: 24px 0 12px 0;
    color: #94a3b8;
    font-size: 12px;
    line-height: 1.6;
">
© ${year} ${brandName}. All rights reserved.
</p>

<table cellpadding="0" cellspacing="0" border="0" style="margin: 16px auto;">
<tr>
<td style="padding: 0 12px;">
<a
    href="https://casinoreviewsbook.com/privacy"
    style="
        color: #64748b;
        text-decoration: none;
        font-size: 12px;
    "
>
Privacy Policy
</a>
</td>
<td style="padding: 0 12px; color: #cbd5e1; font-size: 12px;">•</td>
<td style="padding: 0 12px;">
<a
    href="https://casinoreviewsbook.com/terms"
    style="
        color: #64748b;
        text-decoration: none;
        font-size: 12px;
    "
>
Terms of Service
</a>
</td>
</tr>
</table>

<p style="
    margin-top: 24px;
    color: #94a3b8;
    font-size: 12px;
    line-height: 1.6;
">
You received this email because you subscribed to ${brandName}.<br>
To stop receiving these emails, you can unsubscribe below.
</p>

<p style="margin-top: 16px;">
<a
    href="{{unsubscribe_url}}"
    style="
        color: #3b82f6;
        text-decoration: none;
        font-size: 13px;
        font-weight: 500;
    "
>
Unsubscribe from emails
</a>
</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
};