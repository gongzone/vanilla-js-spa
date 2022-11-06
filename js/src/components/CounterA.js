import createComponent from '../core/component/create-component.js';

const CounterA = createComponent(({ useState, useProps, useView, useEvent }) => {
  const [numberState, setNumberState] = useState({
    a: 20,
    b: 30,
  });

  const parentState = useProps() ? useProps().parentState : '';

  useView(() => {
    return `
      <div>
        <p>타입: A / 초기값: 20</p>
        ${parentState}
        <span>${numberState.a}</span>
        <button class="plus-a">플러스</button>
        <button class="minus-a">마이너스</button>
      </div>
      `;
  });

  useEvent(({ attachEvent }) => {
    attachEvent('click', '.plus-a', () => {
      setNumberState({ ...numberState, a: numberState.a + 1 });
    });

    attachEvent('click', '.minus-a', () => {
      setNumberState({ ...numberState, a: numberState.a - 1 });
    });
  });
});

export default CounterA;
