class BasicRoute {
  constructor(routeHandler) {
    this.routeHandler = routeHandler;
  }

  async getdirectoryDetails(req, res) {
    try {
      const response = await this.routeHandler.getdirectoryDetails(req);
      res.status(200);
      res.send(response);
    } catch (error) {
      res.status(error.statusCode || 500);
      res.send(error.message || error);
    }
  }

  async directoryListing(req, res) {
    try {
      const response = await this.routeHandler.getAllFilesListDetails(req);
      res.header('Content-Type', 'application/json');
      res.status(201);
      res.send(response);
    } catch (error) {
      res.status(error.statusCode || 500);
      res.send(error.message || error);
    }
  }
}

module.exports = BasicRoute;