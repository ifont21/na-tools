import { CommonModule } from '@angular/common';
import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appUIRange',
})
export class UiRangePipe implements PipeTransform {
  transform(count: number): Array<number> {
    return Array(count)
      .fill(0)
      .map((_, i) => i + 1);
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [UiRangePipe],
  exports: [UiRangePipe],
})
export class UiRangePipeModule {}
