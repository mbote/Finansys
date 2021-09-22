import { BaseResourceModel } from '../models/base-resource.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/Operators';
import { Injector } from '@angular/core';

export abstract class BaseResourceService<T extends BaseResourceModel>{

    protected http: HttpClient;

    constructor(
        protected api: string,
        protected injector: Injector,
        protected jsonDataToResourceFn: (jsonData: any) => T
    ) {
        this.http = injector.get(HttpClient);
    }

    getAll(): Observable<T[]> {
        return this.http.get<any>(this.api).pipe(
            map(this.jsonDataToResources.bind(this)),
            catchError(this.handleError)
        );
    }

    getId(id: number): Observable<T> {
        const url = `${this.api}/${id}`;
        return this.http.get(url).pipe(
            map(this.jsonDataToResource.bind(this)),
            catchError(this.handleError)
        );
    }

    create(resource: T): Observable<T> {
        return this.http.post(this.api, resource).pipe(
            map(this.jsonDataToResource.bind(this)),
            catchError(this.handleError)
        );
    }

    update(resource: T): Observable<T> {
        const url = `${this.api}/${resource.id}`;
        return this.http.put(url, resource).pipe(
            map(() => resource),
            catchError(this.handleError)
        );
    }

    delete(id: number): Observable<any> {
        const url = `${this.api}/${id}`;
        return this.http.delete(url).pipe(
            map(() => null),
            catchError(this.handleError)
        )
    }

    protected jsonDataToResource(jsonData: any): T {
        return this.jsonDataToResourceFn(jsonData);
    }

    protected jsonDataToResources(jsonData: any[]): T[] {
        const resources: T[] = [];
        jsonData.forEach(element => resources.push(this.jsonDataToResourceFn(element)));
        return resources;
    }

    protected handleError(error: any): Observable<any> {
        console.log("Erro na requisição  => ", error);
        return throwError(error);
    }
}