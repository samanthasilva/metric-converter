"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  const convertHandler = new ConvertHandler();

  app.route("/api/convert").get((req, res) => {
    const { input } = req.query;
    
    if (!input) {
      return res.send("invalid input");
    }

    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    const errors = [];

    if (initNum === "invalid number") errors.push("number");
    if (initUnit === "invalid unit") errors.push("unit");

    if (errors.length) {
      return res.send(
        `invalid ${errors.join(" and ")}`
      );
    }

    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    
    res.json({ initNum, initUnit, returnNum, returnUnit, string });
  });
};
