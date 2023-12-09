export * from "./components.js";
export * from "./state.js";

import { RespondChildren } from "./components.js";

/** @param {HTMLElement} element */
export const createComponent = (element) => {
    const children = element[RespondChildren];
    if (children == undefined) return element;

    for (const child of children) {
        element.appendChild(createComponent(child));
    }
    return element;
};

export function createApp(root, layout) {
    const rootNode = document.querySelector(root);
    if (rootNode == undefined) return;

    for (const component of layout) {
        rootNode.appendChild(createComponent(component));
    }
}
