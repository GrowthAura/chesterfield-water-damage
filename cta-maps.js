/* CTA maps — end-level round 2026-11-16.
   Initialises every .cta-map div from its data-lat / data-lng / data-zoom.
   Same stack as the contact page: self-hosted Leaflet 1.9.4, OSM tiles
   (no API key), same pin, same zoom control position.

   MOBILE RULE (the user's core complaint): on touch devices the map
   starts NON-interactive — dragging, touchZoom, doubleClickZoom, boxZoom
   and keyboard are all off, and Leaflet adds none of its touch-drag /
   touch-zoom classes, so the container keeps the browser's default
   touch-action and a swipe over the map scrolls the PAGE. A "Tap to
   explore map" overlay covers the map; the FIRST tap on it activates
   interaction (all handlers on, overlay hidden, "Done" button shown).
   Tapping "Done", or tapping anywhere OUTSIDE the map, deactivates it
   again so page scroll returns. Desktop (no touch): the map is
   interactive immediately, no overlay. scrollWheelZoom stays OFF on
   every device — the wheel always scrolls the page, as on contact. */
(function () {
  var PIN_SVG = '<svg viewBox="0 0 24 32" width="30" height="40" aria-hidden="true"><path d="M12 0C5.9 0 1 4.9 1 11c0 8.1 11 21 11 21s11-12.9 11-21C23 4.9 18.1 0 12 0z" fill="#04182E" stroke="#FFFFFF" stroke-width="1.6"/><circle cx="12" cy="11" r="4.6" fill="#F97316"/></svg>';

  function initOne(wrap) {
    var el = wrap.querySelector('.cta-map');
    if (!el) return;
    if (typeof L === 'undefined') {
      el.innerHTML = '<div class="map-fallback">The interactive map could not load.</div>';
      return;
    }
    var lat = parseFloat(el.getAttribute('data-lat'));
    var lng = parseFloat(el.getAttribute('data-lng'));
    var zoom = parseInt(el.getAttribute('data-zoom'), 10) || 12;
    var label = el.getAttribute('data-label') || '';
    var isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (isTouch) wrap.classList.add('is-touch');

    var map = L.map(el, {
      zoomControl: false, /* FIX-R2 2026-11-16: Leaflet adds a default top-left
        zoom control unless disabled; cta-maps adds its own at bottomright
        (line 42), so without this there were TWO controls and the top-left
        one hid behind the brand card with a grey sliver showing. Delaware
        has the same latent duplicate; here it is fixed. */
      scrollWheelZoom: false,
      dragging: !isTouch,
      touchZoom: !isTouch,
      doubleClickZoom: !isTouch,
      boxZoom: false,
      keyboard: !isTouch
    });
    L.control.zoom({ position: 'bottomright' }).addTo(map);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    var pin = L.divIcon({
      className: 'map-pin-icon',
      html: PIN_SVG,
      iconSize: [30, 40],
      iconAnchor: [15, 40],
      popupAnchor: [0, -36]
    });
    L.marker([lat, lng], { icon: pin, title: label }).addTo(map);
    map.setView([lat, lng], zoom, { animate: false });

    if (!isTouch) return; // desktop: interactive from the start, no overlay

    var tap = wrap.querySelector('.cta-map-tap');
    var done = wrap.querySelector('.cta-map-done');

    function activate() {
      map.dragging.enable();
      map.touchZoom.enable();
      map.doubleClickZoom.enable();
      map.keyboard.enable();
      wrap.classList.add('is-active');
      if (done) done.hidden = false;
      if (done) done.focus();
    }
    function deactivate() {
      map.dragging.disable();
      map.touchZoom.disable();
      map.doubleClickZoom.disable();
      map.keyboard.disable();
      wrap.classList.remove('is-active');
      if (done) done.hidden = true;
    }
    if (tap) tap.addEventListener('click', function (e) {
      e.preventDefault();
      activate();
    });
    if (done) done.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      deactivate();
    });
    // Tapping anywhere outside the map deactivates it (page scroll returns).
    document.addEventListener('click', function (e) {
      if (wrap.classList.contains('is-active') && !wrap.contains(e.target)) {
        deactivate();
      }
    }, true);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && wrap.classList.contains('is-active')) deactivate();
    });
  }

  function init() {
    var wraps = document.querySelectorAll('.cta-map-wrap');
    for (var i = 0; i < wraps.length; i++) initOne(wraps[i]);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
