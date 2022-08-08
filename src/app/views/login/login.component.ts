import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EpicorsvcService } from 'src/app/services/epicorsvc.service';
import { EpicorTokenResponse } from '../../models/epicor-token-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    userName: new FormControl('',[
      Validators.required
    ]),
    password: new FormControl('',[
      Validators.required
    ]),

  });
  loginErrorMsg='';
  constructor(private epicorSvc:EpicorsvcService,private router:Router) { }

  ngOnInit(): void {
  }

  async Login()
  {
    this.loginErrorMsg='';
    this.loginForm.markAllAsTouched()
    if(this.loginForm.valid)
    {
      this.epicorSvc.GetEpicorToken(this.loginForm.get('userName')?.value, this.loginForm.get('password')?.value).then(response=>{
        if((response as EpicorTokenResponse).AccessToken)
        {
          this.epicorSvc.StoreToken(response as EpicorTokenResponse);
          this.router.navigate(['/']);
        }

      }).catch(error=>{
        if(error.status && error.status==401)
        {
          this.loginErrorMsg='Could not login. Please check your username and password.';
        }
        else
          this.loginErrorMsg=error.message;
      });
    }
  }

  
}
