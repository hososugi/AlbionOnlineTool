var API = {
   BASE: './api/',
   URI: {
      CATEGORIES:       'items/categories.php',
      ITEMS:            'items.php',
      REGIONS:          'regions.php',
      REGION_RESOURCES: 'regions/resources.php',
      RESOURCES:        'resources.php',
   }
};

var REGION = {
   IMAGE_BASE: './images/regions/',
   WIDTH: 1024,
   HEIGHT: 733.15,
   RATIO: 1.39672
}

var dragMaxDelta = 5;
var fadeoutOpacity = .2;
var mapBoundsOffset = {
   width: 150,
   height: 50
};
var popover = {
   topOffset: 50,
   leftOffset: 10
};
var MOUSE = {
   LEFT: 1,
   MIDDLE: 2,
   RIGHT: 3
};
var resourceSize = 10;