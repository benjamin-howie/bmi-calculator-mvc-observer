import Model from './model/model';
import View from './view/view';
import Controller from './controller/controller';
import '../sass/style.scss';

const newModel = new Model();
const newView = new View();
const controller = new Controller(newModel, newView);
