import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appUrbanStyle]'
})
export class UrbanStyleDirective implements OnInit {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
this.renderer.setStyle(this.el.nativeElement, 'font-family', "'Orbitron', 'Arial Black', cursive");
    this.renderer.setStyle(this.el.nativeElement, 'color', '#ffffffff');
    this.renderer.setStyle(this.el.nativeElement, 'text-shadow', '2px 2px 5px black');
    this.renderer.setStyle(this.el.nativeElement, 'letter-spacing', '2px');
    this.renderer.setStyle(this.el.nativeElement, 'padding', '10px');
    this.renderer.setStyle(this.el.nativeElement, 'display', 'inline-block');
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    this.renderer.setStyle(this.el.nativeElement, 'z-index', 9999);
  }
}
