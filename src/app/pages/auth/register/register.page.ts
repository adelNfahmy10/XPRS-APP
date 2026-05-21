import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/core/services/auth/auth-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, RouterLink]
})
export class RegisterPage {
private readonly _FormBuilder = inject(FormBuilder)
  private readonly _AuthService = inject(AuthService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _Router = inject(Router)

  registerForm:FormGroup = this._FormBuilder.group({
    firstname: [null, Validators.required],
    lastname: [null, Validators.required],
    email: [null, Validators.required],
    phone: [null, Validators.required],
    password: [null, Validators.required],
    repassword: [null, Validators.required],
  })


  submitRegister(): void {
    const data = this.registerForm.value;

    if (data.password !== data.repassword) {
      this._ToastrService.error('Passwords do not match');
      return;
    }

    this._AuthService.register(data).subscribe({
      next: (res) => {
        this._ToastrService.success(res.details);
        this._Router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err);

        this._ToastrService.error(err.error.details);
      }
    });
  }
}
