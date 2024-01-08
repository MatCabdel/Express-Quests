const database = require("../../database")

class movieManager {
  database;
  constructor() {
    this.database = database;
  }
}