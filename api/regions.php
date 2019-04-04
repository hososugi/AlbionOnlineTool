<?php
header('Content-Type: application/json');

include_once($_SERVER['DOCUMENT_ROOT'].'/mysql_connection.php');

if($_SERVER['REQUEST_METHOD'] === 'GET') {
   $return_json = array();

   // Set up the query.
   $query = "SELECT *
      FROM `albion`.`regions`
      WHERE 1=1";
      
   // Check if GET values were passed.
   if(isset($_GET['region_id'])){
      $query .= " AND region_id = {$_GET['region_id']} ";
   }
   
   $query .= " ORDER BY `name` ASC";

   $results = $db->query($query);

   while($row = $results->fetch_assoc()){
      //array_push($return_json, $row);
      $return_json[$row['region_id']] = $row;
   }

   echo json_encode($return_json);
}
?>