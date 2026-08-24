import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { AuthService } from 'src/core/services/auth/auth-service';
import { ToastrService } from 'ngx-toastr';
import { ThemeService } from 'src/core/services/theme/theme-service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class ChangePasswordPage {
  private readonly _AuthService = inject(AuthService)
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _ToastrService = inject(ToastrService)
  readonly _ThemeService = inject(ThemeService)

  changePasswordForm: FormGroup = this._FormBuilder.group(
    {
      old_password: [ '', [ Validators.required, ] ],
      new_password1: [ '', [ Validators.required ] ],
      new_password2: [ '', [ Validators.required ] ]
    },
    {
      validators: this.passwordMatchValidator
    }
  );


  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('new_password1')?.value;
    const confirmPassword = control.get('new_password2')?.value;

    return password === confirmPassword
      ? null
      : { passwordMismatch: true };
  }

  submitChangePassword():void{
    if (this.changePasswordForm.invalid) {
      this.changePasswordForm.markAllAsTouched();
      return;
    }

    let data = this.changePasswordForm.value

    this._AuthService.changePassword(data).subscribe({
      next:(res)=>{
        this.changePasswordForm.reset();
        this._ToastrService.success('Change Password Is Successfully');
      },
      error:(err)=>{
        let errorMessage = 'Failed to change password.';

        if (err.error?.old_password?.length) {
          errorMessage = err.error.old_password[0];
        } else if (err.error?.new_password1?.length) {
          errorMessage = err.error.new_password1[0];
        } else if (err.error?.new_password2?.length) {
          errorMessage = err.error.new_password2[0];
        } else if (err.error?.detail) {
          errorMessage = err.error.detail;
        } else if (typeof err.error === 'string') {
          errorMessage = err.error;
        }

        this._ToastrService.error(errorMessage);
      }
    })
  }
}
