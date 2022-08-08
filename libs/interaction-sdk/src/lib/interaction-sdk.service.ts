import { BehaviorSubject, Observable } from 'rxjs';
import { Interactor } from './interactor';
import { Config, InteractionSDK, State } from './types';

const initState: State = {
  list: [],
  started: false,
  completed: false,
  progress: 0,
  index: 0,
  questionStat: {
    current: 0,
    total: 0,
    amountAnswered: 0,
  },
};

export class InteractionSDKImpl<T> implements InteractionSDK<T> {
  interactionState$: BehaviorSubject<State<T>> = new BehaviorSubject<State<T>>(
    initState
  );

  interaction$: Observable<State<T>> = this.interactionState$.asObservable();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  init(config: Config<T>): void {
    const interaction: State<T> = Interactor(initState)
      .setConfig(config)
      .getState();

    this.interactionState$.next(interaction);
  }

  start(): void {
    const interaction: State<T> = Interactor(this.interactionState$.value)
      .start()
      .setCurrentQuestion()
      .updateCurrentQuestionStat('add')
      .setNewAnsweredQuestionState()
      .getState();

    this.interactionState$.next(interaction);
  }

  next(fn: (state: State<T>) => State<T>): void {
    const interaction: State<T> = Interactor(this.interactionState$.value)
      .manualUpdate(fn)
      .markAsViewed()
      .bumpIndex()
      .setCurrentQuestion()
      .updateCurrentQuestionStat('add')
      .setNewAnsweredQuestionState()
      .updateProgress()
      .getState();

    if (interaction.index === interaction.list.length) {
      this.interactionState$.next(
        Interactor(interaction).complete().getState()
      );
      return;
    }

    this.interactionState$.next(interaction);
  }

  previous(): void {
    const interaction: State<T> = Interactor(this.interactionState$.value)
      .decreaseIndex()
      .setCurrentQuestion()
      .updateCurrentQuestionStat('subs')
      .getState();

    this.interactionState$.next(interaction);
  }
}
