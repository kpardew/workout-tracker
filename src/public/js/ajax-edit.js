// uri must be initialized to a valid server address
var uri = "";

document.addEventListener('DOMContentLoaded', bindUpdateButton);


// Create handlers for addButton
function bindUpdateButton() {
    var updateButton = document.getElementById("updateButton");

    updateButton.addEventListener("click", function() {
        var payload = {};

        // Build post payload
        payload.id = document.getElementById("id").value;
        payload.name = document.getElementById("name").value;
        payload.reps = document.getElementById("reps").value;
        payload.weight = document.getElementById("weight").value;
        payload.date = document.getElementById("date").value;
        payload.lbs = document.getElementById("lbs").value;


        var req = new XMLHttpRequest();
        req.open('POST', uri + '/update', true);
        req.setRequestHeader('Content-Type', 'application/json');

        req.addEventListener('load', function() {
            if (req.status >= 200 && req.status < 400) {
                // Load the home page
                window.location = uri;
            } else {
                console.log("Error in network request: " + req.statusText);
            }
        });

        req.send(JSON.stringify(payload));
    });
}
