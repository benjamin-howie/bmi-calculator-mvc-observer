class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // TO-DO: Consider re-factor of the below.

    this.view.bindOnFormChange((eventTarget) => {
      // If the captured event has "unit" data attribute (e.g. "heightCm"), assign the new value of this to the model.
      if (eventTarget.dataset.unit) {
        this.model[eventTarget.dataset.unit] = +eventTarget.value; // Convert to Number
      } else if (eventTarget.name === 'unit-type') {
        // If this is coming from the unit-type radio button, change the current unit type.
        this.model.currentUnitType = eventTarget.value;
        this.model.reset();
        this.view.reset();
      } else {
        return;
      }
    });

    this.model.addObserver(this.view); // View will observe changes on the model.
    this.model.notify(this.model.data); // Initial render.
  }
}

export default Controller;
