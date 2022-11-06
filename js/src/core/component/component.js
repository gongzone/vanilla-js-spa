export default class Component {
  $states = [];
  $stateKey = 0;

  $reducer = null;
  $target = null;
  $props = null;

  $createView = () => {};
  $createEvents = () => {};
  $createChildren = () => {};

  constructor(reducer, target, props) {
    this.$reducer = () => reducer(this.#hooks);
    this.$target = document.querySelector(target);
    this.$props = props;

    this.$reducer();
    this.render();
  }

  get #hooks() {
    return {
      useState: this.#useState.bind(this),
      useProps: this.#useProps.bind(this),
      useView: this.#useView.bind(this),
      useEvent: this.#useEvent.bind(this),
      useChildren: this.#useChildren.bind(this),
    };
  }

  #debounceFrame(callback) {
    let nextFrameCallback = -1;
    return () => {
      cancelAnimationFrame(nextFrameCallback);
      nextFrameCallback = requestAnimationFrame(callback);
    };
  }

  #useState(initState) {
    if (this.$states.length === this.$stateKey) {
      this.$states.push(initState);
    }

    let stateKey = this.$stateKey;
    let state = this.$states[stateKey];

    const setState = (newState) => {
      if (newState === state) return;
      if (JSON.stringify(newState) === JSON.stringify(state)) return;

      this.$states[stateKey] = newState;
      this.$stateKey = 0;

      this.$reducer();
      this.render();
    };

    this.$stateKey += 1;

    return [state, setState];
  }

  #useProps() {
    return this.$props;
  }

  #useView(view) {
    this.$createView = () => {
      this.$target.innerHTML = view();
    };
  }

  #useEvent(fn) {
    const attachEvent = (eventType, selector, callback) => {
      this.$target.querySelector(selector).addEventListener(eventType, (event) => {
        callback(event);
      });
    };

    this.$createEvents = () => fn({ attachEvent });
  }

  #useChildren(fn) {
    const attachChild = (child, selector, props) => {
      child(selector, props);
    };

    this.$createChildren = () => fn({ attachChild });
  }

  render() {
    console.log(this.$states);

    this.#debounceFrame(() => {
      this.$createView();
      this.$createEvents();
      this.$createChildren();
    })();
  }
}
