<?php
defined("_JEXEC") or die;
//JSession::checkToken() or die( "Invalid Token" );//doesn't work
//isset($_POST["menu_data2"]) or die("nope, nothing");

//Disappearing post issue:
//var_dump($_REQUEST);
//print_r($_POST);
//print_r($_GET);
//print_r($_SERVER['REQUEST_METHOD']);
/*ultimately this fixed the issue (showed that the request mothod was
being changed to $_GET)*/
?>
<div id="popup_holder" class="popup_holder" >

</div><!-- href="#d3_popup" -->
<a class="d3_cnxs test_yellow ui-btn ui-corner-all"  data-rel="popup" data-position-to="window" data-transition="pop" onclick="$(\"#d3_popup\").popup();$(\"#d3_popup\").popup(\"open\");
">Link</a>
<div class="d3_communities"  ></div>
<script>
window["SITEURL"] = "<?php echo JUri::current(); ?>";
//console.info("site url = " + SITEURL);//

window["FORM_TOKEN"] = "<?php echo JSession::getFormToken(); ?>";
//getFakeArcData("123");
//arc_setTheStage();

/****** This code checks for an internet connection  *******/
window["CNX_STATUS"] = "<?php
  $connected = @fsockopen("www.google.com",80);

  if($connected)
  {
    //$is_conn = true;
    $is_conn = "online";
    fclose($connected);
  }else
  {
    //$is_conn = false;
    $is_conn = "offline";
  }
   echo $is_conn;
?>";
/****************** end connection checker  ****************/

window["IMG_URL"] = "<?php echo JUri::root(); ?>components/com_arc/xfiles/images/";

//window["HOME_URL"] =  "<?php echo JUri::root(); ?>index.php/psmod/home";//see view.html.php
//console.info("home url = " + HOME_URL);

screen.orientation.lock("portrait-primary").catch(function(){});

//this removes all the endless hashs added to the address to make an extremely lengthly url
location.hash = "";
//getFakeArcData("123");
d3_create_panel({"home":"popup_holder","panel_name":"d3_panel","popup_name":"d3_popup"});
</script>
