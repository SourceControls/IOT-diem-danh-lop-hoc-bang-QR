
// init app
const app = require('./component/app');

//init sever and socket
const io = require('./component/IO').init(app, 80);


//init route
const routes = require('./routes/index.routes')
routes(app)





