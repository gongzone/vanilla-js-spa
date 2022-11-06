export default class Store {
  $state = null;
  $reducer = null;
  $observers = new Set();

  constructor(reducer) {
    this.$reducer = reducer;
    this.$state = this.$reducer();
  }

  get state() {
    return { ...this.$state };
  }

  subscribe(observer) {
    this.$observers.add(observer);
  }

  unSubscribe(observer) {
    this.$observers.delete(observer);
  }

  #notify() {
    console.log(`구독된 컴포넌트 수: ${this.$observers.size}`);
    this.$observers.forEach((observer) => observer.update());
  }

  dispatch(action = {}) {
    const newState = this.$reducer(this.$state, action);
    console.log(`${this.constructor.name} 스토어의 초기 상태: ${JSON.stringify(this.$state)}`);

    for (const [key, value] of Object.entries(newState)) {
      if (!this.$state[key]) continue;
      this.$state[key] = value;
    }

    console.log(`${this.constructor.name} 스토어의 업데이트 상태: ${JSON.stringify(this.$state)}`);

    this.#notify();
  }
}
