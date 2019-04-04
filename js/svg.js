var SVG_DATA = {
   MAP: null,
   MAP_TRANSFORM: {
      LEFT: 0,
      TOP: 0,
      ZOOM: 1,
      ZOOM_STEP: 0.1,
      WIDTH: 0,
      HEIGHT: 0,
      SCALE: {
         MIN: .5,
         MAX: 5
      }
   },
   MOUSE_DOWN: function(event, ui){
      $(this).data({
         'mouseDown': true,
         'mouseOldLeft': event.pageX,
         'mouseOldTop': event.pageY,
         'mouseDrag': false
      });
   },
   MOUSE_LEAVE: function(event) {
      $(this).data({
         'mouseDrag': true,
         'mouseDown': false
      });
      
      // Make sure the add resource popover is faded in.
      $("#add-resource-popover").css('opacity', 1);
      adjustAddPopover();
      
      COOKIES.SAVE_SETTINGS();
   },
   MOUSE_MOVE: function(event, ui){
      var mouseDown = $(this).data('mouseDown') || false;

      if(mouseDown == true) {            
         var mouseOldLeft  = $(this).data('mouseOldLeft');
         var mouseOldTop   = $(this).data('mouseOldTop');
         var zoom          = SVG_DATA.MAP_TRANSFORM.ZOOM;
         var mapBounds     = $("#region_group").get(0).getBoundingClientRect();
         var mouseNewLeft  = event.pageX;
         var mouseNewTop   = event.pageY;

         var deltaLeft     = Number(mouseNewLeft) - Number(mouseOldLeft);
         var deltaTop      = Number(mouseNewTop) - Number(mouseOldTop);

         var viewBoxOldX   = $(this).data("viewX");
         var viewBoxOldY   = $(this).data("viewY");
         var newViewBoxX   = Number(viewBoxOldX) + deltaLeft;
         var newViewBoxY   = Number(viewBoxOldY) + deltaTop;
         
         // Verify not moving off the screen.
         if(newViewBoxX < ((-mapBounds.width) + mapBoundsOffset.width)) // Left
            newViewBoxX = (-mapBounds.width) + mapBoundsOffset.width;
         if(newViewBoxY < ((-mapBounds.height) + mapBoundsOffset.height)) // Top
            newViewBoxY = (-mapBounds.height) + mapBoundsOffset.height;
         if(newViewBoxX > (SVG_DATA.MAP_TRANSFORM.WIDTH - mapBoundsOffset.width)) // Right
            newViewBoxX = SVG_DATA.MAP_TRANSFORM.WIDTH - mapBoundsOffset.width;
         if(newViewBoxY > (SVG_DATA.MAP_TRANSFORM.HEIGHT - mapBoundsOffset.height)) // Bottom
            newViewBoxY = SVG_DATA.MAP_TRANSFORM.HEIGHT - mapBoundsOffset.height;
         
         $(this).data({
            'viewX': newViewBoxX,
            'viewY': newViewBoxY
         });
         
         SVG_DATA.Transform({
            left: newViewBoxX,
            top: newViewBoxY
         });

         $(this).data('mouseOldLeft', mouseNewLeft);
         $(this).data('mouseOldTop', mouseNewTop );
         
         // Set mouseDrag = true if delta is more than 0.
         if(Math.abs(deltaLeft) > dragMaxDelta || Math.abs(deltaTop) > dragMaxDelta)
            $(this).data({'mouseDrag': true});
      
         // Adjust the world map.
         var region = SVG_DATA.MAP.getElementById("region_group");
         region.setAttribute('transform', 'translate('+newViewBoxX+' '+newViewBoxY+') scale('+zoom+')');
         
         // Make sure the add resource popover is faded out.
         $("#add-resource-popover").css('opacity', fadeoutOpacity);
      }

   },
   MOUSE_SCROLL: function(event) {
      var currentViewX = $(this).data('viewX');
      var currentViewY = $(this).data('viewY');
      var currentZoom = SVG_DATA.MAP_TRANSFORM.ZOOM;
      var newZoom = currentZoom;
                     
      if(event.originalEvent.wheelDelta < 0) {
         newZoom = currentZoom - SVG_DATA.MAP_TRANSFORM.ZOOM_STEP;
         if(newZoom < SVG_DATA.MAP_TRANSFORM.SCALE.MIN)
            newZoom = SVG_DATA.MAP_TRANSFORM.SCALE.MIN;
      }
      else {
         newZoom = currentZoom + SVG_DATA.MAP_TRANSFORM.ZOOM_STEP;
         if(newZoom > SVG_DATA.MAP_TRANSFORM.SCALE.MAX)
            newZoom = SVG_DATA.MAP_TRANSFORM.SCALE.MAX;
      }
         
      SVG_DATA.Transform({zoom: newZoom});
      
      // Adjust the world map.
      var region = SVG_DATA.MAP.getElementById("region_group");
      region.setAttribute('transform', 'translate('+SVG_DATA.MAP_TRANSFORM.LEFT+' '+SVG_DATA.MAP_TRANSFORM.TOP+') scale('+newZoom+')');
      
      adjustAddPopover();
      
      COOKIES.SAVE_SETTINGS();
   },
   MOUSE_UP: function(event, ui) {
      if(event.which == MOUSE.LEFT) {
         var mouseLeft = event.pageX;
         var mouseTop  = event.pageY;
         var currentViewX = $(this).data('viewX');
         var currentViewY = $(this).data('viewY');
         var currentZoom = $(this).data('zoom');
         var svgOffset = $("#map-container").offset();
         
         var resourceLeft = (mouseLeft - svgOffset.left - currentViewX) * (1/currentZoom);
         var resourceTop = (mouseTop - svgOffset.top - currentViewY) * (1/currentZoom);
         
         var region = SVG_DATA.MAP.getElementById("region_group");
         
         // Check if we should add a new resource.
         if($("#floating-add").hasClass('active')) {
            var mouseDrag = $(this).data('mouseDrag') || false;
            console.log("mouseDrag: "+mouseDrag);
            
            if(mouseDrag == false) {
               // Add the "unknown" resource image.
               var resourceAdjustedLeft = resourceLeft - (resourceSize/2);
               var resourceAdjustedTop = resourceTop - (resourceSize/2);
               var resourceImage = SVG_DATA.MAP.image(region_group, resourceAdjustedLeft, resourceAdjustedTop, resourceSize, resourceSize, './images/resources/unknown.png');
               var resourceImageCount = $("#region_group").find('image.resource-icon').length;
               var resourceId = 'resource-'+resourceImageCount;
               $(resourceImage).addClass('resource-icon').attr('id', resourceId);
               
               // Show the popover.
               $("#add-resource-popover").hide().css({
                  top: mouseTop - popover.topOffset,
                  left: mouseLeft + popover.leftOffset,
                  display: 'block'
               })
               .data({
                  'resourceAddingId': "#"+resourceId,
                  'resourceAddingLeft': resourceAdjustedLeft,
                  'resourceAddingTop': resourceAdjustedTop
               })
               .show("fast");
               
               $("#add-resource-input").focus();
            }
            else {
               // Make sure the add resource popover is faded in.
               $("#add-resource-popover").css('opacity', 1);
               adjustAddPopover();
            }
         }
      }
         
      $(this).data({
         'mouseDown': false,
         'mouseDrag': false
      });
      
      /*SVG_DATA.Transform({
         width: $("body").innerWidth(),
         height: $("body").innerHeight() - $("#header-navbar").outerHeight()
      });*/
   },
   ON_LOAD: function(svg) {
      SVG_DATA.MAP = svg;
      
      $(SVG_DATA.MAP).attr({height: "100%", width: "100%"});
      
      SVG_DATA.MAP.configure({viewBox: '0 0 '+SVG_DATA.MAP_TRANSFORM.WIDTH+' '+SVG_DATA.MAP_TRANSFORM.HEIGHT}, true);
      $('#map-container').find('svg')
         .data({
            "viewX": 0,
            "viewY": 0,
            "viewWidth": SVG_DATA.MAP_TRANSFORM.WIDTH,
            "viewHeight": SVG_DATA.MAP_TRANSFORM.HEIGHT,
            "zoom" : 1
         });

      // defs.
      var defs = SVG_DATA.MAP.defs('myDefs')
      SVG_DATA.MAP.linearGradient(defs, "ocean_gradient", [[0, '#7BB6E2'], [1, '#263B3D']], 0, 0, 0, "100%", {gradientUnits: 'userSpaceOnUse'});

      // Add the background.
      var background = SVG_DATA.MAP.rect(0, 0, "100%", "100%", {
         fill: "url(#ocean_gradient)",
         strokeWidth: 0
      });
      
      // Set the viewbox.
      svg.configure({viewBox: '0 0 '+SVG_DATA.MAP_TRANSFORM.WIDTH+' '+SVG_DATA.MAP_TRANSFORM.HEIGHT}, true);
      
      DATA.GET_REGION_DATA(DATA.CurrentRegionId);
   },
   RESIZE: function() {      
      SVG_DATA.Transform({
         width: $("body").innerWidth(),
         height: $("body").innerHeight() - $("#header-navbar").outerHeight()
      });
   },
   Transform: function(transformData) {
      if('left' in transformData)
         SVG_DATA.MAP_TRANSFORM.LEFT = transformData['left'];
      if('top' in transformData)
         SVG_DATA.MAP_TRANSFORM.TOP = transformData['top'];
      if('zoom' in transformData)
         SVG_DATA.MAP_TRANSFORM.ZOOM = transformData['zoom'];
      if('width' in transformData)
         SVG_DATA.MAP_TRANSFORM.WIDTH = transformData['width'];
      if('height' in transformData)
         SVG_DATA.MAP_TRANSFORM.HEIGHT = transformData['height'];
      
      COOKIES.SAVE_SETTINGS();
   }
};