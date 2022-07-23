import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ui-range-selection',
  template: `<div>Range Selection component over here</div>`,
  styles: [],
})
export class UiRangeSelectionComponent {}

@NgModule({
  imports: [CommonModule],
  declarations: [UiRangeSelectionComponent],
  exports: [UiRangeSelectionComponent],
})
export class UiRangeSelectionComponentModule {}
