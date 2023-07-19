import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as NewsActions from './news.actions';
import { NewsEffects } from './news.effects';

describe('NewsEffects', () => {
  let actions: Observable<Action>;
  let effects: NewsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        NewsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(NewsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: NewsActions.initNews() });

      const expected = hot('-a-|', {
        a: NewsActions.loadNewsSuccess({ news: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
