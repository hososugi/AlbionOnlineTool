
$(document).ready(function(){
   setupNav("#nav-map");
   
   DATA.GET_REGIONS();
   DATA.GET_RESOURCES();
   setupMapContainer();
   setupMapAddButton();
   
   $('#map-container').svg({onLoad: SVG_DATA.ON_LOAD});
});