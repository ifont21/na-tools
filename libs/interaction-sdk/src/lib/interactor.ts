import { Config, InteractorDefinition, State, SurveyItem } from './types';

export const Interactor = <T>(state: State<T>): InteractorDefinition<T> => ({
  /**
   * Init List from config
   * @param config
   * @returns InteractorDefinition<T>
   */
  setConfig: (config: Config<T>): InteractorDefinition<T> => {
    const list: Array<T & SurveyItem> = config.questions.map(
      (question: T, i: number) => {
        return {
          ...question,
          isLast: i === config.questions.length - 1,
          isFirst: i === 0,
          viewed: false,
          position: i + 1,
        };
      }
    );
    return Interactor({
      ...state,
      list,
      questionStat: {
        ...state.questionStat,
        total: config.questions.length,
      },
      introduction: config.introduction,
      completionTime: config.completionTime,
    });
  },
  /**
   * current question to be shown
   * @returns InteractorDefinition<T>
   */
  setCurrentQuestion: () => {
    const current = state.list[state.index];
    return Interactor({ ...state, currentQuestion: current });
  },
  /**
   * Update current question according current state
   * @param type
   * @returns Interactor
   */
  updateCurrentQuestionStat: (type: 'add' | 'subs') => {
    let currentQuestionStat = state.questionStat?.current ?? 0;

    if (type === 'add') {
      currentQuestionStat = currentQuestionStat + 1;
    } else {
      currentQuestionStat = currentQuestionStat - 1;
    }

    return Interactor({
      ...state,
      questionStat: { ...state.questionStat, current: currentQuestionStat },
    });
  },
  /**
   * update new questions viewed
   * @returns Interactor
   */
  setNewAnsweredQuestionState: () => {
    const viewedQuestions = state.list.filter((question) => question.viewed);

    return Interactor({
      ...state,
      questionStat: {
        ...state.questionStat,
        amountAnswered: viewedQuestions.length,
      },
    });
  },
  /**
   * Update progress percentage
   * @returns Interactor
   */
  updateProgress: () => {
    const amountAnswered = state.questionStat.amountAnswered;
    const total = state.questionStat.total;
    const progress = Math.floor((amountAnswered / total) * 100);

    return Interactor({
      ...state,
      progress,
    });
  },
  /**
   * Mark item As viewed
   * @returns InteractorDefinition<T>
   */
  markAsViewed: () => {
    const list: Array<T & SurveyItem> = state.list.map((question, i) => {
      if (i === state.index) {
        return {
          ...question,
          viewed: true,
        };
      }

      return question;
    });
    return Interactor({ ...state, list });
  },
  /**
   * Receive a function to manual update current state from outside of the interaction
   * @param fn
   * @returns
   */
  manualUpdate: (fn: (state: State<T>) => State<T>) => {
    return Interactor(fn(state));
  },
  /**
   * set the next index
   * @returns InteractorDefinition<T>
   */
  bumpIndex: () => {
    return Interactor({ ...state, index: state.index + 1 });
  },
  /**
   * set the previous index
   * @returns InteractorDefinition<T>
   */
  decreaseIndex: () => {
    return Interactor({ ...state, index: state.index - 1 });
  },
  /**
   * kick started interaction
   * @returns InteractorDefinition<T>
   */
  start: () => {
    return Interactor({ ...state, started: true });
  },
  /**
   * kick started interaction
   * @returns InteractorDefinition<T>
   */
  complete: () => {
    return Interactor({ ...state, completed: true });
  },
  /**
   * Fold state
   * @returns State
   */
  getState: (): State<T> => state,
});
