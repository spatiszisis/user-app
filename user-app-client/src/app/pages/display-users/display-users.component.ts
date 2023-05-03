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
  userTest = new User().deserialize({
    birthdate: { year: 2023, month: 5, day: 4 },
    gender: "Female",
    homeAddress: null,
    name: "asd",
    surname: "asd",
    workAddress: "AGLAIS 13 EYOSMOS"
  });
  onInit = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.users$ = this.userService.users$;
    this.onInit = true;
  }

  handleOnSubmit(user: any) {
    console.log(user);
  }

  onEditUser() {
    this.onInit = false;
    const tabList = document.getElementById('tabList');
    var li = document.createElement("li");
    li.setAttribute("class", "nav-item mx-2");
    li.setAttribute("role", "presentation");
    li.setAttribute("id", `id${'zisis'}`);
    tabList.appendChild(li);

    const dynamicLi = document.getElementById(`id${'zisis'}`);
    var button = document.createElement('button');
    button.appendChild(document.createTextNode("Zisis"));
    button.setAttribute("class", "nav-link show active");
    button.setAttribute("id", `profile-tab-pane`);
    button.setAttribute("data-bs-toggle", 'tab');
    button.setAttribute("data-bs-target", '#profile-tab-pane');
    button.setAttribute("type", 'button');
    button.setAttribute("role", 'tab');
    button.setAttribute("aria-controls", 'profile-tab-pane');
    button.setAttribute("aria-selected", 'false');
    dynamicLi.appendChild(button);
  }

}
