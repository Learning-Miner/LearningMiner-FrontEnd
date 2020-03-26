import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'cm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userRol: string;

    constructor(
      private formBuilder: FormBuilder,
      private userService: UserService,
      private router: Router,
      private cookieService: CookieService
    ) {}

    userForm: FormGroup;

    ngOnInit() {
      this.buildUserForm();
      this.cookieService.deleteAll();
      this.cookieService.set('count', '0');
    }


    private buildUserForm() {
      this.userForm = this.formBuilder.group({
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
      });
    }

    onSubmit() {
      const user = this.userForm.value as User;
      console.log(user);

      this.userService.loginUser(user.email, user.password ).subscribe(res => {
        console.log('Login enviado');
        const credentialsCorrect = res;
        localStorage.setItem('token', res.token);
        localStorage.setItem('rol', res.rol);
        this.userForm = res.rol;
        this.router.navigate(['/main-menu']);
        console.log(credentialsCorrect);
      }, error => {
        console.log('Usuario o contraseña incorrecto.');
      });
    }

}
