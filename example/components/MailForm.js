import {
    getState,
    createState,
    reactive,
    p,
    button,
    input,
    div,
} from "../respond/index.es.js";

const formState = createState({ mail: "", password: "" });

const MailState = p({
    innerText: reactive(formState, (state) => {
        if (state.submitted) return "Submitted!";
        else return "Please enter your mail";
    }),
});

const MailInput = input({
    placeholder: "Mail",
    type: "email",
    oninput: (event) => {
        getState(formState).mail = event.target.value;
    },
});

const PasswordInput = input({
    placeholder: "Password",
    type: "password",
    oninput: (event) => {
        getState(formState).password = event.target.value;
    },
});

const SubmitButton = button({
    innerText: "Submit",
    onclick: async () => {
        const { mail, password } = getState(formState);
        console.log(`Submitting ${mail} and ${password}`);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Submitted");
        getState(formState).submitted = true;
    },
});

export const MailForm = div([
    MailState,
    MailInput,
    PasswordInput,
    SubmitButton,
]);
