var DATA = {
   CurrentRegionId: 1,
   REGION_LIST: {},
   RESOURCE_LIST: {},
   GET_CATEGORIES: function(dataOptions, callback) {
      var data = dataOptions;
         
      $.ajax({
         url: API.BASE + API.URI.CATEGORIES,
         method: 'GET',
         data: data,
         passedData: data,
         passedCallback: callback,
         success: function(returnJson) {
            DATA.CATEGORIES = returnJson;
            
            if(this.passedCallback)
               this.passedCallback(returnJson);
         },
         error: function() {
            console.error("Error fetching region resource data for region "+regionId);
         }
      });
   },
   GET_ITEMS: function(dataOptions, callback) {
      var data = dataOptions;
         
      $.ajax({
         url: API.BASE + API.URI.ITEMS,
         method: 'GET',
         data: data,
         passedData: data,
         passedCallback: callback,
         success: function(returnJson) {
            DATA.ITEMS = returnJson;
            DATA.SETUP_ITEM_SEARCH();
            
            if(this.passedCallback)
               this.passedCallback(returnJson);
         },
         error: function() {
            console.error("Error fetching region resource data for region "+regionId);
         }
      });
   },
   GET_REGION_DATA(regionId) {
      var data = {
         region_id: regionId
      };
         
      $.ajax({
         url: API.BASE + API.URI.REGIONS,
         method: 'GET',
         data: data,
         passedData: data,
         success: function(returnJson) {
            var regionId = this.passedData.region_id;
            
            DATA.REGION_LIST[regionId] = returnJson[regionId];
            DATA.GET_REGION_RESOURCES(regionId);
            
            drawMap(SVG_DATA.MAP, returnJson[regionId]);
         },
         error: function() {
            console.error("Error fetching region data for region "+regionId);
         }
      });
   },
   GET_REGION_RESOURCES(regionId) {
      var data = {
         region_id: regionId
      };
         
      $.ajax({
         url: API.BASE + API.URI.REGION_RESOURCES,
         method: 'GET',
         data: data,
         passedData: data,
         success: function(returnJson) {
            var regionId = this.passedData['region_id'];
            DATA.REGION_LIST[regionId]["resources"] = returnJson;
            
            for(resourceIndex in returnJson) {
               drawResource(returnJson[resourceIndex]);
            }
         },
         error: function() {
            console.error("Error fetching region resource data for region "+regionId);
         }
      });
   },
   GET_REGIONS: function() {
      var data = {
      };
         
      $.ajax({
         url: API.BASE + API.URI.REGIONS,
         method: 'GET',
         data: data,
         passedData: data,
         success: function(returnJson) {
            DATA.REGIONS = returnJson;
            DATA.SETUP_REGION_SEARCH();
         },
         error: function() {
            var regionId = this.passedData['region_id'];
            console.error("Error fetching region resource data for region "+regionId);
         }
      });
   },
   GET_RESOURCES: function() { 
      /*
      * The list of resources that can be gathered. Not their locations on a map.
      */   
      $.ajax({
         url: API.BASE + API.URI.RESOURCES,
         method: 'GET',
         data: {},
         success: function(returnJson) {
            DATA.RESOURCE_LIST = returnJson;
            
            setupAddResourcePopover(returnJson);
         },
         error: function() {
            console.error("Error fetching region data for region "+regionId);
         }
      });
   },
   POST_NEW_RESOURCE: function() {
      var data = {
         region_id: DATA.CurrentRegionId,
         resource_id: $("#add-resource-input").data('resourceId'),
         top: $("#add-resource-popover").data('resourceAddingTop'),
         left: $("#add-resource-popover").data('resourceAddingLeft')
      };
      
      $.ajax({
         url: API.BASE + API.URI.REGION_RESOURCES,
         method: 'POST',
         data: data,
         passedData: data,
         success: function(returnJson) {
            console.log("Region resource added.");
            $("#add-resource-popover").hide();
            
            // Remove the data for the added resource image.
            $("#add-resource-popover").data('resourceAddingId', null);
         },
         error: function() {
            console.error("Error fetching region data for region "+regionId);
         }
      });
   },
   SETUP_REGION_SEARCH: function() {
      var suggestions = [];
      
      for(regionId in DATA.REGIONS) {
         var data = {
            label: DATA.REGIONS[regionId]["name"],
            value: regionId
         };
         
         suggestions.push(data);
      }
      
      $("#region-search").autocomplete({
      minLength: 1,
      source: suggestions,
      select: function(event, ui) {
         // Change the input value and store the id for sending to the back-end.
         $("#add-resource-input").val( ui.item.label ).data('resourceId', ui.item.value);
         
         return false;
      }
      })
      .autocomplete("instance")._renderItem = function(ul, item) {
         var option = $("<li>")
            .append("<div data-resource-id='" + item.value + "'>" + item.label + "</div>")
            .appendTo(ul);

         return option;
      };
   },
   SETUP_ITEM_SEARCH: function() {
      var suggestions = [];
      
      for(itemId in DATA.ITEMS) {
         var data = {
            label: DATA.ITEMS[itemId]["name"],
            value: itemId
         };
         
         suggestions.push(data);
      }
      
      $("#item-search").autocomplete({
      minLength: 1,
      source: suggestions,
      select: function(event, ui) {
         // Change the input value and store the id for sending to the back-end.
         $("#item-search").val( ui.item.label ).data('itemId', ui.item.value);
         
         return false;
      }
      })
      .autocomplete("instance")._renderItem = function(ul, item) {
         var option = $("<li>")
            .append("<div data-item-id='" + item.value + "'>" + item.label + "</div>")
            .appendTo(ul);

         return option;
      };
   },
};