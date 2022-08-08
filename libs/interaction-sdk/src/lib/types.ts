export interface InteractionSDK<T> {
  init(config: Config<T>): void;
  start(): void;
  next(fn: (state: State<T>) => State<T>): void;
  previous(fn: (state: State<T>) => State<T>): void;
}

export interface InteractorDefinition<T> {
  setConfig: (config: Config<T>) => InteractorDefinition<T>;
  setCurrentQuestion: () => InteractorDefinition<T>;
  updateCurrentQuestionStat: (type: 'add' | 'subs') => InteractorDefinition<T>;
  setNewAnsweredQuestionState: () => InteractorDefinition<T>;
  updateProgress: () => InteractorDefinition<T>;
  markAsViewed: () => InteractorDefinition<T>;
  manualUpdate: (fn: (state: State<T>) => State<T>) => InteractorDefinition<T>;
  bumpIndex: () => InteractorDefinition<T>;
  decreaseIndex: () => InteractorDefinition<T>;
  start: () => InteractorDefinition<T>;
  complete: () => InteractorDefinition<T>;
  getState: () => State<T>;
}

export interface Config<T> {
  questions: T[];
  completionTime?: number;
  introduction?: string;
}

export interface SurveyItem {
  isLast: boolean;
  isFirst: boolean;
  viewed: boolean;
  position: number;
}

export interface QuestionStat {
  current: number;
  amountAnswered: number;
  total: number;
}

export type State<T = any> = Omit<Config<T>, 'questions'> & {
  list: Array<T & SurveyItem>;
  started: boolean;
  completed: boolean;
  progress: number;
  questionStat: QuestionStat;
  currentQuestion?: T & SurveyItem;
  index: number;
};
