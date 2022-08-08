import { Component, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Question } from '../self-diagnosis-container/self-diagnosis-container.component';
import { SurveyItem } from '@transformation/interaction-sdk';

export interface CriteriaDefinition {
  text: string;
  range: number[];
}

const criteriaDefinition: CriteriaDefinition[] = [
  {
    text: 'Organizacion con pocos o ningunos elementos de transformacion digital',
    range: [0, 2],
  },
  {
    text: 'Organizacion con bajo avance en su Transformacion Digital y la mayoria de tareas pendientes por ejecutar',
    range: [2, 5],
  },
  {
    text: 'Organizacion con mediano avance en su transformacion digital con muchas tareas pendientes por ejecutar',
    range: [5, 7],
  },
  {
    text: 'Organizacion muy avanzada en su transformacion digital con pocas traeas pendientes por ejecutar',
    range: [7, 9],
  },
  {
    text: 'Organizacion transformada digitalmente',
    range: [9, 11],
  },
];

@Component({
  selector: 'app-ui-result',
  template: `<div>Final Result: {{ finalCriteriaDefinition }}</div>`,
  styles: [],
})
export class UiResultComponent {
  @Input()
  set answers(value: Array<Question & SurveyItem> | undefined) {
    if (!value) return;

    const total = value.reduce((acc, curr) => (acc += curr.value), 0);
    const average = total / value.length;

    const finalCriteria = criteriaDefinition.find(
      (criteria: CriteriaDefinition) => {
        const [low, sup] = criteria.range;

        return average >= low && average < sup;
      }
    );

    this.res = finalCriteria;
  }

  get finalCriteriaDefinition() {
    return this.res?.text;
  }

  private res: CriteriaDefinition | undefined;
}

@NgModule({
  imports: [CommonModule],
  declarations: [UiResultComponent],
  exports: [UiResultComponent],
})
export class UiResultComponentModule {}
