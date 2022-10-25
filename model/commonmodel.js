const baseSchema = require("../schema");
class Commonmodel {
  constructor(collection) {
    this.schema = {};
    if (baseSchema.hasOwnProperty(collection)) {
      this.schema = baseSchema[collection];
    }
  }

  insert(data) {
    return new Promise(async (resolve, reject) => {
      // console.log(data);
      let hasInerted = await this.schema.create(data);
      if (hasInerted) {
        resolve(hasInerted);
      } else {
        reject("Something went wrong");
      }
    });
  }

  update(criteria, data) {
    return new Promise(async (resolve, reject) => {
      // console.log(data);
      let hasUpdated = await this.schema.updateOne(criteria, data);
      if (hasUpdated) {
        resolve(hasUpdated);
      } else {
        reject("Something went wrong");
      }
    });
  }

  find(criteria) {
    return new Promise(async (resolve, reject) => {
      let items = await this.schema.find(criteria);
      resolve(items);
    });
  }

  findOne(criteria) {
    return new Promise(async (resolve, reject) => {
      let item = await this.schema.findOne(criteria);
      resolve(item);
    });
  }
}

module.exports = Commonmodel;
