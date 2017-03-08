/**
 * This file and `main.node.ts` are identical, at the moment(!)
 * By splitting these, you're able to create logic, imports, etc that are "Platform" specific.
 * If you want your code to be completely Universal and don't need that
 * You can also just have 1 file, that is imported into both
 * client.ts and server.ts
 */

import { NgModule, CUSTOM_ELEMENTS_SCHEMA,ModuleWithProviders } from '@angular/core';
import { UniversalModule } from 'angular2-universal';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './index';
import { routing,routedComponents } from './app.routes';

import { MaterialModule } from '@angular/material';
import { PublicHeaderComponent } from './public-header/public-header.component';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { HomeComponent } from './home/home.component';
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
     * BrowserModule, HttpModule, and JsonpModule are included
     */
    UniversalModule,
    FormsModule,
    /**
     * using routes
     */
    RouterModule.forRoot(appRoutes)
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {

}
