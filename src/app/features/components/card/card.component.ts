import { NgTemplateOutlet } from '@angular/common';
import { Component, Directive, input, contentChild, TemplateRef, output } from '@angular/core';

@Directive({
  selector: 'ng-template[card-list-item]',
  standalone: true
})
export class CardListItemDirective{}

@Component({
  selector: 'card-widget',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  host: {
    class: 'border-2 border-black rounded-md p-4 w-fil flex flex-col gap-3'
  }
})
export class CardComponent<T> {

    items = input<T[]>([]);
    added = output<void>();
    rowTemplate = contentChild<TemplateRef<any>>(CardListItemDirective, { read: TemplateRef })
}
