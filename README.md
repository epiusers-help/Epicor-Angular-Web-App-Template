# Epicor Angular 13+ Template

This is a very basic angular App that takes advantage of the Epicor Rest API and can be used as a guide on how to develop your own Epicor Aware Angular applications using Epicor Rest.

This is not meant to be an all encompassing secure solution that will fit every scenario but it is mean to be used as a guide and a learning tool on how you can safely use Angular and Epicor to create a front end application that relies exclusively on the Epicor back end

### Authentication Mechanism
This app uses basic authentication to make a POST request to the TokenResource.svc endpoint in your Epicor Application and in return it gets a Bearer Token which is stored locally and used for all subsequent Epicor calls. At no point does this application store the plain text username and password.

### Important Files
[environment.ts](src/environments.environment.ts): This file contains the settings that are used for the connection information into Epicor. This is the first file you should modify.
```
EpicorHost:'yourserver.tld.com', // This is typically your servername along with our domain
EpicorInstance:'YourEpicorInstance', //This is typically the name of your EpicorInstance such as EpicorLive
EpicorAPIKey:'YourAPIKey', // This is generated inside Epicor using API Key Maintenance
EpicorDefaultCompany:'MfgSys', //This is your default company Identifier
```

### Building App
Once you have changed the above file you can build the app as follows
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
The app consists of 2 view components ([login](src/app/views/login/) and [home](src/app/views/home/)).