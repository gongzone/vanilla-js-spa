import Component from './component.js';

export default function createComponent(reducer) {
  const component = new Component(reducer);

  return component;
}
