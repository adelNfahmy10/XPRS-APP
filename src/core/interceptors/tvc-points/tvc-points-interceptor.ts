import { HttpInterceptorFn } from '@angular/common/http';

export const tvcPointsInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
