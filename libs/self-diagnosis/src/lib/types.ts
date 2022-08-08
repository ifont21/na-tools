export interface RangeQuestion {
  question?: string;
  description?: string; // like an example or something more detailed
  markedAsViewed: boolean;
}

export interface QuestionStat {
  current: number;
  outOf: number;
}

export type Step =
  | {
      question: RangeQuestion;
      isLast: boolean;
    }
  | undefined;

export interface InteractionState {
  steps: RangeQuestion[];
  completionTime: number;
  progress: number; // percentage
  questions: QuestionStat;
  introduction: string;
  index: number;
  currentStep: Step;
  started: boolean;
}

export interface Question {
  position: number;
  title: string;
  description?: string;
}

export type StateSurveyQuestions = Array<
  Question & {
    markedAsViewed: boolean;
    value: number;
  }
>;

export interface Config {
  questions: Question[];
  completionTime: number; // in minutes
  introduction: string;
}

export type State = {
  progress: number;
  questionStat: QuestionStat;
  index: number;
  surveyState: StateSurveyQuestions;
} & Partial<Omit<Config, 'questions'>>;

export type Survey = Omit<State, 'surveyState'> & {
  question?: Question;
};
