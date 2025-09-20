// server.js
// where your node app starts

// init project
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
// Serve static files (like CSS) from the 'public' directory
app.use('/public', express.static(path.join(__dirname, 'public')));

// http://expressjs.com/en/starter/basic-routing.html
// Serve the index.html file for the root route
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});


// API endpoint for date conversion
app.get("/api/:date?", function (req, res) {
  const dateString = req.params.date;
  let date;

  // 1. Handle case where :date is empty
  // If no date is provided, use the current date
  if (!dateString) {
    date = new Date();
  } else {
    // 2. Handle case where :date is a Unix timestamp
    // Check if the date string consists only of digits
    if (/^\d+$/.test(dateString)) {
      date = new Date(parseInt(dateString));
    } else {
      // 3. Handle case where :date is a standard date string
      date = new Date(dateString);
    }
  }

  // 4. Check if the created date is valid
  // The getTime() method returns NaN for invalid dates
  if (isNaN(date.getTime())) {
    res.json({ error: "Invalid Date" });
  } else {
    // 5. Return the successful JSON response
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});


// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
