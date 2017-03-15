import { Routes, RouterModule, CanActivate } from '@angular/router';
// import { AuthGuard } from './common/auth-guard.service';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PartnerSignupComponent } from './partner-signup/partner-signup.component';

const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'sign-up',
        component: SignUpComponent
    },
    {
        path: 'partner-sign-up',
        component: PartnerSignupComponent
    }

    // {
    //     path: 'admin',
    //     canActivate: [AuthAdminGuard]
    // }
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [
    HomeComponent
];

