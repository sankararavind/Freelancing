import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="services-section" id="services">
      <div class="container">
        <div class="section-header">
          <span class="eyebrow">
            <i class="dot"></i>
            SERVICES
          </span>
          <h2 class="title">
            <span class="title-word" *ngFor="let w of titleWords">{{ w }}&nbsp;</span>
          </h2>
          <p class="subtitle">Specialized in creating digital excellence</p>
        </div>

        <div class="services-grid">
          <div class="service-card glass"
               #card
               *ngFor="let service of services; let i = index"
               [class.has-demo]="!!service.link"
               (mousemove)="onTilt($event, i)"
               (mouseleave)="onTiltLeave(i)"
               (click)="openDemo(service)">
            <div class="card-inner">
              <div class="card-number">0{{ i + 1 }}</div>
              <span class="live-pill" *ngIf="service.link">
                <span class="live-dot"></span>
                Live demo
              </span>
              <div class="icon-box">
                <span class="icon-glyph">{{service.icon}}</span>
                <span class="icon-ring"></span>
              </div>
              <h3>{{service.title}}</h3>
              <p>{{service.desc}}</p>
              <div class="tags">
                <span *ngFor="let tag of service.tags">{{tag}}</span>
              </div>
              <div class="learn-more">
                <span>{{ service.link ? 'View live demo' : 'Available on request' }}</span>
                <span class="lm-arrow">{{ service.link ? '↗' : '→' }}</span>
              </div>
            </div>
            <div class="shimmer"></div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .services-section {
      padding: 150px 0;
      position: relative;
    }

    .container {
      width: 90%;
      max-width: 1200px;
      margin: 0 auto;
    }

    .section-header {
      margin-bottom: 80px;
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
      width: 6px;
      height: 6px;
      background: var(--accent-color);
      border-radius: 50%;
      animation: pulseGlow 2s ease-in-out infinite;
    }

    .title {
      font-size: clamp(2.5rem, 5vw, 3.5rem);
      margin-bottom: 15px;
      overflow: hidden;
    }

    .title-word {
      display: inline-block;
      opacity: 0;
      transform: translateY(100%);
    }

    .subtitle {
      color: var(--text-secondary);
      font-size: 1.1rem;
      opacity: 0;
      transform: translateY(20px);
    }

    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
      gap: 30px;
    }

    .service-card {
      padding: 0;
      border-radius: 30px;
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                  border-color 0.4s ease, background 0.4s ease;
      position: relative;
      overflow: hidden;
      transform-style: preserve-3d;
      will-change: transform;
    }

    .card-inner {
      padding: 50px 40px;
      position: relative;
      z-index: 2;
      transform: translateZ(30px);
    }

    .service-card:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: var(--accent-color);
    }

    .card-number {
      position: absolute;
      top: 30px;
      right: 30px;
      font-size: 0.75rem;
      color: rgba(255,255,255,0.25);
      letter-spacing: 2px;
      font-weight: 700;
    }

    .icon-box {
      position: relative;
      width: 70px;
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.2rem;
      margin-bottom: 30px;
      color: var(--accent-color);
    }

    .icon-glyph {
      display: inline-block;
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .service-card:hover .icon-glyph {
      transform: rotate(360deg) scale(1.15);
    }

    .icon-ring {
      position: absolute;
      inset: 0;
      border: 1px dashed rgba(255, 77, 0, 0.35);
      border-radius: 50%;
      animation: spinSlow 12s linear infinite;
    }

    .service-card h3 {
      font-size: 1.5rem;
      margin-bottom: 20px;
      transition: transform 0.4s ease;
    }

    .service-card:hover h3 {
      transform: translateX(4px);
    }

    .service-card p {
      color: var(--text-secondary);
      margin-bottom: 30px;
      font-size: 0.95rem;
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 30px;
    }

    .tags span {
      font-size: 0.75rem;
      padding: 6px 14px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 15px;
      color: var(--text-secondary);
      border: 1px solid rgba(255,255,255,0.08);
      transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease;
    }

    .service-card:hover .tags span {
      background: rgba(255, 77, 0, 0.08);
      color: #fff;
    }

    .tags span:hover {
      transform: translateY(-3px);
      background: var(--accent-color);
      color: #fff;
    }

    .learn-more {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 0.85rem;
      font-weight: 600;
      color: #fff;
      opacity: 0;
      transform: translateY(10px);
      transition: opacity 0.4s ease, transform 0.4s ease;
    }

    .service-card:hover .learn-more {
      opacity: 1;
      transform: translateY(0);
    }

    .lm-arrow {
      transition: transform 0.35s ease;
    }

    .service-card:hover .lm-arrow {
      transform: translateX(6px);
    }

    .shimmer {
      position: absolute;
      top: 0;
      left: -100%;
      width: 60%;
      height: 100%;
      background: linear-gradient(
        110deg,
        transparent,
        rgba(255, 255, 255, 0.06),
        transparent
      );
      transform: skewX(-20deg);
      transition: left 0.9s cubic-bezier(0.16, 1, 0.3, 1);
      z-index: 1;
      pointer-events: none;
    }

    .service-card:hover .shimmer {
      left: 200%;
    }

    .service-card.has-demo {
      cursor: pointer;
    }

    .service-card.has-demo:hover {
      border-color: var(--accent-color);
      box-shadow: 0 30px 60px rgba(255, 77, 0, 0.18);
    }

    .live-pill {
      position: absolute;
      top: 30px;
      left: 30px;
      z-index: 3;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 12px;
      border-radius: 999px;
      background: rgba(255, 77, 0, 0.12);
      border: 1px solid rgba(255, 77, 0, 0.35);
      color: var(--accent-color);
      font-size: 0.65rem;
      letter-spacing: 0.2em;
      font-weight: 700;
      text-transform: uppercase;
    }

    .live-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--accent-color);
      box-shadow: 0 0 0 0 rgba(255, 77, 0, 0.6);
      animation: livePulse 1.8s ease-out infinite;
    }

    @keyframes livePulse {
      0%   { box-shadow: 0 0 0 0    rgba(255, 77, 0, 0.6); }
      80%  { box-shadow: 0 0 0 10px rgba(255, 77, 0, 0); }
      100% { box-shadow: 0 0 0 0    rgba(255, 77, 0, 0); }
    }
  `]
})
export class ServicesComponent implements AfterViewInit {
  @ViewChildren('card') cards!: QueryList<ElementRef<HTMLElement>>;

  titleWords = ['Services', 'that', 'ship.'];

  services: Array<{
    title: string;
    icon: string;
    desc: string;
    tags: string[];
    link?: string;
  }> = [
    {
      title: "Restaurant Sites",
      icon: "◆",
      desc: "Mouth-watering menus, table reservations, and online ordering built to fill seats.",
      tags: ["Menus", "Reservations", "Online Order"],
      link: "https://sankararavind.github.io/paradize/"
    },
    {
      title: "Hospital Sites",
      icon: "✚",
      desc: "Trustworthy hospital and clinic websites with appointments and doctor profiles.",
      tags: ["Appointments", "Doctors", "Patient Portal"],
      link: "https://sankararavind.github.io/DemoHospital/"
    },
    {
      title: "E-commerce Stores",
      icon: "⬢",
      desc: "Fast, conversion-focused online stores with carts, secure checkout, and easy product management.",
      tags: ["Cart & Checkout", "Payments", "Inventory"]
    },
    {
      title: "Event Management",
      icon: "✺",
      desc: "Eye-catching websites for event planners with galleries, packages, and instant enquiries.",
      tags: ["Galleries", "Packages", "Enquiries"],
      link: "https://mahadevevent.netlify.app/"
    },
    {
      title: "Business Applications",
      icon: "✦",
      desc: "Streamlining operations for small-scale companies with custom digital solutions.",
      tags: ["CRM", "Inventory", "Dashboards"]
    }
  ];

  openDemo(service: { link?: string }) {
    if (service.link) {
      window.open(service.link, '_blank', 'noopener,noreferrer');
    }
  }

  ngAfterViewInit() {
    gsap.to('.title-word', {
      scrollTrigger: { trigger: '.services-section', start: 'top 75%' },
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power4.out'
    });

    gsap.to('.subtitle', {
      scrollTrigger: { trigger: '.services-section', start: 'top 75%' },
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.3,
      ease: 'power3.out'
    });

    gsap.from('.service-card', {
      scrollTrigger: { trigger: '.services-grid', start: 'top 80%' },
      opacity: 0,
      y: 80,
      rotateX: -20,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power4.out'
    });
  }

  onTilt(event: MouseEvent, idx: number) {
    const el = this.cards.toArray()[idx]?.nativeElement;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, {
      rotateY: px * 12,
      rotateX: -py * 12,
      y: -8,
      transformPerspective: 900,
      duration: 0.4,
      ease: 'power2.out'
    });
  }

  onTiltLeave(idx: number) {
    const el = this.cards.toArray()[idx]?.nativeElement;
    if (!el) return;
    gsap.to(el, {
      rotateY: 0, rotateX: 0, y: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.5)'
    });
  }
}
