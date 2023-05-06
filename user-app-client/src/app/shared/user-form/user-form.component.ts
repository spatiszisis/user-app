import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  @Output()
  onSubmit: EventEmitter<User> = new EventEmitter();
  @Output()
  onDelete: EventEmitter<void> = new EventEmitter();
  @Output()
  onCancel: EventEmitter<void> = new EventEmitter();

  userForm: FormGroup;
  gender = Gender;
  serverErrors: string;
  private showValidationErrors = false;

  constructor(private formBuilder: FormBuilder, private dateService: DateService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  onCreate() {
    this.showValidationErrors = true;
    if (!this.userForm.valid) {
      return;
    }

    this.onSubmit.emit(this.userForm.value);
  }

  handleOnDelete() {
    this.onDelete.emit();
  }

  handleOnCancel() {
    this.onCancel.emit();
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

  

}
