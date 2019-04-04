<?php
   include_once('./include/header.php');
   include_once('./include/nav.php');
?>

   <div id="main-container" class="container-fluid">
      <div class="row row-space">
         <div class="col-xs-12">
            <div class="input-group">
               <input id="item-search" type="text" class="form-control hidden" placeholder="Item name">
            </div>
            <div class="btn-group" role="group" aria-label="...">
               <button type="button" class="btn btn-primary shadow">
                  <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                  Add Item
               </button>
            </div>
         </div>
      </div>
      <div class="row">
         <div class="col-xs-12">
            <table id="table-items" class="table table-striped table-hover table-condensed">
               <thead>
                  <tr>
                     <th></th>
                     <th data-column="name">Name</th>
                     <th data-column="item_category_id">Category</th>
                     <th data-column="item_subcategory_id">Subcategory</th>
                     <th data-column="tier_id">Tier</th>
                  </tr>
               </thead>
               <tbody>
                  <!-- dynamically populated -->
               </tbody>
            </table>
         </div>
      </div>
   </div>
   
   <script src="./js/page_items.js?t=<?=filemtime('./js/page_items.js');?>"></script>
</body>
</html>