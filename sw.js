self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("amc8-cache").then(cache =>
      cache.addAll([
        "index.html",
        "style.css",
        "script.js"
      ])
    )
  );
});
