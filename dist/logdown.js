!(function (t, e) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define([], e)
    : "object" == typeof exports
    ? (exports.logdown = e())
    : (t.logdown = e());
})(window, function () {
  return (function (t) {
    var e = {};
    function r(n) {
      if (e[n]) return e[n].exports;
      var o = (e[n] = { i: n, l: !1, exports: {} });
      return t[n].call(o.exports, o, o.exports, r), (o.l = !0), o.exports;
    }
    return (
      (r.m = t),
      (r.c = e),
      (r.d = function (t, e, n) {
        r.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: n });
      }),
      (r.r = function (t) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(t, "__esModule", { value: !0 });
      }),
      (r.t = function (t, e) {
        if ((1 & e && (t = r(t)), 8 & e)) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var n = Object.create(null);
        if (
          (r.r(n),
          Object.defineProperty(n, "default", { enumerable: !0, value: t }),
          2 & e && "string" != typeof t)
        )
          for (var o in t)
            r.d(
              n,
              o,
              function (e) {
                return t[e];
              }.bind(null, o)
            );
        return n;
      }),
      (r.n = function (t) {
        var e =
          t && t.__esModule
            ? function () {
                return t.default;
              }
            : function () {
                return t;
              };
        return r.d(e, "a", e), e;
      }),
      (r.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      }),
      (r.p = ""),
      r((r.s = 0))
    );
  })([
    function (t, e, r) {
      var n = r(1)(),
        o = r(3),
        i = r(5),
        s = r(8)();
      (n.prefixColors = [
        "#F2777A",
        "#F99157",
        "#FFCC66",
        "#99CC99",
        "#66CCCC",
        "#6699CC",
        "#CC99CC",
      ]),
        (n._setPrefixRegExps = function () {
          try {
            s.localStorage &&
              "string" == typeof s.localStorage.getItem("debug") &&
              ((n._prefixRegExps = []),
              s.localStorage
                .getItem("debug")
                .split(",")
                .forEach(function (t) {
                  var e = "enable";
                  "-" === (t = t.trim())[0] &&
                    ((t = t.substr(1)), (e = "disable"));
                  var r = n._prepareRegExpForPrefixSearch(t);
                  n._prefixRegExps.push({ type: e, regExp: r });
                }));
          } catch (t) {}
        }),
        (n._getNextPrefixColor = (function () {
          var t = 0;
          return function () {
            return (t += 1), n.prefixColors[t % n.prefixColors.length];
          };
        })()),
        (n.prototype._getDecoratedPrefix = function () {
          var t = [];
          return (
            i()
              ? (t.push("%c" + this.opts.prefix + "%c "),
                t.push(
                  "color:" + this.opts.prefixColor + "; font-weight:bold;",
                  ""
                ))
              : t.push("[" + this.opts.prefix + "] "),
            t
          );
        }),
        (n.prototype._prepareOutput = function (t) {
          var e,
            r = this._getDecoratedPrefix();
          return (
            "string" == typeof t[0]
              ? this.opts.markdown && i()
                ? ((e = o.parse(t[0])),
                  (r[0] = r[0] + e.text),
                  (r = r.concat(e.styles)))
                : (r[0] = r[0] + t[0])
              : r.push(t[0]),
            t.length > 1 && (r = r.concat(t.slice(1))),
            r
          );
        }),
        n._setPrefixRegExps(),
        (t.exports = n);
    },
    function (t, e, r) {
      var n = r(2);
      t.exports = function () {
        function t(e, r) {
          return this instanceof t
            ? t._isPrefixAlreadyInUse(e)
              ? t._getInstanceByPrefix(e)
              : ((this.opts = t._normalizeOpts(e, r)),
                (this.state = t._getInitialState(this.opts)),
                t._decorateLoggerMethods(this),
                t._instances.push(this),
                this)
            : new t(e, r);
        }
        return (
          (t.transports = []),
          (t._instances = []),
          (t._prefixRegExps = []),
          (t._prepareRegExpForPrefixSearch = function (t) {
            return new RegExp("^" + t.replace(/\*/g, ".*?") + "$");
          }),
          (t._isPrefixAlreadyInUse = function (e) {
            return t._instances.some(function (t) {
              return t.opts.prefix === e;
            });
          }),
          (t._getInstanceByPrefix = function (e) {
            return t._instances.filter(function (t) {
              return t.opts.prefix === e;
            })[0];
          }),
          (t._normalizeOpts = function (e, r) {
            if ("string" != typeof e)
              throw new TypeError("prefix must be a string");
            var n = void 0 === (r = r || {}).markdown || Boolean(r.markdown),
              o = r.prefixColor || t._getNextPrefixColor();
            return {
              logger: r.logger || console,
              markdown: n,
              plaintext: Boolean(r.plaintext),
              prefix: e,
              prefixColor: o,
            };
          }),
          (t._getInitialState = function (e) {
            return { isEnabled: t._getEnableState(e) };
          }),
          (t._getEnableState = function (e) {
            var r = !1;
            return (
              t._prefixRegExps.forEach(function (t) {
                "enable" === t.type && t.regExp.test(e.prefix)
                  ? (r = !0)
                  : "disable" === t.type && t.regExp.test(e.prefix) && (r = !1);
              }),
              r
            );
          }),
          (t._decorateLoggerMethods = function (e) {
            var r = e.opts.logger,
              o = Object.keys(r).filter(function (t) {
                return "function" == typeof r[t];
              });
            0 === o.length &&
              (o = ["trace", "debug", "log", "info", "warn", "error"]),
              o.forEach(function (p) {
                e[p] = function () {
                  var e = n(arguments),
                    i = this.opts.prefix;
                  if (t.transports.length) {
                    var s =
                      "[" +
                      i +
                      "] " +
                      e
                        .filter(function (t) {
                          return "object" != typeof t;
                        })
                        .join(" ");
                    t.transports.forEach(
                      function (t) {
                        t({
                          state: this.state,
                          instance: i,
                          level: p,
                          args: e,
                          msg: s,
                        });
                      }.bind(this)
                    );
                  }
                  if (this.state.isEnabled) {
                    if (o.indexOf(p) >= o.indexOf(this.state.loglevel)) {
                      var f = this._prepareOutput(e, p);
                      r[p].apply(r, f);
                    }
                  }
                };
              });
          }),
          t
        );
      };
    },
    function (t, e) {
      t.exports = function (t) {
        return Array.prototype.slice.call(t, 0);
      };
    },
    function (t, e, r) {
      var n = [];
      function o(t) {
        return function (e) {
          return n.push(t), n.push(""), "%c" + e + "%c";
        };
      }
      var i = new (r(4))({
        renderer: {
          "*": o("font-weight:bold;"),
          _: o("font-style:italic;"),
          "`": o(
            "background-color:rgba(255,204,102, 0.1);color:#FFCC66;padding:2px 5px;border-radius:2px;"
          ),
        },
      });
      t.exports = {
        parse: function (t) {
          var e = { text: i.parse(t), styles: [].concat(n) };
          return (n.length = 0), e;
        },
      };
    },
    function (t, e) {
      var r = /([_*`\\]|[^_*`\\]+)/g,
        n = /[_*`]/;
      function o(t) {
        this.renderer = t.renderer;
      }
      function i(t) {
        return n.test(t);
      }
      (o.prototype.parse = function (t) {
        if ("" === t) return "";
        var e,
          n,
          o,
          s = t.match(r),
          f = this.renderer,
          u = "",
          a = [],
          p = {},
          c = 0;
        function l(t) {
          for (var r = ""; e && e.tag !== t; )
            (r = e.tag + e.text + r), (p[e.tag] = !1), (e = a.pop());
          return r;
        }
        for (; (o = s[c]); ) {
          if (((n = ""), c++, i(o)))
            if (p[o])
              (n = l(o)),
                (n = f[e.tag](e.text + n)),
                (p[o] = !1),
                (e = a.pop());
            else {
              var g = "";
              if ("`" === o) {
                var x = s.indexOf(o, c);
                -1 !== x && ((u += l()), (g = s.slice(c, x).join("")), (c = x));
              }
              e && a.push(e), (p[o] = !0), (e = { tag: o, text: g });
            }
          else if (((n = o), "\\" === o)) {
            var d = s[c];
            (i(d) || "\\" === d) && ((n = d), c++);
          }
          n && (e ? (e.text += n) : (u += n), (n = ""));
        }
        return (u += l());
      }),
        (t.exports = o);
    },
    function (t, e, r) {
      var n = r(6),
        o = r(7);
      t.exports = function () {
        return n() || o();
      };
    },
    function (t, e) {
      t.exports = function () {
        try {
          return (
            "WebkitAppearance" in document.documentElement.style &&
            !/Edge/.test(navigator.userAgent)
          );
        } catch (t) {
          return !1;
        }
      };
    },
    function (t, e) {
      t.exports = function () {
        try {
          return /firefox\/(\d+)/i.test(navigator.userAgent);
        } catch (t) {
          return !1;
        }
      };
    },
    function (t, e, r) {
      (function (e) {
        function r(t, e) {
          return (
            ("object" == typeof t && t.self === t && t) ||
            ("object" == typeof e && e.global === e && e) ||
            this
          );
        }
        (t.exports = r.bind(this, self, e)), (t.exports.getGlobal = r);
      }.call(this, r(9)));
    },
    function (t, e) {
      var r;
      r = (function () {
        return this;
      })();
      try {
        r = r || Function("return this")() || (0, eval)("this");
      } catch (t) {
        "object" == typeof window && (r = window);
      }
      t.exports = r;
    },
  ]);
});
