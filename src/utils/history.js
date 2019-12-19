const History = {
  _history: [],
  install (Vue) {
    Object.defineProperty(Vue.prototype, '$routerHistory', {
      get () {
        return History;
      }
    })
  },
  push (path) {
    this._history.push(path);
  },
  pop () {
    this._history.pop();
  },
  canBack () {
    return this._history.lenght > 0;
  }

}
export default History