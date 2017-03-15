import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Auth } from '../providers/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-partner-signup',
  templateUrl: './partner-signup.component.html',
  styleUrls: ['./partner-signup.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PartnerSignupComponent implements OnInit {
  public signUpForm: FormGroup;
  type: any = 'S';
  constructor(
    private formB: FormBuilder,
    private authSrv: Auth,
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
    this.authSrv.signUp(data)
      .then(res => {
        this.router.navigate(['/user']);
      })
      .catch(err => {
        console.log('error',err);
      });
  }

}
