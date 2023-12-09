import {
    _stateStore,
    _stateSubscriptions,
    incrementStateCounter,
} from "./globals.js";

export function getState(tag) {
    return _stateStore[tag];
}

function notifySubscribers(tag) {
    const stateEvent = new CustomEvent(`state::${tag}`, {});

    const tagSubscriptions = _stateSubscriptions.get(tag) ?? [];
    for (const elemId of tagSubscriptions) {
        const element = document.getElementById(elemId);
        if (element) element.dispatchEvent(stateEvent);
    }
}

/**
 * Wraps array in a proxy so that .push operation is reflected
 * For a complete implementation other mutating array operations has to be completed
 */
function wrapArray(tag, array) {
    return new Proxy(array, {
        get: (target, key) => {
            if (key === "push") {
                return (...args) => {
                    target[key](...args);
                    notifySubscribers(tag);
                };
            }

            return target[key];
        },
    });
}

/** Wrap the state in order to catch push events */
function wrapInitialState(tag, initial) {
    const state = {};

    // For every key in the initial state; if item is an array, create a proxy
    // and replace it inside the state. This proxy will catch push events and
    // notify subscribers.
    for (const key in initial) {
        if (Array.isArray(initial[key])) {
            state[key] = wrapArray(tag, initial[key]);

            for (let i = 0; i < initial[key].length; i++) {
                if (typeof initial[key][i] === "object") {
                    initial[key][i] = wrapInitialState(tag, initial[key][i]);
                }
            }
        } else {
            state[key] = initial[key];
        }
    }

    return state;
}

export function createState(initial) {
    const tag = `state-${incrementStateCounter()}`;
    const _state = wrapInitialState(tag, initial);

    _stateStore[tag] = new Proxy(_state, {
        get: (target, key) => {
            return target[key];
        },
        set: (target, key, value) => {
            if (Array.isArray(value)) {
                target[key] = wrapArray(tag, value);
            } else {
                target[key] = value;
            }
            notifySubscribers(tag);
            return true;
        },
    });

    return tag;
}

export const ReactiveSymbol = Symbol("Reactive");
export const ReactiveChildren = Symbol("ReactiveChildren");

export const reactive = (tag, getValue) => ({
    [ReactiveSymbol]: true,
    tag,
    getValue,
});

export const reactiveChildren = (tag, getChildren) => ({
    [ReactiveChildren]: true,
    tag,
    getChildren,
});
