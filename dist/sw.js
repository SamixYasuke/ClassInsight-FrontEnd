if (!self.define) {
  let e,
    i = {};
  const n = (n, s) => (
    (n = new URL(n + ".js", s).href),
    i[n] ||
      new Promise((i) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = n), (e.onload = i), document.head.appendChild(e);
        } else (e = n), importScripts(n), i();
      }).then(() => {
        let e = i[n];
        if (!e) throw new Error(`Module ${n} didn’t register its module`);
        return e;
      })
  );
  self.define = (s, r) => {
    const o =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (i[o]) return;
    let c = {};
    const d = (e) => n(e, o),
      t = { module: { uri: o }, exports: c, require: d };
    i[o] = Promise.all(s.map((e) => t[e] || d(e))).then((e) => (r(...e), c));
  };
}
define(["./workbox-3e911b1d"], function (e) {
  "use strict";
  self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: "assets/index-98RtETMv.css", revision: null },
        { url: "assets/index-QJRiYev9.js", revision: null },
        { url: "index.html", revision: "bcd6300a8bd21011b884f6d45eb44293" },
        { url: "registerSW.js", revision: "1872c500de691dce40960bb85481de07" },
        { url: "favicon.ico", revision: "e9b95ce830ba22db1379fc49943ea2ad" },
        { url: "pwa-64x64.png", revision: "8bdd35681e6668c831f1eca40012b323" },
        {
          url: "pwa-192x192.png",
          revision: "7161a77af4251bbb7cd6eb6bcfd88ec7",
        },
        {
          url: "pwa-512x512.png",
          revision: "87f84277ec902c3dc64f891380797930",
        },
        {
          url: "maskable-icon-512x512.png",
          revision: "f3007adc5534fed930e4c8d2a419ffee",
        },
        {
          url: "manifest.webmanifest",
          revision: "d51fda1c2b97193099caa315ea185736",
        },
      ],
      {}
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))
    );
});
