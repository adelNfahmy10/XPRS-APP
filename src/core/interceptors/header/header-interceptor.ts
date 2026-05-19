import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('xprsToken');

  if(token){
    req = req.clone({
      setHeaders: {Authorization: `Token ${token}`}
    })
  }
  return next(req)
};
