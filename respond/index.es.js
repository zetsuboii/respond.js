let S = 0;
const g = () => S++;
let A = 0;
const v = () => A++, l = {}, s = /* @__PURE__ */ new Map(), m = (e, t) => {
  s.set(e, [...s.get(e) ?? [], t]);
};
function i(e) {
  return l[e];
}
function y(e) {
  const t = new CustomEvent(`state::${e}`, {}), o = s.get(e) ?? [];
  for (const n of o) {
    const r = document.getElementById(n);
    r && r.dispatchEvent(t);
  }
}
function b(e, t) {
  return new Proxy(t, {
    get: (o, n) => n === "push" ? (...r) => {
      o[n](...r), y(e);
    } : o[n]
  });
}
function h(e, t) {
  const o = {};
  for (const n in t)
    if (Array.isArray(t[n])) {
      o[n] = b(e, t[n]);
      for (let r = 0; r < t[n].length; r++)
        typeof t[n][r] == "object" && (t[n][r] = h(e, t[n][r]));
    } else
      o[n] = t[n];
  return o;
}
function E(e) {
  const t = `state-${v()}`, o = h(t, e);
  return l[t] = new Proxy(o, {
    get: (n, r) => n[r],
    set: (n, r, c) => (Array.isArray(c) ? n[r] = b(t, c) : n[r] = c, y(t), !0)
  }), t;
}
const C = Symbol("Reactive"), f = Symbol("ReactiveChildren"), w = (e, t) => ({
  [C]: !0,
  tag: e,
  getValue: t
}), _ = (e, t) => ({
  [f]: !0,
  tag: e,
  getChildren: t
}), $ = (e) => {
  const t = [], o = (n) => n.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();
  for (let n in e) {
    const r = o(n);
    t.push(`${r}: ${e[n]};`);
  }
  return t.join(" ");
};
function u(e, t, o) {
  const n = document.createElement(e);
  n.id = t.id ?? `${e}-${g()}`, o == null && (Array.isArray(t) || t[f] ? (o = t, t = {}) : t == null && (t = {}));
  for (const r in t) {
    if (t[r][C]) {
      const { tag: c, getValue: d } = t[r];
      n[r] = d(i(c)), n.addEventListener(`state::${c}`, () => {
        n[r] = d(i(c));
      }), m(c, n.id);
      continue;
    }
    if (r === "style" && typeof t[r] == "object") {
      n[r] = $(t[r]);
      continue;
    }
    n[r] = t[r];
  }
  if (!Array.isArray(o) && o?.[f]) {
    const { tag: r, getChildren: c } = o;
    o = c(i(r)), n.addEventListener(`state::${r}`, () => {
      n.replaceChildren(
        ...c(i(r)).map(a)
      );
    }), m(r, n.id);
  }
  return [n, o];
}
function R(e, t) {
  return u("button", e, t);
}
function j(e, t) {
  return u("p", e, t);
}
function p(e, t) {
  return u("input", e, t);
}
function x(e, t) {
  return u("div", e, t);
}
function I(e, t) {
  return u("h1", e, t);
}
function L(e, t) {
  return u("h2", e, t);
}
function P(e, t) {
  return u("h3", e, t);
}
function T(e, t) {
  return u("h4", e, t);
}
const a = (e) => {
  const [t, o] = e;
  if (o == null)
    return t;
  for (const n of o)
    t.appendChild(a(n));
  return t;
};
function Z(e, t) {
  const o = document.querySelector(e);
  if (o != null)
    for (const n of t)
      o.appendChild(a(n));
}
export {
  f as ReactiveChildren,
  C as ReactiveSymbol,
  R as button,
  Z as createApp,
  a as createComponent,
  E as createState,
  x as div,
  i as getState,
  I as h1,
  L as h2,
  P as h3,
  T as h4,
  p as input,
  j as p,
  w as reactive,
  _ as reactiveChildren
};
//# sourceMappingURL=index.es.js.map
