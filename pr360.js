(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
      if (decorator = decorators[i5])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp(target, key, result);
    return result;
  };
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };
  var __accessCheck = (obj, member, msg) => {
    if (!member.has(obj))
      throw TypeError("Cannot " + msg);
  };
  var __privateGet = (obj, member, getter) => {
    __accessCheck(obj, member, "read from private field");
    return getter ? getter.call(obj) : member.get(obj);
  };
  var __privateAdd = (obj, member, value) => {
    if (member.has(obj))
      throw TypeError("Cannot add the same private member more than once");
    member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
  };
  var __privateSet = (obj, member, value, setter) => {
    __accessCheck(obj, member, "write to private field");
    setter ? setter.call(obj, value) : member.set(obj, value);
    return value;
  };

  // node_modules/@lit/reactive-element/css-tag.js
  var t = window;
  var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  var s = Symbol();
  var n = /* @__PURE__ */ new WeakMap();
  var o = class {
    constructor(t4, e7, n7) {
      if (this._$cssResult$ = true, n7 !== s)
        throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t4, this.t = e7;
    }
    get styleSheet() {
      let t4 = this.o;
      const s5 = this.t;
      if (e && void 0 === t4) {
        const e7 = void 0 !== s5 && 1 === s5.length;
        e7 && (t4 = n.get(s5)), void 0 === t4 && ((this.o = t4 = new CSSStyleSheet()).replaceSync(this.cssText), e7 && n.set(s5, t4));
      }
      return t4;
    }
    toString() {
      return this.cssText;
    }
  };
  var r = (t4) => new o("string" == typeof t4 ? t4 : t4 + "", void 0, s);
  var i = (t4, ...e7) => {
    const n7 = 1 === t4.length ? t4[0] : e7.reduce((e8, s5, n8) => e8 + ((t5) => {
      if (true === t5._$cssResult$)
        return t5.cssText;
      if ("number" == typeof t5)
        return t5;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + t5 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(s5) + t4[n8 + 1], t4[0]);
    return new o(n7, t4, s);
  };
  var S = (s5, n7) => {
    e ? s5.adoptedStyleSheets = n7.map((t4) => t4 instanceof CSSStyleSheet ? t4 : t4.styleSheet) : n7.forEach((e7) => {
      const n8 = document.createElement("style"), o6 = t.litNonce;
      void 0 !== o6 && n8.setAttribute("nonce", o6), n8.textContent = e7.cssText, s5.appendChild(n8);
    });
  };
  var c = e ? (t4) => t4 : (t4) => t4 instanceof CSSStyleSheet ? ((t5) => {
    let e7 = "";
    for (const s5 of t5.cssRules)
      e7 += s5.cssText;
    return r(e7);
  })(t4) : t4;

  // node_modules/@lit/reactive-element/reactive-element.js
  var s2;
  var e2 = window;
  var r2 = e2.trustedTypes;
  var h = r2 ? r2.emptyScript : "";
  var o2 = e2.reactiveElementPolyfillSupport;
  var n2 = { toAttribute(t4, i5) {
    switch (i5) {
      case Boolean:
        t4 = t4 ? h : null;
        break;
      case Object:
      case Array:
        t4 = null == t4 ? t4 : JSON.stringify(t4);
    }
    return t4;
  }, fromAttribute(t4, i5) {
    let s5 = t4;
    switch (i5) {
      case Boolean:
        s5 = null !== t4;
        break;
      case Number:
        s5 = null === t4 ? null : Number(t4);
        break;
      case Object:
      case Array:
        try {
          s5 = JSON.parse(t4);
        } catch (t5) {
          s5 = null;
        }
    }
    return s5;
  } };
  var a = (t4, i5) => i5 !== t4 && (i5 == i5 || t4 == t4);
  var l = { attribute: true, type: String, converter: n2, reflect: false, hasChanged: a };
  var d = "finalized";
  var u = class extends HTMLElement {
    constructor() {
      super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$El = null, this.u();
    }
    static addInitializer(t4) {
      var i5;
      this.finalize(), (null !== (i5 = this.h) && void 0 !== i5 ? i5 : this.h = []).push(t4);
    }
    static get observedAttributes() {
      this.finalize();
      const t4 = [];
      return this.elementProperties.forEach((i5, s5) => {
        const e7 = this._$Ep(s5, i5);
        void 0 !== e7 && (this._$Ev.set(e7, s5), t4.push(e7));
      }), t4;
    }
    static createProperty(t4, i5 = l) {
      if (i5.state && (i5.attribute = false), this.finalize(), this.elementProperties.set(t4, i5), !i5.noAccessor && !this.prototype.hasOwnProperty(t4)) {
        const s5 = "symbol" == typeof t4 ? Symbol() : "__" + t4, e7 = this.getPropertyDescriptor(t4, s5, i5);
        void 0 !== e7 && Object.defineProperty(this.prototype, t4, e7);
      }
    }
    static getPropertyDescriptor(t4, i5, s5) {
      return { get() {
        return this[i5];
      }, set(e7) {
        const r5 = this[t4];
        this[i5] = e7, this.requestUpdate(t4, r5, s5);
      }, configurable: true, enumerable: true };
    }
    static getPropertyOptions(t4) {
      return this.elementProperties.get(t4) || l;
    }
    static finalize() {
      if (this.hasOwnProperty(d))
        return false;
      this[d] = true;
      const t4 = Object.getPrototypeOf(this);
      if (t4.finalize(), void 0 !== t4.h && (this.h = [...t4.h]), this.elementProperties = new Map(t4.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
        const t5 = this.properties, i5 = [...Object.getOwnPropertyNames(t5), ...Object.getOwnPropertySymbols(t5)];
        for (const s5 of i5)
          this.createProperty(s5, t5[s5]);
      }
      return this.elementStyles = this.finalizeStyles(this.styles), true;
    }
    static finalizeStyles(i5) {
      const s5 = [];
      if (Array.isArray(i5)) {
        const e7 = new Set(i5.flat(1 / 0).reverse());
        for (const i6 of e7)
          s5.unshift(c(i6));
      } else
        void 0 !== i5 && s5.push(c(i5));
      return s5;
    }
    static _$Ep(t4, i5) {
      const s5 = i5.attribute;
      return false === s5 ? void 0 : "string" == typeof s5 ? s5 : "string" == typeof t4 ? t4.toLowerCase() : void 0;
    }
    u() {
      var t4;
      this._$E_ = new Promise((t5) => this.enableUpdating = t5), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), null === (t4 = this.constructor.h) || void 0 === t4 || t4.forEach((t5) => t5(this));
    }
    addController(t4) {
      var i5, s5;
      (null !== (i5 = this._$ES) && void 0 !== i5 ? i5 : this._$ES = []).push(t4), void 0 !== this.renderRoot && this.isConnected && (null === (s5 = t4.hostConnected) || void 0 === s5 || s5.call(t4));
    }
    removeController(t4) {
      var i5;
      null === (i5 = this._$ES) || void 0 === i5 || i5.splice(this._$ES.indexOf(t4) >>> 0, 1);
    }
    _$Eg() {
      this.constructor.elementProperties.forEach((t4, i5) => {
        this.hasOwnProperty(i5) && (this._$Ei.set(i5, this[i5]), delete this[i5]);
      });
    }
    createRenderRoot() {
      var t4;
      const s5 = null !== (t4 = this.shadowRoot) && void 0 !== t4 ? t4 : this.attachShadow(this.constructor.shadowRootOptions);
      return S(s5, this.constructor.elementStyles), s5;
    }
    connectedCallback() {
      var t4;
      void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), null === (t4 = this._$ES) || void 0 === t4 || t4.forEach((t5) => {
        var i5;
        return null === (i5 = t5.hostConnected) || void 0 === i5 ? void 0 : i5.call(t5);
      });
    }
    enableUpdating(t4) {
    }
    disconnectedCallback() {
      var t4;
      null === (t4 = this._$ES) || void 0 === t4 || t4.forEach((t5) => {
        var i5;
        return null === (i5 = t5.hostDisconnected) || void 0 === i5 ? void 0 : i5.call(t5);
      });
    }
    attributeChangedCallback(t4, i5, s5) {
      this._$AK(t4, s5);
    }
    _$EO(t4, i5, s5 = l) {
      var e7;
      const r5 = this.constructor._$Ep(t4, s5);
      if (void 0 !== r5 && true === s5.reflect) {
        const h3 = (void 0 !== (null === (e7 = s5.converter) || void 0 === e7 ? void 0 : e7.toAttribute) ? s5.converter : n2).toAttribute(i5, s5.type);
        this._$El = t4, null == h3 ? this.removeAttribute(r5) : this.setAttribute(r5, h3), this._$El = null;
      }
    }
    _$AK(t4, i5) {
      var s5;
      const e7 = this.constructor, r5 = e7._$Ev.get(t4);
      if (void 0 !== r5 && this._$El !== r5) {
        const t5 = e7.getPropertyOptions(r5), h3 = "function" == typeof t5.converter ? { fromAttribute: t5.converter } : void 0 !== (null === (s5 = t5.converter) || void 0 === s5 ? void 0 : s5.fromAttribute) ? t5.converter : n2;
        this._$El = r5, this[r5] = h3.fromAttribute(i5, t5.type), this._$El = null;
      }
    }
    requestUpdate(t4, i5, s5) {
      let e7 = true;
      void 0 !== t4 && (((s5 = s5 || this.constructor.getPropertyOptions(t4)).hasChanged || a)(this[t4], i5) ? (this._$AL.has(t4) || this._$AL.set(t4, i5), true === s5.reflect && this._$El !== t4 && (void 0 === this._$EC && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t4, s5))) : e7 = false), !this.isUpdatePending && e7 && (this._$E_ = this._$Ej());
    }
    async _$Ej() {
      this.isUpdatePending = true;
      try {
        await this._$E_;
      } catch (t5) {
        Promise.reject(t5);
      }
      const t4 = this.scheduleUpdate();
      return null != t4 && await t4, !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      var t4;
      if (!this.isUpdatePending)
        return;
      this.hasUpdated, this._$Ei && (this._$Ei.forEach((t5, i6) => this[i6] = t5), this._$Ei = void 0);
      let i5 = false;
      const s5 = this._$AL;
      try {
        i5 = this.shouldUpdate(s5), i5 ? (this.willUpdate(s5), null === (t4 = this._$ES) || void 0 === t4 || t4.forEach((t5) => {
          var i6;
          return null === (i6 = t5.hostUpdate) || void 0 === i6 ? void 0 : i6.call(t5);
        }), this.update(s5)) : this._$Ek();
      } catch (t5) {
        throw i5 = false, this._$Ek(), t5;
      }
      i5 && this._$AE(s5);
    }
    willUpdate(t4) {
    }
    _$AE(t4) {
      var i5;
      null === (i5 = this._$ES) || void 0 === i5 || i5.forEach((t5) => {
        var i6;
        return null === (i6 = t5.hostUpdated) || void 0 === i6 ? void 0 : i6.call(t5);
      }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t4)), this.updated(t4);
    }
    _$Ek() {
      this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$E_;
    }
    shouldUpdate(t4) {
      return true;
    }
    update(t4) {
      void 0 !== this._$EC && (this._$EC.forEach((t5, i5) => this._$EO(i5, this[i5], t5)), this._$EC = void 0), this._$Ek();
    }
    updated(t4) {
    }
    firstUpdated(t4) {
    }
  };
  u[d] = true, u.elementProperties = /* @__PURE__ */ new Map(), u.elementStyles = [], u.shadowRootOptions = { mode: "open" }, null == o2 || o2({ ReactiveElement: u }), (null !== (s2 = e2.reactiveElementVersions) && void 0 !== s2 ? s2 : e2.reactiveElementVersions = []).push("1.6.2");

  // node_modules/lit-html/lit-html.js
  var t2;
  var i2 = window;
  var s3 = i2.trustedTypes;
  var e3 = s3 ? s3.createPolicy("lit-html", { createHTML: (t4) => t4 }) : void 0;
  var o3 = "$lit$";
  var n3 = `lit$${(Math.random() + "").slice(9)}$`;
  var l2 = "?" + n3;
  var h2 = `<${l2}>`;
  var r3 = document;
  var u2 = () => r3.createComment("");
  var d2 = (t4) => null === t4 || "object" != typeof t4 && "function" != typeof t4;
  var c2 = Array.isArray;
  var v = (t4) => c2(t4) || "function" == typeof (null == t4 ? void 0 : t4[Symbol.iterator]);
  var a2 = "[ 	\n\f\r]";
  var f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  var _ = /-->/g;
  var m = />/g;
  var p = RegExp(`>|${a2}(?:([^\\s"'>=/]+)(${a2}*=${a2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
  var g = /'/g;
  var $ = /"/g;
  var y = /^(?:script|style|textarea|title)$/i;
  var w = (t4) => (i5, ...s5) => ({ _$litType$: t4, strings: i5, values: s5 });
  var x = w(1);
  var b = w(2);
  var T = Symbol.for("lit-noChange");
  var A = Symbol.for("lit-nothing");
  var E = /* @__PURE__ */ new WeakMap();
  var C = r3.createTreeWalker(r3, 129, null, false);
  function P(t4, i5) {
    if (!Array.isArray(t4) || !t4.hasOwnProperty("raw"))
      throw Error("invalid template strings array");
    return void 0 !== e3 ? e3.createHTML(i5) : i5;
  }
  var V = (t4, i5) => {
    const s5 = t4.length - 1, e7 = [];
    let l5, r5 = 2 === i5 ? "<svg>" : "", u3 = f;
    for (let i6 = 0; i6 < s5; i6++) {
      const s6 = t4[i6];
      let d3, c3, v2 = -1, a3 = 0;
      for (; a3 < s6.length && (u3.lastIndex = a3, c3 = u3.exec(s6), null !== c3); )
        a3 = u3.lastIndex, u3 === f ? "!--" === c3[1] ? u3 = _ : void 0 !== c3[1] ? u3 = m : void 0 !== c3[2] ? (y.test(c3[2]) && (l5 = RegExp("</" + c3[2], "g")), u3 = p) : void 0 !== c3[3] && (u3 = p) : u3 === p ? ">" === c3[0] ? (u3 = null != l5 ? l5 : f, v2 = -1) : void 0 === c3[1] ? v2 = -2 : (v2 = u3.lastIndex - c3[2].length, d3 = c3[1], u3 = void 0 === c3[3] ? p : '"' === c3[3] ? $ : g) : u3 === $ || u3 === g ? u3 = p : u3 === _ || u3 === m ? u3 = f : (u3 = p, l5 = void 0);
      const w2 = u3 === p && t4[i6 + 1].startsWith("/>") ? " " : "";
      r5 += u3 === f ? s6 + h2 : v2 >= 0 ? (e7.push(d3), s6.slice(0, v2) + o3 + s6.slice(v2) + n3 + w2) : s6 + n3 + (-2 === v2 ? (e7.push(void 0), i6) : w2);
    }
    return [P(t4, r5 + (t4[s5] || "<?>") + (2 === i5 ? "</svg>" : "")), e7];
  };
  var N = class _N {
    constructor({ strings: t4, _$litType$: i5 }, e7) {
      let h3;
      this.parts = [];
      let r5 = 0, d3 = 0;
      const c3 = t4.length - 1, v2 = this.parts, [a3, f2] = V(t4, i5);
      if (this.el = _N.createElement(a3, e7), C.currentNode = this.el.content, 2 === i5) {
        const t5 = this.el.content, i6 = t5.firstChild;
        i6.remove(), t5.append(...i6.childNodes);
      }
      for (; null !== (h3 = C.nextNode()) && v2.length < c3; ) {
        if (1 === h3.nodeType) {
          if (h3.hasAttributes()) {
            const t5 = [];
            for (const i6 of h3.getAttributeNames())
              if (i6.endsWith(o3) || i6.startsWith(n3)) {
                const s5 = f2[d3++];
                if (t5.push(i6), void 0 !== s5) {
                  const t6 = h3.getAttribute(s5.toLowerCase() + o3).split(n3), i7 = /([.?@])?(.*)/.exec(s5);
                  v2.push({ type: 1, index: r5, name: i7[2], strings: t6, ctor: "." === i7[1] ? H : "?" === i7[1] ? L : "@" === i7[1] ? z : k });
                } else
                  v2.push({ type: 6, index: r5 });
              }
            for (const i6 of t5)
              h3.removeAttribute(i6);
          }
          if (y.test(h3.tagName)) {
            const t5 = h3.textContent.split(n3), i6 = t5.length - 1;
            if (i6 > 0) {
              h3.textContent = s3 ? s3.emptyScript : "";
              for (let s5 = 0; s5 < i6; s5++)
                h3.append(t5[s5], u2()), C.nextNode(), v2.push({ type: 2, index: ++r5 });
              h3.append(t5[i6], u2());
            }
          }
        } else if (8 === h3.nodeType)
          if (h3.data === l2)
            v2.push({ type: 2, index: r5 });
          else {
            let t5 = -1;
            for (; -1 !== (t5 = h3.data.indexOf(n3, t5 + 1)); )
              v2.push({ type: 7, index: r5 }), t5 += n3.length - 1;
          }
        r5++;
      }
    }
    static createElement(t4, i5) {
      const s5 = r3.createElement("template");
      return s5.innerHTML = t4, s5;
    }
  };
  function S2(t4, i5, s5 = t4, e7) {
    var o6, n7, l5, h3;
    if (i5 === T)
      return i5;
    let r5 = void 0 !== e7 ? null === (o6 = s5._$Co) || void 0 === o6 ? void 0 : o6[e7] : s5._$Cl;
    const u3 = d2(i5) ? void 0 : i5._$litDirective$;
    return (null == r5 ? void 0 : r5.constructor) !== u3 && (null === (n7 = null == r5 ? void 0 : r5._$AO) || void 0 === n7 || n7.call(r5, false), void 0 === u3 ? r5 = void 0 : (r5 = new u3(t4), r5._$AT(t4, s5, e7)), void 0 !== e7 ? (null !== (l5 = (h3 = s5)._$Co) && void 0 !== l5 ? l5 : h3._$Co = [])[e7] = r5 : s5._$Cl = r5), void 0 !== r5 && (i5 = S2(t4, r5._$AS(t4, i5.values), r5, e7)), i5;
  }
  var M = class {
    constructor(t4, i5) {
      this._$AV = [], this._$AN = void 0, this._$AD = t4, this._$AM = i5;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    u(t4) {
      var i5;
      const { el: { content: s5 }, parts: e7 } = this._$AD, o6 = (null !== (i5 = null == t4 ? void 0 : t4.creationScope) && void 0 !== i5 ? i5 : r3).importNode(s5, true);
      C.currentNode = o6;
      let n7 = C.nextNode(), l5 = 0, h3 = 0, u3 = e7[0];
      for (; void 0 !== u3; ) {
        if (l5 === u3.index) {
          let i6;
          2 === u3.type ? i6 = new R(n7, n7.nextSibling, this, t4) : 1 === u3.type ? i6 = new u3.ctor(n7, u3.name, u3.strings, this, t4) : 6 === u3.type && (i6 = new Z(n7, this, t4)), this._$AV.push(i6), u3 = e7[++h3];
        }
        l5 !== (null == u3 ? void 0 : u3.index) && (n7 = C.nextNode(), l5++);
      }
      return C.currentNode = r3, o6;
    }
    v(t4) {
      let i5 = 0;
      for (const s5 of this._$AV)
        void 0 !== s5 && (void 0 !== s5.strings ? (s5._$AI(t4, s5, i5), i5 += s5.strings.length - 2) : s5._$AI(t4[i5])), i5++;
    }
  };
  var R = class _R {
    constructor(t4, i5, s5, e7) {
      var o6;
      this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t4, this._$AB = i5, this._$AM = s5, this.options = e7, this._$Cp = null === (o6 = null == e7 ? void 0 : e7.isConnected) || void 0 === o6 || o6;
    }
    get _$AU() {
      var t4, i5;
      return null !== (i5 = null === (t4 = this._$AM) || void 0 === t4 ? void 0 : t4._$AU) && void 0 !== i5 ? i5 : this._$Cp;
    }
    get parentNode() {
      let t4 = this._$AA.parentNode;
      const i5 = this._$AM;
      return void 0 !== i5 && 11 === (null == t4 ? void 0 : t4.nodeType) && (t4 = i5.parentNode), t4;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t4, i5 = this) {
      t4 = S2(this, t4, i5), d2(t4) ? t4 === A || null == t4 || "" === t4 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t4 !== this._$AH && t4 !== T && this._(t4) : void 0 !== t4._$litType$ ? this.g(t4) : void 0 !== t4.nodeType ? this.$(t4) : v(t4) ? this.T(t4) : this._(t4);
    }
    k(t4) {
      return this._$AA.parentNode.insertBefore(t4, this._$AB);
    }
    $(t4) {
      this._$AH !== t4 && (this._$AR(), this._$AH = this.k(t4));
    }
    _(t4) {
      this._$AH !== A && d2(this._$AH) ? this._$AA.nextSibling.data = t4 : this.$(r3.createTextNode(t4)), this._$AH = t4;
    }
    g(t4) {
      var i5;
      const { values: s5, _$litType$: e7 } = t4, o6 = "number" == typeof e7 ? this._$AC(t4) : (void 0 === e7.el && (e7.el = N.createElement(P(e7.h, e7.h[0]), this.options)), e7);
      if ((null === (i5 = this._$AH) || void 0 === i5 ? void 0 : i5._$AD) === o6)
        this._$AH.v(s5);
      else {
        const t5 = new M(o6, this), i6 = t5.u(this.options);
        t5.v(s5), this.$(i6), this._$AH = t5;
      }
    }
    _$AC(t4) {
      let i5 = E.get(t4.strings);
      return void 0 === i5 && E.set(t4.strings, i5 = new N(t4)), i5;
    }
    T(t4) {
      c2(this._$AH) || (this._$AH = [], this._$AR());
      const i5 = this._$AH;
      let s5, e7 = 0;
      for (const o6 of t4)
        e7 === i5.length ? i5.push(s5 = new _R(this.k(u2()), this.k(u2()), this, this.options)) : s5 = i5[e7], s5._$AI(o6), e7++;
      e7 < i5.length && (this._$AR(s5 && s5._$AB.nextSibling, e7), i5.length = e7);
    }
    _$AR(t4 = this._$AA.nextSibling, i5) {
      var s5;
      for (null === (s5 = this._$AP) || void 0 === s5 || s5.call(this, false, true, i5); t4 && t4 !== this._$AB; ) {
        const i6 = t4.nextSibling;
        t4.remove(), t4 = i6;
      }
    }
    setConnected(t4) {
      var i5;
      void 0 === this._$AM && (this._$Cp = t4, null === (i5 = this._$AP) || void 0 === i5 || i5.call(this, t4));
    }
  };
  var k = class {
    constructor(t4, i5, s5, e7, o6) {
      this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t4, this.name = i5, this._$AM = e7, this.options = o6, s5.length > 2 || "" !== s5[0] || "" !== s5[1] ? (this._$AH = Array(s5.length - 1).fill(new String()), this.strings = s5) : this._$AH = A;
    }
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t4, i5 = this, s5, e7) {
      const o6 = this.strings;
      let n7 = false;
      if (void 0 === o6)
        t4 = S2(this, t4, i5, 0), n7 = !d2(t4) || t4 !== this._$AH && t4 !== T, n7 && (this._$AH = t4);
      else {
        const e8 = t4;
        let l5, h3;
        for (t4 = o6[0], l5 = 0; l5 < o6.length - 1; l5++)
          h3 = S2(this, e8[s5 + l5], i5, l5), h3 === T && (h3 = this._$AH[l5]), n7 || (n7 = !d2(h3) || h3 !== this._$AH[l5]), h3 === A ? t4 = A : t4 !== A && (t4 += (null != h3 ? h3 : "") + o6[l5 + 1]), this._$AH[l5] = h3;
      }
      n7 && !e7 && this.j(t4);
    }
    j(t4) {
      t4 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t4 ? t4 : "");
    }
  };
  var H = class extends k {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(t4) {
      this.element[this.name] = t4 === A ? void 0 : t4;
    }
  };
  var I = s3 ? s3.emptyScript : "";
  var L = class extends k {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(t4) {
      t4 && t4 !== A ? this.element.setAttribute(this.name, I) : this.element.removeAttribute(this.name);
    }
  };
  var z = class extends k {
    constructor(t4, i5, s5, e7, o6) {
      super(t4, i5, s5, e7, o6), this.type = 5;
    }
    _$AI(t4, i5 = this) {
      var s5;
      if ((t4 = null !== (s5 = S2(this, t4, i5, 0)) && void 0 !== s5 ? s5 : A) === T)
        return;
      const e7 = this._$AH, o6 = t4 === A && e7 !== A || t4.capture !== e7.capture || t4.once !== e7.once || t4.passive !== e7.passive, n7 = t4 !== A && (e7 === A || o6);
      o6 && this.element.removeEventListener(this.name, this, e7), n7 && this.element.addEventListener(this.name, this, t4), this._$AH = t4;
    }
    handleEvent(t4) {
      var i5, s5;
      "function" == typeof this._$AH ? this._$AH.call(null !== (s5 = null === (i5 = this.options) || void 0 === i5 ? void 0 : i5.host) && void 0 !== s5 ? s5 : this.element, t4) : this._$AH.handleEvent(t4);
    }
  };
  var Z = class {
    constructor(t4, i5, s5) {
      this.element = t4, this.type = 6, this._$AN = void 0, this._$AM = i5, this.options = s5;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t4) {
      S2(this, t4);
    }
  };
  var B = i2.litHtmlPolyfillSupport;
  null == B || B(N, R), (null !== (t2 = i2.litHtmlVersions) && void 0 !== t2 ? t2 : i2.litHtmlVersions = []).push("2.7.5");
  var D = (t4, i5, s5) => {
    var e7, o6;
    const n7 = null !== (e7 = null == s5 ? void 0 : s5.renderBefore) && void 0 !== e7 ? e7 : i5;
    let l5 = n7._$litPart$;
    if (void 0 === l5) {
      const t5 = null !== (o6 = null == s5 ? void 0 : s5.renderBefore) && void 0 !== o6 ? o6 : null;
      n7._$litPart$ = l5 = new R(i5.insertBefore(u2(), t5), t5, void 0, null != s5 ? s5 : {});
    }
    return l5._$AI(t4), l5;
  };

  // node_modules/lit-element/lit-element.js
  var l3;
  var o4;
  var s4 = class extends u {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
    }
    createRenderRoot() {
      var t4, e7;
      const i5 = super.createRenderRoot();
      return null !== (t4 = (e7 = this.renderOptions).renderBefore) && void 0 !== t4 || (e7.renderBefore = i5.firstChild), i5;
    }
    update(t4) {
      const i5 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t4), this._$Do = D(i5, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      var t4;
      super.connectedCallback(), null === (t4 = this._$Do) || void 0 === t4 || t4.setConnected(true);
    }
    disconnectedCallback() {
      var t4;
      super.disconnectedCallback(), null === (t4 = this._$Do) || void 0 === t4 || t4.setConnected(false);
    }
    render() {
      return T;
    }
  };
  s4.finalized = true, s4._$litElement$ = true, null === (l3 = globalThis.litElementHydrateSupport) || void 0 === l3 || l3.call(globalThis, { LitElement: s4 });
  var n4 = globalThis.litElementPolyfillSupport;
  null == n4 || n4({ LitElement: s4 });
  (null !== (o4 = globalThis.litElementVersions) && void 0 !== o4 ? o4 : globalThis.litElementVersions = []).push("3.3.2");

  // node_modules/@lit/reactive-element/decorators/custom-element.js
  var e4 = (e7) => (n7) => "function" == typeof n7 ? ((e8, n8) => (customElements.define(e8, n8), n8))(e7, n7) : ((e8, n8) => {
    const { kind: t4, elements: s5 } = n8;
    return { kind: t4, elements: s5, finisher(n9) {
      customElements.define(e8, n9);
    } };
  })(e7, n7);

  // node_modules/@lit/reactive-element/decorators/property.js
  var i3 = (i5, e7) => "method" === e7.kind && e7.descriptor && !("value" in e7.descriptor) ? { ...e7, finisher(n7) {
    n7.createProperty(e7.key, i5);
  } } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e7.key, initializer() {
    "function" == typeof e7.initializer && (this[e7.key] = e7.initializer.call(this));
  }, finisher(n7) {
    n7.createProperty(e7.key, i5);
  } };
  var e5 = (i5, e7, n7) => {
    e7.constructor.createProperty(n7, i5);
  };
  function n5(n7) {
    return (t4, o6) => void 0 !== o6 ? e5(n7, t4, o6) : i3(n7, t4);
  }

  // node_modules/@lit/reactive-element/decorators/state.js
  function t3(t4) {
    return n5({ ...t4, state: true });
  }

  // node_modules/@lit/reactive-element/decorators/base.js
  var o5 = ({ finisher: e7, descriptor: t4 }) => (o6, n7) => {
    var r5;
    if (void 0 === n7) {
      const n8 = null !== (r5 = o6.originalKey) && void 0 !== r5 ? r5 : o6.key, i5 = null != t4 ? { kind: "method", placement: "prototype", key: n8, descriptor: t4(o6.key) } : { ...o6, key: n8 };
      return null != e7 && (i5.finisher = function(t5) {
        e7(t5, n8);
      }), i5;
    }
    {
      const r6 = o6.constructor;
      void 0 !== t4 && Object.defineProperty(o6, n7, t4(n7)), null == e7 || e7(r6, n7);
    }
  };

  // node_modules/@lit/reactive-element/decorators/query.js
  function i4(i5, n7) {
    return o5({ descriptor: (o6) => {
      const t4 = { get() {
        var o7, n8;
        return null !== (n8 = null === (o7 = this.renderRoot) || void 0 === o7 ? void 0 : o7.querySelector(i5)) && void 0 !== n8 ? n8 : null;
      }, enumerable: true, configurable: true };
      if (n7) {
        const n8 = "symbol" == typeof o6 ? Symbol() : "__" + o6;
        t4.get = function() {
          var o7, t5;
          return void 0 === this[n8] && (this[n8] = null !== (t5 = null === (o7 = this.renderRoot) || void 0 === o7 ? void 0 : o7.querySelector(i5)) && void 0 !== t5 ? t5 : null), this[n8];
        };
      }
      return t4;
    } });
  }

  // node_modules/@lit/reactive-element/decorators/query-assigned-elements.js
  var n6;
  var e6 = null != (null === (n6 = window.HTMLSlotElement) || void 0 === n6 ? void 0 : n6.prototype.assignedElements) ? (o6, n7) => o6.assignedElements(n7) : (o6, n7) => o6.assignedNodes(n7).filter((o7) => o7.nodeType === Node.ELEMENT_NODE);

  // node_modules/json-joy/esm/json-clone/clone.js
  var { isArray } = Array;
  var objectKeys = Object.keys;
  var clone = (obj) => {
    if (!obj)
      return obj;
    if (isArray(obj)) {
      const arr = [];
      const length = obj.length;
      for (let i5 = 0; i5 < length; i5++)
        arr.push(clone(obj[i5]));
      return arr;
    } else if (typeof obj === "object") {
      const keys = objectKeys(obj);
      const length = keys.length;
      const newObject = {};
      for (let i5 = 0; i5 < length; i5++) {
        const key = keys[i5];
        newObject[key] = clone(obj[key]);
      }
      return newObject;
    }
    return obj;
  };

  // node_modules/json-joy/esm/json-patch/op/AbstractOp.js
  var AbstractOp = class {
    constructor(path) {
      __publicField(this, "path");
      __publicField(this, "from");
      this.path = path;
    }
  };

  // node_modules/json-joy/esm/json-pointer/util.js
  var r1 = /~1/g;
  var r22 = /~0/g;
  var r32 = /~/g;
  var r4 = /\//g;
  function unescapeComponent(component) {
    if (component.indexOf("~") === -1)
      return component;
    return component.replace(r1, "/").replace(r22, "~");
  }
  function escapeComponent(component) {
    if (component.indexOf("/") === -1 && component.indexOf("~") === -1)
      return component;
    return component.replace(r32, "~0").replace(r4, "~1");
  }
  function parseJsonPointer(pointer) {
    if (!pointer)
      return [];
    return pointer.slice(1).split("/").map(unescapeComponent);
  }
  function formatJsonPointer(path) {
    if (isRoot(path))
      return "";
    return "/" + path.map((component) => escapeComponent(String(component))).join("/");
  }
  var toPath = (pointer) => typeof pointer === "string" ? parseJsonPointer(pointer) : pointer;
  var isRoot = (path) => !path.length;

  // node_modules/json-joy/esm/json-pointer/validate.js
  var { isArray: isArray2 } = Array;

  // node_modules/json-joy/esm/util/hasOwnProperty.js
  var has = Object.prototype.hasOwnProperty;
  function hasOwnProperty(obj, key) {
    return has.call(obj, key);
  }

  // node_modules/json-joy/esm/json-pointer/find.js
  var { isArray: isArray3 } = Array;
  var find = (val, path) => {
    const pathLength = path.length;
    if (!pathLength)
      return { val };
    let obj;
    let key;
    for (let i5 = 0; i5 < pathLength; i5++) {
      obj = val;
      key = path[i5];
      if (isArray3(obj)) {
        const length = obj.length;
        if (key === "-")
          key = length;
        else {
          if (typeof key === "string") {
            const key2 = ~~key;
            if ("" + key2 !== key)
              throw new Error("INVALID_INDEX");
            key = key2;
            if (key < 0)
              throw new Error("INVALID_INDEX");
          }
        }
        val = obj[key];
      } else if (typeof obj === "object" && !!obj) {
        val = hasOwnProperty(obj, key) ? obj[key] : void 0;
      } else
        throw new Error("NOT_FOUND");
    }
    const ref = { val, obj, key };
    return ref;
  };
  var isArrayReference = (ref) => isArray3(ref.obj) && typeof ref.key === "number";
  var isObjectReference = (ref) => typeof ref.obj === "object" && typeof ref.key === "string";

  // node_modules/json-joy/esm/json-pointer/findByPointer/v5.js
  var { isArray: isArray4 } = Array;

  // node_modules/json-joy/esm/json-patch/op/OpAdd.js
  var OpAdd = class extends AbstractOp {
    constructor(path, value) {
      super(path);
      __publicField(this, "value");
      this.value = value;
    }
    op() {
      return "add";
    }
    code() {
      return 0;
    }
    apply(doc) {
      const { val, key, obj } = find(doc, this.path);
      const value = clone(this.value);
      if (!obj)
        doc = value;
      else if (typeof key === "string")
        obj[key] = value;
      else {
        const length = obj.length;
        if (key < length)
          obj.splice(key, 0, value);
        else if (key > length)
          throw new Error("INVALID_INDEX");
        else
          obj.push(value);
      }
      return { doc, old: val };
    }
    toJson(parent) {
      return {
        op: "add",
        path: formatJsonPointer(this.path),
        value: this.value
      };
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "add" : 0;
      return [opcode, this.path, this.value];
    }
    encode(encoder) {
      encoder.encodeArrayHeader(3);
      encoder.writer.u8(0);
      encoder.encodeArray(this.path);
      encoder.encodeAny(this.value);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpRemove.js
  var OpRemove = class extends AbstractOp {
    constructor(path, oldValue) {
      super(path);
      __publicField(this, "oldValue");
      this.oldValue = oldValue;
    }
    op() {
      return "remove";
    }
    code() {
      return 1;
    }
    apply(doc) {
      const ref = find(doc, this.path);
      if (ref.val === void 0)
        throw new Error("NOT_FOUND");
      if (isObjectReference(ref))
        delete ref.obj[ref.key];
      else if (isArrayReference(ref)) {
        if (ref.val !== void 0)
          ref.obj.splice(ref.key, 1);
      } else
        doc = null;
      return { doc, old: ref.val };
    }
    toJson(parent) {
      const json = {
        op: "remove",
        path: formatJsonPointer(this.path)
      };
      if (this.oldValue !== void 0)
        json.oldValue = this.oldValue;
      return json;
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "remove" : 1;
      return this.oldValue === void 0 ? [opcode, this.path] : [opcode, this.path, this.oldValue];
    }
    encode(encoder, parent) {
      const hasOldValue = this.oldValue !== void 0;
      encoder.encodeArrayHeader(hasOldValue ? 3 : 2);
      encoder.writer.u8(1);
      encoder.encodeArray(this.path);
      if (hasOldValue)
        encoder.encodeAny(this.oldValue);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpReplace.js
  var OpReplace = class extends AbstractOp {
    constructor(path, value, oldValue) {
      super(path);
      __publicField(this, "value");
      __publicField(this, "oldValue");
      this.value = value;
      this.oldValue = oldValue;
    }
    op() {
      return "replace";
    }
    code() {
      return 2;
    }
    apply(doc) {
      const ref = find(doc, this.path);
      if (ref.val === void 0)
        throw new Error("NOT_FOUND");
      if (isObjectReference(ref))
        ref.obj[ref.key] = this.value;
      else if (isArrayReference(ref))
        ref.obj[ref.key] = this.value;
      else
        doc = this.value;
      return { doc, old: ref.val };
    }
    toJson(parent) {
      const json = {
        op: "replace",
        path: formatJsonPointer(this.path),
        value: this.value
      };
      if (this.oldValue !== void 0)
        json.oldValue = this.oldValue;
      return json;
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "replace" : 2;
      return this.oldValue === void 0 ? [opcode, this.path, this.value] : [opcode, this.path, this.value, this.oldValue];
    }
    encode(encoder, parent) {
      const hasOldValue = this.oldValue !== void 0;
      encoder.encodeArrayHeader(hasOldValue ? 4 : 3);
      encoder.writer.u8(2);
      encoder.encodeArray(this.path);
      encoder.encodeAny(this.value);
      if (hasOldValue)
        encoder.encodeAny(this.oldValue);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpMove.js
  var OpMove = class extends AbstractOp {
    constructor(path, from) {
      super(path);
      __publicField(this, "from");
      this.from = from;
    }
    op() {
      return "move";
    }
    code() {
      return 4;
    }
    apply(doc) {
      const remove = new OpRemove(toPath(this.from), void 0).apply(doc);
      const add = new OpAdd(this.path, remove.old).apply(remove.doc);
      return add;
    }
    toJson(parent) {
      return {
        op: "move",
        path: formatJsonPointer(this.path),
        from: formatJsonPointer(this.from)
      };
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "move" : 4;
      return [opcode, this.path, this.from];
    }
    encode(encoder, parent) {
      encoder.encodeArrayHeader(3);
      encoder.writer.u8(4);
      encoder.encodeArray(this.path);
      encoder.encodeArray(this.from);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpCopy.js
  var OpCopy = class extends AbstractOp {
    constructor(path, from) {
      super(path);
      __publicField(this, "from");
      this.from = from;
    }
    op() {
      return "copy";
    }
    code() {
      return 3;
    }
    apply(doc) {
      const { val } = find(doc, this.from);
      if (val === void 0)
        throw new Error("NOT_FOUND");
      const add = new OpAdd(this.path, clone(val)).apply(doc);
      return add;
    }
    toJson(parent) {
      return {
        op: "copy",
        path: formatJsonPointer(this.path),
        from: formatJsonPointer(this.from)
      };
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "copy" : 3;
      return [opcode, this.path, this.from];
    }
    encode(encoder, parent) {
      encoder.encodeArrayHeader(3);
      encoder.writer.u8(3);
      encoder.encodeArray(this.path);
      encoder.encodeArray(this.from);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/AbstractPredicateOp.js
  var AbstractPredicateOp = class extends AbstractOp {
    apply(doc) {
      const test = this.test(doc);
      if (!test)
        throw new Error("TEST");
      return { doc };
    }
  };

  // node_modules/json-joy/esm/json-equal/deepEqual/v1.js
  var deepEqual = (a3, b2) => {
    if (a3 === b2)
      return true;
    if (a3 && b2 && typeof a3 === "object" && typeof b2 === "object") {
      if (a3.constructor !== b2.constructor)
        return false;
      let length, i5, keys;
      if (Array.isArray(a3)) {
        length = a3.length;
        if (length !== b2.length)
          return false;
        for (i5 = length; i5-- !== 0; )
          if (!deepEqual(a3[i5], b2[i5]))
            return false;
        return true;
      }
      keys = Object.keys(a3);
      length = keys.length;
      if (length !== Object.keys(b2).length)
        return false;
      for (i5 = length; i5-- !== 0; ) {
        const key = keys[i5];
        if (!deepEqual(a3[key], b2[key]))
          return false;
      }
      return true;
    }
    return false;
  };

  // node_modules/json-joy/esm/json-patch/op/OpTest.js
  var OpTest = class extends AbstractPredicateOp {
    constructor(path, value, not) {
      super(path);
      __publicField(this, "value");
      __publicField(this, "not");
      this.value = value;
      this.not = not;
    }
    op() {
      return "test";
    }
    code() {
      return 5;
    }
    test(doc) {
      const { val } = find(doc, this.path);
      if (val === void 0)
        return !!this.not;
      const test = deepEqual(val, this.value);
      return this.not ? !test : test;
    }
    toJson(parent) {
      const op = {
        op: "test",
        path: formatJsonPointer(parent ? this.path.slice(parent.path.length) : this.path),
        value: this.value
      };
      if (this.not)
        op.not = this.not;
      return op;
    }
    toCompact(parent, verbose) {
      const path = parent ? this.path.slice(parent.path.length) : this.path;
      const opcode = verbose ? "test" : 5;
      return this.not ? [opcode, path, this.value, 1] : [opcode, path, this.value];
    }
    encode(encoder, parent) {
      encoder.encodeArrayHeader(this.not ? 4 : 3);
      encoder.writer.u8(5);
      encoder.encodeArray(parent ? this.path.slice(parent.path.length) : this.path);
      encoder.encodeAny(this.value);
      if (this.not)
        encoder.writer.u8(1);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpFlip.js
  var OpFlip = class extends AbstractOp {
    constructor(path) {
      super(path);
    }
    op() {
      return "flip";
    }
    code() {
      return 8;
    }
    apply(doc) {
      const ref = find(doc, this.path);
      if (ref.obj)
        ref.obj[ref.key] = !ref.val;
      else
        doc = !ref.val;
      return { doc, old: ref.val };
    }
    toJson(parent) {
      const op = {
        op: "flip",
        path: formatJsonPointer(this.path)
      };
      return op;
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "flip" : 8;
      return [opcode, this.path];
    }
    encode(encoder, parent) {
      encoder.encodeArrayHeader(2);
      encoder.writer.u8(8);
      encoder.encodeArray(this.path);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpInc.js
  var OpInc = class extends AbstractOp {
    constructor(path, inc) {
      super(path);
      __publicField(this, "inc");
      this.inc = inc;
    }
    op() {
      return "inc";
    }
    code() {
      return 9;
    }
    apply(doc) {
      const ref = find(doc, this.path);
      const result = this.inc + Number(ref.val);
      if (ref.obj)
        ref.obj[ref.key] = result;
      else
        doc = result;
      return { doc, old: ref.val };
    }
    toJson(parent) {
      const op = {
        op: "inc",
        path: formatJsonPointer(this.path),
        inc: this.inc
      };
      return op;
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "inc" : 9;
      return [opcode, this.path, this.inc];
    }
    encode(encoder, parent) {
      encoder.encodeArrayHeader(3);
      encoder.writer.u8(9);
      encoder.encodeArray(this.path);
      encoder.encodeNumber(this.inc);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpStrIns.js
  var OpStrIns = class extends AbstractOp {
    constructor(path, pos, str) {
      super(path);
      __publicField(this, "pos");
      __publicField(this, "str");
      this.pos = pos;
      this.str = str;
    }
    op() {
      return "str_ins";
    }
    code() {
      return 6;
    }
    apply(doc) {
      const { val, key, obj } = find(doc, this.path);
      if (typeof val !== "string") {
        if (val !== void 0)
          throw new Error("NOT_A_STRING");
        if (this.pos !== 0)
          throw new Error("POS");
      }
      const str = typeof val === "string" ? val : "";
      const pos = Math.min(this.pos, str.length);
      const before = str.slice(0, pos);
      const after = str.slice(pos);
      const result = before + this.str + after;
      if (obj)
        obj[key] = result;
      else
        doc = result;
      return { doc, old: val };
    }
    toJson(parent) {
      const op = {
        op: "str_ins",
        path: formatJsonPointer(this.path),
        pos: this.pos,
        str: this.str
      };
      return op;
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "str_ins" : 6;
      return [opcode, this.path, this.pos, this.str];
    }
    encode(encoder, parent) {
      encoder.encodeArrayHeader(4);
      encoder.writer.u8(6);
      encoder.encodeArray(this.path);
      encoder.encodeNumber(this.pos);
      encoder.encodeString(this.str);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpStrDel.js
  var OpStrDel = class extends AbstractOp {
    constructor(path, pos, str, len) {
      super(path);
      __publicField(this, "pos");
      __publicField(this, "str");
      __publicField(this, "len");
      this.pos = pos;
      this.str = str;
      this.len = len;
    }
    op() {
      return "str_del";
    }
    code() {
      return 7;
    }
    deleteLength() {
      return typeof this.str === "string" ? this.str.length : this.len;
    }
    apply(doc) {
      const { val, key, obj } = find(doc, this.path);
      if (typeof val !== "string")
        throw new Error("NOT_A_STRING");
      const length = val.length;
      const pos = Math.min(this.pos, val.length);
      const start = Math.min(pos, length);
      const deletionLength = this.str !== void 0 ? this.str.length : this.len;
      const end = Math.min(pos + deletionLength, length);
      const before = val.slice(0, start);
      const after = val.substr(end);
      const result = before + after;
      if (obj)
        obj[key] = result;
      else
        doc = result;
      return { doc, old: val };
    }
    toJson(parent) {
      if (typeof this.str === "string") {
        return {
          op: "str_del",
          path: formatJsonPointer(this.path),
          pos: this.pos,
          str: this.str
        };
      }
      return {
        op: "str_del",
        path: formatJsonPointer(this.path),
        pos: this.pos,
        len: this.len
      };
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "str_del" : 7;
      return typeof this.str === "string" ? [opcode, this.path, this.pos, this.str] : [opcode, this.path, this.pos, 0, this.len];
    }
    encode(encoder, parent) {
      const hasStr = typeof this.str === "string";
      encoder.encodeArrayHeader(hasStr ? 4 : 5);
      encoder.writer.u8(7);
      encoder.encodeArray(this.path);
      encoder.encodeNumber(this.pos);
      if (hasStr) {
        encoder.encodeString(this.str);
      } else {
        encoder.writer.u8(0);
        encoder.encodeNumber(this.len);
      }
    }
  };

  // node_modules/json-joy/esm/json-patch/util.js
  var { isArray: isArray5 } = Array;
  var isTextNode = (node) => !!node && typeof node === "object" && typeof node.text === "string";
  var isElementNode = (node) => !!node && typeof node === "object" && isArray5(node.children);
  var createMatcherDefault = (pattern, ignoreCase) => {
    const reg = new RegExp(pattern, ignoreCase ? "i" : void 0);
    return (value) => reg.test(value);
  };

  // node_modules/json-joy/esm/json-patch/op/OpSplit.js
  var OpSplit = class extends AbstractOp {
    constructor(path, pos, props) {
      super(path);
      __publicField(this, "pos");
      __publicField(this, "props");
      this.pos = pos;
      this.props = props;
    }
    op() {
      return "split";
    }
    code() {
      return 10;
    }
    apply(doc) {
      const ref = find(doc, this.path);
      if (ref.val === void 0)
        throw new Error("NOT_FOUND");
      const tuple = this.split(ref.val);
      if (isObjectReference(ref))
        ref.obj[ref.key] = tuple;
      else if (isArrayReference(ref)) {
        ref.obj[ref.key] = tuple[0];
        ref.obj.splice(ref.key + 1, 0, tuple[1]);
      } else
        doc = tuple;
      return { doc, old: ref.val };
    }
    split(node) {
      if (typeof node === "string") {
        const { pos, props } = this;
        const before = node.slice(0, pos);
        const after = node.slice(pos);
        if (!props)
          return [before, after];
        const textNodes = [
          {
            ...props,
            text: before
          },
          {
            ...props,
            text: after
          }
        ];
        return textNodes;
      } else if (isTextNode(node)) {
        const { pos, props } = this;
        const before = node.text.slice(0, pos);
        const after = node.text.slice(pos);
        const textNodes = [
          {
            ...node,
            ...props,
            text: before
          },
          {
            ...node,
            ...props,
            text: after
          }
        ];
        return textNodes;
      } else if (isElementNode(node)) {
        const { pos, props } = this;
        const before = node.children.slice(0, pos);
        const after = node.children.slice(pos);
        const elementNodes = [
          {
            ...node,
            ...props,
            children: before
          },
          {
            ...node,
            ...props,
            children: after
          }
        ];
        return elementNodes;
      } else if (typeof node === "number") {
        const { pos } = this;
        return [pos, node - pos];
      } else
        return [node, node];
    }
    toJson(parent) {
      const op = {
        op: "split",
        path: formatJsonPointer(this.path),
        pos: this.pos
      };
      if (this.props)
        op.props = this.props;
      return op;
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "split" : 10;
      return this.props ? [opcode, this.path, this.pos, this.props] : [opcode, this.path, this.pos];
    }
    encode(encoder, parent) {
      encoder.encodeArrayHeader(this.props ? 4 : 3);
      encoder.writer.u8(10);
      encoder.encodeArray(this.path);
      encoder.encodeNumber(this.pos);
      if (this.props)
        encoder.encodeObject(this.props);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpMerge.js
  var OpMerge = class extends AbstractOp {
    constructor(path, pos, props) {
      super(path);
      __publicField(this, "pos");
      __publicField(this, "props");
      this.pos = pos;
      this.props = props;
    }
    op() {
      return "merge";
    }
    code() {
      return 11;
    }
    apply(doc) {
      const ref = find(doc, this.path);
      if (!isArrayReference(ref))
        throw new Error("INVALID_TARGET");
      if (ref.key <= 0)
        throw new Error("INVALID_KEY");
      const one = ref.obj[ref.key - 1];
      const two = ref.obj[ref.key];
      const merged = this.merge(one, two);
      ref.obj[ref.key - 1] = merged;
      ref.obj.splice(ref.key, 1);
      return { doc, old: [one, two] };
    }
    merge(one, two) {
      if (typeof one === "string" && typeof two === "string")
        return one + two;
      if (typeof one === "number" && typeof two === "number")
        return one + two;
      if (isTextNode(one) && isTextNode(two))
        return { ...one, ...two, text: one.text + two.text };
      if (isElementNode(one) && isElementNode(two))
        return { ...one, ...two, children: [...one.children, ...two.children] };
      return [one, two];
    }
    toJson(parent) {
      const op = {
        op: "merge",
        path: formatJsonPointer(this.path),
        pos: this.pos
      };
      if (this.props)
        op.props = this.props;
      return op;
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "merge" : 11;
      return this.props ? [opcode, this.path, this.pos, this.props] : [opcode, this.path, this.pos];
    }
    encode(encoder, parent) {
      encoder.encodeArrayHeader(this.props ? 4 : 3);
      encoder.writer.u8(11);
      encoder.encodeArray(this.path);
      encoder.encodeNumber(this.pos);
      if (this.props)
        encoder.encodeAny(this.props);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpExtend.js
  var { isArray: isArray6 } = Array;
  var OpExtend = class extends AbstractOp {
    constructor(path, props, deleteNull) {
      super(path);
      __publicField(this, "props");
      __publicField(this, "deleteNull");
      this.props = props;
      this.deleteNull = deleteNull;
    }
    op() {
      return "extend";
    }
    code() {
      return 12;
    }
    apply(doc) {
      const ref = find(doc, this.path);
      if (isArrayReference(ref)) {
        if (ref.val !== void 0) {
          ref.obj[ref.key] = this.extend(ref.val);
        }
      } else if (isObjectReference(ref)) {
        ref.obj[ref.key] = this.extend(ref.val);
      } else {
        doc = this.extend(doc);
      }
      return { doc };
    }
    extend(value) {
      if (isArray6(value))
        return value;
      if (typeof value !== "object")
        return value;
      if (!value)
        return value;
      for (const [key, v2] of Object.entries(this.props)) {
        if (key === "__proto__")
          throw new Error("NO_PROTO");
        if (v2 === null && this.deleteNull) {
          delete value[key];
          continue;
        }
        value[key] = v2;
      }
      return value;
    }
    toJson(parent) {
      const op = {
        op: "extend",
        path: formatJsonPointer(this.path),
        props: this.props
      };
      if (this.deleteNull)
        op.deleteNull = this.deleteNull;
      return op;
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "extend" : 12;
      return this.deleteNull ? [opcode, this.path, this.props, 1] : [opcode, this.path, this.props];
    }
    encode(encoder, parent) {
      const { deleteNull } = this;
      encoder.encodeArrayHeader(deleteNull ? 4 : 3);
      encoder.writer.u8(12);
      encoder.encodeArray(this.path);
      encoder.encodeObject(this.props);
      if (deleteNull)
        encoder.writer.u8(1);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpDefined.js
  var OpDefined = class extends AbstractPredicateOp {
    constructor(path) {
      super(path);
    }
    op() {
      return "defined";
    }
    code() {
      return 31;
    }
    test(doc) {
      const { val } = find(doc, this.path);
      const test = val !== void 0;
      return test;
    }
    toJson(parent) {
      const op = {
        op: "defined",
        path: formatJsonPointer(parent ? this.path.slice(parent.path.length) : this.path)
      };
      return op;
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "defined" : 31;
      return [opcode, parent ? this.path.slice(parent.path.length) : this.path];
    }
    encode(encoder, parent) {
      encoder.encodeArrayHeader(2);
      encoder.writer.u8(31);
      encoder.encodeArray(parent ? this.path.slice(parent.path.length) : this.path);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpUndefined.js
  var OpUndefined = class extends AbstractPredicateOp {
    constructor(path) {
      super(path);
    }
    op() {
      return "undefined";
    }
    code() {
      return 38;
    }
    test(doc) {
      try {
        const { val } = find(doc, this.path);
        const test = val === void 0;
        return test;
      } catch (error) {
        if (error.message === "NOT_FOUND")
          return true;
        throw error;
      }
    }
    toJson(parent) {
      const op = {
        op: "undefined",
        path: formatJsonPointer(parent ? this.path.slice(parent.path.length) : this.path)
      };
      return op;
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "undefined" : 38;
      return [opcode, parent ? this.path.slice(parent.path.length) : this.path];
    }
    encode(encoder, parent) {
      encoder.encodeArrayHeader(2);
      encoder.writer.u8(38);
      encoder.encodeArray(parent ? this.path.slice(parent.path.length) : this.path);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpTestType.js
  var { isArray: isArray7 } = Array;
  var OpTestType = class extends AbstractPredicateOp {
    constructor(path, type) {
      super(path);
      __publicField(this, "type");
      this.type = type;
    }
    op() {
      return "test_type";
    }
    code() {
      return 39;
    }
    test(doc) {
      const { val } = find(doc, this.path);
      if (val === null)
        return this.type.indexOf("null") > -1;
      if (isArray7(val))
        return this.type.indexOf("array") > -1;
      if (this.type.indexOf(typeof val) > -1)
        return true;
      if (typeof val === "number" && val === Math.round(val) && this.type.indexOf("integer") > -1)
        return true;
      return false;
    }
    toJson(parent) {
      const op = {
        op: "test_type",
        path: formatJsonPointer(parent ? this.path.slice(parent.path.length) : this.path),
        type: this.type
      };
      return op;
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "test_type" : 39;
      return [opcode, parent ? this.path.slice(parent.path.length) : this.path, this.type];
    }
    encode(encoder, parent) {
      encoder.encodeArrayHeader(3);
      encoder.writer.u8(39);
      encoder.encodeArray(parent ? this.path.slice(parent.path.length) : this.path);
      encoder.encodeArray(this.type);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpTestString.js
  var OpTestString = class extends AbstractPredicateOp {
    constructor(path, pos, str, not) {
      super(path);
      __publicField(this, "pos");
      __publicField(this, "str");
      __publicField(this, "not");
      this.pos = pos;
      this.str = str;
      this.not = not;
    }
    op() {
      return "test_string";
    }
    code() {
      return 40;
    }
    test(doc) {
      const { val } = find(doc, this.path);
      if (typeof val !== "string")
        return false;
      const length = val.length;
      const start = Math.min(this.pos, length);
      const end = Math.min(this.pos + this.str.length, length);
      const test = val.substring(start, end) === this.str;
      return this.not ? !test : test;
    }
    toJson(parent) {
      const op = {
        op: "test_string",
        path: formatJsonPointer(parent ? this.path.slice(parent.path.length) : this.path),
        pos: this.pos,
        str: this.str
      };
      if (this.not)
        op.not = this.not;
      return op;
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "test_string" : 40;
      const path = parent ? this.path.slice(parent.path.length) : this.path;
      return this.not ? [opcode, path, this.pos, this.str, 1] : [opcode, path, this.pos, this.str];
    }
    encode(encoder, parent) {
      encoder.encodeArrayHeader(this.not ? 5 : 4);
      encoder.writer.u8(40);
      encoder.encodeArray(parent ? this.path.slice(parent.path.length) : this.path);
      encoder.encodeNumber(this.pos);
      encoder.encodeString(this.str);
      if (this.not)
        encoder.writer.u8(1);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpTestStringLen.js
  var OpTestStringLen = class extends AbstractPredicateOp {
    constructor(path, len, not) {
      super(path);
      __publicField(this, "len");
      __publicField(this, "not");
      this.len = len;
      this.not = not;
    }
    op() {
      return "test_string_len";
    }
    code() {
      return 41;
    }
    test(doc) {
      const { val } = find(doc, this.path);
      if (typeof val !== "string")
        return false;
      const length = val.length;
      const test = length >= this.len;
      return this.not ? !test : test;
    }
    toJson(parent) {
      const op = {
        op: "test_string_len",
        path: formatJsonPointer(parent ? this.path.slice(parent.path.length) : this.path),
        len: this.len
      };
      if (this.not)
        op.not = this.not;
      return op;
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "test_string_len" : 41;
      const path = parent ? this.path.slice(parent.path.length) : this.path;
      return this.not ? [opcode, path, this.len, 1] : [opcode, path, this.len];
    }
    encode(encoder, parent) {
      encoder.encodeArrayHeader(this.not ? 4 : 3);
      encoder.writer.u8(41);
      encoder.encodeArray(parent ? this.path.slice(parent.path.length) : this.path);
      encoder.encodeNumber(this.len);
      if (this.not)
        encoder.writer.u8(1);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpContains.js
  var OpContains = class extends AbstractPredicateOp {
    constructor(path, value, ignore_case) {
      super(path);
      __publicField(this, "value");
      __publicField(this, "ignore_case");
      this.value = value;
      this.ignore_case = ignore_case;
    }
    op() {
      return "contains";
    }
    code() {
      return 30;
    }
    test(doc) {
      const { val } = find(doc, this.path);
      if (typeof val !== "string")
        return false;
      const testValue = this.ignore_case ? val.toLowerCase() : val;
      const testString = this.ignore_case ? this.value.toLowerCase() : this.value;
      const test = testValue.indexOf(testString) > -1;
      return test;
    }
    toJson(parent) {
      const op = {
        op: "contains",
        path: formatJsonPointer(parent ? this.path.slice(parent.path.length) : this.path),
        value: this.value
      };
      if (this.ignore_case)
        op.ignore_case = this.ignore_case;
      return op;
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "contains" : 30;
      return this.ignore_case ? [opcode, parent ? this.path.slice(parent.path.length) : this.path, this.value, 1] : [opcode, parent ? this.path.slice(parent.path.length) : this.path, this.value];
    }
    encode(encoder, parent) {
      const ignoreCase = this.ignore_case;
      encoder.encodeArrayHeader(ignoreCase ? 4 : 3);
      encoder.writer.u8(30);
      encoder.encodeArray(parent ? this.path.slice(parent.path.length) : this.path);
      encoder.encodeString(this.value);
      if (ignoreCase)
        encoder.writer.u8(1);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpEnds.js
  var OpEnds = class extends AbstractPredicateOp {
    constructor(path, value, ignore_case) {
      super(path);
      __publicField(this, "value");
      __publicField(this, "ignore_case");
      this.value = value;
      this.ignore_case = ignore_case;
    }
    op() {
      return "ends";
    }
    code() {
      return 32;
    }
    test(doc) {
      const { val } = find(doc, this.path);
      if (typeof val !== "string")
        return false;
      const outer = this.ignore_case ? val.toLowerCase() : val;
      const inner = this.ignore_case ? this.value.toLowerCase() : this.value;
      const test = outer.endsWith(inner);
      return test;
    }
    toJson(parent) {
      const op = {
        op: "ends",
        path: formatJsonPointer(parent ? this.path.slice(parent.path.length) : this.path),
        value: this.value
      };
      if (this.ignore_case)
        op.ignore_case = this.ignore_case;
      return op;
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "ends" : 32;
      return this.ignore_case ? [opcode, parent ? this.path.slice(parent.path.length) : this.path, this.value, 1] : [opcode, parent ? this.path.slice(parent.path.length) : this.path, this.value];
    }
    encode(encoder, parent) {
      const ignoreCase = this.ignore_case;
      encoder.encodeArrayHeader(ignoreCase ? 4 : 3);
      encoder.writer.u8(32);
      encoder.encodeArray(parent ? this.path.slice(parent.path.length) : this.path);
      encoder.encodeString(this.value);
      if (ignoreCase)
        encoder.writer.u8(1);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpStarts.js
  var OpStarts = class extends AbstractPredicateOp {
    constructor(path, value, ignore_case) {
      super(path);
      __publicField(this, "value");
      __publicField(this, "ignore_case");
      this.value = value;
      this.ignore_case = ignore_case;
    }
    op() {
      return "starts";
    }
    code() {
      return 37;
    }
    test(doc) {
      const { val } = find(doc, this.path);
      if (typeof val !== "string")
        return false;
      const outer = this.ignore_case ? val.toLowerCase() : val;
      const inner = this.ignore_case ? this.value.toLowerCase() : this.value;
      const test = outer.startsWith(inner);
      return test;
    }
    toJson(parent) {
      const op = {
        op: "starts",
        path: formatJsonPointer(parent ? this.path.slice(parent.path.length) : this.path),
        value: this.value
      };
      if (this.ignore_case)
        op.ignore_case = this.ignore_case;
      return op;
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "starts" : 37;
      return this.ignore_case ? [opcode, parent ? this.path.slice(parent.path.length) : this.path, this.value, 1] : [opcode, parent ? this.path.slice(parent.path.length) : this.path, this.value];
    }
    encode(encoder, parent) {
      const ignoreCase = this.ignore_case;
      encoder.encodeArrayHeader(ignoreCase ? 4 : 3);
      encoder.writer.u8(37);
      encoder.encodeArray(parent ? this.path.slice(parent.path.length) : this.path);
      encoder.encodeString(this.value);
      if (ignoreCase)
        encoder.writer.u8(1);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpIn.js
  var OpIn = class extends AbstractPredicateOp {
    constructor(path, value) {
      super(path);
      __publicField(this, "value");
      this.value = value;
    }
    op() {
      return "in";
    }
    code() {
      return 33;
    }
    test(doc) {
      const { val } = find(doc, this.path);
      for (const x2 of this.value)
        if (deepEqual(val, x2))
          return true;
      return false;
    }
    toJson(parent) {
      const op = {
        op: "in",
        path: formatJsonPointer(parent ? this.path.slice(parent.path.length) : this.path),
        value: this.value
      };
      return op;
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "in" : 33;
      return [opcode, parent ? this.path.slice(parent.path.length) : this.path, this.value];
    }
    encode(encoder, parent) {
      encoder.encodeArrayHeader(3);
      encoder.writer.u8(33);
      encoder.encodeArray(parent ? this.path.slice(parent.path.length) : this.path);
      encoder.encodeArray(this.value);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpLess.js
  var OpLess = class extends AbstractPredicateOp {
    constructor(path, value) {
      super(path);
      __publicField(this, "value");
      this.value = value;
    }
    op() {
      return "less";
    }
    code() {
      return 34;
    }
    test(doc) {
      const { val } = find(doc, this.path);
      if (typeof val !== "number")
        return false;
      const test = val < this.value;
      return test;
    }
    toJson(parent) {
      const op = {
        op: "less",
        path: formatJsonPointer(parent ? this.path.slice(parent.path.length) : this.path),
        value: this.value
      };
      return op;
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "less" : 34;
      return [opcode, parent ? this.path.slice(parent.path.length) : this.path, this.value];
    }
    encode(encoder, parent) {
      encoder.encodeArrayHeader(3);
      encoder.writer.u8(34);
      encoder.encodeArray(parent ? this.path.slice(parent.path.length) : this.path);
      encoder.encodeNumber(this.value);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpMore.js
  var OpMore = class extends AbstractPredicateOp {
    constructor(path, value) {
      super(path);
      __publicField(this, "value");
      this.value = value;
    }
    op() {
      return "more";
    }
    code() {
      return 36;
    }
    test(doc) {
      const { val } = find(doc, this.path);
      if (typeof val !== "number")
        return false;
      const test = val > this.value;
      return test;
    }
    toJson(parent) {
      const op = {
        op: "more",
        path: formatJsonPointer(parent ? this.path.slice(parent.path.length) : this.path),
        value: this.value
      };
      return op;
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "more" : 36;
      return [opcode, parent ? this.path.slice(parent.path.length) : this.path, this.value];
    }
    encode(encoder, parent) {
      encoder.encodeArrayHeader(3);
      encoder.writer.u8(36);
      encoder.encodeArray(parent ? this.path.slice(parent.path.length) : this.path);
      encoder.encodeNumber(this.value);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/AbstractSecondOrderPredicateOp.js
  var AbstractSecondOrderPredicateOp = class extends AbstractPredicateOp {
    constructor(path, ops) {
      super(path);
      __publicField(this, "ops");
      this.ops = ops;
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpAnd.js
  var OpAnd = class extends AbstractSecondOrderPredicateOp {
    constructor(path, ops) {
      super(path, ops);
      __publicField(this, "ops");
      this.ops = ops;
    }
    op() {
      return "and";
    }
    code() {
      return 43;
    }
    test(doc) {
      for (const op of this.ops)
        if (!op.test(doc))
          return false;
      return true;
    }
    toJson(parent) {
      const op = {
        op: "and",
        path: formatJsonPointer(parent ? this.path.slice(parent.path.length) : this.path),
        apply: this.ops.map((op2) => op2.toJson(this))
      };
      return op;
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "and" : 43;
      return [
        opcode,
        parent ? this.path.slice(parent.path.length) : this.path,
        this.ops.map((op) => op.toCompact(this, verbose))
      ];
    }
    encode(encoder, parent) {
      const path = parent ? this.path.slice(parent.path.length) : this.path;
      encoder.encodeArrayHeader(3);
      encoder.writer.u8(43);
      encoder.encodeArray(path);
      const length = this.ops.length;
      encoder.encodeArrayHeader(length);
      for (let i5 = 0; i5 < length; i5++)
        this.ops[i5].encode(encoder, this);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpOr.js
  var OpOr = class extends AbstractSecondOrderPredicateOp {
    constructor(path, ops) {
      super(path, ops);
      __publicField(this, "ops");
      this.ops = ops;
    }
    op() {
      return "or";
    }
    code() {
      return 45;
    }
    test(doc) {
      for (const op of this.ops)
        if (op.test(doc))
          return true;
      return false;
    }
    toJson(parent) {
      const op = {
        op: "or",
        path: formatJsonPointer(parent ? this.path.slice(parent.path.length) : this.path),
        apply: this.ops.map((op2) => op2.toJson(this))
      };
      return op;
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "or" : 45;
      return [
        opcode,
        parent ? this.path.slice(parent.path.length) : this.path,
        this.ops.map((op) => op.toCompact(this, verbose))
      ];
    }
    encode(encoder, parent) {
      encoder.encodeArrayHeader(3);
      encoder.writer.u8(45);
      encoder.encodeArray(parent ? this.path.slice(parent.path.length) : this.path);
      const length = this.ops.length;
      encoder.encodeArrayHeader(length);
      for (let i5 = 0; i5 < length; i5++)
        this.ops[i5].encode(encoder, this);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpNot.js
  var OpNot = class extends AbstractSecondOrderPredicateOp {
    constructor(path, ops) {
      super(path, ops);
      __publicField(this, "ops");
      this.ops = ops;
    }
    op() {
      return "not";
    }
    code() {
      return 44;
    }
    test(doc) {
      for (const op of this.ops)
        if (op.test(doc))
          return false;
      return true;
    }
    toJson(parent) {
      const op = {
        op: "not",
        path: formatJsonPointer(parent ? this.path.slice(parent.path.length) : this.path),
        apply: this.ops.map((op2) => op2.toJson(this))
      };
      return op;
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "not" : 44;
      return [
        opcode,
        parent ? this.path.slice(parent.path.length) : this.path,
        this.ops.map((op) => op.toCompact(this, verbose))
      ];
    }
    encode(encoder, parent) {
      encoder.encodeArrayHeader(3);
      encoder.writer.u8(44);
      encoder.encodeArray(parent ? this.path.slice(parent.path.length) : this.path);
      const length = this.ops.length;
      encoder.encodeArrayHeader(length);
      for (let i5 = 0; i5 < length; i5++)
        this.ops[i5].encode(encoder, this);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpMatches.js
  var OpMatches = class extends AbstractPredicateOp {
    constructor(path, value, ignore_case, createMatcher) {
      super(path);
      __publicField(this, "value");
      __publicField(this, "ignore_case");
      __publicField(this, "matcher");
      this.value = value;
      this.ignore_case = ignore_case;
      this.matcher = createMatcher(value, ignore_case);
    }
    op() {
      return "matches";
    }
    code() {
      return 35;
    }
    test(doc) {
      const { val } = find(doc, this.path);
      if (typeof val !== "string")
        return false;
      const test = this.matcher(val);
      return test;
    }
    toJson(parent) {
      const op = {
        op: "matches",
        path: formatJsonPointer(parent ? this.path.slice(parent.path.length) : this.path),
        value: this.value
      };
      if (this.ignore_case)
        op.ignore_case = this.ignore_case;
      return op;
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "matches" : 35;
      return this.ignore_case ? [opcode, parent ? this.path.slice(parent.path.length) : this.path, this.value, 1] : [opcode, parent ? this.path.slice(parent.path.length) : this.path, this.value];
    }
    encode(encoder, parent) {
      const ignoreCase = this.ignore_case;
      encoder.encodeArrayHeader(ignoreCase ? 4 : 3);
      encoder.writer.u8(35);
      encoder.encodeArray(parent ? this.path.slice(parent.path.length) : this.path);
      encoder.encodeString(this.value);
      if (ignoreCase)
        encoder.writer.u8(1);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpType.js
  var { isArray: isArray8 } = Array;
  var OpType = class extends AbstractPredicateOp {
    constructor(path, value) {
      super(path);
      __publicField(this, "value");
      this.value = value;
    }
    op() {
      return "type";
    }
    code() {
      return 42;
    }
    test(doc) {
      const { val } = find(doc, this.path);
      if (val === null)
        return this.value === "null";
      if (isArray8(val))
        return this.value === "array";
      if (typeof val === this.value)
        return true;
      if (typeof val === "number" && val === Math.round(val) && this.value === "integer")
        return true;
      return false;
    }
    toJson(parent) {
      const op = {
        op: "type",
        path: formatJsonPointer(parent ? this.path.slice(parent.path.length) : this.path),
        value: this.value
      };
      return op;
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "type" : 42;
      return [opcode, parent ? this.path.slice(parent.path.length) : this.path, this.value];
    }
    encode(encoder, parent) {
      encoder.encodeArrayHeader(3);
      encoder.writer.u8(42);
      encoder.encodeArray(parent ? this.path.slice(parent.path.length) : this.path);
      encoder.encodeString(this.value);
    }
  };

  // node_modules/json-joy/esm/json-patch/codec/json/decode.js
  var operationToOp = (op, options) => {
    switch (op.op) {
      case "add":
        return new OpAdd(toPath(op.path), op.value);
      case "remove":
        return new OpRemove(toPath(op.path), op.oldValue);
      case "replace":
        return new OpReplace(toPath(op.path), op.value, op.oldValue);
      case "move":
        return new OpMove(toPath(op.path), toPath(op.from));
      case "copy":
        return new OpCopy(toPath(op.path), toPath(op.from));
      case "flip":
        return new OpFlip(toPath(op.path));
      case "inc":
        return new OpInc(toPath(op.path), op.inc);
      case "str_ins":
        return new OpStrIns(toPath(op.path), op.pos, op.str);
      case "str_del":
        return new OpStrDel(toPath(op.path), op.pos, op.str, op.len);
      case "split":
        return new OpSplit(toPath(op.path), op.pos, op.props || null);
      case "merge":
        return new OpMerge(toPath(op.path), op.pos, op.props || null);
      case "extend":
        return new OpExtend(toPath(op.path), op.props, !!op.deleteNull);
      default:
        return operationToPredicateOp(op, options);
    }
  };
  var operationToPredicateOp = (op, options) => {
    switch (op.op) {
      case "test":
        return new OpTest(toPath(op.path), op.value, !!op.not);
      case "defined":
        return new OpDefined(toPath(op.path));
      case "undefined":
        return new OpUndefined(toPath(op.path));
      case "type":
        return new OpType(toPath(op.path), op.value);
      case "test_type":
        return new OpTestType(toPath(op.path), op.type);
      case "test_string":
        return new OpTestString(toPath(op.path), op.pos, op.str, !!op.not);
      case "test_string_len":
        return new OpTestStringLen(toPath(op.path), op.len, !!op.not);
      case "contains":
        return new OpContains(toPath(op.path), op.value, !!op.ignore_case);
      case "ends":
        return new OpEnds(toPath(op.path), op.value, !!op.ignore_case);
      case "starts":
        return new OpStarts(toPath(op.path), op.value, !!op.ignore_case);
      case "matches":
        return new OpMatches(toPath(op.path), op.value, !!op.ignore_case, options.createMatcher || createMatcherDefault);
      case "in":
        return new OpIn(toPath(op.path), op.value);
      case "less":
        return new OpLess(toPath(op.path), op.value);
      case "more":
        return new OpMore(toPath(op.path), op.value);
      case "and": {
        const path = toPath(op.path);
        return new OpAnd(path, op.apply.map((x2) => operationToPredicateOp({ ...x2, path: [...path, ...toPath(x2.path)] }, options)));
      }
      case "or": {
        const path = toPath(op.path);
        return new OpOr(path, op.apply.map((x2) => operationToPredicateOp({ ...x2, path: [...path, ...toPath(x2.path)] }, options)));
      }
      case "not": {
        const path = toPath(op.path);
        return new OpNot(path, op.apply.map((x2) => operationToPredicateOp({ ...x2, path: [...path, ...toPath(x2.path)] }, options)));
      }
      default:
        throw new Error("OP_UNKNOWN");
    }
  };

  // node_modules/json-joy/esm/json-patch/applyPatch/v4.js
  function applyPatch(doc, patch, options) {
    if (!options.mutate)
      doc = clone(doc);
    const res = [];
    const length = patch.length;
    for (let i5 = 0; i5 < length; i5++) {
      const op = operationToOp(patch[i5], options);
      const opResult = op.apply(doc);
      doc = opResult.doc;
      res.push(opResult);
    }
    return { doc, res };
  }

  // node_modules/phx-live-state/node_modules/phoenix/priv/static/phoenix.mjs
  var closure = (value) => {
    if (typeof value === "function") {
      return value;
    } else {
      let closure2 = function() {
        return value;
      };
      return closure2;
    }
  };
  var globalSelf = typeof self !== "undefined" ? self : null;
  var phxWindow = typeof window !== "undefined" ? window : null;
  var global2 = globalSelf || phxWindow || global2;
  var DEFAULT_VSN = "2.0.0";
  var SOCKET_STATES = { connecting: 0, open: 1, closing: 2, closed: 3 };
  var DEFAULT_TIMEOUT = 1e4;
  var WS_CLOSE_NORMAL = 1e3;
  var CHANNEL_STATES = {
    closed: "closed",
    errored: "errored",
    joined: "joined",
    joining: "joining",
    leaving: "leaving"
  };
  var CHANNEL_EVENTS = {
    close: "phx_close",
    error: "phx_error",
    join: "phx_join",
    reply: "phx_reply",
    leave: "phx_leave"
  };
  var TRANSPORTS = {
    longpoll: "longpoll",
    websocket: "websocket"
  };
  var XHR_STATES = {
    complete: 4
  };
  var Push = class {
    constructor(channel, event, payload, timeout) {
      this.channel = channel;
      this.event = event;
      this.payload = payload || function() {
        return {};
      };
      this.receivedResp = null;
      this.timeout = timeout;
      this.timeoutTimer = null;
      this.recHooks = [];
      this.sent = false;
    }
    resend(timeout) {
      this.timeout = timeout;
      this.reset();
      this.send();
    }
    send() {
      if (this.hasReceived("timeout")) {
        return;
      }
      this.startTimeout();
      this.sent = true;
      this.channel.socket.push({
        topic: this.channel.topic,
        event: this.event,
        payload: this.payload(),
        ref: this.ref,
        join_ref: this.channel.joinRef()
      });
    }
    receive(status, callback) {
      if (this.hasReceived(status)) {
        callback(this.receivedResp.response);
      }
      this.recHooks.push({ status, callback });
      return this;
    }
    reset() {
      this.cancelRefEvent();
      this.ref = null;
      this.refEvent = null;
      this.receivedResp = null;
      this.sent = false;
    }
    matchReceive({ status, response, _ref }) {
      this.recHooks.filter((h3) => h3.status === status).forEach((h3) => h3.callback(response));
    }
    cancelRefEvent() {
      if (!this.refEvent) {
        return;
      }
      this.channel.off(this.refEvent);
    }
    cancelTimeout() {
      clearTimeout(this.timeoutTimer);
      this.timeoutTimer = null;
    }
    startTimeout() {
      if (this.timeoutTimer) {
        this.cancelTimeout();
      }
      this.ref = this.channel.socket.makeRef();
      this.refEvent = this.channel.replyEventName(this.ref);
      this.channel.on(this.refEvent, (payload) => {
        this.cancelRefEvent();
        this.cancelTimeout();
        this.receivedResp = payload;
        this.matchReceive(payload);
      });
      this.timeoutTimer = setTimeout(() => {
        this.trigger("timeout", {});
      }, this.timeout);
    }
    hasReceived(status) {
      return this.receivedResp && this.receivedResp.status === status;
    }
    trigger(status, response) {
      this.channel.trigger(this.refEvent, { status, response });
    }
  };
  var Timer = class {
    constructor(callback, timerCalc) {
      this.callback = callback;
      this.timerCalc = timerCalc;
      this.timer = null;
      this.tries = 0;
    }
    reset() {
      this.tries = 0;
      clearTimeout(this.timer);
    }
    scheduleTimeout() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.tries = this.tries + 1;
        this.callback();
      }, this.timerCalc(this.tries + 1));
    }
  };
  var Channel = class {
    constructor(topic, params, socket) {
      this.state = CHANNEL_STATES.closed;
      this.topic = topic;
      this.params = closure(params || {});
      this.socket = socket;
      this.bindings = [];
      this.bindingRef = 0;
      this.timeout = this.socket.timeout;
      this.joinedOnce = false;
      this.joinPush = new Push(this, CHANNEL_EVENTS.join, this.params, this.timeout);
      this.pushBuffer = [];
      this.stateChangeRefs = [];
      this.rejoinTimer = new Timer(() => {
        if (this.socket.isConnected()) {
          this.rejoin();
        }
      }, this.socket.rejoinAfterMs);
      this.stateChangeRefs.push(this.socket.onError(() => this.rejoinTimer.reset()));
      this.stateChangeRefs.push(this.socket.onOpen(() => {
        this.rejoinTimer.reset();
        if (this.isErrored()) {
          this.rejoin();
        }
      }));
      this.joinPush.receive("ok", () => {
        this.state = CHANNEL_STATES.joined;
        this.rejoinTimer.reset();
        this.pushBuffer.forEach((pushEvent) => pushEvent.send());
        this.pushBuffer = [];
      });
      this.joinPush.receive("error", () => {
        this.state = CHANNEL_STATES.errored;
        if (this.socket.isConnected()) {
          this.rejoinTimer.scheduleTimeout();
        }
      });
      this.onClose(() => {
        this.rejoinTimer.reset();
        if (this.socket.hasLogger())
          this.socket.log("channel", `close ${this.topic} ${this.joinRef()}`);
        this.state = CHANNEL_STATES.closed;
        this.socket.remove(this);
      });
      this.onError((reason) => {
        if (this.socket.hasLogger())
          this.socket.log("channel", `error ${this.topic}`, reason);
        if (this.isJoining()) {
          this.joinPush.reset();
        }
        this.state = CHANNEL_STATES.errored;
        if (this.socket.isConnected()) {
          this.rejoinTimer.scheduleTimeout();
        }
      });
      this.joinPush.receive("timeout", () => {
        if (this.socket.hasLogger())
          this.socket.log("channel", `timeout ${this.topic} (${this.joinRef()})`, this.joinPush.timeout);
        let leavePush = new Push(this, CHANNEL_EVENTS.leave, closure({}), this.timeout);
        leavePush.send();
        this.state = CHANNEL_STATES.errored;
        this.joinPush.reset();
        if (this.socket.isConnected()) {
          this.rejoinTimer.scheduleTimeout();
        }
      });
      this.on(CHANNEL_EVENTS.reply, (payload, ref) => {
        this.trigger(this.replyEventName(ref), payload);
      });
    }
    join(timeout = this.timeout) {
      if (this.joinedOnce) {
        throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");
      } else {
        this.timeout = timeout;
        this.joinedOnce = true;
        this.rejoin();
        return this.joinPush;
      }
    }
    onClose(callback) {
      this.on(CHANNEL_EVENTS.close, callback);
    }
    onError(callback) {
      return this.on(CHANNEL_EVENTS.error, (reason) => callback(reason));
    }
    on(event, callback) {
      let ref = this.bindingRef++;
      this.bindings.push({ event, ref, callback });
      return ref;
    }
    off(event, ref) {
      this.bindings = this.bindings.filter((bind) => {
        return !(bind.event === event && (typeof ref === "undefined" || ref === bind.ref));
      });
    }
    canPush() {
      return this.socket.isConnected() && this.isJoined();
    }
    push(event, payload, timeout = this.timeout) {
      payload = payload || {};
      if (!this.joinedOnce) {
        throw new Error(`tried to push '${event}' to '${this.topic}' before joining. Use channel.join() before pushing events`);
      }
      let pushEvent = new Push(this, event, function() {
        return payload;
      }, timeout);
      if (this.canPush()) {
        pushEvent.send();
      } else {
        pushEvent.startTimeout();
        this.pushBuffer.push(pushEvent);
      }
      return pushEvent;
    }
    leave(timeout = this.timeout) {
      this.rejoinTimer.reset();
      this.joinPush.cancelTimeout();
      this.state = CHANNEL_STATES.leaving;
      let onClose = () => {
        if (this.socket.hasLogger())
          this.socket.log("channel", `leave ${this.topic}`);
        this.trigger(CHANNEL_EVENTS.close, "leave");
      };
      let leavePush = new Push(this, CHANNEL_EVENTS.leave, closure({}), timeout);
      leavePush.receive("ok", () => onClose()).receive("timeout", () => onClose());
      leavePush.send();
      if (!this.canPush()) {
        leavePush.trigger("ok", {});
      }
      return leavePush;
    }
    onMessage(_event, payload, _ref) {
      return payload;
    }
    isMember(topic, event, payload, joinRef) {
      if (this.topic !== topic) {
        return false;
      }
      if (joinRef && joinRef !== this.joinRef()) {
        if (this.socket.hasLogger())
          this.socket.log("channel", "dropping outdated message", { topic, event, payload, joinRef });
        return false;
      } else {
        return true;
      }
    }
    joinRef() {
      return this.joinPush.ref;
    }
    rejoin(timeout = this.timeout) {
      if (this.isLeaving()) {
        return;
      }
      this.socket.leaveOpenTopic(this.topic);
      this.state = CHANNEL_STATES.joining;
      this.joinPush.resend(timeout);
    }
    trigger(event, payload, ref, joinRef) {
      let handledPayload = this.onMessage(event, payload, ref, joinRef);
      if (payload && !handledPayload) {
        throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");
      }
      let eventBindings = this.bindings.filter((bind) => bind.event === event);
      for (let i5 = 0; i5 < eventBindings.length; i5++) {
        let bind = eventBindings[i5];
        bind.callback(handledPayload, ref, joinRef || this.joinRef());
      }
    }
    replyEventName(ref) {
      return `chan_reply_${ref}`;
    }
    isClosed() {
      return this.state === CHANNEL_STATES.closed;
    }
    isErrored() {
      return this.state === CHANNEL_STATES.errored;
    }
    isJoined() {
      return this.state === CHANNEL_STATES.joined;
    }
    isJoining() {
      return this.state === CHANNEL_STATES.joining;
    }
    isLeaving() {
      return this.state === CHANNEL_STATES.leaving;
    }
  };
  var Ajax = class {
    static request(method, endPoint, accept, body, timeout, ontimeout, callback) {
      if (global2.XDomainRequest) {
        let req = new global2.XDomainRequest();
        return this.xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback);
      } else {
        let req = new global2.XMLHttpRequest();
        return this.xhrRequest(req, method, endPoint, accept, body, timeout, ontimeout, callback);
      }
    }
    static xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback) {
      req.timeout = timeout;
      req.open(method, endPoint);
      req.onload = () => {
        let response = this.parseJSON(req.responseText);
        callback && callback(response);
      };
      if (ontimeout) {
        req.ontimeout = ontimeout;
      }
      req.onprogress = () => {
      };
      req.send(body);
      return req;
    }
    static xhrRequest(req, method, endPoint, accept, body, timeout, ontimeout, callback) {
      req.open(method, endPoint, true);
      req.timeout = timeout;
      req.setRequestHeader("Content-Type", accept);
      req.onerror = () => callback && callback(null);
      req.onreadystatechange = () => {
        if (req.readyState === XHR_STATES.complete && callback) {
          let response = this.parseJSON(req.responseText);
          callback(response);
        }
      };
      if (ontimeout) {
        req.ontimeout = ontimeout;
      }
      req.send(body);
      return req;
    }
    static parseJSON(resp) {
      if (!resp || resp === "") {
        return null;
      }
      try {
        return JSON.parse(resp);
      } catch (e7) {
        console && console.log("failed to parse JSON response", resp);
        return null;
      }
    }
    static serialize(obj, parentKey) {
      let queryStr = [];
      for (var key in obj) {
        if (!Object.prototype.hasOwnProperty.call(obj, key)) {
          continue;
        }
        let paramKey = parentKey ? `${parentKey}[${key}]` : key;
        let paramVal = obj[key];
        if (typeof paramVal === "object") {
          queryStr.push(this.serialize(paramVal, paramKey));
        } else {
          queryStr.push(encodeURIComponent(paramKey) + "=" + encodeURIComponent(paramVal));
        }
      }
      return queryStr.join("&");
    }
    static appendParams(url, params) {
      if (Object.keys(params).length === 0) {
        return url;
      }
      let prefix = url.match(/\?/) ? "&" : "?";
      return `${url}${prefix}${this.serialize(params)}`;
    }
  };
  var LongPoll = class {
    constructor(endPoint) {
      this.endPoint = null;
      this.token = null;
      this.skipHeartbeat = true;
      this.reqs = /* @__PURE__ */ new Set();
      this.onopen = function() {
      };
      this.onerror = function() {
      };
      this.onmessage = function() {
      };
      this.onclose = function() {
      };
      this.pollEndpoint = this.normalizeEndpoint(endPoint);
      this.readyState = SOCKET_STATES.connecting;
      this.poll();
    }
    normalizeEndpoint(endPoint) {
      return endPoint.replace("ws://", "http://").replace("wss://", "https://").replace(new RegExp("(.*)/" + TRANSPORTS.websocket), "$1/" + TRANSPORTS.longpoll);
    }
    endpointURL() {
      return Ajax.appendParams(this.pollEndpoint, { token: this.token });
    }
    closeAndRetry(code, reason, wasClean) {
      this.close(code, reason, wasClean);
      this.readyState = SOCKET_STATES.connecting;
    }
    ontimeout() {
      this.onerror("timeout");
      this.closeAndRetry(1005, "timeout", false);
    }
    isActive() {
      return this.readyState === SOCKET_STATES.open || this.readyState === SOCKET_STATES.connecting;
    }
    poll() {
      this.ajax("GET", null, () => this.ontimeout(), (resp) => {
        if (resp) {
          var { status, token, messages } = resp;
          this.token = token;
        } else {
          status = 0;
        }
        switch (status) {
          case 200:
            messages.forEach((msg) => {
              setTimeout(() => this.onmessage({ data: msg }), 0);
            });
            this.poll();
            break;
          case 204:
            this.poll();
            break;
          case 410:
            this.readyState = SOCKET_STATES.open;
            this.onopen({});
            this.poll();
            break;
          case 403:
            this.onerror(403);
            this.close(1008, "forbidden", false);
            break;
          case 0:
          case 500:
            this.onerror(500);
            this.closeAndRetry(1011, "internal server error", 500);
            break;
          default:
            throw new Error(`unhandled poll status ${status}`);
        }
      });
    }
    send(body) {
      this.ajax("POST", body, () => this.onerror("timeout"), (resp) => {
        if (!resp || resp.status !== 200) {
          this.onerror(resp && resp.status);
          this.closeAndRetry(1011, "internal server error", false);
        }
      });
    }
    close(code, reason, wasClean) {
      for (let req of this.reqs) {
        req.abort();
      }
      this.readyState = SOCKET_STATES.closed;
      let opts = Object.assign({ code: 1e3, reason: void 0, wasClean: true }, { code, reason, wasClean });
      if (typeof CloseEvent !== "undefined") {
        this.onclose(new CloseEvent("close", opts));
      } else {
        this.onclose(opts);
      }
    }
    ajax(method, body, onCallerTimeout, callback) {
      let req;
      let ontimeout = () => {
        this.reqs.delete(req);
        onCallerTimeout();
      };
      req = Ajax.request(method, this.endpointURL(), "application/json", body, this.timeout, ontimeout, (resp) => {
        this.reqs.delete(req);
        if (this.isActive()) {
          callback(resp);
        }
      });
      this.reqs.add(req);
    }
  };
  var serializer_default = {
    HEADER_LENGTH: 1,
    META_LENGTH: 4,
    KINDS: { push: 0, reply: 1, broadcast: 2 },
    encode(msg, callback) {
      if (msg.payload.constructor === ArrayBuffer) {
        return callback(this.binaryEncode(msg));
      } else {
        let payload = [msg.join_ref, msg.ref, msg.topic, msg.event, msg.payload];
        return callback(JSON.stringify(payload));
      }
    },
    decode(rawPayload, callback) {
      if (rawPayload.constructor === ArrayBuffer) {
        return callback(this.binaryDecode(rawPayload));
      } else {
        let [join_ref, ref, topic, event, payload] = JSON.parse(rawPayload);
        return callback({ join_ref, ref, topic, event, payload });
      }
    },
    binaryEncode(message) {
      let { join_ref, ref, event, topic, payload } = message;
      let metaLength = this.META_LENGTH + join_ref.length + ref.length + topic.length + event.length;
      let header = new ArrayBuffer(this.HEADER_LENGTH + metaLength);
      let view = new DataView(header);
      let offset = 0;
      view.setUint8(offset++, this.KINDS.push);
      view.setUint8(offset++, join_ref.length);
      view.setUint8(offset++, ref.length);
      view.setUint8(offset++, topic.length);
      view.setUint8(offset++, event.length);
      Array.from(join_ref, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      Array.from(ref, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      Array.from(topic, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      Array.from(event, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      var combined = new Uint8Array(header.byteLength + payload.byteLength);
      combined.set(new Uint8Array(header), 0);
      combined.set(new Uint8Array(payload), header.byteLength);
      return combined.buffer;
    },
    binaryDecode(buffer) {
      let view = new DataView(buffer);
      let kind = view.getUint8(0);
      let decoder = new TextDecoder();
      switch (kind) {
        case this.KINDS.push:
          return this.decodePush(buffer, view, decoder);
        case this.KINDS.reply:
          return this.decodeReply(buffer, view, decoder);
        case this.KINDS.broadcast:
          return this.decodeBroadcast(buffer, view, decoder);
      }
    },
    decodePush(buffer, view, decoder) {
      let joinRefSize = view.getUint8(1);
      let topicSize = view.getUint8(2);
      let eventSize = view.getUint8(3);
      let offset = this.HEADER_LENGTH + this.META_LENGTH - 1;
      let joinRef = decoder.decode(buffer.slice(offset, offset + joinRefSize));
      offset = offset + joinRefSize;
      let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      let event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      let data = buffer.slice(offset, buffer.byteLength);
      return { join_ref: joinRef, ref: null, topic, event, payload: data };
    },
    decodeReply(buffer, view, decoder) {
      let joinRefSize = view.getUint8(1);
      let refSize = view.getUint8(2);
      let topicSize = view.getUint8(3);
      let eventSize = view.getUint8(4);
      let offset = this.HEADER_LENGTH + this.META_LENGTH;
      let joinRef = decoder.decode(buffer.slice(offset, offset + joinRefSize));
      offset = offset + joinRefSize;
      let ref = decoder.decode(buffer.slice(offset, offset + refSize));
      offset = offset + refSize;
      let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      let event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      let data = buffer.slice(offset, buffer.byteLength);
      let payload = { status: event, response: data };
      return { join_ref: joinRef, ref, topic, event: CHANNEL_EVENTS.reply, payload };
    },
    decodeBroadcast(buffer, view, decoder) {
      let topicSize = view.getUint8(1);
      let eventSize = view.getUint8(2);
      let offset = this.HEADER_LENGTH + 2;
      let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      let event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      let data = buffer.slice(offset, buffer.byteLength);
      return { join_ref: null, ref: null, topic, event, payload: data };
    }
  };
  var Socket = class {
    constructor(endPoint, opts = {}) {
      this.stateChangeCallbacks = { open: [], close: [], error: [], message: [] };
      this.channels = [];
      this.sendBuffer = [];
      this.ref = 0;
      this.timeout = opts.timeout || DEFAULT_TIMEOUT;
      this.transport = opts.transport || global2.WebSocket || LongPoll;
      this.establishedConnections = 0;
      this.defaultEncoder = serializer_default.encode.bind(serializer_default);
      this.defaultDecoder = serializer_default.decode.bind(serializer_default);
      this.closeWasClean = false;
      this.binaryType = opts.binaryType || "arraybuffer";
      this.connectClock = 1;
      if (this.transport !== LongPoll) {
        this.encode = opts.encode || this.defaultEncoder;
        this.decode = opts.decode || this.defaultDecoder;
      } else {
        this.encode = this.defaultEncoder;
        this.decode = this.defaultDecoder;
      }
      let awaitingConnectionOnPageShow = null;
      if (phxWindow && phxWindow.addEventListener) {
        phxWindow.addEventListener("pagehide", (_e) => {
          if (this.conn) {
            this.disconnect();
            awaitingConnectionOnPageShow = this.connectClock;
          }
        });
        phxWindow.addEventListener("pageshow", (_e) => {
          if (awaitingConnectionOnPageShow === this.connectClock) {
            awaitingConnectionOnPageShow = null;
            this.connect();
          }
        });
      }
      this.heartbeatIntervalMs = opts.heartbeatIntervalMs || 3e4;
      this.rejoinAfterMs = (tries) => {
        if (opts.rejoinAfterMs) {
          return opts.rejoinAfterMs(tries);
        } else {
          return [1e3, 2e3, 5e3][tries - 1] || 1e4;
        }
      };
      this.reconnectAfterMs = (tries) => {
        if (opts.reconnectAfterMs) {
          return opts.reconnectAfterMs(tries);
        } else {
          return [10, 50, 100, 150, 200, 250, 500, 1e3, 2e3][tries - 1] || 5e3;
        }
      };
      this.logger = opts.logger || null;
      this.longpollerTimeout = opts.longpollerTimeout || 2e4;
      this.params = closure(opts.params || {});
      this.endPoint = `${endPoint}/${TRANSPORTS.websocket}`;
      this.vsn = opts.vsn || DEFAULT_VSN;
      this.heartbeatTimeoutTimer = null;
      this.heartbeatTimer = null;
      this.pendingHeartbeatRef = null;
      this.reconnectTimer = new Timer(() => {
        this.teardown(() => this.connect());
      }, this.reconnectAfterMs);
    }
    getLongPollTransport() {
      return LongPoll;
    }
    replaceTransport(newTransport) {
      this.connectClock++;
      this.closeWasClean = true;
      this.reconnectTimer.reset();
      this.sendBuffer = [];
      if (this.conn) {
        this.conn.close();
        this.conn = null;
      }
      this.transport = newTransport;
    }
    protocol() {
      return location.protocol.match(/^https/) ? "wss" : "ws";
    }
    endPointURL() {
      let uri = Ajax.appendParams(Ajax.appendParams(this.endPoint, this.params()), { vsn: this.vsn });
      if (uri.charAt(0) !== "/") {
        return uri;
      }
      if (uri.charAt(1) === "/") {
        return `${this.protocol()}:${uri}`;
      }
      return `${this.protocol()}://${location.host}${uri}`;
    }
    disconnect(callback, code, reason) {
      this.connectClock++;
      this.closeWasClean = true;
      this.reconnectTimer.reset();
      this.teardown(callback, code, reason);
    }
    connect(params) {
      if (params) {
        console && console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor");
        this.params = closure(params);
      }
      if (this.conn) {
        return;
      }
      this.connectClock++;
      this.closeWasClean = false;
      this.conn = new this.transport(this.endPointURL());
      this.conn.binaryType = this.binaryType;
      this.conn.timeout = this.longpollerTimeout;
      this.conn.onopen = () => this.onConnOpen();
      this.conn.onerror = (error) => this.onConnError(error);
      this.conn.onmessage = (event) => this.onConnMessage(event);
      this.conn.onclose = (event) => this.onConnClose(event);
    }
    log(kind, msg, data) {
      this.logger(kind, msg, data);
    }
    hasLogger() {
      return this.logger !== null;
    }
    onOpen(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.open.push([ref, callback]);
      return ref;
    }
    onClose(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.close.push([ref, callback]);
      return ref;
    }
    onError(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.error.push([ref, callback]);
      return ref;
    }
    onMessage(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.message.push([ref, callback]);
      return ref;
    }
    ping(callback) {
      if (!this.isConnected()) {
        return false;
      }
      let ref = this.makeRef();
      let startTime = Date.now();
      this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref });
      let onMsgRef = this.onMessage((msg) => {
        if (msg.ref === ref) {
          this.off([onMsgRef]);
          callback(Date.now() - startTime);
        }
      });
      return true;
    }
    clearHeartbeats() {
      clearTimeout(this.heartbeatTimer);
      clearTimeout(this.heartbeatTimeoutTimer);
    }
    onConnOpen() {
      if (this.hasLogger())
        this.log("transport", `connected to ${this.endPointURL()}`);
      this.closeWasClean = false;
      this.establishedConnections++;
      this.flushSendBuffer();
      this.reconnectTimer.reset();
      this.resetHeartbeat();
      this.stateChangeCallbacks.open.forEach(([, callback]) => callback());
    }
    heartbeatTimeout() {
      if (this.pendingHeartbeatRef) {
        this.pendingHeartbeatRef = null;
        if (this.hasLogger()) {
          this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
        }
        this.triggerChanError();
        this.closeWasClean = false;
        this.teardown(() => this.reconnectTimer.scheduleTimeout(), WS_CLOSE_NORMAL, "heartbeat timeout");
      }
    }
    resetHeartbeat() {
      if (this.conn && this.conn.skipHeartbeat) {
        return;
      }
      this.pendingHeartbeatRef = null;
      this.clearHeartbeats();
      this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
    }
    teardown(callback, code, reason) {
      if (!this.conn) {
        return callback && callback();
      }
      this.waitForBufferDone(() => {
        if (this.conn) {
          if (code) {
            this.conn.close(code, reason || "");
          } else {
            this.conn.close();
          }
        }
        this.waitForSocketClosed(() => {
          if (this.conn) {
            this.conn.onopen = function() {
            };
            this.conn.onerror = function() {
            };
            this.conn.onmessage = function() {
            };
            this.conn.onclose = function() {
            };
            this.conn = null;
          }
          callback && callback();
        });
      });
    }
    waitForBufferDone(callback, tries = 1) {
      if (tries === 5 || !this.conn || !this.conn.bufferedAmount) {
        callback();
        return;
      }
      setTimeout(() => {
        this.waitForBufferDone(callback, tries + 1);
      }, 150 * tries);
    }
    waitForSocketClosed(callback, tries = 1) {
      if (tries === 5 || !this.conn || this.conn.readyState === SOCKET_STATES.closed) {
        callback();
        return;
      }
      setTimeout(() => {
        this.waitForSocketClosed(callback, tries + 1);
      }, 150 * tries);
    }
    onConnClose(event) {
      let closeCode = event && event.code;
      if (this.hasLogger())
        this.log("transport", "close", event);
      this.triggerChanError();
      this.clearHeartbeats();
      if (!this.closeWasClean && closeCode !== 1e3) {
        this.reconnectTimer.scheduleTimeout();
      }
      this.stateChangeCallbacks.close.forEach(([, callback]) => callback(event));
    }
    onConnError(error) {
      if (this.hasLogger())
        this.log("transport", error);
      let transportBefore = this.transport;
      let establishedBefore = this.establishedConnections;
      this.stateChangeCallbacks.error.forEach(([, callback]) => {
        callback(error, transportBefore, establishedBefore);
      });
      if (transportBefore === this.transport || establishedBefore > 0) {
        this.triggerChanError();
      }
    }
    triggerChanError() {
      this.channels.forEach((channel) => {
        if (!(channel.isErrored() || channel.isLeaving() || channel.isClosed())) {
          channel.trigger(CHANNEL_EVENTS.error);
        }
      });
    }
    connectionState() {
      switch (this.conn && this.conn.readyState) {
        case SOCKET_STATES.connecting:
          return "connecting";
        case SOCKET_STATES.open:
          return "open";
        case SOCKET_STATES.closing:
          return "closing";
        default:
          return "closed";
      }
    }
    isConnected() {
      return this.connectionState() === "open";
    }
    remove(channel) {
      this.off(channel.stateChangeRefs);
      this.channels = this.channels.filter((c3) => c3.joinRef() !== channel.joinRef());
    }
    off(refs) {
      for (let key in this.stateChangeCallbacks) {
        this.stateChangeCallbacks[key] = this.stateChangeCallbacks[key].filter(([ref]) => {
          return refs.indexOf(ref) === -1;
        });
      }
    }
    channel(topic, chanParams = {}) {
      let chan = new Channel(topic, chanParams, this);
      this.channels.push(chan);
      return chan;
    }
    push(data) {
      if (this.hasLogger()) {
        let { topic, event, payload, ref, join_ref } = data;
        this.log("push", `${topic} ${event} (${join_ref}, ${ref})`, payload);
      }
      if (this.isConnected()) {
        this.encode(data, (result) => this.conn.send(result));
      } else {
        this.sendBuffer.push(() => this.encode(data, (result) => this.conn.send(result)));
      }
    }
    makeRef() {
      let newRef = this.ref + 1;
      if (newRef === this.ref) {
        this.ref = 0;
      } else {
        this.ref = newRef;
      }
      return this.ref.toString();
    }
    sendHeartbeat() {
      if (this.pendingHeartbeatRef && !this.isConnected()) {
        return;
      }
      this.pendingHeartbeatRef = this.makeRef();
      this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref: this.pendingHeartbeatRef });
      this.heartbeatTimeoutTimer = setTimeout(() => this.heartbeatTimeout(), this.heartbeatIntervalMs);
    }
    flushSendBuffer() {
      if (this.isConnected() && this.sendBuffer.length > 0) {
        this.sendBuffer.forEach((callback) => callback());
        this.sendBuffer = [];
      }
    }
    onConnMessage(rawMessage) {
      this.decode(rawMessage.data, (msg) => {
        let { topic, event, payload, ref, join_ref } = msg;
        if (ref && ref === this.pendingHeartbeatRef) {
          this.clearHeartbeats();
          this.pendingHeartbeatRef = null;
          this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
        }
        if (this.hasLogger())
          this.log("receive", `${payload.status || ""} ${topic} ${event} ${ref && "(" + ref + ")" || ""}`, payload);
        for (let i5 = 0; i5 < this.channels.length; i5++) {
          const channel = this.channels[i5];
          if (!channel.isMember(topic, event, payload, join_ref)) {
            continue;
          }
          channel.trigger(event, payload, ref, join_ref);
        }
        for (let i5 = 0; i5 < this.stateChangeCallbacks.message.length; i5++) {
          let [, callback] = this.stateChangeCallbacks.message[i5];
          callback(msg);
        }
      });
    }
    leaveOpenTopic(topic) {
      let dupChannel = this.channels.find((c3) => c3.topic === topic && (c3.isJoined() || c3.isJoining()));
      if (dupChannel) {
        if (this.hasLogger())
          this.log("transport", `leaving duplicate topic "${topic}"`);
        dupChannel.leave();
      }
    }
  };

  // node_modules/phx-live-state/build/src/LiveState.js
  var LiveState = class {
    constructor(config) {
      this.connected = false;
      this.config = config;
      this.socket = new Socket(this.config.url, { logger: (kind, msg, data) => {
        console.log(`${kind}: ${msg}`, data);
      } });
      this.channel = this.socket.channel(this.config.topic, this.config.params);
      this.eventTarget = new EventTarget();
    }
    /** connect to socket and join channel. will do nothing if already connected */
    connect() {
      if (!this.connected) {
        this.socket.onError((e7) => this.emitError("socket error", e7));
        this.socket.connect();
        this.channel.onError((e7) => console.log("channel error", e7));
        this.channel.join().receive("ok", () => {
          console.log("joined");
        }).receive("error", (e7) => {
          this.emitError("channel join error", e7);
        });
        this.channel.on("state:change", (state) => this.handleChange(state));
        this.channel.on("state:patch", (patch) => this.handlePatch(patch));
        this.connected = true;
      }
    }
    /** leave channel and disconnect from socket */
    disconnect() {
      this.channel && this.channel.leave();
      this.socket.disconnect();
      this.connected = false;
    }
    /** for events that begin with 'livestate-', add a listener. For
     * other events, additionally call `channel.on` to receive the event
     * over the channel, which will then be dispatched.
     */
    addEventListener(type, listener, options) {
      this.eventTarget.addEventListener(type, listener, options);
      if (!type.startsWith("livestate-")) {
        this.channel?.on(type, (payload) => {
          this.eventTarget.dispatchEvent(new CustomEvent(type, { detail: payload }));
        });
      }
    }
    removeEventListener(type, listener, options) {
      return this.eventTarget.removeEventListener(type, listener, options);
    }
    /** @deprecated */
    subscribe(subscriber) {
      this.addEventListener("livestate-change", subscriber);
    }
    /** @deprecated */
    unsubscribe(subscriber) {
      this.removeEventListener("livestate-change", subscriber);
    }
    emitError(kind, error) {
      this.eventTarget.dispatchEvent(new CustomEvent("livestate-error", {
        detail: {
          kind,
          error
        }
      }));
    }
    handleChange({ state, version }) {
      this.state = state;
      this.stateVersion = version;
      this.eventTarget.dispatchEvent(new CustomEvent("livestate-change", {
        detail: {
          state: this.state,
          version: this.stateVersion
        }
      }));
    }
    handlePatch({ patch, version }) {
      this.eventTarget.dispatchEvent(new CustomEvent("livestate-patch", {
        detail: { patch, version }
      }));
      if (version === this.stateVersion + 1) {
        const { doc, res } = applyPatch(this.state, patch, { mutate: false });
        this.state = doc;
        this.stateVersion = version;
        this.eventTarget.dispatchEvent(new CustomEvent("livestate-change", {
          detail: {
            state: this.state,
            version: this.stateVersion
          }
        }));
      } else {
        this.channel.push("lvs_refresh");
      }
    }
    pushEvent(eventName, payload) {
      this.dispatchEvent(new CustomEvent(eventName, { detail: payload }));
    }
    /** Pushes the event over the channel, adding the `lvs_evt:` prefix and using the CustomEvent
     * detail property as the payload
     */
    dispatchEvent(event) {
      this.channel.push(`lvs_evt:${event.type}`, event.detail);
      return true;
    }
    pushCustomEvent(event) {
      this.dispatchEvent(event);
    }
  };
  var LiveState_default = LiveState;

  // node_modules/phx-live-state/build/src/connectElement.js
  var connectElement = (liveState2, el, { properties, attributes, events }) => {
    if (el["liveState"] !== liveState2) {
      liveState2.connect();
      properties?.forEach((p2) => connectProperty(liveState2, el, p2));
      attributes?.forEach((attr) => connectAtttribute(liveState2, el, attr));
      events?.send?.forEach((eventName) => sendEvent(liveState2, el, eventName));
      events?.receive?.forEach((eventName) => receiveEvent(liveState2, el, eventName));
      el["liveState"] = liveState2;
    }
  };
  var connectProperty = (liveState2, el, propertyName) => {
    liveState2.addEventListener("livestate-change", ({ detail: { state } }) => {
      el[propertyName] = state[propertyName];
    });
  };
  var connectAtttribute = (liveState2, el, attr) => {
    liveState2.addEventListener("livestate-change", ({ detail: { state } }) => {
      el.setAttribute(attr, state[attr]);
    });
  };
  var receiveEvent = (liveState2, el, eventName) => {
    liveState2.addEventListener(eventName, ({ detail }) => {
      el.dispatchEvent(new CustomEvent(eventName, { detail }));
    });
  };
  var sendEvent = (liveState2, el, eventName) => {
    el.addEventListener(eventName, (event) => {
      const { detail } = event;
      liveState2.dispatchEvent(new CustomEvent(eventName, { detail }));
    });
  };
  var connectElement_default = connectElement;

  // node_modules/wc-context/core.js
  var orphanMap = {};
  var resolved = Promise.resolve();
  var orphanResolveQueue = {
    contexts: /* @__PURE__ */ new Set(),
    running: false,
    add(context) {
      this.contexts.add(context);
      if (!this.running) {
        this.running = true;
        resolved.then(() => {
          this.contexts.forEach((context2) => {
            const orphans = orphanMap[context2];
            orphans.forEach(({ setter, payload }, orphan) => {
              const event = sendContextEvent(orphan, context2, payload, setter);
              const provider = event.detail.provider;
              if (provider) {
                orphans.delete(orphan);
                registerProvider(orphan, context2, provider);
              }
            });
          });
          this.contexts.clear();
          this.running = false;
        });
      }
    }
  };
  function addOrphan(el, name, payload, setter) {
    const orphans = orphanMap[name] || (orphanMap[name] = /* @__PURE__ */ new Map());
    orphans.set(el, { setter, payload });
  }
  function sendContextEvent(consumer, context, payload, setter) {
    const event = new CustomEvent(`context-request-${context}`, {
      detail: { setter, payload, consumer },
      bubbles: true,
      cancelable: true,
      composed: true
    });
    consumer.dispatchEvent(event);
    return event;
  }
  function getProviderValue(provider, { getter, payload }) {
    return getter(provider, payload);
  }
  function providerGetter(provider, payload) {
    return payload;
  }
  function registerContext(provider, context, payload, getter = providerGetter) {
    const observerMap = provider.__wcContextObserverMap || (provider.__wcContextObserverMap = {});
    const providedContexts = provider.__wcContextProvided || (provider.__wcContextProvided = {});
    providedContexts[context] = { getter, payload };
    const observers = observerMap[context] || (observerMap[context] = []);
    const orphans = orphanMap[context];
    provider.addEventListener(`context-request-${context}`, (event) => {
      event.stopPropagation();
      const value = getProviderValue(provider, providedContexts[context]);
      const { setter, payload: payload2, consumer } = event.detail;
      setter(consumer, value, payload2);
      observers.push({ consumer, setter, payload: payload2 });
      runListeners(provider, context, "observe", observers.length);
      event.detail.provider = provider;
    });
    if (orphans && orphans.size) {
      orphanResolveQueue.add(context);
    }
  }
  function getProvidedContext(provider, context, caller) {
    const providedContexts = provider.__wcContextProvided;
    const providedContext = providedContexts && providedContexts[context];
    if (!providedContext) {
      throw new Error(`${caller}: "${context.name || context}" is not registered`);
    }
    return providedContext;
  }
  function consumerSetter(consumer, value, name) {
    const oldValue = consumer[name];
    if (oldValue !== value) {
      consumer[name] = value;
      if (typeof consumer.contextChangedCallback === "function") {
        consumer.contextChangedCallback(name, oldValue, value);
      }
    }
  }
  function runListeners(provider, context, type, count) {
    const providedContext = getProvidedContext(provider, context, "runListeners");
    const listeners = providedContext.listeners;
    if (listeners) {
      for (const listener of listeners) {
        if (listener.type === type) {
          listener.callback.call(provider, { count });
        }
      }
    }
  }
  function registerProvider(consumer, context, provider) {
    const providerMap = consumer.__wcContextProviderMap || (consumer.__wcContextProviderMap = {});
    providerMap[context] = provider;
  }
  function observeContext(consumer, context, payload = context, setter = consumerSetter) {
    const event = sendContextEvent(consumer, context, payload, setter);
    const provider = event.detail.provider;
    if (provider) {
      registerProvider(consumer, context, provider);
    } else {
      addOrphan(consumer, context, payload, setter);
    }
  }

  // node_modules/reflect-metadata/Reflect.js
  var Reflect2;
  (function(Reflect3) {
    (function(factory) {
      var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : Function("return this;")();
      var exporter = makeExporter(Reflect3);
      if (typeof root.Reflect === "undefined") {
        root.Reflect = Reflect3;
      } else {
        exporter = makeExporter(root.Reflect, exporter);
      }
      factory(exporter);
      function makeExporter(target, previous) {
        return function(key, value) {
          if (typeof target[key] !== "function") {
            Object.defineProperty(target, key, { configurable: true, writable: true, value });
          }
          if (previous)
            previous(key, value);
        };
      }
    })(function(exporter) {
      var hasOwn = Object.prototype.hasOwnProperty;
      var supportsSymbol = typeof Symbol === "function";
      var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
      var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
      var supportsCreate = typeof Object.create === "function";
      var supportsProto = { __proto__: [] } instanceof Array;
      var downLevel = !supportsCreate && !supportsProto;
      var HashMap = {
        // create an object in dictionary mode (a.k.a. "slow" mode in v8)
        create: supportsCreate ? function() {
          return MakeDictionary(/* @__PURE__ */ Object.create(null));
        } : supportsProto ? function() {
          return MakeDictionary({ __proto__: null });
        } : function() {
          return MakeDictionary({});
        },
        has: downLevel ? function(map, key) {
          return hasOwn.call(map, key);
        } : function(map, key) {
          return key in map;
        },
        get: downLevel ? function(map, key) {
          return hasOwn.call(map, key) ? map[key] : void 0;
        } : function(map, key) {
          return map[key];
        }
      };
      var functionPrototype = Object.getPrototypeOf(Function);
      var usePolyfill = typeof process === "object" && process.env && process.env["REFLECT_METADATA_USE_MAP_POLYFILL"] === "true";
      var _Map = !usePolyfill && typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
      var _Set = !usePolyfill && typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
      var _WeakMap = !usePolyfill && typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
      var Metadata = new _WeakMap();
      function decorate(decorators, target, propertyKey, attributes) {
        if (!IsUndefined(propertyKey)) {
          if (!IsArray(decorators))
            throw new TypeError();
          if (!IsObject(target))
            throw new TypeError();
          if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
            throw new TypeError();
          if (IsNull(attributes))
            attributes = void 0;
          propertyKey = ToPropertyKey(propertyKey);
          return DecorateProperty(decorators, target, propertyKey, attributes);
        } else {
          if (!IsArray(decorators))
            throw new TypeError();
          if (!IsConstructor(target))
            throw new TypeError();
          return DecorateConstructor(decorators, target);
        }
      }
      exporter("decorate", decorate);
      function metadata(metadataKey, metadataValue) {
        function decorator(target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
            throw new TypeError();
          OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
        }
        return decorator;
      }
      exporter("metadata", metadata);
      function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError();
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
      }
      exporter("defineMetadata", defineMetadata);
      function hasMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError();
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryHasMetadata(metadataKey, target, propertyKey);
      }
      exporter("hasMetadata", hasMetadata);
      function hasOwnMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError();
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
      }
      exporter("hasOwnMetadata", hasOwnMetadata);
      function getMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError();
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryGetMetadata(metadataKey, target, propertyKey);
      }
      exporter("getMetadata", getMetadata);
      function getOwnMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError();
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
      }
      exporter("getOwnMetadata", getOwnMetadata);
      function getMetadataKeys(target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError();
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryMetadataKeys(target, propertyKey);
      }
      exporter("getMetadataKeys", getMetadataKeys);
      function getOwnMetadataKeys(target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError();
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryOwnMetadataKeys(target, propertyKey);
      }
      exporter("getOwnMetadataKeys", getOwnMetadataKeys);
      function deleteMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError();
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        var metadataMap = GetOrCreateMetadataMap(
          target,
          propertyKey,
          /*Create*/
          false
        );
        if (IsUndefined(metadataMap))
          return false;
        if (!metadataMap.delete(metadataKey))
          return false;
        if (metadataMap.size > 0)
          return true;
        var targetMetadata = Metadata.get(target);
        targetMetadata.delete(propertyKey);
        if (targetMetadata.size > 0)
          return true;
        Metadata.delete(target);
        return true;
      }
      exporter("deleteMetadata", deleteMetadata);
      function DecorateConstructor(decorators, target) {
        for (var i5 = decorators.length - 1; i5 >= 0; --i5) {
          var decorator = decorators[i5];
          var decorated = decorator(target);
          if (!IsUndefined(decorated) && !IsNull(decorated)) {
            if (!IsConstructor(decorated))
              throw new TypeError();
            target = decorated;
          }
        }
        return target;
      }
      function DecorateProperty(decorators, target, propertyKey, descriptor) {
        for (var i5 = decorators.length - 1; i5 >= 0; --i5) {
          var decorator = decorators[i5];
          var decorated = decorator(target, propertyKey, descriptor);
          if (!IsUndefined(decorated) && !IsNull(decorated)) {
            if (!IsObject(decorated))
              throw new TypeError();
            descriptor = decorated;
          }
        }
        return descriptor;
      }
      function GetOrCreateMetadataMap(O, P2, Create) {
        var targetMetadata = Metadata.get(O);
        if (IsUndefined(targetMetadata)) {
          if (!Create)
            return void 0;
          targetMetadata = new _Map();
          Metadata.set(O, targetMetadata);
        }
        var metadataMap = targetMetadata.get(P2);
        if (IsUndefined(metadataMap)) {
          if (!Create)
            return void 0;
          metadataMap = new _Map();
          targetMetadata.set(P2, metadataMap);
        }
        return metadataMap;
      }
      function OrdinaryHasMetadata(MetadataKey, O, P2) {
        var hasOwn2 = OrdinaryHasOwnMetadata(MetadataKey, O, P2);
        if (hasOwn2)
          return true;
        var parent = OrdinaryGetPrototypeOf(O);
        if (!IsNull(parent))
          return OrdinaryHasMetadata(MetadataKey, parent, P2);
        return false;
      }
      function OrdinaryHasOwnMetadata(MetadataKey, O, P2) {
        var metadataMap = GetOrCreateMetadataMap(
          O,
          P2,
          /*Create*/
          false
        );
        if (IsUndefined(metadataMap))
          return false;
        return ToBoolean(metadataMap.has(MetadataKey));
      }
      function OrdinaryGetMetadata(MetadataKey, O, P2) {
        var hasOwn2 = OrdinaryHasOwnMetadata(MetadataKey, O, P2);
        if (hasOwn2)
          return OrdinaryGetOwnMetadata(MetadataKey, O, P2);
        var parent = OrdinaryGetPrototypeOf(O);
        if (!IsNull(parent))
          return OrdinaryGetMetadata(MetadataKey, parent, P2);
        return void 0;
      }
      function OrdinaryGetOwnMetadata(MetadataKey, O, P2) {
        var metadataMap = GetOrCreateMetadataMap(
          O,
          P2,
          /*Create*/
          false
        );
        if (IsUndefined(metadataMap))
          return void 0;
        return metadataMap.get(MetadataKey);
      }
      function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P2) {
        var metadataMap = GetOrCreateMetadataMap(
          O,
          P2,
          /*Create*/
          true
        );
        metadataMap.set(MetadataKey, MetadataValue);
      }
      function OrdinaryMetadataKeys(O, P2) {
        var ownKeys = OrdinaryOwnMetadataKeys(O, P2);
        var parent = OrdinaryGetPrototypeOf(O);
        if (parent === null)
          return ownKeys;
        var parentKeys = OrdinaryMetadataKeys(parent, P2);
        if (parentKeys.length <= 0)
          return ownKeys;
        if (ownKeys.length <= 0)
          return parentKeys;
        var set = new _Set();
        var keys = [];
        for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
          var key = ownKeys_1[_i];
          var hasKey = set.has(key);
          if (!hasKey) {
            set.add(key);
            keys.push(key);
          }
        }
        for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
          var key = parentKeys_1[_a];
          var hasKey = set.has(key);
          if (!hasKey) {
            set.add(key);
            keys.push(key);
          }
        }
        return keys;
      }
      function OrdinaryOwnMetadataKeys(O, P2) {
        var keys = [];
        var metadataMap = GetOrCreateMetadataMap(
          O,
          P2,
          /*Create*/
          false
        );
        if (IsUndefined(metadataMap))
          return keys;
        var keysObj = metadataMap.keys();
        var iterator = GetIterator(keysObj);
        var k2 = 0;
        while (true) {
          var next = IteratorStep(iterator);
          if (!next) {
            keys.length = k2;
            return keys;
          }
          var nextValue = IteratorValue(next);
          try {
            keys[k2] = nextValue;
          } catch (e7) {
            try {
              IteratorClose(iterator);
            } finally {
              throw e7;
            }
          }
          k2++;
        }
      }
      function Type(x2) {
        if (x2 === null)
          return 1;
        switch (typeof x2) {
          case "undefined":
            return 0;
          case "boolean":
            return 2;
          case "string":
            return 3;
          case "symbol":
            return 4;
          case "number":
            return 5;
          case "object":
            return x2 === null ? 1 : 6;
          default:
            return 6;
        }
      }
      function IsUndefined(x2) {
        return x2 === void 0;
      }
      function IsNull(x2) {
        return x2 === null;
      }
      function IsSymbol(x2) {
        return typeof x2 === "symbol";
      }
      function IsObject(x2) {
        return typeof x2 === "object" ? x2 !== null : typeof x2 === "function";
      }
      function ToPrimitive(input, PreferredType) {
        switch (Type(input)) {
          case 0:
            return input;
          case 1:
            return input;
          case 2:
            return input;
          case 3:
            return input;
          case 4:
            return input;
          case 5:
            return input;
        }
        var hint = PreferredType === 3 ? "string" : PreferredType === 5 ? "number" : "default";
        var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
        if (exoticToPrim !== void 0) {
          var result = exoticToPrim.call(input, hint);
          if (IsObject(result))
            throw new TypeError();
          return result;
        }
        return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
      }
      function OrdinaryToPrimitive(O, hint) {
        if (hint === "string") {
          var toString_1 = O.toString;
          if (IsCallable(toString_1)) {
            var result = toString_1.call(O);
            if (!IsObject(result))
              return result;
          }
          var valueOf = O.valueOf;
          if (IsCallable(valueOf)) {
            var result = valueOf.call(O);
            if (!IsObject(result))
              return result;
          }
        } else {
          var valueOf = O.valueOf;
          if (IsCallable(valueOf)) {
            var result = valueOf.call(O);
            if (!IsObject(result))
              return result;
          }
          var toString_2 = O.toString;
          if (IsCallable(toString_2)) {
            var result = toString_2.call(O);
            if (!IsObject(result))
              return result;
          }
        }
        throw new TypeError();
      }
      function ToBoolean(argument) {
        return !!argument;
      }
      function ToString(argument) {
        return "" + argument;
      }
      function ToPropertyKey(argument) {
        var key = ToPrimitive(
          argument,
          3
          /* String */
        );
        if (IsSymbol(key))
          return key;
        return ToString(key);
      }
      function IsArray(argument) {
        return Array.isArray ? Array.isArray(argument) : argument instanceof Object ? argument instanceof Array : Object.prototype.toString.call(argument) === "[object Array]";
      }
      function IsCallable(argument) {
        return typeof argument === "function";
      }
      function IsConstructor(argument) {
        return typeof argument === "function";
      }
      function IsPropertyKey(argument) {
        switch (Type(argument)) {
          case 3:
            return true;
          case 4:
            return true;
          default:
            return false;
        }
      }
      function GetMethod(V2, P2) {
        var func = V2[P2];
        if (func === void 0 || func === null)
          return void 0;
        if (!IsCallable(func))
          throw new TypeError();
        return func;
      }
      function GetIterator(obj) {
        var method = GetMethod(obj, iteratorSymbol);
        if (!IsCallable(method))
          throw new TypeError();
        var iterator = method.call(obj);
        if (!IsObject(iterator))
          throw new TypeError();
        return iterator;
      }
      function IteratorValue(iterResult) {
        return iterResult.value;
      }
      function IteratorStep(iterator) {
        var result = iterator.next();
        return result.done ? false : result;
      }
      function IteratorClose(iterator) {
        var f2 = iterator["return"];
        if (f2)
          f2.call(iterator);
      }
      function OrdinaryGetPrototypeOf(O) {
        var proto = Object.getPrototypeOf(O);
        if (typeof O !== "function" || O === functionPrototype)
          return proto;
        if (proto !== functionPrototype)
          return proto;
        var prototype = O.prototype;
        var prototypeProto = prototype && Object.getPrototypeOf(prototype);
        if (prototypeProto == null || prototypeProto === Object.prototype)
          return proto;
        var constructor = prototypeProto.constructor;
        if (typeof constructor !== "function")
          return proto;
        if (constructor === O)
          return proto;
        return constructor;
      }
      function CreateMapPolyfill() {
        var cacheSentinel = {};
        var arraySentinel = [];
        var MapIterator = (
          /** @class */
          function() {
            function MapIterator2(keys, values, selector) {
              this._index = 0;
              this._keys = keys;
              this._values = values;
              this._selector = selector;
            }
            MapIterator2.prototype["@@iterator"] = function() {
              return this;
            };
            MapIterator2.prototype[iteratorSymbol] = function() {
              return this;
            };
            MapIterator2.prototype.next = function() {
              var index = this._index;
              if (index >= 0 && index < this._keys.length) {
                var result = this._selector(this._keys[index], this._values[index]);
                if (index + 1 >= this._keys.length) {
                  this._index = -1;
                  this._keys = arraySentinel;
                  this._values = arraySentinel;
                } else {
                  this._index++;
                }
                return { value: result, done: false };
              }
              return { value: void 0, done: true };
            };
            MapIterator2.prototype.throw = function(error) {
              if (this._index >= 0) {
                this._index = -1;
                this._keys = arraySentinel;
                this._values = arraySentinel;
              }
              throw error;
            };
            MapIterator2.prototype.return = function(value) {
              if (this._index >= 0) {
                this._index = -1;
                this._keys = arraySentinel;
                this._values = arraySentinel;
              }
              return { value, done: true };
            };
            return MapIterator2;
          }()
        );
        return (
          /** @class */
          function() {
            function Map2() {
              this._keys = [];
              this._values = [];
              this._cacheKey = cacheSentinel;
              this._cacheIndex = -2;
            }
            Object.defineProperty(Map2.prototype, "size", {
              get: function() {
                return this._keys.length;
              },
              enumerable: true,
              configurable: true
            });
            Map2.prototype.has = function(key) {
              return this._find(
                key,
                /*insert*/
                false
              ) >= 0;
            };
            Map2.prototype.get = function(key) {
              var index = this._find(
                key,
                /*insert*/
                false
              );
              return index >= 0 ? this._values[index] : void 0;
            };
            Map2.prototype.set = function(key, value) {
              var index = this._find(
                key,
                /*insert*/
                true
              );
              this._values[index] = value;
              return this;
            };
            Map2.prototype.delete = function(key) {
              var index = this._find(
                key,
                /*insert*/
                false
              );
              if (index >= 0) {
                var size = this._keys.length;
                for (var i5 = index + 1; i5 < size; i5++) {
                  this._keys[i5 - 1] = this._keys[i5];
                  this._values[i5 - 1] = this._values[i5];
                }
                this._keys.length--;
                this._values.length--;
                if (key === this._cacheKey) {
                  this._cacheKey = cacheSentinel;
                  this._cacheIndex = -2;
                }
                return true;
              }
              return false;
            };
            Map2.prototype.clear = function() {
              this._keys.length = 0;
              this._values.length = 0;
              this._cacheKey = cacheSentinel;
              this._cacheIndex = -2;
            };
            Map2.prototype.keys = function() {
              return new MapIterator(this._keys, this._values, getKey);
            };
            Map2.prototype.values = function() {
              return new MapIterator(this._keys, this._values, getValue);
            };
            Map2.prototype.entries = function() {
              return new MapIterator(this._keys, this._values, getEntry);
            };
            Map2.prototype["@@iterator"] = function() {
              return this.entries();
            };
            Map2.prototype[iteratorSymbol] = function() {
              return this.entries();
            };
            Map2.prototype._find = function(key, insert) {
              if (this._cacheKey !== key) {
                this._cacheIndex = this._keys.indexOf(this._cacheKey = key);
              }
              if (this._cacheIndex < 0 && insert) {
                this._cacheIndex = this._keys.length;
                this._keys.push(key);
                this._values.push(void 0);
              }
              return this._cacheIndex;
            };
            return Map2;
          }()
        );
        function getKey(key, _2) {
          return key;
        }
        function getValue(_2, value) {
          return value;
        }
        function getEntry(key, value) {
          return [key, value];
        }
      }
      function CreateSetPolyfill() {
        return (
          /** @class */
          function() {
            function Set2() {
              this._map = new _Map();
            }
            Object.defineProperty(Set2.prototype, "size", {
              get: function() {
                return this._map.size;
              },
              enumerable: true,
              configurable: true
            });
            Set2.prototype.has = function(value) {
              return this._map.has(value);
            };
            Set2.prototype.add = function(value) {
              return this._map.set(value, value), this;
            };
            Set2.prototype.delete = function(value) {
              return this._map.delete(value);
            };
            Set2.prototype.clear = function() {
              this._map.clear();
            };
            Set2.prototype.keys = function() {
              return this._map.keys();
            };
            Set2.prototype.values = function() {
              return this._map.values();
            };
            Set2.prototype.entries = function() {
              return this._map.entries();
            };
            Set2.prototype["@@iterator"] = function() {
              return this.keys();
            };
            Set2.prototype[iteratorSymbol] = function() {
              return this.keys();
            };
            return Set2;
          }()
        );
      }
      function CreateWeakMapPolyfill() {
        var UUID_SIZE = 16;
        var keys = HashMap.create();
        var rootKey = CreateUniqueKey();
        return (
          /** @class */
          function() {
            function WeakMap2() {
              this._key = CreateUniqueKey();
            }
            WeakMap2.prototype.has = function(target) {
              var table = GetOrCreateWeakMapTable(
                target,
                /*create*/
                false
              );
              return table !== void 0 ? HashMap.has(table, this._key) : false;
            };
            WeakMap2.prototype.get = function(target) {
              var table = GetOrCreateWeakMapTable(
                target,
                /*create*/
                false
              );
              return table !== void 0 ? HashMap.get(table, this._key) : void 0;
            };
            WeakMap2.prototype.set = function(target, value) {
              var table = GetOrCreateWeakMapTable(
                target,
                /*create*/
                true
              );
              table[this._key] = value;
              return this;
            };
            WeakMap2.prototype.delete = function(target) {
              var table = GetOrCreateWeakMapTable(
                target,
                /*create*/
                false
              );
              return table !== void 0 ? delete table[this._key] : false;
            };
            WeakMap2.prototype.clear = function() {
              this._key = CreateUniqueKey();
            };
            return WeakMap2;
          }()
        );
        function CreateUniqueKey() {
          var key;
          do
            key = "@@WeakMap@@" + CreateUUID();
          while (HashMap.has(keys, key));
          keys[key] = true;
          return key;
        }
        function GetOrCreateWeakMapTable(target, create) {
          if (!hasOwn.call(target, rootKey)) {
            if (!create)
              return void 0;
            Object.defineProperty(target, rootKey, { value: HashMap.create() });
          }
          return target[rootKey];
        }
        function FillRandomBytes(buffer, size) {
          for (var i5 = 0; i5 < size; ++i5)
            buffer[i5] = Math.random() * 255 | 0;
          return buffer;
        }
        function GenRandomBytes(size) {
          if (typeof Uint8Array === "function") {
            if (typeof crypto !== "undefined")
              return crypto.getRandomValues(new Uint8Array(size));
            if (typeof msCrypto !== "undefined")
              return msCrypto.getRandomValues(new Uint8Array(size));
            return FillRandomBytes(new Uint8Array(size), size);
          }
          return FillRandomBytes(new Array(size), size);
        }
        function CreateUUID() {
          var data = GenRandomBytes(UUID_SIZE);
          data[6] = data[6] & 79 | 64;
          data[8] = data[8] & 191 | 128;
          var result = "";
          for (var offset = 0; offset < UUID_SIZE; ++offset) {
            var byte = data[offset];
            if (offset === 4 || offset === 6 || offset === 8)
              result += "-";
            if (byte < 16)
              result += "0";
            result += byte.toString(16).toLowerCase();
          }
          return result;
        }
      }
      function MakeDictionary(obj) {
        obj.__ = void 0;
        delete obj.__;
        return obj;
      }
    });
  })(Reflect2 || (Reflect2 = {}));

  // node_modules/phx-live-state/build/src/liveStateDecorator.js
  var connectToLiveState = (element, options) => {
    if (options.provide) {
      const { scope, name } = options.provide;
      const liveState2 = scope[name] ? scope[name] : scope[name] = buildLiveState(element, options);
      registerContext(scope, name, liveState2);
      connectElement_default(liveState2, element, options);
    } else if (options.context) {
      observeContext(element, options.context, element, (element2, liveState2) => {
        connectElement_default(liveState2, element2, options);
      });
    } else {
      const liveState2 = buildLiveState(element, options);
      connectElement_default(liveState2, element, options);
    }
    return element.liveState;
  };
  var extractConfig = (element) => {
    const elementConfig = element._liveStateConfig ? Object.keys(element._liveStateConfig).reduce((config, key) => {
      if (element._liveStateConfig[key] instanceof Function) {
        const configFn = element._liveStateConfig[key];
        config[key] = configFn.apply(element);
      } else {
        config[key] = element._liveStateConfig[key];
      }
      return config;
    }, {}) : {};
    flattenParams(elementConfig);
    return elementConfig;
  };
  var flattenParams = (object) => {
    const params = Object.keys(object).filter((key) => key.startsWith("params.")).reduce((params2, key) => {
      params2[key.replace("params.", "")] = object[key];
      return params2;
    }, {});
    object.params = params;
  };
  var buildLiveState = (element, { url, topic, params }) => {
    const elementConfig = extractConfig(element);
    const config = Object.assign({ url, topic, params }, elementConfig);
    return new LiveState_default(config);
  };
  function liveState(options) {
    return (targetClass) => {
      Reflect.defineMetadata("liveStateConfig", options, targetClass);
      const superConnected = targetClass.prototype.connectedCallback;
      targetClass.prototype.connectedCallback = function() {
        superConnected?.apply(this);
        connectToLiveState(this, options);
      };
      const superDisconnected = targetClass.prototype.disconnectedCallback;
      targetClass.prototype.disconnectedCallback = function() {
        superDisconnected?.apply(this);
        this.liveState && this.liveState.disconnect();
      };
    };
  }
  var liveStateConfig = (configProperty) => {
    return (proto, propertyName) => {
      proto._liveStateConfig = proto._liveStateConfig || {};
      proto._liveStateConfig[configProperty] = function() {
        return this[propertyName];
      };
    };
  };
  var liveStateDecorator_default = liveState;

  // node_modules/@vimeo/player/dist/player.es.js
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i5 = 0; i5 < props.length; i5++) {
      var descriptor = props[i5];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties(Constructor, staticProps);
    return Constructor;
  }
  var isNode = typeof global !== "undefined" && {}.toString.call(global) === "[object global]";
  function getMethodName(prop, type) {
    if (prop.indexOf(type.toLowerCase()) === 0) {
      return prop;
    }
    return "".concat(type.toLowerCase()).concat(prop.substr(0, 1).toUpperCase()).concat(prop.substr(1));
  }
  function isDomElement(element) {
    return Boolean(element && element.nodeType === 1 && "nodeName" in element && element.ownerDocument && element.ownerDocument.defaultView);
  }
  function isInteger(value) {
    return !isNaN(parseFloat(value)) && isFinite(value) && Math.floor(value) == value;
  }
  function isVimeoUrl(url) {
    return /^(https?:)?\/\/((player|www)\.)?vimeo\.com(?=$|\/)/.test(url);
  }
  function isVimeoEmbed(url) {
    var expr = /^https:\/\/player\.vimeo\.com\/video\/\d+/;
    return expr.test(url);
  }
  function getVimeoUrl() {
    var oEmbedParameters2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var id = oEmbedParameters2.id;
    var url = oEmbedParameters2.url;
    var idOrUrl = id || url;
    if (!idOrUrl) {
      throw new Error("An id or url must be passed, either in an options object or as a data-vimeo-id or data-vimeo-url attribute.");
    }
    if (isInteger(idOrUrl)) {
      return "https://vimeo.com/".concat(idOrUrl);
    }
    if (isVimeoUrl(idOrUrl)) {
      return idOrUrl.replace("http:", "https:");
    }
    if (id) {
      throw new TypeError("\u201C".concat(id, "\u201D is not a valid video id."));
    }
    throw new TypeError("\u201C".concat(idOrUrl, "\u201D is not a vimeo.com url."));
  }
  var arrayIndexOfSupport = typeof Array.prototype.indexOf !== "undefined";
  var postMessageSupport = typeof window !== "undefined" && typeof window.postMessage !== "undefined";
  if (!isNode && (!arrayIndexOfSupport || !postMessageSupport)) {
    throw new Error("Sorry, the Vimeo Player API is not available in this browser.");
  }
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  function createCommonjsModule(fn, module) {
    return module = { exports: {} }, fn(module, module.exports), module.exports;
  }
  (function(self2) {
    if (self2.WeakMap) {
      return;
    }
    var hasOwnProperty2 = Object.prototype.hasOwnProperty;
    var hasDefine = Object.defineProperty && function() {
      try {
        return Object.defineProperty({}, "x", {
          value: 1
        }).x === 1;
      } catch (e7) {
      }
    }();
    var defineProperty = function(object, name, value) {
      if (hasDefine) {
        Object.defineProperty(object, name, {
          configurable: true,
          writable: true,
          value
        });
      } else {
        object[name] = value;
      }
    };
    self2.WeakMap = function() {
      function WeakMap2() {
        if (this === void 0) {
          throw new TypeError("Constructor WeakMap requires 'new'");
        }
        defineProperty(this, "_id", genId("_WeakMap"));
        if (arguments.length > 0) {
          throw new TypeError("WeakMap iterable is not supported");
        }
      }
      defineProperty(WeakMap2.prototype, "delete", function(key) {
        checkInstance(this, "delete");
        if (!isObject(key)) {
          return false;
        }
        var entry = key[this._id];
        if (entry && entry[0] === key) {
          delete key[this._id];
          return true;
        }
        return false;
      });
      defineProperty(WeakMap2.prototype, "get", function(key) {
        checkInstance(this, "get");
        if (!isObject(key)) {
          return void 0;
        }
        var entry = key[this._id];
        if (entry && entry[0] === key) {
          return entry[1];
        }
        return void 0;
      });
      defineProperty(WeakMap2.prototype, "has", function(key) {
        checkInstance(this, "has");
        if (!isObject(key)) {
          return false;
        }
        var entry = key[this._id];
        if (entry && entry[0] === key) {
          return true;
        }
        return false;
      });
      defineProperty(WeakMap2.prototype, "set", function(key, value) {
        checkInstance(this, "set");
        if (!isObject(key)) {
          throw new TypeError("Invalid value used as weak map key");
        }
        var entry = key[this._id];
        if (entry && entry[0] === key) {
          entry[1] = value;
          return this;
        }
        defineProperty(key, this._id, [key, value]);
        return this;
      });
      function checkInstance(x2, methodName) {
        if (!isObject(x2) || !hasOwnProperty2.call(x2, "_id")) {
          throw new TypeError(methodName + " method called on incompatible receiver " + typeof x2);
        }
      }
      function genId(prefix) {
        return prefix + "_" + rand() + "." + rand();
      }
      function rand() {
        return Math.random().toString().substring(2);
      }
      defineProperty(WeakMap2, "_polyfill", true);
      return WeakMap2;
    }();
    function isObject(x2) {
      return Object(x2) === x2;
    }
  })(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof commonjsGlobal !== "undefined" ? commonjsGlobal : commonjsGlobal);
  var npo_src = createCommonjsModule(function(module) {
    (function UMD(name, context, definition) {
      context[name] = context[name] || definition();
      if (module.exports) {
        module.exports = context[name];
      }
    })("Promise", typeof commonjsGlobal != "undefined" ? commonjsGlobal : commonjsGlobal, function DEF() {
      var builtInProp, cycle, scheduling_queue, ToString = Object.prototype.toString, timer = typeof setImmediate != "undefined" ? function timer2(fn) {
        return setImmediate(fn);
      } : setTimeout;
      try {
        Object.defineProperty({}, "x", {});
        builtInProp = function builtInProp2(obj, name, val, config) {
          return Object.defineProperty(obj, name, {
            value: val,
            writable: true,
            configurable: config !== false
          });
        };
      } catch (err) {
        builtInProp = function builtInProp2(obj, name, val) {
          obj[name] = val;
          return obj;
        };
      }
      scheduling_queue = function Queue() {
        var first, last, item;
        function Item(fn, self2) {
          this.fn = fn;
          this.self = self2;
          this.next = void 0;
        }
        return {
          add: function add(fn, self2) {
            item = new Item(fn, self2);
            if (last) {
              last.next = item;
            } else {
              first = item;
            }
            last = item;
            item = void 0;
          },
          drain: function drain() {
            var f2 = first;
            first = last = cycle = void 0;
            while (f2) {
              f2.fn.call(f2.self);
              f2 = f2.next;
            }
          }
        };
      }();
      function schedule(fn, self2) {
        scheduling_queue.add(fn, self2);
        if (!cycle) {
          cycle = timer(scheduling_queue.drain);
        }
      }
      function isThenable(o6) {
        var _then, o_type = typeof o6;
        if (o6 != null && (o_type == "object" || o_type == "function")) {
          _then = o6.then;
        }
        return typeof _then == "function" ? _then : false;
      }
      function notify() {
        for (var i5 = 0; i5 < this.chain.length; i5++) {
          notifyIsolated(this, this.state === 1 ? this.chain[i5].success : this.chain[i5].failure, this.chain[i5]);
        }
        this.chain.length = 0;
      }
      function notifyIsolated(self2, cb, chain) {
        var ret, _then;
        try {
          if (cb === false) {
            chain.reject(self2.msg);
          } else {
            if (cb === true) {
              ret = self2.msg;
            } else {
              ret = cb.call(void 0, self2.msg);
            }
            if (ret === chain.promise) {
              chain.reject(TypeError("Promise-chain cycle"));
            } else if (_then = isThenable(ret)) {
              _then.call(ret, chain.resolve, chain.reject);
            } else {
              chain.resolve(ret);
            }
          }
        } catch (err) {
          chain.reject(err);
        }
      }
      function resolve(msg) {
        var _then, self2 = this;
        if (self2.triggered) {
          return;
        }
        self2.triggered = true;
        if (self2.def) {
          self2 = self2.def;
        }
        try {
          if (_then = isThenable(msg)) {
            schedule(function() {
              var def_wrapper = new MakeDefWrapper(self2);
              try {
                _then.call(msg, function $resolve$() {
                  resolve.apply(def_wrapper, arguments);
                }, function $reject$() {
                  reject.apply(def_wrapper, arguments);
                });
              } catch (err) {
                reject.call(def_wrapper, err);
              }
            });
          } else {
            self2.msg = msg;
            self2.state = 1;
            if (self2.chain.length > 0) {
              schedule(notify, self2);
            }
          }
        } catch (err) {
          reject.call(new MakeDefWrapper(self2), err);
        }
      }
      function reject(msg) {
        var self2 = this;
        if (self2.triggered) {
          return;
        }
        self2.triggered = true;
        if (self2.def) {
          self2 = self2.def;
        }
        self2.msg = msg;
        self2.state = 2;
        if (self2.chain.length > 0) {
          schedule(notify, self2);
        }
      }
      function iteratePromises(Constructor, arr, resolver, rejecter) {
        for (var idx = 0; idx < arr.length; idx++) {
          (function IIFE(idx2) {
            Constructor.resolve(arr[idx2]).then(function $resolver$(msg) {
              resolver(idx2, msg);
            }, rejecter);
          })(idx);
        }
      }
      function MakeDefWrapper(self2) {
        this.def = self2;
        this.triggered = false;
      }
      function MakeDef(self2) {
        this.promise = self2;
        this.state = 0;
        this.triggered = false;
        this.chain = [];
        this.msg = void 0;
      }
      function Promise2(executor) {
        if (typeof executor != "function") {
          throw TypeError("Not a function");
        }
        if (this.__NPO__ !== 0) {
          throw TypeError("Not a promise");
        }
        this.__NPO__ = 1;
        var def = new MakeDef(this);
        this["then"] = function then(success, failure) {
          var o6 = {
            success: typeof success == "function" ? success : true,
            failure: typeof failure == "function" ? failure : false
          };
          o6.promise = new this.constructor(function extractChain(resolve2, reject2) {
            if (typeof resolve2 != "function" || typeof reject2 != "function") {
              throw TypeError("Not a function");
            }
            o6.resolve = resolve2;
            o6.reject = reject2;
          });
          def.chain.push(o6);
          if (def.state !== 0) {
            schedule(notify, def);
          }
          return o6.promise;
        };
        this["catch"] = function $catch$(failure) {
          return this.then(void 0, failure);
        };
        try {
          executor.call(void 0, function publicResolve(msg) {
            resolve.call(def, msg);
          }, function publicReject(msg) {
            reject.call(def, msg);
          });
        } catch (err) {
          reject.call(def, err);
        }
      }
      var PromisePrototype = builtInProp(
        {},
        "constructor",
        Promise2,
        /*configurable=*/
        false
      );
      Promise2.prototype = PromisePrototype;
      builtInProp(
        PromisePrototype,
        "__NPO__",
        0,
        /*configurable=*/
        false
      );
      builtInProp(Promise2, "resolve", function Promise$resolve(msg) {
        var Constructor = this;
        if (msg && typeof msg == "object" && msg.__NPO__ === 1) {
          return msg;
        }
        return new Constructor(function executor(resolve2, reject2) {
          if (typeof resolve2 != "function" || typeof reject2 != "function") {
            throw TypeError("Not a function");
          }
          resolve2(msg);
        });
      });
      builtInProp(Promise2, "reject", function Promise$reject(msg) {
        return new this(function executor(resolve2, reject2) {
          if (typeof resolve2 != "function" || typeof reject2 != "function") {
            throw TypeError("Not a function");
          }
          reject2(msg);
        });
      });
      builtInProp(Promise2, "all", function Promise$all(arr) {
        var Constructor = this;
        if (ToString.call(arr) != "[object Array]") {
          return Constructor.reject(TypeError("Not an array"));
        }
        if (arr.length === 0) {
          return Constructor.resolve([]);
        }
        return new Constructor(function executor(resolve2, reject2) {
          if (typeof resolve2 != "function" || typeof reject2 != "function") {
            throw TypeError("Not a function");
          }
          var len = arr.length, msgs = Array(len), count = 0;
          iteratePromises(Constructor, arr, function resolver(idx, msg) {
            msgs[idx] = msg;
            if (++count === len) {
              resolve2(msgs);
            }
          }, reject2);
        });
      });
      builtInProp(Promise2, "race", function Promise$race(arr) {
        var Constructor = this;
        if (ToString.call(arr) != "[object Array]") {
          return Constructor.reject(TypeError("Not an array"));
        }
        return new Constructor(function executor(resolve2, reject2) {
          if (typeof resolve2 != "function" || typeof reject2 != "function") {
            throw TypeError("Not a function");
          }
          iteratePromises(Constructor, arr, function resolver(idx, msg) {
            resolve2(msg);
          }, reject2);
        });
      });
      return Promise2;
    });
  });
  var callbackMap = /* @__PURE__ */ new WeakMap();
  function storeCallback(player, name, callback) {
    var playerCallbacks = callbackMap.get(player.element) || {};
    if (!(name in playerCallbacks)) {
      playerCallbacks[name] = [];
    }
    playerCallbacks[name].push(callback);
    callbackMap.set(player.element, playerCallbacks);
  }
  function getCallbacks(player, name) {
    var playerCallbacks = callbackMap.get(player.element) || {};
    return playerCallbacks[name] || [];
  }
  function removeCallback(player, name, callback) {
    var playerCallbacks = callbackMap.get(player.element) || {};
    if (!playerCallbacks[name]) {
      return true;
    }
    if (!callback) {
      playerCallbacks[name] = [];
      callbackMap.set(player.element, playerCallbacks);
      return true;
    }
    var index = playerCallbacks[name].indexOf(callback);
    if (index !== -1) {
      playerCallbacks[name].splice(index, 1);
    }
    callbackMap.set(player.element, playerCallbacks);
    return playerCallbacks[name] && playerCallbacks[name].length === 0;
  }
  function shiftCallbacks(player, name) {
    var playerCallbacks = getCallbacks(player, name);
    if (playerCallbacks.length < 1) {
      return false;
    }
    var callback = playerCallbacks.shift();
    removeCallback(player, name, callback);
    return callback;
  }
  function swapCallbacks(oldElement, newElement) {
    var playerCallbacks = callbackMap.get(oldElement);
    callbackMap.set(newElement, playerCallbacks);
    callbackMap.delete(oldElement);
  }
  function parseMessageData(data) {
    if (typeof data === "string") {
      try {
        data = JSON.parse(data);
      } catch (error) {
        console.warn(error);
        return {};
      }
    }
    return data;
  }
  function postMessage(player, method, params) {
    if (!player.element.contentWindow || !player.element.contentWindow.postMessage) {
      return;
    }
    var message = {
      method
    };
    if (params !== void 0) {
      message.value = params;
    }
    var ieVersion = parseFloat(navigator.userAgent.toLowerCase().replace(/^.*msie (\d+).*$/, "$1"));
    if (ieVersion >= 8 && ieVersion < 10) {
      message = JSON.stringify(message);
    }
    player.element.contentWindow.postMessage(message, player.origin);
  }
  function processData(player, data) {
    data = parseMessageData(data);
    var callbacks = [];
    var param;
    if (data.event) {
      if (data.event === "error") {
        var promises = getCallbacks(player, data.data.method);
        promises.forEach(function(promise) {
          var error = new Error(data.data.message);
          error.name = data.data.name;
          promise.reject(error);
          removeCallback(player, data.data.method, promise);
        });
      }
      callbacks = getCallbacks(player, "event:".concat(data.event));
      param = data.data;
    } else if (data.method) {
      var callback = shiftCallbacks(player, data.method);
      if (callback) {
        callbacks.push(callback);
        param = data.value;
      }
    }
    callbacks.forEach(function(callback2) {
      try {
        if (typeof callback2 === "function") {
          callback2.call(player, param);
          return;
        }
        callback2.resolve(param);
      } catch (e7) {
      }
    });
  }
  var oEmbedParameters = ["autopause", "autoplay", "background", "byline", "color", "controls", "dnt", "height", "id", "interactive_params", "keyboard", "loop", "maxheight", "maxwidth", "muted", "playsinline", "portrait", "responsive", "speed", "texttrack", "title", "transparent", "url", "width"];
  function getOEmbedParameters(element) {
    var defaults = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return oEmbedParameters.reduce(function(params, param) {
      var value = element.getAttribute("data-vimeo-".concat(param));
      if (value || value === "") {
        params[param] = value === "" ? 1 : value;
      }
      return params;
    }, defaults);
  }
  function createEmbed(_ref, element) {
    var html = _ref.html;
    if (!element) {
      throw new TypeError("An element must be provided");
    }
    if (element.getAttribute("data-vimeo-initialized") !== null) {
      return element.querySelector("iframe");
    }
    var div = document.createElement("div");
    div.innerHTML = html;
    element.appendChild(div.firstChild);
    element.setAttribute("data-vimeo-initialized", "true");
    return element.querySelector("iframe");
  }
  function getOEmbedData(videoUrl) {
    var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var element = arguments.length > 2 ? arguments[2] : void 0;
    return new Promise(function(resolve, reject) {
      if (!isVimeoUrl(videoUrl)) {
        throw new TypeError("\u201C".concat(videoUrl, "\u201D is not a vimeo.com url."));
      }
      var url = "https://vimeo.com/api/oembed.json?url=".concat(encodeURIComponent(videoUrl));
      for (var param in params) {
        if (params.hasOwnProperty(param)) {
          url += "&".concat(param, "=").concat(encodeURIComponent(params[param]));
        }
      }
      var xhr = "XDomainRequest" in window ? new XDomainRequest() : new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.onload = function() {
        if (xhr.status === 404) {
          reject(new Error("\u201C".concat(videoUrl, "\u201D was not found.")));
          return;
        }
        if (xhr.status === 403) {
          reject(new Error("\u201C".concat(videoUrl, "\u201D is not embeddable.")));
          return;
        }
        try {
          var json = JSON.parse(xhr.responseText);
          if (json.domain_status_code === 403) {
            createEmbed(json, element);
            reject(new Error("\u201C".concat(videoUrl, "\u201D is not embeddable.")));
            return;
          }
          resolve(json);
        } catch (error) {
          reject(error);
        }
      };
      xhr.onerror = function() {
        var status = xhr.status ? " (".concat(xhr.status, ")") : "";
        reject(new Error("There was an error fetching the embed code from Vimeo".concat(status, ".")));
      };
      xhr.send();
    });
  }
  function initializeEmbeds() {
    var parent = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : document;
    var elements = [].slice.call(parent.querySelectorAll("[data-vimeo-id], [data-vimeo-url]"));
    var handleError = function handleError2(error) {
      if ("console" in window && console.error) {
        console.error("There was an error creating an embed: ".concat(error));
      }
    };
    elements.forEach(function(element) {
      try {
        if (element.getAttribute("data-vimeo-defer") !== null) {
          return;
        }
        var params = getOEmbedParameters(element);
        var url = getVimeoUrl(params);
        getOEmbedData(url, params, element).then(function(data) {
          return createEmbed(data, element);
        }).catch(handleError);
      } catch (error) {
        handleError(error);
      }
    });
  }
  function resizeEmbeds() {
    var parent = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : document;
    if (window.VimeoPlayerResizeEmbeds_) {
      return;
    }
    window.VimeoPlayerResizeEmbeds_ = true;
    var onMessage = function onMessage2(event) {
      if (!isVimeoUrl(event.origin)) {
        return;
      }
      if (!event.data || event.data.event !== "spacechange") {
        return;
      }
      var iframes = parent.querySelectorAll("iframe");
      for (var i5 = 0; i5 < iframes.length; i5++) {
        if (iframes[i5].contentWindow !== event.source) {
          continue;
        }
        var space = iframes[i5].parentElement;
        space.style.paddingBottom = "".concat(event.data.data[0].bottom, "px");
        break;
      }
    };
    window.addEventListener("message", onMessage);
  }
  function initAppendVideoMetadata() {
    var parent = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : document;
    if (window.VimeoSeoMetadataAppended) {
      return;
    }
    window.VimeoSeoMetadataAppended = true;
    var onMessage = function onMessage2(event) {
      if (!isVimeoUrl(event.origin)) {
        return;
      }
      var data = parseMessageData(event.data);
      if (!data || data.event !== "ready") {
        return;
      }
      var iframes = parent.querySelectorAll("iframe");
      for (var i5 = 0; i5 < iframes.length; i5++) {
        var iframe = iframes[i5];
        var isValidMessageSource = iframe.contentWindow === event.source;
        if (isVimeoEmbed(iframe.src) && isValidMessageSource) {
          var player = new Player(iframe);
          player.callMethod("appendVideoMetadata", window.location.href);
        }
      }
    };
    window.addEventListener("message", onMessage);
  }
  function checkUrlTimeParam() {
    var parent = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : document;
    if (window.VimeoCheckedUrlTimeParam) {
      return;
    }
    window.VimeoCheckedUrlTimeParam = true;
    var handleError = function handleError2(error) {
      if ("console" in window && console.error) {
        console.error("There was an error getting video Id: ".concat(error));
      }
    };
    var onMessage = function onMessage2(event) {
      if (!isVimeoUrl(event.origin)) {
        return;
      }
      var data = parseMessageData(event.data);
      if (!data || data.event !== "ready") {
        return;
      }
      var iframes = parent.querySelectorAll("iframe");
      for (var i5 = 0; i5 < iframes.length; i5++) {
        var iframe = iframes[i5];
        var isValidMessageSource = iframe.contentWindow === event.source;
        if (isVimeoEmbed(iframe.src) && isValidMessageSource) {
          (function() {
            var player = new Player(iframe);
            player.getVideoId().then(function(videoId) {
              var matches = new RegExp("[?&]vimeo_t_".concat(videoId, "=([^&#]*)")).exec(window.location.href);
              if (matches && matches[1]) {
                var sec = decodeURI(matches[1]);
                player.setCurrentTime(sec);
              }
              return;
            }).catch(handleError);
          })();
        }
      }
    };
    window.addEventListener("message", onMessage);
  }
  function initializeScreenfull() {
    var fn = function() {
      var val;
      var fnMap = [
        ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
        // New WebKit
        ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
        // Old WebKit
        ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"],
        ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
        ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
      ];
      var i5 = 0;
      var l5 = fnMap.length;
      var ret = {};
      for (; i5 < l5; i5++) {
        val = fnMap[i5];
        if (val && val[1] in document) {
          for (i5 = 0; i5 < val.length; i5++) {
            ret[fnMap[0][i5]] = val[i5];
          }
          return ret;
        }
      }
      return false;
    }();
    var eventNameMap = {
      fullscreenchange: fn.fullscreenchange,
      fullscreenerror: fn.fullscreenerror
    };
    var screenfull2 = {
      request: function request(element) {
        return new Promise(function(resolve, reject) {
          var onFullScreenEntered = function onFullScreenEntered2() {
            screenfull2.off("fullscreenchange", onFullScreenEntered2);
            resolve();
          };
          screenfull2.on("fullscreenchange", onFullScreenEntered);
          element = element || document.documentElement;
          var returnPromise = element[fn.requestFullscreen]();
          if (returnPromise instanceof Promise) {
            returnPromise.then(onFullScreenEntered).catch(reject);
          }
        });
      },
      exit: function exit() {
        return new Promise(function(resolve, reject) {
          if (!screenfull2.isFullscreen) {
            resolve();
            return;
          }
          var onFullScreenExit = function onFullScreenExit2() {
            screenfull2.off("fullscreenchange", onFullScreenExit2);
            resolve();
          };
          screenfull2.on("fullscreenchange", onFullScreenExit);
          var returnPromise = document[fn.exitFullscreen]();
          if (returnPromise instanceof Promise) {
            returnPromise.then(onFullScreenExit).catch(reject);
          }
        });
      },
      on: function on(event, callback) {
        var eventName = eventNameMap[event];
        if (eventName) {
          document.addEventListener(eventName, callback);
        }
      },
      off: function off(event, callback) {
        var eventName = eventNameMap[event];
        if (eventName) {
          document.removeEventListener(eventName, callback);
        }
      }
    };
    Object.defineProperties(screenfull2, {
      isFullscreen: {
        get: function get() {
          return Boolean(document[fn.fullscreenElement]);
        }
      },
      element: {
        enumerable: true,
        get: function get() {
          return document[fn.fullscreenElement];
        }
      },
      isEnabled: {
        enumerable: true,
        get: function get() {
          return Boolean(document[fn.fullscreenEnabled]);
        }
      }
    });
    return screenfull2;
  }
  var playerMap = /* @__PURE__ */ new WeakMap();
  var readyMap = /* @__PURE__ */ new WeakMap();
  var screenfull = {};
  var Player = /* @__PURE__ */ function() {
    function Player2(element) {
      var _this = this;
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      _classCallCheck(this, Player2);
      if (window.jQuery && element instanceof jQuery) {
        if (element.length > 1 && window.console && console.warn) {
          console.warn("A jQuery object with multiple elements was passed, using the first element.");
        }
        element = element[0];
      }
      if (typeof document !== "undefined" && typeof element === "string") {
        element = document.getElementById(element);
      }
      if (!isDomElement(element)) {
        throw new TypeError("You must pass either a valid element or a valid id.");
      }
      if (element.nodeName !== "IFRAME") {
        var iframe = element.querySelector("iframe");
        if (iframe) {
          element = iframe;
        }
      }
      if (element.nodeName === "IFRAME" && !isVimeoUrl(element.getAttribute("src") || "")) {
        throw new Error("The player element passed isn\u2019t a Vimeo embed.");
      }
      if (playerMap.has(element)) {
        return playerMap.get(element);
      }
      this._window = element.ownerDocument.defaultView;
      this.element = element;
      this.origin = "*";
      var readyPromise = new npo_src(function(resolve, reject) {
        _this._onMessage = function(event) {
          if (!isVimeoUrl(event.origin) || _this.element.contentWindow !== event.source) {
            return;
          }
          if (_this.origin === "*") {
            _this.origin = event.origin;
          }
          var data = parseMessageData(event.data);
          var isError = data && data.event === "error";
          var isReadyError = isError && data.data && data.data.method === "ready";
          if (isReadyError) {
            var error = new Error(data.data.message);
            error.name = data.data.name;
            reject(error);
            return;
          }
          var isReadyEvent = data && data.event === "ready";
          var isPingResponse = data && data.method === "ping";
          if (isReadyEvent || isPingResponse) {
            _this.element.setAttribute("data-ready", "true");
            resolve();
            return;
          }
          processData(_this, data);
        };
        _this._window.addEventListener("message", _this._onMessage);
        if (_this.element.nodeName !== "IFRAME") {
          var params = getOEmbedParameters(element, options);
          var url = getVimeoUrl(params);
          getOEmbedData(url, params, element).then(function(data) {
            var iframe2 = createEmbed(data, element);
            _this.element = iframe2;
            _this._originalElement = element;
            swapCallbacks(element, iframe2);
            playerMap.set(_this.element, _this);
            return data;
          }).catch(reject);
        }
      });
      readyMap.set(this, readyPromise);
      playerMap.set(this.element, this);
      if (this.element.nodeName === "IFRAME") {
        postMessage(this, "ping");
      }
      if (screenfull.isEnabled) {
        var exitFullscreen = function exitFullscreen2() {
          return screenfull.exit();
        };
        this.fullscreenchangeHandler = function() {
          if (screenfull.isFullscreen) {
            storeCallback(_this, "event:exitFullscreen", exitFullscreen);
          } else {
            removeCallback(_this, "event:exitFullscreen", exitFullscreen);
          }
          _this.ready().then(function() {
            postMessage(_this, "fullscreenchange", screenfull.isFullscreen);
          });
        };
        screenfull.on("fullscreenchange", this.fullscreenchangeHandler);
      }
      return this;
    }
    _createClass(Player2, [{
      key: "callMethod",
      value: function callMethod(name) {
        var _this2 = this;
        var args = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        return new npo_src(function(resolve, reject) {
          return _this2.ready().then(function() {
            storeCallback(_this2, name, {
              resolve,
              reject
            });
            postMessage(_this2, name, args);
          }).catch(reject);
        });
      }
      /**
       * Get a promise for the value of a player property.
       *
       * @param {string} name The property name
       * @return {Promise}
       */
    }, {
      key: "get",
      value: function get(name) {
        var _this3 = this;
        return new npo_src(function(resolve, reject) {
          name = getMethodName(name, "get");
          return _this3.ready().then(function() {
            storeCallback(_this3, name, {
              resolve,
              reject
            });
            postMessage(_this3, name);
          }).catch(reject);
        });
      }
      /**
       * Get a promise for setting the value of a player property.
       *
       * @param {string} name The API method to call.
       * @param {mixed} value The value to set.
       * @return {Promise}
       */
    }, {
      key: "set",
      value: function set(name, value) {
        var _this4 = this;
        return new npo_src(function(resolve, reject) {
          name = getMethodName(name, "set");
          if (value === void 0 || value === null) {
            throw new TypeError("There must be a value to set.");
          }
          return _this4.ready().then(function() {
            storeCallback(_this4, name, {
              resolve,
              reject
            });
            postMessage(_this4, name, value);
          }).catch(reject);
        });
      }
      /**
       * Add an event listener for the specified event. Will call the
       * callback with a single parameter, `data`, that contains the data for
       * that event.
       *
       * @param {string} eventName The name of the event.
       * @param {function(*)} callback The function to call when the event fires.
       * @return {void}
       */
    }, {
      key: "on",
      value: function on(eventName, callback) {
        if (!eventName) {
          throw new TypeError("You must pass an event name.");
        }
        if (!callback) {
          throw new TypeError("You must pass a callback function.");
        }
        if (typeof callback !== "function") {
          throw new TypeError("The callback must be a function.");
        }
        var callbacks = getCallbacks(this, "event:".concat(eventName));
        if (callbacks.length === 0) {
          this.callMethod("addEventListener", eventName).catch(function() {
          });
        }
        storeCallback(this, "event:".concat(eventName), callback);
      }
      /**
       * Remove an event listener for the specified event. Will remove all
       * listeners for that event if a `callback` isn’t passed, or only that
       * specific callback if it is passed.
       *
       * @param {string} eventName The name of the event.
       * @param {function} [callback] The specific callback to remove.
       * @return {void}
       */
    }, {
      key: "off",
      value: function off(eventName, callback) {
        if (!eventName) {
          throw new TypeError("You must pass an event name.");
        }
        if (callback && typeof callback !== "function") {
          throw new TypeError("The callback must be a function.");
        }
        var lastCallback = removeCallback(this, "event:".concat(eventName), callback);
        if (lastCallback) {
          this.callMethod("removeEventListener", eventName).catch(function(e7) {
          });
        }
      }
      /**
       * A promise to load a new video.
       *
       * @promise LoadVideoPromise
       * @fulfill {number} The video with this id or url successfully loaded.
       * @reject {TypeError} The id was not a number.
       */
      /**
       * Load a new video into this embed. The promise will be resolved if
       * the video is successfully loaded, or it will be rejected if it could
       * not be loaded.
       *
       * @param {number|string|object} options The id of the video, the url of the video, or an object with embed options.
       * @return {LoadVideoPromise}
       */
    }, {
      key: "loadVideo",
      value: function loadVideo(options) {
        return this.callMethod("loadVideo", options);
      }
      /**
       * A promise to perform an action when the Player is ready.
       *
       * @todo document errors
       * @promise LoadVideoPromise
       * @fulfill {void}
       */
      /**
       * Trigger a function when the player iframe has initialized. You do not
       * need to wait for `ready` to trigger to begin adding event listeners
       * or calling other methods.
       *
       * @return {ReadyPromise}
       */
    }, {
      key: "ready",
      value: function ready() {
        var readyPromise = readyMap.get(this) || new npo_src(function(resolve, reject) {
          reject(new Error("Unknown player. Probably unloaded."));
        });
        return npo_src.resolve(readyPromise);
      }
      /**
       * A promise to add a cue point to the player.
       *
       * @promise AddCuePointPromise
       * @fulfill {string} The id of the cue point to use for removeCuePoint.
       * @reject {RangeError} the time was less than 0 or greater than the
       *         video’s duration.
       * @reject {UnsupportedError} Cue points are not supported with the current
       *         player or browser.
       */
      /**
       * Add a cue point to the player.
       *
       * @param {number} time The time for the cue point.
       * @param {object} [data] Arbitrary data to be returned with the cue point.
       * @return {AddCuePointPromise}
       */
    }, {
      key: "addCuePoint",
      value: function addCuePoint(time) {
        var data = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        return this.callMethod("addCuePoint", {
          time,
          data
        });
      }
      /**
       * A promise to remove a cue point from the player.
       *
       * @promise AddCuePointPromise
       * @fulfill {string} The id of the cue point that was removed.
       * @reject {InvalidCuePoint} The cue point with the specified id was not
       *         found.
       * @reject {UnsupportedError} Cue points are not supported with the current
       *         player or browser.
       */
      /**
       * Remove a cue point from the video.
       *
       * @param {string} id The id of the cue point to remove.
       * @return {RemoveCuePointPromise}
       */
    }, {
      key: "removeCuePoint",
      value: function removeCuePoint(id) {
        return this.callMethod("removeCuePoint", id);
      }
      /**
       * A representation of a text track on a video.
       *
       * @typedef {Object} VimeoTextTrack
       * @property {string} language The ISO language code.
       * @property {string} kind The kind of track it is (captions or subtitles).
       * @property {string} label The human‐readable label for the track.
       */
      /**
       * A promise to enable a text track.
       *
       * @promise EnableTextTrackPromise
       * @fulfill {VimeoTextTrack} The text track that was enabled.
       * @reject {InvalidTrackLanguageError} No track was available with the
       *         specified language.
       * @reject {InvalidTrackError} No track was available with the specified
       *         language and kind.
       */
      /**
       * Enable the text track with the specified language, and optionally the
       * specified kind (captions or subtitles).
       *
       * When set via the API, the track language will not change the viewer’s
       * stored preference.
       *
       * @param {string} language The two‐letter language code.
       * @param {string} [kind] The kind of track to enable (captions or subtitles).
       * @return {EnableTextTrackPromise}
       */
    }, {
      key: "enableTextTrack",
      value: function enableTextTrack(language, kind) {
        if (!language) {
          throw new TypeError("You must pass a language.");
        }
        return this.callMethod("enableTextTrack", {
          language,
          kind
        });
      }
      /**
       * A promise to disable the active text track.
       *
       * @promise DisableTextTrackPromise
       * @fulfill {void} The track was disabled.
       */
      /**
       * Disable the currently-active text track.
       *
       * @return {DisableTextTrackPromise}
       */
    }, {
      key: "disableTextTrack",
      value: function disableTextTrack() {
        return this.callMethod("disableTextTrack");
      }
      /**
       * A promise to pause the video.
       *
       * @promise PausePromise
       * @fulfill {void} The video was paused.
       */
      /**
       * Pause the video if it’s playing.
       *
       * @return {PausePromise}
       */
    }, {
      key: "pause",
      value: function pause() {
        return this.callMethod("pause");
      }
      /**
       * A promise to play the video.
       *
       * @promise PlayPromise
       * @fulfill {void} The video was played.
       */
      /**
       * Play the video if it’s paused. **Note:** on iOS and some other
       * mobile devices, you cannot programmatically trigger play. Once the
       * viewer has tapped on the play button in the player, however, you
       * will be able to use this function.
       *
       * @return {PlayPromise}
       */
    }, {
      key: "play",
      value: function play() {
        return this.callMethod("play");
      }
      /**
       * Request that the player enters fullscreen.
       * @return {Promise}
       */
    }, {
      key: "requestFullscreen",
      value: function requestFullscreen() {
        if (screenfull.isEnabled) {
          return screenfull.request(this.element);
        }
        return this.callMethod("requestFullscreen");
      }
      /**
       * Request that the player exits fullscreen.
       * @return {Promise}
       */
    }, {
      key: "exitFullscreen",
      value: function exitFullscreen() {
        if (screenfull.isEnabled) {
          return screenfull.exit();
        }
        return this.callMethod("exitFullscreen");
      }
      /**
       * Returns true if the player is currently fullscreen.
       * @return {Promise}
       */
    }, {
      key: "getFullscreen",
      value: function getFullscreen() {
        if (screenfull.isEnabled) {
          return npo_src.resolve(screenfull.isFullscreen);
        }
        return this.get("fullscreen");
      }
      /**
       * Request that the player enters picture-in-picture.
       * @return {Promise}
       */
    }, {
      key: "requestPictureInPicture",
      value: function requestPictureInPicture() {
        return this.callMethod("requestPictureInPicture");
      }
      /**
       * Request that the player exits picture-in-picture.
       * @return {Promise}
       */
    }, {
      key: "exitPictureInPicture",
      value: function exitPictureInPicture() {
        return this.callMethod("exitPictureInPicture");
      }
      /**
       * Returns true if the player is currently picture-in-picture.
       * @return {Promise}
       */
    }, {
      key: "getPictureInPicture",
      value: function getPictureInPicture() {
        return this.get("pictureInPicture");
      }
      /**
       * A promise to unload the video.
       *
       * @promise UnloadPromise
       * @fulfill {void} The video was unloaded.
       */
      /**
       * Return the player to its initial state.
       *
       * @return {UnloadPromise}
       */
    }, {
      key: "unload",
      value: function unload() {
        return this.callMethod("unload");
      }
      /**
       * Cleanup the player and remove it from the DOM
       *
       * It won't be usable and a new one should be constructed
       *  in order to do any operations.
       *
       * @return {Promise}
       */
    }, {
      key: "destroy",
      value: function destroy() {
        var _this5 = this;
        return new npo_src(function(resolve) {
          readyMap.delete(_this5);
          playerMap.delete(_this5.element);
          if (_this5._originalElement) {
            playerMap.delete(_this5._originalElement);
            _this5._originalElement.removeAttribute("data-vimeo-initialized");
          }
          if (_this5.element && _this5.element.nodeName === "IFRAME" && _this5.element.parentNode) {
            if (_this5.element.parentNode.parentNode && _this5._originalElement && _this5._originalElement !== _this5.element.parentNode) {
              _this5.element.parentNode.parentNode.removeChild(_this5.element.parentNode);
            } else {
              _this5.element.parentNode.removeChild(_this5.element);
            }
          }
          if (_this5.element && _this5.element.nodeName === "DIV" && _this5.element.parentNode) {
            _this5.element.removeAttribute("data-vimeo-initialized");
            var iframe = _this5.element.querySelector("iframe");
            if (iframe && iframe.parentNode) {
              if (iframe.parentNode.parentNode && _this5._originalElement && _this5._originalElement !== iframe.parentNode) {
                iframe.parentNode.parentNode.removeChild(iframe.parentNode);
              } else {
                iframe.parentNode.removeChild(iframe);
              }
            }
          }
          _this5._window.removeEventListener("message", _this5._onMessage);
          if (screenfull.isEnabled) {
            screenfull.off("fullscreenchange", _this5.fullscreenchangeHandler);
          }
          resolve();
        });
      }
      /**
       * A promise to get the autopause behavior of the video.
       *
       * @promise GetAutopausePromise
       * @fulfill {boolean} Whether autopause is turned on or off.
       * @reject {UnsupportedError} Autopause is not supported with the current
       *         player or browser.
       */
      /**
       * Get the autopause behavior for this player.
       *
       * @return {GetAutopausePromise}
       */
    }, {
      key: "getAutopause",
      value: function getAutopause() {
        return this.get("autopause");
      }
      /**
       * A promise to set the autopause behavior of the video.
       *
       * @promise SetAutopausePromise
       * @fulfill {boolean} Whether autopause is turned on or off.
       * @reject {UnsupportedError} Autopause is not supported with the current
       *         player or browser.
       */
      /**
       * Enable or disable the autopause behavior of this player.
       *
       * By default, when another video is played in the same browser, this
       * player will automatically pause. Unless you have a specific reason
       * for doing so, we recommend that you leave autopause set to the
       * default (`true`).
       *
       * @param {boolean} autopause
       * @return {SetAutopausePromise}
       */
    }, {
      key: "setAutopause",
      value: function setAutopause(autopause) {
        return this.set("autopause", autopause);
      }
      /**
       * A promise to get the buffered property of the video.
       *
       * @promise GetBufferedPromise
       * @fulfill {Array} Buffered Timeranges converted to an Array.
       */
      /**
       * Get the buffered property of the video.
       *
       * @return {GetBufferedPromise}
       */
    }, {
      key: "getBuffered",
      value: function getBuffered() {
        return this.get("buffered");
      }
      /**
       * @typedef {Object} CameraProperties
       * @prop {number} props.yaw - Number between 0 and 360.
       * @prop {number} props.pitch - Number between -90 and 90.
       * @prop {number} props.roll - Number between -180 and 180.
       * @prop {number} props.fov - The field of view in degrees.
       */
      /**
       * A promise to get the camera properties of the player.
       *
       * @promise GetCameraPromise
       * @fulfill {CameraProperties} The camera properties.
       */
      /**
       * For 360° videos get the camera properties for this player.
       *
       * @return {GetCameraPromise}
       */
    }, {
      key: "getCameraProps",
      value: function getCameraProps() {
        return this.get("cameraProps");
      }
      /**
       * A promise to set the camera properties of the player.
       *
       * @promise SetCameraPromise
       * @fulfill {Object} The camera was successfully set.
       * @reject {RangeError} The range was out of bounds.
       */
      /**
       * For 360° videos set the camera properties for this player.
       *
       * @param {CameraProperties} camera The camera properties
       * @return {SetCameraPromise}
       */
    }, {
      key: "setCameraProps",
      value: function setCameraProps(camera) {
        return this.set("cameraProps", camera);
      }
      /**
       * A representation of a chapter.
       *
       * @typedef {Object} VimeoChapter
       * @property {number} startTime The start time of the chapter.
       * @property {object} title The title of the chapter.
       * @property {number} index The place in the order of Chapters. Starts at 1.
       */
      /**
       * A promise to get chapters for the video.
       *
       * @promise GetChaptersPromise
       * @fulfill {VimeoChapter[]} The chapters for the video.
       */
      /**
       * Get an array of all the chapters for the video.
       *
       * @return {GetChaptersPromise}
       */
    }, {
      key: "getChapters",
      value: function getChapters() {
        return this.get("chapters");
      }
      /**
       * A promise to get the currently active chapter.
       *
       * @promise GetCurrentChaptersPromise
       * @fulfill {VimeoChapter|undefined} The current chapter for the video.
       */
      /**
       * Get the currently active chapter for the video.
       *
       * @return {GetCurrentChaptersPromise}
       */
    }, {
      key: "getCurrentChapter",
      value: function getCurrentChapter() {
        return this.get("currentChapter");
      }
      /**
       * A promise to get the color of the player.
       *
       * @promise GetColorPromise
       * @fulfill {string} The hex color of the player.
       */
      /**
       * Get the color for this player.
       *
       * @return {GetColorPromise}
       */
    }, {
      key: "getColor",
      value: function getColor() {
        return this.get("color");
      }
      /**
       * A promise to set the color of the player.
       *
       * @promise SetColorPromise
       * @fulfill {string} The color was successfully set.
       * @reject {TypeError} The string was not a valid hex or rgb color.
       * @reject {ContrastError} The color was set, but the contrast is
       *         outside of the acceptable range.
       * @reject {EmbedSettingsError} The owner of the player has chosen to
       *         use a specific color.
       */
      /**
       * Set the color of this player to a hex or rgb string. Setting the
       * color may fail if the owner of the video has set their embed
       * preferences to force a specific color.
       *
       * @param {string} color The hex or rgb color string to set.
       * @return {SetColorPromise}
       */
    }, {
      key: "setColor",
      value: function setColor(color) {
        return this.set("color", color);
      }
      /**
       * A representation of a cue point.
       *
       * @typedef {Object} VimeoCuePoint
       * @property {number} time The time of the cue point.
       * @property {object} data The data passed when adding the cue point.
       * @property {string} id The unique id for use with removeCuePoint.
       */
      /**
       * A promise to get the cue points of a video.
       *
       * @promise GetCuePointsPromise
       * @fulfill {VimeoCuePoint[]} The cue points added to the video.
       * @reject {UnsupportedError} Cue points are not supported with the current
       *         player or browser.
       */
      /**
       * Get an array of the cue points added to the video.
       *
       * @return {GetCuePointsPromise}
       */
    }, {
      key: "getCuePoints",
      value: function getCuePoints() {
        return this.get("cuePoints");
      }
      /**
       * A promise to get the current time of the video.
       *
       * @promise GetCurrentTimePromise
       * @fulfill {number} The current time in seconds.
       */
      /**
       * Get the current playback position in seconds.
       *
       * @return {GetCurrentTimePromise}
       */
    }, {
      key: "getCurrentTime",
      value: function getCurrentTime() {
        return this.get("currentTime");
      }
      /**
       * A promise to set the current time of the video.
       *
       * @promise SetCurrentTimePromise
       * @fulfill {number} The actual current time that was set.
       * @reject {RangeError} the time was less than 0 or greater than the
       *         video’s duration.
       */
      /**
       * Set the current playback position in seconds. If the player was
       * paused, it will remain paused. Likewise, if the player was playing,
       * it will resume playing once the video has buffered.
       *
       * You can provide an accurate time and the player will attempt to seek
       * to as close to that time as possible. The exact time will be the
       * fulfilled value of the promise.
       *
       * @param {number} currentTime
       * @return {SetCurrentTimePromise}
       */
    }, {
      key: "setCurrentTime",
      value: function setCurrentTime(currentTime) {
        return this.set("currentTime", currentTime);
      }
      /**
       * A promise to get the duration of the video.
       *
       * @promise GetDurationPromise
       * @fulfill {number} The duration in seconds.
       */
      /**
       * Get the duration of the video in seconds. It will be rounded to the
       * nearest second before playback begins, and to the nearest thousandth
       * of a second after playback begins.
       *
       * @return {GetDurationPromise}
       */
    }, {
      key: "getDuration",
      value: function getDuration() {
        return this.get("duration");
      }
      /**
       * A promise to get the ended state of the video.
       *
       * @promise GetEndedPromise
       * @fulfill {boolean} Whether or not the video has ended.
       */
      /**
       * Get the ended state of the video. The video has ended if
       * `currentTime === duration`.
       *
       * @return {GetEndedPromise}
       */
    }, {
      key: "getEnded",
      value: function getEnded() {
        return this.get("ended");
      }
      /**
       * A promise to get the loop state of the player.
       *
       * @promise GetLoopPromise
       * @fulfill {boolean} Whether or not the player is set to loop.
       */
      /**
       * Get the loop state of the player.
       *
       * @return {GetLoopPromise}
       */
    }, {
      key: "getLoop",
      value: function getLoop() {
        return this.get("loop");
      }
      /**
       * A promise to set the loop state of the player.
       *
       * @promise SetLoopPromise
       * @fulfill {boolean} The loop state that was set.
       */
      /**
       * Set the loop state of the player. When set to `true`, the player
       * will start over immediately once playback ends.
       *
       * @param {boolean} loop
       * @return {SetLoopPromise}
       */
    }, {
      key: "setLoop",
      value: function setLoop(loop) {
        return this.set("loop", loop);
      }
      /**
       * A promise to set the muted state of the player.
       *
       * @promise SetMutedPromise
       * @fulfill {boolean} The muted state that was set.
       */
      /**
       * Set the muted state of the player. When set to `true`, the player
       * volume will be muted.
       *
       * @param {boolean} muted
       * @return {SetMutedPromise}
       */
    }, {
      key: "setMuted",
      value: function setMuted(muted) {
        return this.set("muted", muted);
      }
      /**
       * A promise to get the muted state of the player.
       *
       * @promise GetMutedPromise
       * @fulfill {boolean} Whether or not the player is muted.
       */
      /**
       * Get the muted state of the player.
       *
       * @return {GetMutedPromise}
       */
    }, {
      key: "getMuted",
      value: function getMuted() {
        return this.get("muted");
      }
      /**
       * A promise to get the paused state of the player.
       *
       * @promise GetLoopPromise
       * @fulfill {boolean} Whether or not the video is paused.
       */
      /**
       * Get the paused state of the player.
       *
       * @return {GetLoopPromise}
       */
    }, {
      key: "getPaused",
      value: function getPaused() {
        return this.get("paused");
      }
      /**
       * A promise to get the playback rate of the player.
       *
       * @promise GetPlaybackRatePromise
       * @fulfill {number} The playback rate of the player on a scale from 0.5 to 2.
       */
      /**
       * Get the playback rate of the player on a scale from `0.5` to `2`.
       *
       * @return {GetPlaybackRatePromise}
       */
    }, {
      key: "getPlaybackRate",
      value: function getPlaybackRate() {
        return this.get("playbackRate");
      }
      /**
       * A promise to set the playbackrate of the player.
       *
       * @promise SetPlaybackRatePromise
       * @fulfill {number} The playback rate was set.
       * @reject {RangeError} The playback rate was less than 0.5 or greater than 2.
       */
      /**
       * Set the playback rate of the player on a scale from `0.5` to `2`. When set
       * via the API, the playback rate will not be synchronized to other
       * players or stored as the viewer's preference.
       *
       * @param {number} playbackRate
       * @return {SetPlaybackRatePromise}
       */
    }, {
      key: "setPlaybackRate",
      value: function setPlaybackRate(playbackRate) {
        return this.set("playbackRate", playbackRate);
      }
      /**
       * A promise to get the played property of the video.
       *
       * @promise GetPlayedPromise
       * @fulfill {Array} Played Timeranges converted to an Array.
       */
      /**
       * Get the played property of the video.
       *
       * @return {GetPlayedPromise}
       */
    }, {
      key: "getPlayed",
      value: function getPlayed() {
        return this.get("played");
      }
      /**
       * A promise to get the qualities available of the current video.
       *
       * @promise GetQualitiesPromise
       * @fulfill {Array} The qualities of the video.
       */
      /**
       * Get the qualities of the current video.
       *
       * @return {GetQualitiesPromise}
       */
    }, {
      key: "getQualities",
      value: function getQualities() {
        return this.get("qualities");
      }
      /**
       * A promise to get the current set quality of the video.
       *
       * @promise GetQualityPromise
       * @fulfill {string} The current set quality.
       */
      /**
       * Get the current set quality of the video.
       *
       * @return {GetQualityPromise}
       */
    }, {
      key: "getQuality",
      value: function getQuality() {
        return this.get("quality");
      }
      /**
       * A promise to set the video quality.
       *
       * @promise SetQualityPromise
       * @fulfill {number} The quality was set.
       * @reject {RangeError} The quality is not available.
       */
      /**
       * Set a video quality.
       *
       * @param {string} quality
       * @return {SetQualityPromise}
       */
    }, {
      key: "setQuality",
      value: function setQuality(quality) {
        return this.set("quality", quality);
      }
      /**
       * A promise to get the seekable property of the video.
       *
       * @promise GetSeekablePromise
       * @fulfill {Array} Seekable Timeranges converted to an Array.
       */
      /**
       * Get the seekable property of the video.
       *
       * @return {GetSeekablePromise}
       */
    }, {
      key: "getSeekable",
      value: function getSeekable() {
        return this.get("seekable");
      }
      /**
       * A promise to get the seeking property of the player.
       *
       * @promise GetSeekingPromise
       * @fulfill {boolean} Whether or not the player is currently seeking.
       */
      /**
       * Get if the player is currently seeking.
       *
       * @return {GetSeekingPromise}
       */
    }, {
      key: "getSeeking",
      value: function getSeeking() {
        return this.get("seeking");
      }
      /**
       * A promise to get the text tracks of a video.
       *
       * @promise GetTextTracksPromise
       * @fulfill {VimeoTextTrack[]} The text tracks associated with the video.
       */
      /**
       * Get an array of the text tracks that exist for the video.
       *
       * @return {GetTextTracksPromise}
       */
    }, {
      key: "getTextTracks",
      value: function getTextTracks() {
        return this.get("textTracks");
      }
      /**
       * A promise to get the embed code for the video.
       *
       * @promise GetVideoEmbedCodePromise
       * @fulfill {string} The `<iframe>` embed code for the video.
       */
      /**
       * Get the `<iframe>` embed code for the video.
       *
       * @return {GetVideoEmbedCodePromise}
       */
    }, {
      key: "getVideoEmbedCode",
      value: function getVideoEmbedCode() {
        return this.get("videoEmbedCode");
      }
      /**
       * A promise to get the id of the video.
       *
       * @promise GetVideoIdPromise
       * @fulfill {number} The id of the video.
       */
      /**
       * Get the id of the video.
       *
       * @return {GetVideoIdPromise}
       */
    }, {
      key: "getVideoId",
      value: function getVideoId() {
        return this.get("videoId");
      }
      /**
       * A promise to get the title of the video.
       *
       * @promise GetVideoTitlePromise
       * @fulfill {number} The title of the video.
       */
      /**
       * Get the title of the video.
       *
       * @return {GetVideoTitlePromise}
       */
    }, {
      key: "getVideoTitle",
      value: function getVideoTitle() {
        return this.get("videoTitle");
      }
      /**
       * A promise to get the native width of the video.
       *
       * @promise GetVideoWidthPromise
       * @fulfill {number} The native width of the video.
       */
      /**
       * Get the native width of the currently‐playing video. The width of
       * the highest‐resolution available will be used before playback begins.
       *
       * @return {GetVideoWidthPromise}
       */
    }, {
      key: "getVideoWidth",
      value: function getVideoWidth() {
        return this.get("videoWidth");
      }
      /**
       * A promise to get the native height of the video.
       *
       * @promise GetVideoHeightPromise
       * @fulfill {number} The native height of the video.
       */
      /**
       * Get the native height of the currently‐playing video. The height of
       * the highest‐resolution available will be used before playback begins.
       *
       * @return {GetVideoHeightPromise}
       */
    }, {
      key: "getVideoHeight",
      value: function getVideoHeight() {
        return this.get("videoHeight");
      }
      /**
       * A promise to get the vimeo.com url for the video.
       *
       * @promise GetVideoUrlPromise
       * @fulfill {number} The vimeo.com url for the video.
       * @reject {PrivacyError} The url isn’t available because of the video’s privacy setting.
       */
      /**
       * Get the vimeo.com url for the video.
       *
       * @return {GetVideoUrlPromise}
       */
    }, {
      key: "getVideoUrl",
      value: function getVideoUrl() {
        return this.get("videoUrl");
      }
      /**
       * A promise to get the volume level of the player.
       *
       * @promise GetVolumePromise
       * @fulfill {number} The volume level of the player on a scale from 0 to 1.
       */
      /**
       * Get the current volume level of the player on a scale from `0` to `1`.
       *
       * Most mobile devices do not support an independent volume from the
       * system volume. In those cases, this method will always return `1`.
       *
       * @return {GetVolumePromise}
       */
    }, {
      key: "getVolume",
      value: function getVolume() {
        return this.get("volume");
      }
      /**
       * A promise to set the volume level of the player.
       *
       * @promise SetVolumePromise
       * @fulfill {number} The volume was set.
       * @reject {RangeError} The volume was less than 0 or greater than 1.
       */
      /**
       * Set the volume of the player on a scale from `0` to `1`. When set
       * via the API, the volume level will not be synchronized to other
       * players or stored as the viewer’s preference.
       *
       * Most mobile devices do not support setting the volume. An error will
       * *not* be triggered in that situation.
       *
       * @param {number} volume
       * @return {SetVolumePromise}
       */
    }, {
      key: "setVolume",
      value: function setVolume(volume) {
        return this.set("volume", volume);
      }
    }]);
    return Player2;
  }();
  if (!isNode) {
    screenfull = initializeScreenfull();
    initializeEmbeds();
    resizeEmbeds();
    initAppendVideoMetadata();
    checkUrlTimeParam();
  }
  var player_es_default = Player;

  // node_modules/vimeo-video-element/vimeo-video-element.js
  var EMBED_BASE = "https://player.vimeo.com/video";
  var MATCH_SRC = /vimeo\.com\/(?:video\/)?(\d+)/;
  var templateShadowDOM = globalThis.document?.createElement("template");
  if (templateShadowDOM) {
    templateShadowDOM.innerHTML = /*html*/
    `
  <style>
    :host {
      display: inline-block;
      min-width: 300px;
      min-height: 150px;
      position: relative;
    }
    iframe {
      position: absolute;
      top: 0;
      left: 0;
    }
    :host(:not([controls])) {
      pointer-events: none;
    }
  </style>
  `;
  }
  var _hasLoaded, _noInit, _options, _currentTime, _duration, _muted, _paused, _playbackRate, _progress, _readyState, _seeking, _volume, _videoWidth, _videoHeight;
  var VimeoVideoElement = class extends (globalThis.HTMLElement ?? class {
  }) {
    constructor() {
      super();
      __privateAdd(this, _hasLoaded, void 0);
      __privateAdd(this, _noInit, void 0);
      __privateAdd(this, _options, void 0);
      __privateAdd(this, _currentTime, 0);
      __privateAdd(this, _duration, NaN);
      __privateAdd(this, _muted, false);
      __privateAdd(this, _paused, !this.autoplay);
      __privateAdd(this, _playbackRate, 1);
      __privateAdd(this, _progress, 0);
      __privateAdd(this, _readyState, 0);
      __privateAdd(this, _seeking, false);
      __privateAdd(this, _volume, 1);
      __privateAdd(this, _videoWidth, NaN);
      __privateAdd(this, _videoHeight, NaN);
      this.attachShadow({ mode: "open" });
      this.shadowRoot.append(templateShadowDOM.content.cloneNode(true));
      this.loadComplete = new PublicPromise();
    }
    async load() {
      if (__privateGet(this, _hasLoaded)) {
        this.loadComplete = new PublicPromise();
        __privateSet(this, _noInit, true);
      }
      __privateSet(this, _hasLoaded, true);
      __privateSet(this, _currentTime, 0);
      __privateSet(this, _duration, NaN);
      __privateSet(this, _muted, false);
      __privateSet(this, _paused, !this.autoplay);
      __privateSet(this, _playbackRate, 1);
      __privateSet(this, _progress, 0);
      __privateSet(this, _readyState, 0);
      __privateSet(this, _seeking, false);
      __privateSet(this, _volume, 1);
      __privateSet(this, _readyState, 0);
      __privateSet(this, _videoWidth, NaN);
      __privateSet(this, _videoHeight, NaN);
      this.dispatchEvent(new Event("emptied"));
      let oldApi = this.api;
      this.api = null;
      await Promise.resolve();
      if (!this.src) {
        return;
      }
      this.dispatchEvent(new Event("loadstart"));
      __privateSet(this, _options, {
        autoplay: this.autoplay,
        controls: this.controls,
        loop: this.loop,
        muted: this.defaultMuted,
        playsinline: this.playsInline,
        preload: this.preload ?? "metadata",
        transparent: false,
        autopause: this.hasAttribute("autopause")
      });
      const onLoaded = async () => {
        __privateSet(this, _readyState, 1);
        this.dispatchEvent(new Event("loadedmetadata"));
        if (this.api) {
          __privateSet(this, _muted, await this.api.getMuted());
          __privateSet(this, _volume, await this.api.getVolume());
          this.dispatchEvent(new Event("volumechange"));
          __privateSet(this, _duration, await this.api.getDuration());
          this.dispatchEvent(new Event("durationchange"));
        }
        this.dispatchEvent(new Event("loadcomplete"));
        this.loadComplete.resolve();
      };
      if (__privateGet(this, _noInit)) {
        this.api = oldApi;
        await this.api.loadVideo({
          ...__privateGet(this, _options),
          url: this.src
        });
        await onLoaded();
        await this.loadComplete;
        return;
      }
      const matches = this.src.match(MATCH_SRC);
      const metaId = matches && matches[1];
      const src = `${EMBED_BASE}/${metaId}?${serialize(
        boolToBinary(__privateGet(this, _options))
      )}`;
      let iframe = this.shadowRoot.querySelector("iframe");
      if (!iframe) {
        iframe = createEmbedIframe({ src });
        this.shadowRoot.append(iframe);
      }
      this.api = new player_es_default(iframe);
      const onceLoaded = () => {
        this.api.off("loaded", onceLoaded);
        onLoaded();
      };
      this.api.on("loaded", onceLoaded);
      this.api.on("bufferstart", () => {
        if (__privateGet(this, _paused)) {
          __privateSet(this, _paused, false);
          this.dispatchEvent(new Event("play"));
        }
        this.dispatchEvent(new Event("waiting"));
      });
      this.api.on("play", () => {
        if (!__privateGet(this, _paused))
          return;
        __privateSet(this, _paused, false);
        this.dispatchEvent(new Event("play"));
      });
      this.api.on("playing", () => {
        __privateSet(this, _readyState, 3);
        __privateSet(this, _paused, false);
        this.dispatchEvent(new Event("playing"));
      });
      this.api.on("seeking", () => {
        __privateSet(this, _seeking, true);
        this.dispatchEvent(new Event("seeking"));
      });
      this.api.on("seeked", () => {
        __privateSet(this, _seeking, false);
        this.dispatchEvent(new Event("seeked"));
      });
      this.api.on("pause", () => {
        __privateSet(this, _paused, true);
        this.dispatchEvent(new Event("pause"));
      });
      this.api.on("ended", () => {
        __privateSet(this, _paused, true);
        this.dispatchEvent(new Event("ended"));
      });
      this.api.on("ratechange", ({ playbackRate }) => {
        __privateSet(this, _playbackRate, playbackRate);
        this.dispatchEvent(new Event("ratechange"));
      });
      this.api.on("volumechange", async ({ volume }) => {
        __privateSet(this, _volume, volume);
        if (this.api) {
          __privateSet(this, _muted, await this.api.getMuted());
        }
        this.dispatchEvent(new Event("volumechange"));
      });
      this.api.on("durationchange", ({ duration }) => {
        __privateSet(this, _duration, duration);
        this.dispatchEvent(new Event("durationchange"));
      });
      this.api.on("timeupdate", ({ seconds }) => {
        __privateSet(this, _currentTime, seconds);
        this.dispatchEvent(new Event("timeupdate"));
      });
      this.api.on("progress", ({ seconds }) => {
        __privateSet(this, _progress, seconds);
        this.dispatchEvent(new Event("progress"));
      });
      this.api.on("resize", ({ videoWidth, videoHeight }) => {
        __privateSet(this, _videoWidth, videoWidth);
        __privateSet(this, _videoHeight, videoHeight);
        this.dispatchEvent(new Event("resize"));
      });
      await this.loadComplete;
    }
    async attributeChangedCallback(attrName, oldValue, newValue) {
      switch (attrName) {
        case "src": {
          if (oldValue !== newValue) {
            this.load();
          }
          return;
        }
      }
      await this.loadComplete;
      switch (attrName) {
        case "autoplay":
        case "controls": {
          if (__privateGet(this, _options)[attrName] !== this.hasAttribute(attrName)) {
            this.load();
          }
          break;
        }
        case "loop": {
          this.api.setLoop(this.loop);
          break;
        }
      }
    }
    async play() {
      __privateSet(this, _paused, false);
      this.dispatchEvent(new Event("play"));
      await this.loadComplete;
      try {
        await this.api?.play();
      } catch (error) {
        __privateSet(this, _paused, true);
        this.dispatchEvent(new Event("pause"));
        throw error;
      }
    }
    async pause() {
      await this.loadComplete;
      return this.api?.pause();
    }
    get ended() {
      return __privateGet(this, _currentTime) >= __privateGet(this, _duration);
    }
    get seeking() {
      return __privateGet(this, _seeking);
    }
    get readyState() {
      return __privateGet(this, _readyState);
    }
    get videoWidth() {
      return __privateGet(this, _videoWidth);
    }
    get videoHeight() {
      return __privateGet(this, _videoHeight);
    }
    // If the getter from SuperVideoElement is overridden, it's required to define
    // the setter again too unless it's a read only property! It's a JS thing.
    get src() {
      return this.getAttribute("src");
    }
    set src(val) {
      if (this.src == val)
        return;
      this.setAttribute("src", val);
    }
    get paused() {
      return __privateGet(this, _paused);
    }
    get duration() {
      return __privateGet(this, _duration);
    }
    get autoplay() {
      return this.hasAttribute("autoplay");
    }
    set autoplay(val) {
      if (this.autoplay == val)
        return;
      this.toggleAttribute("autoplay", Boolean(val));
    }
    get buffered() {
      if (__privateGet(this, _progress) > 0) {
        return createTimeRanges(0, __privateGet(this, _progress));
      }
      return createTimeRanges();
    }
    get controls() {
      return this.hasAttribute("controls");
    }
    set controls(val) {
      if (this.controls == val)
        return;
      this.toggleAttribute("controls", Boolean(val));
    }
    get currentTime() {
      return __privateGet(this, _currentTime);
    }
    set currentTime(val) {
      if (this.currentTime == val)
        return;
      __privateSet(this, _currentTime, val);
      this.loadComplete.then(() => {
        this.api?.setCurrentTime(val);
      });
    }
    get defaultMuted() {
      return this.hasAttribute("muted");
    }
    set defaultMuted(val) {
      if (this.defaultMuted == val)
        return;
      this.toggleAttribute("muted", Boolean(val));
    }
    get loop() {
      return this.hasAttribute("loop");
    }
    set loop(val) {
      if (this.loop == val)
        return;
      this.toggleAttribute("loop", Boolean(val));
    }
    get muted() {
      return __privateGet(this, _muted);
    }
    set muted(val) {
      if (this.muted == val)
        return;
      __privateSet(this, _muted, val);
      this.loadComplete.then(() => {
        this.api?.setMuted(val);
      });
    }
    get playbackRate() {
      return __privateGet(this, _playbackRate);
    }
    set playbackRate(val) {
      if (this.playbackRate == val)
        return;
      __privateSet(this, _playbackRate, val);
      this.loadComplete.then(() => {
        this.api?.setPlaybackRate(val);
      });
    }
    get playsInline() {
      return this.hasAttribute("playsinline");
    }
    set playsInline(val) {
      if (this.playsInline == val)
        return;
      this.toggleAttribute("playsinline", Boolean(val));
    }
    get poster() {
      return this.getAttribute("poster");
    }
    set poster(val) {
      if (this.poster == val)
        return;
      this.setAttribute("poster", `${val}`);
    }
    get volume() {
      return __privateGet(this, _volume);
    }
    set volume(val) {
      if (this.volume == val)
        return;
      __privateSet(this, _volume, val);
      this.loadComplete.then(() => {
        this.api?.setVolume(val);
      });
    }
  };
  _hasLoaded = new WeakMap();
  _noInit = new WeakMap();
  _options = new WeakMap();
  _currentTime = new WeakMap();
  _duration = new WeakMap();
  _muted = new WeakMap();
  _paused = new WeakMap();
  _playbackRate = new WeakMap();
  _progress = new WeakMap();
  _readyState = new WeakMap();
  _seeking = new WeakMap();
  _volume = new WeakMap();
  _videoWidth = new WeakMap();
  _videoHeight = new WeakMap();
  __publicField(VimeoVideoElement, "observedAttributes", [
    "autoplay",
    "controls",
    "crossorigin",
    "loop",
    "muted",
    "playsinline",
    "poster",
    "preload",
    "src"
  ]);
  var PublicPromise = class extends Promise {
    constructor(executor = () => {
    }) {
      let res, rej;
      super((resolve, reject) => {
        executor(resolve, reject);
        res = resolve;
        rej = reject;
      });
      this.resolve = res;
      this.reject = rej;
    }
  };
  function createElement(tag, attrs = {}, ...children) {
    const el = document.createElement(tag);
    Object.keys(attrs).forEach(
      (name) => attrs[name] != null && el.setAttribute(name, attrs[name])
    );
    el.append(...children);
    return el;
  }
  var allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
  function createEmbedIframe({ src, ...props }) {
    return createElement("iframe", {
      src,
      width: "100%",
      height: "100%",
      allow,
      allowfullscreen: "",
      frameborder: 0,
      ...props
    });
  }
  function serialize(props) {
    return Object.keys(props).map((key) => {
      if (props[key] == null)
        return "";
      return `${key}=${encodeURIComponent(props[key])}`;
    }).join("&");
  }
  function boolToBinary(props) {
    let p2 = { ...props };
    for (let key in p2) {
      if (p2[key] === false)
        p2[key] = 0;
      else if (p2[key] === true)
        p2[key] = 1;
    }
    return p2;
  }
  function createTimeRanges(start, end) {
    if (Array.isArray(start)) {
      return createTimeRangesObj(start);
    } else if (start == null || end == null || start === 0 && end === 0) {
      return createTimeRangesObj([[0, 0]]);
    }
    return createTimeRangesObj([[start, end]]);
  }
  function createTimeRangesObj(ranges) {
    Object.defineProperties(ranges, {
      start: {
        value: (i5) => ranges[i5][0]
      },
      end: {
        value: (i5) => ranges[i5][1]
      }
    });
    return ranges;
  }
  if (globalThis.customElements && !globalThis.customElements.get("vimeo-video")) {
    globalThis.customElements.define("vimeo-video", VimeoVideoElement);
  }

  // css/questionnaire.lit.scss
  var questionnaire_lit_default = i`
@import url("https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap");
h1 {
  font-size: 2rem;
  font-family: "Lato", Calibri, Tahoma, sans-serif;
  font-weight: 700;
}

h2 {
  font-weight: 300;
  margin: 0px;
  font-family: "Lato", Calibri, Tahoma, sans-serif;
  font-size: 1.5rem;
}

h3 {
  font-weight: 300;
  margin-top: 0px;
  font-family: "Lato", Calibri, Tahoma, sans-serif;
  font-size: 1rem;
}

.questionnaire--modal {
  background-color: #fafafc;
  border: none;
  height: 100vh;
  width: 100%;
  margin: auto auto;
  text-align: center;
  padding: 0px 0px 0px;
}

.questionnaire--bt-contain {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
}
@media screen and (max-width: 700px) {
  .questionnaire--bt-contain {
    flex-direction: column;
  }
}

.questionnaire--question {
  justify-content: center;
  padding: 0 100px;
  height: 100px;
}
@media screen and (max-width: 700px) {
  .questionnaire--question {
    padding: 0 15px;
    height: unset;
  }
}

.questionnaire-illustration img {
  width: 80%;
  max-width: 350px;
}
@media screen and (max-width: 700px) {
  .questionnaire-illustration {
    margin-bottom: 35px;
  }
}

button {
  font-family: "lato", Calibri, Tahoma, sans-serif;
  padding: 10px 35px;
  width: 400px;
  min-height: 85px;
  display: block;
  border: 1px solid #8c8c8c;
  border-radius: 30px;
  background-color: #fff;
  margin-bottom: 20px;
  font-size: 1rem;
  font-weight: 300;
  line-height: 23px;
  transition: transform 150ms;
}
@media screen and (max-width: 700px) {
  button {
    height: unset;
  }
}

button:hover {
  border: 2px solid #e9a0a1;
  transform: translateY(4px);
}

.contactform--container {
  padding: 100px;
}
@media screen and (max-width: 700px) {
  .contactform--container {
    padding: 100px 15px;
    width: 92%;
  }
}
.contactform--container label {
  width: 28%;
  display: block;
  margin: 0 auto;
  text-align: left;
  color: rgb(132, 132, 132);
}
.contactform--container input {
  display: block;
  font-family: "lato", Calibri, Tahoma, sans-serif;
  padding: 5px 15px;
  width: 25%;
  display: block;
  margin: 0 auto;
  text-align: left;
  height: 35px;
  border: 1px solid #8c8c8c;
  border-radius: 5px;
  background-color: #fff;
  margin-bottom: 20px;
  margin-top: 3px;
  font-size: 1rem;
  font-weight: 300;
  transition: all 0.3s ease;
}
@media screen and (max-width: 700px) {
  .contactform--container input {
    width: unset;
  }
}
.contactform--container button {
  background-color: #e9a0a1;
  color: #fff;
  max-width: 20%;
  display: inline-block;
  min-height: 50px;
}

.fade-in {
  animation: fadeIn ease 1.2s;
  -webkit-animation: fadeIn ease 1.2s;
  -moz-animation: fadeIn ease 1.2s;
  -o-animation: fadeIn ease 1.2s;
  -ms-animation: fadeIn ease 1.2s;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-moz-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-webkit-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.u-margin-none--bt {
  margin-bottom: 0px;
}

.u-margin--top {
  margin-top: 15px;
}`;

  // js/questionnaire.ts
  var QuestionnaireElement = class extends s4 {
    constructor() {
      super();
      this.hubspotId = "40834387";
      this.addEventListener("click", this.openModal);
    }
    get topic() {
      return `questionnaires:${this.siteId}`;
    }
    connectedCallback() {
      super.connectedCallback();
      if (document.querySelector("script#hs-script-loader") === null) {
        const script = document.createElement("script");
        script.async = true;
        script.defer = true;
        script.id = "hs-script-loader";
        script.src = `//js.hs-scripts.com/${this.hubspotId}.js`;
        document.body.appendChild(script);
      }
    }
    render() {
      return x`
      <h2>Questionnaire</h2>
      <slot></slot>
      <dialog id="question-modal" class="questionnaire--modal">${this.renderCurrentStep()}</dialog>
    `;
    }
    renderCurrentStep() {
      switch (this.currentStep?.type) {
        case "Question":
          return this.renderQuestion();
        case "ContactInfo":
          return this.renderContactInfo();
        case "Video":
          return this.renderVideo();
      }
    }
    renderVideo() {
      return x`
    <div>${this.currentStep.text}</div>
    <vimeo-video controls src=${this.currentStep.url}></vimeo-video>
  `;
    }
    renderContactInfo() {
      return x`
    <form class="contactform--container">
    <h1 class="u-margin-none--bt">We think we can help.</h1>
    <h2>Enter your information below to get your assesment.</h2>
      <div class="u-margin--top">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required/>
      </div>
      <div>
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div>
        <label for="phone">Phone</label>
        <input type="tel" id="phone" name="phone" required/>
      </div>
      <button type="submit" @click=${this.submitContactInfo}>Submit</button>
    </form>
    `;
    }
    renderQuestion() {
      const question = this.currentStep;
      return x`
    <div class="questionnaire--header">
    <h1> ${this.questionnaireName} </h1>
    </div>
    <div class="questionnaire--question"> <h2>${question.text}</h2></div>
    <div class="questionnaire--bt-contain">
      <div class="questionnaire-illustration"><img src=${question.url}> </div>
      <div>
        ${question?.answers.map((answer) => x`
          <button class="button--primary fade-in fade-out" @click=${this.answerQuestion} data-answer-id=${answer.id}>${answer.text}</button>
        `)}
      </div>
    </div>
    `;
    }
    openModal() {
      this.modal?.showModal();
    }
    answerQuestion(event) {
      console.log(event);
      event.stopPropagation();
      this.dispatchEvent(new CustomEvent("answerQuestion", {
        detail: {
          answerId: event.target.dataset.answerId
        }
      }));
    }
    submitContactInfo(event) {
      event.preventDefault();
      event.stopPropagation();
      this.dispatchEvent(new CustomEvent("submitContactInfo", {
        detail: {
          nodeId: this.currentStep?.id,
          name: this.nameInput.value,
          email: this.emailInput.value,
          phone_number: this.phoneInput.value
        }
      }));
    }
  };
  QuestionnaireElement.styles = questionnaire_lit_default;
  __decorateClass([
    t3()
  ], QuestionnaireElement.prototype, "currentStep", 2);
  __decorateClass([
    t3()
  ], QuestionnaireElement.prototype, "questionnaireName", 2);
  __decorateClass([
    n5(),
    liveStateConfig("url")
  ], QuestionnaireElement.prototype, "url", 2);
  __decorateClass([
    n5({ attribute: "site-id" })
  ], QuestionnaireElement.prototype, "siteId", 2);
  __decorateClass([
    n5({ attribute: "hubspot-id" })
  ], QuestionnaireElement.prototype, "hubspotId", 2);
  __decorateClass([
    i4("#question-modal")
  ], QuestionnaireElement.prototype, "modal", 2);
  __decorateClass([
    i4("#name")
  ], QuestionnaireElement.prototype, "nameInput", 2);
  __decorateClass([
    i4("#email")
  ], QuestionnaireElement.prototype, "emailInput", 2);
  __decorateClass([
    i4("#phone")
  ], QuestionnaireElement.prototype, "phoneInput", 2);
  __decorateClass([
    liveStateConfig("topic")
  ], QuestionnaireElement.prototype, "topic", 1);
  QuestionnaireElement = __decorateClass([
    e4("pr360-questionnaire"),
    liveStateDecorator_default({
      properties: ["currentStep", "questionnaireName"],
      events: {
        send: ["answerQuestion", "submitContactInfo"]
      },
      provide: {
        scope: window,
        name: "questionnaireState"
      }
    })
  ], QuestionnaireElement);
})();
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/custom-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/property.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/state.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/base.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/event-options.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-all.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-async.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

reflect-metadata/Reflect.js:
  (*! *****************************************************************************
  Copyright (C) Microsoft. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0
  
  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.
  
  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** *)

@vimeo/player/dist/player.es.js:
  (*! @vimeo/player v2.18.0 | (c) 2022 Vimeo | MIT License | https://github.com/vimeo/player.js *)
  (*!
   * weakmap-polyfill v2.0.4 - ECMAScript6 WeakMap polyfill
   * https://github.com/polygonplanet/weakmap-polyfill
   * Copyright (c) 2015-2021 polygonplanet <polygon.planet.aqua@gmail.com>
   * @license MIT
   *)
  (*! Native Promise Only
      v0.8.1 (c) Kyle Simpson
      MIT License: http://getify.mit-license.org
  *)
*/
