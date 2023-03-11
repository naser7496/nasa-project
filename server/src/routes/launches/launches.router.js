const express = require('express')
const {
    httpGetAllLaunches,
   httpAddNewLaunch,
   httpAbortLaunch,
} = require('./launches.controller')


const launchesRouter = express.Router()

launchesRouter.get('/', httpGetAllLaunches) //we give it an endpoint so then call a function which already defined in controller
launchesRouter.post('/', httpAddNewLaunch)
launchesRouter.delete('/:id', httpAbortLaunch)

module.exports = launchesRouter;