<?php
header('Content-Type: application/json');

include_once($_SERVER['DOCUMENT_ROOT'].'/mysql_connection.php');

if($_SERVER['REQUEST_METHOD'] === 'GET') {
   $return_json = array("data" => array());

   // Set up the query.
   $query = "SELECT i.item_id
         ,i.name
         ,i.tier_id
         ,i.image
         ,cat.item_category_id AS category_id
         ,cat.name AS category_name
         ,subcat.item_category_id AS subcategory_id
         ,subcat.name AS subcategory_name
      FROM `albion`.`items` i
      LEFT JOIN `albion`.`item_categories` cat
         ON cat.item_category_id = i.item_category_id
      LEFT JOIN `albion`.`item_categories` subcat
         ON subcat.item_category_id = i.item_subcategory_id
      WHERE 1=1 ";
      
   // Check if GET values were passed.
   if(isset($_GET['orderby'])){
      $query .= " ORDER BY {$_GET['orderby']} ";
   }
   else {
      $query .= " ORDER BY `name` ";
   }
   
   if(isset($_GET['limit'])){
      $query .= " LIMIT {$_GET['limit']} ";
   }
   
   $results = $db->query($query);

   while($row = $results->fetch_assoc()){
      array_push($return_json["data"], $row);
   }

   echo json_encode($return_json);
}
?>