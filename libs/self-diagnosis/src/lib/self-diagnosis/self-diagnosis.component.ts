import { Question } from './../self-diagnosis-container/self-diagnosis-container.component';
import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { UiRangeSelectionComponentModule } from '../ui-range-selection/ui-range-selection.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { State as SelfDiagnosisInteractionState } from '@transformation/interaction-sdk';
import { UiResultComponentModule } from '../ui-result/ui-result.component';

@Component({
  selector: 'app-self-diagnosis',
  templateUrl: './self-diagnosis.component.html',
  styles: [],
})
export class SelfDiagnosisComponent implements OnInit, OnChanges {
  currentRate = 0;

  @Input()
  survey: SelfDiagnosisInteractionState<Question> | undefined;

  @Output()
  startSurvey: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  nextQuestion: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  previousQuestion: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  completeSurvey: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit(): void {
    this.startSurvey.emit();
  }

  ngOnChanges({ survey }: SimpleChanges): void {
    const currentSurvey: SelfDiagnosisInteractionState<Question> | undefined =
      survey?.currentValue;

    if (!currentSurvey) return;

    this.currentRate = currentSurvey.currentQuestion?.value || 0;
  }

  onNextQuestion(): void {
    this.nextQuestion.emit(this.currentRate);
  }

  onCompleteSurvey(): void {
    this.completeSurvey.emit(this.currentRate);
  }
}

@NgModule({
  imports: [
    CommonModule,
    UiResultComponentModule,
    AngularSvgIconModule.forRoot(),
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: '#78C000',
      innerStrokeColor: '#C7E596',
      animationDuration: 300,
      startFromZero: false
    }),
    UiRangeSelectionComponentModule,
  ],
  declarations: [SelfDiagnosisComponent],
  exports: [SelfDiagnosisComponent],
})
export class SelfDiagnosisComponentModule {}
