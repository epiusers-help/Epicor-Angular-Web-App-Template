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
  
  public async GetEpicorToken(userName:string, password:string)
  {
    this.SetupEpicor();
    let headers: HttpHeaders = new HttpHeaders();
    headers=headers.set('accept','application/json').set('Content-Type','application/json').set('username', userName).set('password', password);
    
    let response  = await lastValueFrom(this.httpClientSvc.post<EpicorTokenResponse|HttpErrorResponse>(`https://${environment.EpicorHost}/${environment.EpicorInstance}/TokenResource.svc/`,null,{headers:headers}));

    return response;
  }

  public StoreToken(token:EpicorTokenResponse)
  {
    localStorage.setItem('epicorToken',JSON.stringify(token));
  }
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

  public GetUserId()
   {
      if(this.IsUserLoggedIn() && this.epicorTokenResp)
      {
        return (jwt_decode(this.epicorTokenResp.AccessToken) as any ).username;
      }
      else
        return '';
   }
  

  public IsUserLoggedIn()
  {
    let epicorAccessToken = localStorage.getItem('epicorToken');
    if(epicorAccessToken)
    {
      this.epicorTokenResp= JSON.parse(epicorAccessToken) as EpicorTokenResponse;
      
      let decodedToken = jwt_decode(this.epicorTokenResp.AccessToken) as any;
      if(new Date(decodedToken.exp *1000).getTime() > Date.now())
      {
        return true;
      }
      else
        return false;
    }
    
    return false;
    
  }

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

  public LogoutUser()
  {
    localStorage.removeItem('epicorToken');
  }

}
