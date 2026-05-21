import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero-section" id="hero" #hero>
      <div class="background-halo" #halo></div>

      <!-- Floating particles -->
      <div class="particles" aria-hidden="true">
        <span class="particle" *ngFor="let p of particles; let i = index"
              [style.left.%]="p.x" [style.top.%]="p.y"
              [style.width.px]="p.size" [style.height.px]="p.size"
              [style.animation-duration.s]="p.dur"
              [style.animation-delay.s]="p.delay"></span>
      </div>

      <div class="container">
        <div class="hero-content">
          <p class="sub-greeting fade-up">
            <span class="dot-pulse"></span>
            Hey, I Am
          </p>
          <h1 class="main-title" #title>
            <span class="line">
              <span class="word" *ngFor="let w of firstLineWords">
                <span class="letter" *ngFor="let l of splitLetters(w)">{{ l }}</span>
                <span class="space">&nbsp;</span>
              </span>
            </span>
            <br>
            <span class="line gradient-line">
              <span class="word" *ngFor="let w of secondLineWords">
                <span class="letter" *ngFor="let l of splitLetters(w)">{{ l }}</span>
                <span class="space">&nbsp;</span>
              </span>
            </span>
          </h1>

          <div class="desc-box fade-up">
            <p>Portfolio of Aravind — Crafting custom applications for small-scale companies and premium websites for hotels.</p>
            <div class="cta-input">
              <input type="text" placeholder="Schedule a Free Call" readonly>
              <button class="arrow-btn magnetic" #magneticBtn>
                <span class="arrow-icon">→</span>
              </button>
            </div>
          </div>
        </div>

        <div class="portrait-container fade-up" #portrait>
          <div class="glow-effect"></div>
          <div class="orbit orbit-1"></div>
          <div class="orbit orbit-2"></div>
          <div class="orbit orbit-3"></div>
          <div class="placeholder-img"></div>
          <div class="floating-badge badge-1">✦ Available</div>
          <div class="floating-badge badge-2">⌘ Full Stack</div>
        </div>

        <div class="stats-row">
          <div class="stat-item fade-up" *ngFor="let stat of stats; let i = index">
            <span class="stat-num">{{stat.num}}</span>
            <span class="stat-label">{{stat.label}}</span>
            <span class="stat-bar"><i [style.animation-delay.s]="0.5 + i * 0.1"></i></span>
          </div>
        </div>
      </div>

      <div class="scroll-hint">
        <span>SCROLL</span>
        <div class="scroll-line"><i></i></div>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      min-height: 100vh;
      width: 100%;
      position: relative;
      display: flex;
      align-items: center;
      padding: 120px 0 60px;
      overflow: hidden;
    }

    .container {
      width: 90%;
      max-width: 1400px;
      margin: 0 auto;
      position: relative;
      z-index: 2;
    }

    .background-halo {
      position: absolute;
      top: 40%;
      left: 60%;
      transform: translate(-50%, -50%);
      width: 600px;
      height: 600px;
      background: radial-gradient(circle, var(--accent-color) 0%, rgba(255, 77, 0, 0) 70%);
      filter: blur(80px);
      opacity: 0.5;
      z-index: 1;
      pointer-events: none;
    }

    .particles {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 2;
    }

    .particle {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      box-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
      animation: particleFloat linear infinite;
      opacity: 0;
    }

    @keyframes particleFloat {
      0%   { transform: translateY(0)     scale(0.5); opacity: 0; }
      10%  { opacity: 0.8; }
      90%  { opacity: 0.4; }
      100% { transform: translateY(-120vh) scale(1.2); opacity: 0; }
    }

    .hero-content {
      position: relative;
      z-index: 3;
    }

    .sub-greeting {
      color: var(--text-secondary);
      font-size: 1.1rem;
      font-weight: 500;
      margin-bottom: 10px;
      display: inline-flex;
      align-items: center;
      gap: 10px;
    }

    .dot-pulse {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #4ade80;
      box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.7);
      animation: dotPulse 2s infinite;
    }

    @keyframes dotPulse {
      0%   { box-shadow: 0 0 0 0    rgba(74, 222, 128, 0.7); }
      70%  { box-shadow: 0 0 0 12px rgba(74, 222, 128, 0); }
      100% { box-shadow: 0 0 0 0    rgba(74, 222, 128, 0); }
    }

    .main-title {
      font-size: clamp(3rem, 8vw, 7rem);
      line-height: 0.9;
      margin-bottom: 40px;
      perspective: 600px;
    }

    .line {
      display: inline-block;
      overflow: hidden;
    }

    .word {
      display: inline-flex;
    }

    .letter {
      display: inline-block;
      opacity: 0;
      transform: translateY(110%) rotate(8deg);
      transform-origin: bottom left;
      transition: color 0.3s ease;
    }

    .letter:hover {
      color: var(--accent-color);
    }

    .gradient-line .letter {
      background: linear-gradient(to right, #fff 0%, #555 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .desc-box {
      max-width: 400px;
      margin-left: auto;
      margin-right: 15%;
      margin-top: -50px;
      opacity: 0;
      transform: translateY(30px);
    }

    .desc-box p {
      color: var(--text-secondary);
      font-size: 1rem;
      margin-bottom: 25px;
    }

    .cta-input {
      display: flex;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 8px;
      border-radius: 40px;
      align-items: center;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .cta-input::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg,
        transparent,
        rgba(255, 77, 0, 0.15),
        transparent);
      transform: translateX(-100%);
      transition: transform 0.8s ease;
    }

    .cta-input:hover::before {
      transform: translateX(100%);
    }

    .cta-input:focus-within {
      border-color: var(--accent-color);
      box-shadow: 0 0 30px rgba(255, 77, 0, 0.25);
    }

    .cta-input input {
      background: transparent;
      border: none;
      outline: none;
      color: #fff;
      padding: 0 20px;
      width: 100%;
      font-family: inherit;
    }

    .arrow-btn {
      width: 44px;
      height: 44px;
      min-width: 44px;
      border-radius: 50%;
      background: var(--accent-color);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      position: relative;
      animation: pulseGlow 2.4s ease-in-out infinite;
    }

    .arrow-btn::after {
      content: '';
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      border: 1px solid var(--accent-color);
      opacity: 0.4;
      animation: ringExpand 2s ease-out infinite;
    }

    @keyframes ringExpand {
      0%   { transform: scale(1);   opacity: 0.6; }
      100% { transform: scale(1.8); opacity: 0;   }
    }

    .arrow-icon {
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .arrow-btn:hover .arrow-icon {
      transform: translateX(4px) scale(1.1);
    }

    .portrait-container {
      position: absolute;
      top: 50%;
      right: 5%;
      transform: translateY(-50%);
      width: 40%;
      height: 80vh;
      z-index: 2;
      opacity: 0;
    }

    .glow-effect {
      position: absolute;
      top: 20%;
      left: 50%;
      transform: translateX(-50%);
      width: 80%;
      height: 80%;
      background: radial-gradient(circle, var(--accent-color) 0%, rgba(255, 77, 0, 0) 60%);
      filter: blur(40px);
      opacity: 0.3;
      border-radius: 50%;
      animation: floatY 6s ease-in-out infinite;
    }

    .orbit {
      position: absolute;
      border: 1px dashed rgba(255, 255, 255, 0.08);
      border-radius: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .orbit::before {
      content: '';
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--accent-color);
      box-shadow: 0 0 10px var(--accent-color);
      top: -4px;
      left: 50%;
    }

    .orbit-1 { width: 80%; height: 80%; animation: spinSlow 18s linear infinite; }
    .orbit-2 { width: 95%; height: 95%; animation: spinSlow 28s linear infinite reverse; border-color: rgba(255, 77, 0, 0.15); }
    .orbit-3 { width: 110%; height: 110%; animation: spinSlow 40s linear infinite; opacity: 0.5; }

    .placeholder-img {
      width: 100%;
      height: 100%;
      background: linear-gradient(to top, #000, transparent);
      mask-image: linear-gradient(to top, black, transparent);
      -webkit-mask-image: linear-gradient(to top, black, transparent);
    }

    .floating-badge {
      position: absolute;
      padding: 10px 16px;
      border-radius: 30px;
      font-size: 0.8rem;
      font-weight: 600;
      background: rgba(255, 255, 255, 0.06);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      animation: floatY 5s ease-in-out infinite;
      white-space: nowrap;
    }

    .badge-1 {
      top: 20%;
      left: -10%;
      animation-delay: 0s;
    }

    .badge-2 {
      bottom: 25%;
      right: -5%;
      animation-delay: 1.5s;
    }

    .stats-row {
      display: flex;
      gap: 60px;
      margin-top: 100px;
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      opacity: 0;
      transform: translateY(30px);
      position: relative;
      padding-bottom: 8px;
    }

    .stat-num {
      color: var(--accent-color);
      font-weight: 800;
      font-size: 0.9rem;
      margin-bottom: 5px;
    }

    .stat-label {
      color: var(--text-secondary);
      font-size: 0.9rem;
      font-weight: 500;
      transition: color 0.3s ease;
    }

    .stat-item:hover .stat-label {
      color: #fff;
    }

    .stat-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background: rgba(255, 255, 255, 0.08);
      overflow: hidden;
    }

    .stat-bar i {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: var(--accent-color);
      transform: translateX(-100%);
      animation: barFill 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @keyframes barFill {
      to { transform: translateX(0); }
    }

    .scroll-hint {
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      color: rgba(255,255,255,0.4);
      font-size: 0.7rem;
      letter-spacing: 3px;
      z-index: 4;
    }

    .scroll-line {
      width: 1px;
      height: 40px;
      background: rgba(255,255,255,0.1);
      overflow: hidden;
      position: relative;
    }

    .scroll-line i {
      position: absolute;
      top: -20px;
      left: 0;
      width: 100%;
      height: 20px;
      background: var(--accent-color);
      animation: scrollDown 2s ease-in-out infinite;
    }

    @keyframes scrollDown {
      0%   { top: -20px; }
      100% { top: 40px;  }
    }

    @media (max-width: 1024px) {
      .portrait-container { display: none; }
      .desc-box {
        margin-right: 0;
        margin-left: 0;
        margin-top: 40px;
        max-width: 100%;
      }
      .stats-row {
        flex-wrap: wrap;
        gap: 20px 28px;
        margin-top: 60px;
      }
    }

    @media (max-width: 640px) {
      .hero-section {
        padding: 100px 0 80px;
      }
      .main-title {
        font-size: clamp(2.5rem, 14vw, 4rem);
        margin-bottom: 28px;
      }
      .sub-greeting { font-size: 1rem; }
      .desc-box p { font-size: 0.95rem; }
      .stats-row {
        gap: 16px 24px;
        margin-top: 50px;
      }
      .stat-item {
        flex: 1 1 calc(50% - 24px);
        min-width: 120px;
      }
      .scroll-hint { display: none; }
      .floating-badge { display: none; }
    }
  `]
})
export class HeroComponent implements AfterViewInit {
  @ViewChild('halo') halo!: ElementRef;
  @ViewChild('portrait') portrait!: ElementRef;
  @ViewChild('hero') hero!: ElementRef;
  @ViewChild('magneticBtn') magneticBtn!: ElementRef<HTMLButtonElement>;

  stats = [
    { num: "/ 01", label: "Hotel Sites" },
    { num: "/ 02", label: "Restaurant Sites" },
    { num: "/ 03", label: "Hospital Sites" },
    { num: "/ 04", label: "E-commerce" },
    { num: "/ 05", label: "Business Apps" }
  ];

  firstLineWords = ['FULL', 'STACK'];
  secondLineWords = ['DEVELOPER'];

  particles = Array.from({ length: 30 }, () => ({
    x: Math.random() * 100,
    y: 80 + Math.random() * 40,
    size: 1 + Math.random() * 3,
    dur: 12 + Math.random() * 18,
    delay: Math.random() * 10
  }));

  splitLetters(word: string): string[] {
    return word.split('');
  }

  ngAfterViewInit() {
    // Letter-by-letter title reveal
    gsap.to('.main-title .letter', {
      opacity: 1,
      y: 0,
      rotate: 0,
      duration: 1.1,
      stagger: 0.03,
      ease: 'power4.out',
      delay: 0.2
    });

    // Fade-up rest
    gsap.to('.fade-up', {
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger: 0.12,
      ease: 'power3.out',
      delay: 0.5
    });

    // Pulse halo
    gsap.to(this.halo.nativeElement, {
      opacity: 0.7,
      scale: 1.2,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Parallax halo + subtle portrait tilt on mouse
    const onMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 40;
      const yPos = (clientY / window.innerHeight - 0.5) * 40;

      gsap.to(this.halo.nativeElement, {
        x: xPos, y: yPos, duration: 2, ease: 'power2.out'
      });

      if (this.portrait?.nativeElement) {
        gsap.to(this.portrait.nativeElement, {
          x: xPos * 0.3,
          y: yPos * 0.3,
          rotateY: (clientX / window.innerWidth - 0.5) * 6,
          rotateX: -(clientY / window.innerHeight - 0.5) * 6,
          duration: 1.5,
          ease: 'power2.out',
          transformPerspective: 800
        });
      }
    };
    window.addEventListener('mousemove', onMove);

    // Magnetic CTA button
    this.attachMagnetic(this.magneticBtn.nativeElement, 22);

    // Parallax scroll on hero content
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      gsap.to('.main-title', { y: y * 0.15, overwrite: 'auto', duration: 0.3 });
      gsap.to('.portrait-container', { y: -y * 0.08, overwrite: 'auto', duration: 0.3 });
    }, { passive: true });
  }

  private attachMagnetic(el: HTMLElement, strength = 20) {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'elastic.out(1, 0.4)' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'elastic.out(1, 0.4)' });
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      xTo((e.clientX - cx) / (rect.width / 2) * strength);
      yTo((e.clientY - cy) / (rect.height / 2) * strength);
    });
    el.addEventListener('mouseleave', () => {
      xTo(0); yTo(0);
    });
  }
}
