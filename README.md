# workout-tracker

This is a very simple full-stack Node app. The front end is written enirely in JavaScript with simple AJAX calls to the Node endpoints. In fact, the app is so lightweight that there are less than 300 lines JavaScript on the front and back end combined.

## Installation Instructions

### Database Initialization
#### dbcon.js
1) Establish a MySQL database host "YOUR_DATABASE_HOST"
2) Create a database "YOUR_DATABASE" with username "YOUR_DATABASE_USER_NAME" and password "YOUR_DATABASE_PASSWORD"

#### Database Schema
Since this is currently a trivial application, there isn't much of a schema to speak of. There is one table called ```workouts```, with the following attributes:

attribute | type
--------- | ----
id | INT
name | VARCHAR(255)
reps | INT
weight | INT
date | DATE
lbs | BOOLEAN

#### Table Creation
I have included two SQL scripts to [create](/sql/table_creation.sql) the workouts table and [populate](/sql/table_insertions.sql) it with one row of data.

### Node Instructions
1) Install [npm](https://www.npmjs.com/) if you don't already have it on the machine hosting the app.
2) Navigate to root directory of project (in ths case ```src/```) and type ```npm install```.
3) To run the app type ```node app.js```.
4) The server will start running on the port specified in ```app.js```.
5) The app can be viewed at ```http://your-site.com:specified-port```.

### Handlebars
This project uses [handlebars](https://handlebarsjs.com/) as a templating engine. There are countless other options, such as [ejs](http://ejs.co/), but handlebars uses standard HTML syntax, so there is not much of a learning curve to get up to speed with it.


## Potential Extensions
The sky is the limit here. There are countless options for improvement. For instance, the database is a single table to hold the minimal information about a single type of exercise. So coutless options exist for extending the database. Several features could be added to the Node server and the front end has extremely limited functionality. Finally, the UI utilizes very standard Bootstrap styles. Much more from the Bootstrap library could be utilized. Consider this a starting point to explore the Node ecosystem and have some fun with it!
