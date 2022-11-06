import createComponent from '../core/component/create-component.js';

const CounterB = createComponent(({ useState, useView, useEvent }) => {
  const [numberState, setNumberState] = useState({
    a: 30,
    b: 40,
  });

  useView(() => {
    return `
      <div>
        <p>타입: B / 초기값: 40</p>
        <span>${numberState.b}</span>
        <button class="plus-b">플러스</button>
        <button class="minus-b">마이너스</button>
      </div>
      `;
  });

  useEvent(({ attachEvent }) => {
    attachEvent('click', '.plus-b', () => {
      setNumberState({ ...numberState, b: numberState.b + 1 });
    });

    attachEvent('click', '.minus-b', () => {
      setNumberState({ ...numberState, b: numberState.b - 1 });
    });
  });
});

export default CounterB;
