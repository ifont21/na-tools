import { UiRangePipeModule } from '../ui-range.pipe';
import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ui-range-selection',
  template: `<div class="w-full flex h-12">
    <div
      *ngFor="let item of amountOfItems | appUIRange"
      class="flex-1 flex justify-center items-center first:border-l first:rounded-l-lg last:rounded-r-lg border-t border-b border-r border-neutral-dark-1 cursor-pointer"
      (click)="selectedChange.emit(item)"
      [ngClass]="
        item === selected
          ? 'bg-secondary border-t-0 border-b-0'
          : 'hover:bg-secondary-light/50'
      "
    >
      <span
        class="text-base text-neutral-dark-4 font-semibold"
        [ngClass]="item === selected ? 'text-neutral-light-1 text-xl' : ''"
        >{{ item }}</span
      >
    </div>
  </div>`,
  styles: [],
})
export class UiRangeSelectionComponent {
  @Input()
  amountOfItems = 10;

  @Input()
  selected = 0;

  @Output()
  selectedChange: EventEmitter<number> = new EventEmitter<number>();

}

@NgModule({
  imports: [CommonModule, UiRangePipeModule],
  declarations: [UiRangeSelectionComponent],
  exports: [UiRangeSelectionComponent],
})
export class UiRangeSelectionComponentModule {}
