import { Component, Input } from '@angular/core';

@Component({
  selector: 'example',
  templateUrl: './example.template.html',
  styleUrls: ['./example.style.scss']
})
export class ExampleComponent {
	@Input() flexStart: boolean = false;
}