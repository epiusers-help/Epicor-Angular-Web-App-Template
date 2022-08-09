import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EpicorRestService } from 'epicor-rest-ng';
import { lastValueFrom, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EpicorTokenResponse } from '../models/epicor-token-response';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class EpicorsvcService {

  epicorTokenResp:EpicorTokenResponse|undefined=undefined;
  constructor(private epicorSvcLib:EpicorRestService, private httpClientSvc:HttpClient) { }
  


  /// <summary>
  /// Takes the username and password provided and makes a call to the TokenResource.svc in your Epicor application
  /// which validates and returns a token if the username and password are valid. Returns 401 otherwise.
  public async GetEpicorToken(userName:string, password:string)
  {
    this.SetupEpicor();
    let headers: HttpHeaders = new HttpHeaders();

    // The token service expects the username and password to be passed in plain text as header values.
    headers=headers.set('accept','application/json').set('Content-Type','application/json').set('username', userName).set('password', password);
    
    let response  = await lastValueFrom(this.httpClientSvc.post<EpicorTokenResponse|HttpErrorResponse>(`https://${environment.EpicorHost}/${environment.EpicorInstance}/TokenResource.svc/`,null,{headers:headers}));

    return response;
  }

  /// <summary>
  /// Stores the EpicorTokenResponse in local storage so we can use it later
  /// </summary>
  public StoreToken(token:EpicorTokenResponse)
  {
    localStorage.setItem('epicorToken',JSON.stringify(token));
  }

  /// <summary>
  /// This method setups the Epicor library to make a call it reads  most of these values from the environment file.
  /// if the user is logged in it will read and set the token from local storage.
  /// </summary>
  private SetupEpicor()
  {
    this.epicorSvcLib.AppPoolHost= environment.EpicorHost;
    this.epicorSvcLib.AppPoolInstance = environment.EpicorInstance;
    this.epicorSvcLib.APIKey= environment.EpicorAPIKey;
    this.epicorSvcLib.Company = environment.EpicorDefaultCompany;
    if(this.IsUserLoggedIn())
    {
      if(this.epicorTokenResp)
        this.epicorSvcLib.Token=this.epicorTokenResp.AccessToken;
    }
  }

  /// <summary>
  /// Returns the user Id from the token if the token is valid. See jwt.io for more info on the token format.
  /// </summary>
  public GetUserId()
   {
      if(this.IsUserLoggedIn() && this.epicorTokenResp)
      {
        return (jwt_decode(this.epicorTokenResp.AccessToken) as any ).username;
      }
      else
        return '';
   }
  

  /// <summary>
  /// Checks and validates if the user is logged in and if the token hasn't expired. Returns true / false based on this check
  /// </summary>
  public IsUserLoggedIn()
  {
    let epicorAccessToken = localStorage.getItem('epicorToken');
    if(epicorAccessToken)
    {
      this.epicorTokenResp= JSON.parse(epicorAccessToken) as EpicorTokenResponse;
      
      let decodedToken = jwt_decode(this.epicorTokenResp.AccessToken) as any;
      if(new Date(decodedToken.exp *1000).getTime() > Date.now()) /// Epicor stores the token life in seconds so we need to multiply by 1000 to get the milliseconds which is what javascript uses
      {
        return true;
      }
      else
        return false;
    }
    
    return false;
    
  }

  /// <summary>
  /// Returns a list of companies from the CompanySvc endpoint in your Epicor application. Note that if your API Key is scope and the 
  /// CompanySvc is outside of scope this will return a 404 /401 error.
  /// </summary>
  public GetCompanyList()
  {
    if(this.IsUserLoggedIn())
    {
      this.SetupEpicor();
      let params = new Map<string,string>();
      params.set('$select','Company1,Name,City,State,Country');
      return this.epicorSvcLib.BoGet('Erp.BO.CompanySvc','Companies',params);
    }
    else
      return of(null)

  }

  /// <summary>
  /// Removes the token from local storage effectively logging the user out
  /// </summary>
  public LogoutUser()
  {
    localStorage.removeItem('epicorToken');
  }

}
