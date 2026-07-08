import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

import { provideToastr } from 'ngx-toastr';

// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headerInterceptor } from './core/interceptors/header/header-interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { importProvidersFrom } from '@angular/core';
import { loadingInterceptor } from './core/interceptors/loading/loading-interceptor';
import { authInterceptor } from './core/interceptors/auth/auth-interceptor';
// register Swiper custom elements
register();

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(withFetch(), withInterceptors([headerInterceptor,loadingInterceptor, authInterceptor])),
    provideAnimations(),
    provideToastr(),
    importProvidersFrom(NgxSpinnerModule),
  ],
});
