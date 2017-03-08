/**
 * This file and `main.browser.ts` are identical, at the moment(!)
 * By splitting these, you're able to create logic, imports, etc that are "Platform" specific.
 * If you want your code to be completely Universal and don't need that
 * You can also just have 1 file, that is imported into both
 * client.ts and server.ts
 */

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UniversalModule } from 'angular2-universal';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './index';
import { PublicHeaderComponent } from './public-header/public-header.component';
import { HomeComponent } from './home/home.component';
// import { RouterModule } from '@angular/router';
// import { appRoutes } from './app/app.routing';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sign-up', component: SignUpComponent}
];
/**
 * Top-level NgModule "container"
 */
@NgModule({
  /** Root App Component */
  bootstrap: [ AppComponent ],
  /** Our Components */
  declarations: [ AppComponent, PublicHeaderComponent, HomeComponent, SignUpComponent ],
  imports: [
    /**
     * NOTE: Needs to be your first import (!)
     * NodeModule, NodeHttpModule, NodeJsonpModule are included
     */
    UniversalModule,
    FormsModule,
    /**
     * using routes
     */
    // RouterModule.forRoot(appRoutes)
     RouterModule.forRoot(appRoutes)
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {

}
