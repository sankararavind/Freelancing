import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  }

  private initScrollProgress() {
    const bar = this.scrollProgress?.nativeElement;
    if (!bar) return;
    const update = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
      bar.style.width = `${Math.max(0, Math.min(1, scrolled)) * 100}%`;
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
  }
}
