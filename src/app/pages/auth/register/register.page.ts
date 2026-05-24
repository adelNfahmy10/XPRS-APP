import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/core/services/auth/auth-service';
import { ToastrService } from 'ngx-toastr';
import { ThemeService } from 'src/core/services/theme/theme-service';
import { RefreshComponent } from "src/app/components/refresh/refresh.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonRefresherContent, IonRefresher, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, RouterLink, RefreshComponent]
})
export class RegisterPage {
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _AuthService = inject(AuthService)
  private readonly _ToastrService = inject(ToastrService)
  readonly _ThemeService = inject(ThemeService)
  private readonly _Router = inject(Router)

  registerForm:FormGroup = this._FormBuilder.group({
    firstname: [null, Validators.required],
    lastname: [null, Validators.required],
    email: [null, Validators.required],
    phone: [null, Validators.required],
    password: [null, Validators.required],
    repassword: [null, Validators.required],
  })

  handleRefresh(event: any) {

    this.registerForm.reset();

    event.target.complete();
  }

  submitRegister(): void {
    const data = this.registerForm.value;

    if (data.password !== data.repassword) {
      this._ToastrService.error('Passwords do not match');
      return;
    }

    this._AuthService.register(data).subscribe({
      next: (res) => {
        this._ToastrService.success(res.details);
        this.registerForm.reset();
        this._Router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err);

        this._ToastrService.error(err.error.details);
      }
    });
  }

  // Change Themes (Dark | Light) Mode
  changeTheme() {
    this._ThemeService.enableDarkMode(
      !this._ThemeService.isDark()
    );
  }

}
