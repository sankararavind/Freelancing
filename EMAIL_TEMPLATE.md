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
<html>
  <body style="margin:0;padding:0;background:#0b0b0c;font-family:'Segoe UI',Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0b0b0c;padding:32px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0"
                 style="background:#141416;border:1px solid rgba(255,255,255,0.08);border-radius:18px;overflow:hidden;">
            <!-- Header -->
            <tr>
              <td style="background:linear-gradient(135deg,#ff4d00,#ff9a3c);padding:28px 36px;">
                <p style="margin:0;font-size:12px;letter-spacing:3px;color:rgba(0,0,0,0.6);font-weight:700;">NEW PROJECT ENQUIRY</p>
                <h1 style="margin:6px 0 0;font-size:26px;color:#0b0b0c;font-weight:800;">Someone reached out from your portfolio</h1>
              </td>
            </tr>
            <!-- Body -->
            <tr>
              <td style="padding:36px;">
                <p style="margin:0 0 6px;font-size:11px;letter-spacing:2px;color:#ff9a3c;font-weight:700;">FROM</p>
                <p style="margin:0 0 22px;font-size:20px;color:#ffffff;font-weight:700;">{{from_name}}</p>

                <p style="margin:0 0 6px;font-size:11px;letter-spacing:2px;color:#ff9a3c;font-weight:700;">EMAIL</p>
                <p style="margin:0 0 22px;font-size:16px;">
                  <a href="mailto:{{reply_to}}" style="color:#ff9a3c;text-decoration:none;">{{reply_to}}</a>
                </p>

                <p style="margin:0 0 6px;font-size:11px;letter-spacing:2px;color:#ff9a3c;font-weight:700;">MESSAGE</p>
                <div style="background:#1d1d20;border-left:3px solid #ff4d00;border-radius:8px;padding:18px 20px;">
                  <p style="margin:0;font-size:15px;line-height:1.6;color:#e6e6e6;white-space:pre-wrap;">{{message}}</p>
                </div>

                <a href="mailto:{{reply_to}}?subject=Re:%20your%20enquiry"
                   style="display:inline-block;margin-top:28px;background:#ff4d00;color:#0b0b0c;
                          font-weight:700;font-size:14px;text-decoration:none;padding:14px 28px;border-radius:30px;">
                  Reply to {{from_name}} &rarr;
                </a>
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td style="padding:20px 36px;border-top:1px solid rgba(255,255,255,0.06);">
                <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.4);">
                  Sent {{sent_at}} &middot; Aravind — Full Stack Developer
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
