import createComponent from './src/core/component/create-component.js';

import CounterA from './src/components/CounterA.js';
import CounterB from './src/components/CounterB.js';

const App = createComponent(({ useState, useView, useEvent, useChildren }) => {
  const [state1, setState1] = useState('안녕하세요.');
  const [state2, setState2] = useState('카운터입니다.');

  useView(() => {
    return `
      <div>
        <div>${state1}</div>
        <div>${state2}</div>
        <div id="counter-a"></div>
        <div id="counter-b"></div>
      </div>
      `;
  });

  useChildren(({ attachChild }) => {
    attachChild(CounterA, '#counter-a');
    attachChild(CounterB, '#counter-b');
  });
});

export default App;
