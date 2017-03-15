/**
 * This file and `main.node.ts` are identical, at the moment(!)
 * By splitting these, you're able to create logic, imports, etc that are "Platform" specific.
 * If you want your code to be completely Universal and don't need that
 * You can also just have 1 file, that is imported into both
 * client.ts and server.ts
 */

import { NgModule, CUSTOM_ELEMENTS_SCHEMA,ModuleWithProviders,LOCALE_ID, ApplicationRef } from '@angular/core';
import { AUTO_PREBOOT,UniversalModule, UNIVERSAL_CACHE } from 'angular2-universal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './index';
import { isBrowser, isNode } from 'angular2-universal/node'; // for AoT we need to manually 
import { routing,routedComponents } from './app.routes';
import { HttpClient } from './core/http-client';
import { Config } from './core/config';
import { Auth } from './providers/auth.service';
import { AuthGuard } from './core/auth-guard.service';
import { OrderSrv } from './providers/order.service';
import { Contact } from './providers/contact.service';
import { ClientSrv } from './providers/clients.service';
import { DatepickerModule } from 'ng2-bootstrap';
import { TagInputModule } from 'ng2-tag-input';
import { FileUploadModule } from 'ng2-file-upload';
import {OrderData} from './core/order-data';
import {UserData} from './core/user-data';
import { StorageService } from './core/storage.service';
import { ServerStorage } from './core/storage.node';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { CookieBackendService } from 'angular2-cookie/services/cookies.backend.service';
import { TimepickerModule } from 'ng2-bootstrap';
import {RlTagInputModule} from 'angular2-tag-input';

import { PublicHeaderComponent } from './public-header/public-header.component';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CacheService } from './shared/cache.service';
import { ApiService } from './shared/api.service';
import { ModelService } from './shared/model.service';
import { PartnerSignupComponent } from './partner-signup/partner-signup.component';
import { LogInComponent } from './log-in/log-in.component';
import { UserComponent } from './user/user.component';
import { OrdersComponent } from './orders/orders.component';
import { SelectTruckComponent } from './select-truck/select-truck.component';
import { SelectDestinationComponent } from './select-destination/select-destination.component';
import { SelectDatesComponent } from './select-dates/select-dates.component';
import { SelectAdditionalsComponent } from './select-additionals/select-additionals.component';
import { ReviewComponent } from './review/review.component';
import { OrderViewComponent } from './order-view/order-view.component';
import { UserClientsComponent } from './user-clients/user-clients.component';
import { NewClientComponent } from './new-client/new-client.component';
import { HistoryComponent } from './history/history.component';
import { CareersComponent } from './careers/careers.component';

export function getLRU(lru?: any) {
  // use LRU for node
  // return lru || new LRU(10);
  return lru || new Map();
}
export function getRequest() {
  // the request object only lives on the server
  return { cookie: document.cookie };
}
export function getResponse() {
  // the response object is sent as the index.html and lives on the server
  return {};
}

const appProviders = [
  // CacheService,
  //   ApiService,
  {
      provide: CookieService,
      useClass: CookieBackendService
    },
  HttpClient,
  UserData,
  Config,
  Auth,
  OrderSrv,
  Contact,
  ClientSrv,
  AuthGuard,
  OrderData,
];

let providers: any[] = [
    {
      provide: AUTO_PREBOOT,
      useValue: false
    }
];
providers.push(appProviders);


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sign-up', component: SignUpComponent},
  { path: 'partner-sign-up', component: PartnerSignupComponent},
  { path: 'log-in', component: LogInComponent},
  { path: 'user', component: UserComponent, canActivate: [AuthGuard], },
  { path: 'order/select-truck', component: SelectTruckComponent, canActivate: [AuthGuard],},
  { path: 'order/select-destination', component: SelectDestinationComponent, canActivate: [AuthGuard],},
  { path: 'order/select-dates', component: SelectDatesComponent, canActivate: [AuthGuard],},
  { path: 'order/select-additionals', component: SelectAdditionalsComponent, canActivate: [AuthGuard],},
  { path: 'order/review', component: ReviewComponent, canActivate: [AuthGuard],},
  { path: 'order/view/:id', component: OrderViewComponent, canActivate: [AuthGuard],},
  { path: 'careers', component: CareersComponent}
];

/**
 * Top-level NgModule "container"
 */
@NgModule({
  /** Root App Component */
  bootstrap: [ AppComponent ],
  /** Our Components */
  declarations: [ AppComponent, PublicHeaderComponent, HomeComponent, SignUpComponent, PartnerSignupComponent, LogInComponent, UserComponent, OrdersComponent, SelectTruckComponent, SelectDestinationComponent, SelectDatesComponent, SelectAdditionalsComponent, ReviewComponent, OrderViewComponent, UserClientsComponent, NewClientComponent, HistoryComponent, CareersComponent ],
  imports: [
    /**
     * NOTE: Needs to be your first import (!)
     * BrowserModule, HttpModule, and JsonpModule are included
     */
    UniversalModule,
    FormsModule,
    DatepickerModule.forRoot(),
    FileUploadModule,
    ReactiveFormsModule,
    TimepickerModule.forRoot(),
    TagInputModule,
    /**
     * using routes
     */
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    providers,
    { provide: StorageService, useClass: ServerStorage },
    { provide: LOCALE_ID, useValue: "es-MX" },
    { provide: 'isBrowser', useValue: isBrowser },
    { provide: 'isNode', useValue: isNode },

    { provide: 'req', useFactory: getRequest },
    { provide: 'res', useFactory: getResponse },

    { provide: 'LRU', useFactory: getLRU, deps: [] },
    
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {

}
