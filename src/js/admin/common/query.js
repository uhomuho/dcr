const esc = encodeURIComponent
export default params => params && !!Object.keys(params).length ? "?" + Object.keys(params).map(k => esc(k) + '=' + esc(params[k])).join('&') : ""