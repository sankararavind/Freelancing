import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);

/**
 * EmailJS configuration.
 * 1. Create a free account at https://www.emailjs.com
 * 2. Add an email service connected to aravindofficial656@gmail.com  → copy its Service ID
 * 3. Create an email template (paste the HTML from EMAIL_TEMPLATE.md) → copy its Template ID
 * 4. Account → API keys → copy your Public Key
 * 5. Replace the three placeholders below.
 */
const EMAILJS_CONFIG = {
  serviceId: 'service_w1hogks',
  templateId: 'template_p7bmayr',
  publicKey: 'b7cy6FrjVeMjH6HJ0'
};

const CONTACT_EMAIL = 'aravindofficial656@gmail.com';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="contact-section" id="contact">
      <div class="container glass">
        <div class="aura"></div>

        <div class="contact-grid">
          <div class="contact-info">
            <span class="eyebrow"><i class="dot"></i>CONTACT</span>
            <h2 class="title">
              <span class="line"><span class="tw">Let's</span><span class="tw">build</span></span>
              <span class="line"><span class="tw">something</span><span class="tw gradient">great.</span></span>
            </h2>
            <p class="intro">Tell me about your project, or just say hello.</p>
            <div class="social-links">
              <a href="#" class="social-link"
                 *ngFor="let s of socials"
                 (mouseenter)="hoverSocial($event, true)"
                 (mouseleave)="hoverSocial($event, false)">
                <span class="sl-dot"></span>
                {{ s }}
              </a>
            </div>

            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">Email</span>
                <a class="info-value email-link" href="mailto:aravindofficial656&#64;gmail.com">aravindofficial656&#64;gmail.com</a>
              </div>
              <div class="info-item">
                <span class="info-label">Based in</span>
                <span class="info-value">India</span>
              </div>
            </div>
          </div>

          <form (ngSubmit)="sendEmail()" #contactForm="ngForm" class="contact-form">
            <div class="input-group" [class.filled]="!!formData.from_name" [class.focused]="focused === 'name'">
              <label>Your name</label>
              <input type="text" name="from_name"
                     [(ngModel)]="formData.from_name"
                     (focus)="focused = 'name'"
                     (blur)="focused = null"
                     required>
              <span class="input-underline"></span>
            </div>
            <div class="input-group" [class.filled]="!!formData.reply_to" [class.focused]="focused === 'email'">
              <label>Your email</label>
              <input type="email" name="reply_to"
                     [(ngModel)]="formData.reply_to"
                     (focus)="focused = 'email'"
                     (blur)="focused = null"
                     required>
              <span class="input-underline"></span>
            </div>
            <div class="input-group" [class.filled]="!!formData.message" [class.focused]="focused === 'message'">
              <label>Your message</label>
              <textarea name="message" rows="5"
                        [(ngModel)]="formData.message"
                        (focus)="focused = 'message'"
                        (blur)="focused = null"
                        required></textarea>
              <span class="input-underline"></span>
            </div>

            <button type="submit"
                    [disabled]="isSending"
                    class="submit-btn"
                    [class.sending]="isSending"
                    (click)="ripple($event)">
              <span class="btn-label">
                <span class="bl-text" *ngIf="!isSending">Send Message</span>
                <span class="bl-text sending" *ngIf="isSending">
                  Sending
                  <i class="dot-loader"></i>
                  <i class="dot-loader"></i>
                  <i class="dot-loader"></i>
                </span>
              </span>
              <span class="btn-arrow" *ngIf="!isSending">→</span>
            </button>

            <p *ngIf="statusMessage"
               [class.error]="statusType === 'error'"
               class="status-msg">
              <i class="status-dot"></i>
              {{ statusMessage }}
            </p>
          </form>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact-section {
      padding: 100px 0;
      margin-bottom: 50px;
    }

    .container {
      width: 90%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 80px;
      border-radius: 50px;
      position: relative;
      overflow: hidden;
    }

    .aura {
      position: absolute;
      top: -30%;
      right: -20%;
      width: 600px;
      height: 600px;
      background: radial-gradient(circle, var(--accent-color), transparent 70%);
      filter: blur(100px);
      opacity: 0.25;
      animation: floatY 8s ease-in-out infinite;
      pointer-events: none;
    }

    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 100px;
      position: relative;
      z-index: 1;
    }

    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 0.75rem;
      letter-spacing: 3px;
      color: var(--accent-color);
      margin-bottom: 18px;
      font-weight: 700;
    }

    .dot {
      width: 6px; height: 6px; background: var(--accent-color); border-radius: 50%;
      animation: pulseGlow 2s ease-in-out infinite;
    }

    .title {
      font-size: clamp(2.2rem, 4.5vw, 4rem);
      line-height: 1.1;
      margin-bottom: 20px;
    }

    .line {
      display: block;
      overflow: hidden;
    }

    .tw {
      display: inline-block;
      margin-right: 0.35em;
      opacity: 0;
      transform: translateY(100%);
    }

    .tw.gradient {
      background: linear-gradient(90deg, var(--accent-color), #ff9a3c);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .intro {
      color: var(--text-secondary);
      font-size: 1.15rem;
      margin-bottom: 35px;
      opacity: 0;
      transform: translateY(20px);
    }

    .social-links {
      display: flex;
      flex-wrap: wrap;
      gap: 18px;
      margin-bottom: 50px;
    }

    .social-link {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 18px;
      border-radius: 30px;
      border: 1px solid rgba(255,255,255,0.08);
      color: var(--text-secondary);
      font-weight: 600;
      font-size: 0.85rem;
      transition: color 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .sl-dot {
      width: 6px;
      height: 6px;
      background: var(--accent-color);
      border-radius: 50%;
      transform: scale(0);
      transition: transform 0.3s ease;
    }

    .social-link:hover {
      color: #fff;
      border-color: var(--accent-color);
      transform: translateY(-3px);
    }

    .social-link:hover .sl-dot {
      transform: scale(1);
    }

    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      padding-top: 30px;
      border-top: 1px solid rgba(255,255,255,0.06);
    }

    .info-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .info-label {
      font-size: 0.7rem;
      letter-spacing: 2px;
      color: rgba(255,255,255,0.35);
      font-weight: 700;
      text-transform: uppercase;
    }

    .info-value {
      font-size: 1rem;
      font-weight: 600;
    }

    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 28px;
    }

    .input-group {
      position: relative;
      padding-top: 22px;
    }

    .input-group label {
      position: absolute;
      top: 34px;
      left: 20px;
      font-size: 0.95rem;
      color: var(--text-secondary);
      pointer-events: none;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      letter-spacing: 0;
      text-transform: none;
      font-weight: 500;
    }

    .input-group.filled label,
    .input-group.focused label {
      top: 0;
      left: 0;
      font-size: 0.72rem;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--accent-color);
      font-weight: 700;
    }

    .input-group input, .input-group textarea {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.08);
      padding: 16px 20px;
      border-radius: 15px;
      color: #fff;
      font-family: inherit;
      font-size: 1rem;
      outline: none;
      width: 100%;
      transition: background 0.3s ease, border-color 0.3s ease;
      position: relative;
    }

    .input-group input:focus, .input-group textarea:focus {
      border-color: rgba(255, 77, 0, 0.5);
      background: rgba(255, 255, 255, 0.06);
    }

    .input-underline {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 2px;
      border-radius: 2px;
      background: var(--accent-color);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .input-group.focused .input-underline {
      transform: scaleX(1);
    }

    .submit-btn {
      padding: 18px;
      border-radius: 15px;
      background: #fff;
      color: #000;
      font-weight: 700;
      font-size: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      transition: color 0.3s ease;
      position: relative;
      overflow: hidden;
      margin-top: 10px;
    }

    .submit-btn::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, var(--accent-color), #ff9a3c);
      transform: translateX(-100%);
      transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      z-index: 0;
    }

    .submit-btn:hover:not(:disabled) {
      color: #fff;
    }

    .submit-btn:hover:not(:disabled)::before {
      transform: translateX(0);
    }

    .btn-label, .btn-arrow {
      position: relative;
      z-index: 1;
    }

    .btn-arrow {
      transition: transform 0.3s ease;
    }

    .submit-btn:hover .btn-arrow {
      transform: translateX(6px);
    }

    .submit-btn:disabled {
      opacity: 0.85;
      cursor: not-allowed;
    }

    .bl-text.sending {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .dot-loader {
      width: 5px; height: 5px; border-radius: 50%;
      background: currentColor;
      animation: bounce 1.2s ease-in-out infinite;
    }
    .dot-loader:nth-child(1) { animation-delay: 0s; }
    .dot-loader:nth-child(2) { animation-delay: 0.2s; }
    .dot-loader:nth-child(3) { animation-delay: 0.4s; }

    @keyframes bounce {
      0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
      40%           { transform: translateY(-6px); opacity: 1; }
    }

    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 77, 0, 0.4);
      pointer-events: none;
      transform: scale(0);
      animation: rippleOut 0.7s ease-out forwards;
      z-index: 0;
    }

    @keyframes rippleOut {
      to { transform: scale(4); opacity: 0; }
    }

    .status-msg {
      margin-top: 10px;
      font-size: 0.9rem;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      animation: fadeIn 0.5s ease;
    }

    .status-msg .status-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: #4ade80;
    }

    .status-msg.error .status-dot {
      background: #ff4444;
    }

    .status-msg.error {
      color: #ff4444;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to   { opacity: 1; transform: translateY(0);   }
    }

    .email-link {
      transition: color 0.3s ease;
    }
    .email-link:hover {
      color: var(--accent-color);
    }

    @media (max-width: 1024px) {
      .contact-grid { grid-template-columns: 1fr; gap: 60px; }
      .container    { padding: 50px; }
    }
  `]
})
export class ContactComponent implements AfterViewInit {
  formData = { from_name: '', reply_to: '', message: '' };

  socials = ['LinkedIn', 'Twitter', 'Dribbble', 'GitHub'];
  focused: 'name' | 'email' | 'message' | null = null;

  isSending = false;
  statusMessage = '';
  statusType: 'success' | 'error' = 'success';

  ngAfterViewInit() {
    gsap.to('.contact-section .tw', {
      scrollTrigger: { trigger: '.contact-section', start: 'top 75%' },
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.08,
      ease: 'power4.out'
    });

    gsap.to('.contact-section .intro', {
      scrollTrigger: { trigger: '.contact-section', start: 'top 75%' },
      y: 0,
      opacity: 1,
      duration: 1,
      delay: 0.4,
      ease: 'power3.out'
    });

    gsap.from('.contact-form .input-group', {
      scrollTrigger: { trigger: '.contact-form', start: 'top 85%' },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out'
    });

    gsap.from('.contact-form .submit-btn', {
      scrollTrigger: { trigger: '.contact-form', start: 'top 85%' },
      y: 30,
      opacity: 0,
      duration: 0.9,
      delay: 0.5,
      ease: 'power3.out'
    });

    gsap.from('.social-link', {
      scrollTrigger: { trigger: '.social-links', start: 'top 90%' },
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power3.out'
    });
  }

  hoverSocial(event: MouseEvent, enter: boolean) {
    const el = event.currentTarget as HTMLElement;
    gsap.to(el, {
      scale: enter ? 1.05 : 1,
      duration: 0.4,
      ease: 'power2.out'
    });
  }

  ripple(event: MouseEvent) {
    const btn = event.currentTarget as HTMLElement;
    const rect = btn.getBoundingClientRect();
    const circle = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    circle.className = 'ripple';
    circle.style.width = circle.style.height = `${size}px`;
    circle.style.left = `${event.clientX - rect.left - size / 2}px`;
    circle.style.top = `${event.clientY - rect.top - size / 2}px`;
    btn.appendChild(circle);
    setTimeout(() => circle.remove(), 700);
  }

  async sendEmail() {
    if (this.isSending) return;
    this.isSending = true;
    this.statusMessage = '';

    const templateParams = {
      from_name: this.formData.from_name,
      reply_to: this.formData.reply_to,
      message: this.formData.message,
      to_email: CONTACT_EMAIL,
      sent_at: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
    };

    // Until the EmailJS credentials are filled in, fall back to a mailto draft
    if (EMAILJS_CONFIG.serviceId === 'YOUR_SERVICE_ID') {
      this.isSending = false;
      this.statusType = 'success';
      this.statusMessage = 'Opening your email app… (add EmailJS keys to send automatically)';
      const subject = encodeURIComponent(`New project enquiry from ${this.formData.from_name}`);
      const body = encodeURIComponent(
        `Name: ${this.formData.from_name}\nEmail: ${this.formData.reply_to}\n\n${this.formData.message}`
      );
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      return;
    }

    try {
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams,
        { publicKey: EMAILJS_CONFIG.publicKey }
      );
      this.isSending = false;
      this.statusType = 'success';
      this.statusMessage = "Message sent — I'll get back to you within a day.";
      this.formData = { from_name: '', reply_to: '', message: '' };
    } catch (err) {
      console.error('EmailJS error:', err);
      this.isSending = false;
      this.statusType = 'error';
      this.statusMessage = 'Something went wrong. Please email aravindofficial656@gmail.com directly.';
    }
  }
}
