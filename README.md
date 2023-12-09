# Respond

Respond is a single page application library, written in 200 LOC.

## Features
- Reactive DOM: DOM elements update automatically when state changes
- Granular state updates: Only the DOM elements that depend on a state change are updated
- Native HTML APIs: No custom syntax or DSL, just plain JavaScript

## Installation
Just copy `respond.js` into your project.
To run the development server, run `bun --watch server.js`.

## Example: Counter App
```js
import {
    getState,
    createState,
    reactive,
    p,
    button,
    div,
} from "./respond.js";

const counterState = createState({ count: 0 });

const CounterText = p({
    innerText: reactive(counterState, (state) => state.count),
});

const IncrementButton = button({
    innerText: "Increment",
    onclick: () => getState(counterState).count++,
});

const Counter = div([CounterText, IncrementButton]);

createApp("body", [Counter]);
```

## Example: Todo App
```js
import {
    getState,
    createState,
    reactiveChildren,
    p,
    button,
    input,
    div,
} from "./respond.js";

const todoState = createState({ todos: [] });

const TodoList = div(
    reactiveChildren(
        todoState, 
        (state) => state.todos.map((todo) => p({ innerText: todo }))
    )
);

const TodoInput = input({
    oninput: (event) => {
        const value = event.target.value;
        if (event.key === "Enter" && value) {
            getState(todoState).todos.push(value);
            event.target.value = "";
        }
    },
});

const TodoApp = div([TodoList, TodoInput]);

createApp("body", [TodoApp]);
```

## Contributing
This is a hobby project, but if you feel like contributing, feel free to open a pull request.