# Surge_Assignment

## front-end application run instruction

01) To start, open a project in your preferred editor or command prompt.
02) Then type in the same terminal as "**cd client**" and connect to the client directory.
03) Now type in the same terminal as "**npm i**".
04) Next, type in the same terminal "**npm start**" and run and open the react app.


## Back-end application run instruction

01) Go to the server folder and rename "**.env.temp**" as "**.env**".
02) Now you have to login to **MongoDB Atlas Database** (https://account.mongodb.com/account/login?signedOut=true) and create the database that you want. If you do not have an account, please make sure to register with it.
03) Next, insert your database **connection string** into the "**MONGO URL*" field of the **.env** file. 
04) After that, you have to login to your **malitrap** (https://mailtrap.io/) account and copy the mailtrap **username** and **password**. Copy and paste it into the **.env** "**MAILTRAP_USER_NAME**" and "**MAILTRAP_PASSWORD**" fields.
05) Or you can use **Google credentials**. To do that, enter your **Gmail password** and **Email address** into the **.env** "**GOOGLE_USER**" and "**GOOGLE_PASSWORD**" places. If you're using Google credentials, please make sure to **turn off** **Google security**. and you have to uncomment **Mail.js** (path : server -> utils -> Mail.js) uncomment part. 
06)then enter your frontend localhost to "**DOMAIN**".

### run backend

01) Type the terminal as "**cd server**" and enter the server directory.
02) Now, type in the same terminal as "**npm i**" 
03) Finaly, type the same terminal as "**nodemon server**" end enter


