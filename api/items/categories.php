<?php
header('Content-Type: application/json');

include_once($_SERVER['DOCUMENT_ROOT'].'/mysql_connection.php');

if($_SERVER['REQUEST_METHOD'] === 'GET') {
   $return_json = array("data" => array());

   // Set up the query.
   $query = "SELECT *
      FROM `albion`.`item_categories`
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