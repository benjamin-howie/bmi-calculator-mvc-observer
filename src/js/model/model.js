import { Observable } from '../observer-setup/observer-setup';

class Model extends Observable {
  constructor() {
    super();

    this.unitTypes = {
      Imperial: 'imperial',
      Metric: 'metric',
    };

    this.data = {
      heightInches: 0,
      heightFt: 0,
      weightSt: 0,
      weightPounds: 0,
      heightCm: 0,
      weightKg: 0,
      currentUnitType: this.unitTypes.Metric, // Current unit type will determine which BMI calculation to use, as well as which units.
      bmi: 0,
    };
  }

  set bmi(val) {
    this.data.bmi = val;
    this.notify(this.data); // When the BMI value has changed, notify all observers.
  }

  // The BMI will be re-calculated and set whenever a unit value has been changed.
  set heightCm(val) {
    this.data.heightCm = val;
    this.bmi = this.calculateBmi();
  }
  set weightKg(val) {
    this.data.weightKg = val;
    this.bmi = this.calculateBmi();
  }
  set weightSt(val) {
    this.data.weightSt = val;
    this.bmi = this.calculateBmi();
  }
  set weightPounds(val) {
    this.data.weightPounds = val;
    this.bmi = this.calculateBmi();
  }
  set heightFt(val) {
    this.data.heightFt = val;
    this.bmi = this.calculateBmi();
  }
  set heightInches(val) {
    this.data.heightInches = val;
    this.bmi = this.calculateBmi();
  }

  get heightMetric() {
    return this.data.heightCm;
  }
  get weightMetric() {
    return this.data.weightKg;
  }
  get heightImperial() {
    return (
      this.convertFeetToInches(this.data.heightFt) + this.data.heightInches
    );
  }
  get weightImperial() {
    return (
      this.convertStoneToPounds(this.data.weightSt) + this.data.weightPounds
    );
  }
  set currentUnitType(val) {
    this.data.currentUnitType = val;
  }
  get isMetric() {
    return this.data.currentUnitType === this.unitTypes.Metric;
  }
  calculateBmi() {
    return this.isMetric
      ? this.metricBmiCalculator(this.weightMetric, this.heightMetric)
      : this.imperialBmiCalculator(this.weightImperial, this.heightImperial);
  }

  reset() {
    this.heightCm = 0;
    this.weightKg = 0;
    this.heightInches = 0;
    this.weightPounds = 0;
    this.bmi = 0;
  }
}

// Factory functions

const makeBmiCalculator = function (factor) {
  return function (weight, height) {
    return parseFloat(((weight / height / height) * factor).toFixed(1)) || 0;
  };
};

const makeUnitConverter = function (factor) {
  return function (amount) {
    return amount * factor;
  };
};

// In order to use the factory functions efficiently, I am setting the below methods by accessing the prorotype.

Model.prototype.metricBmiCalculator = makeBmiCalculator(10000);
Model.prototype.imperialBmiCalculator = makeBmiCalculator(703);
Model.prototype.convertStoneToPounds = makeUnitConverter(14); // 1 stone = 14pounds.
Model.prototype.convertFeetToInches = makeUnitConverter(12); // 1 Foot = 12 inches.

export default Model;
