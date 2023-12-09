import {
    getState,
    createState,
    reactive,
    p,
    div,
    input,
} from "../respond/index.es.js";

const nameState = createState({ name: "" });

const NameText = p({
    innerText: reactive(
        nameState,
        (state) => `${state.name} ${state.name.length}`
    ),
});

const NameInput = input({
    placeholder: "Enter your name",
    value: reactive(nameState, (state) => state.name),
    oninput: (event) => {
        getState(nameState).name = event.target.value;
    },
    style: {
        padding: "5px",
        borderRadius: "5px",
    },
});

export const Name = div([NameText, NameInput]);
