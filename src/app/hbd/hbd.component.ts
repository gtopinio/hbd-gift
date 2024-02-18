import {Component, Renderer2, ElementRef, HostListener, AfterViewInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-hbd',
  templateUrl: './hbd.component.html',
  styleUrls: ['./hbd.component.css']
})
export class HbdComponent implements AfterViewInit {
  // Confetti reference: https://codepen.io/pingwinek_spk/pen/abMzeMw

  isMouseDown = false;
  @ViewChild('confettiContainer', { static: false, read: ElementRef }) overlay!: ElementRef;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit() {
    // No need to assign this.overlay.nativeElement to this.overlay
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
}
