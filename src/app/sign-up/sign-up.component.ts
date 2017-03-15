import { Component,ChangeDetectionStrategy, OnInit, OnDestroy, } from '@angular/core';
import { Auth } from '../providers/auth.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';
@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {
  type: any = 'E';
  public signUpForm: FormGroup;
  constructor(
    private authSrv: Auth,
    private formB: FormBuilder,
    private router: Router
  ) {
    this.signUpForm = formB.group({
      'firstName': [null, Validators.compose([Validators.required, Validators.nullValidator])],
      'company': [null, Validators.compose([Validators.required, Validators.nullValidator])],
      'address': [null, Validators.compose([Validators.required, Validators.nullValidator])],
      'zip': [null, Validators.compose([Validators.required, Validators.nullValidator, Validators.pattern('^\\d+$'), Validators.minLength(5), Validators.maxLength(5)])],
      'cellPhone': [null, Validators.compose([Validators.required, Validators.nullValidator, Validators.pattern('^\\d+$'), Validators.minLength(10), Validators.maxLength(10)])],
      'lastName': [null, Validators.compose([Validators.required, Validators.nullValidator])],
      'email': [null, Validators.compose([Validators.required, Validators.pattern('^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$'), Validators.nullValidator])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.nullValidator])],
      'passwordConfirm': [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.nullValidator])],
    }, {
        validator: this.matchingPasswords('password', 'passwordConfirm')
      });
   }

  ngOnInit() {
     
  }

  ngOnDestroy(){
    
  }

  matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey];
      let passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true })
      }
    }
  }

  createUser(data, valid) {
    data.type = this.type;
    data.activated = '0';
    this.authSrv.signUp(data)
      .then(res => {
        this.router.navigate(['/user']);
      })
      .catch(err => {
        console.log('error',err);
      });
  }

}
