// This file will setup the default classes for Observables and Observers.

//  Observable

class Observable {
  constructor() {
    this.observers = [];
  }
  addObserver(observer) {
    // Add a new observer.
    try {
      const observers = [...this.observers, observer];
      this.observers = observers;
    } catch (e) {
      console.log(e);
    }
  }
  removeObserver(observer) {
    // Remove the passed in the observer from the observers.
    try {
      this.observers = this.observers.filter((obs) => {
        return obs !== observer;
      });
    } catch (e) {
      console.log(e);
    }
  }
  notify(data) {
    this.observers.forEach((observer) => {
      observer.update(data);
    });
  }
}

// Observer

class Observer {
  constructor() {}
  update() {}
}

export { Observable, Observer };
