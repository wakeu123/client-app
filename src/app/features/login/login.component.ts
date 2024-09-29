import { Component, ElementRef, OnInit, inject, viewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToggleLoginRegisterDirective } from '@core/directives/toggle-login-register.directive';

export type record = Record<string, string>;

@Component({
  selector: 'login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule, 
    ToggleLoginRegisterDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup | null = null;
  registerForm: FormGroup | null = null;

  container = viewChild<ElementRef<HTMLElement>>('containerRef');
  
  private fb = inject(FormBuilder);

  ngOnInit(): void {
      console.log(JSON.stringify('{0}'));
      this.initLoginForm();
      this.initRegisterForm();
  }

  public initLoginForm() {
    this.loginForm = this.fb.group({
      email: ['azerty', Validators.required],
      password: ['azerty', Validators.required]
    });
  }

  public initRegisterForm() {
    this.registerForm = this.fb.group({
      userName: ['azerty', Validators.required],
      email: ['admin@admin.com', [Validators.email]],
      password: ['azerty', Validators.required]
    });
  }

  onLogin = (): void => {
    console.log(this.loginForm?.value);
  }

  onRegister = (): void => {
    console.log(this.registerForm?.value);
  }
  
}
