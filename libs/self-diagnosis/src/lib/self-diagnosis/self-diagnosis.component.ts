import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { UiRangeSelectionComponentModule } from '../ui-range-selection/ui-range-selection.component';

@Component({
  selector: 'app-self-diagnosis',
  templateUrl: './self-diagnosis.component.html',
  styles: [],
})
export class SelfDiagnosisComponent {}

@NgModule({
  imports: [
    CommonModule,
    AngularSvgIconModule.forRoot(),
    RouterModule.forChild([
      {
        path: '',
        component: SelfDiagnosisComponent,
      },
    ]),
    UiRangeSelectionComponentModule,
  ],
  declarations: [SelfDiagnosisComponent],
})
export class SelfDiagnosisComponentModule {}
