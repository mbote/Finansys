import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from '../../../shared/services/base-resource.services';

import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/Operators';

import { Entry } from './entry.model';
import { CategoryService } from '../../categories/shared/category.service';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {


  constructor(protected injector: Injector, private categoryService: CategoryService) {
      super("api/entries", injector, Entry.fromJson);
   }


  create(entry: Entry): Observable<Entry> {
    return this.categoryService.getId(entry.categoryId!).pipe(
      flatMap(category => {
        entry.category = category;
        return super.create(entry);
      })
    )
  }

  update(entry: Entry): Observable<Entry> {
    return this.categoryService.getId(entry.categoryId!).pipe(
      flatMap(category => {
        entry.category = category;
        return super.update(entry);
      })
    )
  }

}
