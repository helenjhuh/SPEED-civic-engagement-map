module.exports = function() {
  // Add your custom middleware here. Remember that
  // in Express, the order matters.

  // Because frontend routing is handled by React, redirect any "404" requests to
  // index.html and let react handle it
  //app.all('*', function(req, res) {
  //  res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'));
  // });
};
