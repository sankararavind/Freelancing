import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransitionService } from '../../services/transition.service';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

@Component({
  selector: 'app-transition',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loader-overlay" #overlay aria-hidden="true">
      <div class="loader-shade" #shade></div>
      <div class="loader-bar-wrap">
        <div class="loader-bar" #bar></div>
      </div>
      <div class="loader-dots" #dots>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="loader-label" #label>
        <span class="arrow-mark">→</span>
        <span class="label-text" #labelText>Loading</span>
      </div>
    </div>
  `,
  styles: [`
    .loader-overlay {
      position: fixed;
      inset: 0;
      z-index: 9999;
      pointer-events: none;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 18px;
    }

    .loader-shade {
      position: absolute;
      inset: 0;
      background: rgba(5, 5, 5, 0.6);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      opacity: 0;
    }

    .loader-bar-wrap {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 3px;
      overflow: hidden;
      background: rgba(255, 255, 255, 0.05);
    }

    .loader-bar {
      width: 100%;
      height: 100%;
      transform: scaleX(0);
      transform-origin: left;
      background: linear-gradient(90deg, var(--accent-color), #ff9a3c, var(--accent-color));
      box-shadow: 0 0 18px var(--accent-color);
    }

    .loader-dots {
      display: flex;
      gap: 10px;
      opacity: 0;
      transform: translateY(8px);
      position: relative;
      z-index: 2;
    }

    .loader-dots span {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--accent-color);
      box-shadow: 0 0 12px var(--accent-color);
    }

    .loader-label {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      color: #fff;
      font-size: 0.8rem;
      letter-spacing: 4px;
      text-transform: uppercase;
      font-weight: 700;
      opacity: 0;
      transform: translateY(8px);
      position: relative;
      z-index: 2;
    }

    .arrow-mark {
      color: var(--accent-color);
    }
  `]
})
export class TransitionComponent implements OnInit {
  @ViewChild('overlay') overlay!: ElementRef<HTMLDivElement>;
  @ViewChild('shade') shade!: ElementRef<HTMLDivElement>;
  @ViewChild('bar') bar!: ElementRef<HTMLDivElement>;
  @ViewChild('dots') dots!: ElementRef<HTMLDivElement>;
  @ViewChild('label') label!: ElementRef<HTMLDivElement>;
  @ViewChild('labelText') labelText!: ElementRef<HTMLSpanElement>;

  constructor(private transitionService: TransitionService) {}

  ngOnInit() {
    this.transitionService.transitionStart$.subscribe((targetId) => {
      this.playTransition(targetId);
    });
  }

  private playTransition(targetId: string) {
    const sectionName = (targetId.replace('#', '') || 'top').toUpperCase();
    this.labelText.nativeElement.textContent = sectionName;

    document.body.style.pointerEvents = 'none';

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.pointerEvents = '';
        gsap.set([this.bar.nativeElement], { scaleX: 0 });
      }
    });

    // Quick fade in shade + label + bouncing dots
    tl.to(this.shade.nativeElement, {
      opacity: 1, duration: 0.25, ease: 'power2.out'
    })
      .to([this.label.nativeElement, this.dots.nativeElement], {
        opacity: 1, y: 0, duration: 0.3, ease: 'power3.out'
      }, '-=0.15')
      .to(this.bar.nativeElement, {
        scaleX: 1, duration: 0.55, ease: 'power3.inOut'
      }, '-=0.25')
      // Bouncing dots
      .to(this.dots.nativeElement.querySelectorAll('span'), {
        y: -8,
        duration: 0.3,
        stagger: { each: 0.1, yoyo: true, repeat: 1 },
        ease: 'sine.inOut'
      }, '-=0.55')
      // Scroll while loader is up
      .add(() => {
        gsap.to(window, {
          duration: 0.1,
          scrollTo: { y: targetId, offsetY: 80 },
          ease: 'power2.out'
        });
      }, '-=0.2')
      // Fade out everything
      .to([this.label.nativeElement, this.dots.nativeElement], {
        opacity: 0, y: -8, duration: 0.25, ease: 'power2.in'
      }, '+=0.05')
      .to(this.shade.nativeElement, {
        opacity: 0, duration: 0.35, ease: 'power2.in'
      }, '-=0.2')
      .to(this.bar.nativeElement, {
        scaleX: 0, transformOrigin: 'right',
        duration: 0.5, ease: 'power3.inOut'
      }, '-=0.4');
  }
}
