import {
  Component,
  Renderer2,
  ElementRef,
  HostListener,
  AfterViewInit,
  ViewChild,
  OnInit,
  OnDestroy
} from '@angular/core';
import * as confetti from 'canvas-confetti';
import {Router} from "@angular/router";
@Component({
  selector: 'app-hbd',
  templateUrl: './hbd.component.html',
  styleUrls: ['./hbd.component.css']
})
export class HbdComponent implements AfterViewInit, OnInit, OnDestroy {
  // Confetti reference: https://codepen.io/pingwinek_spk/pen/abMzeMw

  isMouseDown = false;
  @ViewChild('confettiWrapper', { static: false, read: ElementRef }) overlay!: ElementRef;
  canvas: HTMLCanvasElement | null = null;
  confettiElements: HTMLDivElement[] = [];
  fireworksInterval: any;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router,
    ) { }

  ngOnInit() {
    // Remove existing canvas and confetti elements
    if (this.canvas) {
      this.renderer.removeChild(this.el.nativeElement, this.canvas);
      this.canvas = null;
    }

    this.confettiElements.forEach(confetti => {
      this.renderer.removeChild(this.el.nativeElement, confetti);
    });
    this.confettiElements = [];
  }

  ngAfterViewInit() {
    this.showFireworks();
    this.fireworksInterval = setInterval(() => {
      this.showFireworks();
    }, 4000);
  }

  ngOnDestroy() {
    if (this.fireworksInterval) {
      clearInterval(this.fireworksInterval);
    }
  }

  @HostListener('document:mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    if (this.overlay.nativeElement.style.opacity !== '0') {
      this.overlay.nativeElement.style.opacity = '0';
      setTimeout(() => {
        this.overlay.nativeElement.style.display = 'none';
      }, 500);
    }
    this.isMouseDown = true;
    this.spawnConfetti(event.clientX, event.clientY);
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isMouseDown = false;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isMouseDown) {
      this.spawnConfetti(event.clientX, event.clientY);
    }
  }

  spawnConfetti(x: number, y: number) {
    for (let i = 0; i < 6; i++) {
      this.createConfetti(x, y);
    }
  }

  createConfetti(x: number, y: number) {
    const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#e67e22'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const confetti = this.renderer.createElement('div');
    this.renderer.addClass(confetti, 'confetti');
    this.renderer.setStyle(confetti, 'backgroundColor', randomColor);
    this.renderer.setStyle(confetti, 'left', `${x}px`);
    this.renderer.setStyle(confetti, 'top', `${y}px`);

    this.renderer.appendChild(this.el.nativeElement, confetti);
    this.confettiElements.push(confetti);

    const angle = Math.random() * Math.PI * 2;
    const velocity = 2 + Math.random() * 2;
    const rotationSpeed = (Math.random() - 0.5) * 10;

    let xVelocity = velocity * Math.cos(angle);
    let yVelocity = velocity * Math.sin(angle);
    const gravity = 0.1;

    const animateConfetti = () => {
      xVelocity *= 0.99;
      yVelocity += gravity;
      x += xVelocity;
      y += yVelocity;

      const currentRotation = parseFloat(confetti.style.transform.replace('rotate(', '').replace('deg)', '')) || 0;
      this.renderer.setStyle(confetti, 'transform', `rotate(${currentRotation + rotationSpeed}deg)`);
      this.renderer.setStyle(confetti, 'left', `${x}px`);
      this.renderer.setStyle(confetti, 'top', `${y}px`);

      if (y < window.innerHeight) {
        requestAnimationFrame(animateConfetti);
      } else {
        this.renderer.removeChild(this.el.nativeElement, confetti);
      }
    }

    requestAnimationFrame(animateConfetti);
  }

  showFireworks() {
    // Create a new canvas element
    const canvas = this.renderer.createElement('canvas');
    this.renderer.appendChild(this.el.nativeElement, canvas);
    this.canvas = canvas;

    // Set the canvas to fill its parent
    this.renderer.setStyle(canvas, 'position', 'absolute');
    this.renderer.setStyle(canvas, 'top', '0');
    this.renderer.setStyle(canvas, 'left', '0');
    this.renderer.setStyle(canvas, 'width', '100%');
    this.renderer.setStyle(canvas, 'height', '100%');

    // Use the canvas-confetti library to create confetti on this canvas
    confetti.create(canvas, {
      resize: true,
      useWorker: true,
    })({ particleCount: 200, spread: 200 });
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
