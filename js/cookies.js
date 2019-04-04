
var COOKIES = {
   EXPIRES: 1,
   GET_SETTINGS: function() {
        
      SVG_DATA.RESIZE();
      
      var regionStartLeft = (SVG_DATA.MAP_TRANSFORM.WIDTH / 2) - ((SVG_DATA.MAP_TRANSFORM.HEIGHT * REGION.RATIO) / 2);
      
      SVG_DATA.MAP_TRANSFORM.LEFT = $.cookie('mapLeft') || regionStartLeft;
      SVG_DATA.MAP_TRANSFORM.TOP  = $.cookie('mapTop')  || 0;
      SVG_DATA.MAP_TRANSFORM.ZOOM = $.cookie('mapZoom') || 1;
      
      COOKIES.SAVE_SETTINGS();
   },
   SAVE_SETTINGS: function() {
      $.cookie('mapLeft', SVG_DATA.MAP_TRANSFORM.LEFT, {expires: COOKIES.EXPIRES});
      $.cookie('mapTop', SVG_DATA.MAP_TRANSFORM.TOP, {expires: COOKIES.EXPIRES});
      $.cookie('mapZoom', SVG_DATA.MAP_TRANSFORM.ZOOM, {expires: COOKIES.EXPIRES});
   }
}