import {
    getState,
    createState,
    p,
    button,
    div,
    input,
    reactiveChildren,
} from "../respond/index.es.js";

const todoState = createState({ todos: [] });

const TodoItem = (todo) =>
    div([
        p({
            innerText: todo,
            style: { display: "inline", marginRight: "10px" },
        }),
        button({
            innerText: "Delete",
            onclick: () => {
                getState(todoState).todos = getState(todoState).todos.filter(
                    (t) => t !== todo
                );
            },
        }),
    ]);

const TodoList = div(
    reactiveChildren(todoState, ([state]) =>
        state.todos.map((todo) => TodoItem(todo))
    )
);

const TodoInput = div([
    input({
        style: { display: "inline" },
        placeholder: "Todo",
    }),
    button({
        innerText: "Add",
        onclick: (event) => {
            const input = event.target.previousElementSibling;
            if (!input.value) return;

            getState(todoState).todos.push(input.value);
            input.value = "";
        },
    }),
    button({
        innerText: "Clear",
        onclick: () => {
            getState(todoState).todos = [];
        },
    }),
]);

export const Todo = div([TodoList, TodoInput]);
