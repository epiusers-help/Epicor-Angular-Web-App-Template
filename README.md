# Epicor Angular 13+ Template

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.8.

This is a very basic angular App that takes advantage of the Epicor Rest API and can be used as a guide on how to develop your own Epicor Aware Angular applications using Epicor Rest.

This is not meant to be an all encompassing secure solution that will fit every scenario but it is mean to be used as a guide and a learning tool on how you can safely use Angular and Epicor to create a front end application that relies exclusively on the Epicor back end

### Authentication Mechanism
This app uses basic authentication to make a POST request to the TokenResource.svc endpoint in your Epicor Application and in return it gets a Bearer Token which is stored locally and used for all subsequent Epicor calls. At no point does this application store the plain text username and password.

### Important Files
[environment.ts](src/environments/environment.ts): This file contains the settings that are used for the connection information into Epicor. This is the first file you should modify.
