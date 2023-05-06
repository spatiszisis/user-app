import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { DateService } from 'src/app/services/date.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private dateService: DateService, private router: Router) { }

  ngOnInit(): void {

  }

  handleOnSubmit(user: any) {
    const newUser = new User().deserialize({
      name: user.name,
      surname: user.surname,
      gender: user.gender,
      birthdate: this.dateService.formatDate(user.birthdate),
      homeAddress: !!user.homeAddress ? {
        name: user.homeAddress
      } : null,
      workAddress: !!user.workAddress ? {
        name: user.workAddress
      } : null
    });
    this.userService.createUser(newUser).subscribe(() => {
      this.router.navigate(['users']);
    });
  }
}
