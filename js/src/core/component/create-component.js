import Component from './component.js';

export default function createComponent(reducer) {
  return (target, props) => new Component(reducer, target, props);
}
