var connect     = require('connect'),
    serveStatic = require('serve-static'),
    ssi         = require('connect-ssi'),
    logger      = require('connect-logger'),
    baseDir     = __dirname + '/htdocs';
var app = connect();
app.use(logger());
app.use(ssi({
  baseDir: baseDir,
  ext: '.html'
}));
app.use(serveStatic(baseDir));
app.listen(3000);
