import { Component, OnInit } from '@angular/core';
import { Observable, Subject, debounceTime, switchMap, tap } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { SortOptions } from 'src/app/models/sort.enum';

@Component({
  selector: 'app-display-users',
  templateUrl: './display-users.component.html',
  styleUrls: ['./display-users.component.scss']
})
export class DisplayUsersComponent implements OnInit {

  users$: Observable<User[]>;
  selectedUser: User;
  selectedUserLi: any;
  protected searchTerm: Subject<string> = new Subject();
  private search$: Observable<string> = this.searchTerm.asObservable();
  isSearching = false;
  updateUserSubscription: Subscription;
  removeUserSubscription: Subscription;
  sortOptions = SortOptions;

  constructor(private userService: UserService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.users$ = this.userService.users$;

    this.search$.pipe(
      tap(() => this.isSearching = true),
      debounceTime(500),
      switchMap(searchTerm => this.userService.getAllUsers(searchTerm))
    ).subscribe(() => this.isSearching = false);
  }

  handleOnUpdateUser(updatedUser: User) {
    this.updateUserSubscription = this.userService.updateUser(updatedUser, this.selectedUser).subscribe(() => {
      this.clearUser();
      this.toastService.showSuccess(`The user ${updatedUser.fullName()} has been updated.`);
    });
  }

  handleOnDelete(user: User) {
    this.removeUserSubscription = this.userService.deleteUser(user).subscribe(() => {
      this.clearUser();
      this.toastService.showDanger(`The user has been deleted.`);
    });
  }

  handleOnCancel() {
    this.clearUser();
  }

  onEditUser(user: User) {
    this.userService.getUser(user).subscribe((user: User) => {
      this.selectedUser = user;
      this.createEditTab(user.name);
    });
  }

  onSearch(event: Event) {
    const inputText = event?.target['value'];
    this.searchTerm.next(inputText);
  }

  onClearSearch() {
    this.searchTerm.next('');
  }

  onSortByName(sort: any) {
    console.log(sort.target.value);
    this.userService.getAllUsers(null, sort.target.value as SortOptions).subscribe();
  }

  private clearUser() {
    this.selectedUser = undefined;
    this.selectedUserLi.remove();

  }

  private createEditTab(userName: string) {
    const tabList = document.getElementById('tabList');
    this.selectedUserLi = document.createElement("li");
    this.selectedUserLi.setAttribute("class", "nav-item mx-2");
    this.selectedUserLi.setAttribute("role", "presentation");
    this.selectedUserLi.setAttribute("id", `id${userName}`);
    tabList.appendChild(this.selectedUserLi);

    const dynamicLi = document.getElementById(`id${userName}`);
    var button = document.createElement('button');
    button.appendChild(document.createTextNode("Zisis"));
    button.setAttribute("class", "nav-link show active");
    button.setAttribute("id", 'nav-user-tab');
    button.setAttribute("data-bs-toggle", 'tab');
    button.setAttribute("data-bs-target", '#nav-user');
    button.setAttribute("type", 'button');
    button.setAttribute("role", 'tab');
    button.setAttribute("aria-controls", 'nav-user');
    button.setAttribute("aria-selected", 'false');
    dynamicLi.appendChild(button);
  }

}
