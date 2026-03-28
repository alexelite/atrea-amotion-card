/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const it = globalThis, _t = it.ShadowRoot && (it.ShadyCSS === void 0 || it.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, xt = Symbol(), St = /* @__PURE__ */ new WeakMap();
let Gt = class {
  constructor(t, r, a) {
    if (this._$cssResult$ = !0, a !== xt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = r;
  }
  get styleSheet() {
    let t = this.o;
    const r = this.t;
    if (_t && t === void 0) {
      const a = r !== void 0 && r.length === 1;
      a && (t = St.get(r)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), a && St.set(r, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const _e = (e) => new Gt(typeof e == "string" ? e : e + "", void 0, xt), Yt = (e, ...t) => {
  const r = e.length === 1 ? e[0] : t.reduce((a, i, n) => a + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + e[n + 1], e[0]);
  return new Gt(r, e, xt);
}, xe = (e, t) => {
  if (_t) e.adoptedStyleSheets = t.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet);
  else for (const r of t) {
    const a = document.createElement("style"), i = it.litNonce;
    i !== void 0 && a.setAttribute("nonce", i), a.textContent = r.cssText, e.appendChild(a);
  }
}, Mt = _t ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let r = "";
  for (const a of t.cssRules) r += a.cssText;
  return _e(r);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: $e, defineProperty: we, getOwnPropertyDescriptor: Ae, getOwnPropertyNames: Ce, getOwnPropertySymbols: ke, getPrototypeOf: Ee } = Object, st = globalThis, Lt = st.trustedTypes, Se = Lt ? Lt.emptyScript : "", Me = st.reactiveElementPolyfillSupport, D = (e, t) => e, nt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Se : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let r = e;
  switch (t) {
    case Boolean:
      r = e !== null;
      break;
    case Number:
      r = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        r = JSON.parse(e);
      } catch {
        r = null;
      }
  }
  return r;
} }, $t = (e, t) => !$e(e, t), Pt = { attribute: !0, type: String, converter: nt, reflect: !1, useDefault: !1, hasChanged: $t };
Symbol.metadata ??= Symbol("metadata"), st.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let T = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, r = Pt) {
    if (r.state && (r.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((r = Object.create(r)).wrapped = !0), this.elementProperties.set(t, r), !r.noAccessor) {
      const a = Symbol(), i = this.getPropertyDescriptor(t, a, r);
      i !== void 0 && we(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, r, a) {
    const { get: i, set: n } = Ae(this.prototype, t) ?? { get() {
      return this[r];
    }, set(o) {
      this[r] = o;
    } };
    return { get: i, set(o) {
      const s = i?.call(this);
      n?.call(this, o), this.requestUpdate(t, s, a);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Pt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(D("elementProperties"))) return;
    const t = Ee(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(D("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(D("properties"))) {
      const r = this.properties, a = [...Ce(r), ...ke(r)];
      for (const i of a) this.createProperty(i, r[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const r = litPropertyMetadata.get(t);
      if (r !== void 0) for (const [a, i] of r) this.elementProperties.set(a, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [r, a] of this.elementProperties) {
      const i = this._$Eu(r, a);
      i !== void 0 && this._$Eh.set(i, r);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const r = [];
    if (Array.isArray(t)) {
      const a = new Set(t.flat(1 / 0).reverse());
      for (const i of a) r.unshift(Mt(i));
    } else t !== void 0 && r.push(Mt(t));
    return r;
  }
  static _$Eu(t, r) {
    const a = r.attribute;
    return a === !1 ? void 0 : typeof a == "string" ? a : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), r = this.constructor.elementProperties;
    for (const a of r.keys()) this.hasOwnProperty(a) && (t.set(a, this[a]), delete this[a]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return xe(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, r, a) {
    this._$AK(t, a);
  }
  _$ET(t, r) {
    const a = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, a);
    if (i !== void 0 && a.reflect === !0) {
      const n = (a.converter?.toAttribute !== void 0 ? a.converter : nt).toAttribute(r, a.type);
      this._$Em = t, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(t, r) {
    const a = this.constructor, i = a._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const n = a.getPropertyOptions(i), o = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : nt;
      this._$Em = i;
      const s = o.fromAttribute(r, n.type);
      this[i] = s ?? this._$Ej?.get(i) ?? s, this._$Em = null;
    }
  }
  requestUpdate(t, r, a, i = !1, n) {
    if (t !== void 0) {
      const o = this.constructor;
      if (i === !1 && (n = this[t]), a ??= o.getPropertyOptions(t), !((a.hasChanged ?? $t)(n, r) || a.useDefault && a.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, a)))) return;
      this.C(t, r, a);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, r, { useDefault: a, reflect: i, wrapped: n }, o) {
    a && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, o ?? r ?? this[t]), n !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || a || (r = void 0), this._$AL.set(t, r)), i === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (r) {
      Promise.reject(r);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
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
    let t = !1;
    const r = this._$AL;
    try {
      t = this.shouldUpdate(r), t ? (this.willUpdate(r), this._$EO?.forEach((a) => a.hostUpdate?.()), this.update(r)) : this._$EM();
    } catch (a) {
      throw t = !1, this._$EM(), a;
    }
    t && this._$AE(r);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((r) => r.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
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
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((r) => this._$ET(r, this[r])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
T.elementStyles = [], T.shadowRootOptions = { mode: "open" }, T[D("elementProperties")] = /* @__PURE__ */ new Map(), T[D("finalized")] = /* @__PURE__ */ new Map(), Me?.({ ReactiveElement: T }), (st.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const wt = globalThis, Ot = (e) => e, ot = wt.trustedTypes, zt = ot ? ot.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Jt = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, Kt = "?" + $, Le = `<${Kt}>`, E = document, H = () => E.createComment(""), I = (e) => e === null || typeof e != "object" && typeof e != "function", At = Array.isArray, Pe = (e) => At(e) || typeof e?.[Symbol.iterator] == "function", ut = `[ 	
\f\r]`, R = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Tt = /-->/g, Nt = />/g, A = RegExp(`>|${ut}(?:([^\\s"'>=/]+)(${ut}*=${ut}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ft = /'/g, Ut = /"/g, Xt = /^(?:script|style|textarea|title)$/i, Qt = (e) => (t, ...r) => ({ _$litType$: e, strings: t, values: r }), d = Qt(1), S = Qt(2), U = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), Vt = /* @__PURE__ */ new WeakMap(), C = E.createTreeWalker(E, 129);
function te(e, t) {
  if (!At(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return zt !== void 0 ? zt.createHTML(t) : t;
}
const Oe = (e, t) => {
  const r = e.length - 1, a = [];
  let i, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = R;
  for (let s = 0; s < r; s++) {
    const l = e[s];
    let c, h, p = -1, m = 0;
    for (; m < l.length && (o.lastIndex = m, h = o.exec(l), h !== null); ) m = o.lastIndex, o === R ? h[1] === "!--" ? o = Tt : h[1] !== void 0 ? o = Nt : h[2] !== void 0 ? (Xt.test(h[2]) && (i = RegExp("</" + h[2], "g")), o = A) : h[3] !== void 0 && (o = A) : o === A ? h[0] === ">" ? (o = i ?? R, p = -1) : h[1] === void 0 ? p = -2 : (p = o.lastIndex - h[2].length, c = h[1], o = h[3] === void 0 ? A : h[3] === '"' ? Ut : Ft) : o === Ut || o === Ft ? o = A : o === Tt || o === Nt ? o = R : (o = A, i = void 0);
    const g = o === A && e[s + 1].startsWith("/>") ? " " : "";
    n += o === R ? l + Le : p >= 0 ? (a.push(c), l.slice(0, p) + Jt + l.slice(p) + $ + g) : l + $ + (p === -2 ? s : g);
  }
  return [te(e, n + (e[r] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), a];
};
class B {
  constructor({ strings: t, _$litType$: r }, a) {
    let i;
    this.parts = [];
    let n = 0, o = 0;
    const s = t.length - 1, l = this.parts, [c, h] = Oe(t, r);
    if (this.el = B.createElement(c, a), C.currentNode = this.el.content, r === 2 || r === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (i = C.nextNode()) !== null && l.length < s; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const p of i.getAttributeNames()) if (p.endsWith(Jt)) {
          const m = h[o++], g = i.getAttribute(p).split($), P = /([.?@])?(.*)/.exec(m);
          l.push({ type: 1, index: n, name: P[2], strings: g, ctor: P[1] === "." ? Te : P[1] === "?" ? Ne : P[1] === "@" ? Fe : lt }), i.removeAttribute(p);
        } else p.startsWith($) && (l.push({ type: 6, index: n }), i.removeAttribute(p));
        if (Xt.test(i.tagName)) {
          const p = i.textContent.split($), m = p.length - 1;
          if (m > 0) {
            i.textContent = ot ? ot.emptyScript : "";
            for (let g = 0; g < m; g++) i.append(p[g], H()), C.nextNode(), l.push({ type: 2, index: ++n });
            i.append(p[m], H());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Kt) l.push({ type: 2, index: n });
      else {
        let p = -1;
        for (; (p = i.data.indexOf($, p + 1)) !== -1; ) l.push({ type: 7, index: n }), p += $.length - 1;
      }
      n++;
    }
  }
  static createElement(t, r) {
    const a = E.createElement("template");
    return a.innerHTML = t, a;
  }
}
function V(e, t, r = e, a) {
  if (t === U) return t;
  let i = a !== void 0 ? r._$Co?.[a] : r._$Cl;
  const n = I(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== n && (i?._$AO?.(!1), n === void 0 ? i = void 0 : (i = new n(e), i._$AT(e, r, a)), a !== void 0 ? (r._$Co ??= [])[a] = i : r._$Cl = i), i !== void 0 && (t = V(e, i._$AS(e, t.values), i, a)), t;
}
class ze {
  constructor(t, r) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = r;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: r }, parts: a } = this._$AD, i = (t?.creationScope ?? E).importNode(r, !0);
    C.currentNode = i;
    let n = C.nextNode(), o = 0, s = 0, l = a[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let c;
        l.type === 2 ? c = new W(n, n.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(n, l.name, l.strings, this, t) : l.type === 6 && (c = new Ue(n, this, t)), this._$AV.push(c), l = a[++s];
      }
      o !== l?.index && (n = C.nextNode(), o++);
    }
    return C.currentNode = E, i;
  }
  p(t) {
    let r = 0;
    for (const a of this._$AV) a !== void 0 && (a.strings !== void 0 ? (a._$AI(t, a, r), r += a.strings.length - 2) : a._$AI(t[r])), r++;
  }
}
class W {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, r, a, i) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = r, this._$AM = a, this.options = i, this._$Cv = i?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const r = this._$AM;
    return r !== void 0 && t?.nodeType === 11 && (t = r.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, r = this) {
    t = V(this, t, r), I(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== U && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Pe(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== u && I(this._$AH) ? this._$AA.nextSibling.data = t : this.T(E.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: r, _$litType$: a } = t, i = typeof a == "number" ? this._$AC(t) : (a.el === void 0 && (a.el = B.createElement(te(a.h, a.h[0]), this.options)), a);
    if (this._$AH?._$AD === i) this._$AH.p(r);
    else {
      const n = new ze(i, this), o = n.u(this.options);
      n.p(r), this.T(o), this._$AH = n;
    }
  }
  _$AC(t) {
    let r = Vt.get(t.strings);
    return r === void 0 && Vt.set(t.strings, r = new B(t)), r;
  }
  k(t) {
    At(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let a, i = 0;
    for (const n of t) i === r.length ? r.push(a = new W(this.O(H()), this.O(H()), this, this.options)) : a = r[i], a._$AI(n), i++;
    i < r.length && (this._$AR(a && a._$AB.nextSibling, i), r.length = i);
  }
  _$AR(t = this._$AA.nextSibling, r) {
    for (this._$AP?.(!1, !0, r); t !== this._$AB; ) {
      const a = Ot(t).nextSibling;
      Ot(t).remove(), t = a;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class lt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, r, a, i, n) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = r, this._$AM = i, this.options = n, a.length > 2 || a[0] !== "" || a[1] !== "" ? (this._$AH = Array(a.length - 1).fill(new String()), this.strings = a) : this._$AH = u;
  }
  _$AI(t, r = this, a, i) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = V(this, t, r, 0), o = !I(t) || t !== this._$AH && t !== U, o && (this._$AH = t);
    else {
      const s = t;
      let l, c;
      for (t = n[0], l = 0; l < n.length - 1; l++) c = V(this, s[a + l], r, l), c === U && (c = this._$AH[l]), o ||= !I(c) || c !== this._$AH[l], c === u ? t = u : t !== u && (t += (c ?? "") + n[l + 1]), this._$AH[l] = c;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Te extends lt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
class Ne extends lt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== u);
  }
}
class Fe extends lt {
  constructor(t, r, a, i, n) {
    super(t, r, a, i, n), this.type = 5;
  }
  _$AI(t, r = this) {
    if ((t = V(this, t, r, 0) ?? u) === U) return;
    const a = this._$AH, i = t === u && a !== u || t.capture !== a.capture || t.once !== a.once || t.passive !== a.passive, n = t !== u && (a === u || i);
    i && this.element.removeEventListener(this.name, this, a), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ue {
  constructor(t, r, a) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = r, this.options = a;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    V(this, t);
  }
}
const Ve = wt.litHtmlPolyfillSupport;
Ve?.(B, W), (wt.litHtmlVersions ??= []).push("3.3.2");
const je = (e, t, r) => {
  const a = r?.renderBefore ?? t;
  let i = a._$litPart$;
  if (i === void 0) {
    const n = r?.renderBefore ?? null;
    a._$litPart$ = i = new W(t.insertBefore(H(), n), n, void 0, r ?? {});
  }
  return i._$AI(e), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ct = globalThis;
class k extends T {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const r = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = je(r, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return U;
  }
}
k._$litElement$ = !0, k.finalized = !0, Ct.litElementHydrateSupport?.({ LitElement: k });
const Re = Ct.litElementPolyfillSupport;
Re?.({ LitElement: k });
(Ct.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const kt = (e) => (t, r) => {
  r !== void 0 ? r.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const De = { attribute: !0, type: String, converter: nt, reflect: !1, hasChanged: $t }, He = (e = De, t, r) => {
  const { kind: a, metadata: i } = r;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), a === "setter" && ((e = Object.create(e)).wrapped = !0), n.set(r.name, e), a === "accessor") {
    const { name: o } = r;
    return { set(s) {
      const l = t.get.call(this);
      t.set.call(this, s), this.requestUpdate(o, l, e, !0, s);
    }, init(s) {
      return s !== void 0 && this.C(o, void 0, e, s), s;
    } };
  }
  if (a === "setter") {
    const { name: o } = r;
    return function(s) {
      const l = this[o];
      t.call(this, s), this.requestUpdate(o, l, e, !0, s);
    };
  }
  throw Error("Unsupported decorator location: " + a);
};
function Z(e) {
  return (t, r) => typeof r == "object" ? He(e, t, r) : ((a, i, n) => {
    const o = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, a), o ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(e, t, r);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function j(e) {
  return Z({ ...e, state: !0, attribute: !1 });
}
var Ie = Object.defineProperty, Be = Object.getOwnPropertyDescriptor, ee = (e, t, r, a) => {
  for (var i = a > 1 ? void 0 : a ? Be(t, r) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (i = (a ? o(t, r, i) : o(i)) || i);
  return a && i && Ie(t, r, i), i;
};
let bt = class extends k {
  setConfig(e) {
    this.config = e;
  }
  render() {
    return d`
      <ha-alert alert-type="info">
        Configure entity IDs in YAML. Visual editor support can be expanded later.
      </ha-alert>
    `;
  }
};
ee([
  Z({ attribute: !1 })
], bt.prototype, "config", 2);
bt = ee([
  kt("atrea-amotion-card-editor")
], bt);
function qe(e, t) {
  e.dispatchEvent(
    new CustomEvent("hass-more-info", {
      bubbles: !0,
      composed: !0,
      detail: { entityId: t }
    })
  );
}
function b(e, t, r) {
  if (!(!r || t === "none")) {
    if (t === "history") {
      const a = `/history?entity_id=${encodeURIComponent(r)}`;
      window.history.pushState(null, "", a), window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: !1 } }));
      return;
    }
    qe(e, r);
  }
}
async function re(e, t, r, a) {
  const [i] = t.split(".");
  if (i === "climate") {
    if (r === "preset") {
      await e.callService("climate", "set_preset_mode", {
        entity_id: t,
        preset_mode: a
      });
      return;
    }
    if (r === "fan") {
      await e.callService("climate", "set_fan_mode", {
        entity_id: t,
        fan_mode: a
      });
      return;
    }
    if (r === "hvac") {
      await e.callService("climate", "set_hvac_mode", {
        entity_id: t,
        hvac_mode: a
      });
      return;
    }
  }
  await e.callService("select", "select_option", {
    entity_id: t,
    option: a
  });
}
async function We(e, t, r, a) {
  const i = a.map((s) => ({ option: s, value: Number.parseFloat(s) })).filter((s) => Number.isFinite(s.value));
  if (i.length === 0)
    return;
  const n = Math.max(0, Math.min(100, r)), o = i.reduce((s, l) => Math.abs(l.value - n) < Math.abs(s.value - n) ? l : s);
  await re(e, t, "fan", o.option);
}
const Ze = {
  compact: !1,
  show_airflow: !0,
  show_power: !1,
  show_filter_details: !0,
  fan_animation_max_rpm: 1800
}, Ge = {
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
function Ye(e) {
  return typeof e == "string" && e.trim().length > 0;
}
function Je(e) {
  if (!Ye(e.climate_entity))
    throw new Error("Missing required configuration: climate_entity");
}
function Ke(e) {
  return e === "light" || e === "dark" ? e : "auto";
}
function Xe(e) {
  if (!e || e.type !== "custom:atrea-amotion-card")
    throw new Error("Card type must be custom:atrea-amotion-card");
  return Je(e), {
    ...e,
    title: e.title ?? "Atrea Amotion",
    show_title: e.show_title ?? !0,
    theme_variant: Ke(e.theme_variant),
    entities: e.entities,
    layout: {
      ...Ze,
      ...e.layout
    },
    tap_actions: {
      ...Ge,
      ...e.tap_actions
    }
  };
}
function G(e) {
  return e === null || Number.isNaN(e) ? null : Math.min(100, Math.max(0, e));
}
function Qe(e, t = 0) {
  return e === null || Number.isNaN(e) ? "--" : e.toFixed(t);
}
function vt(e, t, r = 0) {
  if (e === null || Number.isNaN(e))
    return "--";
  const a = t ? ` ${t}` : "";
  return `${e.toFixed(r)}${a}`;
}
function yt(e) {
  return e.replace(/[_-]+/g, " ").trim().replace(/\b\w/g, (t) => t.toUpperCase());
}
const tr = /* @__PURE__ */ new Set(["unknown", "unavailable", "none"]), ct = /* @__PURE__ */ new Set(["on", "open", "opened", "true"]), ae = /* @__PURE__ */ new Set(["off", "closed", "close", "false"]), er = /* @__PURE__ */ new Set(["on", "dirty", "problem", "warning", "warn"]), rr = /* @__PURE__ */ new Set(["fault", "critical", "replace", "alarm"]);
function f(e, t) {
  if (t)
    return e.states[t];
}
function ar(e, t) {
  return f(e, t.climate_entity);
}
function M(e) {
  return !!e && !tr.has(String(e.state).toLowerCase());
}
function N(e) {
  if (e == null || e === "")
    return null;
  const t = Number(e);
  return Number.isFinite(t) ? t : null;
}
function Y(e) {
  if (typeof e == "boolean")
    return e;
  if (typeof e == "number")
    return e !== 0;
  const t = String(e ?? "").toLowerCase();
  return ct.has(t);
}
function ie(e) {
  return e?.attributes ?? {};
}
function F(e) {
  if (!M(e))
    return null;
  const t = Number(e?.state);
  return Number.isFinite(t) ? t : null;
}
function J(e, t) {
  return {
    entity: e,
    value: F(t),
    unit: typeof t?.attributes.unit_of_measurement == "string" ? String(t.attributes.unit_of_measurement) : null,
    available: M(t)
  };
}
function _(e, t, r) {
  const a = N(t);
  return {
    entity: e,
    value: a,
    unit: r,
    available: a !== null
  };
}
function jt(e, t, r, a, i, n) {
  return {
    speedEntity: e,
    speedPercent: G(F(t)),
    airflowEntity: r,
    airflow: F(a),
    airflowUnit: typeof a?.attributes.unit_of_measurement == "string" ? String(a.attributes.unit_of_measurement) : null,
    powerEntity: i,
    power: F(n),
    powerUnit: typeof n?.attributes.unit_of_measurement == "string" ? String(n.attributes.unit_of_measurement) : null,
    available: M(t)
  };
}
function K(e, t, r, a, i, n, o, s) {
  const l = G(N(t));
  return {
    speedEntity: e,
    speedPercent: l,
    airflowEntity: r,
    airflow: N(a),
    airflowUnit: i,
    powerEntity: n,
    power: N(o),
    powerUnit: s,
    available: l !== null
  };
}
function ne(e) {
  return e === null ? "unknown" : e <= 0 ? "closed" : e >= 100 ? "open" : "partial";
}
function dt(e, t) {
  if (!e)
    return {
      entity: e,
      percentOpen: null,
      state: "unavailable",
      available: !1
    };
  if (!M(t))
    return {
      entity: e,
      percentOpen: null,
      state: "unavailable",
      available: !1
    };
  let a = G(F(t));
  if (a === null) {
    const i = String(t?.state ?? "").toLowerCase();
    ct.has(i) ? a = 100 : ae.has(i) && (a = 0);
  }
  return {
    entity: e,
    percentOpen: a,
    state: ne(a),
    available: !0
  };
}
function O(e, t) {
  let a = G(N(t));
  if (a === null) {
    const i = String(t ?? "").toLowerCase();
    ct.has(i) ? a = 100 : ae.has(i) && (a = 0);
  }
  return {
    entity: e,
    percentOpen: a,
    state: a === null ? "unavailable" : ne(a),
    available: a !== null
  };
}
function ir(e) {
  return e === null ? "unknown" : e <= 15 ? "critical" : e <= 30 ? "warning" : "normal";
}
function Rt(e, t, r, a, i) {
  const n = !!t || !!a, o = String(r?.state ?? "").toLowerCase(), s = G(F(i));
  let l = "unknown";
  return rr.has(o) ? l = "critical" : er.has(o) ? l = s !== null && s <= 15 ? "critical" : "warning" : s !== null ? l = ir(s) : n && (l = "normal"), {
    statusEntity: t,
    lifeEntity: a,
    severity: l,
    lifePercent: s,
    label: e,
    available: n
  };
}
function X(e, t, r) {
  const a = N(r);
  let i = "unknown";
  return a !== null && (a < 15 ? i = "critical" : a <= 30 ? i = "warning" : i = "normal"), {
    statusEntity: void 0,
    lifeEntity: t,
    severity: i,
    lifePercent: a,
    label: e,
    available: a !== null
  };
}
function nr(e, t, r, a) {
  const i = a ?? t, n = Array.isArray(i?.attributes.options) ? i?.attributes.options.filter((s) => typeof s == "string") : [];
  return {
    climateEntity: void 0,
    currentLabel: M(t) ? yt(t?.state ?? "") : M(a) ? yt(a?.state ?? "") : null,
    hvac: { current: null, options: [], controllable: !1 },
    preset: { current: null, options: [], controllable: !1 },
    fan: { current: null, options: [], controllable: !1 },
    fallbackEntity: r,
    fallbackOptions: n,
    fallbackControllable: !!r && n.length > 0
  };
}
function or(e, t, r) {
  const a = ie(t), i = Array.isArray(a.preset_modes) ? a.preset_modes.map((p) => String(p)) : [], n = Array.isArray(a.fan_modes) ? a.fan_modes.map((p) => String(p)) : [], o = Array.isArray(a.hvac_modes) ? a.hvac_modes.map((p) => String(p)) : [], s = typeof t?.attributes.preset_mode == "string" ? t.attributes.preset_mode : typeof a.preset_mode == "string" ? a.preset_mode : null, l = t?.attributes.fan_mode !== void 0 ? String(t.attributes.fan_mode) : a.fan_mode !== void 0 ? String(a.fan_mode) : t?.attributes.fan_power_req_sup !== void 0 ? String(t.attributes.fan_power_req_sup) : null, c = typeof t?.state == "string" ? t.state : null, h = s !== null ? s : typeof r == "string" ? r : l !== null ? l : c !== null ? c : null;
  return {
    climateEntity: e,
    currentLabel: h ? yt(h) : null,
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
function Dt(e) {
  return M(e) ? ct.has(String(e?.state ?? "").toLowerCase()) : !1;
}
function sr(e, t) {
  const r = Dt(e), a = Dt(t), i = [];
  return r && i.push("Warning"), a && i.push("Fault"), { warning: r, fault: a, labels: i };
}
function lr(e) {
  const t = [
    e.temperatures.oda.available,
    e.temperatures.eta.available,
    e.temperatures.sup.available,
    e.temperatures.eha.available,
    e.fans.supply.available,
    e.fans.extract.available,
    e.dampers.bypass.available
  ], r = t.filter(Boolean).length;
  return r === t.length ? "full" : r >= 4 ? "partial" : "minimal";
}
function cr(e, t) {
  const r = t.entities, a = ar(e, t), i = ie(a), n = typeof i.temperature_unit == "string" ? i.temperature_unit : "°C", o = typeof i.airflow_unit == "string" ? i.airflow_unit : null, s = typeof i.power_unit == "string" ? i.power_unit : null, l = f(e, r?.temperatures?.oda), c = f(e, r?.temperatures?.eta), h = f(e, r?.temperatures?.sup), p = f(e, r?.temperatures?.eha), m = f(e, r?.fans?.supply_speed), g = f(e, r?.fans?.extract_speed), P = f(e, r?.fans?.supply_airflow), oe = f(e, r?.fans?.extract_airflow), se = f(e, r?.fans?.supply_power), le = f(e, r?.fans?.extract_power), ce = f(e, r?.dampers?.bypass), pe = f(e, r?.dampers?.oda), ue = f(e, r?.dampers?.eta), de = f(e, r?.filters?.oda), he = f(e, r?.filters?.eta), fe = f(e, r?.filters?.oda_life), me = f(e, r?.filters?.eta_life), ge = f(e, r?.mode?.current), be = f(e, r?.mode?.select), ve = f(e, r?.alerts?.warning), ye = f(e, r?.alerts?.fault), Et = {
    temperatures: {
      oda: _(r?.temperatures?.oda ?? t.climate_entity, i.outside_air_temperature, n).available ? _(r?.temperatures?.oda ?? t.climate_entity, i.outside_air_temperature, n) : J(r?.temperatures?.oda, l),
      eta: _(r?.temperatures?.eta ?? t.climate_entity, i.extract_air_temperature, n).available ? _(r?.temperatures?.eta ?? t.climate_entity, i.extract_air_temperature, n) : J(r?.temperatures?.eta, c),
      sup: _(r?.temperatures?.sup ?? t.climate_entity, i.supply_air_temperature, n).available ? _(r?.temperatures?.sup ?? t.climate_entity, i.supply_air_temperature, n) : J(r?.temperatures?.sup, h),
      eha: _(r?.temperatures?.eha ?? t.climate_entity, i.exhaust_air_temperature, n).available ? _(r?.temperatures?.eha ?? t.climate_entity, i.exhaust_air_temperature, n) : J(r?.temperatures?.eha, p)
    },
    fans: {
      supply: K(r?.fans?.supply_speed ?? t.climate_entity, i.supply_fan_speed_percent, r?.fans?.supply_airflow, i.supply_airflow, o, r?.fans?.supply_power, i.supply_power, s).available ? K(r?.fans?.supply_speed ?? t.climate_entity, i.supply_fan_speed_percent, r?.fans?.supply_airflow, i.supply_airflow, o, r?.fans?.supply_power, i.supply_power, s) : jt(r?.fans?.supply_speed, m, r?.fans?.supply_airflow, P, r?.fans?.supply_power, se),
      extract: K(r?.fans?.extract_speed ?? t.climate_entity, i.extract_fan_speed_percent, r?.fans?.extract_airflow, i.extract_airflow, o, r?.fans?.extract_power, i.extract_power, s).available ? K(r?.fans?.extract_speed ?? t.climate_entity, i.extract_fan_speed_percent, r?.fans?.extract_airflow, i.extract_airflow, o, r?.fans?.extract_power, i.extract_power, s) : jt(r?.fans?.extract_speed, g, r?.fans?.extract_airflow, oe, r?.fans?.extract_power, le)
    },
    dampers: {
      bypass: O(r?.dampers?.bypass ?? t.climate_entity, i.bypass_position_percent).available ? O(r?.dampers?.bypass ?? t.climate_entity, i.bypass_position_percent) : dt(r?.dampers?.bypass, ce),
      oda: O(r?.dampers?.oda ?? t.climate_entity, i.oda_damper_percent).available ? O(r?.dampers?.oda ?? t.climate_entity, i.oda_damper_percent) : dt(r?.dampers?.oda, pe),
      eta: O(r?.dampers?.eta ?? t.climate_entity, i.eta_damper_percent).available ? O(r?.dampers?.eta ?? t.climate_entity, i.eta_damper_percent) : dt(r?.dampers?.eta, ue)
    },
    filters: {
      oda: X("ODA filter", r?.filters?.oda_life ?? t.climate_entity, i.filter_days_remaining).available ? X("ODA filter", r?.filters?.oda_life ?? t.climate_entity, i.filter_days_remaining) : Rt("ODA filter", r?.filters?.oda, de, r?.filters?.oda_life, fe),
      eta: X("ETA filter", r?.filters?.eta_life ?? t.climate_entity, i.filter_days_remaining).available ? X("ETA filter", r?.filters?.eta_life ?? t.climate_entity, i.filter_days_remaining) : Rt("ETA filter", r?.filters?.eta, he, r?.filters?.eta_life, me)
    },
    mode: (() => {
      const w = or(t.climate_entity, a, i.current_mode);
      return w.hvac.controllable || w.preset.controllable || w.fan.controllable || w.currentLabel ? w : nr(r?.mode?.current, ge, r?.mode?.select, be);
    })(),
    alerts: i.warning !== void 0 || i.fault !== void 0 ? {
      warning: Y(i.warning),
      fault: Y(i.fault),
      labels: [Y(i.warning) ? "Warning" : null, Y(i.fault) ? "Fault" : null].filter((w) => !!w)
    } : sr(ve, ye)
  };
  return {
    ...Et,
    availability: lr(Et)
  };
}
var pr = Object.defineProperty, ur = Object.getOwnPropertyDescriptor, pt = (e, t, r, a) => {
  for (var i = a > 1 ? void 0 : a ? ur(t, r) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (i = (a ? o(t, r, i) : o(i)) || i);
  return a && i && pr(t, r, i), i;
};
const dr = 1, hr = 2, Ht = 4, fr = 8, mr = 16, gr = "unavailable", br = {
  current_humidity: "Current humidity",
  current_temperature: "Current temperature",
  fan_mode: "Fan mode",
  preset_mode: "Mode",
  swing_horizontal_mode: "Horizontal swing mode",
  swing_mode: "Swing mode"
};
function vr(e) {
  return e.replace(/_/g, " ").split(" ").filter(Boolean).map((t) => t.charAt(0).toUpperCase() + t.slice(1)).join(" ");
}
function It(e) {
  return Array.isArray(e) ? e.map((t) => String(t)) : [];
}
function z(e, t) {
  return ((typeof e.attributes.supported_features == "number" ? e.attributes.supported_features : 0) & t) !== 0;
}
function ht(e) {
  return String(e.state).toLowerCase() === gr;
}
function Q(e) {
  return e != null && e !== "";
}
function ft(e, t, r) {
  return e.formatEntityAttributeName?.(t, r) ?? br[r] ?? vr(r);
}
function yr(e, t) {
  const r = Number(e);
  if (Number.isFinite(r)) {
    const a = typeof t == "string" && t ? ` ${t}` : "";
    return `${r.toFixed(1)}${a}`;
  }
  return String(e);
}
function tt(e, t, r, a = t.attributes[r]) {
  const i = e.formatEntityAttributeValue?.(t, r, a);
  if (i)
    return i;
  if (r === "current_temperature" || r === "temperature")
    return yr(a, t.attributes.temperature_unit);
  if (r === "current_humidity" || r === "humidity") {
    const n = Number(a);
    return Number.isFinite(n) ? `${n.toFixed(0)} %` : String(a);
  }
  return String(a);
}
let q = class extends k {
  constructor() {
    super(...arguments), this._mainControl = "temperature", this._handleFanModeChanged = (e) => {
      const t = e.detail.item?.value;
      !t || !this.stateObj || this._callServiceHelper(this.stateObj.attributes.fan_mode, t, "set_fan_mode", {
        fan_mode: t
      });
    }, this._handlePresetModeChanged = (e) => {
      const t = e.detail.item?.value;
      !t || !this.stateObj || this._callServiceHelper(this.stateObj.attributes.preset_mode, t, "set_preset_mode", {
        preset_mode: t
      });
    };
  }
  willUpdate(e) {
    e.has("stateObj") && this.stateObj && this._mainControl === "humidity" && !z(this.stateObj, Ht) && (this._mainControl = "temperature");
  }
  render() {
    if (!this.stateObj)
      return u;
    const e = this.stateObj, t = e.attributes, r = z(e, Ht) && Q(t.humidity), a = z(e, dr) || z(e, hr) || Q(t.temperature), i = It(t.preset_modes), n = It(t.fan_modes), o = t.current_temperature, s = t.current_humidity ?? t.humidity;
    return d`
      <div class="current">
        ${Q(o) ? d`
              <div>
                <p class="label">${ft(this.hass, e, "current_temperature")}</p>
                <p class="value">${tt(this.hass, e, "current_temperature", o)}</p>
              </div>
            ` : u}
        ${Q(s) ? d`
              <div>
                <p class="label">${ft(this.hass, e, "current_humidity")}</p>
                <p class="value">${tt(this.hass, e, "current_humidity", s)}</p>
              </div>
            ` : u}
      </div>

      <div class="thermostat-block">
        <div class="controls">
          ${a && this._mainControl === "temperature" ? d`
                <ha-state-control-climate-temperature
                  .hass=${this.hass}
                  .stateObj=${e}
                ></ha-state-control-climate-temperature>
              ` : u}
          ${r && this._mainControl === "humidity" ? d`
                <ha-state-control-climate-humidity
                  .hass=${this.hass}
                  .stateObj=${e}
                ></ha-state-control-climate-humidity>
              ` : u}
          ${r && a ? d`
                <ha-icon-button-group>
                  <ha-icon-button-toggle
                    .selected=${this._mainControl === "temperature"}
                    .disabled=${ht(e)}
                    .label=${this.hass.localize?.("ui.dialogs.more_info_control.climate.temperature") ?? "Temperature"}
                    .control=${"temperature"}
                    @click=${this._setMainControl}
                  >
                    T
                  </ha-icon-button-toggle>
                  <ha-icon-button-toggle
                    .selected=${this._mainControl === "humidity"}
                    .disabled=${ht(e)}
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
        ${(z(e, mr) || i.length > 0) && i.length > 0 ? this._renderTile(
      this.hass.localize?.("ui.card.climate.mode") ?? "Mode",
      typeof t.preset_mode == "string" ? t.preset_mode : "",
      i,
      this._handlePresetModeChanged,
      (l) => tt(this.hass, e, "preset_mode", l)
    ) : u}
        ${(z(e, fr) || n.length > 0) && n.length > 0 ? this._renderTile(
      ft(this.hass, e, "fan_mode"),
      t.fan_mode !== void 0 ? String(t.fan_mode) : "",
      n,
      this._handleFanModeChanged,
      (l) => tt(this.hass, e, "fan_mode", l)
    ) : u}
        </div>
      </div>
    `;
  }
  _renderTile(e, t, r, a, i) {
    return d`
      <div class="select-tile">
        <ha-control-select-menu
          .hass=${this.hass}
          .label=${e}
          .value=${t}
          .disabled=${!this.stateObj || ht(this.stateObj)}
          .options=${r.map((n) => ({
      value: n,
      label: i(n)
    }))}
          @wa-select=${a}
        ></ha-control-select-menu>
      </div>
    `;
  }
  _setMainControl(e) {
    e.stopPropagation();
    const t = e.currentTarget.control;
    t && (this._mainControl = t);
  }
  async _callServiceHelper(e, t, r, a) {
    if (!this.stateObj || e === t)
      return;
    a.entity_id = this.stateObj.entity_id;
    const i = this.stateObj;
    await this.hass.callService("climate", r, a), await new Promise((n) => {
      window.setTimeout(n, 2e3);
    }), this.stateObj === i && (this.stateObj = void 0, await this.updateComplete, this.stateObj === void 0 && (this.stateObj = i));
  }
  static get styles() {
    return Yt`
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

      @media (max-width: 520px) {
        .selects {
          grid-template-columns: minmax(0, 180px);
        }
      }
    `;
  }
};
pt([
  Z({ attribute: !1 })
], q.prototype, "hass", 2);
pt([
  Z({ attribute: !1 })
], q.prototype, "stateObj", 2);
pt([
  j()
], q.prototype, "_mainControl", 2);
q = pt([
  kt("atrea-more-info-climate")
], q);
const _r = "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";
function xr(e, t) {
  const r = typeof t?.attributes.unit_name == "string" ? t.attributes.unit_name : void 0, a = typeof t?.attributes.friendly_name == "string" ? t.attributes.friendly_name : void 0;
  return r ?? a ?? "Ventilation unit";
}
function $r(e, t, r) {
  const a = e.states[t.climate_entity];
  return d`
    <ha-dialog open @closed=${r} .heading=${!1}>
      <ha-icon-button
        slot="headerNavigationIcon"
        class="more-info-close"
        @click=${r}
        .label=${"Close dialog"}
        title="Close dialog"
        aria-label="Close dialog"
      >
        <ha-svg-icon .path=${_r}></ha-svg-icon>
      </ha-icon-button>
      <div slot="headerTitle" class="more-info-dialog-title">${xr(t, a)}</div>
      ${a ? d`
            <atrea-more-info-climate .hass=${e} .stateObj=${a}></atrea-more-info-climate>
          ` : u}
    </ha-dialog>
  `;
}
var wr = "M12,6V9L16,5L12,1V4A8,8 0 0,0 4,12C4,13.57 4.46,15.03 5.24,16.26L6.7,14.8C6.25,13.97 6,13 6,12A6,6 0 0,1 12,6M18.76,7.74L17.3,9.2C17.74,10.04 18,11 18,12A6,6 0 0,1 12,18V15L8,19L12,23V20A8,8 0 0,0 20,12C20,10.43 19.54,8.97 18.76,7.74Z", Ar = "M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z", Cr = "M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z", kr = "M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z", Er = "M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13", Sr = "M20.79,13.95L18.46,14.57L16.46,13.44V10.56L18.46,9.43L20.79,10.05L21.31,8.12L19.54,7.65L20,5.88L18.07,5.36L17.45,7.69L15.45,8.82L13,7.38V5.12L14.71,3.41L13.29,2L12,3.29L10.71,2L9.29,3.41L11,5.12V7.38L8.5,8.82L6.5,7.69L5.92,5.36L4,5.88L4.47,7.65L2.7,8.12L3.22,10.05L5.55,9.43L7.55,10.56V13.45L5.55,14.58L3.22,13.96L2.7,15.89L4.47,16.36L4,18.12L5.93,18.64L6.55,16.31L8.55,15.18L11,16.62V18.88L9.29,20.59L10.71,22L12,20.71L13.29,22L14.7,20.59L13,18.88V16.62L15.5,15.17L17.5,16.3L18.12,18.63L20,18.12L19.53,16.35L21.3,15.88L20.79,13.95M9.5,10.56L12,9.11L14.5,10.56V13.44L12,14.89L9.5,13.44V10.56Z", Mr = "M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z";
function Lr(e) {
  if (e === null || e <= 0)
    return "0s";
  const r = 2.8 - Math.min(100, Math.max(0, e)) * 0.022;
  return `${Math.max(0.5, r).toFixed(2)}s`;
}
function mt(e) {
  if (e === null || e <= 0)
    return "0s";
  const r = 4.2 - Math.min(100, Math.max(0, e)) * 0.03;
  return `${Math.max(0.9, r).toFixed(2)}s`;
}
const Pr = "0 0 1000 620", v = {
  supplyMain: "M 40 410 h 268 l 64 -64 m 257 -92 64 -64 h 267",
  extractMain: "M 40 190 h 267 l 90 90 L 563 280 693 410 h 267",
  unitOutline: "M 165.5 510 V 90 h 670 v 420 h -670",
  bypassInner: "M 372 346 l 26 -26 165 0 65 -65",
  exchangerOutline: "M 418 208 l -92 92 92 92 h 165 l 92 -92 -92 -92 z",
  filterLeft: "M 413 397 403 407 311 315 l 10 -10 z",
  filterRight: "M 588 397 598 407 690 315 680 305 Z"
}, et = {
  supply: { x: 745, y: 190 },
  extract: { x: 255, y: 190 }
}, x = {
  eha: { x: 105, y: 135 },
  oda: { x: 105, y: 485 },
  sup: { x: 895, y: 135 },
  eta: { x: 895, y: 485 }
}, rt = {
  oda: { x: 95, y: 410 },
  eta: { x: 905, y: 410 }
};
function Or(e, t) {
  return ["badge", e ? "" : "is-muted", t].filter(Boolean).join(" ");
}
function at(e, t, r, a, i) {
  return S`
    <g class=${Or(t.available, "temp-badge")} transform="translate(${r}, ${a})" @click=${i}>
      <rect x="-56" y="-24" width="112" height="48" rx="14"></rect>
      <text x="0" y="5" class="badge-value temperature-only">${vt(t.value, t.unit, 1)}</text>
    </g>
  `;
}
function Bt(e, t, r, a, i) {
  const n = Lr(t.speedPercent);
  return S`
    <g class="fan-group" transform="translate(${r}, ${a})" @click=${i}>
      <circle class="fan-shell" r="44"></circle>
      <g class="fan-rotor">
        <path d="M 0 -32 C 18 -32 27 -13 11 -4 C 7 0 0 -4 0 -10 Z"></path>
        <path d="M 32 0 C 32 18 13 27 4 11 C 0 7 4 0 10 0 Z"></path>
        <path d="M 0 32 C -18 32 -27 13 -11 4 C -7 0 0 4 0 10 Z"></path>
        <path d="M -32 0 C -32 -18 -13 -27 -4 -11 C 0 -7 -4 0 -10 0 Z"></path>
        ${t.speedPercent && t.speedPercent > 0 ? S`<animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur=${n} repeatCount="indefinite"></animateTransform>` : u}
      </g>
      <circle class="fan-core" r="9"></circle>
    </g>
  `;
}
function zr(e) {
  return (e.percentOpen ?? 0) / 100 * 90;
}
function qt(e, t, r, a, i, n) {
  const s = 90 - zr(t);
  return S`
    <g class=${["damper", t.available ? "" : "is-muted"].filter(Boolean).join(" ")} transform="translate(${r}, ${a})" @click=${n}>
      <circle r="20" class="damper-ring"></circle>
      <g transform=${`rotate(${-s})`}>
        <rect x="-18" y="-2.5" width="36" height="5" rx="2.5" class="damper-blade"></rect>
      </g>
    </g>
  `;
}
function gt(e, t, r) {
  return Math.round(e + (t - e) * r);
}
function Wt(e) {
  const t = e.replace("#", "");
  return [
    Number.parseInt(t.slice(0, 2), 16),
    Number.parseInt(t.slice(2, 4), 16),
    Number.parseInt(t.slice(4, 6), 16)
  ];
}
function Tr(e, t) {
  const r = Math.max(e[0].at, Math.min(e[e.length - 1].at, t));
  for (let a = 0; a < e.length - 1; a += 1) {
    const i = e[a], n = e[a + 1];
    if (r >= i.at && r <= n.at) {
      const o = (r - i.at) / (n.at - i.at || 1), s = Wt(i.color), l = Wt(n.color);
      return `rgb(${gt(s[0], l[0], o)} ${gt(s[1], l[1], o)} ${gt(s[2], l[2], o)})`;
    }
  }
  return e[e.length - 1].color;
}
function Nr(e) {
  if (e.lifePercent === null)
    return {
      color: "rgb(139 160 181)",
      opacity: e.available ? 0.72 : 0.35,
      text: e.available ? "service" : "N/C",
      critical: !1
    };
  const t = Math.max(0, Math.min(60, e.lifePercent)), r = Tr(
    [
      { at: 0, color: "#d93c3c" },
      { at: 15, color: "#e06a3a" },
      { at: 30, color: "#d6bf47" },
      { at: 60, color: "#8ba0b5" }
    ],
    t
  ), a = 0.58 + (1 - t / 60) * 0.34;
  return {
    color: r,
    opacity: a,
    text: `${Qe(e.lifePercent, 0)} d`,
    critical: t < 15
  };
}
function Zt(e, t, r, a) {
  const i = Nr(e);
  return S`
    <g
      class=${["filter", `is-${e.severity}`, e.available ? "" : "is-muted", i.critical ? "is-critical-pulse" : ""].filter(Boolean).join(" ")}
      @click=${a}
      style=${`--filter-color:${i.color}; --filter-opacity:${i.opacity};`}
    >
      <path class="filter-body" d=${t}></path>
      ${r.map((n) => S`<path class="filter-slat" d=${n}></path>`)}
    </g>
  `;
}
const Fr = [
  { id: "standby", label: "Standby", path: Er, matches: ["standby", "stand-by", "off"] },
  { id: "interval", label: "Interval", path: wr, matches: ["interval", "intervals", "auto"] },
  { id: "ventilation", label: "Ventilation only", path: Sr, matches: ["ventilation", "ventilation only"] },
  { id: "night-cooling", label: "Night cooling", path: Mr, matches: ["night cooling", "night_cooling", "cooling"] },
  { id: "disbalance", label: "Disbalance", path: kr, matches: ["disbalance", "imbalance"] },
  { id: "fan", label: "Fan", path: Cr, matches: [] }
];
function Ur(e, t) {
  const r = e.map((a) => ({ option: a, lower: a.toLowerCase() }));
  for (const a of t) {
    const i = r.find(({ lower: n }) => n === a || n.includes(a));
    if (i)
      return i.option;
  }
  return null;
}
function Vr(e) {
  return e.length === 0 ? d`` : d`
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
          ${e.map(
    (t) => d`
              <div
                role="radio"
                id=${t.id}
                class=${["official-option", t.selected ? "selected" : "", t.disabled ? "disabled" : ""].filter(Boolean).join(" ")}
                tabindex="-1"
                aria-checked=${t.selected ? "true" : "false"}
                aria-label=${t.label}
                title=${t.label}
                @click=${t.action}
              >
                <div class="official-option-content">
                  <ha-svg-icon .path=${t.iconPath}></ha-svg-icon>
                </div>
              </div>
            `
  )}
        </div>
      </div>
    </div>
  `;
}
function jr(e, t, r) {
  const a = t.mode.preset.options, i = t.mode.preset.current?.toLowerCase() ?? "";
  return Vr(
    Fr.map((n) => {
      if (n.id === "fan")
        return {
          action: r.onToggleFanPopup,
          disabled: !t.mode.fan.controllable,
          iconPath: n.path,
          id: `action-${n.id}`,
          label: n.label,
          selected: r.fanPopupOpen
        };
      const o = Ur(a, [...n.matches]);
      return {
        action: o && t.mode.climateEntity ? () => re(e, t.mode.climateEntity, "preset", o) : void 0,
        disabled: !o || !t.mode.climateEntity,
        iconPath: n.path,
        id: `action-${n.id}`,
        label: n.label,
        selected: !!o && i === o.toLowerCase()
      };
    })
  );
}
function Rr(e, t) {
  if (!t.fanPopupOpen || !e.mode.fan.controllable)
    return d``;
  const r = Math.round(Math.max(0, Math.min(100, t.fanPopupValue)));
  return d`
    <div class="fan-popup-shell">
      <div class="fan-popup official-card-feature">
        <div class="fan-popup-header">
          <span class="fan-popup-title">Fan speed</span>
          <span class="fan-popup-value">${r}%</span>
        </div>
        <div class="fan-popup-controls">
          <button class="fan-step-button" type="button" aria-label="Decrease fan speed" @click=${t.onFanDecrease}>-</button>
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
    t.onFanPreviewChange(Number.parseInt(i.value, 10));
  }}
              @change=${(a) => {
    const i = a.currentTarget;
    t.onFanValueCommit(Number.parseInt(i.value, 10));
  }}
            />
          </div>
          <button class="fan-step-button" type="button" aria-label="Increase fan speed" @click=${t.onFanIncrease}>+</button>
        </div>
      </div>
    </div>
  `;
}
function Dr(e) {
  return !e.alerts.warning && !e.alerts.fault ? d`` : d`
    <div class="alert-strip ${e.alerts.fault ? "is-fault" : "is-warning"}">
      ${e.alerts.labels.join(" / ")}
    </div>
  `;
}
function Hr(e, t, r, a) {
  const i = t.layout, n = r.dampers.bypass.percentOpen ?? 0, o = n <= 0, s = n >= 100 ? 0.3 : n > 0 ? 0.65 : 1, l = n <= 0 ? 0 : n >= 100 ? 1 : 0.35 + n / 150, c = t.tap_actions, h = e.localize?.("ui.panel.lovelace.cards.show_more_info") ?? "Show more information";
  return d`
    ${Dr(r)}
    ${t.show_title ? d`<p class="title">${t.title}</p>` : u}

    <div class="container">
      ${Rr(r, a)}

      <div class="main-stage">
        <div class="canvas-wrap">
          <svg class="unit-svg" viewBox=${Pr} role="img" aria-label="Atrea Amotion ventilation scheme">
                <g class="background-layer">
                  <rect class="unit-frame" x="40" y="70" width="920" height="480" rx="18"></rect>
                  <g class="side-decor outside" transform="translate(50 240) scale(0.4)">
                    <path d="M200 176c3 28-28 26-47 24-16-1.9-28-14-40-24-13 19-41 23-61 13-34-30-11-42-15-55-15-12-31-24-33-41 1.7-17 20-25 34-27-3.7-10-4.1-22 2.6-31 15-21 50-11 67-3.4 2.5.27 6.9 5.5 7.8 3.2 2.4-13 15-20 27-24 25-6.9 71-1.5 68 28-1.2 12-9.4 23-20 28 17-.98 54 10 49 29-3.8 18-21 15-33 19 17 17 34 33 19 55-6.6 7.5-18 6.4-27 7z"></path>
                    <path d="M122 64v.1c-17 .93-31 5.1-43 17l.005.005c-5 6.6-9.2 13-9.2 22l-.1.1c.92 9.2 6.7 14 13 21l5.2-4.6c-4.2-4.9-9.9-8.7-11-15-.58-7.4 3.2-14 7.3-19l-.001-.002c11-13 23-14 38-15zm44 43-4.3 5.5-.1.5c9.2 6.3 14 14 15 25 1.2 13-3.8 21-14 25l2 6.7c5.3-1.5 10-5 13-8.4 5.3-6.9 6-16 5.5-23-.19-2-.6-4-1-5.9h-.001c-2.4-10-8.6-19-16-24zm-60 70v14c6.1 5.5 9.3 12 10 20 1.5 11 6 16 12 26 2.4-7.3 4.4-15 6.5-22h.001v-.001c1.7-7.2 5.7-12 9.3-17l-11-8.6-.1.1c-2.1 2.8-4.5 4.9-6.4 7.2-2.6-5.6-5.9-12-9.6-15-3.5-3-6.2-4.7-11-4.7z"></path>
                    <path d="m87 189-8.1 11c13 13 21 22 21 39-6.3 38-25 76-42 102 12-3.6 21-6.6 31-7.5 2.2-.011 2.4.81 3.5 2.5 1.8 4.8 2.4 10 3.4 15 5.9-5.3 12-9.8 18-15 5.4-4.1 9.7-5 16-5v-.001c12 2.9 23 7.2 35 11-7.3-18-15-38-16-56 .52-14 .91-26 2.3-40 1.6-7.8 8.3-36 17-38l1.1-14c-3.5-.37-7.3.73-9.9 2-9.5 5.9-12 17-16 25l.011.005c-3.2 7.3-5.2 16-6.1 22-1.1 12-2 24-2.5 35 .7 14 2.7 29 6.7 40-7.5-2.6-17-2.9-24-1.1-5.2 1.8-9.2 4.7-14 7.9-1.3-2.3-3-4.4-5.3-5.8-3.5-1.4-7.4-1.7-11-1.1 4.6-9 8.7-18 12-28 4.8-13 9-26 12-40l.17.039c5.6-27-2.4-46-25-63z"></path>
                    <path d="M170 0c-10 .055-20 1.5-30 4-11 3.8-22 11-27 21-15-5.3-25-9.4-40-9.9-2-.1-4-.1-6-.1-13-.35-25 5.7-31 16-5.7 9.5-6.8 19-4.7 29-14 4.3-26 12-31 25-2 21 11 39 27 49-2.6 3.6-3.9 7.3-4.3 12-1 18 11 38 23 46 11 6.7 22 9.6 34 9.1v-.003c13-1.7 26-5.5 35-16l4.2 3.9c17 15 38 20 61 18 14-2.1 26-7.3 28-22 .1-.99.1-2 .1-3 13-.86 23-3.9 29-16 5.1-11 5.2-18 .8-28-3.9-7.3-10-14-15-19 15-2.6 26-15 26-24 .12-1.6.14-3.5.004-5-6.3-15-24-25-39-29 5.6-7.2 8.7-14 9.2-23h.1c.04-1.2-.034-2.4-.1-3.6-.59-7.2-3-12-7.3-17-8.3-9.9-20-14-32-15-3.5-.29-6.9-.43-10-.41zm-1.5 14c2.1-.01 4.2.041 6.3.14 13 .19 29 6.4 31 20 .059.73.1 1.3-.005 2.1h.001c-3.4 24-30 30-50 39l-12 5.8 18-3.1c24-4.4 41-9.4 62 1.5 6.8 4.2 13 8.6 10 17-7.7 9-28 11-40 14 9 8.2 19 17 26 26 7.5 8.4 6.9 21 1.2 29-9.4 5.3-20 4.1-30 4.1 2.1 8.2 3.7 18-3.8 23-23 8.3-43 1.2-60-13-5-4.1-9.7-8.2-15-12-7.4 12-20 20-34 22v.006c-8.7.62-16-1.4-24-5.6-12-7.1-19-22-19-34 .29-3.7 3.7-6.9 6.2-7.8l27-7.3-27-6.2-.006.02-.094-.02c-10-4.4-21-12-26-22-12-22 11-30 32-33-2.2-8.2-6-18-4.2-26 3-11 8.5-16 20-17 23-1.3 40 5.6 57 19 1.3-7.2.89-14 5.7-20l1.1-1.3c11-9.1 25-12 40-12z"></path>
                  </g>
                  <path class="side-decor inside" d="M95 24 62 3 9 38h8v55.5h90V38h9.5l-20-13V6h-1.3z" transform="translate(835 255)"></path>
                  <path class="unit-outline" d=${v.unitOutline}></path>
                  <path class="exchanger-outline" d=${v.exchangerOutline}></path>
                </g>

                <g class="duct-layer">
                  <path class="duct supply" d=${v.supplyMain}></path>
                  <path class="duct extract" d=${v.extractMain}></path>
                  <path class=${o ? "duct bypass is-closed" : "duct bypass"} d=${v.bypassInner}></path>
                </g>

                <g class="flow-layer">
                  <path class="flow supply" style=${`opacity:${s}; --flow-duration:${mt(r.fans.supply.speedPercent)};`} d=${v.supplyMain}></path>
                  <path class="flow extract reverse" style=${`opacity:${s}; --flow-duration:${mt(r.fans.extract.speedPercent)};`} d=${v.extractMain}></path>
                  <path class="flow bypass" style=${`opacity:${l}; --flow-duration:${mt(r.fans.supply.speedPercent)};`} d=${v.bypassInner}></path>
                </g>

                <g class="component-layer">
                  ${Bt("Extract fan", r.fans.extract, et.extract.x, et.extract.y, () => b(e, c.extract_fan, r.fans.extract.speedEntity))}
                  ${Bt("Supply fan", r.fans.supply, et.supply.x, et.supply.y, () => b(e, c.supply_fan, r.fans.supply.speedEntity))}
                  ${qt("ODA", r.dampers.oda, rt.oda.x, rt.oda.y, !1, () => b(e, c.oda_damper, r.dampers.oda.entity))}
                  ${qt("ETA", r.dampers.eta, rt.eta.x, rt.eta.y, !1, () => b(e, c.eta_damper, r.dampers.eta.entity))}
                  ${Zt(
    r.filters.oda,
    v.filterLeft,
    ["m 357,361 10,-10", "m 345.5,349.5 10,-10", "m 334,338 10,-10", "m 322.5,326.5 10,-10", "m 391.5,395.5 10,-10", "m 380,384 10,-10", "m 368.5,372.5 10,-10"],
    () => b(e, c.oda_filter, r.filters.oda.statusEntity ?? r.filters.oda.lifeEntity)
  )}
                  ${Zt(
    r.filters.eta,
    v.filterRight,
    ["m 357,361 10,-10", "m 345.5,349.5 10,-10", "m 334,338 10,-10", "m 322.5,326.5 10,-10", "m 391.5,395.5 10,-10", "m 380,384 10,-10", "m 368.5,372.5 10,-10"],
    () => b(e, c.eta_filter, r.filters.eta.statusEntity ?? r.filters.eta.lifeEntity)
  )}
                </g>

                <g class="overlay-layer">
                  ${at("EHA", r.temperatures.eha, x.eha.x, x.eha.y, () => b(e, c.eha_temperature, r.temperatures.eha.entity))}
                  ${at("ODA", r.temperatures.oda, x.oda.x, x.oda.y, () => b(e, c.oda_temperature, r.temperatures.oda.entity))}
                  ${at("SUP", r.temperatures.sup, x.sup.x, x.sup.y, () => b(e, c.sup_temperature, r.temperatures.sup.entity))}
                  ${at("ETA", r.temperatures.eta, x.eta.x, x.eta.y, () => b(e, c.eta_temperature, r.temperatures.eta.entity))}

                  ${i.show_power ? S`
                        <g class="metric-badge" transform="translate(795, 320)">
                          <rect x="-82" y="-22" width="164" height="44" rx="10"></rect>
                          <text x="0" y="6" class="badge-value small">${vt(r.fans.supply.power, r.fans.supply.powerUnit, 0)}</text>
                        </g>
                        <g class="metric-badge" transform="translate(205, 320)">
                          <rect x="-82" y="-22" width="164" height="44" rx="10"></rect>
                          <text x="0" y="6" class="badge-value small">${vt(r.fans.extract.power, r.fans.extract.powerUnit, 0)}</text>
                        </g>
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
        <ha-svg-icon .path=${Ar}></ha-svg-icon>
      </ha-icon-button>

    ${jr(e, r, a)}

    ${r.availability !== "full" ? d`<div class="availability-note">Partial telemetry: card remains active, but some data is unavailable.</div>` : u}
  `;
}
const Ir = Yt`
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
  }

  ha-card.theme-light {
    --atrea-surface: color-mix(in srgb, var(--atrea-bg) 96%, var(--primary-text-color) 4%);
    --atrea-panel: color-mix(in srgb, var(--atrea-bg) 90%, var(--primary-text-color) 10%);
    --atrea-fan-fill: var(--atrea-surface);
    --atrea-fan-stroke: var(--atrea-blue);
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
    padding: 8px 16px 16px;
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
    left: 12px;
    right: 12px;
    bottom: 44px;
    pointer-events: none;
  }

  .fan-popup {
    pointer-events: auto;
    padding: 12px;
    border-radius: var(--atrea-feature-border-radius);
    background: color-mix(in srgb, var(--ha-card-background, var(--card-background-color, #fff)) 88%, var(--atrea-panel) 12%);
    box-shadow:
      inset 0 0 0 1px color-mix(in srgb, var(--state-icon-color, var(--atrea-blue)) 12%, transparent),
      0 8px 18px rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(8px);
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
    fill: color-mix(in srgb, var(--atrea-surface) 86%, white 14%);
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

  .alert-strip {
    position: relative;
    z-index: 1;
    margin-bottom: 12px;
    padding: 10px 14px;
    border-radius: 12px;
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  .alert-strip.is-warning {
    background: rgba(224, 164, 58, 0.14);
    color: #8b5a12;
  }

  .alert-strip.is-fault {
    background: rgba(219, 68, 55, 0.12);
    color: var(--atrea-danger);
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
      padding: 8px 14px 14px;
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
var Br = Object.defineProperty, qr = Object.getOwnPropertyDescriptor, L = (e, t, r, a) => {
  for (var i = a > 1 ? void 0 : a ? qr(t, r) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (i = (a ? o(t, r, i) : o(i)) || i);
  return a && i && Br(t, r, i), i;
};
let y = class extends k {
  constructor() {
    super(...arguments), this.isMoreInfoOpen = !1, this.isFanPopupOpen = !1, this.fanPopupValue = null;
  }
  setConfig(e) {
    this.errorMessage = void 0, this.config = Xe(e);
  }
  getCardSize() {
    return this.config?.layout?.compact ? 4 : 5;
  }
  render() {
    if (this.errorMessage)
      return d`<ha-card class="type-custom-atrea-amotion-card"><div class="container">${this.errorMessage}</div></ha-card>`;
    if (!this.config)
      return d`<ha-card class="type-custom-atrea-amotion-card"><div class="container">Card is not configured.</div></ha-card>`;
    if (!this.hass)
      return d`<ha-card class="type-custom-atrea-amotion-card"><div class="container">Home Assistant state not available.</div></ha-card>`;
    let e;
    try {
      e = cr(this.hass, this.config);
    } catch (s) {
      const l = s instanceof Error ? s.message : "Unknown rendering error";
      return d`<ha-card class="type-custom-atrea-amotion-card"><div class="container">${l}</div></ha-card>`;
    }
    const t = this.config.layout ?? {}, r = this.config.theme_variant ?? "auto", a = ["type-custom-atrea-amotion-card", t.compact ? "is-compact" : "", `theme-${r}`].filter(Boolean).join(" "), i = Number.parseFloat(e.mode.fan.current ?? ""), n = e.fans.supply.speedPercent ?? e.fans.extract.speedPercent, o = Number.isFinite(i) ? i : n;
    return d`
      <ha-card class=${a}>
        ${Hr(this.hass, this.config, e, {
      fanPopupOpen: this.isFanPopupOpen,
      fanPopupValue: this.fanPopupValue ?? o ?? 0,
      onFanDecrease: async () => this.stepFanValue(e, -1),
      onFanIncrease: async () => this.stepFanValue(e, 1),
      onFanPreviewChange: (s) => {
        this.fanPopupValue = s;
      },
      onFanValueCommit: async (s) => this.commitFanValue(e, s),
      onOpenMoreInfo: () => {
        this.isMoreInfoOpen = !0, this.requestUpdate();
      },
      onToggleFanPopup: () => {
        e.mode.fan.controllable && (this.fanPopupValue = o ?? 0, this.isFanPopupOpen = !this.isFanPopupOpen);
      }
    })}
        ${this.isMoreInfoOpen ? $r(
      this.hass,
      this.config,
      () => {
        this.isMoreInfoOpen = !1, this.requestUpdate();
      }
    ) : d``}
      </ha-card>
    `;
  }
  getFanStepOptions(e) {
    const t = e.mode.fan.options.map((a) => Number.parseFloat(a)).filter((a) => Number.isFinite(a)).sort((a, i) => a - i);
    if (t.length > 0)
      return t;
    const r = e.fans.supply.speedPercent ?? e.fans.extract.speedPercent;
    return r === null ? [] : [r];
  }
  getNearestFanOption(e, t) {
    const r = this.getFanStepOptions(e);
    if (r.length === 0)
      return null;
    const a = Math.max(0, Math.min(100, t));
    return r.reduce((i, n) => Math.abs(n - a) < Math.abs(i - a) ? n : i);
  }
  async commitFanValue(e, t) {
    if (!this.hass || !e.mode.climateEntity || !e.mode.fan.controllable)
      return;
    const r = Math.round(Math.max(0, Math.min(100, t))), a = this.getNearestFanOption(e, r) ?? r;
    this.fanPopupValue = a, await We(this.hass, e.mode.climateEntity, a, e.mode.fan.options);
  }
  async stepFanValue(e, t) {
    const r = this.getFanStepOptions(e);
    if (r.length === 0)
      return;
    const a = this.fanPopupValue ?? r[0];
    let i = t < 0 ? r[0] : r[r.length - 1];
    if (t < 0) {
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
    await this.commitFanValue(e, i);
  }
  static async getConfigElement() {
    return document.createElement("atrea-amotion-card-editor");
  }
  static getStubConfig() {
    return {
      type: "custom:atrea-amotion-card",
      title: "Atrea Amotion",
      show_title: !0,
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
y.styles = Ir;
L([
  Z({ attribute: !1 })
], y.prototype, "hass", 2);
L([
  j()
], y.prototype, "config", 2);
L([
  j()
], y.prototype, "errorMessage", 2);
L([
  j()
], y.prototype, "isMoreInfoOpen", 2);
L([
  j()
], y.prototype, "isFanPopupOpen", 2);
L([
  j()
], y.prototype, "fanPopupValue", 2);
y = L([
  kt("atrea-amotion-card")
], y);
window.customCards || (window.customCards = []);
window.customCards.push({
  type: "atrea-amotion-card",
  name: "Atrea Amotion Card",
  description: "SVG Lovelace card for Atrea heat recovery ventilation units",
  preview: !0
});
const Gr = y;
export {
  y as AtreaAmotionCard,
  Gr as default
};
