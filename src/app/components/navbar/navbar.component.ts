import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransitionService } from '../../services/transition.service';
import { gsap } from 'gsap';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar glass" #nav [class.scrolled]="isScrolled" [class.hidden]="isHidden" [class.open]="menuOpen">
      <div class="nav-content">
        <div class="logo" (click)="navigateTo('#hero')">
          <span class="logo-bracket">&lt;</span>
          <span class="logo-text">Aravind</span>
          <span class="logo-bracket">/&gt;</span>
        </div>

        <div class="nav-links" [class.open]="menuOpen">
          <a role="button" *ngFor="let link of links"
             (click)="navigateTo(link.href)">
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

        <button class="hamburger"
                [class.open]="menuOpen"
                (click)="toggleMenu()"
                [attr.aria-expanded]="menuOpen"
                aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>

    <div class="menu-backdrop" [class.open]="menuOpen" (click)="closeMenu()"></div>
  `,
  styles: [`
    .navbar {
      position: fixed;
      top: 20px;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: calc(100% - 24px);
      max-width: 1200px;
      padding: 14px 22px;
      border-radius: 50px;
      z-index: 1000;
      display: flex;
      justify-content: center;
      will-change: transform, opacity;
      animation: navIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
      transition: top 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                  padding 0.4s ease,
                  background 0.4s ease,
                  opacity 0.4s ease,
                  border-radius 0.4s ease,
                  transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes navIn {
      from { transform: translateY(-90px); opacity: 0; }
      to   { transform: translateY(0);     opacity: 1; }
    }

    .navbar.scrolled {
      padding: 10px 22px;
      background: rgba(10, 10, 10, 0.75);
    }

    .navbar.hidden {
      transform: translateY(-140%);
      opacity: 0;
    }

    .nav-content {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }

    .logo {
      font-size: 1.25rem;
      font-weight: 800;
      letter-spacing: -1px;
      display: flex;
      align-items: center;
      gap: 4px;
      cursor: pointer;
      flex-shrink: 0;
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
      gap: 36px;
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
      flex-shrink: 0;
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

    .cta-btn:hover { color: #fff; }

    .btn-text, .arrow { position: relative; z-index: 1; }

    .arrow {
      font-size: 1.1rem;
      transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .cta-btn:hover .arrow { transform: translateX(6px) rotate(-8deg); }

    /* Hamburger — desktop hidden */
    .hamburger {
      display: none;
      width: 40px;
      height: 40px;
      background: transparent;
      border-radius: 50%;
      position: relative;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 5px;
      flex-shrink: 0;
      z-index: 2;
    }

    .hamburger span {
      display: block;
      width: 22px;
      height: 2px;
      background: #fff;
      border-radius: 2px;
      transition: transform 0.4s cubic-bezier(0.76, 0, 0.24, 1),
                  opacity 0.3s ease;
    }

    .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
    .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

    .menu-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.55);
      backdrop-filter: blur(6px);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.4s ease;
      z-index: 999;
    }

    .menu-backdrop.open {
      opacity: 1;
      pointer-events: auto;
    }

    @media (max-width: 860px) {
      .navbar {
        top: 12px;
        padding: 12px 18px;
      }
      .navbar.scrolled { padding: 10px 18px; }

      .cta-btn { display: none; }
      .hamburger { display: flex; }

      .navbar.open {
        border-radius: 24px;
        background: rgba(10, 10, 10, 0.92);
      }

      .nav-links {
        position: absolute;
        top: calc(100% + 10px);
        left: 0;
        right: 0;
        flex-direction: column;
        align-items: flex-start;
        gap: 0;
        background: rgba(10, 10, 10, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 24px;
        padding: 12px 8px;
        opacity: 0;
        transform: translateY(-12px) scale(0.98);
        transform-origin: top center;
        pointer-events: none;
        transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                    transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
      }

      .nav-links.open {
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: auto;
      }

      .nav-links a {
        width: 100%;
        height: auto;
        padding: 14px 18px;
        border-radius: 14px;
        font-size: 1rem;
        color: rgba(255, 255, 255, 0.85);
        opacity: 0;
        transform: translateY(8px);
        transition: background 0.25s ease,
                    color 0.25s ease,
                    opacity 0.4s ease,
                    transform 0.4s ease;
      }

      .nav-links.open a {
        opacity: 1;
        transform: translateY(0);
      }

      .nav-links.open a:nth-child(1) { transition-delay: 0.05s; }
      .nav-links.open a:nth-child(2) { transition-delay: 0.10s; }
      .nav-links.open a:nth-child(3) { transition-delay: 0.15s; }
      .nav-links.open a:nth-child(4) { transition-delay: 0.20s; }

      .nav-links a:hover {
        background: rgba(255, 77, 0, 0.1);
        color: #fff;
      }

      .nav-links a::after { display: none; }
      .nav-links a:hover .link-inner { transform: none; }
      .link-text-clone { display: none; }
    }

    @media (max-width: 380px) {
      .logo { font-size: 1.1rem; }
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
  menuOpen = false;
  private lastScroll = 0;

  constructor(private transitionService: TransitionService) {}

  @HostListener('window:scroll')
  onScroll() {
    const y = window.scrollY;
    this.isScrolled = y > 40;
    const delta = y - this.lastScroll;
    this.isHidden = y > 240 && delta > 4 && !this.menuOpen;
    this.lastScroll = y;
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth > 860 && this.menuOpen) {
      this.closeMenu();
    }
  }

  ngAfterViewInit() {
    if (window.innerWidth > 860 && this.ctaBtn?.nativeElement) {
      this.attachMagnetic(this.ctaBtn.nativeElement, 14);
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    document.body.style.overflow = this.menuOpen ? 'hidden' : '';
  }

  closeMenu() {
    this.menuOpen = false;
    document.body.style.overflow = '';
  }

  navigateTo(targetId: string) {
    if (this.menuOpen) this.closeMenu();
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
