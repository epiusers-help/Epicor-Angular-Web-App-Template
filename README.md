# Epicor Angular 13+ Template

This is a very basic angular App that takes advantage of the Epicor Rest API and can be used as a guide on how to develop your own Epicor Aware Angular applications using Epicor Rest.

This is not meant to be an all encompassing secure solution that will fit every scenario but it is mean to be used as a guide and a learning tool on how you can safely use Angular and Epicor to create a front end application that relies exclusively on the Epicor back end

I used bootstrap for the visual components I will not be explaining Bootstrap there are no less than a thousand bootstrap tutorials out there.

### Authentication Mechanism
This app uses basic authentication to make a POST request to the TokenResource.svc endpoint in your Epicor Application and in return it gets a Bearer Token which is stored locally and used for all subsequent Epicor calls. At no point does this application store the plain text username and password.

### Important Files
[environment.ts](src/environments/environment.ts): This file contains the settings that are used for the connection information into Epicor. This is the first file you should modify.
```
EpicorHost:'yourserver.tld.com', // This is typically your servername along with our domain
EpicorInstance:'YourEpicorInstance', //This is typically the name of your EpicorInstance such as EpicorLive
EpicorAPIKey:'YourAPIKey', // This is generated inside Epicor using API Key Maintenance
EpicorDefaultCompany:'MfgSys', //This is your default company Identifier
```

### Building App
It is required that you hava  functioning angular environment in the very least you should have NPM installed. NPM is a package manager that comes with node
1. Install node https://nodejs.org/en/download/
2. Install angular https://angular.io/guide/setup-local
Once you have both of the above installed you should be able to run the following command to build the application. Remember to change the environment file to match your environment.


```
npm i
ng serve
```
The first command will install all needed reference files and libraries, the second one will build your app and start it up in Port: 4200 in your computer.
If everything went well you should be able to navigate to [http://localhost:4200](https://localhost:4200) and see a login screen like the one below.
![Login Screen](src/assets/Login.png?raw=true,  "Login Screen")

Here you should be able to Login by typing in your Epicor Username and Password and Clicking the Login Button. Assuming everything is working as intended you should see the Home screen below with a list of your Epicor companies.
![Home Screen](src/assets/Home.png?raw=true,  "Home Screen")

## Technical Details
The app consists of:
2 view components [login](src/app/views/login/) and [home](src/app/views/home/)

1 partial component [navigation](src/app/components/navigation/)

2 services [EpicorAuthGuardService](src/app/services/epicor-auth-guard.service.ts) and [epicorSvc](src/app/services/epicorsvc.service.ts)

1 model [EpicorTokenResponse](src/app/models/epicor-token-response.ts)


### Project Bootstrapping (how the sausage is made)
The project is bootstrapped as follows
1. When the app spins up angular runs main.ts as defined in the angular.json file
2. main.ts calls the bootstrap function in the [app.module.ts](src/app/app.module.ts) file
3. In turn the boostrap function executes AppComponent.ts which is the root component of the app
4. [AppComponent.ts](src/app/app.component.ts) is rendered in the [index.html](src/index.html) file under the injection point  <app-root></app-root>
5. AppComponent itself has two render points defined in [app.component.html](src/app/app.component.html) <app-navigation> and <router-outlet>
6. [navigation.component](src/app/components/navigation/) is rendered across the top of all the "pages" and it is just a navigation bar. It contains a shortcut to Home as well as a link to login / logout based on the current authentication state.
7. app-navigation is where the engular router renders any component or "route" you have navigated to. Angular is what is known as a SPA (or single page aplication) so each view is rendered in the same physical HTML page by manipulating the dom. The routing rules are defined in the [app-routing.module.ts](src/app/app-routing.module.ts) file.
8. [app-routing.module.ts](src/app/app-routing.module.ts) defines two routes for this app /Login which renders the [login.component](src/app/views/login/) and / which renders the [home.component](src/app/views/home/)
https://github.com/epiusers-help/Epicor-Angular-Web-App-Template/blob/f5ca78ebea47bb1ae487f48a730eaa50ab52ec83/src/app/app-routing.module.ts#L7
9. In the routing rule for the [home.component](src/app/components/home/) we define an [AuthGuard](src/app/services/epicor-auth-guard.service.ts) via the canActivate property. This is a guard that checks to see if the user is authenticated. If the user is not authenticated the user is redirected to the [login.component](src/app/views/login/)
10. [epicor-auth-guard.service.ts](src/app/services/epicor-auth-guard.service.ts) implements the CanActivate interface and returns a boolean value based on whether the user is logged in or not. This is checked by using the [epicorsvc.service.ts](src/app/services/epicorsvc.service.ts) method IsUserLoggedIn() which reads the Epicor bearer token from the browser HTML 5 storage and determines if the user is logged in and wheter or not the token is expired if it doesn't exist or has expired, the user is redirected to the [login.component](src/app/components/login/) to allow them to login.
11. [login.component.ts](src/app/views/login/) is the login component. It contains a form that allows the user to login and a button to submit the form. It does some basic validation and when the user clicks Login it uses the [epicorsvc.service.ts](src/app/services/epicorsvc.service.ts) method GetEpicorToken() to make a POST request to the TokenResource.svc endpoint in your Epicor Application passing in the username and password in return it gets a Bearer Token which is stored locally and used for all subsequent Epicor calls. A successful login redirects to the / (home) route.
12. [home.component.ts](src/app/views/home/) is the main navigational component of the app. If the user is logged in it gets a list of all the companies the current has access to and renders them in a table.


### App Walk Through
![App Walk Through](src/assets/AppWalkThrough.gif?raw=true,  "App Walk Through")

I have commented as much of the code as I can to make it easier to understand. Let me know if you run into any issues.