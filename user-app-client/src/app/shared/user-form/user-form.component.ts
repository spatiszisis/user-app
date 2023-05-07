import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ButtonStyle } from 'src/app/models/button-style.enum';
import { Gender } from 'src/app/models/gender.enum';
import { User } from 'src/app/models/user.model';
import { DateService } from 'src/app/services/date.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  @Input()
  user = new User();
  @Input()
  subscription: Subscription;
  @Output()
  onSubmit: EventEmitter<User> = new EventEmitter();
  @Output()
  onDelete: EventEmitter<User> = new EventEmitter();
  @Output()
  onCancel: EventEmitter<void> = new EventEmitter();

  userForm: FormGroup;
  gender = Gender;
  serverErrors: string;
  private showValidationErrors = false;
  buttonStyle = ButtonStyle;

  @ViewChild('popover', { static: false })
  popoverRef: NgbPopover;

  constructor(private formBuilder: FormBuilder, private dateService: DateService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  onCreate() {
    this.showValidationErrors = true;
    if (!this.userForm.valid) {
      return;
    }
    const userFormValue = this.userForm.value;
    const newUser = new User().deserialize({
      name: userFormValue.name,
      surname: userFormValue.surname,
      gender: userFormValue.gender,
      birthdate: this.dateService.formatDate(userFormValue.birthdate),
      homeAddress: !!userFormValue.homeAddress ? {
        name: userFormValue.homeAddress
      } : null,
      workAddress: !!userFormValue.workAddress ? {
        name: userFormValue.workAddress
      } : null
    });

    this.onSubmit.emit(newUser);
  }

  handleOnDelete() {
    this.onDelete.emit(this.user);
  }

  handleOnCancel() {
    this.onCancel.emit();
  }

  onClosePopover() {
    this.popoverRef.close();
  }
  
  private buildForm(): void {
    const controls = {
      name: [this.user.name, [Validators.required]],
      surname: [this.user.surname, [Validators.required]],
      gender: [this.user.gender, [Validators.required]],
      birthdate: [this.dateService.parseDate(this.user.birthdate), [Validators.required]],
      workAddress: [this.user.workAddress?.name],
      homeAddress: [this.user.homeAddress?.name]
    }

    this.userForm = this.formBuilder.group(controls);
  }

  get userFormControl() {
    return this.userForm.controls;
  }

  get hasErrorName() {
    return (this.userFormControl.name.touched || this.showValidationErrors) && this.userFormControl.name.errors?.required;
  }

  get hasErrorSurname() {
    return (this.userFormControl.surname.touched || this.showValidationErrors) && this.userFormControl.surname.errors?.required;
  }

  get hasErrorGender() {
    return (this.userFormControl.gender.touched || this.showValidationErrors) && this.userFormControl.gender.errors?.required;
  }

  get hasErrorBirthdate() {
    return (this.userFormControl.birthdate.touched || this.showValidationErrors) && this.userFormControl.birthdate.errors?.required;
  }

  get loading() {
    return this.subscription && !this.subscription.closed;
  }
}
