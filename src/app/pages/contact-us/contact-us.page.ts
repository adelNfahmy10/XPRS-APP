import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { ContactUsService } from 'src/core/services/contact-us/contact-us-service';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
  standalone: true,
  imports: [IonRefresherContent, IonRefresher, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, ReactiveFormsModule ]
})
export class ContactUsPage {
  private readonly _ContactUsService = inject(ContactUsService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _FormBuilder = inject(FormBuilder)

  handleRefresh(event: any) {

    this.contactUsForm.reset();

    event.target.complete();
  }

  contactUsForm:FormGroup = this._FormBuilder.group({
    name: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
    phone_number: [null, [Validators.required]],
    text: [null, [Validators.required]]
  })

  submitContactUs(): void {
    if (this.contactUsForm.invalid) {
      this.contactUsForm.markAllAsTouched();
      return;
    }

    const data = this.contactUsForm.value;

    this._ContactUsService.contactUs(data).subscribe({
      next: (res) => {
        this._ToastrService.success('Message sent successfully');
        this.contactUsForm.reset();
      },
      error: (err) => {
        this._ToastrService.error('Something went wrong');
      }
    });
  }

}
