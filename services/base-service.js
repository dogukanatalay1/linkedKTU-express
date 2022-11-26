class BaseService {
  constructor(model, populate) {
    this.model = model;
    this.populate = populate;
  }
}

module.exports = BaseService;
