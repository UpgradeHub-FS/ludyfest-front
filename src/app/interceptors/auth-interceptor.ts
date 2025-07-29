import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = 'bearer ' + localStorage.getItem('token');
  //Si el token existe lo incluimos en las cabeceras de la peticion
  if (token) {
    const reqAuth = req.clone({
      setHeaders: {
        Authorization: token
      }
    });
    return next(reqAuth);
  }

  return next(req);
};
