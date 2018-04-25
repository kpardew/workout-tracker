// uri must be initialized to a valid server address
var uri = "";

document.addEventListener('DOMContentLoaded', setDefault);


// Set the default page view
function setDefault() {
    buildTable();
    bindAddButton();
}


// Update the table view
function buildTable() {
    var newCell, newRow;
    var tableBody = document.getElementById("tableBody");

    // Delete current table data
    while (tableBody.hasChildNodes()) {
        tableBody.removeChild(tableBody.lastChild);
    }

    // Get current rows from database
    var req = new XMLHttpRequest();
    req.open('GET', uri + '/refresh', true);
    req.addEventListener('load', function() {

        if (req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);

            for (var i = 0; i < response.length; i++) {
                newRow = document.createElement("tr");

                // Create Exercise Name cell
                var nameCell = document.createElement("td");
                nameCell.textContent = response[i].name;
                newRow.appendChild(nameCell);

                // Create Repetitions cell
                var repCell = document.createElement("td");
                repCell.textContent = response[i].reps;
                newRow.appendChild(repCell);

                // Create Weight cell
                var weightCell = document.createElement("td");
                var weightString = response[i].weight;
                if (response[i].lbs === 1) {
                    weightString += " lbs";
                } else {
                    weightString += " kgs";
                }
                weightCell.textContent = weightString;
                newRow.appendChild(weightCell);

                // Create Date cell
                var dateCell = document.createElement("td");
                dateCell.textContent = response[i].date;
                newRow.appendChild(dateCell);

                // Create Edit button
                var editButtonCell = document.createElement("td");
                var editButton = document.createElement("a");
                var editButtonIcon = document.createElement("span");

                editButtonIcon.setAttribute("class", "glyphicon glyphicon-pencil");
                editButton.setAttribute("href", "/edit?id=" + response[i].id);
                editButton.setAttribute("class", "btn btn-sm btn-warning");

                editButton.appendChild(editButtonIcon);
                editButtonCell.appendChild(editButton);
                newRow.appendChild(editButtonCell);


                // Create Delete button
                var deleteButtonCell = document.createElement("td");
                var deleteButton = document.createElement("button");
                var deleteButtonIcon = document.createElement("span");

                deleteButtonIcon.setAttribute("class", "glyphicon glyphicon-trash");
                deleteButton.setAttribute("type", "button");
                deleteButton.setAttribute("class", "btn btn-sm btn-danger");
                deleteButton.setAttribute("onclick", "deleteRow(" + response[i].id + ")");

                deleteButton.appendChild(deleteButtonIcon);
                deleteButtonCell.appendChild(deleteButton);
                newRow.appendChild(deleteButtonCell);

                tableBody.appendChild(newRow);
            }
        } else {
            console.log("Error in network request: " + req.statusText);
        }
    });

    req.send(null);
}


// Create handlers for addButton
function bindAddButton() {
    var insertButton = document.getElementById("insertButton");

    insertButton.addEventListener("click", function() {

        var inputName = document.getElementById("name").value;
        var inputReps = document.getElementById("reps").value;
        var inputWeight = document.getElementById("weight").value;
        var inputDate = document.getElementById("date").value;
        var inputLbs = document.getElementById("lbs").value;

        if (!inputName) {
            alert("You must enter an Exercise Name!");
            return;
        }
        if (!inputDate) {
            alert("You must enter a date!");
            return;
        }

        // Build query string
        var fullURL = uri + '/insert?';
        fullURL += 'name=' + inputName;
        fullURL += '&reps=' + inputReps;
        fullURL += '&weight=' + inputWeight;
        fullURL += '&date=' + inputDate;
        fullURL += '&lbs=' + inputLbs;


        var req = new XMLHttpRequest();
        req.open('GET', fullURL, true);

        req.addEventListener('load', function() {
            if (req.status >= 200 && req.status < 400) {
                // Update the display table
                buildTable();

                // Reset the input form
                document.getElementById("inputForm").reset();
            } else {
                console.log("Error in network request: " + req.statusText);
            }
        });

        req.send(null);
    });
}


// Delete a row from database
function deleteRow(id) {
    var req = new XMLHttpRequest();
    req.open('GET', uri + '/delete?id=' + id, true);

    req.addEventListener('load', function() {
        if (req.status >= 200 && req.status < 400) {
            // Update the display table
            buildTable();
        } else {
            console.log("Error in network request: " + req.statusText);
        }
    });

    req.send(null);
}
