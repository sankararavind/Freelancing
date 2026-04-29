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
    <div class="transition-curtain" #curtain>
      <div class="curtain-layer layer-1"></div>
      <div class="curtain-layer layer-2"></div>
      <div class="logo-reveal" #logo>Aravind</div>
    </div>
  `,
  styles: [`
    .transition-curtain {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 9999;
      pointer-events: none;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .curtain-layer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transform: translateY(100%);
    }

    .layer-1 {
      background: var(--accent-color);
      z-index: 1;
    }

    .layer-2 {
      background: #000;
      z-index: 2;
    }

    .logo-reveal {
      position: relative;
      z-index: 3;
      font-size: 4rem;
      font-weight: 800;
      color: #fff;
      opacity: 0;
      transform: scale(0.8);
      letter-spacing: -2px;
    }
  `]
})
export class TransitionComponent implements OnInit {
  @ViewChild('curtain') curtain!: ElementRef;
  @ViewChild('logo') logo!: ElementRef;

  constructor(private transitionService: TransitionService) {}

  ngOnInit() {
    this.transitionService.transitionStart$.subscribe((targetId) => {
      this.playTransition(targetId);
    });
  }

  playTransition(targetId: string) {
    const tl = gsap.timeline({
      onComplete: () => {
        // Reset curtain pointer events if needed
      }
    });

    // Disable interactions during transition
    document.body.style.pointerEvents = 'none';

    tl.to('.curtain-layer', {
      y: '0%',
      duration: 0.8,
      stagger: 0.1,
      ease: 'power4.inOut'
    })
    .to(this.logo.nativeElement, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: 'back.out(1.7)'
    }, '-=0.2')
    .add(() => {
      // Mid-transition: Scroll to target
      gsap.to(window, {
        duration: 0.1,
        scrollTo: targetId,
        ease: 'power2.out'
      });
    }, '+=0.2')
    .to(this.logo.nativeElement, {
      opacity: 0,
      scale: 1.2,
      duration: 0.3,
      ease: 'power2.in'
    }, '+=0.5')
    .to('.curtain-layer', {
      y: '-100%',
      duration: 0.8,
      stagger: -0.1,
      ease: 'power4.inOut',
      onComplete: () => {
        // Re-enable interactions
        document.body.style.pointerEvents = 'all';
        // Reset layers for next time
        gsap.set('.curtain-layer', { y: '100%' });
      }
    });
  }
}
