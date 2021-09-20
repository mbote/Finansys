import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/Operators';
import { Entry } from './entry.model';

import { CategoryService } from '../../categories/shared/category.service';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private api: string = "api/entries";

  constructor(private http: HttpClient, private categoryService: CategoryService) { }

  getAll(): Observable<Entry[]> {
    return this.http.get(this.api).pipe(
      catchError(this.handlerError),
      map(this.jsonDataToEntries)
    )
  }

  getId(id: number): Observable<Entry> {
    const url = `${this.api}/${id}`;
    return this.http.get(url).pipe(
      catchError(this.handlerError),
      map(this.jsonDataToCategory)
    )
  }

  create(entry: Entry): Observable<Entry> {
    return this.categoryService.getId(entry.categoryId!).pipe(
      flatMap(category => {
        entry.category = category;
        return this.http.post(this.api, entry).pipe(
          catchError(this.handlerError),
          map(this.jsonDataToCategory)
        )
      })
    )
  }

  update(entry: Entry): Observable<Entry> {
    const url = `${this.api}/${entry.id}`;
    return this.categoryService.getId(entry.categoryId!).pipe(
      flatMap(category => {
        entry.category = category;
        return this.http.put(url, entry).pipe(
          catchError(this.handlerError),
          map(() => entry)
        )
      })
    )
  }

  delete(id: number): Observable<any> {
    const url = `${this.api}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handlerError),
      map(() => null)
    )
  }

  private handlerError(error: any): Observable<any> {
    console.log("Erro na requisição => ", error);
    return throwError(error);
  }

  private jsonDataToEntries(jsonData: any[]): Entry[] {
    const entries: Entry[] = [];
    jsonData.forEach(element => {
      const entry = Object.assign(new Entry(), element);
      entries.push(entry);
    });
    return entries;
  }

  private jsonDataToCategory(jsonData: any): Entry {
    return Object.assign(new Entry(), jsonData);
  }
}