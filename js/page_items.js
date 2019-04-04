$(document).ready(function(){
   setupNav("#nav-items");
   
   displayItems();
});

function displayItems() {
   /*
   // Get the header data.
   var columns = [];
   $("#table-items th").each(function() {
      var column = $(this).data('column');
      
      if(column)
         columns.push(column);
   });
   
   // Create the table rows.
   for(itemIndex in itemData) {
      var tr = $("<tr/>")
         .attr('data-id', itemData[itemIndex]['item_id'])
         .data('id', itemData[itemIndex]['item_id'])
         .appendTo("#table-items tbody");
      
      // Image
      var td = $("<td/>")
         .appendTo(tr);
         
      if(itemData[itemIndex]["image"] != null) {
         $("<img/>", {
               src: './images/resources/'+itemData[itemIndex]["image"]
            })
            .addClass('mini')
            .appendTo(td);
      }
            
         
      // All the text.
      for(columnIndex in columns) {
         var column = columns[columnIndex];
         
         var columnText = "";
         if(column in itemData[itemIndex]) {
            columnText = itemData[itemIndex][column];
         }
         
         $("<td/>")
         .text(columnText)
         .appendTo(tr);
         
      }
   }*/
   
   
   $("#table-items").DataTable( {
      "ajax": API.BASE + API.URI.ITEMS,
      "columns": [
         {
            "data": "image",
            "orderable": false,
            "searchable": false,
            "render": function(data, type, full, meta) {
               var image = '';
               
               if(data != null) {
                  image = $("<img/>", {src: './images/resources/'+data}).addClass('mini');
               }
               
               return $('<div>').append(image).html();
            }
         },
         {"data": "name"},
         {"data": "category_name"},
         {"data": "subcategory_name"},
         {"data": "tier_id"}
      ],
      "order": [[ 1, "asc" ]]
   });
}