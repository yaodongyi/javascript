import V from '../main';
export const meth = new (class {
  constructor(a) {
    console.log(a);
  }
  getVue() {
    console.log(this);
  }
})(V);
