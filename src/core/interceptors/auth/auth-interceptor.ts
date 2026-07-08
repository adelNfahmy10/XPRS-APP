import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { tap } from 'rxjs/operators';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {

  // Login & Register
  if (
    req.url.includes('login') ||
    req.url.includes('users/me/?from_mobile=true')
  ) {
    return next(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          const body = event.body as any;

          if (body?.token) {
            localStorage.setItem('XPRSAppToken', body.token);
          }
        }
      })
    );
  }

  // TVS Token
  if (req.url.includes('https://api.tradelinestores.net/token')) {
    const request = req.clone({
      setHeaders: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    return next(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          const body = event.body as any;

          if (body?.access_token) {
            localStorage.setItem('xprsPointsToken', body.access_token);
          }
        }
      })
    );
  }

  // Get Points
  if (req.url.includes('api/Account/GetPoints')) {
    const token = localStorage.getItem('xprsPointsToken');

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    }
    return next(req);
  }

  // Get Points History
  if (req.url.includes('api/Account/GetCustomersPoints')) {
    const token = localStorage.getItem('xprsPointsToken');

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
    }

    return next(req);
  }

  // باقي الـ APIs الخاصة بالتطبيق
  const token = localStorage.getItem('XPRSAppToken');

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Token ${token}`
      }
    });
  }
  return next(req);
};
