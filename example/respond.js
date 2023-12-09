let C = 0;
const S = () => C++;
let g = 0;
const v = () => g++, m = {}, f = /* @__PURE__ */ new Map(), l = (e, t) => {
  f.set(e, [...f.get(e) ?? [], t]);
};
function s(e) {
  return m[e];
}
function y(e) {
  const t = new CustomEvent(`state::${e}`, {}), r = f.get(e) ?? [];
  for (const n of r) {
    const o = document.getElementById(n);
    o && o.dispatchEvent(t);
  }
}
function b(e, t) {
  const r = {};
  for (const n in t)
    if (Array.isArray(t[n])) {
      r[n] = new Proxy(t[n], {
        get: (o, c) => c === "push" ? (...i) => {
          o[c](...i), y(e);
        } : o[c]
      });
      for (let o = 0; o < t[n].length; o++)
        typeof t[n][o] == "object" && (t[n][o] = b(e, t[n][o]));
    } else
      r[n] = t[n];
  return r;
}
function A(e) {
  const t = `state-${v()}`, r = b(t, e);
  return m[t] = new Proxy(r, {
    get: (n, o) => n[o],
    set: (n, o, c) => (n[o] = c, y(t), !0)
  }), t;
}
const h = Symbol("Reactive"), a = Symbol("ReactiveChildren"), E = (e, t) => ({
  [h]: !0,
  tag: e,
  getValue: t
}), w = (e, t) => ({
  [a]: !0,
  tag: e,
  getChildren: t
}), $ = (e) => {
  const t = [], r = (n) => n.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();
  for (let n in e) {
    const o = r(n);
    t.push(`${o}: ${e[n]};`);
  }
  return t.join(" ");
};
function u(e, t, r) {
  const n = document.createElement(e);
  n.id = t.id ?? `${e}-${S()}`, r == null && (Array.isArray(t) || t[a] ? (r = t, t = {}) : t == null && (t = {}));
  for (const o in t) {
    if (t[o][h]) {
      const { tag: c, getValue: i } = t[o];
      n[o] = i(s(c)), n.addEventListener(`state::${c}`, () => {
        n[o] = i(s(c));
      }), l(c, n.id);
      continue;
    }
    if (o === "style" && typeof t[o] == "object") {
      n[o] = $(t[o]);
      continue;
    }
    n[o] = t[o];
  }
  if (!Array.isArray(r) && r?.[a]) {
    const { tag: o, getChildren: c } = r;
    r = c(s(o)), n.addEventListener(`state::${o}`, () => {
      n.replaceChildren(
        ...c(s(o)).map(d)
      );
    }), l(o, n.id);
  }
  return [n, r];
}
function _(e, t) {
  return u("button", e, t);
}
function R(e, t) {
  return u("p", e, t);
}
function j(e, t) {
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
function p(e, t) {
  return u("h3", e, t);
}
function P(e, t) {
  return u("h4", e, t);
}
const d = (e) => {
  const [t, r] = e;
  if (r == null)
    return t;
  for (const n of r)
    t.appendChild(d(n));
  return t;
};
function T(e, t) {
  const r = document.querySelector(e);
  if (r != null)
    for (const n of t)
      r.appendChild(d(n));
}
export {
  a as ReactiveChildren,
  h as ReactiveSymbol,
  _ as button,
  T as createApp,
  d as createComponent,
  A as createState,
  x as div,
  s as getState,
  I as h1,
  L as h2,
  p as h3,
  P as h4,
  j as input,
  R as p,
  E as reactive,
  w as reactiveChildren
};
