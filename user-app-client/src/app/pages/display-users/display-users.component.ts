import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-display-users',
  templateUrl: './display-users.component.html',
  styleUrls: ['./display-users.component.scss']
})
export class DisplayUsersComponent implements OnInit {

  users$: Observable<User[]>;
  selectedUser: User;
  selectedUserLi: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.users$ = this.userService.users$;
  }

  handleOnSubmit(user: any) {
    console.log(user);
  }

  handleOnDelete() {
    this.clearUser();
  }

  handleOnCancel() {
    this.clearUser();
  }

  onEditUser(user: User) {
    this.userService.getUser(user.name, user.surname).subscribe((user: User) => {
      this.selectedUser = user;
      this.createEditTab(user.name);
    }); 
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
