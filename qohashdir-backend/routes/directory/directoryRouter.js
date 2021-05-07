/* eslint-disable import/named */
const { Router } = require('express');

const BasicRoute = require('../basicRoutes');
const DirFunctionhandler = require('./directoryfunctionshandler');

const directoryFunctionsRouter = () => {
  const router = new Router();

  const dirFncHandlerObj = new DirFunctionhandler();
  const dirFncRouteObj = new BasicRoute(dirFncHandlerObj);

  router.post('/directory/getfiles', dirFncRouteObj.getdirectoryDetails.bind(dirFncRouteObj));
  router.post('/directory/getListing', dirFncRouteObj.directoryListing.bind(dirFncRouteObj));

  return router;
};

module.exports = directoryFunctionsRouter;