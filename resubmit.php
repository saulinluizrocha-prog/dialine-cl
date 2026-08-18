<?php
     $order = array ();
     foreach ($_POST as $key => $value) {
           if ($value != '') {
                $order[$key] = $value;
            }
      }
      // Define ip
      if (!empty($_SERVER['HTTP_CF_CONNECTING_IP'])) {
          $ip =  $_SERVER['HTTP_CF_CONNECTING_IP'];
      }  elseif (!empty($_SERVER['HTTP_X_REAL_IP'])) {
         $ip =  $_SERVER['HTTP_X_REAL_IP'];
      } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
          $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
      } else {
          $ip =  $_SERVER['REMOTE_ADDR'];
      }

      $ips = explode(",", $ip);
      $order['ip'] = trim($ips[0]);

      $parsed_referer = parse_url($_SERVER['HTTP_REFERER'], PHP_URL_QUERY);
      parse_str($parsed_referer, $referer_query);

      $ch = curl_init();

      $url = str_replace(':id', $order['order_id'], 'https://tracker.everad.com/conversion/:id/phone');

      curl_setopt($ch, CURLOPT_URL, $url );

      curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );
      curl_setopt($ch, CURLOPT_PUT,           1 );
      curl_setopt($ch, CURLOPT_HEADER,           0 );
      curl_setopt($ch, CURLOPT_POSTFIELDS,     http_build_query(array_merge($referer_query, $order)) );
      curl_setopt($ch, CURLOPT_HTTPHEADER,     array('Content-Type: application/x-www-form-urlencoded'));

      $result = curl_exec ($ch);

      if ($httpCode >= 400) {
          echo "Submit failed!";
      } else {
        header('Content-Type: application/json');
        echo json_encode($result);
      }

?> 