import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EpicorsvcService } from 'src/app/services/epicorsvc.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  companyResponse:any;
  constructor(private epicorSvc:EpicorsvcService,private router:Router) { }

  ngOnInit(): void {
    if(this.epicorSvc.IsUserLoggedIn())
    {
      this.epicorSvc.GetCompanyList()?.subscribe(response=>{
        this.companyResponse=response;
      });
    }
    else
    {
      this.router.navigate(['/Login']);
    }
  }

}
