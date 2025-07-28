import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth-interceptor';

import { routes } from './app.routes';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()), //recoger la parte variable de la url

    provideHttpClient(
      withInterceptors([authInterceptor])//añadimos esta funcion para poder trabajar con el interceptor que creamos previamente
    ) //con esto podemos lanzar peticiones internas a nuestro back
   
  ]
};
