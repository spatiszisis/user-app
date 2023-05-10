import { Component, OnInit } from '@angular/core';
import { Observable, Subject, debounceTime, switchMap, tap } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-display-users',
  templateUrl: './display-users.component.html',
  styleUrls: ['./display-users.component.scss']
})
export class DisplayUsersComponent implements OnInit {

  users$: Observable<User[]>;
  selectedUser: User;
  selectedUserLi: any;
  searchTerm: Subject<string> = new Subject();
  search$: Observable<string> = this.searchTerm.asObservable();
  isSearching = false;
  updateUserSubscription: Subscription;
  selectedPage = 0;
  selectPageSize = 4;
  selectedSortOption = '';
  pages$: Observable<number[]>;

  constructor(private userService: UserService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.users$ = this.userService.users$;
    this.pages$ = this.userService.pages$;

    this.search$.pipe(
      tap(() => this.isSearching = true),
      debounceTime(500),
      switchMap(searchTerm => !!searchTerm ? this.userService.searchUser(searchTerm) : this.userService.getAllUsers(0))
    ).subscribe(() => this.isSearching = false);
  }

  handleOnUpdateUser(updatedUser: User) {
    this.updateUserSubscription = this.userService.updateUser(updatedUser, this.selectedUser.id).subscribe(() => {
      this.clearUser();
      this.toastService.showSuccess(`The user ${updatedUser.fullName()} has been updated.`);
    });
  }

  handleOnDelete(user: User) {
    this.userService.deleteUser(user.id).subscribe(() => {
      this.clearUser();
      this.toastService.showDanger(`The user has been deleted.`);
    });
  }

  handleOnCancel() {
    this.clearUser();
  }

  onEditUser(user: User) {
    this.userService.getUser(user.id).subscribe((user: User) => {
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

  onSortBy(sortProperty: string) {
    this.selectedSortOption = sortProperty;
    this.userService.getAllUsers(this.selectedPage, this.selectPageSize, this.selectedSortOption).subscribe();
  }

  handleClickPage(page: number, event: Event) {
    event.preventDefault();
    this.selectedPage = page;
    this.userService.getAllUsers(this.selectedPage, this.selectPageSize, this.selectedSortOption).subscribe();
  }

  onChangeSizePage(sizePage: any) {
    this.selectPageSize = sizePage.target.value;
    this.userService.getAllUsers(0, this.selectPageSize, this.selectedSortOption).subscribe();
  }

  private clearUser() {
    this.selectedUser = undefined;
    this.selectedUserLi.remove();
    this.selectedPage = 0;
    this.userService.getAllUsers(this.selectedPage, this.selectPageSize, this.selectedSortOption).subscribe();
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
