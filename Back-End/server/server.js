
// init app
const app = require('./component/app');

//init sever and socket
const io = require('./component/IO').init(app, 8080);


//init route
const routes = require('./routes/index.routes')
routes(app)





