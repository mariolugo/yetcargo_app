import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Auth } from '../providers/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class LogInComponent implements OnInit {
  public loginForm: FormGroup;
  constructor(
    public authSrv: Auth,
    private formB: FormBuilder,
    private router: Router
  ) {
    this.loginForm = formB.group({
      'email': [null, Validators.compose([Validators.required, Validators.pattern('^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$'), Validators.nullValidator])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.nullValidator])]
    });
   }

  ngOnInit() {
  }

  logIn(data,valid){
    console.log('aaa');
    this.authSrv.login(data)
    .then(res => {
      // this.showSuccess();
      this.router.navigate(['/user']);
    })
    .catch(err => {
      // this.showError();
    });
  }

}
