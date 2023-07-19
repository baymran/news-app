import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nx/angular/testing';

import * as NewsActions from './news.actions';
import { NewsEffects } from './news.effects';
import { NewsFacade } from './news.facade';
import { NewsEntity } from './news.models';
import {
  NEWS_FEATURE_KEY,
  NewsState,
  initialNewsState,
  newsReducer,
} from './news.reducer';
import * as NewsSelectors from './news.selectors';

interface TestSchema {
  news: NewsState;
}

describe('NewsFacade', () => {
  let facade: NewsFacade;
  let store: Store<TestSchema>;
  const createNewsEntity = (id: string, name = ''): NewsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(NEWS_FEATURE_KEY, newsReducer),
          EffectsModule.forFeature([NewsEffects]),
        ],
        providers: [NewsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(NewsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allNews$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allNews$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadNewsSuccess` to manually update list
     */
    it('allNews$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allNews$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        NewsActions.loadNewsSuccess({
          news: [createNewsEntity('AAA'), createNewsEntity('BBB')],
        })
      );

      list = await readFirst(facade.allNews$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
