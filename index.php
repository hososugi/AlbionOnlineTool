<?php
   include_once('./include/header.php');
   include_once('./include/nav.php');
?>

   <div id="map-container" class="container-fluid">
      <div id="floating-buttons" class="" role="group" aria-label="...">
         <div class="btn-group pull-left shadow">
            <button id="floating-map" type="button" class="btn btn-default">
               <span class="glyphicon glyphicon-globe" aria-hidden="true"></span> Map
            </button>
            <button id="floating-add" type="button" class="btn btn-default">
               <span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Add
            </button>
         </div>
         <div class="form-group pull-left shadow">
            <input id="region-search" type="text" class="form-control" placeholder="Switch regions">
         </div>
      </div>
      <!-- svg is created dynamically. -->
   </div>
   
   <div id="add-resource-popover" class="popover fade right in">
      <div class="arrow"></div>
      <div class="popover-title">
         Add Resource
      </div>
      <div class="popover-content">
         <div class="row">
            <div class="col-xs-12">
               <input id="add-resource-input" type="text" class="form-control" placeholder="Resource" />
            </div>
         </div>
      </div>
      <div class="popover-footer pull-right">
         <div class="row">
            <div class="col-xs-12">
               <button id="add-resource-btn-cancel" type="button" class="btn btn-default btn-sm">Cancel</button>
               <button id="add-resource-btn-add" type="button" class="btn btn-primary btn-sm">Add</button>
            </div>
         </div>
      </div>
   </div>
   
   
   <script src="./js/page_map.js?t=<?=filemtime('./js/page_map.js');?>"></script>
</body>
</html>
