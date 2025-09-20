const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get("/api/:date?", function (req, res) {
  const dateString = req.params.date;
  let date;

  if (!dateString) {
    date = new Date();
  } else {
    if (/^\d+$/.test(dateString)) {
      date = new Date(parseInt(dateString));
    } else {
      date = new Date(dateString);
    }
  }

  if (isNaN(date.getTime())) {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});

const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
