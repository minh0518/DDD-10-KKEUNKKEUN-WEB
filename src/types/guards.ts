import { CardListType, FeedbackListType, PresentationListType } from './service';

export const PresentationListTypeGuard = (
  data: CardListType,
): data is PresentationListType['page']['content'][0] => {
  return 'dday' in data;
};

export const FeedbackListTypeGuard = (
  data: CardListType,
): data is FeedbackListType['page']['content'][0] => {
  return 'status' in data;
};
