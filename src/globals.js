/** Counter for elements */
let _elementCounter = 0;
export const getElementCounter = () => _elementCounter;
export const incrementElementCounter = () => _elementCounter++;

/** Counter for states */
let _stateCounter = 0;
export const getStateCounter = () => _stateCounter;
export const incrementStateCounter = () => _stateCounter++;

/** @type {Record<string, Record<string, any>>} */
export const _stateStore = {};

/** @type {Map<string, string[]} subscriptions */
export const _stateSubscriptions = new Map();
export const subscribeToState = (tag, id) => {
    _stateSubscriptions.set(tag, [...(_stateSubscriptions.get(tag) ?? []), id]);
};
