const {getAllLaunches,
    scheduleNewLaunch,
    existsLaunchWithId,
    abortLaunchById,
} = require('../../models/lunches.model');


const {getPagination,} = require('../../../services/query')


async function httpGetAllLaunches(req,res){
  const{ skip,limit } =getPagination(req.body) ;
  const launches = await getAllLaunches(skip,limit)
  return res.status(200).json(launches)
};

async function httpAddNewLaunch(req,res){
  const launch = req.body;

    if(!launch.mission || !launch.rocket || !launch.launchDate || !launch.target){
      return res.status(400).json({
        error: 'Missing required launch property'
      })
    }

    launch.launchDate = new Date(launch.launchDate);
    if(isNaN(launch.launchDate)){
      return res.status(400).json({
        error: 'Invalid launch date'
      })
    }

    await scheduleNewLaunch(launch);
    return res.status(201).json(launch);
}

async function httpAbortLaunch(req,res){
const launchId =Number(req.params.id); //it is a string. to make it work we need an Integer.

const existsLaunch = await existsLaunchWithId(launchId)
if(!existsLaunch){
  return res.status(404).json({
    error: "Launch not found!" 
  });
};


const aborted = await abortLaunchById(launchId)
if(!aborted){
  return res.status(400).json({
    error: 'Launch not aborted',
  })
}
return res.status(200).json({
  ok: true,
})
}

module.exports = {
   httpGetAllLaunches,
   httpAddNewLaunch,
   httpAbortLaunch
}