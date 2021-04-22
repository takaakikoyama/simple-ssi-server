const package_json = require("./package.json");
const { program } = require('commander');
let connect     = require('connect'),
    serveStatic = require('serve-static'),
    ssi         = require('connect-ssi'),
    logger      = require('connect-logger'),
    baseDir     = __dirname + '/htdocs',
    app = connect();

program
  .version(package_json.version)
  .option('-p, --port <number>', 'port number', (arg)=>{ return parseInt(arg); }, 3000)
  .option('-d, --dir <path>', 'docment root dir', baseDir)
  .option('-i, --index', 'use direcroty index', (arg)=>{ return true; }, false)
  .parse(process.argv);

console.log('start http server')
console.log(`docment root: ${program.dir}`)
console.log(`http://localhost:${program.port}/`)
app.use(logger());
app.use(ssi({
  baseDir: program.dir,
  ext: '.html'
}));
app.use(serveStatic(program.dir));
if(program.index) app.use(require('serve-index')(program.dir, {'icons': true}));
app.listen(program.port);
