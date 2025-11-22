export interface DinnerRecommendation {
  name: string;
  description: string;
  category: string;
  calories: string;
  tags: string[]; // Changed from mood to tags (list of keywords)
}

export type Category = '전체' | '한식' | '중식' | '일식' | '양식' | '분식' | '면요리' | '밥요리' | '국물요리' | '야식';

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}