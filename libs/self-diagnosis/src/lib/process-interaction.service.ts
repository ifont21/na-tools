import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Config, State, StateSurveyQuestions } from './types';

@Injectable({
  providedIn: 'root',
})
export class ProcessInteractionService {
  private readonly initState: State = {
    progress: 0,
    index: 0,
    surveyState: [],
    questionStat: {
      current: 0,
      outOf: 0,
    },
  };

  interaction$: BehaviorSubject<State> = new BehaviorSubject<State>(
    this.initState
  );

  interaction$$: Observable<State> = this.interaction$.asObservable();

  init(config: Config): void {
    const currentState = this.interaction$.value;
    const surveyState: StateSurveyQuestions = config.questions.map(
      (question) => ({ ...question, markedAsViewed: false, value: 0 })
    );
    this.interaction$.next({
      ...currentState,
      questionStat: {
        current: 0,
        outOf: config.questions.length,
      },
      surveyState,
      introduction: config.introduction,
    });

    localStorage.setItem('state', JSON.stringify(this.interaction$.value));
  }

  start(): number {
    const currentState: State = this.interaction$.value;
    this.interaction$.next({
      ...currentState,
      questionStat: {
        ...currentState.questionStat,
        current:
          currentState.questionStat?.current != null
            ? currentState.questionStat.current + 1
            : 0,
      },
    });

    return currentState.index + 1;
  }
  private calculateProgress(completed: number, outOf: number): number {
    if (completed === 0 || outOf === 0) return 0;

    return Math.floor((completed / outOf) * 100);
  }

  /* start(): void {
    const currentState = this.interaction$.value;

    if (!currentState) return;

    this.interaction$.next({
      ...currentState,
      started: true,
      questions: {
        ...currentState.questions,
        current: currentState.questions.current + 1,
      },
      currentStep: this.getCurrentQuestion(currentState),
    });
  }

  next(): void {
    if (!this.interaction$.value) return;

    const currentState = this.interaction$.value;
    const nextIndex = currentState.index + 1;
    const nextItem = currentState.steps[nextIndex];
    const questions: QuestionStat = Object.assign(
      {},
      currentState.questions,
      !nextItem.markedAsViewed
        ? { current: currentState.questions.current + 1 }
        : undefined
    );
    const progress: number = !nextItem.markedAsViewed
      ? this.calculateProgress(
          currentState.questions.current,
          currentState.questions.outOf
        )
      : currentState.progress;

    this.interaction$.next({
      ...currentState,
      index: nextIndex,
      questions,
      progress,
      currentStep: this.getCurrentQuestion(currentState),
    });
  }

  previous(): void {
    if (!this.interaction$.value) return;

    const currentState = this.interaction$.value;
    const nextIndex = currentState.index - 1;

    this.interaction$.next({
      ...currentState,
      index: nextIndex,
      currentStep: this.getCurrentQuestion(currentState),
    });
  }

  private getCurrentQuestion(currentState: InteractionState): Step {
    if (!currentState) return;

    const { index, steps } = currentState;
    const isLast = index + 1 === steps.length;

    return {
      question: steps[index],
      isLast,
    };
  }

  private calculateProgress(completed: number, outOf: number): number {
    if (completed === 0 || outOf === 0) return 0;

    return Math.floor((completed / outOf) * 100);
  } */
}
