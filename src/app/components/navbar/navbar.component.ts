import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransitionService } from '../../services/transition.service';
import { gsap } from 'gsap';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar glass" #nav [class.scrolled]="isScrolled" [class.hidden]="isHidden">
      <div class="nav-content">
        <div class="logo">
          <span class="logo-bracket">&lt;</span>
          <span class="logo-text">Aravind</span>
          <span class="logo-bracket">/&gt;</span>
        </div>
        <div class="nav-links">
          <a role="button" *ngFor="let link of links"
             (click)="navigateTo(link.href)"
             (mouseenter)="hoverLink($event)">
            <span class="link-inner">
              <span class="link-text">{{ link.label }}</span>
              <span class="link-text link-text-clone">{{ link.label }}</span>
            </span>
          </a>
        </div>
        <button class="cta-btn magnetic" #ctaBtn (click)="navigateTo('#contact')">
          <span class="btn-text">Get in touch</span>
          <span class="arrow">→</span>
        </button>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      width: 90%;
      max-width: 1200px;
      padding: 15px 30px;
      border-radius: 50px;
      z-index: 1000;
      display: flex;
      justify-content: center;
      transition: top 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                  padding 0.4s ease,
                  background 0.4s ease,
                  opacity 0.4s ease,
                  transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .navbar.scrolled {
      padding: 10px 25px;
      background: rgba(10, 10, 10, 0.75);
    }

    .navbar.hidden {
      transform: translateX(-50%) translateY(-140%);
      opacity: 0;
    }

    .nav-content {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-size: 1.4rem;
      font-weight: 800;
      letter-spacing: -1px;
      display: flex;
      align-items: center;
      gap: 4px;
      cursor: pointer;
    }

    .logo-bracket {
      color: var(--accent-color);
      opacity: 0.7;
      transition: transform 0.3s ease;
    }

    .logo:hover .logo-bracket:first-child { transform: translateX(-4px); }
    .logo:hover .logo-bracket:last-child  { transform: translateX(4px); }

    .logo-text {
      background: linear-gradient(to right, #fff, #888);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .nav-links {
      display: flex;
      gap: 40px;
    }

    .nav-links a {
      cursor: pointer;
      color: var(--text-secondary);
      font-weight: 500;
      font-size: 0.9rem;
      position: relative;
      overflow: hidden;
      height: 22px;
      display: inline-block;
    }

    .link-inner {
      display: inline-flex;
      flex-direction: column;
      transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
    }

    .link-text {
      line-height: 22px;
    }

    .link-text-clone {
      color: var(--accent-color);
    }

    .nav-links a:hover .link-inner {
      transform: translateY(-22px);
    }

    .nav-links a::after {
      content: '';
      position: absolute;
      bottom: -6px;
      left: 50%;
      width: 0;
      height: 2px;
      background: var(--accent-color);
      border-radius: 2px;
      transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                  left  0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .nav-links a:hover::after {
      width: 100%;
      left: 0;
    }

    .cta-btn {
      background: #fff;
      color: #000;
      padding: 10px 22px;
      border-radius: 30px;
      font-weight: 600;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 10px;
      position: relative;
      overflow: hidden;
      transition: background 0.3s ease, color 0.3s ease;
    }

    .cta-btn::before {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--accent-color);
      transform: translateY(100%);
      transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
      z-index: 0;
    }

    .cta-btn:hover::before {
      transform: translateY(0);
    }

    .cta-btn:hover {
      color: #fff;
    }

    .btn-text, .arrow {
      position: relative;
      z-index: 1;
    }

    .arrow {
      font-size: 1.1rem;
      transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .cta-btn:hover .arrow {
      transform: translateX(6px) rotate(-8deg);
    }

    @media (max-width: 768px) {
      .nav-links { display: none; }
    }
  `]
})
export class NavbarComponent implements AfterViewInit {
  @ViewChild('ctaBtn') ctaBtn!: ElementRef<HTMLButtonElement>;

  links = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Works', href: '#works' },
    { label: 'Contact', href: '#contact' }
  ];

  isScrolled = false;
  isHidden = false;
  private lastScroll = 0;

  constructor(private transitionService: TransitionService) {}

  @HostListener('window:scroll')
  onScroll() {
    const y = window.scrollY;
    this.isScrolled = y > 40;
    // Hide when scrolling down past a threshold, show when scrolling up
    this.isHidden = y > 200 && y > this.lastScroll;
    this.lastScroll = y;
  }

  ngAfterViewInit() {
    // Entrance
    gsap.from('.navbar', {
      y: -80,
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
      delay: 0.3
    });

    // Magnetic CTA
    this.attachMagnetic(this.ctaBtn.nativeElement, 14);
  }

  hoverLink(_e: MouseEvent) {
    // hook left intentionally for future signature effects
  }

  navigateTo(targetId: string) {
    this.transitionService.triggerTransition(targetId);
  }

  private attachMagnetic(el: HTMLElement, strength = 14) {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' });
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      xTo((e.clientX - cx) / (rect.width / 2) * strength);
      yTo((e.clientY - cy) / (rect.height / 2) * strength);
    });
    el.addEventListener('mouseleave', () => { xTo(0); yTo(0); });
  }
}
