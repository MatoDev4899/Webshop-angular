import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
  styleUrls: ['./products-header.component.scss'],
})
export class ProductsHeaderComponent implements OnInit {
  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() itemsCountChange = new EventEmitter<number>();
  @Output() itemsSortChange = new EventEmitter<string>();

  sort = 'desc';
  itemsShowCount = 12;
  counts = [12, 24, 36, 48];
  columnButtons = [
    { icon: 'view_list', columns: 1 },
    { icon: 'view_module', columns: 3 },
    { icon: 'view_comfy', columns: 4 },
  ];

  constructor() {}

  ngOnInit(): void {}

  onSortUpdate(newSort: string): void {
    this.sort = newSort;
    this.itemsSortChange.emit(newSort);
  }

  onItemsUpdate(count: number): void {
    this.itemsShowCount = count;
    this.itemsCountChange.emit(count);
  }

  onColumnsUpdated(colsNum: number): void {
    this.columnsCountChange.emit(colsNum);
  }
}
