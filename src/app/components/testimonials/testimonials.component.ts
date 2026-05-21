import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Review {
  quote: string;
  name: string;
  role: string;
  initial: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="tst-section" id="testimonials">
      <div class="container">
        <div class="tst-header">
          <span class="eyebrow"><i class="dot"></i>KIND WORDS</span>
          <h2 class="tst-title">
            <span class="tt-word" *ngFor="let w of titleWords">{{ w }}&nbsp;</span>
          </h2>
          <p class="tst-sub">A few notes from people I've built for.</p>
        </div>

        <div class="tst-grid">
          <figure class="tst-card glass" *ngFor="let r of reviews">
            <div class="stars">★★★★★</div>
            <blockquote>{{ r.quote }}</blockquote>
            <figcaption>
              <span class="avatar">{{ r.initial }}</span>
              <span class="who">
                <span class="who-name">{{ r.name }}</span>
                <span class="who-role">{{ r.role }}</span>
              </span>
            </figcaption>
            <span class="quote-mark">”</span>
          </figure>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .tst-section {
      padding: 120px 0;
      position: relative;
    }
    .container {
      width: 90%;
      max-width: 1200px;
      margin: 0 auto;
    }

    .tst-header { margin-bottom: 60px; }
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
    .dot { width: 6px; height: 6px; background: var(--accent-color); border-radius: 50%; }

    .tst-title {
      font-size: clamp(2rem, 5vw, 3.4rem);
      line-height: 1.05;
      margin-bottom: 14px;
      overflow: hidden;
    }
    .tt-word { display: inline-block; opacity: 0; transform: translateY(100%); }

    .tst-sub { color: var(--text-secondary); font-size: 1.05rem; }

    .tst-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
      gap: 24px;
    }

    .tst-card {
      position: relative;
      padding: 36px 32px 32px;
      border-radius: 24px;
      overflow: hidden;
      transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease;
    }
    .tst-card:hover {
      transform: translateY(-8px);
      border-color: var(--accent-color);
    }

    .stars {
      color: var(--accent-color);
      letter-spacing: 3px;
      font-size: 0.9rem;
      margin-bottom: 18px;
    }

    blockquote {
      color: var(--text-primary);
      font-size: 1.02rem;
      line-height: 1.6;
      margin-bottom: 26px;
      position: relative;
      z-index: 1;
    }

    figcaption {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .avatar {
      width: 44px; height: 44px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--accent-color), #ff9a3c);
      color: #000;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
    }
    .who { display: flex; flex-direction: column; }
    .who-name { font-weight: 600; font-size: 0.95rem; }
    .who-role { color: var(--text-secondary); font-size: 0.82rem; }

    .quote-mark {
      position: absolute;
      top: 10px;
      right: 24px;
      font-size: 6rem;
      line-height: 1;
      color: rgba(255, 77, 0, 0.1);
      font-family: Georgia, serif;
      pointer-events: none;
    }

    @media (max-width: 600px) {
      .tst-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class TestimonialsComponent implements AfterViewInit {
  titleWords = ['Trusted', 'by', 'the', 'people', 'I', 'work', 'with.'];

  // Replace these with real client reviews when you have them.
  reviews: Review[] = [
    {
      quote: "Aravind rebuilt our hotel site and direct bookings jumped within the first month. He just gets the small details right.",
      name: 'Priya Menon',
      role: 'Owner, Seaside Retreat',
      initial: 'P'
    },
    {
      quote: "Fast, clear, and genuinely easy to work with. Our restaurant's online ordering finally feels like part of the brand.",
      name: 'Karthik Rao',
      role: 'Founder, Spice & Co.',
      initial: 'K'
    },
    {
      quote: "He delivered our internal dashboard ahead of schedule and the handover was spotless. Would hire again without hesitation.",
      name: 'Sarah Thomas',
      role: 'Ops Lead, Brightline',
      initial: 'S'
    }
  ];

  ngAfterViewInit() {
    gsap.to('.tst-title .tt-word', {
      scrollTrigger: { trigger: '.tst-section', start: 'top 75%' },
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.07,
      ease: 'power4.out'
    });

    gsap.from('.tst-card', {
      scrollTrigger: { trigger: '.tst-grid', start: 'top 80%' },
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out'
    });
  }
}
