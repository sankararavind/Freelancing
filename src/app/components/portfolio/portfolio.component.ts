import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="portfolio-section" id="works">
      <!-- Marquee band -->
      <div class="marquee">
        <div class="marquee-track">
          <span *ngFor="let t of marqueeItems">{{ t }} <i>✦</i></span>
          <span *ngFor="let t of marqueeItems">{{ t }} <i>✦</i></span>
        </div>
      </div>

      <div class="container">
        <div class="section-header">
          <span class="eyebrow"><i class="dot"></i>PORTFOLIO</span>
          <h2 class="title">
            <span class="t-word" *ngFor="let w of titleWords">{{ w }}&nbsp;</span>
          </h2>
          <p class="subtitle">A collection of digital products and brand identities</p>
        </div>

        <div class="portfolio-grid">
          <div class="project-card"
               #card
               *ngFor="let project of projects; let i = index"
               (mousemove)="onCardMove($event, i)"
               (mouseleave)="onCardLeave(i)">
            <div class="image-wrapper">
              <div class="mask-reveal"></div>
              <div class="project-img glass" #img>
                <div class="placeholder-icon">{{project.icon}}</div>
                <div class="grid-bg"></div>
              </div>
              <div class="overlay">
                <button class="view-btn">
                  <span>View Project</span>
                  <span class="vb-arrow">→</span>
                </button>
              </div>
              <span class="corner-tag">0{{ i + 1 }}</span>
            </div>
            <div class="project-info">
              <div class="info-top">
                <span class="category">{{project.category}}</span>
                <span class="year">{{ project.year }}</span>
              </div>
              <h3 class="project-title">
                <span class="pt-text">{{project.title}}</span>
                <span class="pt-text pt-clone">{{project.title}}</span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .portfolio-section {
      padding: 100px 0;
      position: relative;
    }

    /* Marquee */
    .marquee {
      overflow: hidden;
      border-top: 1px solid rgba(255,255,255,0.06);
      border-bottom: 1px solid rgba(255,255,255,0.06);
      padding: 22px 0;
      margin-bottom: 100px;
    }

    .marquee-track {
      display: inline-flex;
      gap: 60px;
      white-space: nowrap;
      animation: marquee 30s linear infinite;
      font-size: clamp(1.4rem, 3vw, 2.2rem);
      font-weight: 800;
      letter-spacing: -0.02em;
      color: rgba(255,255,255,0.35);
      will-change: transform;
    }

    .marquee:hover .marquee-track {
      animation-play-state: paused;
    }

    .marquee-track span {
      display: inline-flex;
      align-items: center;
      gap: 40px;
      transition: color 0.3s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      cursor: pointer;
    }

    .marquee-track span:hover {
      color: #fff;
      transform: scale(1.05);
    }

    .marquee-track i {
      color: var(--accent-color);
      font-style: normal;
      font-size: 0.8em;
      display: inline-block;
      animation: spinSlow 8s linear infinite;
    }

    .container {
      width: 90%;
      max-width: 1400px;
      margin: 0 auto;
    }

    .section-header {
      margin-bottom: 60px;
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
      font-size: clamp(2.2rem, 5vw, 3.5rem);
      margin-bottom: 15px;
      overflow: hidden;
    }

    .t-word {
      display: inline-block;
      opacity: 0;
      transform: translateY(100%);
    }

    .subtitle {
      color: var(--text-secondary);
      font-size: 1.1rem;
    }

    .portfolio-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 400px), 1fr));
      gap: 50px;
    }

    .project-card {
      cursor: pointer;
      perspective: 1200px;
    }

    .image-wrapper {
      position: relative;
      width: 100%;
      aspect-ratio: 16/10;
      border-radius: 40px;
      overflow: hidden;
      margin-bottom: 25px;
      transform-style: preserve-3d;
      will-change: transform;
      transition: box-shadow 0.5s ease;
    }

    .project-card:hover .image-wrapper {
      box-shadow: 0 40px 80px rgba(255, 77, 0, 0.15);
    }

    .mask-reveal {
      position: absolute;
      inset: 0;
      background: var(--accent-color);
      z-index: 5;
      transform-origin: left;
    }

    .project-img {
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.03);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
      overflow: hidden;
    }

    .grid-bg {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
      background-size: 40px 40px;
      transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .placeholder-icon {
      font-size: 5rem;
      opacity: 0.35;
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                  color 0.4s ease;
      position: relative;
      z-index: 2;
    }

    .project-card:hover .placeholder-icon {
      transform: scale(1.2) rotate(20deg);
      color: var(--accent-color);
      opacity: 1;
    }

    .project-card:hover .project-img { transform: scale(1.06); }
    .project-card:hover .grid-bg     { transform: scale(1.2); }

    .overlay {
      position: absolute;
      inset: 0;
      opacity: 0;
      background: linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0.55));
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.4s ease;
      z-index: 3;
    }

    .project-card:hover .overlay {
      opacity: 1;
    }

    .view-btn {
      padding: 14px 34px;
      border-radius: 40px;
      background: rgba(255,255,255,0.12);
      color: #fff;
      border: 1px solid rgba(255, 255, 255, 0.5);
      font-weight: 600;
      backdrop-filter: blur(10px);
      display: inline-flex;
      align-items: center;
      gap: 10px;
      transform: translateY(20px);
      opacity: 0;
      transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                  opacity 0.4s ease,
                  background 0.3s ease,
                  color 0.3s ease;
    }

    .project-card:hover .view-btn {
      transform: translateY(0);
      opacity: 1;
    }

    .view-btn:hover {
      background: #fff;
      color: #000;
    }

    .vb-arrow {
      transition: transform 0.35s ease;
    }

    .view-btn:hover .vb-arrow {
      transform: translateX(5px);
    }

    .corner-tag {
      position: absolute;
      top: 20px;
      left: 24px;
      z-index: 4;
      font-size: 0.75rem;
      letter-spacing: 3px;
      color: rgba(255,255,255,0.7);
      font-weight: 700;
      padding: 6px 10px;
      background: rgba(0,0,0,0.3);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 20px;
      backdrop-filter: blur(10px);
    }

    .project-info {
      padding: 0 8px;
    }

    .info-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }

    .category {
      color: var(--accent-color);
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 2px;
      display: block;
    }

    .year {
      font-size: 0.8rem;
      color: rgba(255,255,255,0.3);
      font-weight: 600;
      letter-spacing: 2px;
    }

    .project-title {
      font-size: 1.8rem;
      font-weight: 700;
      position: relative;
      overflow: hidden;
      line-height: 1.2;
      display: block;
      height: 2.2rem;
    }

    .pt-text {
      display: block;
      transition: transform 0.55s cubic-bezier(0.76, 0, 0.24, 1);
    }

    .pt-clone {
      position: absolute;
      top: 100%;
      left: 0;
      color: var(--accent-color);
    }

    .project-card:hover .pt-text       { transform: translateY(-100%); }
    .project-card:hover .pt-clone      { transform: translateY(-100%); }

    @media (max-width: 768px) {
      .portfolio-grid { grid-template-columns: 1fr; }
      .title { font-size: 2.5rem; }
    }
  `]
})
export class PortfolioComponent implements AfterViewInit {
  @ViewChildren('card') cards!: QueryList<ElementRef<HTMLElement>>;

  titleWords = ['Selected', 'Works'];
  marqueeItems = ['Web Apps', 'Hotel Sites', 'SaaS', 'Dashboards', 'E-commerce', 'Branding'];

  projects = [
    { title: "Quantum Pay",   category: "Fintech App",     icon: "❖", year: "2025" },
    { title: "Aura Skincare", category: "E-commerce",      icon: "✧", year: "2025" },
    { title: "Nebula OS",     category: "Product Design",  icon: "▲", year: "2024" },
    { title: "Horizon Travel",category: "Booking SaaS",    icon: "⬡", year: "2024" }
  ];

  ngAfterViewInit() {
    gsap.to('.t-word', {
      scrollTrigger: { trigger: '.portfolio-section', start: 'top 75%' },
      opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power4.out'
    });

    // Mask reveal + card entrance
    this.cards.forEach((ref) => {
      const card = ref.nativeElement;
      const mask = card.querySelector('.mask-reveal');
      const tl = gsap.timeline({
        scrollTrigger: { trigger: card, start: 'top 85%' },
        defaults: { ease: 'power4.out' }
      });
      tl.from(card, { y: 80, opacity: 0, duration: 1 })
        .to(mask,   { scaleX: 0, duration: 1, delay: -0.5 });
    });

    // Subtle parallax: images lift on scroll
    gsap.utils.toArray<HTMLElement>('.project-img').forEach((el) => {
      gsap.to(el, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });
  }

  onCardMove(event: MouseEvent, idx: number) {
    const el = this.cards.toArray()[idx]?.nativeElement;
    if (!el) return;
    const wrapper = el.querySelector('.image-wrapper') as HTMLElement;
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    gsap.to(wrapper, {
      rotateY: px * 10,
      rotateX: -py * 10,
      transformPerspective: 1000,
      duration: 0.4,
      ease: 'power2.out'
    });
  }

  onCardLeave(idx: number) {
    const el = this.cards.toArray()[idx]?.nativeElement;
    if (!el) return;
    const wrapper = el.querySelector('.image-wrapper') as HTMLElement;
    if (!wrapper) return;
    gsap.to(wrapper, {
      rotateY: 0, rotateX: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)'
    });
  }
}
