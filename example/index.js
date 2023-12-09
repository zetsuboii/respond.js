import { Name, Counter, Todo, MailForm } from "./components/index.js";
import * as Respond from "./respond/index.es.js";

document.addEventListener("DOMContentLoaded", () => {
    const Header = Respond.h1({ innerText: "Respond.js" });

    const withHeader = (name, component) =>
        Respond.div([Respond.h1({ innerText: name }), component]);

    Respond.createApp("body", [
        Header,
        withHeader("Counter", Counter),
        withHeader("Text Input", Name),
        withHeader("Mail Form", MailForm),
        withHeader("Todo List", Todo),
    ]);
});
