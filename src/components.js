import {
    _stateSubscriptions,
    incrementElementCounter,
    subscribeToState,
} from "./globals.js";
import { createComponent } from "./respond.js";
import { ReactiveChildren, ReactiveSymbol } from "./state.js";
import { getState } from "./state.js";

export const RespondChildren = Symbol("RespondChildren");

/**
 * Converts CSS object to string
 * @param {CSSStyleDeclaration} style
 * @returns {string}
 */
const getStyle = (style) => {
    const styleString = [];

    const camelToKebab = (str) =>
        str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();

    for (let key in style) {
        const fmt = camelToKebab(key);
        styleString.push(`${fmt}: ${style[key]};`);
    }
    return styleString.join(" ");
};

/**
 * @param {string} name
 * @param {HTMLElement} props
 * @param {HTMLElement[]} children
 * @returns {HTMLElement}
 */
function generateComponent(name, props, children) {
    const element = document.createElement(name);
    element.id = props.id ?? `${name}-${incrementElementCounter()}`;

    // Allow usages like:
    // * element(): translates to element({}, undefined)
    // * element(props): translates to element(props, undefined)
    // * element(children): translates to element({}, children)
    // Undefined children are fine as they are ignored
    if (children == undefined) {
        if (Array.isArray(props) || props[ReactiveChildren]) {
            children = props;
            props = {};
        } else if (props == undefined) {
            props = {};
        }
    }

    for (const key in props) {
        if (props[key][ReactiveSymbol]) {
            const { tags, getValue } = props[key];

            element[key] = getValue(tags.map(getState));

            tags.forEach((tag) => {
                element.addEventListener(`state::${tag}`, () => {
                    element[key] = getValue(tags.map(getState));
                });
                subscribeToState(tag, element.id);
            });
            continue;
        }

        if (key === "style" && typeof props[key] === "object") {
            element[key] = getStyle(props[key]);
            continue;
        }

        element[key] = props[key];
    }

    if (!Array.isArray(children) && children?.[ReactiveChildren]) {
        const { tags, getChildren } = children;

        children = getChildren(tags.map(getState));
        tags.forEach((tag) => {
            element.addEventListener(`state::${tag}`, () => {
                element.replaceChildren(
                    ...getChildren(tags.map(getState)).map(createComponent)
                );
            });
            subscribeToState(tag, element.id);
        });
    }

    element[RespondChildren] = children;
    return element;
}

/** @param {HTMLButtonElement} props @param {HTMLElement[]} children */
export function button(props, children) {
    return generateComponent("button", props, children);
}

/** @param {HTMLParagraphElement} props @param {HTMLElement[]} children */
export function p(props, children) {
    return generateComponent("p", props, children);
}

/** @param {HTMLInputElement} props @param {HTMLElement[]} children */
export function input(props, children) {
    return generateComponent("input", props, children);
}

/** @param {HTMLDivElement} props @param {HTMLElement[]} children */
export function div(props, children) {
    return generateComponent("div", props, children);
}

/** @param {HTMLHeadingElement} props @param {HTMLElement[]} children */
export function h1(props, children) {
    return generateComponent("h1", props, children);
}

/** @param {HTMLHeadingElement} props @param {HTMLElement[]} children */
export function h2(props, children) {
    return generateComponent("h2", props, children);
}

/** @param {HTMLHeadingElement} props @param {HTMLElement[]} children */
export function h3(props, children) {
    return generateComponent("h3", props, children);
}

/** @param {HTMLHeadingElement} props @param {HTMLElement[]} children */
export function h4(props, children) {
    return generateComponent("h4", props, children);
}
