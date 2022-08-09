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

  /// <summary>
  /// Checks the status of the current user by calling the Epicor Service which in turn looks at the local storage for the token and validates it.
  /// </summary>
  IsUserLoggedIn(): boolean
  {
    return this.epicorSvc.IsUserLoggedIn();
  }

  /// <summary>
  /// Gets the UserID from the token in local storage by parsing the JWT token.
  /// </summary>
  GetUserId()
  {
    return this.epicorSvc.GetUserId();
  }

  /// <summary>
  /// Removes the token from local storage and redirects the user to the login page.
  /// </summary>
  LogoutUser()
  {
    this.epicorSvc.LogoutUser();
    this.router.navigate(['/Login']);
  }
}
