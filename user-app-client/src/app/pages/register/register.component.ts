import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, delay } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  saveUserSubscription: Subscription;
  serverError: string;

  constructor(private userService: UserService, private router: Router, private toastService: ToastService) { }

  handleOnSubmit(user: User) {
    this.saveUserSubscription = this.userService.createUser(user).pipe(delay(2000)).subscribe(() => {
      this.router.navigate(['users']);
      this.toastService.showSuccess(`The user ${user.fullName()} has been created.`);
    }, error => this.serverError = error.error);
  }
}
