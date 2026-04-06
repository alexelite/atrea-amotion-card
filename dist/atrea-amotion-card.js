/* build-date: 2026-04-06T17:46:26.884Z */
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ce = globalThis, ke = ce.ShadowRoot && (ce.ShadyCSS === void 0 || ce.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Me = Symbol(), Fe = /* @__PURE__ */ new WeakMap();
let it = class {
  constructor(e, r, a) {
    if (this._$cssResult$ = !0, a !== Me) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = r;
  }
  get styleSheet() {
    let e = this.o;
    const r = this.t;
    if (ke && e === void 0) {
      const a = r !== void 0 && r.length === 1;
      a && (e = Fe.get(r)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), a && Fe.set(r, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Vt = (t) => new it(typeof t == "string" ? t : t + "", void 0, Me), nt = (t, ...e) => {
  const r = t.length === 1 ? t[0] : e.reduce((a, i, n) => a + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + t[n + 1], t[0]);
  return new it(r, t, Me);
}, Nt = (t, e) => {
  if (ke) t.adoptedStyleSheets = e.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet);
  else for (const r of e) {
    const a = document.createElement("style"), i = ce.litNonce;
    i !== void 0 && a.setAttribute("nonce", i), a.textContent = r.cssText, t.appendChild(a);
  }
}, He = ke ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let r = "";
  for (const a of e.cssRules) r += a.cssText;
  return Vt(r);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: It, defineProperty: Ut, getOwnPropertyDescriptor: jt, getOwnPropertyNames: Rt, getOwnPropertySymbols: Dt, getPrototypeOf: Bt } = Object, he = globalThis, Ve = he.trustedTypes, Wt = Ve ? Ve.emptyScript : "", qt = he.reactiveElementPolyfillSupport, W = (t, e) => t, ue = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Wt : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let r = t;
  switch (e) {
    case Boolean:
      r = t !== null;
      break;
    case Number:
      r = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        r = JSON.parse(t);
      } catch {
        r = null;
      }
  }
  return r;
} }, Pe = (t, e) => !It(t, e), Ne = { attribute: !0, type: String, converter: ue, reflect: !1, useDefault: !1, hasChanged: Pe };
Symbol.metadata ??= Symbol("metadata"), he.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let I = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, r = Ne) {
    if (r.state && (r.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((r = Object.create(r)).wrapped = !0), this.elementProperties.set(e, r), !r.noAccessor) {
      const a = Symbol(), i = this.getPropertyDescriptor(e, a, r);
      i !== void 0 && Ut(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, r, a) {
    const { get: i, set: n } = jt(this.prototype, e) ?? { get() {
      return this[r];
    }, set(o) {
      this[r] = o;
    } };
    return { get: i, set(o) {
      const s = i?.call(this);
      n?.call(this, o), this.requestUpdate(e, s, a);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Ne;
  }
  static _$Ei() {
    if (this.hasOwnProperty(W("elementProperties"))) return;
    const e = Bt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(W("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(W("properties"))) {
      const r = this.properties, a = [...Rt(r), ...Dt(r)];
      for (const i of a) this.createProperty(i, r[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const r = litPropertyMetadata.get(e);
      if (r !== void 0) for (const [a, i] of r) this.elementProperties.set(a, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [r, a] of this.elementProperties) {
      const i = this._$Eu(r, a);
      i !== void 0 && this._$Eh.set(i, r);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const r = [];
    if (Array.isArray(e)) {
      const a = new Set(e.flat(1 / 0).reverse());
      for (const i of a) r.unshift(He(i));
    } else e !== void 0 && r.push(He(e));
    return r;
  }
  static _$Eu(e, r) {
    const a = r.attribute;
    return a === !1 ? void 0 : typeof a == "string" ? a : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
  }
  addController(e) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), r = this.constructor.elementProperties;
    for (const a of r.keys()) this.hasOwnProperty(a) && (e.set(a, this[a]), delete this[a]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Nt(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, r, a) {
    this._$AK(e, a);
  }
  _$ET(e, r) {
    const a = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, a);
    if (i !== void 0 && a.reflect === !0) {
      const n = (a.converter?.toAttribute !== void 0 ? a.converter : ue).toAttribute(r, a.type);
      this._$Em = e, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(e, r) {
    const a = this.constructor, i = a._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const n = a.getPropertyOptions(i), o = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : ue;
      this._$Em = i;
      const s = o.fromAttribute(r, n.type);
      this[i] = s ?? this._$Ej?.get(i) ?? s, this._$Em = null;
    }
  }
  requestUpdate(e, r, a, i = !1, n) {
    if (e !== void 0) {
      const o = this.constructor;
      if (i === !1 && (n = this[e]), a ??= o.getPropertyOptions(e), !((a.hasChanged ?? Pe)(n, r) || a.useDefault && a.reflect && n === this._$Ej?.get(e) && !this.hasAttribute(o._$Eu(e, a)))) return;
      this.C(e, r, a);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, r, { useDefault: a, reflect: i, wrapped: n }, o) {
    a && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, o ?? r ?? this[e]), n !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || a || (r = void 0), this._$AL.set(e, r)), i === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (r) {
      Promise.reject(r);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [i, n] of this._$Ep) this[i] = n;
        this._$Ep = void 0;
      }
      const a = this.constructor.elementProperties;
      if (a.size > 0) for (const [i, n] of a) {
        const { wrapped: o } = n, s = this[i];
        o !== !0 || this._$AL.has(i) || s === void 0 || this.C(i, void 0, n, s);
      }
    }
    let e = !1;
    const r = this._$AL;
    try {
      e = this.shouldUpdate(r), e ? (this.willUpdate(r), this._$EO?.forEach((a) => a.hostUpdate?.()), this.update(r)) : this._$EM();
    } catch (a) {
      throw e = !1, this._$EM(), a;
    }
    e && this._$AE(r);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((r) => r.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq &&= this._$Eq.forEach((r) => this._$ET(r, this[r])), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
I.elementStyles = [], I.shadowRootOptions = { mode: "open" }, I[W("elementProperties")] = /* @__PURE__ */ new Map(), I[W("finalized")] = /* @__PURE__ */ new Map(), qt?.({ ReactiveElement: I }), (he.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ee = globalThis, Ie = (t) => t, de = Ee.trustedTypes, Ue = de ? de.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, ot = "$lit$", k = `lit$${Math.random().toFixed(9).slice(2)}$`, st = "?" + k, Zt = `<${st}>`, O = document, q = () => O.createComment(""), Z = (t) => t === null || typeof t != "object" && typeof t != "function", Se = Array.isArray, Gt = (t) => Se(t) || typeof t?.[Symbol.iterator] == "function", be = `[ 	
\f\r]`, B = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, je = /-->/g, Re = />/g, S = RegExp(`>|${be}(?:([^\\s"'>=/]+)(${be}*=${be}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), De = /'/g, Be = /"/g, lt = /^(?:script|style|textarea|title)$/i, ct = (t) => (e, ...r) => ({ _$litType$: t, strings: e, values: r }), p = ct(1), y = ct(2), R = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), We = /* @__PURE__ */ new WeakMap(), T = O.createTreeWalker(O, 129);
function pt(t, e) {
  if (!Se(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ue !== void 0 ? Ue.createHTML(e) : e;
}
const Kt = (t, e) => {
  const r = t.length - 1, a = [];
  let i, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = B;
  for (let s = 0; s < r; s++) {
    const l = t[s];
    let c, h, d = -1, b = 0;
    for (; b < l.length && (o.lastIndex = b, h = o.exec(l), h !== null); ) b = o.lastIndex, o === B ? h[1] === "!--" ? o = je : h[1] !== void 0 ? o = Re : h[2] !== void 0 ? (lt.test(h[2]) && (i = RegExp("</" + h[2], "g")), o = S) : h[3] !== void 0 && (o = S) : o === S ? h[0] === ">" ? (o = i ?? B, d = -1) : h[1] === void 0 ? d = -2 : (d = o.lastIndex - h[2].length, c = h[1], o = h[3] === void 0 ? S : h[3] === '"' ? Be : De) : o === Be || o === De ? o = S : o === je || o === Re ? o = B : (o = S, i = void 0);
    const x = o === S && t[s + 1].startsWith("/>") ? " " : "";
    n += o === B ? l + Zt : d >= 0 ? (a.push(c), l.slice(0, d) + ot + l.slice(d) + k + x) : l + k + (d === -2 ? s : x);
  }
  return [pt(t, n + (t[r] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), a];
};
class G {
  constructor({ strings: e, _$litType$: r }, a) {
    let i;
    this.parts = [];
    let n = 0, o = 0;
    const s = e.length - 1, l = this.parts, [c, h] = Kt(e, r);
    if (this.el = G.createElement(c, a), T.currentNode = this.el.content, r === 2 || r === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (i = T.nextNode()) !== null && l.length < s; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const d of i.getAttributeNames()) if (d.endsWith(ot)) {
          const b = h[o++], x = i.getAttribute(d).split(k), H = /([.?@])?(.*)/.exec(b);
          l.push({ type: 1, index: n, name: H[2], strings: x, ctor: H[1] === "." ? Jt : H[1] === "?" ? Xt : H[1] === "@" ? Qt : fe }), i.removeAttribute(d);
        } else d.startsWith(k) && (l.push({ type: 6, index: n }), i.removeAttribute(d));
        if (lt.test(i.tagName)) {
          const d = i.textContent.split(k), b = d.length - 1;
          if (b > 0) {
            i.textContent = de ? de.emptyScript : "";
            for (let x = 0; x < b; x++) i.append(d[x], q()), T.nextNode(), l.push({ type: 2, index: ++n });
            i.append(d[b], q());
          }
        }
      } else if (i.nodeType === 8) if (i.data === st) l.push({ type: 2, index: n });
      else {
        let d = -1;
        for (; (d = i.data.indexOf(k, d + 1)) !== -1; ) l.push({ type: 7, index: n }), d += k.length - 1;
      }
      n++;
    }
  }
  static createElement(e, r) {
    const a = O.createElement("template");
    return a.innerHTML = e, a;
  }
}
function D(t, e, r = t, a) {
  if (e === R) return e;
  let i = a !== void 0 ? r._$Co?.[a] : r._$Cl;
  const n = Z(e) ? void 0 : e._$litDirective$;
  return i?.constructor !== n && (i?._$AO?.(!1), n === void 0 ? i = void 0 : (i = new n(t), i._$AT(t, r, a)), a !== void 0 ? (r._$Co ??= [])[a] = i : r._$Cl = i), i !== void 0 && (e = D(t, i._$AS(t, e.values), i, a)), e;
}
class Yt {
  constructor(e, r) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = r;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: r }, parts: a } = this._$AD, i = (e?.creationScope ?? O).importNode(r, !0);
    T.currentNode = i;
    let n = T.nextNode(), o = 0, s = 0, l = a[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let c;
        l.type === 2 ? c = new K(n, n.nextSibling, this, e) : l.type === 1 ? c = new l.ctor(n, l.name, l.strings, this, e) : l.type === 6 && (c = new er(n, this, e)), this._$AV.push(c), l = a[++s];
      }
      o !== l?.index && (n = T.nextNode(), o++);
    }
    return T.currentNode = O, i;
  }
  p(e) {
    let r = 0;
    for (const a of this._$AV) a !== void 0 && (a.strings !== void 0 ? (a._$AI(e, a, r), r += a.strings.length - 2) : a._$AI(e[r])), r++;
  }
}
class K {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, r, a, i) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = e, this._$AB = r, this._$AM = a, this.options = i, this._$Cv = i?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const r = this._$AM;
    return r !== void 0 && e?.nodeType === 11 && (e = r.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, r = this) {
    e = D(this, e, r), Z(e) ? e === u || e == null || e === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : e !== this._$AH && e !== R && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Gt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== u && Z(this._$AH) ? this._$AA.nextSibling.data = e : this.T(O.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: r, _$litType$: a } = e, i = typeof a == "number" ? this._$AC(e) : (a.el === void 0 && (a.el = G.createElement(pt(a.h, a.h[0]), this.options)), a);
    if (this._$AH?._$AD === i) this._$AH.p(r);
    else {
      const n = new Yt(i, this), o = n.u(this.options);
      n.p(r), this.T(o), this._$AH = n;
    }
  }
  _$AC(e) {
    let r = We.get(e.strings);
    return r === void 0 && We.set(e.strings, r = new G(e)), r;
  }
  k(e) {
    Se(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let a, i = 0;
    for (const n of e) i === r.length ? r.push(a = new K(this.O(q()), this.O(q()), this, this.options)) : a = r[i], a._$AI(n), i++;
    i < r.length && (this._$AR(a && a._$AB.nextSibling, i), r.length = i);
  }
  _$AR(e = this._$AA.nextSibling, r) {
    for (this._$AP?.(!1, !0, r); e !== this._$AB; ) {
      const a = Ie(e).nextSibling;
      Ie(e).remove(), e = a;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class fe {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, r, a, i, n) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = e, this.name = r, this._$AM = i, this.options = n, a.length > 2 || a[0] !== "" || a[1] !== "" ? (this._$AH = Array(a.length - 1).fill(new String()), this.strings = a) : this._$AH = u;
  }
  _$AI(e, r = this, a, i) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) e = D(this, e, r, 0), o = !Z(e) || e !== this._$AH && e !== R, o && (this._$AH = e);
    else {
      const s = e;
      let l, c;
      for (e = n[0], l = 0; l < n.length - 1; l++) c = D(this, s[a + l], r, l), c === R && (c = this._$AH[l]), o ||= !Z(c) || c !== this._$AH[l], c === u ? e = u : e !== u && (e += (c ?? "") + n[l + 1]), this._$AH[l] = c;
    }
    o && !i && this.j(e);
  }
  j(e) {
    e === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Jt extends fe {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === u ? void 0 : e;
  }
}
class Xt extends fe {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== u);
  }
}
class Qt extends fe {
  constructor(e, r, a, i, n) {
    super(e, r, a, i, n), this.type = 5;
  }
  _$AI(e, r = this) {
    if ((e = D(this, e, r, 0) ?? u) === R) return;
    const a = this._$AH, i = e === u && a !== u || e.capture !== a.capture || e.once !== a.once || e.passive !== a.passive, n = e !== u && (a === u || i);
    i && this.element.removeEventListener(this.name, this, a), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class er {
  constructor(e, r, a) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = r, this.options = a;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    D(this, e);
  }
}
const tr = Ee.litHtmlPolyfillSupport;
tr?.(G, K), (Ee.litHtmlVersions ??= []).push("3.3.2");
const rr = (t, e, r) => {
  const a = r?.renderBefore ?? e;
  let i = a._$litPart$;
  if (i === void 0) {
    const n = r?.renderBefore ?? null;
    a._$litPart$ = i = new K(e.insertBefore(q(), n), n, void 0, r ?? {});
  }
  return i._$AI(t), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Te = globalThis;
class L extends I {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const r = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = rr(r, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return R;
  }
}
L._$litElement$ = !0, L.finalized = !0, Te.litElementHydrateSupport?.({ LitElement: L });
const ar = Te.litElementPolyfillSupport;
ar?.({ LitElement: L });
(Te.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Le = (t) => (e, r) => {
  r !== void 0 ? r.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ir = { attribute: !0, type: String, converter: ue, reflect: !1, hasChanged: Pe }, nr = (t = ir, e, r) => {
  const { kind: a, metadata: i } = r;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), a === "setter" && ((t = Object.create(t)).wrapped = !0), n.set(r.name, t), a === "accessor") {
    const { name: o } = r;
    return { set(s) {
      const l = e.get.call(this);
      e.set.call(this, s), this.requestUpdate(o, l, t, !0, s);
    }, init(s) {
      return s !== void 0 && this.C(o, void 0, t, s), s;
    } };
  }
  if (a === "setter") {
    const { name: o } = r;
    return function(s) {
      const l = this[o];
      e.call(this, s), this.requestUpdate(o, l, t, !0, s);
    };
  }
  throw Error("Unsupported decorator location: " + a);
};
function Y(t) {
  return (e, r) => typeof r == "object" ? nr(t, e, r) : ((a, i, n) => {
    const o = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, a), o ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(t, e, r);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function w(t) {
  return Y({ ...t, state: !0, attribute: !1 });
}
var or = Object.defineProperty, sr = Object.getOwnPropertyDescriptor, ut = (t, e, r, a) => {
  for (var i = a > 1 ? void 0 : a ? sr(e, r) : e, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (i = (a ? o(e, r, i) : o(i)) || i);
  return a && i && or(e, r, i), i;
};
let Ae = class extends L {
  setConfig(t) {
    this.config = t;
  }
  render() {
    return p`
      <ha-alert alert-type="info">
        Configure entity IDs in YAML. Visual editor support can be expanded later.
      </ha-alert>
    `;
  }
};
ut([
  Y({ attribute: !1 })
], Ae.prototype, "config", 2);
Ae = ut([
  Le("atrea-amotion-card-editor")
], Ae);
function lr(t, e) {
  dt(t, e, "info");
}
function dt(t, e, r) {
  t.dispatchEvent(
    new CustomEvent("hass-more-info", {
      bubbles: !0,
      composed: !0,
      detail: { entityId: e, view: r }
    })
  );
}
function g(t, e, r) {
  if (!(!r || e === "none")) {
    if (e === "history") {
      const a = `/history?entity_id=${encodeURIComponent(r)}`;
      window.history.pushState(null, "", a), window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: !1 } }));
      return;
    }
    lr(t, r);
  }
}
async function ht(t, e) {
  if (!t.callWS)
    return null;
  try {
    return (await t.callWS({
      type: "config/entity_registry/get",
      entity_id: e
    }))?.device_id ?? null;
  } catch {
    return null;
  }
}
function pe(t) {
  window.history.pushState(null, "", t), window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: !1 } }));
}
function qe(t) {
  return `/history?entity_id=${encodeURIComponent(t.join(","))}`;
}
function cr(t) {
  const e = t.entities?.temperatures;
  return e ? [e.oda, e.eta, e.sup, e.eha].filter(
    (r) => typeof r == "string" && r.length > 0
  ) : [];
}
async function pr(t, e) {
  const r = cr(e);
  if (r.length > 0) {
    pe(qe(r));
    return;
  }
  const a = await ht(t, e.climate_entity);
  if (a) {
    pe(`/history?device_id=${encodeURIComponent(a)}`);
    return;
  }
  pe(qe([e.climate_entity]));
}
async function ft(t, e, r, a) {
  const [i] = e.split(".");
  if (i === "climate") {
    if (r === "preset") {
      await t.callService("climate", "set_preset_mode", {
        entity_id: e,
        preset_mode: a
      });
      return;
    }
    if (r === "fan") {
      await t.callService("climate", "set_fan_mode", {
        entity_id: e,
        fan_mode: a
      });
      return;
    }
    if (r === "hvac") {
      await t.callService("climate", "set_hvac_mode", {
        entity_id: e,
        hvac_mode: a
      });
      return;
    }
  }
  await t.callService("select", "select_option", {
    entity_id: e,
    option: a
  });
}
async function ur(t, e, r, a) {
  const i = a.map((s) => ({ option: s, value: Number.parseFloat(s) })).filter((s) => Number.isFinite(s.value));
  if (i.length === 0)
    return;
  const n = Math.max(0, Math.min(100, r)), o = i.reduce((s, l) => Math.abs(l.value - n) < Math.abs(s.value - n) ? l : s);
  await ft(t, e, "fan", o.option);
}
const dr = {
  compact: !1,
  show_airflow: !0,
  show_speed: !1,
  show_temp: !0,
  show_filter_details: !0,
  fan_animation_max_rpm: 1800
}, hr = {
  oda_temperature: "history",
  eta_temperature: "history",
  sup_temperature: "history",
  eha_temperature: "history",
  supply_fan: "more-info",
  extract_fan: "more-info",
  bypass: "more-info",
  oda_damper: "more-info",
  eta_damper: "more-info",
  oda_filter: "more-info",
  eta_filter: "more-info",
  mode: "more-info"
};
function mt(t) {
  return typeof t == "string" && t.trim().length > 0;
}
function fr(t, e) {
  return t === "unit_name" || t === "custom" || t === "none" ? t : t === !1 ? "none" : e ? "custom" : "unit_name";
}
function mr(t) {
  if (!mt(t.climate_entity))
    throw new Error("Missing required configuration: climate_entity");
}
function gr(t) {
  return t === "light" || t === "dark" ? t : "auto";
}
function vr(t) {
  if (!t || t.type !== "custom:atrea-amotion-card")
    throw new Error("Card type must be custom:atrea-amotion-card");
  return mr(t), {
    ...t,
    title: t.title ?? "Atrea aMotion",
    show_title: fr(t.show_title, mt(t.title)),
    theme_variant: gr(t.theme_variant),
    entities: t.entities,
    layout: {
      ...dr,
      ...t.layout
    },
    tap_actions: {
      ...hr,
      ...t.tap_actions
    }
  };
}
function J(t) {
  return t === null || Number.isNaN(t) ? null : Math.min(100, Math.max(0, t));
}
function br(t, e = 0) {
  return t === null || Number.isNaN(t) ? "--" : t.toFixed(e);
}
function gt(t, e, r = 0) {
  if (t === null || Number.isNaN(t))
    return "--";
  const a = e ? ` ${e}` : "";
  return `${t.toFixed(r)}${a}`;
}
function Ce(t) {
  return t.replace(/[_-]+/g, " ").trim().replace(/\b\w/g, (e) => e.toUpperCase());
}
const yr = /* @__PURE__ */ new Set(["unknown", "unavailable", "none"]), me = /* @__PURE__ */ new Set(["on", "open", "opened", "true"]), vt = /* @__PURE__ */ new Set(["off", "closed", "close", "false"]), _r = /* @__PURE__ */ new Set(["on", "dirty", "problem", "warning", "warn"]), xr = /* @__PURE__ */ new Set(["fault", "critical", "replace", "alarm"]);
function f(t, e) {
  if (e)
    return t.states[e];
}
function $r(t, e) {
  return f(t, e.climate_entity);
}
function z(t) {
  return !!t && !yr.has(String(t.state).toLowerCase());
}
function v(t) {
  if (t == null || t === "")
    return null;
  const e = Number(t);
  return Number.isFinite(e) ? e : null;
}
function U(t) {
  if (typeof t == "boolean")
    return t;
  if (typeof t == "number")
    return t !== 0;
  const e = String(t ?? "").toLowerCase();
  return me.has(e);
}
function bt(t) {
  return t?.attributes ?? {};
}
function j(t) {
  if (!z(t))
    return null;
  const e = Number(t?.state);
  return Number.isFinite(e) ? e : null;
}
function ee(t, e) {
  return {
    entity: t,
    value: j(e),
    unit: typeof e?.attributes.unit_of_measurement == "string" ? String(e.attributes.unit_of_measurement) : null,
    available: z(e)
  };
}
function A(t, e, r) {
  const a = v(e);
  return {
    entity: t,
    value: a,
    unit: r,
    available: a !== null
  };
}
function Ze(t, e, r, a, i, n) {
  return {
    speedEntity: t,
    speedPercent: J(j(e)),
    airflowEntity: r,
    airflow: j(a),
    airflowUnit: typeof a?.attributes.unit_of_measurement == "string" ? String(a.attributes.unit_of_measurement) : null,
    powerEntity: i,
    power: j(n),
    powerUnit: typeof n?.attributes.unit_of_measurement == "string" ? String(n.attributes.unit_of_measurement) : null,
    available: z(e)
  };
}
function te(t, e, r, a, i, n, o, s) {
  const l = J(v(e));
  return {
    speedEntity: t,
    speedPercent: l,
    airflowEntity: r,
    airflow: v(a),
    airflowUnit: i,
    powerEntity: n,
    power: v(o),
    powerUnit: s,
    available: l !== null
  };
}
function yt(t) {
  return t === null ? "unknown" : t <= 0 ? "closed" : t >= 100 ? "open" : "partial";
}
function ye(t, e) {
  if (!t)
    return {
      entity: t,
      percentOpen: null,
      state: "unavailable",
      available: !1
    };
  if (!z(e))
    return {
      entity: t,
      percentOpen: null,
      state: "unavailable",
      available: !1
    };
  let a = J(j(e));
  if (a === null) {
    const i = String(e?.state ?? "").toLowerCase();
    me.has(i) ? a = 100 : vt.has(i) && (a = 0);
  }
  return {
    entity: t,
    percentOpen: a,
    state: yt(a),
    available: !0
  };
}
function V(t, e) {
  let a = J(v(e));
  if (a === null) {
    const i = String(e ?? "").toLowerCase();
    me.has(i) ? a = 100 : vt.has(i) && (a = 0);
  }
  return {
    entity: t,
    percentOpen: a,
    state: a === null ? "unavailable" : yt(a),
    available: a !== null
  };
}
function wr(t) {
  return t === null ? "unknown" : t <= 15 ? "critical" : t <= 30 ? "warning" : "normal";
}
function Ge(t, e, r, a, i) {
  const n = !!e || !!a, o = String(r?.state ?? "").toLowerCase(), s = J(j(i));
  let l = "unknown";
  return xr.has(o) ? l = "critical" : _r.has(o) ? l = s !== null && s <= 15 ? "critical" : "warning" : s !== null ? l = wr(s) : n && (l = "normal"), {
    statusEntity: e,
    lifeEntity: a,
    severity: l,
    lifePercent: s,
    label: t,
    available: n
  };
}
function re(t, e, r) {
  const a = v(r);
  let i = "unknown";
  return a !== null && (a < 15 ? i = "critical" : a <= 30 ? i = "warning" : i = "normal"), {
    statusEntity: void 0,
    lifeEntity: e,
    severity: i,
    lifePercent: a,
    label: t,
    available: a !== null
  };
}
function Ar(t, e, r, a) {
  const i = a ?? e, n = Array.isArray(i?.attributes.options) ? i?.attributes.options.filter((s) => typeof s == "string") : [];
  return {
    climateEntity: void 0,
    currentLabel: z(e) ? Ce(e?.state ?? "") : z(a) ? Ce(a?.state ?? "") : null,
    hvac: { current: null, options: [], controllable: !1 },
    preset: { current: null, options: [], controllable: !1 },
    fan: { current: null, options: [], controllable: !1 },
    fallbackEntity: r,
    fallbackOptions: n,
    fallbackControllable: !!r && n.length > 0
  };
}
function Cr(t, e, r) {
  const a = bt(e), i = Array.isArray(a.preset_modes) ? a.preset_modes.map((d) => String(d)) : [], n = Array.isArray(a.fan_modes) ? a.fan_modes.map((d) => String(d)) : [], o = Array.isArray(a.hvac_modes) ? a.hvac_modes.map((d) => String(d)) : [], s = typeof e?.attributes.preset_mode == "string" ? e.attributes.preset_mode : typeof a.preset_mode == "string" ? a.preset_mode : null, l = e?.attributes.fan_mode !== void 0 ? String(e.attributes.fan_mode) : a.fan_mode !== void 0 ? String(a.fan_mode) : e?.attributes.fan_power_req_sup !== void 0 ? String(e.attributes.fan_power_req_sup) : null, c = typeof e?.state == "string" ? e.state : null, h = s !== null ? s : typeof r == "string" ? r : l !== null ? l : c !== null ? c : null;
  return {
    climateEntity: t,
    currentLabel: h ? Ce(h) : null,
    hvac: {
      current: c,
      options: c && !o.includes(c) ? [c, ...o] : o,
      controllable: o.length > 0
    },
    preset: {
      current: s,
      options: s && !i.includes(s) ? [s, ...i] : i,
      controllable: i.length > 0
    },
    fan: {
      current: l,
      options: l && !n.includes(l) ? [l, ...n] : n,
      controllable: n.length > 0
    },
    fallbackEntity: void 0,
    fallbackOptions: [],
    fallbackControllable: !1
  };
}
function Ke(t) {
  return z(t) ? me.has(String(t?.state ?? "").toLowerCase()) : !1;
}
function Ye(t, e) {
  const r = ["message", "description", "details", "detail", "reason"], a = t === "Fault" ? "The unit reports an active fault. Open more info or inspect the configured alert entity for the exact cause." : "The unit reports an active warning. Open more info or inspect the configured alert entity for the exact cause.";
  if (!e)
    return a;
  for (const o of r) {
    const s = e.attributes?.[o];
    if (typeof s == "string" && s.trim().length > 0)
      return s.trim();
  }
  const i = typeof e.attributes?.friendly_name == "string" && e.attributes.friendly_name.trim().length > 0 ? e.attributes.friendly_name.trim() : e.entity_id, n = String(e.state ?? "").trim().toLowerCase();
  return n && !["on", "off", "true", "false", "unknown", "unavailable"].includes(n) ? `${i}: ${e.state}` : `${i} is active.`;
}
function kr(t, e) {
  const r = Ke(t), a = Ke(e), i = [], n = [], o = [];
  if (r) {
    i.push("Warning");
    const s = Ye("Warning", t);
    n.push(s), o.push({
      id: t?.entity_id ?? null,
      code: null,
      purpose: "warning",
      severity: null,
      kind: "warning",
      prefix: "S",
      translationKey: null,
      message: s,
      messageCode: "S",
      fullMessage: s,
      active: !0
    });
  }
  if (a) {
    i.push("Fault");
    const s = Ye("Fault", e);
    n.push(s), o.push({
      id: e?.entity_id ?? null,
      code: null,
      purpose: "alarm",
      severity: null,
      kind: "fault",
      prefix: "E",
      translationKey: null,
      message: s,
      messageCode: "E",
      fullMessage: s,
      active: !0
    });
  }
  return {
    warning: r,
    fault: a,
    warningCount: r ? 1 : 0,
    faultCount: a ? 1 : 0,
    highestSeverity: a ? 5 : r ? 3 : null,
    primaryMessage: o[0]?.fullMessage ?? null,
    labels: i,
    details: n,
    notifications: o
  };
}
function Mr(t) {
  if (!t || typeof t != "object")
    return null;
  const e = t, r = e.kind === "fault" ? "fault" : "warning", a = typeof e.message == "string" && e.message.trim().length > 0 ? e.message.trim() : typeof e.full_message == "string" && e.full_message.trim().length > 0 ? e.full_message.trim() : typeof e.code == "string" && e.code.trim().length > 0 ? e.code.trim() : "Unknown alert", i = typeof e.message_code == "string" && e.message_code.trim().length > 0 ? e.message_code.trim() : r === "fault" ? "E" : "S", n = typeof e.full_message == "string" && e.full_message.trim().length > 0 ? e.full_message.trim() : i && a ? `${i} - ${a}` : a;
  return {
    id: typeof e.id == "number" || typeof e.id == "string" ? e.id : null,
    code: typeof e.code == "string" ? e.code : null,
    purpose: typeof e.purpose == "string" ? e.purpose : null,
    severity: typeof e.severity == "number" ? e.severity : null,
    kind: r,
    prefix: typeof e.prefix == "string" && e.prefix ? e.prefix : r === "fault" ? "E" : "S",
    translationKey: typeof e.translation_key == "string" ? e.translation_key : null,
    message: a,
    messageCode: i,
    fullMessage: n,
    active: e.active !== !1
  };
}
function Pr(t) {
  if (!Array.isArray(t.notifications))
    return null;
  const e = t.notifications.map((o) => Mr(o)).filter((o) => !!o && o.active);
  if (e.length === 0)
    return {
      warning: U(t.warning ?? t.has_warning),
      fault: U(t.fault ?? t.has_fault),
      warningCount: v(t.warning_count) ?? 0,
      faultCount: v(t.fault_count) ?? 0,
      highestSeverity: v(t.highest_severity),
      primaryMessage: typeof t.primary_message == "string" ? t.primary_message : null,
      labels: [],
      details: [],
      notifications: []
    };
  const r = v(t.warning_count) ?? e.filter((o) => o.kind === "warning").length, a = v(t.fault_count) ?? e.filter((o) => o.kind === "fault").length, i = v(t.highest_severity) ?? e.reduce((o, s) => s.severity === null ? o : o === null ? s.severity : Math.max(o, s.severity), null), n = typeof t.primary_message == "string" && t.primary_message || e[0]?.fullMessage || null;
  return {
    warning: U(t.has_warning ?? t.warning ?? r > 0),
    fault: U(t.has_fault ?? t.fault ?? a > 0),
    warningCount: r,
    faultCount: a,
    highestSeverity: i,
    primaryMessage: n,
    labels: e.map((o) => o.kind === "fault" ? "Fault" : "Warning"),
    details: e.map((o) => o.fullMessage),
    notifications: e
  };
}
function Er(t) {
  const e = [
    t.temperatures.oda.available,
    t.temperatures.eta.available,
    t.temperatures.sup.available,
    t.temperatures.eha.available,
    t.fans.supply.available,
    t.fans.extract.available,
    t.dampers.bypass.available
  ], r = e.filter(Boolean).length;
  return r === e.length ? "full" : r >= 4 ? "partial" : "minimal";
}
function Sr(t, e) {
  const r = e.entities, a = $r(t, e), i = bt(a), n = typeof i.temperature_unit == "string" ? i.temperature_unit : "°C", o = typeof i.airflow_unit == "string" ? i.airflow_unit : null, s = typeof i.power_unit == "string" ? i.power_unit : null, l = f(t, r?.temperatures?.oda), c = f(t, r?.temperatures?.eta), h = f(t, r?.temperatures?.sup), d = f(t, r?.temperatures?.eha), b = f(t, r?.fans?.supply_speed), x = f(t, r?.fans?.extract_speed), H = f(t, r?.fans?.supply_airflow), wt = f(t, r?.fans?.extract_airflow), At = f(t, r?.fans?.supply_power), Ct = f(t, r?.fans?.extract_power), kt = f(t, r?.dampers?.bypass), Mt = f(t, r?.dampers?.oda), Pt = f(t, r?.dampers?.eta), Et = f(t, r?.filters?.oda), St = f(t, r?.filters?.eta), Tt = f(t, r?.filters?.oda_life), Lt = f(t, r?.filters?.eta_life), Ot = f(t, r?.mode?.current), zt = f(t, r?.mode?.select), Ft = f(t, r?.alerts?.warning), Ht = f(t, r?.alerts?.fault), ze = {
    temperatures: {
      oda: A(r?.temperatures?.oda ?? e.climate_entity, i.outside_air_temperature, n).available ? A(r?.temperatures?.oda ?? e.climate_entity, i.outside_air_temperature, n) : ee(r?.temperatures?.oda, l),
      eta: A(r?.temperatures?.eta ?? e.climate_entity, i.extract_air_temperature, n).available ? A(r?.temperatures?.eta ?? e.climate_entity, i.extract_air_temperature, n) : ee(r?.temperatures?.eta, c),
      sup: A(r?.temperatures?.sup ?? e.climate_entity, i.supply_air_temperature, n).available ? A(r?.temperatures?.sup ?? e.climate_entity, i.supply_air_temperature, n) : ee(r?.temperatures?.sup, h),
      eha: A(r?.temperatures?.eha ?? e.climate_entity, i.exhaust_air_temperature, n).available ? A(r?.temperatures?.eha ?? e.climate_entity, i.exhaust_air_temperature, n) : ee(r?.temperatures?.eha, d)
    },
    fans: {
      supply: te(r?.fans?.supply_speed ?? e.climate_entity, i.supply_fan_speed_percent, r?.fans?.supply_airflow, i.supply_airflow, o, r?.fans?.supply_power, i.supply_power, s).available ? te(r?.fans?.supply_speed ?? e.climate_entity, i.supply_fan_speed_percent, r?.fans?.supply_airflow, i.supply_airflow, o, r?.fans?.supply_power, i.supply_power, s) : Ze(r?.fans?.supply_speed, b, r?.fans?.supply_airflow, H, r?.fans?.supply_power, At),
      extract: te(r?.fans?.extract_speed ?? e.climate_entity, i.extract_fan_speed_percent, r?.fans?.extract_airflow, i.extract_airflow, o, r?.fans?.extract_power, i.extract_power, s).available ? te(r?.fans?.extract_speed ?? e.climate_entity, i.extract_fan_speed_percent, r?.fans?.extract_airflow, i.extract_airflow, o, r?.fans?.extract_power, i.extract_power, s) : Ze(r?.fans?.extract_speed, x, r?.fans?.extract_airflow, wt, r?.fans?.extract_power, Ct)
    },
    dampers: {
      bypass: V(r?.dampers?.bypass ?? e.climate_entity, i.bypass_position_percent).available ? V(r?.dampers?.bypass ?? e.climate_entity, i.bypass_position_percent) : ye(r?.dampers?.bypass, kt),
      oda: V(r?.dampers?.oda ?? e.climate_entity, i.oda_damper_percent).available ? V(r?.dampers?.oda ?? e.climate_entity, i.oda_damper_percent) : ye(r?.dampers?.oda, Mt),
      eta: V(r?.dampers?.eta ?? e.climate_entity, i.eta_damper_percent).available ? V(r?.dampers?.eta ?? e.climate_entity, i.eta_damper_percent) : ye(r?.dampers?.eta, Pt)
    },
    filters: {
      oda: re("ODA filter", r?.filters?.oda_life ?? e.climate_entity, i.filter_days_remaining).available ? re("ODA filter", r?.filters?.oda_life ?? e.climate_entity, i.filter_days_remaining) : Ge("ODA filter", r?.filters?.oda, Et, r?.filters?.oda_life, Tt),
      eta: re("ETA filter", r?.filters?.eta_life ?? e.climate_entity, i.filter_days_remaining).available ? re("ETA filter", r?.filters?.eta_life ?? e.climate_entity, i.filter_days_remaining) : Ge("ETA filter", r?.filters?.eta, St, r?.filters?.eta_life, Lt)
    },
    mode: (() => {
      const m = Cr(e.climate_entity, a, i.current_mode);
      return m.hvac.controllable || m.preset.controllable || m.fan.controllable || m.currentLabel ? m : Ar(r?.mode?.current, Ot, r?.mode?.select, zt);
    })(),
    alerts: Pr(i) ?? (i.warning !== void 0 || i.fault !== void 0 ? (() => {
      const m = U(i.warning), E = U(i.fault), X = "The unit reports an active warning. Open more info or inspect the configured alert entity for the exact cause.", Q = "The unit reports an active fault. Open more info or inspect the configured alert entity for the exact cause.", ge = [];
      return m && ge.push({
        id: null,
        code: null,
        purpose: "warning",
        severity: 3,
        kind: "warning",
        prefix: "S",
        translationKey: null,
        message: X,
        messageCode: "S",
        fullMessage: X,
        active: !0
      }), E && ge.push({
        id: null,
        code: null,
        purpose: "alarm",
        severity: 5,
        kind: "fault",
        prefix: "E",
        translationKey: null,
        message: Q,
        messageCode: "E",
        fullMessage: Q,
        active: !0
      }), {
        warning: m,
        fault: E,
        warningCount: m ? 1 : 0,
        faultCount: E ? 1 : 0,
        highestSeverity: E ? 5 : m ? 3 : null,
        primaryMessage: E ? Q : m ? X : null,
        labels: [m ? "Warning" : null, E ? "Fault" : null].filter((ve) => !!ve),
        details: [m ? X : null, E ? Q : null].filter((ve) => !!ve),
        notifications: ge
      };
    })() : kr(Ft, Ht))
  };
  return {
    ...ze,
    availability: Er(ze)
  };
}
var Tr = "M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z", Lr = "M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z", _t = "M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z", Oe = "M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z", Or = "M12.5 2C8.93 2 8.14 5.96 10.13 9.65C9.72 9.97 9.4 10.39 9.21 10.87C8.28 10.68 7.23 10.25 6.73 9.26C5.56 6.89 2 7 2 11.5C2 15.07 5.95 15.85 9.64 13.87C9.96 14.27 10.39 14.59 10.88 14.79C10.68 15.71 10.24 16.75 9.26 17.24C6.9 18.42 7 22 11.5 22C12.31 22 13 21.78 13.5 21.41C13.19 20.67 13 19.86 13 19C13 17.59 13.5 16.3 14.3 15.28C14.17 14.97 14.03 14.65 13.86 14.34C14.26 14 14.57 13.59 14.77 13.11C15.26 13.21 15.78 13.39 16.25 13.67C17.07 13.25 18 13 19 13C20.05 13 21.03 13.27 21.89 13.74C21.95 13.37 22 12.96 22 12.5C22 8.92 18.03 8.13 14.33 10.13C14 9.73 13.59 9.42 13.11 9.22C13.3 8.29 13.74 7.24 14.73 6.75C17.09 5.57 17 2 12.5 2M12 11C12.54 11 13 11.45 13 12C13 12.55 12.54 13 12 13C11.43 13 11 12.55 11 12C11 11.45 11.43 11 12 11M18 15C16.89 15 16 15.9 16 17V23H18V21H20V23H22V17C22 15.9 21.1 15 20 15M18 17H20V19H18Z", zr = "M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13", Fr = "M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z";
function Hr(t) {
  if (typeof t?.attributes.unit_name == "string" && t.attributes.unit_name.trim())
    return t.attributes.unit_name;
  if (typeof t?.attributes.friendly_name == "string" && t.attributes.friendly_name.trim())
    return t.attributes.friendly_name;
}
function xt(t, e) {
  const r = Hr(e);
  return t.show_title === "none" ? null : t.show_title === "custom" && typeof t.title == "string" && t.title.trim() ? t.title : r ?? "Ventilation unit";
}
var Vr = Object.defineProperty, Nr = Object.getOwnPropertyDescriptor, F = (t, e, r, a) => {
  for (var i = a > 1 ? void 0 : a ? Nr(e, r) : e, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (i = (a ? o(e, r, i) : o(i)) || i);
  return a && i && Vr(e, r, i), i;
};
const Ir = 1, Ur = 2, Je = 4, jr = 8, Rr = 16, Dr = "unavailable", Br = {
  current_humidity: "Current humidity",
  current_temperature: "Current temperature",
  fan_mode: "Fan mode",
  preset_mode: "Mode",
  swing_horizontal_mode: "Horizontal swing mode",
  swing_mode: "Swing mode"
};
function Wr(t) {
  return t.replace(/_/g, " ").split(" ").filter(Boolean).map((e) => e.charAt(0).toUpperCase() + e.slice(1)).join(" ");
}
function Xe(t) {
  return Array.isArray(t) ? t.map((e) => String(e)) : [];
}
function N(t, e) {
  return ((typeof t.attributes.supported_features == "number" ? t.attributes.supported_features : 0) & e) !== 0;
}
function _e(t) {
  return String(t.state).toLowerCase() === Dr;
}
function ae(t) {
  return t != null && t !== "";
}
function xe(t, e, r) {
  return t.formatEntityAttributeName?.(e, r) ?? Br[r] ?? Wr(r);
}
function qr(t, e) {
  const r = Number(t);
  if (Number.isFinite(r)) {
    const a = typeof e == "string" && e ? ` ${e}` : "";
    return `${r.toFixed(1)}${a}`;
  }
  return String(t);
}
function ie(t, e, r, a = e.attributes[r]) {
  const i = t.formatEntityAttributeValue?.(e, r, a);
  if (i)
    return i;
  if (r === "current_temperature" || r === "temperature")
    return qr(a, e.attributes.temperature_unit);
  if (r === "current_humidity" || r === "humidity") {
    const n = Number(a);
    return Number.isFinite(n) ? `${n.toFixed(0)} %` : String(a);
  }
  return String(a);
}
let M = class extends L {
  constructor() {
    super(...arguments), this._mainControl = "temperature", this._panel = "main", this._relatedLoading = !1, this._handleRelatedRequested = (t) => {
      !this.stateObj || t.detail.entityId !== this.stateObj.entity_id || this._showRelatedPanel();
    }, this._showMainPanel = () => {
      this._panel = "main";
    }, this._handleFanModeChanged = (t) => {
      const e = t.detail.item?.value;
      !e || !this.stateObj || this._callServiceHelper(this.stateObj.attributes.fan_mode, e, "set_fan_mode", {
        fan_mode: e
      });
    }, this._handlePresetModeChanged = (t) => {
      const e = t.detail.item?.value;
      !e || !this.stateObj || this._callServiceHelper(this.stateObj.attributes.preset_mode, e, "set_preset_mode", {
        preset_mode: e
      });
    };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("atrea-more-info-related", this._handleRelatedRequested);
  }
  disconnectedCallback() {
    window.removeEventListener("atrea-more-info-related", this._handleRelatedRequested), super.disconnectedCallback();
  }
  willUpdate(t) {
    t.has("stateObj") && this.stateObj && this._mainControl === "humidity" && !N(this.stateObj, Je) && (this._mainControl = "temperature"), t.has("stateObj") && (this._panel = "main", this._relatedInfo = void 0, this._relatedLoading = !1);
  }
  render() {
    return this.stateObj ? this._panel === "related" ? this._renderRelated() : this._renderMain() : u;
  }
  _renderMain() {
    if (!this.stateObj)
      return u;
    const t = this.stateObj, e = t.attributes, r = N(t, Je) && ae(e.humidity), a = N(t, Ir) || N(t, Ur) || ae(e.temperature), i = Xe(e.preset_modes), n = Xe(e.fan_modes), o = e.current_temperature, s = e.current_humidity ?? e.humidity;
    return p`
      <div class="current">
        ${ae(o) ? p`
              <div>
                <p class="label">${xe(this.hass, t, "current_temperature")}</p>
                <p class="value">${ie(this.hass, t, "current_temperature", o)}</p>
              </div>
            ` : u}
        ${ae(s) ? p`
              <div>
                <p class="label">${xe(this.hass, t, "current_humidity")}</p>
                <p class="value">${ie(this.hass, t, "current_humidity", s)}</p>
              </div>
            ` : u}
      </div>

      <div class="thermostat-block">
        <div class="controls">
          ${a && this._mainControl === "temperature" ? p`
                <ha-state-control-climate-temperature
                  .hass=${this.hass}
                  .stateObj=${t}
                ></ha-state-control-climate-temperature>
              ` : u}
          ${r && this._mainControl === "humidity" ? p`
                <ha-state-control-climate-humidity
                  .hass=${this.hass}
                  .stateObj=${t}
                ></ha-state-control-climate-humidity>
              ` : u}
          ${r && a ? p`
                <ha-icon-button-group>
                  <ha-icon-button-toggle
                    .selected=${this._mainControl === "temperature"}
                    .disabled=${_e(t)}
                    .label=${this.hass.localize?.("ui.dialogs.more_info_control.climate.temperature") ?? "Temperature"}
                    .control=${"temperature"}
                    @click=${this._setMainControl}
                  >
                    T
                  </ha-icon-button-toggle>
                  <ha-icon-button-toggle
                    .selected=${this._mainControl === "humidity"}
                    .disabled=${_e(t)}
                    .label=${this.hass.localize?.("ui.dialogs.more_info_control.climate.humidity") ?? "Humidity"}
                    .control=${"humidity"}
                    @click=${this._setMainControl}
                  >
                    H
                  </ha-icon-button-toggle>
                </ha-icon-button-group>
              ` : u}
        </div>

        <div class="selects">
        ${(N(t, Rr) || i.length > 0) && i.length > 0 ? this._renderTile(
      this.hass.localize?.("ui.card.climate.mode") ?? "Mode",
      typeof e.preset_mode == "string" ? e.preset_mode : "",
      i,
      this._handlePresetModeChanged,
      (l) => ie(this.hass, t, "preset_mode", l)
    ) : u}
        ${(N(t, jr) || n.length > 0) && n.length > 0 ? this._renderTile(
      xe(this.hass, t, "fan_mode"),
      e.fan_mode !== void 0 ? String(e.fan_mode) : "",
      n,
      this._handleFanModeChanged,
      (l) => ie(this.hass, t, "fan_mode", l)
    ) : u}
        </div>
      </div>
    `;
  }
  _renderRelated() {
    const t = this._relatedInfo, e = t?.integrations.length ? t.integrations.join(", ") : null;
    return p`
      <div class="related-view">
        <div class="related-header">
          <ha-icon-button
            class="related-back"
            .label=${"Back"}
            title="Back"
            aria-label="Back"
            @click=${this._showMainPanel}
          >
            <ha-svg-icon .path=${Lr}></ha-svg-icon>
          </ha-icon-button>
          <div class="related-title">Related</div>
        </div>

        ${this._relatedLoading ? p`<div class="related-empty">Loading related items...</div>` : p`
              <div class="related-list">
                ${t?.deviceName ? p`
                      <div class="related-item">
                        <div class="related-label">Device</div>
                        <div class="related-value">${t.deviceName}</div>
                      </div>
                    ` : u}
                ${e ? p`
                      <div class="related-item">
                        <div class="related-label">Integration</div>
                        <div class="related-value">${e}</div>
                      </div>
                    ` : u}
                ${t?.areaName ? p`
                      <div class="related-item">
                        <div class="related-label">Area</div>
                        <div class="related-value">${t.areaName}</div>
                      </div>
                    ` : u}
                ${!t?.deviceName && !e && !t?.areaName ? p`<div class="related-empty">No related device, integration, or area found.</div>` : u}
              </div>
            `}
      </div>
    `;
  }
  _renderTile(t, e, r, a, i) {
    return p`
      <div class="select-tile">
        <ha-control-select-menu
          .hass=${this.hass}
          .label=${t}
          .value=${e}
          .disabled=${!this.stateObj || _e(this.stateObj)}
          .options=${r.map((n) => ({
      value: n,
      label: i(n)
    }))}
          @wa-select=${a}
        ></ha-control-select-menu>
      </div>
    `;
  }
  _setMainControl(t) {
    t.stopPropagation();
    const e = t.currentTarget.control;
    e && (this._mainControl = e);
  }
  async _showRelatedPanel() {
    if (this._panel = "related", !(this._relatedInfo || !this.hass.callWS || !this.stateObj)) {
      this._relatedLoading = !0;
      try {
        const t = await this.hass.callWS({
          type: "config/entity_registry/get",
          entity_id: this.stateObj.entity_id
        }), [e, r, a] = await Promise.all([
          this.hass.callWS({ type: "config/device_registry/list" }),
          this.hass.callWS({ type: "config/area_registry/list" }),
          this.hass.callWS({ type: "config/config_entries/index" })
        ]), i = t?.device_id ? e.find((c) => c.id === t.device_id) ?? null : null, n = t?.area_id ?? i?.area_id ?? null, o = n ? r.find((c) => c.area_id === n)?.name ?? null : null, s = [
          ...t?.config_entry_id ? [t.config_entry_id] : [],
          ...i?.config_entries ?? []
        ], l = Array.from(
          new Set(
            s.map((c) => a.find((h) => h.entry_id === c)).filter((c) => !!c).map((c) => c.title || c.domain || c.entry_id)
          )
        );
        this._relatedInfo = {
          deviceName: i?.name_by_user || i?.name || null,
          integrations: l,
          areaName: o
        };
      } catch {
        this._relatedInfo = {
          deviceName: null,
          integrations: [],
          areaName: null
        };
      } finally {
        this._relatedLoading = !1;
      }
    }
  }
  async _callServiceHelper(t, e, r, a) {
    if (!this.stateObj || t === e)
      return;
    a.entity_id = this.stateObj.entity_id;
    const i = this.stateObj;
    await this.hass.callService("climate", r, a), await new Promise((n) => {
      window.setTimeout(n, 2e3);
    }), this.stateObj === i && (this.stateObj = void 0, await this.updateComplete, this.stateObj === void 0 && (this.stateObj = i));
  }
  static get styles() {
    return nt`
      :host {
        color: var(--primary-text-color);
        display: block;
      }

      .current {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        text-align: center;
        margin-bottom: var(--ha-space-10, 10px);
        max-width: 420px;
        margin-inline: auto;
      }

      .current div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        flex: 1;
      }

      .current p {
        margin: 0;
        text-align: center;
        color: var(--primary-text-color);
      }

      .current .label {
        opacity: 0.8;
        font-size: var(--ha-font-size-m, 1rem);
        line-height: var(--ha-line-height-condensed, 1.2);
        letter-spacing: 0.4px;
        margin-bottom: var(--ha-space-1, 2px);
      }

      .current .value {
        font-size: var(--ha-font-size-xl, 1.5rem);
        font-weight: var(--ha-font-weight-medium, 500);
        line-height: var(--ha-line-height-condensed, 1.2);
        direction: ltr;
      }

      .thermostat-block {
        display: grid;
        justify-items: center;
        align-content: start;
        gap: var(--ha-space-3, 12px);
        width: 100%;
        max-width: 420px;
        margin: 0 auto;
      }

      .controls {
        display: grid;
        gap: var(--ha-space-2, 8px);
        width: 100%;
        justify-items: center;
      }

      .selects {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 180px));
        gap: var(--ha-space-2, 8px);
        justify-content: center;
        width: 100%;
      }

      .select-tile {
        width: 100%;
        max-width: 180px;
        border-radius: 18px;
        padding: 2px;
        background: color-mix(in srgb, var(--card-background-color, #fff) 90%, var(--primary-text-color) 10%);
      }

      .select-tile ha-control-select-menu {
        width: 100%;
      }

      .related-view {
        display: grid;
        gap: var(--ha-space-3, 12px);
        width: 100%;
        max-width: 420px;
        margin: 0 auto;
      }

      .related-header {
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: center;
        gap: var(--ha-space-2, 8px);
      }

      .related-title {
        font-size: var(--ha-font-size-xl, 1.5rem);
        font-weight: var(--ha-font-weight-medium, 500);
        line-height: 1.2;
      }

      .related-list {
        display: grid;
        gap: var(--ha-space-2, 8px);
      }

      .related-item {
        display: grid;
        gap: 4px;
        padding: 14px 16px;
        border-radius: 18px;
        background: color-mix(in srgb, var(--card-background-color, #fff) 92%, var(--primary-text-color) 8%);
      }

      .related-label {
        color: var(--secondary-text-color);
        font-size: var(--ha-font-size-s, 0.875rem);
        line-height: 1.2;
      }

      .related-value {
        color: var(--primary-text-color);
        font-size: var(--ha-font-size-m, 1rem);
        line-height: 1.35;
        word-break: break-word;
      }

      .related-empty {
        color: var(--secondary-text-color);
        font-size: var(--ha-font-size-m, 1rem);
        line-height: 1.4;
        padding: 10px 2px 0;
      }

      @media (max-width: 520px) {
        .selects {
          grid-template-columns: minmax(0, 180px);
        }
      }
    `;
  }
};
F([
  Y({ attribute: !1 })
], M.prototype, "hass", 2);
F([
  Y({ attribute: !1 })
], M.prototype, "stateObj", 2);
F([
  w()
], M.prototype, "_mainControl", 2);
F([
  w()
], M.prototype, "_panel", 2);
F([
  w()
], M.prototype, "_relatedInfo", 2);
F([
  w()
], M.prototype, "_relatedLoading", 2);
M = F([
  Le("atrea-more-info-climate")
], M);
const Zr = "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z", Gr = "M9 17H7V10H9V17M13 17H11V7H13V17M17 17H15V13H17V17M19 19H5V5H19V19.1M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z", Kr = "M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z", Yr = "M3 6H21V4H3C1.9 4 1 4.9 1 6V18C1 19.1 1.9 20 3 20H7V18H3V6M13 12H9V13.78C8.39 14.33 8 15.11 8 16C8 16.89 8.39 17.67 9 18.22V20H13V18.22C13.61 17.67 14 16.88 14 16S13.61 14.33 13 13.78V12M11 17.5C10.17 17.5 9.5 16.83 9.5 16S10.17 14.5 11 14.5 12.5 15.17 12.5 16 11.83 17.5 11 17.5M22 8H16C15.5 8 15 8.5 15 9V19C15 19.5 15.5 20 16 20H22C22.5 20 23 19.5 23 19V9C23 8.5 22.5 8 22 8M21 18H17V10H21V18Z", Jr = "M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z", Xr = "M3,4H7V8H3V4M9,5V7H21V5H9M3,10H7V14H3V10M9,11V13H21V11H9M3,16H7V20H3V16M9,17V19H21V17H9";
function Qr(t, e, r) {
  const a = t.states[e.climate_entity], i = xt(e, a), n = (c) => {
    r(), window.requestAnimationFrame(() => {
      dt(t, e.climate_entity, c);
    });
  }, o = async () => {
    r(), window.requestAnimationFrame(() => {
      pr(t, e);
    });
  }, s = () => {
    window.dispatchEvent(
      new CustomEvent("atrea-more-info-related", {
        detail: { entityId: e.climate_entity }
      })
    );
  }, l = async () => {
    const c = await ht(t, e.climate_entity);
    if (!c) {
      n("info");
      return;
    }
    r(), window.requestAnimationFrame(() => {
      pe(`/config/devices/device/${encodeURIComponent(c)}`);
    });
  };
  return p`
    <ha-dialog open @closed=${r} .heading=${!1}>
      <ha-icon-button
        slot="headerNavigationIcon"
        class="more-info-close"
        @click=${r}
        .label=${"Close dialog"}
        title="Close dialog"
        aria-label="Close dialog"
      >
        <ha-svg-icon .path=${Zr}></ha-svg-icon>
      </ha-icon-button>
      ${i ? p`<div slot="headerTitle" class="more-info-dialog-title">${i}</div>` : u}
      <div slot="headerActionItems" class="more-info-header-actions">
        <ha-icon-button
          class="more-info-header-action"
          .label=${"History"}
          title="History"
          aria-label="History"
          @click=${o}
        >
          <ha-svg-icon .path=${Gr}></ha-svg-icon>
        </ha-icon-button>
        <ha-icon-button
          class="more-info-header-action"
          .label=${"Settings"}
          title="Settings"
          aria-label="Settings"
          @click=${() => n("settings")}
        >
          <ha-svg-icon .path=${Kr}></ha-svg-icon>
        </ha-icon-button>
        <ha-dropdown
          class="more-info-header-dropdown"
          placement="bottom-end"
          distance="4"
        >
          <ha-icon-button
            slot="trigger"
            class="more-info-header-action"
            .label=${"More actions"}
            title="More actions"
            aria-label="More actions"
          >
            <ha-svg-icon .path=${_t}></ha-svg-icon>
          </ha-icon-button>
          <ha-dropdown-item class="more-info-dropdown-item" @click=${l}>
            <ha-svg-icon slot="icon" .path=${Yr}></ha-svg-icon>
            Device info
          </ha-dropdown-item>
          <ha-dropdown-item class="more-info-dropdown-item" @click=${s}>
            <ha-svg-icon slot="icon" .path=${Jr}></ha-svg-icon>
            Related
          </ha-dropdown-item>
          <ha-dropdown-item class="more-info-dropdown-item" @click=${() => n("info")}>
            <ha-svg-icon slot="icon" .path=${Xr}></ha-svg-icon>
            Details
          </ha-dropdown-item>
        </ha-dropdown>
      </div>
      ${a ? p`
            <atrea-more-info-climate .hass=${t} .stateObj=${a}></atrea-more-info-climate>
          ` : u}
    </ha-dialog>
  `;
}
function ea(t) {
  if (t === null || t <= 0)
    return "0s";
  const r = 2.8 - Math.min(100, Math.max(0, t)) * 0.022;
  return `${Math.max(0.5, r).toFixed(2)}s`;
}
function $e(t) {
  if (t === null || t <= 0)
    return "0s";
  const r = 4.2 - Math.min(100, Math.max(0, t)) * 0.03;
  return `${Math.max(0.9, r).toFixed(2)}s`;
}
const ta = "0 0 1000 620", $ = {
  supplyMain: "M 40 410 h 268 l 64 -64 m 257 -92 64 -64 h 267",
  extractMain: "M 40 190 h 267 l 90 90 L 563 280 693 410 h 267",
  unitOutline: "M 165.5 510 V 90 h 670 v 420 h -670",
  bypassInner: "M 372 346 l 26 -26 165 0 65 -65",
  exchangerOutline: "M 418 208 l -92 92 92 92 h 165 l 92 -92 -92 -92 z",
  filterLeft: "M 413 397 403 407 311 315 l 10 -10 z",
  filterRight: "M 588 397 598 407 690 315 680 305 Z"
}, ne = {
  supply: { x: 745, y: 190 },
  extract: { x: 255, y: 190 }
}, C = {
  eha: { x: 105, y: 135 },
  oda: { x: 105, y: 485 },
  sup: { x: 895, y: 135 },
  eta: { x: 895, y: 485 }
}, oe = {
  oda: { x: 95, y: 410 },
  eta: { x: 905, y: 410 }
};
function $t(t, e) {
  return ["badge", t ? "" : "is-muted", e ?? ""].filter(Boolean).join(" ");
}
function se(t, e, r, a, i) {
  return y`
    <g class=${$t(e.available, "temp-badge")} transform="translate(${r}, ${a})" @click=${i}>
      <rect x="-56" y="-24" width="112" height="48" rx="14"></rect>
      <text x="0" y="5" class="badge-value temperature-only">${gt(e.value, e.unit, 1)}</text>
    </g>
  `;
}
function Qe(t, e, r, a) {
  return y`
    <g class=${$t(t.available, "metric-badge fan-speed-badge")} transform="translate(${e}, ${r})" @click=${a}>
      <rect x="-45" y="-18" width="90" height="36" rx="9"></rect>
      <text x="0" y="4" class="badge-value temperature-only">${gt(t.speedPercent, "%", 0)}</text>
    </g>
  `;
}
function et(t, e, r, a, i) {
  const n = ea(e.speedPercent);
  return y`
    <g class="fan-group" transform="translate(${r}, ${a})" @click=${i}>
      <circle class="fan-shell" r="44"></circle>
      <g class="fan-rotor">
        <path d="M 0 -32 C 18 -32 27 -13 11 -4 C 7 0 0 -4 0 -10 Z"></path>
        <path d="M 32 0 C 32 18 13 27 4 11 C 0 7 4 0 10 0 Z"></path>
        <path d="M 0 32 C -18 32 -27 13 -11 4 C -7 0 0 4 0 10 Z"></path>
        <path d="M -32 0 C -32 -18 -13 -27 -4 -11 C 0 -7 -4 0 -10 0 Z"></path>
        ${e.speedPercent && e.speedPercent > 0 ? y`<animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur=${n} repeatCount="indefinite"></animateTransform>` : u}
      </g>
      <circle class="fan-core" r="9"></circle>
    </g>
  `;
}
function ra(t) {
  return (t.percentOpen ?? 0) / 100 * 90;
}
function tt(t, e, r, a, i, n) {
  const s = 90 - ra(e);
  return y`
    <g class=${["damper", e.available ? "" : "is-muted"].filter(Boolean).join(" ")} transform="translate(${r}, ${a})" @click=${n}>
      <circle r="20" class="damper-ring"></circle>
      <g transform=${`rotate(${-s})`}>
        <rect x="-18" y="-2.5" width="36" height="5" rx="2.5" class="damper-blade"></rect>
      </g>
    </g>
  `;
}
function we(t, e, r) {
  return Math.round(t + (e - t) * r);
}
function rt(t) {
  const e = t.replace("#", "");
  return [
    Number.parseInt(e.slice(0, 2), 16),
    Number.parseInt(e.slice(2, 4), 16),
    Number.parseInt(e.slice(4, 6), 16)
  ];
}
function aa(t, e) {
  const r = Math.max(t[0].at, Math.min(t[t.length - 1].at, e));
  for (let a = 0; a < t.length - 1; a += 1) {
    const i = t[a], n = t[a + 1];
    if (r >= i.at && r <= n.at) {
      const o = (r - i.at) / (n.at - i.at || 1), s = rt(i.color), l = rt(n.color);
      return `rgb(${we(s[0], l[0], o)} ${we(s[1], l[1], o)} ${we(s[2], l[2], o)})`;
    }
  }
  return t[t.length - 1].color;
}
function ia(t) {
  if (t.lifePercent === null)
    return {
      color: "rgb(139 160 181)",
      opacity: t.available ? 0.72 : 0.35,
      text: t.available ? "service" : "N/C",
      critical: !1
    };
  const e = Math.max(0, Math.min(60, t.lifePercent)), r = aa(
    [
      { at: 0, color: "#d93c3c" },
      { at: 15, color: "#e06a3a" },
      { at: 30, color: "#d6bf47" },
      { at: 60, color: "#8ba0b5" }
    ],
    e
  ), a = 0.58 + (1 - e / 60) * 0.34;
  return {
    color: r,
    opacity: a,
    text: `${br(t.lifePercent, 0)} d`,
    critical: e < 15
  };
}
function at(t, e, r, a) {
  const i = ia(t);
  return y`
    <g
      class=${["filter", `is-${t.severity}`, t.available ? "" : "is-muted", i.critical ? "is-critical-pulse" : ""].filter(Boolean).join(" ")}
      @click=${a}
      style=${`--filter-color:${i.color}; --filter-opacity:${i.opacity};`}
    >
      <path class="filter-body" d=${e}></path>
      ${r.map((n) => y`<path class="filter-slat" d=${n}></path>`)}
    </g>
  `;
}
function le(t) {
  return p`<ha-svg-icon .path=${t}></ha-svg-icon>`;
}
function na() {
  return y`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d=${Oe}></path>
      <path d="M 21.703253 4.7618552 L 19.958952 2.8872845 L 18.214651 4.7618552" fill="none" stroke="currentColor" stroke-width="1.8114" stroke-linecap="round" stroke-linejoin="round"></path>
      <path d="M 18.195176 19.581143 L 19.939477 21.455714 L 21.683778 19.581143" fill="none" stroke="currentColor" stroke-width="1.8114" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
  `;
}
function oa() {
  return y`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d=${Oe}></path>
      <path d="M 3.2824585 1.8140332 L 1.6824585 3.6140332 L 3.2824585 5.4140332" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path>
      <path d="M 6.0640189 1.8140332 L 4.4640189 3.6140332 L 6.0640189 5.4140332" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path>
      <path d="M 17.378952 17.6 L 19.378952 20 L 17.378952 22.4" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"></path>
      <path d="M 20.32722 17.564032 L 22.32722 19.964032 L 20.32722 22.364032" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
  `;
}
const sa = [
  { id: "standby", label: "Standby", icon: le(zr), matches: ["standby", "stand-by", "off"] },
  { id: "interval", label: "Interval", icon: le(Or), matches: ["interval", "intervals", "auto"] },
  { id: "ventilation", label: "Ventilation only", icon: le(Oe), matches: ["ventilation", "ventilation only"] },
  { id: "night-cooling", label: "Night cooling", icon: le(Fr), matches: ["night cooling", "night_cooling", "cooling"] },
  { id: "disbalance", label: "Disbalance", icon: oa(), matches: ["disbalance", "imbalance"] },
  { id: "fan", label: "Fan", icon: na(), matches: [] }
];
function la(t, e) {
  const r = t.map((a) => ({ option: a, lower: a.toLowerCase() }));
  for (const a of e) {
    const i = r.find(({ lower: n }) => n === a || n.includes(a));
    if (i)
      return i.option;
  }
  return null;
}
function ca(t) {
  return t.length === 0 ? p`` : p`
    <div
      class="official-card-features"
      style="--feature-color:var(--state-climate-off-color, var(--state-climate-inactive-color, var(--state-inactive-color)));"
    >
      <div class="official-card-feature">
        <div
          class="official-control-select"
          role="radiogroup"
          aria-label="Presets"
          style="--control-select-color:var(--state-climate-off-color, var(--state-climate-inactive-color, var(--state-inactive-color)));"
        >
          ${t.map(
    (e) => p`
              <div
                role="radio"
                id=${e.id}
                class=${["official-option", e.selected ? "selected" : "", e.disabled ? "disabled" : ""].filter(Boolean).join(" ")}
                tabindex="-1"
                aria-checked=${e.selected ? "true" : "false"}
                aria-label=${e.label}
                title=${e.label}
                @click=${e.action}
              >
                <div class="official-option-content">${e.icon}</div>
              </div>
            `
  )}
        </div>
      </div>
    </div>
  `;
}
function pa(t, e, r) {
  const a = e.mode.preset.options, i = e.mode.preset.current?.toLowerCase() ?? "";
  return ca(
    sa.map((n) => {
      if (n.id === "fan")
        return {
          action: r.onToggleFanPopup,
          disabled: !e.mode.fan.controllable,
          icon: n.icon,
          id: `action-${n.id}`,
          label: n.label,
          selected: r.fanPopupOpen
        };
      const o = la(a, [...n.matches]);
      return {
        action: o && e.mode.climateEntity ? () => ft(t, e.mode.climateEntity, "preset", o) : void 0,
        disabled: !o || !e.mode.climateEntity,
        icon: n.icon,
        id: `action-${n.id}`,
        label: n.label,
        selected: !!o && i === o.toLowerCase()
      };
    })
  );
}
function ua(t, e) {
  if (!e.fanPopupOpen || !t.mode.fan.controllable)
    return p``;
  const r = Math.round(Math.max(0, Math.min(100, e.fanPopupValue)));
  return p`
    <div class="fan-popup-shell" @click=${e.onCloseFanPopup}>
      <div class="fan-popup-backdrop"></div>
      <div
        class="fan-popup official-card-feature"
        @click=${(a) => {
    a.stopPropagation(), e.onFanPopupInteract();
  }}
      >
        <div class="fan-popup-header">
          <span class="fan-popup-title">Fan speed</span>
          <span class="fan-popup-value">${r}%</span>
        </div>
        <div class="fan-popup-controls">
          <button class="fan-step-button" type="button" aria-label="Decrease fan speed" @click=${e.onFanDecrease}>-</button>
          <div class="fan-slider-wrap">
            <input
              class="fan-slider"
              type="range"
              min="0"
              max="100"
              step="1"
              .value=${String(r)}
              aria-label="Fan speed percentage"
              @input=${(a) => {
    const i = a.currentTarget;
    e.onFanPreviewChange(Number.parseInt(i.value, 10));
  }}
              @change=${(a) => {
    const i = a.currentTarget;
    e.onFanValueCommit(Number.parseInt(i.value, 10));
  }}
            />
          </div>
          <button class="fan-step-button" type="button" aria-label="Increase fan speed" @click=${e.onFanIncrease}>+</button>
        </div>
      </div>
    </div>
  `;
}
function da(t, e) {
  if (!t.alerts.warning && !t.alerts.fault)
    return p``;
  const r = `${t.alerts.notifications.length || t.alerts.warningCount + t.alerts.faultCount} active alert${(t.alerts.notifications.length || t.alerts.warningCount + t.alerts.faultCount) === 1 ? "" : "s"}`;
  return p`
    <ha-icon-button
      class="alert-info ${t.alerts.fault ? "is-fault" : "is-warning"}"
      .label=${r}
      .title=${r}
      @click=${e.onOpenAlertPopup}
    >
      <ha-svg-icon .path=${Tr}></ha-svg-icon>
    </ha-icon-button>
  `;
}
function ha(t, e) {
  if (!e.alertPopupOpen || !t.alerts.warning && !t.alerts.fault)
    return p``;
  const r = t.alerts.fault ? "Fault active" : "Warning active", a = t.alerts.notifications.length > 0 ? t.alerts.notifications : t.alerts.details.map((i, n) => ({
    kind: t.alerts.fault && n === 0 ? "fault" : "warning",
    fullMessage: i
  }));
  return p`
    <div class="alert-popup-shell" @click=${e.onCloseAlertPopup}>
      <div class="alert-popup-backdrop"></div>
      <div
        class="alert-popup official-card-feature ${t.alerts.fault ? "is-fault" : "is-warning"}"
        @click=${(i) => {
    i.stopPropagation(), e.onAlertPopupInteract();
  }}
      >
        <div class="alert-popup-header">
          <span class="alert-popup-title">${r}</span>
        </div>
        <div class="alert-popup-body">
          ${a.map(
    (i) => p`
              <p class="alert-popup-text ${i.kind === "fault" ? "is-fault" : "is-warning"}">${i.fullMessage}</p>
            `
  )}
        </div>
      </div>
    </div>
  `;
}
function fa(t, e, r, a) {
  const i = e.layout, n = r.dampers.bypass.percentOpen ?? 0, o = n <= 0, s = n >= 100 ? 0.3 : n > 0 ? 0.65 : 1, l = n <= 0 ? 0 : n >= 100 ? 1 : 0.35 + n / 150, c = e.tap_actions, h = t.localize?.("ui.panel.lovelace.cards.show_more_info") ?? "Show more information", d = xt(e, t.states[e.climate_entity]);
  return p`
    ${da(r, a)}
    ${ha(r, a)}
    ${d ? p`<p class="title">${d}</p>` : u}

    <div class=${d ? "container" : "container no-title"}>
      ${ua(r, a)}

      <div class="main-stage">
        <div class="canvas-wrap">
          <svg class="unit-svg" viewBox=${ta} role="img" aria-label="Atrea aMotion ventilation scheme">
                <g class="background-layer">
                  <rect class="unit-frame" x="40" y="60" width="920" height="480" rx="18"></rect>
                  <g class="side-decor outside" transform="translate(50 240) scale(0.4)">
                    <path d="M200 176c3 28-28 26-47 24-16-1.9-28-14-40-24-13 19-41 23-61 13-34-30-11-42-15-55-15-12-31-24-33-41 1.7-17 20-25 34-27-3.7-10-4.1-22 2.6-31 15-21 50-11 67-3.4 2.5.27 6.9 5.5 7.8 3.2 2.4-13 15-20 27-24 25-6.9 71-1.5 68 28-1.2 12-9.4 23-20 28 17-.98 54 10 49 29-3.8 18-21 15-33 19 17 17 34 33 19 55-6.6 7.5-18 6.4-27 7z"></path>
                    <path d="M122 64v.1c-17 .93-31 5.1-43 17l.005.005c-5 6.6-9.2 13-9.2 22l-.1.1c.92 9.2 6.7 14 13 21l5.2-4.6c-4.2-4.9-9.9-8.7-11-15-.58-7.4 3.2-14 7.3-19l-.001-.002c11-13 23-14 38-15zm44 43-4.3 5.5-.1.5c9.2 6.3 14 14 15 25 1.2 13-3.8 21-14 25l2 6.7c5.3-1.5 10-5 13-8.4 5.3-6.9 6-16 5.5-23-.19-2-.6-4-1-5.9h-.001c-2.4-10-8.6-19-16-24zm-60 70v14c6.1 5.5 9.3 12 10 20 1.5 11 6 16 12 26 2.4-7.3 4.4-15 6.5-22h.001v-.001c1.7-7.2 5.7-12 9.3-17l-11-8.6-.1.1c-2.1 2.8-4.5 4.9-6.4 7.2-2.6-5.6-5.9-12-9.6-15-3.5-3-6.2-4.7-11-4.7z"></path>
                    <path d="m87 189-8.1 11c13 13 21 22 21 39-6.3 38-25 76-42 102 12-3.6 21-6.6 31-7.5 2.2-.011 2.4.81 3.5 2.5 1.8 4.8 2.4 10 3.4 15 5.9-5.3 12-9.8 18-15 5.4-4.1 9.7-5 16-5v-.001c12 2.9 23 7.2 35 11-7.3-18-15-38-16-56 .52-14 .91-26 2.3-40 1.6-7.8 8.3-36 17-38l1.1-14c-3.5-.37-7.3.73-9.9 2-9.5 5.9-12 17-16 25l.011.005c-3.2 7.3-5.2 16-6.1 22-1.1 12-2 24-2.5 35 .7 14 2.7 29 6.7 40-7.5-2.6-17-2.9-24-1.1-5.2 1.8-9.2 4.7-14 7.9-1.3-2.3-3-4.4-5.3-5.8-3.5-1.4-7.4-1.7-11-1.1 4.6-9 8.7-18 12-28 4.8-13 9-26 12-40l.17.039c5.6-27-2.4-46-25-63z"></path>
                    <path d="M170 0c-10 .055-20 1.5-30 4-11 3.8-22 11-27 21-15-5.3-25-9.4-40-9.9-2-.1-4-.1-6-.1-13-.35-25 5.7-31 16-5.7 9.5-6.8 19-4.7 29-14 4.3-26 12-31 25-2 21 11 39 27 49-2.6 3.6-3.9 7.3-4.3 12-1 18 11 38 23 46 11 6.7 22 9.6 34 9.1v-.003c13-1.7 26-5.5 35-16l4.2 3.9c17 15 38 20 61 18 14-2.1 26-7.3 28-22 .1-.99.1-2 .1-3 13-.86 23-3.9 29-16 5.1-11 5.2-18 .8-28-3.9-7.3-10-14-15-19 15-2.6 26-15 26-24 .12-1.6.14-3.5.004-5-6.3-15-24-25-39-29 5.6-7.2 8.7-14 9.2-23h.1c.04-1.2-.034-2.4-.1-3.6-.59-7.2-3-12-7.3-17-8.3-9.9-20-14-32-15-3.5-.29-6.9-.43-10-.41zm-1.5 14c2.1-.01 4.2.041 6.3.14 13 .19 29 6.4 31 20 .059.73.1 1.3-.005 2.1h.001c-3.4 24-30 30-50 39l-12 5.8 18-3.1c24-4.4 41-9.4 62 1.5 6.8 4.2 13 8.6 10 17-7.7 9-28 11-40 14 9 8.2 19 17 26 26 7.5 8.4 6.9 21 1.2 29-9.4 5.3-20 4.1-30 4.1 2.1 8.2 3.7 18-3.8 23-23 8.3-43 1.2-60-13-5-4.1-9.7-8.2-15-12-7.4 12-20 20-34 22v.006c-8.7.62-16-1.4-24-5.6-12-7.1-19-22-19-34 .29-3.7 3.7-6.9 6.2-7.8l27-7.3-27-6.2-.006.02-.094-.02c-10-4.4-21-12-26-22-12-22 11-30 32-33-2.2-8.2-6-18-4.2-26 3-11 8.5-16 20-17 23-1.3 40 5.6 57 19 1.3-7.2.89-14 5.7-20l1.1-1.3c11-9.1 25-12 40-12z"></path>
                  </g>
                  <path class="side-decor inside" d="M95 24 62 3 9 38h8v55.5h90V38h9.5l-20-13V6h-1.3z" transform="translate(835 255)"></path>
                  <path class="unit-outline" d=${$.unitOutline}></path>
                  <path class="exchanger-outline" d=${$.exchangerOutline}></path>
                </g>

                <g class="duct-layer">
                  <path class="duct supply" d=${$.supplyMain}></path>
                  <path class="duct extract" d=${$.extractMain}></path>
                  <path class=${o ? "duct bypass is-closed" : "duct bypass"} d=${$.bypassInner}></path>
                </g>

                <g class="flow-layer">
                  <path class="flow supply" style=${`opacity:${s}; --flow-duration:${$e(r.fans.supply.speedPercent)};`} d=${$.supplyMain}></path>
                  <path class="flow extract reverse" style=${`opacity:${s}; --flow-duration:${$e(r.fans.extract.speedPercent)};`} d=${$.extractMain}></path>
                  <path class="flow bypass" style=${`opacity:${l}; --flow-duration:${$e(r.fans.supply.speedPercent)};`} d=${$.bypassInner}></path>
                </g>

                <g class="component-layer">
                  ${et("Extract fan", r.fans.extract, ne.extract.x, ne.extract.y, () => g(t, c.extract_fan, r.fans.extract.speedEntity))}
                  ${et("Supply fan", r.fans.supply, ne.supply.x, ne.supply.y, () => g(t, c.supply_fan, r.fans.supply.speedEntity))}
                  ${tt("ODA", r.dampers.oda, oe.oda.x, oe.oda.y, !1, () => g(t, c.oda_damper, r.dampers.oda.entity))}
                  ${tt("ETA", r.dampers.eta, oe.eta.x, oe.eta.y, !1, () => g(t, c.eta_damper, r.dampers.eta.entity))}
                  ${at(
    r.filters.oda,
    $.filterLeft,
    ["m 357,361 10,-10", "m 345.5,349.5 10,-10", "m 334,338 10,-10", "m 322.5,326.5 10,-10", "m 391.5,395.5 10,-10", "m 380,384 10,-10", "m 368.5,372.5 10,-10"],
    () => g(t, c.oda_filter, r.filters.oda.statusEntity ?? r.filters.oda.lifeEntity)
  )}
                  ${at(
    r.filters.eta,
    $.filterRight,
    ["m 357,361 10,-10", "m 345.5,349.5 10,-10", "m 334,338 10,-10", "m 322.5,326.5 10,-10", "m 391.5,395.5 10,-10", "m 380,384 10,-10", "m 368.5,372.5 10,-10"],
    () => g(t, c.eta_filter, r.filters.eta.statusEntity ?? r.filters.eta.lifeEntity)
  )}
                </g>

                <g class="overlay-layer">
                  ${i.show_temp ? y`
                        ${se("EHA", r.temperatures.eha, C.eha.x, C.eha.y, () => g(t, c.eha_temperature, r.temperatures.eha.entity))}
                        ${se("ODA", r.temperatures.oda, C.oda.x, C.oda.y, () => g(t, c.oda_temperature, r.temperatures.oda.entity))}
                        ${se("SUP", r.temperatures.sup, C.sup.x, C.sup.y, () => g(t, c.sup_temperature, r.temperatures.sup.entity))}
                        ${se("ETA", r.temperatures.eta, C.eta.x, C.eta.y, () => g(t, c.eta_temperature, r.temperatures.eta.entity))}
                      ` : u}

                  ${i.show_speed ? y`
                        ${Qe(r.fans.extract, 255, 115, () => g(t, c.extract_fan, r.fans.extract.speedEntity))}
                        ${Qe(r.fans.supply, 745, 115, () => g(t, c.supply_fan, r.fans.supply.speedEntity))}
                      ` : u}

                  <g class="port-labels">
                    <circle cx="170" cy="190" r="30" class="port-dot eha"></circle>
                    <circle cx="170" cy="410" r="30" class="port-dot oda"></circle>
                    <circle cx="830" cy="190" r="30" class="port-dot sup"></circle>
                    <circle cx="830" cy="410" r="30" class="port-dot eta"></circle>
                    <text x="170" y="190">EHA</text>
                    <text x="170" y="410">ODA</text>
                    <text x="830" y="190">SUP</text>
                    <text x="830" y="410">ETA</text>
                  </g>
                </g>
              </svg>
          </div>
        </div>
      </div>

      <ha-icon-button
        class="more-info"
        .label=${h}
        .title=${h}
        @click=${a.onOpenMoreInfo}
      >
        <ha-svg-icon .path=${_t}></ha-svg-icon>
      </ha-icon-button>

    ${pa(t, r, a)}

    ${r.availability !== "full" ? p`<div class="availability-note">Partial telemetry: card remains active, but some data is unavailable.</div>` : u}
  `;
}
const ma = nt`
  :host {
    display: block;
    --atrea-bg: var(--ha-card-background, var(--card-background-color, #fff));
    --atrea-surface: color-mix(in srgb, var(--atrea-bg) 94%, var(--primary-text-color) 6%);
    --atrea-panel: color-mix(in srgb, var(--atrea-bg) 88%, var(--primary-text-color) 12%);
    --atrea-border: rgba(34, 72, 128, 0.14);
    --atrea-text: var(--primary-text-color, #1f2a37);
    --atrea-muted: var(--secondary-text-color, #6b7280);
    --atrea-blue: #294a97;
    --atrea-gray-path: #b7b9bf;
    --atrea-danger: var(--error-color, #db4437);
    --atrea-warning: #e0a43a;
    --atrea-good: #67b929;
    --atrea-dial-start: color-mix(in srgb, var(--state-active-color, var(--atrea-blue)) 65%, #77b8ff);
    --atrea-dial-end: color-mix(in srgb, var(--state-active-color, var(--atrea-blue)) 25%, #ff7c7c);
    --atrea-feature-border-radius: var(--ha-border-radius-xl, var(--ha-border-radius-lg, 16px));
    --atrea-fan-fill: var(--atrea-surface);
    --atrea-fan-stroke: var(--atrea-blue);
    --atrea-side-decor-inside-fill: color-mix(in srgb, var(--atrea-surface) 86%, white 14%);
    color: var(--atrea-text);
  }

  ha-card {
    position: relative;
    overflow: hidden;
    color: var(--atrea-text);
  }

  ha-card.theme-dark {
    --atrea-surface: color-mix(in srgb, var(--atrea-bg) 90%, var(--primary-text-color) 10%);
    --atrea-panel: color-mix(in srgb, var(--atrea-bg) 84%, var(--primary-text-color) 16%);
    --atrea-fan-fill: color-mix(in srgb, var(--atrea-surface) 82%, white 18%);
    --atrea-fan-stroke: color-mix(in srgb, white 76%, var(--state-icon-color, #9fb7ff) 24%);
    --atrea-side-decor-inside-fill: rgba(255, 255, 255, 0.14);
  }

  ha-card.theme-light {
    --atrea-surface: color-mix(in srgb, var(--atrea-bg) 96%, var(--primary-text-color) 4%);
    --atrea-panel: color-mix(in srgb, var(--atrea-bg) 90%, var(--primary-text-color) 10%);
    --atrea-fan-fill: var(--atrea-surface);
    --atrea-fan-stroke: var(--atrea-blue);
    --atrea-side-decor-inside-fill: color-mix(in srgb, var(--atrea-surface) 86%, white 14%);
  }

  ha-card.is-compact .container {
    padding: 8px 12px 12px;
  }

  ha-card.is-compact .official-card-features {
    padding: 8px 12px 0;
  }

  ha-card.is-compact .official-control-select .official-option {
    min-width: 44px;
    min-height: 44px;
  }

  .title {
    width: 100%;
    margin: 0;
    padding: 8px 30px;
    font-size: var(--ha-font-size-l, 24px);
    line-height: var(--ha-line-height-expanded, 32px);
    font-weight: 400;
    color: var(--atrea-text);
    text-align: center;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: none;
  }

  .container {
    position: relative;
    padding: 0 16px 0;
  }

  .container.no-title {
    padding-top: 20px;
  }

  .main-stage {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    box-sizing: border-box;
  }

  .official-card-features {
    --feature-color: var(--state-icon-color);
    --feature-height: 42px;
    --feature-button-spacing: 12px;
    pointer-events: none;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--ha-card-feature-gap, 12px);
    width: 100%;
    box-sizing: border-box;
    justify-content: space-evenly;
    flex: 0 0 auto;
    padding: 0 12px 12px;
    z-index: 2;
  }

  .official-card-feature {
    display: block;
  }

  .fan-popup-shell {
    position: absolute;
    z-index: 4;
    inset: 0;
  }

  .fan-popup-backdrop {
    position: absolute;
    inset: 0;
    background: transparent;
  }

  .fan-popup {
    position: absolute;
    left: 12px;
    right: 12px;
    bottom: 44px;
    padding: 12px;
    border-radius: var(--atrea-feature-border-radius);
    background: color-mix(in srgb, var(--ha-card-background, var(--card-background-color, #fff)) 88%, var(--atrea-panel) 12%);
    box-shadow:
      inset 0 0 0 1px color-mix(in srgb, var(--state-icon-color, var(--atrea-blue)) 12%, transparent),
      0 8px 18px rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(8px);
  }

  .alert-popup-shell {
    position: absolute;
    z-index: 4;
    inset: 0;
  }

  .alert-popup-backdrop {
    position: absolute;
    inset: 0;
    background: transparent;
  }

  .alert-popup {
    position: absolute;
    left: 12px;
    right: 12px;
    top: 44px;
    padding: 12px 14px;
    border-radius: var(--atrea-feature-border-radius);
    background: color-mix(in srgb, var(--ha-card-background, var(--card-background-color, #fff)) 92%, var(--atrea-panel) 8%);
    box-shadow:
      inset 0 0 0 1px color-mix(in srgb, var(--state-icon-color, var(--atrea-blue)) 12%, transparent),
      0 8px 18px rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(8px);
  }

  .alert-popup.is-warning {
    box-shadow:
      inset 0 0 0 1px color-mix(in srgb, var(--atrea-warning) 28%, transparent),
      0 8px 18px rgba(0, 0, 0, 0.08);
  }

  .alert-popup.is-fault {
    box-shadow:
      inset 0 0 0 1px color-mix(in srgb, var(--atrea-danger) 28%, transparent),
      0 8px 18px rgba(0, 0, 0, 0.08);
  }

  .alert-popup-header {
    margin-bottom: 8px;
  }

  .alert-popup-title {
    color: var(--primary-text-color);
    font-size: 0.95rem;
    font-weight: 600;
  }

  .alert-popup-body {
    display: grid;
    gap: 8px;
  }

  .alert-popup-text {
    margin: 0;
    color: var(--secondary-text-color);
    font-size: 0.9rem;
    line-height: 1.35;
  }

  .fan-popup-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 12px;
  }

  .fan-popup-title {
    color: var(--secondary-text-color);
    font-size: 0.82rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .fan-popup-value {
    color: var(--primary-text-color);
    font-size: 1rem;
    font-weight: 600;
  }

  .fan-popup-controls {
    display: grid;
    grid-template-columns: 52px minmax(0, 1fr) 52px;
    align-items: center;
    gap: 12px;
  }

  .fan-slider-wrap {
    min-width: 0;
  }

  .fan-step-button {
    inline-size: 52px;
    block-size: 52px;
    border: none;
    border-radius: calc(var(--atrea-feature-border-radius) - 4px);
    background: var(--ha-card-background, var(--card-background-color, #fff));
    color: var(--state-icon-color, var(--atrea-blue));
    font: inherit;
    font-size: 1.9rem;
    line-height: 1;
    cursor: pointer;
    box-shadow:
      0 1px 3px rgba(0, 0, 0, 0.12),
      inset 0 0 0 1px color-mix(in srgb, var(--state-icon-color, var(--atrea-blue)) 16%, transparent);
    transition:
      transform 140ms ease,
      box-shadow 140ms ease,
      color 140ms ease;
  }

  .fan-step-button:hover,
  .fan-step-button:focus-visible {
    color: var(--primary-text-color);
    box-shadow:
      0 4px 10px rgba(0, 0, 0, 0.14),
      inset 0 0 0 1px color-mix(in srgb, var(--state-icon-color, var(--atrea-blue)) 24%, transparent);
  }

  .fan-step-button:active {
    transform: translateY(1px);
  }

  .fan-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    background: transparent;
    margin: 0;
    width: 100%;
    margin: 0;
    accent-color: var(--state-icon-color, var(--atrea-blue));
  }

  .fan-slider::-webkit-slider-runnable-track {
    height: 8px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--state-icon-color, var(--atrea-blue)) 20%, transparent);
  }

  .fan-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    inline-size: 22px;
    block-size: 22px;
    margin-top: -7px;
    border: none;
    border-radius: 50%;
    background: var(--state-icon-color, var(--atrea-blue));
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
  }

  .fan-slider::-moz-range-track {
    height: 8px;
    border: none;
    border-radius: 999px;
    background: color-mix(in srgb, var(--state-icon-color, var(--atrea-blue)) 20%, transparent);
  }

  .fan-slider::-moz-range-thumb {
    inline-size: 22px;
    block-size: 22px;
    border: none;
    border-radius: 50%;
    background: var(--state-icon-color, var(--atrea-blue));
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
  }

  .official-card-features > * {
    pointer-events: auto;
  }

  .official-control-select {
    --control-select-color: var(--feature-color);
    --control-select-padding: 4px;
    --control-select-thickness: var(--feature-height);
    --control-select-border-radius: var(--atrea-feature-border-radius);
    --control-select-button-border-radius: calc(var(--control-select-border-radius) - var(--control-select-padding));
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-evenly;
    align-items: center;
    gap: 0;
    width: 100%;
    height: var(--control-select-thickness);
    box-sizing: border-box;
    padding: var(--control-select-padding);
    border-radius: var(--control-select-border-radius);
    background: color-mix(
      in srgb,
      var(--disabled-color, var(--atrea-panel)) calc(var(--control-select-background-opacity, 0.2) * 100%),
      transparent
    );
  }

  .official-option {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    flex: 1 1 0%;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-radius: var(--control-select-button-border-radius);
    color: var(--control-select-color);
    background: transparent;
    cursor: pointer;
    user-select: none;
    transition:
      background-color 180ms ease,
      color 180ms ease,
      box-shadow 180ms ease;
  }

  .official-option + .official-option {
    margin-inline-start: var(--control-select-padding);
  }

  .official-option.selected {
    color: var(--text-primary-color, var(--primary-text-color));
    background: color-mix(in srgb, var(--control-select-color) 100%, transparent);
    box-shadow:
      0 1px 3px rgba(0, 0, 0, 0.12),
      inset 0 0 0 1px color-mix(in srgb, var(--control-select-color) 24%, transparent);
  }

  .official-option:not(.disabled):hover,
  .official-option:not(.disabled):focus-visible {
    box-shadow: 0 0 0 1px color-mix(in srgb, var(--control-select-color) 24%, transparent);
  }

  .official-option.disabled {
    cursor: default;
    opacity: 0.9;
  }

  .official-option-content {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .official-option ha-svg-icon,
  .official-option svg {
    inline-size: var(--mdc-icon-size, 20px);
    block-size: var(--mdc-icon-size, 20px);
    fill: currentColor;
  }

  .more-info {
    position: absolute;
    cursor: pointer;
    top: 0;
    right: 0;
    inset-inline-end: 0;
    inset-inline-start: initial;
    border-radius: var(--ha-border-radius-pill, 999px);
    color: var(--secondary-text-color);
    direction: var(--direction);
    transition: color 140ms ease;
  }

  .alert-info {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    inset-inline-start: 0;
    inset-inline-end: initial;
    border-radius: var(--ha-border-radius-pill, 999px);
    color: var(--atrea-warning);
    direction: var(--direction);
    transition: color 140ms ease;
  }

  .alert-info.is-fault {
    color: var(--atrea-danger);
  }

  .alert-info:hover,
  .alert-info:focus-visible {
    color: var(--primary-text-color);
  }

  .more-info:hover,
  .more-info:focus-visible {
    color: var(--primary-text-color);
  }

  .more-info ha-svg-icon,
  .more-info svg {
    inline-size: 20px;
    block-size: 20px;
    fill: currentColor;
  }

  .mode-value,
  .mode-select {
    width: 100%;
    font: inherit;
    color: var(--atrea-text);
    background: var(--atrea-surface);
    border: 1px solid rgba(41, 74, 151, 0.14);
    border-radius: 10px;
    padding: 8px 10px;
  }

  .mode-group {
    display: grid;
    gap: 4px;
  }

  .mode-group-label {
    font-size: 0.72rem;
    color: var(--atrea-muted);
  }

  .canvas-wrap {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 100%;
  }

  .unit-svg {
    width: 100%;
    height: auto;
    display: block;
  }

  .unit-frame {
    fill: var(--atrea-surface);
    stroke: var(--atrea-blue);
    stroke-opacity: 0.15;
    stroke-width: 1.5;
  }

  .unit-outline,
  .exchanger-outline {
    fill: none;
    stroke: var(--atrea-blue);
    stroke-width: 4;
    stroke-linecap: square;
    stroke-linejoin: round;
  }

  .center-title,
  .center-subtitle,
  .port-labels text,
  .badge-label,
  .badge-value,
  .component-label,
  .component-value {
    fill: var(--atrea-text);
    text-anchor: middle;
    dominant-baseline: middle;
    pointer-events: none;
  }

  .center-title {
    font-size: 18px;
    font-weight: 500;
    fill: var(--primary-text-color);
  }

  .center-title.small {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    fill: var(--secondary-text-color);
  }

  .center-subtitle,
  .component-value,
  .badge-label {
    font-size: 14px;
    font-weight: 400;
    fill: var(--secondary-text-color);
  }

  .badge-value {
    font-size: 24px;
    font-weight: 500;
    letter-spacing: 0.01em;
    fill: var(--primary-text-color);
  }

  .badge-value.temperature-only {
    font-size: 28px;
    font-weight: 500;
  }

  .fan-info text {
    fill: var(--secondary-text-color);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.04em;
    pointer-events: none;
  }

  .badge-value.small {
    font-size: 16px;
  }

  .duct,
  .flow {
    fill: none;
    stroke-width: 28;
    stroke-linecap: square;
    stroke-linejoin: round;
  }

  .duct {
    opacity: 1;
  }

  .duct.supply,
  .flow.supply {
    stroke: var(--atrea-blue);
  }

  .duct.extract,
  .flow.extract {
    stroke: var(--atrea-gray-path);
  }

  .duct.bypass {
    stroke: var(--atrea-surface);
    stroke-width: 18;
    opacity: 0;
  }

  .duct.bypass.is-closed {
    stroke: var(--atrea-blue);
    stroke-width: 28;
    opacity: 1;
  }

  .flow {
    stroke-dasharray: 14 12;
  }

  .flow.bypass {
    stroke: var(--atrea-blue);
    stroke-width: 16;
    stroke-dasharray: 12 14;
    stroke-linecap: butt;
  }

  .side-decor.outside {
    fill: var(--c-draw-10, #d9dada);
  }

  .side-decor.inside {
    fill: var(--atrea-side-decor-inside-fill);
    stroke: color-mix(in srgb, var(--atrea-muted) 35%, transparent);
    stroke-width: 5;
  }

  .fan-shell {
    fill: var(--atrea-fan-fill);
    stroke: var(--atrea-fan-stroke);
    stroke-width: 2;
  }

  .fan-rotor {
    fill: none;
    stroke: var(--atrea-fan-stroke);
    stroke-width: 3;
  }

  .fan-core {
    fill: var(--atrea-fan-fill);
    stroke: var(--atrea-fan-stroke);
    stroke-width: 3;
  }

  .damper-ring {
    fill: var(--atrea-surface);
    stroke: var(--atrea-blue);
    stroke-width: 2;
  }

  .damper-blade {
    fill: var(--atrea-blue);
  }

  .temp-badge rect,
  .metric-badge rect {
    fill: var(--ha-card-background, var(--card-background-color, #fff));
    stroke: var(--divider-color, rgba(0, 0, 0, 0.12));
    stroke-width: 1;
    opacity: 0.96;
  }

  .filter-body {
    fill: color-mix(in srgb, var(--filter-color) calc(var(--filter-opacity, 0.7) * 100%), white);
    stroke: var(--filter-color);
    stroke-opacity: calc(var(--filter-opacity, 0.7) * 0.72);
    stroke-width: 1.25;
  }

  .filter-slat {
    fill: none;
    stroke: color-mix(in srgb, var(--filter-color) 80%, white);
    stroke-opacity: calc(var(--filter-opacity, 0.7) * 0.82);
    stroke-width: 1.25;
    stroke-linecap: round;
  }

  .filter-days {
    fill: var(--secondary-text-color);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.04em;
    text-anchor: middle;
    dominant-baseline: middle;
    pointer-events: none;
  }

  .filter.is-critical-pulse .filter-slat:last-of-type {
    animation: filter-pulse 1.6s ease-in-out infinite;
  }

  .badge,
  .fan-group,
  .damper,
  .filter {
    cursor: pointer;
  }

  .is-muted {
    opacity: 0.45;
  }

  .availability-note {
    padding: 8px 16px 16px;
    color: var(--secondary-text-color);
    font-size: 12px;
  }

  ha-dialog {
    --mdc-dialog-min-width: min(620px, calc(100vw - 24px));
    --mdc-dialog-max-width: min(620px, calc(100vw - 24px));
  }

  .dialog-subtitle {
    color: var(--secondary-text-color);
    font-size: calc(var(--ha-font-size-s, 0.875rem) * 1.02);
    line-height: 1.15;
  }

  .dialog-header-title {
    display: grid;
    gap: 1px;
    padding-block: 0;
  }

  .dialog-title {
    font-size: calc(var(--ha-font-size-xl, 1.5rem) * 0.95);
    font-weight: var(--ha-font-weight-medium, 500);
    line-height: 1.1;
  }

  .more-info-dialog-title {
    font-size: calc(var(--ha-font-size-xl, 1.5rem) * 0.95);
    font-weight: var(--ha-font-weight-medium, 500);
    line-height: 1.1;
  }

  .dialog-icon-button {
    inline-size: 36px;
    block-size: 36px;
    border-radius: 999px;
    border: none;
    background: transparent;
    color: var(--primary-text-color);
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .more-info-close {
    inline-size: 36px;
    block-size: 36px;
    border-radius: 999px;
    border: none;
    background: transparent;
    color: var(--primary-text-color);
    padding: 0;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .more-info-header-actions {
    display: inline-flex;
    align-items: center;
    gap: 0;
    margin-inline-end: -6px;
  }

  .more-info-header-action {
    position: relative;
    isolation: isolate;
    --ha-icon-button-padding-inline: var(--ha-space-2, 8px);
    color: var(--primary-text-color);
  }

  .more-info-header-action::part(base) {
    width: var(--wa-form-control-height, 40px);
    aspect-ratio: 1;
    outline-offset: -4px;
    border-radius: 999px;
  }

  .more-info-header-action:hover::part(base),
  .more-info-header-action:focus-visible::part(base) {
    background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
  }

  .more-info-header-dropdown {
    --show-duration: 120ms;
    --hide-duration: 120ms;
  }

  .more-info-header-dropdown::part(panel) {
    border-radius: 18px;
    box-shadow: var(
      --mdc-elevation-umbra,
      0 8px 28px rgba(0, 0, 0, 0.18)
    );
  }

  .more-info-dropdown-item {
    --icon-color: var(--secondary-text-color);
    --label-color: var(--primary-text-color);
  }

  .dialog-icon-button svg {
    inline-size: 22px;
    block-size: 22px;
    stroke: currentColor;
    fill: none;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .dialog-content {
    color: var(--primary-text-color);
    padding: 0 8px 10px;
    display: grid;
    justify-items: center;
    align-content: start;
    gap: 10px;
  }

  .current {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px 28px;
    justify-items: center;
    text-align: center;
    margin: 0;
    width: min(100%, 432px);
  }

  .current:not(.has-multiple) {
    grid-template-columns: minmax(0, 1fr);
  }

  .current div {
    display: grid;
    gap: 2px;
    justify-items: center;
  }

  .current p {
    margin: 0;
    color: var(--primary-text-color);
  }

  .current .label {
    opacity: 0.8;
    font-size: calc(var(--ha-font-size-s, 0.875rem) * 1.02);
    line-height: var(--ha-line-height-condensed, 1.2);
    letter-spacing: 0.02em;
  }

  .current .value {
    font-size: calc(var(--ha-font-size-xl, 1.5rem) * 0.92);
    font-weight: var(--ha-font-weight-medium, 500);
    line-height: var(--ha-line-height-condensed, 1.2);
  }

  .controls {
    display: grid;
    place-items: center;
    margin: 0;
    width: min(100%, 420px);
  }

  .main-control,
  .thermostat-dial-shell {
    display: grid;
    place-items: center;
    gap: 8px;
    width: 100%;
  }

  .dial-wrap,
  .thermostat-dial-stage {
    position: relative;
    inline-size: min(100%, 420px);
    aspect-ratio: 1;
    display: grid;
    place-items: center;
  }

  .thermostat-dial-svg {
    inline-size: 100%;
    block-size: auto;
  }

  .dial-track,
  .dial-progress {
    fill: none;
    stroke-width: 16;
    stroke-linecap: round;
  }

  .dial-track {
    stroke: color-mix(in srgb, var(--primary-text-color) 9%, transparent);
  }

  .dial-progress {
    stroke: url(#atreaDialGradient);
  }

  .dial-content {
    position: absolute;
    inset: 0;
    display: grid;
    place-content: center;
    gap: 4px;
    text-align: center;
    padding: 88px;
  }

  .dial-setpoint {
    font-size: 4.35rem;
    font-weight: 500;
    line-height: 0.88;
    letter-spacing: -0.02em;
  }

  .dial-state {
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }

  .dial-current,
  .dial-state {
    color: var(--secondary-text-color);
  }

  .dial-current {
    font-size: 0.92rem;
  }

  .adjust-buttons,
  .dial-buttons {
    display: flex;
    justify-content: center;
    gap: 14px;
    margin-top: -10px;
  }

  .adjust-button {
    inline-size: 48px;
    block-size: 48px;
    border-radius: 50%;
    border: 1px solid var(--divider-color, rgba(41, 74, 151, 0.14));
    background: transparent;
    color: var(--atrea-text);
    padding: 0;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: background-color 120ms ease, border-color 120ms ease;
  }

  .adjust-button svg {
    inline-size: 20px;
    block-size: 20px;
    stroke: currentColor;
    fill: none;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .adjust-button:hover {
    background: color-mix(in srgb, var(--state-active-color, var(--atrea-blue)) 8%, transparent);
  }

  .popup-select {
    width: 100%;
    font: inherit;
    color: var(--atrea-text);
    background: var(--ha-card-background, var(--card-background-color, #fff));
    border: 1px solid var(--divider-color, rgba(41, 74, 151, 0.14));
    border-radius: 14px;
    padding: 11px 14px;
  }

  .menu-icon {
    inline-size: 22px;
    block-size: 22px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--secondary-text-color);
  }

  .menu-icon svg {
    inline-size: 20px;
    block-size: 20px;
    stroke: currentColor;
    fill: none;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .control-menus {
    display: grid;
    gap: 10px;
    width: min(100%, 420px);
    margin-top: -4px;
    justify-self: center;
  }

  .control-menus ha-control-select-menu {
    margin-top: 0;
  }

  .port-labels text {
    font-size: 22px;
    font-weight: 500;
    letter-spacing: 0.04em;
    fill: var(--primary-text-color);
  }

  .port-dot {
    opacity: 1;
    stroke: var(--secondary-text-color);
    stroke-width: 1;
  }

  .port-dot.eha {
    fill: #b6732f;
  }

  .port-dot.oda {
    fill: #66b92f;
  }

  .port-dot.sup {
    fill: #96b0ec;
  }

  .port-dot.eta {
    fill: #f1df27;
  }

  .component-value.emphasis {
    fill: var(--atrea-text);
    font-weight: 600;
  }

  .align-start {
    text-anchor: start;
  }

  @keyframes flow-move {
    from {
      stroke-dashoffset: 0;
    }
    to {
      stroke-dashoffset: -120;
    }
  }

  @keyframes filter-pulse {
    0%,
    100% {
      stroke-opacity: 0.55;
    }
    50% {
      stroke-opacity: 1;
    }
  }

  @media (max-width: 720px) {
    .title {
      padding: 8px 30px;
    }

    .container {
      padding: 0 14px 0;
    }

    .container.no-title {
      padding-top: 20px;
    }

    .current {
      grid-template-columns: 1fr 1fr;
    }

    .dial-content {
      padding: 74px;
    }

    .dial-setpoint {
      font-size: 3.6rem;
    }
  }

  @media (max-width: 520px) {
    .official-card-features {
      padding: 0 10px 10px;
    }

    .current {
      grid-template-columns: 1fr;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .flow {
      animation: none !important;
    }
  }
`;
var ga = Object.defineProperty, va = Object.getOwnPropertyDescriptor, P = (t, e, r, a) => {
  for (var i = a > 1 ? void 0 : a ? va(e, r) : e, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (i = (a ? o(e, r, i) : o(i)) || i);
  return a && i && ga(e, r, i), i;
};
const ba = 8e3, ya = 8e3;
let _ = class extends L {
  constructor() {
    super(...arguments), this.isMoreInfoOpen = !1, this.isFanPopupOpen = !1, this.isAlertPopupOpen = !1, this.fanPopupValue = null;
  }
  setConfig(t) {
    this.errorMessage = void 0, this.config = vr(t);
  }
  getCardSize() {
    return this.config?.layout?.compact ? 4 : 5;
  }
  render() {
    if (this.errorMessage)
      return p`<ha-card class="type-custom-atrea-amotion-card"><div class="container">${this.errorMessage}</div></ha-card>`;
    if (!this.config)
      return p`<ha-card class="type-custom-atrea-amotion-card"><div class="container">Card is not configured.</div></ha-card>`;
    if (!this.hass)
      return p`<ha-card class="type-custom-atrea-amotion-card"><div class="container">Home Assistant state not available.</div></ha-card>`;
    let t;
    try {
      t = Sr(this.hass, this.config);
    } catch (s) {
      const l = s instanceof Error ? s.message : "Unknown rendering error";
      return p`<ha-card class="type-custom-atrea-amotion-card"><div class="container">${l}</div></ha-card>`;
    }
    const e = this.config.layout ?? {}, r = this.config.theme_variant ?? "auto", a = ["type-custom-atrea-amotion-card", e.compact ? "is-compact" : "", `theme-${r}`].filter(Boolean).join(" "), i = Number.parseFloat(t.mode.fan.current ?? ""), n = t.fans.supply.speedPercent ?? t.fans.extract.speedPercent, o = Number.isFinite(i) ? i : n;
    return p`
      <ha-card class=${a}>
        ${fa(this.hass, this.config, t, {
      alertPopupOpen: this.isAlertPopupOpen,
      fanPopupOpen: this.isFanPopupOpen,
      fanPopupValue: this.fanPopupValue ?? o ?? 0,
      onCloseAlertPopup: () => this.closeAlertPopup(),
      onOpenAlertPopup: () => this.toggleAlertPopup(),
      onAlertPopupInteract: () => this.resetAlertPopupTimeout(),
      onCloseFanPopup: () => this.closeFanPopup(),
      onFanDecrease: async () => this.stepFanValue(t, -1),
      onFanIncrease: async () => this.stepFanValue(t, 1),
      onFanPopupInteract: () => this.resetFanPopupTimeout(),
      onFanPreviewChange: (s) => {
        this.fanPopupValue = s, this.resetFanPopupTimeout();
      },
      onFanValueCommit: async (s) => this.commitFanValue(t, s),
      onOpenMoreInfo: () => {
        this.isMoreInfoOpen = !0, this.requestUpdate();
      },
      onToggleFanPopup: () => {
        if (t.mode.fan.controllable) {
          if (this.isFanPopupOpen) {
            this.closeFanPopup();
            return;
          }
          this.openFanPopup(o ?? 0);
        }
      }
    })}
        ${this.isMoreInfoOpen ? Qr(
      this.hass,
      this.config,
      () => {
        this.isMoreInfoOpen = !1, this.requestUpdate();
      }
    ) : p``}
      </ha-card>
    `;
  }
  disconnectedCallback() {
    this.clearFanPopupTimeout(), this.clearAlertPopupTimeout(), super.disconnectedCallback();
  }
  toggleAlertPopup() {
    if (this.isAlertPopupOpen) {
      this.closeAlertPopup();
      return;
    }
    this.isAlertPopupOpen = !0, this.resetAlertPopupTimeout();
  }
  closeAlertPopup() {
    this.isAlertPopupOpen = !1, this.clearAlertPopupTimeout();
  }
  clearAlertPopupTimeout() {
    this.alertPopupTimeoutId !== void 0 && (window.clearTimeout(this.alertPopupTimeoutId), this.alertPopupTimeoutId = void 0);
  }
  resetAlertPopupTimeout() {
    this.isAlertPopupOpen && (this.clearAlertPopupTimeout(), this.alertPopupTimeoutId = window.setTimeout(() => {
      this.closeAlertPopup(), this.requestUpdate();
    }, ya));
  }
  openFanPopup(t) {
    this.fanPopupValue = t, this.isFanPopupOpen = !0, this.resetFanPopupTimeout();
  }
  closeFanPopup() {
    this.isFanPopupOpen = !1, this.clearFanPopupTimeout();
  }
  clearFanPopupTimeout() {
    this.fanPopupTimeoutId !== void 0 && (window.clearTimeout(this.fanPopupTimeoutId), this.fanPopupTimeoutId = void 0);
  }
  resetFanPopupTimeout() {
    this.isFanPopupOpen && (this.clearFanPopupTimeout(), this.fanPopupTimeoutId = window.setTimeout(() => {
      this.closeFanPopup(), this.requestUpdate();
    }, ba));
  }
  getFanStepOptions(t) {
    const e = t.mode.fan.options.map((a) => Number.parseFloat(a)).filter((a) => Number.isFinite(a)).sort((a, i) => a - i);
    if (e.length > 0)
      return e;
    const r = t.fans.supply.speedPercent ?? t.fans.extract.speedPercent;
    return r === null ? [] : [r];
  }
  getNearestFanOption(t, e) {
    const r = this.getFanStepOptions(t);
    if (r.length === 0)
      return null;
    const a = Math.max(0, Math.min(100, e));
    return r.reduce((i, n) => Math.abs(n - a) < Math.abs(i - a) ? n : i);
  }
  async commitFanValue(t, e) {
    if (!this.hass || !t.mode.climateEntity || !t.mode.fan.controllable)
      return;
    this.resetFanPopupTimeout();
    const r = Math.round(Math.max(0, Math.min(100, e))), a = this.getNearestFanOption(t, r) ?? r;
    this.fanPopupValue = a, await ur(this.hass, t.mode.climateEntity, a, t.mode.fan.options);
  }
  async stepFanValue(t, e) {
    const r = this.getFanStepOptions(t);
    if (r.length === 0)
      return;
    this.resetFanPopupTimeout();
    const a = this.fanPopupValue ?? r[0];
    let i = e < 0 ? r[0] : r[r.length - 1];
    if (e < 0) {
      for (let n = r.length - 1; n >= 0; n -= 1)
        if (r[n] < a) {
          i = r[n];
          break;
        }
    } else
      for (const n of r)
        if (n > a) {
          i = n;
          break;
        }
    await this.commitFanValue(t, i);
  }
  static async getConfigElement() {
    return document.createElement("atrea-amotion-card-editor");
  }
  static getStubConfig() {
    return {
      type: "custom:atrea-amotion-card",
      title: "Atrea aMotion",
      show_title: "custom",
      theme_variant: "auto",
      entities: {
        temperatures: {
          oda: "sensor.atrea_oda_temperature",
          eta: "sensor.atrea_eta_temperature",
          sup: "sensor.atrea_sup_temperature",
          eha: "sensor.atrea_eha_temperature"
        }
      },
      climate_entity: "climate.atrea_amotion"
    };
  }
};
_.styles = ma;
P([
  Y({ attribute: !1 })
], _.prototype, "hass", 2);
P([
  w()
], _.prototype, "config", 2);
P([
  w()
], _.prototype, "errorMessage", 2);
P([
  w()
], _.prototype, "isMoreInfoOpen", 2);
P([
  w()
], _.prototype, "isFanPopupOpen", 2);
P([
  w()
], _.prototype, "isAlertPopupOpen", 2);
P([
  w()
], _.prototype, "fanPopupValue", 2);
_ = P([
  Le("atrea-amotion-card")
], _);
window.customCards || (window.customCards = []);
window.customCards.push({
  type: "atrea-amotion-card",
  name: "Atrea aMotion Card",
  description: "SVG Lovelace card for Atrea heat recovery ventilation units",
  preview: !0
});
const $a = _;
export {
  _ as AtreaAmotionCard,
  $a as default
};
