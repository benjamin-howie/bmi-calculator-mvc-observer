class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    const changeData = (modelProperty) => {
      // modelProperty example: "heightCm"
      return (newData) => {
        this.model[modelProperty] = +newData; // Converting newData to a Number as this value will come from the DOM as a string.
      };
    };

    this.view.bindOnSelectChange(
      this.view.heightCmElem,
      changeData('heightCm')
    );
    this.view.bindOnSelectChange(
      this.view.heightFtElem,
      changeData('heightFt')
    );
    this.view.bindOnSelectChange(
      this.view.heightInchesElem,
      changeData('heightInches')
    );
    this.view.bindOnSelectChange(
      this.view.weightKgElem,
      changeData('weightKg')
    );
    this.view.bindOnSelectChange(
      this.view.weightStElem,
      changeData('weightSt')
    );
    this.view.bindOnSelectChange(
      this.view.weightPoundsElem,
      changeData('weightPounds')
    );

    this.view.bindOnUnitChange((unitVal) => {
      // Set the current unit type to the checked radio button. Reset the model values and the view values.
      this.model.currentUnitType = unitVal;
      this.model.reset();
      this.view.reset();
    });
    this.model.addObserver(this.view); // View will observe changes on the model.
    this.model.notify(this.model.data); // Initial render.
  }
}

export default Controller;
