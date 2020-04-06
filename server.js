var express = require('express');
var app = express();

app.use(express.static('./dist/angular2-concept-mapping'));

app.get('/*', function (req, res) {
  res.sendFile('index.html', {root: 'dist/angular2-concept-mapping/'}
  );
});

app.listen(process.env.PORT || 8080);
