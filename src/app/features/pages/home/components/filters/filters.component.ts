import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { StoreService } from 'src/app/core/services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() showCategory = new EventEmitter<string>();
  categories: any;
  private $componentDestroyed: Subject<boolean> = new Subject();

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.storeService
      .getCategories()
      .pipe(takeUntil(this.$componentDestroyed))
      .subscribe((response) => {
        this.categories = response;
      });
  }

  ngOnDestroy(): void {
    this.$componentDestroyed.next(true);
    this.$componentDestroyed.complete();
  }

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }
}
