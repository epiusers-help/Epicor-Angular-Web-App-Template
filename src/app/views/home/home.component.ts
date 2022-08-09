import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EpicorsvcService } from 'src/app/services/epicorsvc.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  errorMsg: any;
  companyResponse: any;
  constructor(private epicorSvc: EpicorsvcService, private router: Router) { }

  /// <summary>
  /// Life cycle hook that runs once when the component is initialized. Checks if the user is logged in and gets a list of companies the user has access to
  /// </summary>
  ngOnInit(): void {
    if (this.epicorSvc.IsUserLoggedIn()) {

      /// See https://rxjs-dev.firebaseapp.com/guide/observer for more info on the Observer pattern
      const responseObserver = {
        next: (response: any) => {
          this.companyResponse = response;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
          if (error.status && error.status == 401) {
            this.errorMsg = '401 UnAuthorized Error. Check your API Key, Scope and Token';
          }
          else {
            this.errorMsg = error.message;
          }
        }
      }

      //Returns a company list for the user
      this.epicorSvc.GetCompanyList()?.subscribe(responseObserver);
    }
    else {
      this.router.navigate(['/Login']);
    }
  }

}
