import {catchError, from, mergeMap, Observable, of, tap, toArray} from "rxjs";
import {NewsEntity} from "@core/data-access";

export function getNewsKeysFromLocalStorage(): string[] {
  const allKeys: string[] = Object.keys(localStorage);
  return allKeys.filter((key) => {
    const id = +key
    return !isNaN(id) && id >= 8000 && id <= 9000;
  });
}

export function getObjectsWithKeys(keys: string[]): Observable<NewsEntity[] > {
  return from(keys).pipe(
    mergeMap((key) => {
      const value = localStorage.getItem(key);
      return value ? of(JSON.parse(value)) : of(null);
    }),
    tap(console.log),
    toArray(),
    catchError((error) => {
      console.error('Error while fetching objects from localStorage:', error);
      return of([]);
    })
  );
}
