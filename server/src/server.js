const http = require('http')
const app = require('./app')
const PORT = process.env.PORT || 8000;

require('dotenv').config();
const {mongoConnect} = require('../services/mongo')
const {loadPlanetsData} = require('./models/planets.model')

const{loadLaunchData} = require('./models/lunches.model')

const server = http.createServer(app);
 

async function startServer(){

    await mongoConnect();
    await loadPlanetsData();
    await loadLaunchData();

    server.listen(PORT, ()=>{
        console.log(`listening on port ${PORT}`)
    });
}
startServer()








