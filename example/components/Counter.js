import {
    getState,
    createState,
    reactive,
    p,
    button,
    div,
} from "../respond/index.es.js";

const counterState = createState({ count: 0 });

const CounterText = p({
    innerText: reactive(counterState, ([state]) => state.count),
});

const IncrementButton = button({
    innerText: reactive(
        counterState,
        ([state]) => `Increment to ${state.count + 1}`
    ),
    onclick: () => {
        getState(counterState).count++;
    },
});

export const Counter = div([CounterText, IncrementButton]);
