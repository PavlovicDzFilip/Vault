import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';


export function setBaseUrlInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const url = environment.api;
  const newApiRequest = req.clone({ url: `${url}${req.url}` });
  return next(newApiRequest);
}
