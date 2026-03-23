import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  forkJoin,
  from,
  map,
  mergeMap,
  Observable,
  switchMap,
  take,
  tap,
  toArray,
} from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class BoardDataService {
  constructor(private http: HttpClient) {}
  getStoryID(totalVal: number = 6) {
    return this.http
      .get<number[]>('https://hacker-news.firebaseio.com/v0/jobstories.json')
      .pipe(
          mergeMap((story: any) => {
            return forkJoin(story.map((str: any) => {
                return this.http.get('https://hacker-news.firebaseio.com/v0/item/' +str +'.json')
              }),
            )
          }),
      )
  }


}
