/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v3.6.3/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v3.6.3"});

importScripts(
  "precache-manifest.bbbce51232614a7d4e869ccb9daf9b58.js"
);

workbox.core.setCacheNameDetails({prefix: "pwa-vuedemo"});

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute("https://waituntil.online/pwa-vue/index.html", {
  
  blacklist: [/^\/_/,/\/[^\/]+\.[^\/]+$/],
});

workbox.routing.registerRoute(/.*\.js/, workbox.strategies.networkFirst({ "cacheName":"my-js-cache","matchOptions":{"ignoreSearch":true}, plugins: [{ cacheWillUpdate: () => { console.log(`%c js cacheWillUpdate`, `color:#006DCB;`); }, cacheDidUpdate: () => { console.log(`%c js cache update`, `color:#006DCB;`); }, cachedResponseWillBeUsed: () => { console.log(`%c js cachedResponseWillBeUsed`, `color:#006DCB;`); }, requestWillFetch: () => { console.log(`%c js cache requestWillFetch`, `color:#006DCB;`); }, fetchDidFail: () => { console.log(`%c js cache fetchDidFail`, `color:red;`); } }, new workbox.expiration.Plugin({"maxEntries":5,"maxAgeSeconds":60,"purgeOnQuotaError":false}), new workbox.backgroundSync.Plugin("my-jsqueue-name", {"maxRetentionTime":3600}), new workbox.broadcastUpdate.Plugin("my-jsupdate-channel"), new workbox.cacheableResponse.Plugin({"statuses":[200]})] }), 'GET');
workbox.routing.registerRoute(/https:\/\/www.easy-mock.com\/mock\/5ccec7de7ffbe958f9bc418b\/all/, workbox.strategies.networkFirst({ "cacheName":"my-api-cache","matchOptions":{"ignoreSearch":true}, plugins: [{ cacheDidUpdate: () => { console.log(`%c api cache update`, `color:#006DCB;`); } }, new workbox.expiration.Plugin({"maxEntries":5,"maxAgeSeconds":60,"purgeOnQuotaError":false}), new workbox.backgroundSync.Plugin("my-queue-name", {"maxRetentionTime":3600}), new workbox.cacheableResponse.Plugin({"statuses":[200]})] }), 'GET');
