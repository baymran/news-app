import { Action } from '@ngrx/store';

import * as NewsActions from './news.actions';
import { NewsEntity } from './news.models';
import { NewsState, initialNewsState, newsReducer } from './news.reducer';

describe('News Reducer', () => {
  const createNewsEntity = (id: string, name = ''): NewsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid News actions', () => {
    it('loadNewsSuccess should return the list of known News', () => {
      const news = [
        createNewsEntity('PRODUCT-AAA'),
        createNewsEntity('PRODUCT-zzz'),
      ];
      const action = NewsActions.loadNewsSuccess({ news });

      const result: NewsState = newsReducer(initialNewsState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = newsReducer(initialNewsState, action);

      expect(result).toBe(initialNewsState);
    });
  });
});
