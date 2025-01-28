import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TableSelectedSize } from '@app/core/models/table';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'widget-table',
  standalone: true,
  imports: [TableModule],
  providers: [],
  templateUrl: './abstract-table.component.html',
  styleUrl: './abstract-table.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export abstract class AbstractTableComponent {

  protected tableSize: TableSelectedSize = TableSelectedSize.Normal;
}
