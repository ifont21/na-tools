import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ui-range-selection',
  template: `<div class="w-full flex border h-12 border-gray-400 rounded-lg">
    <div
      class="flex-1 flex justify-center items-center border-r border-gray-400"
    >
      1
    </div>
    <div
      class="flex-1 flex justify-center items-center border-r border-gray-400"
    >
      2
    </div>
    <div
      class="flex-1 flex justify-center items-center border-r border-gray-400"
    >
      3
    </div>
    <div
      class="flex-1 flex justify-center items-center border-r border-gray-400"
    >
      4
    </div>
    <div
      class="flex-1 flex justify-center items-center border-r border-gray-400"
    >
      5
    </div>
    <div
      class="flex-1 flex justify-center items-center border-r border-gray-400"
    >
      6
    </div>
    <div
      class="flex-1 flex justify-center items-center border-r border-gray-400"
    >
      7
    </div>
    <div
      class="flex-1 flex justify-center items-center border-r border-gray-400"
    >
      8
    </div>
    <div
      class="flex-1 flex justify-center items-center border-r border-gray-400"
    >
      9
    </div>
    <div class="flex-1 flex justify-center items-center">10</div>
  </div>`,
  styles: [],
})
export class UiRangeSelectionComponent {}

@NgModule({
  imports: [CommonModule],
  declarations: [UiRangeSelectionComponent],
  exports: [UiRangeSelectionComponent],
})
export class UiRangeSelectionComponentModule {}
