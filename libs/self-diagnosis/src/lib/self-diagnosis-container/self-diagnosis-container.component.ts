import {
  Config,
  InteractionSDKImpl,
  State as SelfDiagnosisInteractionState,
} from '@transformation/interaction-sdk';
import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { SelfDiagnosisComponentModule } from '../self-diagnosis/self-diagnosis.component';

const questions = [
  'Conocemos y entendemos a nuestros actuales y potenciales clientes',
  'Conocemos cómo hacer crecer los ingresos y utilidades de nuestro negocio',
  'Sabemos cuáles son los puntos de contacto, físicos y digitales, con nuestros actuales y potenciales clientes',
  'Existen procesos de negocio definidos, establecidos y conocidos tanto interna como externamente',
  'Los colaboradores poseen, aplican y dominan los conocimientos y herramientas derivados con la nueva realidad del negocio',
  'Existe un liderazgo comprometido desde el dueño, alta gerencia y otros cargos claves para promover, implantar y hacer seguimiento a la transformación',
  'Sabemos cómo la transformación digital influye en nuestro modelo de negocio tradicional y cómo lo modifica',
  'Sabemos cómo crear nuevos productos y/o servicios derivados de la realidad digital',
  'Sabemos cómo nuestro negocio puede aprovechar la transformación digital para ser más global y competir efectivamente',
  'Tenemos todas las capacidades tecnológicas y digitales para desarrollar los puntos anteriores',
];

export interface Question {
  title: string;
  description: string;
  value: number;
}

const config: Config<Question> = {
  questions: questions.map((q) => ({
    title: q,
    description:
      'Placeholder description Placeholder description Placeholder description Placeholder description Placeholder description Placeholder description',
    value: 0,
  })),
  completionTime: 3,
  introduction:
    'Placeholder introduction Placeholder introduction Placeholder introduction Placeholder introduction Placeholder introduction Placeholder introduction',
};

@Component({
  selector: 'app-self-diagnosis-container',
  template: `
    <app-self-diagnosis
      [survey]="(survey$ | async)!"
      (startSurvey)="onStartSurvey()"
      (nextQuestion)="onNextQuestion($event)"
      (previousQuestion)="onPreviousQuestion()"
      (completeSurvey)="onNextQuestion($event)"
    ></app-self-diagnosis>
  `,
  styles: [],
})
export class SelfDiagnosisContainerComponent implements OnInit {
  survey$: Observable<SelfDiagnosisInteractionState<Question> | null> =
    this.interaction.interaction$;

  constructor(
    @Inject('InteractionService')
    private interaction: InteractionSDKImpl<Question>
  ) {}

  ngOnInit(): void {
    this.interaction.init(config);
  }

  onStartSurvey(): void {
    this.interaction.start();
  }

  onNextQuestion(rate: number): void {
    this.interaction.next((state: SelfDiagnosisInteractionState<Question>) => {
      const list = state.list.map((question, i) => {
        if (i === state.index) {
          return {
            ...question,
            value: rate,
          };
        }

        return question;
      });
      return { ...state, list };
    });
  }

  onPreviousQuestion(): void {
    this.interaction.previous();
  }
}

@NgModule({
  imports: [
    CommonModule,
    SelfDiagnosisComponentModule,
    RouterModule.forChild([
      {
        path: '',
        component: SelfDiagnosisContainerComponent,
      },
    ]),
  ],
  providers: [
    {
      provide: 'InteractionService',
      useFactory: () => new InteractionSDKImpl<Question>(),
    },
  ],
  declarations: [SelfDiagnosisContainerComponent],
})
export class SelfDiagnosisContainerComponentModule {}
