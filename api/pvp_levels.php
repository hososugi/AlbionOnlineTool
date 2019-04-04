<?php
header('Content-Type: application/json');

include_once($_SERVER['DOCUMENT_ROOT'].'/mysql_connection.php');

if($_SERVER['REQUEST_METHOD'] === 'GET') {
   $return_json = array();

   // Set up the query.
   $query = "SELECT *
      FROM `albion`.`php_levels`
      ORDER BY `name` ASC";

   $results = $db->query($query);

   while($row = $results->fetch_assoc()){
      array_push($return_json, $row);
   }

   echo json_encode($return_json);
}
?>