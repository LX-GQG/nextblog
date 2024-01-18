// 封装cookies
import { serialize } from 'cookie';
import cookie from 'cookie';

// Path: react-demo/react-web/static/utils/cookies.js

// 存储cookie
function setCookie(key, value, options) {
    const cookieStr = serialize(key, value, options);
    document.cookie = cookieStr;
}


// 删除cookie
function removeCookie(key) {
    const cookieStr = serialize(key, '', { maxAge: -1 });
    document.cookie = cookieStr;
}

module.exports = { setCookie, removeCookie };
