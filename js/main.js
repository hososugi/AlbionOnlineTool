
$(document).ready(function(){
   COOKIES.GET_SETTINGS();
});

$(window).resize(function(){
   setupMapContainer();
});

function setupNav(navOptionId) {
   $("#main-nav").find(".navbar-nav .active").removeClass('active');
   $("#main-nav").find(navOptionId).addClass('active');
}

function setupMapContainer() {
   SVG_DATA.RESIZE();
   
   $('#map-container').height(SVG_DATA.MAP_TRANSFORM.HEIGHT);
   $('#map-container').find('svg')
      .attr({
         "height": "100%",
         "width": "100%"
      });
}

function setupAddResourcePopover(jsonData) {
   
   // Set up the cancel of adding a new resource.
   $("#add-resource-popover").find('#add-resource-btn-cancel').click(function() {
      $("#add-resource-popover").hide();
      
      // Remove the icon.
      var resourceId = $("#add-resource-popover").data('resourceAddingId');
      $(resourceId).remove();
   });
   
   
   // Build the array of objects for the autocomplete. Needs label and value.
   var resourceData = [];
   for(resourceIndex in jsonData) {
      resourceData.push({
         label: jsonData[resourceIndex]["name"],
         value: jsonData[resourceIndex]["resource_id"],
         image: jsonData[resourceIndex]["image"]
      });
   }
   
   // Add the resources as options.
   $("#add-resource-input").autocomplete({
      minLength: 1,
      source: resourceData,
      select: function(event, ui) {
         // Change the input value and store the id for sending to the back-end.
         $("#add-resource-input").val( ui.item.label ).data('resourceId', ui.item.value);

         // Change the "unknown" icon to the selected one.
         var resourceId = $("#add-resource-popover").data('resourceAddingId');
         $(resourceId).attr('href', './images/resources'+ui.item.image);
         
         return false;
      }
    })
    .autocomplete( "instance" )._renderItem = function(ul, item) {
      var option = $("<li>")
         .append("<div data-resource-id='" + item.value + "'>" + item.label + "</div>")
         .appendTo(ul);
      
      return option;
    };
   
   // Set up the add button.
   $("#add-resource-popover").find('#add-resource-btn-add').click(function() {
      $("#add-resource-popover").data('resourceAddingId');
      
      DATA.POST_NEW_RESOURCE();
   });
}

function drawMap(svg, regionData) {
   // Add a group containing everything for panning and zooming.
   var region_group = svg.group("region_group", {transform: "translate("+SVG_DATA.MAP_TRANSFORM.LEFT+","+SVG_DATA.MAP_TRANSFORM.TOP+") scale(1)"});

   // Draw the region
   //var mapImage = svg.image(region_group, 0, 0, SVG_DATA.MAP_TRANSFORM.HEIGHT * REGION.RATIO, SVG_DATA.MAP_TRANSFORM.HEIGHT, REGION.IMAGE_BASE + regionData['image_filename']);
   var mapImage = svg.image(region_group, 0, 0, REGION.WIDTH, REGION.HEIGHT, REGION.IMAGE_BASE + regionData['image_filename']);
   
   $('#map-container').find('svg')
      .bind('mousedown', SVG_DATA.MOUSE_DOWN)
      .bind('mousemove', SVG_DATA.MOUSE_MOVE)
      .bind('mouseup', SVG_DATA.MOUSE_UP)
      .bind('mouseleave mouseenter', SVG_DATA.MOUSE_LEAVE)
      .bind('mousewheel', SVG_DATA.MOUSE_SCROLL);
}

function drawResource(resourceData) {
   
   // Add the resource image.
   var resourceLeft        = resourceData["left"];
   var resourceTop         = resourceData["top"];
   var resourceImageSource = resourceData['image'];
   var resourceImage       = SVG_DATA.MAP.image(region_group, resourceLeft - (resourceSize/2), resourceTop - (resourceSize/2), resourceSize, resourceSize, './images/resources'+resourceImageSource);
   var resourceImageCount  = $("#region_group").find('image.resource-icon').length;
   var resourceId          = 'resource-'+resourceImageCount;
   
   $(resourceImage).addClass('resource-icon')
      .attr('id', resourceId)
      .data(resourceData);
}

function adjustAddPopover() {
   // Adjust the resource add popover.
   var resourceId = $("#add-resource-popover").data("resourceAddingId");
   
   if($(resourceId).length > 0) {
      $("#add-resource-popover").css({
         top: $(resourceId).offset().top - popover.topOffset,
         left: $(resourceId).offset().left + popover.leftOffset
      });
   }
   
   $("#add-resource-input").focus();
}

function setupMapAddButton() {
   $("#floating-add").click(function() {
      if($(this).hasClass('active')) {
         $(this).removeClass('active');
         
         // Remove the placeholder image for new resources.
         var resourceId = $("#add-resource-popover").data('resourceAddingId');
         $(resourceId).remove();
         
         // Remove the popover.
         $("#add-resource-popover").hide();
      }
      else {
         $(this).addClass('active');
      }
   });
}
