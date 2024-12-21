import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '@env/environment';

export const setBaseUrl : HttpInterceptorFn = (req, next) =>{
  const url = environment.api;
  const newApiRequest = req.clone({ url: `${url}${req.url}` });
  return next(newApiRequest);
}
