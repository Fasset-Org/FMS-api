const SCMController = {
  addTender: async (req, res, next) => {
    try {
      console.log(req);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
};

module.exports = SCMController;
