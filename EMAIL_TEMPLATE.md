# Contact form → email setup (EmailJS)

The contact form on the portfolio sends to **aravindofficial656@gmail.com**.
Until you add your EmailJS keys it falls back to opening the visitor's mail
app with a pre-filled draft. To make it send automatically with the nice
template below, do the 5 steps in
[contact.component.ts](src/app/components/contact/contact.component.ts) and
paste the template here into EmailJS.

## 1. Create the EmailJS account & service

1. Sign up free at https://www.emailjs.com (200 emails/month free).
2. **Email Services → Add New Service → Gmail** → connect
   `aravindofficial656@gmail.com`. Copy the **Service ID**.
3. **Account → API Keys** → copy the **Public Key**.

## 2. Create the template

**Email Templates → Create New Template.**

- **To Email**: `{{to_email}}`  (or hardcode `aravindofficial656@gmail.com`)
- **From Name**: `{{from_name}} via Portfolio`
- **Reply To**: `{{reply_to}}`
- **Subject**: `New enquiry from {{from_name}}`

Switch the content editor to **Code / HTML** and paste:

```html
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="color-scheme" content="dark light">
  <meta name="supported-color-schemes" content="dark light">
  <title>New enquiry</title>
  <style>
    /* Mobile overrides — applied by clients that support media queries.
       Everything also has inline styles so it degrades gracefully. */
    @media only screen and (max-width:600px) {
      .wrap        { padding:16px 0 !important; }
      .card        { width:100% !important; border-radius:0 !important; }
      .pad         { padding:24px 22px !important; }
      .pad-header  { padding:22px 22px !important; }
      .h1          { font-size:21px !important; line-height:1.25 !important; }
      .from-name   { font-size:18px !important; }
      .cta         { display:block !important; text-align:center !important; }
    }
    a { text-decoration:none; }
  </style>
</head>
  <body style="margin:0;padding:0;width:100%;background:#0b0b0c;font-family:'Segoe UI',Arial,sans-serif;-webkit-text-size-adjust:100%;">
    <!-- Hidden preview text -->
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
      New project enquiry from {{from_name}} &mdash; tap to read and reply.
    </div>

    <table role="presentation" class="wrap" width="100%" cellpadding="0" cellspacing="0" border="0"
           style="background:#0b0b0c;padding:32px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" class="card" width="100%" cellpadding="0" cellspacing="0" border="0"
                 style="width:100%;max-width:600px;background:#141416;border:1px solid rgba(255,255,255,0.08);border-radius:18px;overflow:hidden;">
            <!-- Header -->
            <tr>
              <td class="pad-header" style="background:#ff4d00;background:linear-gradient(135deg,#ff4d00,#ff9a3c);padding:28px 36px;">
                <p style="margin:0;font-size:12px;letter-spacing:3px;color:rgba(0,0,0,0.6);font-weight:700;">NEW PROJECT ENQUIRY</p>
                <h1 class="h1" style="margin:6px 0 0;font-size:26px;color:#0b0b0c;font-weight:800;line-height:1.2;">Someone reached out from your portfolio</h1>
              </td>
            </tr>
            <!-- Body -->
            <tr>
              <td class="pad" style="padding:36px;">
                <p style="margin:0 0 6px;font-size:11px;letter-spacing:2px;color:#ff9a3c;font-weight:700;">FROM</p>
                <p class="from-name" style="margin:0 0 22px;font-size:20px;color:#ffffff;font-weight:700;">{{from_name}}</p>

                <p style="margin:0 0 6px;font-size:11px;letter-spacing:2px;color:#ff9a3c;font-weight:700;">EMAIL</p>
                <p style="margin:0 0 22px;font-size:16px;word-break:break-all;">
                  <a href="mailto:{{reply_to}}" style="color:#ff9a3c;text-decoration:none;">{{reply_to}}</a>
                </p>

                <p style="margin:0 0 6px;font-size:11px;letter-spacing:2px;color:#ff9a3c;font-weight:700;">MESSAGE</p>
                <div style="background:#1d1d20;border-left:3px solid #ff4d00;border-radius:8px;padding:18px 20px;">
                  <p style="margin:0;font-size:15px;line-height:1.6;color:#e6e6e6;white-space:pre-wrap;word-break:break-word;">{{message}}</p>
                </div>

                <!-- Bulletproof button -->
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;">
                  <tr>
                    <td align="center" bgcolor="#ff4d00" style="border-radius:30px;">
                      <a href="mailto:{{reply_to}}?subject=Re:%20your%20enquiry" class="cta"
                         style="display:inline-block;background:#ff4d00;color:#0b0b0c;font-weight:700;font-size:14px;text-decoration:none;padding:14px 28px;border-radius:30px;">
                        Reply to {{from_name}} &rarr;
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td class="pad" style="padding:20px 36px;border-top:1px solid rgba(255,255,255,0.06);">
                <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.4);">
                  Sent {{sent_at}} &middot; Aravind &mdash; Full Stack Developer
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
```

### What makes it phone-friendly

- **Fluid table** (`width:100%; max-width:600px`) instead of a fixed `width="600"` — never overflows a narrow screen, even in clients that ignore the media query.
- **Viewport meta** so mobile webmail scales to device width.
- **Media-query overrides** shrink padding/headings and edge-to-edge the card under 600px (Apple Mail, Gmail app on iOS, etc.).
- **Bulletproof button** built as a table cell with `bgcolor` so the gradient/CTA still renders in Outlook and old Android clients.
- **`word-break`** on the email + message so long addresses or unbroken strings don't force horizontal scroll.
- **Solid-color fallback** behind the gradient header for clients that drop `linear-gradient`.

Save the template and copy its **Template ID**.

## 3. Plug the keys in

In [contact.component.ts](src/app/components/contact/contact.component.ts),
replace the placeholders in `EMAILJS_CONFIG`:

```ts
const EMAILJS_CONFIG = {
  serviceId: 'service_xxxxxxx',
  templateId: 'template_xxxxxxx',
  publicKey: 'xxxxxxxxxxxxxxxx'
};
```

Commit + push — once GitHub Pages redeploys, every form submission lands in
**aravindofficial656@gmail.com** with the branded template above, and the
visitor sees "Message sent — I'll get back to you within a day."
