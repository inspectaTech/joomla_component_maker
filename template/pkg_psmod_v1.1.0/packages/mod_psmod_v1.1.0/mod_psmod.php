<?php
defined("_JEXEC") or die;

require_once __DIR__ . "/helper.php";

$list = mod_psmodHelper::getList($params);//mod_latestextensionsHelper
$moduleclass_sfx = htmlspecialchars($params->get("moduleclass_sfx"));
require JModuleHelper::getLayoutPath("mod_psmod",$params->get("layout","default"));//"mod_latestextensions"

$check_cnx = function($url)
{
	$chx_cnx = @fsockopen($url,80);
	if($chx_cnx)
	{
		fclose($chx_cnx);
		return true;
	}else
	{
		return false;
	}
};//check_cnx

		$release_version = "development";//production
		$module_name = "psmod";//without the "mod_"
		$module_css = JUri::base() .  "modules/mod_" . $module_name . "/xfiles/css/";
		$core = JUri::root() . "core/";
		$core_css = JUri::root() . "core/css/";
		$module_js = JUri::base() . "modules/mod_" . $module_name . "/xfiles/js/";
		$core_js = JUri::root() . "core/js/";

        //link JQuery mobile api
        $modLink = JFactory::getDocument();

				$cnx = $check_cnx("www.google.com");
		    $styleLoc = ($cnx) ? "https://fonts.googleapis.com/icon?family=Material+Icons" :
				($release_version == "production") ? $module_css . "material_icons.css" : $core_css . "material_icons.css" ;
				$modLink->addStyleSheet($styleLoc);

				$cnx = $check_cnx("www.w3schools.com");
				$styleLoc = ($cnx) ? "https://www.w3schools.com/w3css/4/w3.css" :
				($release_version == "production") ? $module_css . "w3.css" : $core_css . "w3.css";
				$modLink->addStyleSheet($styleLoc);


        $modStyleLoc = $module_css . $module_name . "_module.css";
        $modLink->addStyleSheet($modStyleLoc);

				$styleLoc = ($release_version == "production") ? $module_css . "psmod.css" : $core_css . "psmod.css";
				$modLink->addStyleSheet($styleLoc);

				//I want to load the angular, module and service first
				$cnx = $check_cnx("www.google.com");
				$scriptLoc = ($cnx) ? "https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js" :
				($release_version == "production") ? $module_js . "angular.min.js" : $core_js . "angular.min.js";
				$modLink->addScript($scriptLoc);

				$cnx = $check_cnx("www.w3schools.com");
				$scriptLoc = ($cnx) ?  "https://www.w3schools.com/lib/w3.js" :
				($release_version == "production") ? $module_js . "w3.js" : $core_js . "w3.js";
				$modLink->addScript($scriptLoc);


        //angularjs file
        $modScriptLoc = $module_js . $module_name . "_module.js";
				$modLink->addScript($modScriptLoc);


				$modScriptLoc = $module_js . $module_name . "_app.js";
				$modLink->addScript($modScriptLoc);

				$modScriptLoc = $module_js . $module_name . "_service.js";
				$modLink->addScript($modScriptLoc);


				$dir = ($release_version == "production") ? "modules/mod_" . $module_name . "/xfiles/tool_templates/" :
				"core/tool_templates/";//relative path works

				$template_name_array = [];
		    foreach (glob($dir ."*") as $filename) {
		      $my_filename = str_replace("../","",$filename);//this gets rid of '../' or '../core'
		        if(is_dir($filename))
		        {
		          //array_push($template_name_array,$url_prefix . $my_filename);
							//take the directory url and split it along its "/"
		          $file_ary = explode("/",$filename);
							//the directory wont have an .ext so take the last section of the array you
							//created above add it to an array of directory names.
		          $file_index = count($file_ary) - 1;
		          $targ_filename = $file_ary[$file_index];
		          array_push($template_name_array,$targ_filename);
		        }
		    }//foreach

				//add all the tool_templates in the tool_templates folder to document head script tags
				//use the template_name_array you created above to locate each tools directory
		    foreach ($template_name_array as $template_name) {
					foreach (glob($dir . $template_name . "/css/" . "*.css") as $filename) {
							//echo nl2br ("$filename size " . filesize($filename) . " \n");
							$modStyleLoc = $filename;//good it only loads once even with multiple instances of the module
							$modLink->addStyleSheet($modStyleLoc);
					}//foreach
		      foreach (glob($dir . $template_name . "/" . "*.js") as $filename) {
		          //echo nl2br ("$filename size " . filesize($filename) . " \n");
		          $modScriptLoc = $filename;//good it only loads once even with multiple instances of the module
		          $modLink->addScript($modScriptLoc);
		      }//foreach
		    }//end $template_name
