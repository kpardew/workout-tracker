// Initialize node.js modules and middleware
var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);

app.set('view engine', 'handlebars');
app.set('port', process.argv[2] || 3000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));


// Route to display home page
app.get('/', function(req, res, next){
    res.render('home');
});


// Route to refresh the table data
app.get('/refresh', function(req, res, next){
    var context = {};
    mysql.pool.query('SELECT id, name, reps, weight, lbs, DATE_FORMAT(date, "%Y-%m-%d ") AS date FROM workouts ORDER BY date ASC, name ASC', function(err, rows, fields){
        if(err){
            next(err);
            return;
        }
        context = JSON.stringify(rows);
        res.status(200);
        res.send(context);
    });
});


// Route to edit a row in the table
app.get('/edit', function(req, res, next){
    var context = {};
    mysql.pool.query('SELECT id, name, reps, weight, lbs, DATE_FORMAT(date, "%Y-%m-%d") AS date FROM workouts WHERE id=?', [req.query.id], function(err, rows, fields){
        if(err){
            next(err);
            return;
        }

        // Send values of the row to prepopluate the edit page
        context = rows[0];
        res.status(200);
        res.render('edit', context);
    });
});


// Route to insert a row into the table
app.get('/insert', function(req, res, next){
    mysql.pool.query('INSERT INTO workouts (`name`, `reps`, `weight`, `date`, `lbs`) VALUES (?, ?, ?, ?, ?)', [req.query.name, req.query.reps, req.query.weight, req.query.date, req.query.lbs], function(err, result) {
        if(err){
          next(err);
          return;
        }
        res.status(200);

        // Send nothing back and refresh the view on the client side
        res.send(null);
    });
});


// Route to update a row in the table
app.post('/update', function(req, res, next){
    mysql.pool.query('SELECT * FROM workouts WHERE id=?', [req.body.id], function(err, result){
        if(err){
            next(err);
            return;
        }
        if(result.length == 1){
            var curVals = result[0];

            // Update the row
            mysql.pool.query('UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=?',
                [req.body.name || curVals.name, 
                req.body.reps || curVals.reps, 
                req.body.weight || curVals.weight, 
                req.body.date || curVals.date, 
                req.body.lbs || curVals.lbs, 
                req.body.id],
                function(err, result){
                if(err){
                  next(err);
                  return;
                }
                res.status(200);

                // Send nothing and allow for page refresh on the client side
                res.send(null);
            });
        }
    });
});


// Route to delete a row from the table
app.get('/delete', function(req, res, next){
    mysql.pool.query("DELETE FROM workouts WHERE id=?", [req.query.id], function(err, result){
        if(err){
          next(err);
          return;
        }
        res.status(200);

        // Send nothing back and refresh the view on the client side
        res.send(null);
    });
});


// Route to reset the table
app.get('/reset-table',function(req,res,next){
    mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){ 
        var createString = "CREATE TABLE workouts("+
        "id INT PRIMARY KEY AUTO_INCREMENT,"+
        "name VARCHAR(255) NOT NULL,"+
        "reps INT,"+
        "weight INT,"+
        "date DATE,"+
        "lbs BOOLEAN)";
        mysql.pool.query(createString, function(err){
            res.render('home');
        })
    });
});


// Handle a 404 error
app.use(function(req, res) {
    res.status(404);
    res.render('404');
});


// Handle a 500 (server) error
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});


// Start server on specified port
app.listen(app.get('port'), function(){
    console.log('Express started on port ' + app.get('port') + '; press Ctrl-C to terminate.');
});
