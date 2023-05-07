import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, map, mergeMap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    protected readonly BASE_PATH = '/api/user';
    private users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
    public users$: Observable<User[]> = this.users.asObservable();

    private user: BehaviorSubject<User> = new BehaviorSubject<User>(new User());
    public user$: Observable<User> = this.user.asObservable();

    constructor(private http: HttpClient) { }

    public getAllUsers(searchTerm?: string): Observable<User[]> {
        let params: HttpParams;
        if (!!searchTerm) {
            params = new HttpParams().set('searchTerm', searchTerm);
        }
        return this.http.get<User[]>(`${this.BASE_PATH}/all`, { params }).pipe(
            map((json: User[]) => json),
            tap((users: User[]) => this.users.next(users))
        );
    }

    public getUser(user: User): Observable<User> {
        const params: HttpParams = new HttpParams().set('name', user.name).set('surname', user.surname);
        return this.http.get(this.BASE_PATH, { params }).pipe(
            map((json: any) => json),
            tap((user: User) => this.user.next(user))
        );
    }

    public createUser(user: User): Observable<User> {
        return this.http.post(this.BASE_PATH, user).pipe(
            map((json: any) => json),
            mergeMap((user: User) => this.getAllUsers().pipe(map(() => user)))
        );
    }

    public updateUser(updatedUser: User, currentUser: User): Observable<User> {
        const userResource = {
            updatedUser: updatedUser,
            currentUser: currentUser
        };
        return this.http.put<User>(this.BASE_PATH, userResource).pipe(
            map((json: any) => json),
            mergeMap((user: User) => this.getAllUsers().pipe(map(() => user)))
        );
    }

    public deleteUser(user: User): Observable<any> {
        const params: HttpParams = new HttpParams().set('name', user.name).set('surname', user.surname);
        return this.http.delete(this.BASE_PATH, { params }).pipe(
            mergeMap(() => this.getAllUsers().pipe(map(() => null)))
        );
    }
}
