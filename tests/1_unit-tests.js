const chai = require("chai");
const assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  test("convertHandler should correctly read a whole number input", function () {
    assert.strictEqual(convertHandler.getNum("2kg"), 2, "Correctly read whole number input");
  });

  test("convertHandler should correctly read a decimal number input", function () {
    assert.strictEqual(convertHandler.getNum("2.5kg"), 2.5, "Correctly read decimal input");
  });

  test("convertHandler should correctly read a fractional input", function () {
    assert.strictEqual(convertHandler.getNum("1/2kg"), 0.5, "Correctly read fractional input");
  });

  test("convertHandler should correctly read a fractional input with a decimal", function () {
    assert.strictEqual(convertHandler.getNum("0.5/0.5kg"), 1, "Correctly read fractional input with decimal");
  });

  test("convertHandler should correctly return an error on a double-fraction", function () {
    assert.strictEqual(convertHandler.getNum("3/2/3kg"), "invalid number", "Return error for double-fraction input");
  });

  test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided", function () {
    assert.strictEqual(convertHandler.getNum("kg"), 1, "Default to 1 when no numerical input");
  });

  test("convertHandler should correctly read each valid input unit", function () {
    const validUnits = ["gal", "L", "mi", "km", "lbs", "kg"];
    validUnits.forEach((unit) => {
      assert.strictEqual(convertHandler.getUnit(`2${unit}`), unit, `Correctly read ${unit}`);
    });
  });

  test("convertHandler should correctly return an error for an invalid input unit", function () {
    assert.strictEqual(convertHandler.getUnit("2invalidUnit"), "invalid unit", "Return error for invalid unit");
  });

  test("convertHandler should return the correct return unit for each valid input unit", function () {
    const unitPairs = { gal: "L", L: "gal", mi: "km", km: "mi", lbs: "kg", kg: "lbs" };
    Object.keys(unitPairs).forEach((unit) => {
      assert.strictEqual(
        convertHandler.getReturnUnit(unit),
        unitPairs[unit],
        `Correct return unit for ${unit}`
      );
    });
  });

  test("convertHandler should correctly return the spelled-out string unit for each valid input unit", function () {
    const unitStrings = { gal: "gallons", L: "liters", mi: "miles", km: "kilometers", lbs: "pounds", kg: "kilograms" };
    Object.keys(unitStrings).forEach((unit) => {
      assert.strictEqual(
        convertHandler.spellOutUnit(unit),
        unitStrings[unit],
        `Correct spelled-out string for ${unit}`
      );
    });
  });

  test("convertHandler should correctly convert gal to L", function () {
    assert.strictEqual(convertHandler.convert(2, "gal"), 7.57082, "Convert 2 gal to L correctly");
  });

  test("convertHandler should correctly convert L to gal", function () {
    assert.strictEqual(convertHandler.convert(2, "L"), 0.52834, "Convert 2 L to gal correctly");
  });

  test("convertHandler should correctly convert mi to km", function () {
    assert.strictEqual(convertHandler.convert(2, "mi"), 3.21868, "Convert 2 mi to km correctly");
  });

  test("convertHandler should correctly convert km to mi", function () {
    assert.strictEqual(convertHandler.convert(2, "km"), 1.24275, "Convert 2 km to mi correctly");
  });

  test("convertHandler should correctly convert lbs to kg", function () {
    assert.strictEqual(convertHandler.convert(2, "lbs"), 0.90718, "Convert 2 lbs to kg correctly");
  });

  test("convertHandler should correctly convert kg to lbs", function () {
    assert.strictEqual(convertHandler.convert(2, "kg"), 4.40925, "Convert 2 kg to lbs correctly");
  });
});
