export default {
    // 电子签名base64加密
    encode: (r) => {
        var e, t, n, o, a, i, c, f = '',
            u = 0;
        var _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

        function _utf8_encode(r) {
            r = r.replace(/\r\n/g, '\n');
            var e = '';
            for (var t = 0; t < r.length; t++) {
                var n = r.charCodeAt(t);
                n < 128 ? e += String.fromCharCode(n) : n > 127 && n < 2048 ? (e += String.fromCharCode(n >> 6 | 192), e += String.fromCharCode(63 & n | 128)) : (e += String.fromCharCode(n >> 12 | 224), e += String.fromCharCode(n >> 6 & 63 | 128), e += String.fromCharCode(63 & n | 128));
            }
            return e;
        };
        for (r = _utf8_encode(r); u < r.length;) o = (e = r.charCodeAt(u++)) >> 2, a = (3 & e) << 4 | (t = r.charCodeAt(u++)) >> 4, i = (15 & t) << 2 | (n = r.charCodeAt(u++)) >> 6, c = 63 & n, isNaN(t) ? i = c = 64 : isNaN(n) && (c = 64), f = f + _keyStr.charAt(o) + _keyStr.charAt(a) + _keyStr.charAt(i) + _keyStr.charAt(c);
        return f;
    }
}