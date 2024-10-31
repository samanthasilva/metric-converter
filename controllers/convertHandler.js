const galToL = 3.78541;
const lbsToKg = 0.453592;
const miToKm = 1.60934;

const units = {
  gal: "L",
  L: "gal",
  mi: "km",
  km: "mi",
  lbs: "kg",
  kg: "lbs",
};

const conversionRate = {
  gal: galToL,
  L: 1 / galToL,
  mi: miToKm,
  km: 1 / miToKm,
  lbs: lbsToKg,
  kg: 1 / lbsToKg,
};

const unitMapping = {
  gal: "gallons",
  L: "liters",
  mi: "miles",
  km: "kilometers",
  lbs: "pounds",
  kg: "kilograms",
};

class ConvertHandler {
  getNum(input) {
    const unitIndex = this._findFirstAlphaIndex(input);
    const quantityStr = unitIndex === 0 ? "1" : input.slice(0, unitIndex);
    
    return this._parseQuantity(quantityStr);
  }

  getUnit(input) {
    const unitIndex = this._findFirstAlphaIndex(input);
    if (unitIndex < 0) return "invalid unit";

    const unit = input.slice(unitIndex);
    return this._validateUnit(unit);
  }

  getReturnUnit(initUnit) {
    const normalizedUnit = initUnit.toLowerCase() === 'l' ? 'L' : initUnit.toLowerCase();
    return units[normalizedUnit] || "invalid unit";
  }

  spellOutUnit(unit) {
    const normalizedUnit = unit.toLowerCase() === 'l' ? 'L' : unit.toLowerCase();
    return unitMapping[normalizedUnit] || "invalid unit";
  }

  convert(initNum, initUnit) {
    const normalizedUnit = initUnit.toLowerCase() === 'l' ? 'L' : initUnit.toLowerCase();
    const rate = conversionRate[normalizedUnit];
    return rate ? Math.round(initNum * rate * 1e5) / 1e5 : "invalid conversion";
  }

  getString(initNum, initUnit, returnNum, returnUnit) {
    const fromUnit = unitMapping[initUnit];
    const toUnit = unitMapping[returnUnit];
    return `${initNum} ${fromUnit} converts to ${returnNum} ${toUnit}`;
  }

  // Private helper functions
  _findFirstAlphaIndex(str) {
    return str.search(/[a-zA-Z]/);
  }

  _parseQuantity(quantityStr) {
    const parts = quantityStr.split("/");

    if (parts.length === 1) return isNaN(parts[0]) ? "invalid number" : +parts[0];
    if (parts.length === 2) {
      const [numerator, denominator] = parts.map(Number);
      return isNaN(numerator) || isNaN(denominator) ? "invalid number" : numerator / denominator;
    }
    return "invalid number";
  }

  _validateUnit(unit) {
    const normalizedUnit = unit.toLowerCase() === 'l' ? 'L' : unit.toLowerCase();
    return units.hasOwnProperty(normalizedUnit) ? normalizedUnit : "invalid unit";
  }
}

module.exports = ConvertHandler;
