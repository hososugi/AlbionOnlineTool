<?php
header('Content-Type: application/json');

include_once($_SERVER['DOCUMENT_ROOT'].'/mysql_connection.php');

if($_SERVER['REQUEST_METHOD'] === 'GET') {
   $return_json = array();
   
   // Set up the query.
   $query = "SELECT reg_res.*
         ,res.`image`
      FROM `albion`.`region_resources` reg_res
      LEFT JOIN `albion`.`resources` res
         ON res.`resource_id` = reg_res.`resource_id`
      WHERE 1=1";  
   
   //echo $query . "\n";
   
   // Check if GET values were passed.
   if(isset($_GET['region_id'])){
      $query .= " AND reg_res.region_id = {$_GET['region_id']} ";
   } 

   $results = $db->query($query);

   while($row = $results->fetch_assoc()){
      array_push($return_json, $row);
   }

   echo json_encode($return_json);
}
else if($_SERVER['REQUEST_METHOD'] === 'POST') {
   $return_json = array();
      
   // Check if GET values were passed.
   $region_id     = $_POST['region_id'];
   $resource_id   = $_POST['resource_id'];
   $top           = $_POST['top'];
   $left          = $_POST['left'];
   
   // Make sure everything was passed.
   if(isset($region_id) && isset($resource_id) && isset($top) && isset($left)) {
      $query = "INSERT INTO `albion`.`region_resources`
         (`region_id`, `resource_id`, `top`, `left`)
         VALUES
         ($region_id, $resource_id, $top, $left)";
      
      //$db->query($query);
      mysqli_query($db, $query);
      
      mysqli_commit($db);
      
      $return_json["pass"] = "Inserted resource: $query";
   }
   else {
      $return_json["error"] = "An error occured.";
   }

   echo json_encode($return_json);
}
?>