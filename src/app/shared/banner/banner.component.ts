import { Component, effect, inject, model } from '@angular/core';
import { BaseService } from '../utils/base.service';
import { map } from 'rxjs';

@Component({
  selector: 'banner-witget',
  standalone: true,
  imports: [],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {

  expand = model.required();

  constructor() {
    effect(() => console.log(`Value expand: ${ this.expand() }`));
  }
}
