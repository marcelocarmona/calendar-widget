import { Component, Input, ElementRef, Renderer, OnInit } from '@angular/core';
import { EventsWithPosition } from '../calendar-widget.component';

@Component({
  selector: 'event',
  templateUrl: './event.template.html',
  styleUrls: ['./event.style.scss']
})
export class EventComponent implements OnInit {
  @Input() event: EventsWithPosition;

  constructor(private element: ElementRef, private renderer: Renderer) {}

  ngOnInit() {
    // Position element.
    this.renderer.setElementStyle(
      this.element.nativeElement,
      'top',
      this.event.top + 'px'
    );
    this.renderer.setElementStyle(
      this.element.nativeElement,
      'height',
      this.event.height + 'px'
    );
    this.renderer.setElementStyle(
      this.element.nativeElement,
      'left',
      this.event.left + 'px'
    );
    this.renderer.setElementStyle(
      this.element.nativeElement,
      'width',
      this.event.width + 'px'
    );
  }
}
