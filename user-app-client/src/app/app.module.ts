import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { RegisterComponent } from './pages/register/register.component';
import { DisplayUsersComponent } from './pages/display-users/display-users.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeadingComponent } from './shared/heading/heading.component';
import { NgbDatepickerModule, NgbModule, NgbPopoverModule, NgbToastModule  } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { UserFormComponent } from './shared/user-form/user-form.component';
import { ToastsComponent } from './shared/toasts/toasts.component';
import { ButtonComponent } from './shared/button/button.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    RegisterComponent,
    DisplayUsersComponent,
    HeadingComponent,
    UserFormComponent,
    ToastsComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbDatepickerModule,
    HttpClientModule,
    NgbToastModule,
    NgbPopoverModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
