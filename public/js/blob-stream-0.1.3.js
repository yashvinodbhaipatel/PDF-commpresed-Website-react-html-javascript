! function(e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
        var t;
        "undefined" != typeof window ? t = window : "undefined" != typeof global ? t = global : "undefined" != typeof self && (t = self), t.blobStream = e()
    }
}(function() {
    return function e(t, r, n) {
        function i(s, a) {
            if (!r[s]) {
                if (!t[s]) {
                    var u = "function" == typeof require && require;
                    if (!a && u) return u(s, !0);
                    if (o) return o(s, !0);
                    var f = new Error("Cannot find module '" + s + "'");
                    throw f.code = "MODULE_NOT_FOUND", f
                }
                var h = r[s] = {
                    exports: {}
                };
                t[s][0].call(h.exports, function(e) {
                    var r = t[s][1][e];
                    return i(r || e)
                }, h, h.exports, e, t, r, n)
            }
            return r[s].exports
        }
        for (var o = "function" == typeof require && require, s = 0; s < n.length; s++) i(n[s]);
        return i
    }({
        1: [function(e, t, r) {
            (function(e) {
                var r = e.BlobBuilder || e.WebKitBlobBuilder || e.MSBlobBuilder || e.MozBlobBuilder,
                    n = function() {
                        try {
                            return 2 === new Blob(["hi"]).size
                        } catch (e) {
                            return !1
                        }
                    }(),
                    i = n && function() {
                        try {
                            return 2 === new Blob([new Uint8Array([1, 2])]).size
                        } catch (e) {
                            return !1
                        }
                    }(),
                    o = r && r.prototype.append && r.prototype.getBlob;

                function s(e) {
                    for (var t = 0; t < e.length; t++) {
                        var r = e[t];
                        if (r.buffer instanceof ArrayBuffer) {
                            var n = r.buffer;
                            if (r.byteLength !== n.byteLength) {
                                var i = new Uint8Array(r.byteLength);
                                i.set(new Uint8Array(n, r.byteOffset, r.byteLength)), n = i.buffer
                            }
                            e[t] = n
                        }
                    }
                }

                function a(e, t) {
                    t = t || {};
                    var n = new r;
                    s(e);
                    for (var i = 0; i < e.length; i++) n.append(e[i]);
                    return t.type ? n.getBlob(t.type) : n.getBlob()
                }

                function u(e, t) {
                    return s(e), new Blob(e, t || {})
                }
                t.exports = n ? i ? e.Blob : u : o ? a : void 0
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}],
        2: [function(e, t, r) {
            (function(r) {
                var n = e("stream").Writable,
                    i = e("util"),
                    o = e("blob"),
                    s = r.URL || r.webkitURL || r.mozURL;

                function a() {
                    if (!(this instanceof a)) return new a;
                    n.call(this), this._chunks = [], this._blob = null, this.length = 0
                }
                i.inherits(a, n), a.prototype._write = function(e, t, r) {
                    e instanceof Uint8Array || (e = new Uint8Array(e)), this.length += e.length, this._chunks.push(e), r()
                }, a.prototype.toBlob = function(e) {
                    return e = e || "application/octet-stream", this._blob || (this._blob = new o(this._chunks, {
                        type: e
                    }), this._chunks = []), this._blob.type !== e && (this._blob = new o([this._blob], {
                        type: e
                    })), this._blob
                }, a.prototype.toBlobURL = function(e) {
                    return s.createObjectURL(this.toBlob(e))
                }, t.exports = a
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            blob: 1,
            stream: 22,
            util: 25
        }],
        3: [function(e, t, r) {
            var n = e("base64-js"),
                i = e("ieee754"),
                o = e("is-array");
            r.Buffer = a, r.SlowBuffer = a, r.INSPECT_MAX_BYTES = 50, a.poolSize = 8192;
            var s = 1073741823;

            function a(e, t, r) {
                if (!(this instanceof a)) return new a(e, t, r);
                var n, i, u, f = typeof e;
                if ("number" === f) n = e > 0 ? e >>> 0 : 0;
                else if ("string" === f) "base64" === t && (e = function(e) {
                    e = function(e) {
                        return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
                    }(e).replace(S, "");
                    for (; e.length % 4 != 0;) e += "=";
                    return e
                }(e)), n = a.byteLength(e, t);
                else {
                    if ("object" !== f || null === e) throw new TypeError("must start with number, buffer, array or string");
                    "Buffer" === e.type && o(e.data) && (e = e.data), n = +e.length > 0 ? Math.floor(+e.length) : 0
                }
                if (this.length > s) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + s.toString(16) + " bytes");
                if (a.TYPED_ARRAY_SUPPORT ? i = a._augment(new Uint8Array(n)) : ((i = this).length = n, i._isBuffer = !0), a.TYPED_ARRAY_SUPPORT && "number" == typeof e.byteLength) i._set(e);
                else if (function(e) {
                        return o(e) || a.isBuffer(e) || e && "object" == typeof e && "number" == typeof e.length
                    }(e))
                    if (a.isBuffer(e))
                        for (u = 0; u < n; u++) i[u] = e.readUInt8(u);
                    else
                        for (u = 0; u < n; u++) i[u] = (e[u] % 256 + 256) % 256;
                else if ("string" === f) i.write(e, 0, t);
                else if ("number" === f && !a.TYPED_ARRAY_SUPPORT && !r)
                    for (u = 0; u < n; u++) i[u] = 0;
                return i
            }

            function u(e, t, r, n) {
                return R(function(e) {
                    for (var t = [], r = 0; r < e.length; r++) t.push(255 & e.charCodeAt(r));
                    return t
                }(t), e, r, n)
            }

            function f(e, t, r) {
                return 0 === t && r === e.length ? n.fromByteArray(e) : n.fromByteArray(e.slice(t, r))
            }

            function h(e, t, r) {
                var n = "",
                    i = "";
                r = Math.min(e.length, r);
                for (var o = t; o < r; o++) e[o] <= 127 ? (n += x(i) + String.fromCharCode(e[o]), i = "") : i += "%" + e[o].toString(16);
                return n + x(i)
            }

            function c(e, t, r) {
                var n = "";
                r = Math.min(e.length, r);
                for (var i = t; i < r; i++) n += String.fromCharCode(e[i]);
                return n
            }

            function l(e, t, r) {
                return c(e, t, r)
            }

            function d(e, t, r) {
                var n = e.length;
                (!t || t < 0) && (t = 0), (!r || r < 0 || r > n) && (r = n);
                for (var i = "", o = t; o < r; o++) i += L(e[o]);
                return i
            }

            function p(e, t, r) {
                for (var n = e.slice(t, r), i = "", o = 0; o < n.length; o += 2) i += String.fromCharCode(n[o] + 256 * n[o + 1]);
                return i
            }

            function g(e, t, r) {
                if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
                if (e + t > r) throw new RangeError("Trying to access beyond buffer length")
            }

            function b(e, t, r, n, i, o) {
                if (!a.isBuffer(e)) throw new TypeError("buffer must be a Buffer instance");
                if (t > i || t < o) throw new TypeError("value is out of bounds");
                if (r + n > e.length) throw new TypeError("index out of range")
            }

            function y(e, t, r, n) {
                t < 0 && (t = 65535 + t + 1);
                for (var i = 0, o = Math.min(e.length - r, 2); i < o; i++) e[r + i] = (t & 255 << 8 * (n ? i : 1 - i)) >>> 8 * (n ? i : 1 - i)
            }

            function w(e, t, r, n) {
                t < 0 && (t = 4294967295 + t + 1);
                for (var i = 0, o = Math.min(e.length - r, 4); i < o; i++) e[r + i] = t >>> 8 * (n ? i : 3 - i) & 255
            }

            function v(e, t, r, n, i, o) {
                if (t > i || t < o) throw new TypeError("value is out of bounds");
                if (r + n > e.length) throw new TypeError("index out of range")
            }

            function m(e, t, r, n, o) {
                return o || v(e, t, r, 4, 34028234663852886e22, -34028234663852886e22), i.write(e, t, r, n, 23, 4), r + 4
            }

            function _(e, t, r, n, o) {
                return o || v(e, t, r, 8, 17976931348623157e292, -17976931348623157e292), i.write(e, t, r, n, 52, 8), r + 8
            }
            a.TYPED_ARRAY_SUPPORT = function() {
                try {
                    var e = new ArrayBuffer(0),
                        t = new Uint8Array(e);
                    return t.foo = function() {
                        return 42
                    }, 42 === t.foo() && "function" == typeof t.subarray && 0 === new Uint8Array(1).subarray(1, 1).byteLength
                } catch (e) {
                    return !1
                }
            }(), a.isBuffer = function(e) {
                return !(null == e || !e._isBuffer)
            }, a.compare = function(e, t) {
                if (!a.isBuffer(e) || !a.isBuffer(t)) throw new TypeError("Arguments must be Buffers");
                for (var r = e.length, n = t.length, i = 0, o = Math.min(r, n); i < o && e[i] === t[i]; i++);
                return i !== o && (r = e[i], n = t[i]), r < n ? -1 : n < r ? 1 : 0
            }, a.isEncoding = function(e) {
                switch (String(e).toLowerCase()) {
                    case "hex":
                    case "utf8":
                    case "utf-8":
                    case "ascii":
                    case "binary":
                    case "base64":
                    case "raw":
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return !0;
                    default:
                        return !1
                }
            }, a.concat = function(e, t) {
                if (!o(e)) throw new TypeError("Usage: Buffer.concat(list[, length])");
                if (0 === e.length) return new a(0);
                if (1 === e.length) return e[0];
                var r;
                if (void 0 === t)
                    for (t = 0, r = 0; r < e.length; r++) t += e[r].length;
                var n = new a(t),
                    i = 0;
                for (r = 0; r < e.length; r++) {
                    var s = e[r];
                    s.copy(n, i), i += s.length
                }
                return n
            }, a.byteLength = function(e, t) {
                var r;
                switch (e += "", t || "utf8") {
                    case "ascii":
                    case "binary":
                    case "raw":
                        r = e.length;
                        break;
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        r = 2 * e.length;
                        break;
                    case "hex":
                        r = e.length >>> 1;
                        break;
                    case "utf8":
                    case "utf-8":
                        r = A(e).length;
                        break;
                    case "base64":
                        r = B(e).length;
                        break;
                    default:
                        r = e.length
                }
                return r
            }, a.prototype.length = void 0, a.prototype.parent = void 0, a.prototype.toString = function(e, t, r) {
                var n = !1;
                if (e || (e = "utf8"), (t >>>= 0) < 0 && (t = 0), (r = void 0 === r || r === 1 / 0 ? this.length : r >>> 0) > this.length && (r = this.length), r <= t) return "";
                for (;;) switch (e) {
                    case "hex":
                        return d(this, t, r);
                    case "utf8":
                    case "utf-8":
                        return h(this, t, r);
                    case "ascii":
                        return c(this, t, r);
                    case "binary":
                        return l(this, t, r);
                    case "base64":
                        return f(this, t, r);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return p(this, t, r);
                    default:
                        if (n) throw new TypeError("Unknown encoding: " + e);
                        e = (e + "").toLowerCase(), n = !0
                }
            }, a.prototype.equals = function(e) {
                if (!a.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
                return 0 === a.compare(this, e)
            }, a.prototype.inspect = function() {
                var e = "",
                    t = r.INSPECT_MAX_BYTES;
                return this.length > 0 && (e = this.toString("hex", 0, t).match(/.{2}/g).join(" "), this.length > t && (e += " ... ")), "<Buffer " + e + ">"
            }, a.prototype.compare = function(e) {
                if (!a.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
                return a.compare(this, e)
            }, a.prototype.get = function(e) {
                return console.log(".get() is deprecated. Access using array indexes instead."), this.readUInt8(e)
            }, a.prototype.set = function(e, t) {
                return console.log(".set() is deprecated. Access using array indexes instead."), this.writeUInt8(e, t)
            }, a.prototype.write = function(e, t, r, n) {
                if (isFinite(t)) isFinite(r) || (n = r, r = void 0);
                else {
                    var i = n;
                    n = t, t = r, r = i
                }
                t = Number(t) || 0;
                var o, s = this.length - t;
                switch (r ? (r = Number(r)) > s && (r = s) : r = s, n = String(n || "utf8").toLowerCase()) {
                    case "hex":
                        o = function(e, t, r, n) {
                            r = Number(r) || 0;
                            var i = e.length - r;
                            n ? (n = Number(n)) > i && (n = i) : n = i;
                            var o = t.length;
                            if (o % 2 != 0) throw new Error("Invalid hex string");
                            n > o / 2 && (n = o / 2);
                            for (var s = 0; s < n; s++) {
                                var a = parseInt(t.substr(2 * s, 2), 16);
                                if (isNaN(a)) throw new Error("Invalid hex string");
                                e[r + s] = a
                            }
                            return s
                        }(this, e, t, r);
                        break;
                    case "utf8":
                    case "utf-8":
                        o = function(e, t, r, n) {
                            return R(A(t), e, r, n)
                        }(this, e, t, r);
                        break;
                    case "ascii":
                        o = u(this, e, t, r);
                        break;
                    case "binary":
                        o = function(e, t, r, n) {
                            return u(e, t, r, n)
                        }(this, e, t, r);
                        break;
                    case "base64":
                        o = function(e, t, r, n) {
                            return R(B(t), e, r, n)
                        }(this, e, t, r);
                        break;
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        o = function(e, t, r, n) {
                            return R(function(e) {
                                for (var t, r, n, i = [], o = 0; o < e.length; o++) t = e.charCodeAt(o), r = t >> 8, n = t % 256, i.push(n), i.push(r);
                                return i
                            }(t), e, r, n)
                        }(this, e, t, r);
                        break;
                    default:
                        throw new TypeError("Unknown encoding: " + n)
                }
                return o
            }, a.prototype.toJSON = function() {
                return {
                    type: "Buffer",
                    data: Array.prototype.slice.call(this._arr || this, 0)
                }
            }, a.prototype.slice = function(e, t) {
                var r = this.length;
                if ((e = ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), (t = void 0 === t ? r : ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), t < e && (t = e), a.TYPED_ARRAY_SUPPORT) return a._augment(this.subarray(e, t));
                for (var n = t - e, i = new a(n, void 0, !0), o = 0; o < n; o++) i[o] = this[o + e];
                return i
            }, a.prototype.readUInt8 = function(e, t) {
                return t || g(e, 1, this.length), this[e]
            }, a.prototype.readUInt16LE = function(e, t) {
                return t || g(e, 2, this.length), this[e] | this[e + 1] << 8
            }, a.prototype.readUInt16BE = function(e, t) {
                return t || g(e, 2, this.length), this[e] << 8 | this[e + 1]
            }, a.prototype.readUInt32LE = function(e, t) {
                return t || g(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
            }, a.prototype.readUInt32BE = function(e, t) {
                return t || g(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
            }, a.prototype.readInt8 = function(e, t) {
                return t || g(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
            }, a.prototype.readInt16LE = function(e, t) {
                t || g(e, 2, this.length);
                var r = this[e] | this[e + 1] << 8;
                return 32768 & r ? 4294901760 | r : r
            }, a.prototype.readInt16BE = function(e, t) {
                t || g(e, 2, this.length);
                var r = this[e + 1] | this[e] << 8;
                return 32768 & r ? 4294901760 | r : r
            }, a.prototype.readInt32LE = function(e, t) {
                return t || g(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
            }, a.prototype.readInt32BE = function(e, t) {
                return t || g(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
            }, a.prototype.readFloatLE = function(e, t) {
                return t || g(e, 4, this.length), i.read(this, e, !0, 23, 4)
            }, a.prototype.readFloatBE = function(e, t) {
                return t || g(e, 4, this.length), i.read(this, e, !1, 23, 4)
            }, a.prototype.readDoubleLE = function(e, t) {
                return t || g(e, 8, this.length), i.read(this, e, !0, 52, 8)
            }, a.prototype.readDoubleBE = function(e, t) {
                return t || g(e, 8, this.length), i.read(this, e, !1, 52, 8)
            }, a.prototype.writeUInt8 = function(e, t, r) {
                return e = +e, t >>>= 0, r || b(this, e, t, 1, 255, 0), a.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), this[t] = e, t + 1
            }, a.prototype.writeUInt16LE = function(e, t, r) {
                return e = +e, t >>>= 0, r || b(this, e, t, 2, 65535, 0), a.TYPED_ARRAY_SUPPORT ? (this[t] = e, this[t + 1] = e >>> 8) : y(this, e, t, !0), t + 2
            }, a.prototype.writeUInt16BE = function(e, t, r) {
                return e = +e, t >>>= 0, r || b(this, e, t, 2, 65535, 0), a.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = e) : y(this, e, t, !1), t + 2
            }, a.prototype.writeUInt32LE = function(e, t, r) {
                return e = +e, t >>>= 0, r || b(this, e, t, 4, 4294967295, 0), a.TYPED_ARRAY_SUPPORT ? (this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = e) : w(this, e, t, !0), t + 4
            }, a.prototype.writeUInt32BE = function(e, t, r) {
                return e = +e, t >>>= 0, r || b(this, e, t, 4, 4294967295, 0), a.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = e) : w(this, e, t, !1), t + 4
            }, a.prototype.writeInt8 = function(e, t, r) {
                return e = +e, t >>>= 0, r || b(this, e, t, 1, 127, -128), a.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), e < 0 && (e = 255 + e + 1), this[t] = e, t + 1
            }, a.prototype.writeInt16LE = function(e, t, r) {
                return e = +e, t >>>= 0, r || b(this, e, t, 2, 32767, -32768), a.TYPED_ARRAY_SUPPORT ? (this[t] = e, this[t + 1] = e >>> 8) : y(this, e, t, !0), t + 2
            }, a.prototype.writeInt16BE = function(e, t, r) {
                return e = +e, t >>>= 0, r || b(this, e, t, 2, 32767, -32768), a.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = e) : y(this, e, t, !1), t + 2
            }, a.prototype.writeInt32LE = function(e, t, r) {
                return e = +e, t >>>= 0, r || b(this, e, t, 4, 2147483647, -2147483648), a.TYPED_ARRAY_SUPPORT ? (this[t] = e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24) : w(this, e, t, !0), t + 4
            }, a.prototype.writeInt32BE = function(e, t, r) {
                return e = +e, t >>>= 0, r || b(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), a.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = e) : w(this, e, t, !1), t + 4
            }, a.prototype.writeFloatLE = function(e, t, r) {
                return m(this, e, t, !0, r)
            }, a.prototype.writeFloatBE = function(e, t, r) {
                return m(this, e, t, !1, r)
            }, a.prototype.writeDoubleLE = function(e, t, r) {
                return _(this, e, t, !0, r)
            }, a.prototype.writeDoubleBE = function(e, t, r) {
                return _(this, e, t, !1, r)
            }, a.prototype.copy = function(e, t, r, n) {
                if (r || (r = 0), n || 0 === n || (n = this.length), t || (t = 0), n !== r && 0 !== e.length && 0 !== this.length) {
                    if (n < r) throw new TypeError("sourceEnd < sourceStart");
                    if (t < 0 || t >= e.length) throw new TypeError("targetStart out of bounds");
                    if (r < 0 || r >= this.length) throw new TypeError("sourceStart out of bounds");
                    if (n < 0 || n > this.length) throw new TypeError("sourceEnd out of bounds");
                    n > this.length && (n = this.length), e.length - t < n - r && (n = e.length - t + r);
                    var i = n - r;
                    if (i < 1e3 || !a.TYPED_ARRAY_SUPPORT)
                        for (var o = 0; o < i; o++) e[o + t] = this[o + r];
                    else e._set(this.subarray(r, r + i), t)
                }
            }, a.prototype.fill = function(e, t, r) {
                if (e || (e = 0), t || (t = 0), r || (r = this.length), r < t) throw new TypeError("end < start");
                if (r !== t && 0 !== this.length) {
                    if (t < 0 || t >= this.length) throw new TypeError("start out of bounds");
                    if (r < 0 || r > this.length) throw new TypeError("end out of bounds");
                    var n;
                    if ("number" == typeof e)
                        for (n = t; n < r; n++) this[n] = e;
                    else {
                        var i = A(e.toString()),
                            o = i.length;
                        for (n = t; n < r; n++) this[n] = i[n % o]
                    }
                    return this
                }
            }, a.prototype.toArrayBuffer = function() {
                if ("undefined" != typeof Uint8Array) {
                    if (a.TYPED_ARRAY_SUPPORT) return new a(this).buffer;
                    for (var e = new Uint8Array(this.length), t = 0, r = e.length; t < r; t += 1) e[t] = this[t];
                    return e.buffer
                }
                throw new TypeError("Buffer.toArrayBuffer not supported in this browser")
            };
            var E = a.prototype;
            a._augment = function(e) {
                return e.constructor = a, e._isBuffer = !0, e._get = e.get, e._set = e.set, e.get = E.get, e.set = E.set, e.write = E.write, e.toString = E.toString, e.toLocaleString = E.toString, e.toJSON = E.toJSON, e.equals = E.equals, e.compare = E.compare, e.copy = E.copy, e.slice = E.slice, e.readUInt8 = E.readUInt8, e.readUInt16LE = E.readUInt16LE, e.readUInt16BE = E.readUInt16BE, e.readUInt32LE = E.readUInt32LE, e.readUInt32BE = E.readUInt32BE, e.readInt8 = E.readInt8, e.readInt16LE = E.readInt16LE, e.readInt16BE = E.readInt16BE, e.readInt32LE = E.readInt32LE, e.readInt32BE = E.readInt32BE, e.readFloatLE = E.readFloatLE, e.readFloatBE = E.readFloatBE, e.readDoubleLE = E.readDoubleLE, e.readDoubleBE = E.readDoubleBE, e.writeUInt8 = E.writeUInt8, e.writeUInt16LE = E.writeUInt16LE, e.writeUInt16BE = E.writeUInt16BE, e.writeUInt32LE = E.writeUInt32LE, e.writeUInt32BE = E.writeUInt32BE, e.writeInt8 = E.writeInt8, e.writeInt16LE = E.writeInt16LE, e.writeInt16BE = E.writeInt16BE, e.writeInt32LE = E.writeInt32LE, e.writeInt32BE = E.writeInt32BE, e.writeFloatLE = E.writeFloatLE, e.writeFloatBE = E.writeFloatBE, e.writeDoubleLE = E.writeDoubleLE, e.writeDoubleBE = E.writeDoubleBE, e.fill = E.fill, e.inspect = E.inspect, e.toArrayBuffer = E.toArrayBuffer, e
            };
            var S = /[^+\/0-9A-z]/g;

            function L(e) {
                return e < 16 ? "0" + e.toString(16) : e.toString(16)
            }

            function A(e) {
                for (var t = [], r = 0; r < e.length; r++) {
                    var n = e.charCodeAt(r);
                    if (n <= 127) t.push(n);
                    else {
                        var i = r;
                        n >= 55296 && n <= 57343 && r++;
                        for (var o = encodeURIComponent(e.slice(i, r + 1)).substr(1).split("%"), s = 0; s < o.length; s++) t.push(parseInt(o[s], 16))
                    }
                }
                return t
            }

            function B(e) {
                return n.toByteArray(e)
            }

            function R(e, t, r, n) {
                for (var i = 0; i < n && !(i + r >= t.length || i >= e.length); i++) t[i + r] = e[i];
                return i
            }

            function x(e) {
                try {
                    return decodeURIComponent(e)
                } catch (e) {
                    return String.fromCharCode(65533)
                }
            }
        }, {
            "base64-js": 4,
            ieee754: 5,
            "is-array": 6
        }],
        4: [function(e, t, r) {
            var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            ! function(e) {
                "use strict";
                var t = "undefined" != typeof Uint8Array ? Uint8Array : Array,
                    r = "+".charCodeAt(0),
                    i = "/".charCodeAt(0),
                    o = "0".charCodeAt(0),
                    s = "a".charCodeAt(0),
                    a = "A".charCodeAt(0);

                function u(e) {
                    var t = e.charCodeAt(0);
                    return t === r ? 62 : t === i ? 63 : t < o ? -1 : t < o + 10 ? t - o + 26 + 26 : t < a + 26 ? t - a : t < s + 26 ? t - s + 26 : void 0
                }
                e.toByteArray = function(e) {
                    var r, n, i, o, s, a;
                    if (e.length % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
                    var f = e.length;
                    s = "=" === e.charAt(f - 2) ? 2 : "=" === e.charAt(f - 1) ? 1 : 0, a = new t(3 * e.length / 4 - s), i = s > 0 ? e.length - 4 : e.length;
                    var h = 0;

                    function c(e) {
                        a[h++] = e
                    }
                    for (r = 0, n = 0; r < i; r += 4, n += 3) c((16711680 & (o = u(e.charAt(r)) << 18 | u(e.charAt(r + 1)) << 12 | u(e.charAt(r + 2)) << 6 | u(e.charAt(r + 3)))) >> 16), c((65280 & o) >> 8), c(255 & o);
                    return 2 === s ? c(255 & (o = u(e.charAt(r)) << 2 | u(e.charAt(r + 1)) >> 4)) : 1 === s && (c((o = u(e.charAt(r)) << 10 | u(e.charAt(r + 1)) << 4 | u(e.charAt(r + 2)) >> 2) >> 8 & 255), c(255 & o)), a
                }, e.fromByteArray = function(e) {
                    var t, r, i, o, s = e.length % 3,
                        a = "";

                    function u(e) {
                        return n.charAt(e)
                    }
                    for (t = 0, i = e.length - s; t < i; t += 3) r = (e[t] << 16) + (e[t + 1] << 8) + e[t + 2], a += u((o = r) >> 18 & 63) + u(o >> 12 & 63) + u(o >> 6 & 63) + u(63 & o);
                    switch (s) {
                        case 1:
                            a += u((r = e[e.length - 1]) >> 2), a += u(r << 4 & 63), a += "==";
                            break;
                        case 2:
                            a += u((r = (e[e.length - 2] << 8) + e[e.length - 1]) >> 10), a += u(r >> 4 & 63), a += u(r << 2 & 63), a += "="
                    }
                    return a
                }
            }(void 0 === r ? this.base64js = {} : r)
        }, {}],
        5: [function(e, t, r) {
            r.read = function(e, t, r, n, i) {
                var o, s, a = 8 * i - n - 1,
                    u = (1 << a) - 1,
                    f = u >> 1,
                    h = -7,
                    c = r ? i - 1 : 0,
                    l = r ? -1 : 1,
                    d = e[t + c];
                for (c += l, o = d & (1 << -h) - 1, d >>= -h, h += a; h > 0; o = 256 * o + e[t + c], c += l, h -= 8);
                for (s = o & (1 << -h) - 1, o >>= -h, h += n; h > 0; s = 256 * s + e[t + c], c += l, h -= 8);
                if (0 === o) o = 1 - f;
                else {
                    if (o === u) return s ? NaN : 1 / 0 * (d ? -1 : 1);
                    s += Math.pow(2, n), o -= f
                }
                return (d ? -1 : 1) * s * Math.pow(2, o - n)
            }, r.write = function(e, t, r, n, i, o) {
                var s, a, u, f = 8 * o - i - 1,
                    h = (1 << f) - 1,
                    c = h >> 1,
                    l = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                    d = n ? 0 : o - 1,
                    p = n ? 1 : -1,
                    g = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
                for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (a = isNaN(t) ? 1 : 0, s = h) : (s = Math.floor(Math.log(t) / Math.LN2), t * (u = Math.pow(2, -s)) < 1 && (s--, u *= 2), (t += s + c >= 1 ? l / u : l * Math.pow(2, 1 - c)) * u >= 2 && (s++, u /= 2), s + c >= h ? (a = 0, s = h) : s + c >= 1 ? (a = (t * u - 1) * Math.pow(2, i), s += c) : (a = t * Math.pow(2, c - 1) * Math.pow(2, i), s = 0)); i >= 8; e[r + d] = 255 & a, d += p, a /= 256, i -= 8);
                for (s = s << i | a, f += i; f > 0; e[r + d] = 255 & s, d += p, s /= 256, f -= 8);
                e[r + d - p] |= 128 * g
            }
        }, {}],
        6: [function(e, t, r) {
            var n = Array.isArray,
                i = Object.prototype.toString;
            t.exports = n || function(e) {
                return !!e && "[object Array]" == i.call(e)
            }
        }, {}],
        7: [function(e, t, r) {
            function n() {
                this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
            }

            function i(e) {
                return "function" == typeof e
            }

            function o(e) {
                return "object" == typeof e && null !== e
            }

            function s(e) {
                return void 0 === e
            }
            t.exports = n, n.EventEmitter = n, n.prototype._events = void 0, n.prototype._maxListeners = void 0, n.defaultMaxListeners = 10, n.prototype.setMaxListeners = function(e) {
                if ("number" != typeof e || e < 0 || isNaN(e)) throw TypeError("n must be a positive number");
                return this._maxListeners = e, this
            }, n.prototype.emit = function(e) {
                var t, r, n, a, u, f;
                if (this._events || (this._events = {}), "error" === e && (!this._events.error || o(this._events.error) && !this._events.error.length)) {
                    if ((t = arguments[1]) instanceof Error) throw t;
                    throw TypeError('Uncaught, unspecified "error" event.')
                }
                if (s(r = this._events[e])) return !1;
                if (i(r)) switch (arguments.length) {
                    case 1:
                        r.call(this);
                        break;
                    case 2:
                        r.call(this, arguments[1]);
                        break;
                    case 3:
                        r.call(this, arguments[1], arguments[2]);
                        break;
                    default:
                        for (n = arguments.length, a = new Array(n - 1), u = 1; u < n; u++) a[u - 1] = arguments[u];
                        r.apply(this, a)
                } else if (o(r)) {
                    for (n = arguments.length, a = new Array(n - 1), u = 1; u < n; u++) a[u - 1] = arguments[u];
                    for (n = (f = r.slice()).length, u = 0; u < n; u++) f[u].apply(this, a)
                } return !0
            }, n.prototype.addListener = function(e, t) {
                var r;
                if (!i(t)) throw TypeError("listener must be a function");
                (this._events || (this._events = {}), this._events.newListener && this.emit("newListener", e, i(t.listener) ? t.listener : t), this._events[e] ? o(this._events[e]) ? this._events[e].push(t) : this._events[e] = [this._events[e], t] : this._events[e] = t, o(this._events[e]) && !this._events[e].warned) && ((r = s(this._maxListeners) ? n.defaultMaxListeners : this._maxListeners) && r > 0 && this._events[e].length > r && (this._events[e].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length), "function" == typeof console.trace && console.trace()));
                return this
            }, n.prototype.on = n.prototype.addListener, n.prototype.once = function(e, t) {
                if (!i(t)) throw TypeError("listener must be a function");
                var r = !1;

                function n() {
                    this.removeListener(e, n), r || (r = !0, t.apply(this, arguments))
                }
                return n.listener = t, this.on(e, n), this
            }, n.prototype.removeListener = function(e, t) {
                var r, n, s, a;
                if (!i(t)) throw TypeError("listener must be a function");
                if (!this._events || !this._events[e]) return this;
                if (s = (r = this._events[e]).length, n = -1, r === t || i(r.listener) && r.listener === t) delete this._events[e], this._events.removeListener && this.emit("removeListener", e, t);
                else if (o(r)) {
                    for (a = s; a-- > 0;)
                        if (r[a] === t || r[a].listener && r[a].listener === t) {
                            n = a;
                            break
                        } if (n < 0) return this;
                    1 === r.length ? (r.length = 0, delete this._events[e]) : r.splice(n, 1), this._events.removeListener && this.emit("removeListener", e, t)
                }
                return this
            }, n.prototype.removeAllListeners = function(e) {
                var t, r;
                if (!this._events) return this;
                if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[e] && delete this._events[e], this;
                if (0 === arguments.length) {
                    for (t in this._events) "removeListener" !== t && this.removeAllListeners(t);
                    return this.removeAllListeners("removeListener"), this._events = {}, this
                }
                if (i(r = this._events[e])) this.removeListener(e, r);
                else
                    for (; r.length;) this.removeListener(e, r[r.length - 1]);
                return delete this._events[e], this
            }, n.prototype.listeners = function(e) {
                return this._events && this._events[e] ? i(this._events[e]) ? [this._events[e]] : this._events[e].slice() : []
            }, n.listenerCount = function(e, t) {
                return e._events && e._events[t] ? i(e._events[t]) ? 1 : e._events[t].length : 0
            }
        }, {}],
        8: [function(e, t, r) {
            "function" == typeof Object.create ? t.exports = function(e, t) {
                e.super_ = t, e.prototype = Object.create(t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                })
            } : t.exports = function(e, t) {
                e.super_ = t;
                var r = function() {};
                r.prototype = t.prototype, e.prototype = new r, e.prototype.constructor = e
            }
        }, {}],
        9: [function(e, t, r) {
            t.exports = Array.isArray || function(e) {
                return "[object Array]" == Object.prototype.toString.call(e)
            }
        }, {}],
        10: [function(e, t, r) {
            var n = t.exports = {};

            function i() {}
            n.nextTick = function() {
                var e = "undefined" != typeof window && window.setImmediate,
                    t = "undefined" != typeof window && window.MutationObserver,
                    r = "undefined" != typeof window && window.postMessage && window.addEventListener;
                if (e) return function(e) {
                    return window.setImmediate(e)
                };
                var n = [];
                if (t) {
                    var i = document.createElement("div");
                    return new MutationObserver(function() {
                            var e = n.slice();
                            n.length = 0, e.forEach(function(e) {
                                e()
                            })
                        }).observe(i, {
                            attributes: !0
                        }),
                        function(e) {
                            n.length || i.setAttribute("yes", "no"), n.push(e)
                        }
                }
                return r ? (window.addEventListener("message", function(e) {
                    var t = e.source;
                    t !== window && null !== t || "process-tick" !== e.data || (e.stopPropagation(), n.length > 0 && n.shift()())
                }, !0), function(e) {
                    n.push(e), window.postMessage("process-tick", "*")
                }) : function(e) {
                    setTimeout(e, 0)
                }
            }(), n.title = "browser", n.browser = !0, n.env = {}, n.argv = [], n.on = i, n.addListener = i, n.once = i, n.off = i, n.removeListener = i, n.removeAllListeners = i, n.emit = i, n.binding = function(e) {
                throw new Error("process.binding is not supported")
            }, n.cwd = function() {
                return "/"
            }, n.chdir = function(e) {
                throw new Error("process.chdir is not supported")
            }
        }, {}],
        11: [function(e, t, r) {
            t.exports = e("./lib/_stream_duplex.js")
        }, {
            "./lib/_stream_duplex.js": 12
        }],
        12: [function(e, t, r) {
            (function(r) {
                t.exports = a;
                var n = Object.keys || function(e) {
                        var t = [];
                        for (var r in e) t.push(r);
                        return t
                    },
                    i = e("core-util-is");
                i.inherits = e("inherits");
                var o = e("./_stream_readable"),
                    s = e("./_stream_writable");

                function a(e) {
                    if (!(this instanceof a)) return new a(e);
                    o.call(this, e), s.call(this, e), e && !1 === e.readable && (this.readable = !1), e && !1 === e.writable && (this.writable = !1), this.allowHalfOpen = !0, e && !1 === e.allowHalfOpen && (this.allowHalfOpen = !1), this.once("end", u)
                }

                function u() {
                    this.allowHalfOpen || this._writableState.ended || r.nextTick(this.end.bind(this))
                }
                i.inherits(a, o),
                    function(e, t) {
                        for (var r = 0, n = e.length; r < n; r++) t(e[r], r)
                    }(n(s.prototype), function(e) {
                        a.prototype[e] || (a.prototype[e] = s.prototype[e])
                    })
            }).call(this, e("_process"))
        }, {
            "./_stream_readable": 14,
            "./_stream_writable": 16,
            _process: 10,
            "core-util-is": 17,
            inherits: 8
        }],
        13: [function(e, t, r) {
            t.exports = o;
            var n = e("./_stream_transform"),
                i = e("core-util-is");

            function o(e) {
                if (!(this instanceof o)) return new o(e);
                n.call(this, e)
            }
            i.inherits = e("inherits"), i.inherits(o, n), o.prototype._transform = function(e, t, r) {
                r(null, e)
            }
        }, {
            "./_stream_transform": 15,
            "core-util-is": 17,
            inherits: 8
        }],
        14: [function(e, t, r) {
            (function(r) {
                t.exports = h;
                var n = e("isarray"),
                    i = e("buffer").Buffer;
                h.ReadableState = f;
                var o = e("events").EventEmitter;
                o.listenerCount || (o.listenerCount = function(e, t) {
                    return e.listeners(t).length
                });
                var s, a = e("stream"),
                    u = e("core-util-is");

                function f(t, r) {
                    var n = (t = t || {}).highWaterMark;
                    this.highWaterMark = n || 0 === n ? n : 16384, this.highWaterMark = ~~this.highWaterMark, this.buffer = [], this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = !1, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.calledRead = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.objectMode = !!t.objectMode, this.defaultEncoding = t.defaultEncoding || "utf8", this.ranOut = !1, this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, t.encoding && (s || (s = e("string_decoder/").StringDecoder), this.decoder = new s(t.encoding), this.encoding = t.encoding)
                }

                function h(e) {
                    if (!(this instanceof h)) return new h(e);
                    this._readableState = new f(e, this), this.readable = !0, a.call(this)
                }

                function c(e, t, n, o, s) {
                    var a = function(e, t) {
                        var r = null;
                        i.isBuffer(t) || "string" == typeof t || null == t || e.objectMode || (r = new TypeError("Invalid non-string/buffer chunk"));
                        return r
                    }(t, n);
                    if (a) e.emit("error", a);
                    else if (null == n) t.reading = !1, t.ended || function(e, t) {
                        if (t.decoder && !t.ended) {
                            var r = t.decoder.end();
                            r && r.length && (t.buffer.push(r), t.length += t.objectMode ? 1 : r.length)
                        }
                        t.ended = !0, t.length > 0 ? p(e) : m(e)
                    }(e, t);
                    else if (t.objectMode || n && n.length > 0)
                        if (t.ended && !s) {
                            var u = new Error("stream.push() after EOF");
                            e.emit("error", u)
                        } else if (t.endEmitted && s) {
                        u = new Error("stream.unshift() after end event");
                        e.emit("error", u)
                    } else !t.decoder || s || o || (n = t.decoder.write(n)), t.length += t.objectMode ? 1 : n.length, s ? t.buffer.unshift(n) : (t.reading = !1, t.buffer.push(n)), t.needReadable && p(e),
                        function(e, t) {
                            t.readingMore || (t.readingMore = !0, r.nextTick(function() {
                                ! function(e, t) {
                                    var r = t.length;
                                    for (; !t.reading && !t.flowing && !t.ended && t.length < t.highWaterMark && (e.read(0), r !== t.length);) r = t.length;
                                    t.readingMore = !1
                                }(e, t)
                            }))
                        }(e, t);
                    else s || (t.reading = !1);
                    return function(e) {
                        return !e.ended && (e.needReadable || e.length < e.highWaterMark || 0 === e.length)
                    }(t)
                }
                u.inherits = e("inherits"), u.inherits(h, a), h.prototype.push = function(e, t) {
                    var r = this._readableState;
                    return "string" != typeof e || r.objectMode || (t = t || r.defaultEncoding) !== r.encoding && (e = new i(e, t), t = ""), c(this, r, e, t, !1)
                }, h.prototype.unshift = function(e) {
                    return c(this, this._readableState, e, "", !0)
                }, h.prototype.setEncoding = function(t) {
                    s || (s = e("string_decoder/").StringDecoder), this._readableState.decoder = new s(t), this._readableState.encoding = t
                };
                var l = 8388608;

                function d(e, t) {
                    return 0 === t.length && t.ended ? 0 : t.objectMode ? 0 === e ? 0 : 1 : null === e || isNaN(e) ? t.flowing && t.buffer.length ? t.buffer[0].length : t.length : e <= 0 ? 0 : (e > t.highWaterMark && (t.highWaterMark = function(e) {
                        if (e >= l) e = l;
                        else {
                            e--;
                            for (var t = 1; t < 32; t <<= 1) e |= e >> t;
                            e++
                        }
                        return e
                    }(e)), e > t.length ? t.ended ? t.length : (t.needReadable = !0, 0) : e)
                }

                function p(e) {
                    var t = e._readableState;
                    t.needReadable = !1, t.emittedReadable || (t.emittedReadable = !0, t.sync ? r.nextTick(function() {
                        g(e)
                    }) : g(e))
                }

                function g(e) {
                    e.emit("readable")
                }

                function b(e) {
                    var t, r = e._readableState;

                    function n(e, n, i) {
                        !1 === e.write(t) && r.awaitDrain++
                    }
                    for (r.awaitDrain = 0; r.pipesCount && null !== (t = e.read());)
                        if (1 === r.pipesCount ? n(r.pipes) : _(r.pipes, n), e.emit("data", t), r.awaitDrain > 0) return;
                    if (0 === r.pipesCount) return r.flowing = !1, void(o.listenerCount(e, "data") > 0 && w(e));
                    r.ranOut = !0
                }

                function y() {
                    this._readableState.ranOut && (this._readableState.ranOut = !1, b(this))
                }

                function w(e, t) {
                    if (e._readableState.flowing) throw new Error("Cannot switch to old mode now.");
                    var n = t || !1,
                        i = !1;
                    e.readable = !0, e.pipe = a.prototype.pipe, e.on = e.addListener = a.prototype.on, e.on("readable", function() {
                        var t;
                        for (i = !0; !n && null !== (t = e.read());) e.emit("data", t);
                        null === t && (i = !1, e._readableState.needReadable = !0)
                    }), e.pause = function() {
                        n = !0, this.emit("pause")
                    }, e.resume = function() {
                        n = !1, i ? r.nextTick(function() {
                            e.emit("readable")
                        }) : this.read(0), this.emit("resume")
                    }, e.emit("readable")
                }

                function v(e, t) {
                    var r, n = t.buffer,
                        o = t.length,
                        s = !!t.decoder,
                        a = !!t.objectMode;
                    if (0 === n.length) return null;
                    if (0 === o) r = null;
                    else if (a) r = n.shift();
                    else if (!e || e >= o) r = s ? n.join("") : i.concat(n, o), n.length = 0;
                    else {
                        if (e < n[0].length) r = (c = n[0]).slice(0, e), n[0] = c.slice(e);
                        else if (e === n[0].length) r = n.shift();
                        else {
                            r = s ? "" : new i(e);
                            for (var u = 0, f = 0, h = n.length; f < h && u < e; f++) {
                                var c = n[0],
                                    l = Math.min(e - u, c.length);
                                s ? r += c.slice(0, l) : c.copy(r, u, 0, l), l < c.length ? n[0] = c.slice(l) : n.shift(), u += l
                            }
                        }
                    }
                    return r
                }

                function m(e) {
                    var t = e._readableState;
                    if (t.length > 0) throw new Error("endReadable called on non-empty stream");
                    !t.endEmitted && t.calledRead && (t.ended = !0, r.nextTick(function() {
                        t.endEmitted || 0 !== t.length || (t.endEmitted = !0, e.readable = !1, e.emit("end"))
                    }))
                }

                function _(e, t) {
                    for (var r = 0, n = e.length; r < n; r++) t(e[r], r)
                }
                h.prototype.read = function(e) {
                    var t = this._readableState;
                    t.calledRead = !0;
                    var r, n = e;
                    if (("number" != typeof e || e > 0) && (t.emittedReadable = !1), 0 === e && t.needReadable && (t.length >= t.highWaterMark || t.ended)) return p(this), null;
                    if (0 === (e = d(e, t)) && t.ended) return r = null, t.length > 0 && t.decoder && (r = v(e, t), t.length -= r.length), 0 === t.length && m(this), r;
                    var i = t.needReadable;
                    return t.length - e <= t.highWaterMark && (i = !0), (t.ended || t.reading) && (i = !1), i && (t.reading = !0, t.sync = !0, 0 === t.length && (t.needReadable = !0), this._read(t.highWaterMark), t.sync = !1), i && !t.reading && (e = d(n, t)), null === (r = e > 0 ? v(e, t) : null) && (t.needReadable = !0, e = 0), t.length -= e, 0 !== t.length || t.ended || (t.needReadable = !0), t.ended && !t.endEmitted && 0 === t.length && m(this), r
                }, h.prototype._read = function(e) {
                    this.emit("error", new Error("not implemented"))
                }, h.prototype.pipe = function(e, t) {
                    var i = this,
                        s = this._readableState;
                    switch (s.pipesCount) {
                        case 0:
                            s.pipes = e;
                            break;
                        case 1:
                            s.pipes = [s.pipes, e];
                            break;
                        default:
                            s.pipes.push(e)
                    }
                    s.pipesCount += 1;
                    var a = (!t || !1 !== t.end) && e !== r.stdout && e !== r.stderr ? f : c;

                    function u(e) {
                        e === i && c()
                    }

                    function f() {
                        e.end()
                    }
                    s.endEmitted ? r.nextTick(a) : i.once("end", a), e.on("unpipe", u);
                    var h = function(e) {
                        return function() {
                            var t = e._readableState;
                            t.awaitDrain--, 0 === t.awaitDrain && b(e)
                        }
                    }(i);

                    function c() {
                        e.removeListener("close", d), e.removeListener("finish", p), e.removeListener("drain", h), e.removeListener("error", l), e.removeListener("unpipe", u), i.removeListener("end", f), i.removeListener("end", c), e._writableState && !e._writableState.needDrain || h()
                    }

                    function l(t) {
                        g(), e.removeListener("error", l), 0 === o.listenerCount(e, "error") && e.emit("error", t)
                    }

                    function d() {
                        e.removeListener("finish", p), g()
                    }

                    function p() {
                        e.removeListener("close", d), g()
                    }

                    function g() {
                        i.unpipe(e)
                    }
                    return e.on("drain", h), e._events && e._events.error ? n(e._events.error) ? e._events.error.unshift(l) : e._events.error = [l, e._events.error] : e.on("error", l), e.once("close", d), e.once("finish", p), e.emit("pipe", i), s.flowing || (this.on("readable", y), s.flowing = !0, r.nextTick(function() {
                        b(i)
                    })), e
                }, h.prototype.unpipe = function(e) {
                    var t = this._readableState;
                    if (0 === t.pipesCount) return this;
                    if (1 === t.pipesCount) return e && e !== t.pipes ? this : (e || (e = t.pipes), t.pipes = null, t.pipesCount = 0, this.removeListener("readable", y), t.flowing = !1, e && e.emit("unpipe", this), this);
                    if (!e) {
                        var r = t.pipes,
                            n = t.pipesCount;
                        t.pipes = null, t.pipesCount = 0, this.removeListener("readable", y), t.flowing = !1;
                        for (var i = 0; i < n; i++) r[i].emit("unpipe", this);
                        return this
                    }
                    return -1 === (i = function(e, t) {
                        for (var r = 0, n = e.length; r < n; r++)
                            if (e[r] === t) return r;
                        return -1
                    }(t.pipes, e)) ? this : (t.pipes.splice(i, 1), t.pipesCount -= 1, 1 === t.pipesCount && (t.pipes = t.pipes[0]), e.emit("unpipe", this), this)
                }, h.prototype.on = function(e, t) {
                    var r = a.prototype.on.call(this, e, t);
                    if ("data" !== e || this._readableState.flowing || w(this), "readable" === e && this.readable) {
                        var n = this._readableState;
                        n.readableListening || (n.readableListening = !0, n.emittedReadable = !1, n.needReadable = !0, n.reading ? n.length && p(this) : this.read(0))
                    }
                    return r
                }, h.prototype.addListener = h.prototype.on, h.prototype.resume = function() {
                    w(this), this.read(0), this.emit("resume")
                }, h.prototype.pause = function() {
                    w(this, !0), this.emit("pause")
                }, h.prototype.wrap = function(e) {
                    var t = this._readableState,
                        r = !1,
                        n = this;
                    for (var i in e.on("end", function() {
                            if (t.decoder && !t.ended) {
                                var e = t.decoder.end();
                                e && e.length && n.push(e)
                            }
                            n.push(null)
                        }), e.on("data", function(i) {
                            (t.decoder && (i = t.decoder.write(i)), t.objectMode && null == i) || (t.objectMode || i && i.length) && (n.push(i) || (r = !0, e.pause()))
                        }), e) "function" == typeof e[i] && void 0 === this[i] && (this[i] = function(t) {
                        return function() {
                            return e[t].apply(e, arguments)
                        }
                    }(i));
                    return _(["error", "close", "destroy", "pause", "resume"], function(t) {
                        e.on(t, n.emit.bind(n, t))
                    }), n._read = function(t) {
                        r && (r = !1, e.resume())
                    }, n
                }, h._fromList = v
            }).call(this, e("_process"))
        }, {
            _process: 10,
            buffer: 3,
            "core-util-is": 17,
            events: 7,
            inherits: 8,
            isarray: 9,
            stream: 22,
            "string_decoder/": 23
        }],
        15: [function(e, t, r) {
            t.exports = s;
            var n = e("./_stream_duplex"),
                i = e("core-util-is");

            function o(e, t) {
                this.afterTransform = function(e, r) {
                    return function(e, t, r) {
                        var n = e._transformState;
                        n.transforming = !1;
                        var i = n.writecb;
                        if (!i) return e.emit("error", new Error("no writecb in Transform class"));
                        n.writechunk = null, n.writecb = null, null != r && e.push(r);
                        i && i(t);
                        var o = e._readableState;
                        o.reading = !1, (o.needReadable || o.length < o.highWaterMark) && e._read(o.highWaterMark)
                    }(t, e, r)
                }, this.needTransform = !1, this.transforming = !1, this.writecb = null, this.writechunk = null
            }

            function s(e) {
                if (!(this instanceof s)) return new s(e);
                n.call(this, e);
                this._transformState = new o(e, this);
                var t = this;
                this._readableState.needReadable = !0, this._readableState.sync = !1, this.once("finish", function() {
                    "function" == typeof this._flush ? this._flush(function(e) {
                        a(t, e)
                    }) : a(t)
                })
            }

            function a(e, t) {
                if (t) return e.emit("error", t);
                var r = e._writableState,
                    n = (e._readableState, e._transformState);
                if (r.length) throw new Error("calling transform done when ws.length != 0");
                if (n.transforming) throw new Error("calling transform done when still transforming");
                return e.push(null)
            }
            i.inherits = e("inherits"), i.inherits(s, n), s.prototype.push = function(e, t) {
                return this._transformState.needTransform = !1, n.prototype.push.call(this, e, t)
            }, s.prototype._transform = function(e, t, r) {
                throw new Error("not implemented")
            }, s.prototype._write = function(e, t, r) {
                var n = this._transformState;
                if (n.writecb = r, n.writechunk = e, n.writeencoding = t, !n.transforming) {
                    var i = this._readableState;
                    (n.needTransform || i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark)
                }
            }, s.prototype._read = function(e) {
                var t = this._transformState;
                null !== t.writechunk && t.writecb && !t.transforming ? (t.transforming = !0, this._transform(t.writechunk, t.writeencoding, t.afterTransform)) : t.needTransform = !0
            }
        }, {
            "./_stream_duplex": 12,
            "core-util-is": 17,
            inherits: 8
        }],
        16: [function(e, t, r) {
            (function(r) {
                t.exports = u;
                var n = e("buffer").Buffer;
                u.WritableState = a;
                var i = e("core-util-is");
                i.inherits = e("inherits");
                var o = e("stream");

                function s(e, t, r) {
                    this.chunk = e, this.encoding = t, this.callback = r
                }

                function a(e, t) {
                    var n = (e = e || {}).highWaterMark;
                    this.highWaterMark = n || 0 === n ? n : 16384, this.objectMode = !!e.objectMode, this.highWaterMark = ~~this.highWaterMark, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1;
                    var i = !1 === e.decodeStrings;
                    this.decodeStrings = !i, this.defaultEncoding = e.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(e) {
                        ! function(e, t) {
                            var n = e._writableState,
                                i = n.sync,
                                o = n.writecb;
                            if (function(e) {
                                    e.writing = !1, e.writecb = null, e.length -= e.writelen, e.writelen = 0
                                }(n), t) ! function(e, t, n, i, o) {
                                n ? r.nextTick(function() {
                                    o(i)
                                }) : o(i);
                                e._writableState.errorEmitted = !0, e.emit("error", i)
                            }(e, 0, i, t, o);
                            else {
                                var s = c(e, n);
                                s || n.bufferProcessing || !n.buffer.length || function(e, t) {
                                    t.bufferProcessing = !0;
                                    for (var r = 0; r < t.buffer.length; r++) {
                                        var n = t.buffer[r],
                                            i = n.chunk,
                                            o = n.encoding,
                                            s = n.callback,
                                            a = t.objectMode ? 1 : i.length;
                                        if (f(e, t, a, i, o, s), t.writing) {
                                            r++;
                                            break
                                        }
                                    }
                                    t.bufferProcessing = !1, r < t.buffer.length ? t.buffer = t.buffer.slice(r) : t.buffer.length = 0
                                }(e, n), i ? r.nextTick(function() {
                                    h(e, n, s, o)
                                }) : h(e, n, s, o)
                            }
                        }(t, e)
                    }, this.writecb = null, this.writelen = 0, this.buffer = [], this.errorEmitted = !1
                }

                function u(t) {
                    var r = e("./_stream_duplex");
                    if (!(this instanceof u || this instanceof r)) return new u(t);
                    this._writableState = new a(t, this), this.writable = !0, o.call(this)
                }

                function f(e, t, r, n, i, o) {
                    t.writelen = r, t.writecb = o, t.writing = !0, t.sync = !0, e._write(n, i, t.onwrite), t.sync = !1
                }

                function h(e, t, r, n) {
                    r || function(e, t) {
                        0 === t.length && t.needDrain && (t.needDrain = !1, e.emit("drain"))
                    }(e, t), n(), r && l(e, t)
                }

                function c(e, t) {
                    return t.ending && 0 === t.length && !t.finished && !t.writing
                }

                function l(e, t) {
                    var r = c(0, t);
                    return r && (t.finished = !0, e.emit("finish")), r
                }
                i.inherits(u, o), u.prototype.pipe = function() {
                    this.emit("error", new Error("Cannot pipe. Not readable."))
                }, u.prototype.write = function(e, t, i) {
                    var o = this._writableState,
                        a = !1;
                    return "function" == typeof t && (i = t, t = null), n.isBuffer(e) ? t = "buffer" : t || (t = o.defaultEncoding), "function" != typeof i && (i = function() {}), o.ended ? function(e, t, n) {
                        var i = new Error("write after end");
                        e.emit("error", i), r.nextTick(function() {
                            n(i)
                        })
                    }(this, 0, i) : function(e, t, i, o) {
                        var s = !0;
                        if (!n.isBuffer(i) && "string" != typeof i && null != i && !t.objectMode) {
                            var a = new TypeError("Invalid non-string/buffer chunk");
                            e.emit("error", a), r.nextTick(function() {
                                o(a)
                            }), s = !1
                        }
                        return s
                    }(this, o, e, i) && (a = function(e, t, r, i, o) {
                        r = function(e, t, r) {
                            e.objectMode || !1 === e.decodeStrings || "string" != typeof t || (t = new n(t, r));
                            return t
                        }(t, r, i), n.isBuffer(r) && (i = "buffer");
                        var a = t.objectMode ? 1 : r.length;
                        t.length += a;
                        var u = t.length < t.highWaterMark;
                        u || (t.needDrain = !0);
                        t.writing ? t.buffer.push(new s(r, i, o)) : f(e, t, a, r, i, o);
                        return u
                    }(this, o, e, t, i)), a
                }, u.prototype._write = function(e, t, r) {
                    r(new Error("not implemented"))
                }, u.prototype.end = function(e, t, n) {
                    var i = this._writableState;
                    "function" == typeof e ? (n = e, e = null, t = null) : "function" == typeof t && (n = t, t = null), null != e && this.write(e, t), i.ending || i.finished || function(e, t, n) {
                        t.ending = !0, l(e, t), n && (t.finished ? r.nextTick(n) : e.once("finish", n));
                        t.ended = !0
                    }(this, i, n)
                }
            }).call(this, e("_process"))
        }, {
            "./_stream_duplex": 12,
            _process: 10,
            buffer: 3,
            "core-util-is": 17,
            inherits: 8,
            stream: 22
        }],
        17: [function(e, t, r) {
            (function(e) {
                function t(e) {
                    return "object" == typeof e && null !== e
                }

                function n(e) {
                    return Object.prototype.toString.call(e)
                }
                r.isArray = function(e) {
                    return Array.isArray(e)
                }, r.isBoolean = function(e) {
                    return "boolean" == typeof e
                }, r.isNull = function(e) {
                    return null === e
                }, r.isNullOrUndefined = function(e) {
                    return null == e
                }, r.isNumber = function(e) {
                    return "number" == typeof e
                }, r.isString = function(e) {
                    return "string" == typeof e
                }, r.isSymbol = function(e) {
                    return "symbol" == typeof e
                }, r.isUndefined = function(e) {
                    return void 0 === e
                }, r.isRegExp = function(e) {
                    return t(e) && "[object RegExp]" === n(e)
                }, r.isObject = t, r.isDate = function(e) {
                    return t(e) && "[object Date]" === n(e)
                }, r.isError = function(e) {
                    return t(e) && ("[object Error]" === n(e) || e instanceof Error)
                }, r.isFunction = function(e) {
                    return "function" == typeof e
                }, r.isPrimitive = function(e) {
                    return null === e || "boolean" == typeof e || "number" == typeof e || "string" == typeof e || "symbol" == typeof e || void 0 === e
                }, r.isBuffer = function(t) {
                    return e.isBuffer(t)
                }
            }).call(this, e("buffer").Buffer)
        }, {
            buffer: 3
        }],
        18: [function(e, t, r) {
            t.exports = e("./lib/_stream_passthrough.js")
        }, {
            "./lib/_stream_passthrough.js": 13
        }],
        19: [function(e, t, r) {
            var n = e("stream");
            (r = t.exports = e("./lib/_stream_readable.js")).Stream = n, r.Readable = r, r.Writable = e("./lib/_stream_writable.js"), r.Duplex = e("./lib/_stream_duplex.js"), r.Transform = e("./lib/_stream_transform.js"), r.PassThrough = e("./lib/_stream_passthrough.js")
        }, {
            "./lib/_stream_duplex.js": 12,
            "./lib/_stream_passthrough.js": 13,
            "./lib/_stream_readable.js": 14,
            "./lib/_stream_transform.js": 15,
            "./lib/_stream_writable.js": 16,
            stream: 22
        }],
        20: [function(e, t, r) {
            t.exports = e("./lib/_stream_transform.js")
        }, {
            "./lib/_stream_transform.js": 15
        }],
        21: [function(e, t, r) {
            t.exports = e("./lib/_stream_writable.js")
        }, {
            "./lib/_stream_writable.js": 16
        }],
        22: [function(e, t, r) {
            t.exports = i;
            var n = e("events").EventEmitter;

            function i() {
                n.call(this)
            }
            e("inherits")(i, n), i.Readable = e("readable-stream/readable.js"), i.Writable = e("readable-stream/writable.js"), i.Duplex = e("readable-stream/duplex.js"), i.Transform = e("readable-stream/transform.js"), i.PassThrough = e("readable-stream/passthrough.js"), i.Stream = i, i.prototype.pipe = function(e, t) {
                var r = this;

                function i(t) {
                    e.writable && !1 === e.write(t) && r.pause && r.pause()
                }

                function o() {
                    r.readable && r.resume && r.resume()
                }
                r.on("data", i), e.on("drain", o), e._isStdio || t && !1 === t.end || (r.on("end", a), r.on("close", u));
                var s = !1;

                function a() {
                    s || (s = !0, e.end())
                }

                function u() {
                    s || (s = !0, "function" == typeof e.destroy && e.destroy())
                }

                function f(e) {
                    if (h(), 0 === n.listenerCount(this, "error")) throw e
                }

                function h() {
                    r.removeListener("data", i), e.removeListener("drain", o), r.removeListener("end", a), r.removeListener("close", u), r.removeListener("error", f), e.removeListener("error", f), r.removeListener("end", h), r.removeListener("close", h), e.removeListener("close", h)
                }
                return r.on("error", f), e.on("error", f), r.on("end", h), r.on("close", h), e.on("close", h), e.emit("pipe", r), e
            }
        }, {
            events: 7,
            inherits: 8,
            "readable-stream/duplex.js": 11,
            "readable-stream/passthrough.js": 18,
            "readable-stream/readable.js": 19,
            "readable-stream/transform.js": 20,
            "readable-stream/writable.js": 21
        }],
        23: [function(e, t, r) {
            var n = e("buffer").Buffer,
                i = n.isEncoding || function(e) {
                    switch (e && e.toLowerCase()) {
                        case "hex":
                        case "utf8":
                        case "utf-8":
                        case "ascii":
                        case "binary":
                        case "base64":
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                        case "raw":
                            return !0;
                        default:
                            return !1
                    }
                };
            var o = r.StringDecoder = function(e) {
                switch (this.encoding = (e || "utf8").toLowerCase().replace(/[-_]/, ""), function(e) {
                        if (e && !i(e)) throw new Error("Unknown encoding: " + e)
                    }(e), this.encoding) {
                    case "utf8":
                        this.surrogateSize = 3;
                        break;
                    case "ucs2":
                    case "utf16le":
                        this.surrogateSize = 2, this.detectIncompleteChar = a;
                        break;
                    case "base64":
                        this.surrogateSize = 3, this.detectIncompleteChar = u;
                        break;
                    default:
                        return void(this.write = s)
                }
                this.charBuffer = new n(6), this.charReceived = 0, this.charLength = 0
            };

            function s(e) {
                return e.toString(this.encoding)
            }

            function a(e) {
                this.charReceived = e.length % 2, this.charLength = this.charReceived ? 2 : 0
            }

            function u(e) {
                this.charReceived = e.length % 3, this.charLength = this.charReceived ? 3 : 0
            }
            o.prototype.write = function(e) {
                for (var t = ""; this.charLength;) {
                    var r = e.length >= this.charLength - this.charReceived ? this.charLength - this.charReceived : e.length;
                    if (e.copy(this.charBuffer, this.charReceived, 0, r), this.charReceived += r, this.charReceived < this.charLength) return "";
                    if (e = e.slice(r, e.length), !((i = (t = this.charBuffer.slice(0, this.charLength).toString(this.encoding)).charCodeAt(t.length - 1)) >= 55296 && i <= 56319)) {
                        if (this.charReceived = this.charLength = 0, 0 === e.length) return t;
                        break
                    }
                    this.charLength += this.surrogateSize, t = ""
                }
                this.detectIncompleteChar(e);
                var n = e.length;
                this.charLength && (e.copy(this.charBuffer, 0, e.length - this.charReceived, n), n -= this.charReceived);
                var i;
                n = (t += e.toString(this.encoding, 0, n)).length - 1;
                if ((i = t.charCodeAt(n)) >= 55296 && i <= 56319) {
                    var o = this.surrogateSize;
                    return this.charLength += o, this.charReceived += o, this.charBuffer.copy(this.charBuffer, o, 0, o), e.copy(this.charBuffer, 0, 0, o), t.substring(0, n)
                }
                return t
            }, o.prototype.detectIncompleteChar = function(e) {
                for (var t = e.length >= 3 ? 3 : e.length; t > 0; t--) {
                    var r = e[e.length - t];
                    if (1 == t && r >> 5 == 6) {
                        this.charLength = 2;
                        break
                    }
                    if (t <= 2 && r >> 4 == 14) {
                        this.charLength = 3;
                        break
                    }
                    if (t <= 3 && r >> 3 == 30) {
                        this.charLength = 4;
                        break
                    }
                }
                this.charReceived = t
            }, o.prototype.end = function(e) {
                var t = "";
                if (e && e.length && (t = this.write(e)), this.charReceived) {
                    var r = this.charReceived,
                        n = this.charBuffer,
                        i = this.encoding;
                    t += n.slice(0, r).toString(i)
                }
                return t
            }
        }, {
            buffer: 3
        }],
        24: [function(e, t, r) {
            t.exports = function(e) {
                return e && "object" == typeof e && "function" == typeof e.copy && "function" == typeof e.fill && "function" == typeof e.readUInt8
            }
        }, {}],
        25: [function(e, t, r) {
            (function(t, n) {
                var i = /%[sdj%]/g;
                r.format = function(e) {
                    if (!y(e)) {
                        for (var t = [], r = 0; r < arguments.length; r++) t.push(a(arguments[r]));
                        return t.join(" ")
                    }
                    r = 1;
                    for (var n = arguments, o = n.length, s = String(e).replace(i, function(e) {
                            if ("%%" === e) return "%";
                            if (r >= o) return e;
                            switch (e) {
                                case "%s":
                                    return String(n[r++]);
                                case "%d":
                                    return Number(n[r++]);
                                case "%j":
                                    try {
                                        return JSON.stringify(n[r++])
                                    } catch (e) {
                                        return "[Circular]"
                                    }
                                default:
                                    return e
                            }
                        }), u = n[r]; r < o; u = n[++r]) g(u) || !m(u) ? s += " " + u : s += " " + a(u);
                    return s
                }, r.deprecate = function(e, i) {
                    if (w(n.process)) return function() {
                        return r.deprecate(e, i).apply(this, arguments)
                    };
                    if (!0 === t.noDeprecation) return e;
                    var o = !1;
                    return function() {
                        if (!o) {
                            if (t.throwDeprecation) throw new Error(i);
                            t.traceDeprecation ? console.trace(i) : console.error(i), o = !0
                        }
                        return e.apply(this, arguments)
                    }
                };
                var o, s = {};

                function a(e, t) {
                    var n = {
                        seen: [],
                        stylize: f
                    };
                    return arguments.length >= 3 && (n.depth = arguments[2]), arguments.length >= 4 && (n.colors = arguments[3]), p(t) ? n.showHidden = t : t && r._extend(n, t), w(n.showHidden) && (n.showHidden = !1), w(n.depth) && (n.depth = 2), w(n.colors) && (n.colors = !1), w(n.customInspect) && (n.customInspect = !0), n.colors && (n.stylize = u), h(n, e, n.depth)
                }

                function u(e, t) {
                    var r = a.styles[t];
                    return r ? "[" + a.colors[r][0] + "m" + e + "[" + a.colors[r][1] + "m" : e
                }

                function f(e, t) {
                    return e
                }

                function h(e, t, n) {
                    if (e.customInspect && t && S(t.inspect) && t.inspect !== r.inspect && (!t.constructor || t.constructor.prototype !== t)) {
                        var i = t.inspect(n, e);
                        return y(i) || (i = h(e, i, n)), i
                    }
                    var o = function(e, t) {
                        if (w(t)) return e.stylize("undefined", "undefined");
                        if (y(t)) {
                            var r = "'" + JSON.stringify(t).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
                            return e.stylize(r, "string")
                        }
                        if (b(t)) return e.stylize("" + t, "number");
                        if (p(t)) return e.stylize("" + t, "boolean");
                        if (g(t)) return e.stylize("null", "null")
                    }(e, t);
                    if (o) return o;
                    var s = Object.keys(t),
                        a = function(e) {
                            var t = {};
                            return e.forEach(function(e, r) {
                                t[e] = !0
                            }), t
                        }(s);
                    if (e.showHidden && (s = Object.getOwnPropertyNames(t)), E(t) && (s.indexOf("message") >= 0 || s.indexOf("description") >= 0)) return c(t);
                    if (0 === s.length) {
                        if (S(t)) {
                            var u = t.name ? ": " + t.name : "";
                            return e.stylize("[Function" + u + "]", "special")
                        }
                        if (v(t)) return e.stylize(RegExp.prototype.toString.call(t), "regexp");
                        if (_(t)) return e.stylize(Date.prototype.toString.call(t), "date");
                        if (E(t)) return c(t)
                    }
                    var f, m = "",
                        L = !1,
                        A = ["{", "}"];
                    (d(t) && (L = !0, A = ["[", "]"]), S(t)) && (m = " [Function" + (t.name ? ": " + t.name : "") + "]");
                    return v(t) && (m = " " + RegExp.prototype.toString.call(t)), _(t) && (m = " " + Date.prototype.toUTCString.call(t)), E(t) && (m = " " + c(t)), 0 !== s.length || L && 0 != t.length ? n < 0 ? v(t) ? e.stylize(RegExp.prototype.toString.call(t), "regexp") : e.stylize("[Object]", "special") : (e.seen.push(t), f = L ? function(e, t, r, n, i) {
                        for (var o = [], s = 0, a = t.length; s < a; ++s) x(t, String(s)) ? o.push(l(e, t, r, n, String(s), !0)) : o.push("");
                        return i.forEach(function(i) {
                            i.match(/^\d+$/) || o.push(l(e, t, r, n, i, !0))
                        }), o
                    }(e, t, n, a, s) : s.map(function(r) {
                        return l(e, t, n, a, r, L)
                    }), e.seen.pop(), function(e, t, r) {
                        if (e.reduce(function(e, t) {
                                return 0, t.indexOf("\n") >= 0 && 0, e + t.replace(/\u001b\[\d\d?m/g, "").length + 1
                            }, 0) > 60) return r[0] + ("" === t ? "" : t + "\n ") + " " + e.join(",\n  ") + " " + r[1];
                        return r[0] + t + " " + e.join(", ") + " " + r[1]
                    }(f, m, A)) : A[0] + m + A[1]
                }

                function c(e) {
                    return "[" + Error.prototype.toString.call(e) + "]"
                }

                function l(e, t, r, n, i, o) {
                    var s, a, u;
                    if ((u = Object.getOwnPropertyDescriptor(t, i) || {
                            value: t[i]
                        }).get ? a = u.set ? e.stylize("[Getter/Setter]", "special") : e.stylize("[Getter]", "special") : u.set && (a = e.stylize("[Setter]", "special")), x(n, i) || (s = "[" + i + "]"), a || (e.seen.indexOf(u.value) < 0 ? (a = g(r) ? h(e, u.value, null) : h(e, u.value, r - 1)).indexOf("\n") > -1 && (a = o ? a.split("\n").map(function(e) {
                            return "  " + e
                        }).join("\n").substr(2) : "\n" + a.split("\n").map(function(e) {
                            return "   " + e
                        }).join("\n")) : a = e.stylize("[Circular]", "special")), w(s)) {
                        if (o && i.match(/^\d+$/)) return a;
                        (s = JSON.stringify("" + i)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (s = s.substr(1, s.length - 2), s = e.stylize(s, "name")) : (s = s.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), s = e.stylize(s, "string"))
                    }
                    return s + ": " + a
                }

                function d(e) {
                    return Array.isArray(e)
                }

                function p(e) {
                    return "boolean" == typeof e
                }

                function g(e) {
                    return null === e
                }

                function b(e) {
                    return "number" == typeof e
                }

                function y(e) {
                    return "string" == typeof e
                }

                function w(e) {
                    return void 0 === e
                }

                function v(e) {
                    return m(e) && "[object RegExp]" === L(e)
                }

                function m(e) {
                    return "object" == typeof e && null !== e
                }

                function _(e) {
                    return m(e) && "[object Date]" === L(e)
                }

                function E(e) {
                    return m(e) && ("[object Error]" === L(e) || e instanceof Error)
                }

                function S(e) {
                    return "function" == typeof e
                }

                function L(e) {
                    return Object.prototype.toString.call(e)
                }

                function A(e) {
                    return e < 10 ? "0" + e.toString(10) : e.toString(10)
                }
                r.debuglog = function(e) {
                    if (w(o) && (o = t.env.NODE_DEBUG || ""), e = e.toUpperCase(), !s[e])
                        if (new RegExp("\\b" + e + "\\b", "i").test(o)) {
                            var n = t.pid;
                            s[e] = function() {
                                var t = r.format.apply(r, arguments);
                                console.error("%s %d: %s", e, n, t)
                            }
                        } else s[e] = function() {};
                    return s[e]
                }, r.inspect = a, a.colors = {
                    bold: [1, 22],
                    italic: [3, 23],
                    underline: [4, 24],
                    inverse: [7, 27],
                    white: [37, 39],
                    grey: [90, 39],
                    black: [30, 39],
                    blue: [34, 39],
                    cyan: [36, 39],
                    green: [32, 39],
                    magenta: [35, 39],
                    red: [31, 39],
                    yellow: [33, 39]
                }, a.styles = {
                    special: "cyan",
                    number: "yellow",
                    boolean: "yellow",
                    undefined: "grey",
                    null: "bold",
                    string: "green",
                    date: "magenta",
                    regexp: "red"
                }, r.isArray = d, r.isBoolean = p, r.isNull = g, r.isNullOrUndefined = function(e) {
                    return null == e
                }, r.isNumber = b, r.isString = y, r.isSymbol = function(e) {
                    return "symbol" == typeof e
                }, r.isUndefined = w, r.isRegExp = v, r.isObject = m, r.isDate = _, r.isError = E, r.isFunction = S, r.isPrimitive = function(e) {
                    return null === e || "boolean" == typeof e || "number" == typeof e || "string" == typeof e || "symbol" == typeof e || void 0 === e
                }, r.isBuffer = e("./support/isBuffer");
                var B = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

                function R() {
                    var e = new Date,
                        t = [A(e.getHours()), A(e.getMinutes()), A(e.getSeconds())].join(":");
                    return [e.getDate(), B[e.getMonth()], t].join(" ")
                }

                function x(e, t) {
                    return Object.prototype.hasOwnProperty.call(e, t)
                }
                r.log = function() {
                    console.log("%s - %s", R(), r.format.apply(r, arguments))
                }, r.inherits = e("inherits"), r._extend = function(e, t) {
                    if (!t || !m(t)) return e;
                    for (var r = Object.keys(t), n = r.length; n--;) e[r[n]] = t[r[n]];
                    return e
                }
            }).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            "./support/isBuffer": 24,
            _process: 10,
            inherits: 8
        }]
    }, {}, [2])(2)
});