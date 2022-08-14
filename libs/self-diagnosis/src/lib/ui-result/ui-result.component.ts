import { Component, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Question } from '../self-diagnosis-container/self-diagnosis-container.component';
import { SurveyItem } from '@transformation/interaction-sdk';

export interface CriteriaDefinition {
  text: string;
  imagePath?: string;
  color?: string;
  range: number[];
}

const criteriaDefinition: CriteriaDefinition[] = [
  {
    text: 'Organizacion con pocos o ningunos elementos de transformacion digital',
    imagePath: 'assets/level-1.png',
    color: 'bg-danger/25',
    range: [0, 2],
  },
  {
    text: 'Organizacion con bajo avance en su Transformacion Digital y la mayoria de tareas pendientes por ejecutar',
    imagePath: 'assets/level-2.png',
    color: 'bg-warning-dark/50',
    range: [2, 5],
  },
  {
    text: 'Organizacion con mediano avance en su transformacion digital con muchas tareas pendientes por ejecutar',
    imagePath: 'assets/level-3.png',
    color: 'bg-warning/25',
    range: [5, 7],
  },
  {
    text: 'Organizacion muy avanzada en su transformacion digital con pocas traeas pendientes por ejecutar',
    imagePath: 'assets/level-4.png',
    color: 'bg-secondary-light/25',
    range: [7, 9],
  },
  {
    text: 'Organizacion transformada digitalmente',
    imagePath: 'assets/level-5.png',
    color: 'bg-info-light/25',
    range: [9, 11],
  },
];

@Component({
  selector: 'app-ui-result',
  template: `
    <div class="text-center space-y-12">
      <h2 class="text-2xl font-black text-primary">Final result</h2>
      <div class="flex justify-center">
        <figure class="w-72 rounded-lg p-4" [ngClass]="colorResult">
          <img [src]="imagePath" alt="" />
        </figure>
      </div>
      <p class="text-xl font-bold text-primary">
        {{ finalCriteriaDefinition }}
      </p>
    </div>
  `,
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

  get imagePath() {
    return this.res?.imagePath;
  }

  get colorResult() {
    return this.res?.color || '';
  }

  private res: CriteriaDefinition | undefined;
}

@NgModule({
  imports: [CommonModule],
  declarations: [UiResultComponent],
  exports: [UiResultComponent],
})
export class UiResultComponentModule {}
