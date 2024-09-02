import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ProductsService } from './component/service/products.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), ProductsService],
};
export const fakeApi: string = 'https://fakestoreapi.com';
