# usmBackend
# backend is an open source API and doesnt require any access/ API KEY to perform operations

Step 1:
 Run `npm install` to install the dependencies from `package.json`
 
Step 2: 
  API uses `Mongo DB` as  a database- Please install `Mongodb Community Server` from official website- https://www.mongodb.com/try/download/community

Step 3:

  Run `node app.js` to run the API and user could access the API as per below
  
API's Available

1) LOGIN
METHOD: POST
URL: http://localhost:3000/api/v1/login

Body Params Required:
password
email (or) mobile

2) REGISTER USER
METHOD: POST
URL: http://localhost:3000/api/v1/register

Body Params Required:
name:
gender:
mobile:
email:
designation:
password:

3) Fetch User Details based on Role (A/ M/ S)
METHOD: POST
URL: http://localhost:3000/api/v1/fetchreport

Body Params Required:
designation

4) Delete the user
METHOD: POST
URL: http://localhost:3000/api/v1/deleteUser

Body Params Required:
email

5) For incorrect API's it will return `No Route Found` Message
