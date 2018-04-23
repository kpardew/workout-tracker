# workout-tracker

This is a very simple and lightweight full-stack Node app. The front end is written in JavaScript with simple AJAX calls to the Node endpoints. 

## Installation Instructions

### Database Initialization
#### dbcon.js
1) Establish a MySQL database host "YOUR_DATABASE_HOST"
2) Create a database "YOUR_DATABASE" with username "YOUR_DATABASE_USER_NAME" and password "YOUR_DATABASE_PASSWORD"

#### Database Schema
Since this is currently a trivial application, there isn't much of a schema to speak of. There is one table called workouts, with the following attributes:

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
1) Install npm if you don't already have it on the machine hosting the app.
2) Navigate to the directory of your package.json file and type npm install.
3) To run the app type node app.js.
4) The server will start running on the port specified in app.js.
5) The app can be viewed at http://your-site.com:specified-port.


## Potential Extensions
The sky is the limit here. There are countless options for improvement. For instance, the database is a single table to hold the very basic information. So coutless options exist for extending the database. Several features could be added to the Node server and the front end has extremely limited functionality. Finally, the UI utilizes very standard Bootstrap styles. Much more from the Bootstrap library could be utilized.
