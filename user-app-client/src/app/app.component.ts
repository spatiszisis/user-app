import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private userService: UserService, private toastService: ToastService) {
    this.userService.getAllUsers().subscribe();
  }
}
