import { Observer } from '../observer-setup/observer-setup';

class View extends Observer {
  constructor() {
    super();

    this.selectData = {
      // This data will be used to determine the <option> tags.
      heightCm: {
        elem: document.querySelector('#height-cm'),
        min: 140,
        max: 210,
      },
      heightInches: {
        elem: document.querySelector('#height-in'),
        min: 0,
        max: 11,
      },
      heightFt: {
        elem: document.querySelector('#height-ft'),
        min: 4,
        max: 7,
      },
      weightSt: {
        elem: document.querySelector('#weight-st'),
        min: 6,
        max: 25,
      },
      weightPounds: {
        elem: document.querySelector('#weight-pounds'),
        min: 0,
        max: 13,
      },
      weightKg: {
        elem: document.querySelector('#weight-kg'),
        min: 38,
        max: 125,
      },
    };

    // Render Form options
    for (const property in this.selectData) {
      // Loop through the selectData object and render <option> tags on the <select> element using the min and max values, e.g. The Height CM <select> element will have <option> tags from a value of 140cm to 210cm to choose from.
      const selectObj = this.selectData[property];
      this.#renderFormOptions(selectObj.elem, selectObj.min, selectObj.max);
    }

    // Unit Type Radio Buttons -- the radio buttons that are used to switch between Imperial and Metric.

    this.unitTypeRadio = document.querySelectorAll('input[name="unit-type"]');

    // Unit Types Fieldsets -- the field sets which house the <select> elements for Imperial and Metric

    this.imperialSection = document.querySelector('#imperial-section');
    this.metricSection = document.querySelector('#metric-section');

    // Result -- the BMI result will be printed here.

    this.bmiResultNumber = document.querySelector('.bmi-result-number');
    this.bmiResultText = document.querySelector('.bmi-result-text');
  }

  #renderFormOptions(parent, min, max) {
    // Create an amount of option elements based on the min and max value.
    // The parent will be a <select> tag.
    for (let i = min; i <= max; i++) {
      const option = this.createElement('option');
      option.value = i;
      option.innerText = i;
      parent.append(option);
    }
  }

  // Create an element with an optional CSS class
  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);

    return element;
  }

  get heightCmElem() {
    return this.selectData.heightCm.elem;
  }
  get heightInchesElem() {
    return this.selectData.heightInches.elem;
  }
  get heightFtElem() {
    return this.selectData.heightFt.elem;
  }
  get weightStElem() {
    return this.selectData.weightSt.elem;
  }
  get weightPoundsElem() {
    return this.selectData.weightPounds.elem;
  }
  get weightKgElem() {
    return this.selectData.weightKg.elem;
  }

  showUnitType(unitType) {
    // Hide both initially
    this.hide(this.imperialSection);
    this.hide(this.metricSection);

    // Show relevant unit type section
    if (unitType === 'metric') {
      this.show(this.metricSection);
    } else if (unitType === 'imperial') {
      this.show(this.imperialSection);
    } else {
      console.log('needs to be imperial or metric');
    }
  }

  hide(elem) {
    elem.style.display = 'none';
  }
  show(elem) {
    elem.style.display = 'block';
  }

  // EVENT LISTENERS -- These methods are exposed and handled by the Controller where the handler is set.

  bindOnUnitChange(handler) {
    this.unitTypeRadio.forEach((radio) => {
      radio.addEventListener('change', (e) => {
        handler(e.target.value);
      });
    });
  }

  bindOnSelectChange(elem, handler) {
    elem.addEventListener('change', (e) => {
      handler(e.target.value);
    });
  }

  ///////

  displayBmi(bmi) {
    // TO-DO: Switch statement for "obese, normal, under".
    let bmiResult = '';
    switch (true) {
      case bmi === 0:
        bmiResult = '';
        break;
      case bmi < 18.5:
        bmiResult = 'underweight';
        break;
      case bmi >= 18.5 && bmi <= 24.9:
        bmiResult = 'healthy';
        break;
      case bmi >= 25.0 && bmi <= 29.9:
        bmiResult = 'overweight';
        break;
      case bmi > 30.0:
        bmiResult = 'obese';
        break;
    }
    this.bmiResultText.innerText = bmiResult;

    this.bmiResultNumber.innerText = bmi;
  }
  reset() {
    // Set all <select> values to 0.
    for (const property in this.selectData) {
      const selectObj = this.selectData[property];
      selectObj.elem.value = '';
    }
  }

  update(data) {
    this.showUnitType(data.currentUnitType);
    this.displayBmi(data.bmi);
  }
}

export default View;
