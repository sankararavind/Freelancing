import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="about-section" id="about">
      <div class="container">
        <div class="about-grid">
          <div class="about-portrait">
            <div class="portrait-frame">
              <div class="portrait-img"></div>
              <div class="portrait-glow"></div>
              <span class="portrait-initial">A</span>
              <span class="frame-tag">ARAVIND · FULL STACK</span>
            </div>
            <div class="floating-chip chip-1">
              <span class="chip-dot"></span>
              Available for work
            </div>
            <div class="floating-chip chip-2">★ 5.0 client rating</div>
          </div>

          <div class="about-content">
            <span class="eyebrow"><i class="dot"></i>ABOUT ME</span>
            <h2 class="about-title">
              <span class="at-word" *ngFor="let w of titleWords">{{ w }}&nbsp;</span>
            </h2>

            <p class="about-bio fade-in">
              I'm <strong>Aravind</strong>, a full-stack developer who builds custom
              applications for small-scale companies and premium, high-converting
              websites for hotels, restaurants, and hospitals. I care about the
              details others skip — motion that feels intentional, layouts that
              breathe, and code that's easy to hand over.
            </p>
            <p class="about-bio fade-in">
              From first call to launch, I keep the process simple and the
              communication clear. Most projects ship in 2–4 weeks.
            </p>

            <div class="stack fade-in">
              <span class="stack-label">Tech I work with</span>
              <div class="stack-tags">
                <span *ngFor="let t of stack">{{ t }}</span>
              </div>
            </div>

            <div class="about-cta fade-in">
              <a href="Aravind-CV.pdf" download class="cv-btn">
                <span class="cv-icon">↓</span>
                <span>Download CV</span>
              </a>
              <a href="#contact" class="lets-talk" (click)="scrollTo($event, '#contact')">
                Let's talk
                <span class="lt-arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about-section {
      padding: 140px 0;
      position: relative;
    }

    .container {
      width: 90%;
      max-width: 1200px;
      margin: 0 auto;
    }

    .about-grid {
      display: grid;
      grid-template-columns: 0.85fr 1.15fr;
      gap: 80px;
      align-items: center;
    }

    /* Portrait */
    .about-portrait { position: relative; }

    .portrait-frame {
      position: relative;
      width: 100%;
      aspect-ratio: 4/5;
      border-radius: 30px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.08);
      background: linear-gradient(160deg, #1a1a1a 0%, #050505 100%);
    }

    .portrait-img {
      position: absolute;
      inset: 0;
      background:
        radial-gradient(circle at 50% 30%, rgba(255, 77, 0, 0.18), transparent 60%),
        linear-gradient(180deg, #161616, #050505);
    }

    .portrait-glow {
      position: absolute;
      bottom: -20%;
      left: 50%;
      transform: translateX(-50%);
      width: 80%;
      height: 60%;
      background: radial-gradient(circle, rgba(255, 77, 0, 0.4), transparent 65%);
      filter: blur(50px);
    }

    .portrait-initial {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 12rem;
      font-weight: 800;
      color: rgba(255, 255, 255, 0.06);
      letter-spacing: -0.05em;
    }

    .frame-tag {
      position: absolute;
      bottom: 20px;
      left: 20px;
      font-size: 0.65rem;
      letter-spacing: 0.28em;
      color: var(--accent-color);
      font-weight: 700;
    }

    .floating-chip {
      position: absolute;
      padding: 10px 16px;
      border-radius: 30px;
      font-size: 0.78rem;
      font-weight: 600;
      background: rgba(20, 20, 20, 0.8);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      display: inline-flex;
      align-items: center;
      gap: 8px;
      white-space: nowrap;
      animation: chipFloat 5s ease-in-out infinite;
    }
    .chip-1 { top: 14%; right: -12%; }
    .chip-2 { bottom: 16%; left: -10%; animation-delay: -2s; color: var(--accent-color); }

    @keyframes chipFloat {
      0%, 100% { transform: translateY(0); }
      50%      { transform: translateY(-10px); }
    }

    .chip-dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      background: #4ade80;
      box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.6);
      animation: chipPulse 2s infinite;
    }
    @keyframes chipPulse {
      0%   { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.6); }
      70%  { box-shadow: 0 0 0 10px rgba(74, 222, 128, 0); }
      100% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0); }
    }

    /* Content */
    .about-content { display: flex; flex-direction: column; }

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
      width: 6px; height: 6px;
      background: var(--accent-color);
      border-radius: 50%;
    }

    .about-title {
      font-size: clamp(2rem, 4.5vw, 3.4rem);
      line-height: 1.05;
      margin-bottom: 28px;
      overflow: hidden;
    }
    .at-word {
      display: inline-block;
      opacity: 0;
      transform: translateY(100%);
    }

    .about-bio {
      color: var(--text-secondary);
      font-size: 1.05rem;
      line-height: 1.7;
      margin-bottom: 20px;
      max-width: 54ch;
    }
    .about-bio strong { color: var(--text-primary); font-weight: 600; }

    .stack {
      margin: 14px 0 36px;
    }
    .stack-label {
      display: block;
      font-size: 0.7rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.4);
      margin-bottom: 14px;
    }
    .stack-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    .stack-tags span {
      font-size: 0.8rem;
      padding: 8px 14px;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: var(--text-secondary);
      transition: all 0.3s ease;
    }
    .stack-tags span:hover {
      border-color: var(--accent-color);
      color: #fff;
      transform: translateY(-3px);
    }

    .about-cta {
      display: flex;
      align-items: center;
      gap: 24px;
      flex-wrap: wrap;
    }

    .cv-btn {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 14px 26px;
      border-radius: 30px;
      background: #fff;
      color: #000;
      font-weight: 600;
      font-size: 0.9rem;
      transition: transform 0.3s ease, background 0.3s ease, color 0.3s ease;
    }
    .cv-btn:hover {
      background: var(--accent-color);
      color: #fff;
      transform: translateY(-2px);
    }
    .cv-icon {
      font-size: 1.1rem;
      transition: transform 0.3s ease;
    }
    .cv-btn:hover .cv-icon { transform: translateY(3px); }

    .lets-talk {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: var(--text-primary);
      font-weight: 600;
      font-size: 0.9rem;
    }
    .lt-arrow { transition: transform 0.3s ease; }
    .lets-talk:hover .lt-arrow { transform: translateX(5px); }

    @media (max-width: 900px) {
      .about-grid { grid-template-columns: 1fr; gap: 70px; }
      .about-portrait { max-width: 360px; }
      .chip-1 { right: 0; }
      .chip-2 { left: 0; }
    }
  `]
})
export class AboutComponent implements AfterViewInit {
  titleWords = ['Building', 'digital', 'things,', 'the', 'right', 'way.'];

  stack = [
    'Angular', 'TypeScript', 'JavaScript', 'Node.js',
    'Express', 'REST APIs', 'MongoDB', 'PostgreSQL',
    'GSAP', 'Figma', 'Responsive UI', 'Git'
  ];

  ngAfterViewInit() {
    gsap.to('.about-title .at-word', {
      scrollTrigger: { trigger: '.about-section', start: 'top 75%' },
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.08,
      ease: 'power4.out'
    });

    gsap.from('.about-section .fade-in', {
      scrollTrigger: { trigger: '.about-section', start: 'top 70%' },
      opacity: 0,
      y: 30,
      duration: 0.9,
      stagger: 0.12,
      delay: 0.2,
      ease: 'power3.out'
    });

    gsap.from('.about-portrait', {
      scrollTrigger: { trigger: '.about-section', start: 'top 75%' },
      opacity: 0,
      x: -40,
      duration: 1.1,
      ease: 'power3.out'
    });

    gsap.from('.floating-chip', {
      scrollTrigger: { trigger: '.about-section', start: 'top 70%' },
      opacity: 0,
      scale: 0.8,
      duration: 0.7,
      stagger: 0.15,
      delay: 0.6,
      ease: 'back.out(1.7)'
    });
  }

  scrollTo(e: Event, hash: string) {
    e.preventDefault();
    const el = document.querySelector(hash);
    if (!el) return;
    const top = (el as HTMLElement).getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}
