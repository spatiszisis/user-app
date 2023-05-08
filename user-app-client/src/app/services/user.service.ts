import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, map, mergeMap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { SortOptions } from '../models/sort.enum';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    protected readonly BASE_PATH = '/api/user';
    private users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
    public users$: Observable<User[]> = this.users.asObservable();

    private user: BehaviorSubject<User> = new BehaviorSubject<User>(new User());
    public user$: Observable<User> = this.user.asObservable();

    private pages: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
    public pages$: Observable<number[]> = this.pages.asObservable();

    constructor(private http: HttpClient) { }

    public getAllUsers(pageNumber: number, sort?: SortOptions): Observable<User[]> {
        let params: HttpParams = new HttpParams().set('pageNumber', pageNumber);
        if (!!sort) {
            params = params.set('sort', sort);
        }
        return this.http.get<User[]>(`${this.BASE_PATH}/all`, { params }).pipe(
            map((json: any) => json),
            tap((json: any) => this.users.next(json.content)),
            tap((json: any) => this.pages.next(new Array(json.totalPages)))
        );
    }

    public getUser(id: number): Observable<User> {
        return this.http.get(`${this.BASE_PATH}/${id}`).pipe(
            map((json: any) => json),
            tap((user: User) => this.user.next(user))
        );
    }

    public searchUser(searchTerm?: string) {
        let params: HttpParams;
        if (!!searchTerm) {
            params = new HttpParams().set('searchTerm', searchTerm);
        }
        return this.http.get<User[]>(`${this.BASE_PATH}/search`, { params }).pipe(
            map((json: User[]) => json),
            tap((users: User[]) => this.users.next(users))
        );
    }

    public createUser(user: User): Observable<User> {
        return this.http.post(this.BASE_PATH, user).pipe(
            map((json: any) => json),
            mergeMap((user: User) => this.getAllUsers(0).pipe(map(() => user)))
        );
    }

    public updateUser(updatedUser: User, currentUserId: number): Observable<User> {
        return this.http.put<User>(`${this.BASE_PATH}/${currentUserId}`, updatedUser).pipe(
            map((json: any) => json),
            mergeMap((user: User) => this.getAllUsers(0).pipe(map(() => user)))
        );
    }

    public deleteUser(id: number): Observable<any> {
        return this.http.delete(`${this.BASE_PATH}/${id}`).pipe(
            mergeMap(() => this.getAllUsers(0).pipe(map(() => null)))
        );
    }
}
