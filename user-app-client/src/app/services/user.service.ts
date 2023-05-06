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

    public getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.BASE_PATH}/all`).pipe(
            map((json: User[]) => json),
            tap((users: User[]) => this.users.next(users))
        );
    }

    public getUser(name: string, surname: string): Observable<User> {
        const params: HttpParams = new HttpParams().set('name', name).set('surname', surname);
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

    public updateUser(userUpdate: any): Observable<User> {
        return this.http.put<User>(this.BASE_PATH, userUpdate).pipe(
            map((json: any) => json),
            tap((user: User) => this.user.next(user))
        );
    }

    public deleteUser(id: number): Observable<any> {
        return this.http.delete(`${this.BASE_PATH}/${id}`).pipe(
            mergeMap(() => this.getAllUsers().pipe(map(() => null)))
        );
    }
}