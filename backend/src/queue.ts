import { Action } from './models/actionModel';
import { calculateRandomCredits } from './utils/utils';
export const actionQueue: string[] = ["C","C","A","B","A"];

export const actionCredits: Action[] = [
  { type: 'A', executionCredits: calculateRandomCredits(15) },
  { type: 'B', executionCredits: calculateRandomCredits(15) },
  { type: 'C', executionCredits: calculateRandomCredits(15) }
];

export const setExecutionCredits = (type: string, credits: number) => {
  const action = actionCredits.find(action => action.type === type);
  if (action) {
    action.executionCredits = credits;
  }
}

export const getExecutionCredits = (type: string) => {
  const action = actionCredits.find(action => action.type === type);
  if (action) {
    return action.executionCredits
  }
}
