import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { ServicesComponent } from './components/services/services.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ContactComponent } from './components/contact/contact.component';
import { TransitionComponent } from './components/transition/transition.component';
import Lenis from 'lenis';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    ServicesComponent,
    PortfolioComponent,
    ContactComponent,
    TransitionComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'developer-portfolio';

  @ViewChild('scrollProgress') scrollProgress!: ElementRef<HTMLDivElement>;

  sections = [
    { id: 'hero' },
    { id: 'services' },
    { id: 'works' },
    { id: 'contact' }
  ];

  activeSection: string = 'hero';
  railFill = 0;

  ngOnInit() {
    const lenis = new Lenis();

    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }

  ngAfterViewInit() {
    this.initScrollProgress();
    this.initSectionTracking();
  }

  private initScrollProgress() {
    const bar = this.scrollProgress?.nativeElement;
    if (!bar) return;
    const update = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
      const pct = Math.max(0, Math.min(1, scrolled));
      bar.style.width = `${pct * 100}%`;
      this.railFill = pct * 100;
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  private initSectionTracking() {
    const ids = this.sections.map(s => s.id);
    // Hero doesn't have an explicit id="hero" in the template — fall back to the hero-section element
    const elements: { id: string; el: Element | null }[] = ids.map(id => {
      if (id === 'hero') {
        return { id, el: document.querySelector('.hero-section') };
      }
      return { id, el: document.getElementById(id) };
    });

    const update = () => {
      const probe = window.scrollY + window.innerHeight * 0.4;
      let current = ids[0];
      for (const { id, el } of elements) {
        if (!el) continue;
        const rect = (el as HTMLElement).getBoundingClientRect();
        const top = rect.top + window.scrollY;
        if (probe >= top) current = id;
      }
      if (current !== this.activeSection) this.activeSection = current;
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
  }
}
