import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EpicorsvcService } from 'src/app/services/epicorsvc.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private epicorSvc:EpicorsvcService,private router:Router) { }

  ngOnInit(): void {
  }

  IsUserLoggedIn()
  {
    return this.epicorSvc.IsUserLoggedIn();
  }

  GetUserId()
  {
    return this.epicorSvc.GetUserId();
  }
  LogoutUser()
  {
    this.epicorSvc.LogoutUser();
    this.router.navigate(['/Login']);
  }
}
