import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from '../../../shared/services/base-resource.services';

import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/Operators';

import { Entry } from './entry.model';
import { CategoryService } from '../../categories/shared/category.service';

import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {

  constructor(protected injector: Injector, private categoryService: CategoryService) {
    super("api/entries", injector, Entry.fromJson);
  }

  create(entry: Entry): Observable<Entry> {
    return this.setCategoryAndSendToServer(entry, super.create.bind(this));
  }

  update(entry: Entry): Observable<Entry> {
    return this.setCategoryAndSendToServer(entry, super.update.bind(this));
  }

  private setCategoryAndSendToServer(entry: Entry, sendFn: any): Observable<any> {
    return this.categoryService.getId(entry.categoryId!).pipe(
      flatMap(category => {
        entry.category = category;
        return sendFn(entry);
      }),
      catchError(this.handleError)
    )
  }

  getByMonthAndYear(month:number, year:number): Observable<Entry[]>{
    return this.getAll().pipe(
      map(entries => this.filterByMonthAndYear(entries, month, year))
    )
  }

  filterByMonthAndYear(entries:Entry[], month:number, year:number){
    return entries.filter(entry => {
      const entryData  = moment(entry.date, 'DD/MM/YYYY');
      const monthMatches = entryData.month()+1 == month;
      const yearMatches = entryData.year() == year;
      if(monthMatches && yearMatches) 
        return entry;
      else return 
        null;
    })
  }
}
