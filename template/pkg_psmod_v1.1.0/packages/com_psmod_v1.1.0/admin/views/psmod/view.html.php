<?php
defined("_JEXEC") or die;

class PsmodViewPsmod extends JViewLegacy //FolioViewFolio extends
{
    /*Im still looking for the thing that initiates this FolioViewFolio class
    maybe its in the joomla framwork to look for the component names, enter its
    it code into its naming framework and run the classes by referencing the
    component titles.
    */
    protected $item;

    protected $form;

    public function display($tpl = null)
    {
        $this->item = $this->get("Item");
        //used by edit.php to perform $this->form->getLabel();
        $this->form = $this->get("Form");

        if(count($errors = $this->get("Errors")))
        {
            JError::raiseError(500, implode("\n", $errors));
            return false;
        }

        /****** This code checks for an internet connection  *******/
        $connected = @fsockopen("www.google.com",80);
        if($connected)
        {
          $is_conn = true;
          fclose($connected);
        }else
        {
          $is_conn = false;
        }
        /****************** end connection checker  ****************/
        $release_version = "development";//production

		//use this to link js and css and inject scripts into the header
		$fileLink = JFactory::getDocument();
		// Note: "JUri::" works well online and offline without confusing "\" and "/"

    //$styleLoc = ($is_conn == true) ?  "https://www.w3schools.com/w3css/4/w3.css" :  JUri::root() . "core/css/w3.css";
    //$fileLink->addStyleSheet($styleLoc);

    $cnx = $this->check_cnx("www.w3schools.com");
    $styleLoc = ($cnx) ? "https://www.w3schools.com/w3css/4/w3.css" :
    ($release_version == "production") ? JUri::base() . "components/com_psmod/xfiles/css/w3.css" :JUri::root() . "core/css/w3.css";
    $fileLink->addStyleSheet($styleLoc);



    //$styleLoc = "https://fonts.googleapis.com/icon?family=Material+Icons";
    //$fileLink->addStyleSheet($styleLoc);

    $styleLoc = ($release_version == "production") ? JUri::base() . "components/com_psmod/xfiles/css/material_icons.css" : JUri::base() . "components/com_psmod/xfiles/css/material_icons.css" ;
    $fileLink->addStyleSheet($styleLoc);

    $styleLoc = ($release_version == "production") ? JUri::base() . "components/com_psmod/xfiles/css/psmod.css" : "../core/css/psmod.css";
    $fileLink->addStyleSheet($styleLoc);

    $styleLoc = ($release_version == "production") ? JUri::base() . "components/com_psmod/xfiles/css/d3po_BTK.css" : JUri::root() . "d3po_BTK/d3po_BTK.css";
    $fileLink->addStyleSheet($styleLoc);

    $styleLoc = ($release_version == "production") ? JUri::base() . "components/com_psmod/xfiles/css/d3po_ITK.css": JUri::root() . "d3po_ITK/d3po_ITK.css";
    $fileLink->addStyleSheet($styleLoc);

    $styleLoc = ($release_version == "production") ? JUri::base() . "components/com_psmod/xfiles/css/icon.css" : JUri::root() . "core/css/icon.css";
    $fileLink->addStyleSheet($styleLoc);

    //js link
    $scriptLoc = ($is_conn == true) ? "https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js" : JUri::root() . "core/js/angular.min.js";
    $fileLink->addScript($scriptLoc);

    $cnx = $this->check_cnx("www.google.com");
    $styleLoc = ($cnx) ? "https://ajax.googleapis.com/ajax/libs/jquerymobile/1.4.5/jquery.mobile.min.css" :
    ($release_version == "production") ? JUri::base() . "components/com_psmod/xfiles/css/jquery.mobile-1.4.5.min.css" : JUri::root() . "core/css/jquery.mobile-1.4.5.min.css";
    $fileLink->addStyleSheet($styleLoc);


    //$scriptLoc = "https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.js";
    //$fileLink->addScript($scriptLoc);


    $cnx = $this->check_cnx("cdnjs.cloudflare.com");
    $scriptLoc =  ($cnx) ? "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js" : JUri::base() . "components/com_psmod/xfiles/js/jquery-1.12.3.min.js";
    $fileLink->addScript($scriptLoc);

    //here is where you get the jquery mobile download files
    //https://jquerymobile.com/download/

    /*
    $cnx = $this->check_cnx("www.google.com");
    $scriptLoc = ($cnx) ? "https://ajax.googleapis.com/ajax/libs/jquerymobile/1.4.5/jquery.mobile.js" :
    ($release_version == "production") ? JUri::base() . "components/com_psmod/xfiles/js/jquery.mobile-1.4.5.min.js" : JUri::root() . "core/js/jquery.mobile-1.4.5.min.js";
    $fileLink->addScript($scriptLoc);
    */

    //involke the noconflict method
    //https://www.w3schools.com/jquery/jquery_noconflict.asp
    //https://api.jquery.com/jquery.noconflict/
    $fileLink->addScriptDeclaration('if(typeof $ == "function" && !jQuery()){console.log("$ = ",$); $.noConflict();console.log("jQuery noConflict invoked");}; if(jQuery){console.log("JQuery = ",jQuery)}');

    $cnx = $this->check_cnx("www.w3schools.com");
    $scriptLoc = ($cnx) ?  "https://www.w3schools.com/lib/w3.js" :
    ($release_version == "production") ? JUri::base() . "components/com_psmod/xfiles/js/w3.js" :JUri::root() . "core/js/w3.js";
    $fileLink->addScript($scriptLoc);

    $scriptLoc = ($release_version == "production") ? JUri::base() . "components/com_psmod/xfiles/js/d3po_BTK.js" : JUri::root() . "d3po_BTK/d3po_BTK.js";
    $fileLink->addScript($scriptLoc);

    $scriptLoc = ($release_version == "production") ? JUri::base() . "components/com_psmod/xfiles/js/d3po_ITK.js" : JUri::root() . "d3po_ITK/d3po_ITK.js";
    $fileLink->addScript($scriptLoc);
    $scriptLoc = JUri::base() . "components/com_psmod/xfiles/js/init.js";
    $fileLink->addScript($scriptLoc);

    $scriptLoc = JUri::base() . "components/com_psmod/xfiles/js/app.js";
    $fileLink->addScript($scriptLoc);

    $scriptLoc = JUri::base() . "components/com_psmod/xfiles/js/tinyColor.js";
    $fileLink->addScript($scriptLoc);

    $scriptLoc = JUri::base() . "components/com_psmod/xfiles/js/ngEnter.dir.js";
    $fileLink->addScript($scriptLoc);

    $scriptLoc = JUri::base() . "components/com_psmod/xfiles/js/module.js";
    $fileLink->addScript($scriptLoc);

    $scriptLoc = JUri::base() . "components/com_psmod/xfiles/js/form.js";
    $fileLink->addScript($scriptLoc);

    $scriptLoc = JUri::base() . "components/com_psmod/xfiles/js/scene.js";
    $fileLink->addScript($scriptLoc);

    $scriptLoc = JUri::base() . "components/com_psmod/xfiles/js/select.js";
    $fileLink->addScript($scriptLoc);

    $scriptLoc = JUri::base() . "components/com_psmod/xfiles/js/data.js";
    $fileLink->addScript($scriptLoc);

    $scriptLoc = JUri::base() . "components/com_psmod/xfiles/js/assets.js";
    $fileLink->addScript($scriptLoc);

    $scriptLoc = JUri::base() . "components/com_psmod/xfiles/js/assets_dir.js";
    $fileLink->addScript($scriptLoc);

    $scriptLoc = JUri::base() . "components/com_psmod/xfiles/js/ordering.js";
    $fileLink->addScript($scriptLoc);

    $scriptLoc = JUri::base() . "components/com_psmod/xfiles/js/page.js";
    $fileLink->addScript($scriptLoc);

    $scriptLoc = JUri::base() . "components/com_psmod/xfiles/js/page_dir.js";
    $fileLink->addScript($scriptLoc);

    $scriptLoc = JUri::base() . "components/com_psmod/xfiles/js/tools.js";
    $fileLink->addScript($scriptLoc);

    $scriptLoc = JUri::base() . "components/com_psmod/xfiles/js/tools_dir.js";
    $fileLink->addScript($scriptLoc);

    $scriptLoc = JUri::base() . "components/com_psmod/xfiles/js/stick_n_move_dir.js";
    $fileLink->addScript($scriptLoc);

    $scriptLoc = JUri::base() . "components/com_psmod/xfiles/js/color.ctrlr.js";
    $fileLink->addScript($scriptLoc);

    $scriptLoc = JUri::base() . "components/com_psmod/xfiles/js/color.dir.js";
    $fileLink->addScript($scriptLoc);


    //$scriptLoc = JUri::base() . "components/com_psmod/xfiles/js/manual_slideshow.js";
    //$fileLink->addScript($scriptLoc);


    //this doesn't work bc angular has to be loaded in a certain order
    //controllers have to be loaded b4 directives .ctrlr.js b4 .dir.js also .svc.js
    //put them into an array in order and do a forEach
    /* //fix this at some point
    $dir = "components/com_psmod/xfiles/js/";

      foreach (glob($dir . "*dir.js") as $filename) {
          //echo nl2br ("$filename size " . filesize($filename) . " \n");
          $scriptLoc = JUri::base() . $filename;//good it only loads once even with multiple instances of the module
          $fileLink->addScript($scriptLoc);
      }//foreach

      foreach (glob($dir . "*.js") as $filename) {
          //echo nl2br ("$filename size " . filesize($filename) . " \n");
          $scriptLoc = JUri::base() . $filename;//good it only loads once even with multiple instances of the module
          $fileLink->addScript($scriptLoc);
      }//foreach
      */


    //get a list of the template directories

    $dir = ($release_version == "production") ? "components/com_psmod/xfiles/tool_templates/" :
    "../core/tool_templates/";//relative path works - but this one needs to go out to the root dir
    $template_name_array = [];
    foreach (glob($dir ."*") as $filename) {
      $my_filename = str_replace("../","",$filename);//this gets rid of '../' or '../core'
        if(is_dir($filename))
        {
          //array_push($template_name_array,$url_prefix . $my_filename);
          $file_ary = explode("/",$filename);
          $file_index = count($file_ary) - 1;
          $targ_filename = $file_ary[$file_index];
          array_push($template_name_array,$targ_filename);
        }
    }//foreach

    foreach ($template_name_array as $template_name) {
      foreach (glob($dir . $template_name . "/css/" . "*.css") as $filename) {
          //echo nl2br ("$filename size " . filesize($filename) . " \n");
          $styleLoc = $filename;//good it only loads once even with multiple instances of the module
          $fileLink->addStyleSheet($styleLoc);
      }//foreach
      foreach (glob($dir . $template_name . "/" . "*.js") as $filename) {
          //echo nl2br ("$filename size " . filesize($filename) . " \n");
          $scriptLoc = $filename;//good it only loads once even with multiple instances of the module
          $fileLink->addScript($scriptLoc);
      }//foreach
    }//end $template_name

		//other ways to inject a script directly into the header.
		//$JQMLink->addScriptDeclaration("alert(\" JPATH COMPONENT = " . JPATH_COMPONENT . "\");");
        //JFactory::getDocument()->addScriptDeclaration("alert(\" DIR = " . __DIR__ . "\");");


        $this->addToolbar();
        parent::display($tpl);

    }

    function check_cnx($url)
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
    }//check_cnx

    protected function addToolbar()
    {

        JFactory::getApplication()->input->set("hidemainmenu", true);
        //take this away later and see what happens

        JToolbarHelper::title(JText::_("COM_PSMOD_MANAGER_PSMOD"), ""); //"COM_FOLIO_MANAGER_FOLIO"

        //important changed from psmod.save to psmod.apply for module save feature
        //change it back to psmod.save if you don't need the module creation feature
        JToolbarHelper::save("psmod.apply"); //"folio.save"


        if(empty($this->item->id))
        {
            JToolbarHelper::cancel("psmod.cancel"); //"folio.cancel"
        }
        else
        {
            JToolbarHelper::cancel("psmod.cancel","JTOOLBAR_CLOSE"); //folio.cancel
        }

    }

}
