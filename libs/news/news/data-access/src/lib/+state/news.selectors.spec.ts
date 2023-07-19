import { NewsEntity } from './news.models';
import {
  newsAdapter,
  NewsPartialState,
  initialNewsState,
} from './news.reducer';
import * as NewsSelectors from './news.selectors';

describe('News Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getNewsId = (it: NewsEntity) => it.id;
  const createNewsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as NewsEntity);

  let state: NewsPartialState;

  beforeEach(() => {
    state = {
      news: newsAdapter.setAll(
        [
          createNewsEntity('PRODUCT-AAA'),
          createNewsEntity('PRODUCT-BBB'),
          createNewsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialNewsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('News Selectors', () => {
    it('selectAllNews() should return the list of News', () => {
      const results = NewsSelectors.selectAllNews(state);
      const selId = getNewsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = NewsSelectors.selectEntity(state) as NewsEntity;
      const selId = getNewsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectNewsLoaded() should return the current "loaded" status', () => {
      const result = NewsSelectors.selectNewsLoaded(state);

      expect(result).toBe(true);
    });

    it('selectNewsError() should return the current "error" state', () => {
      const result = NewsSelectors.selectNewsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
