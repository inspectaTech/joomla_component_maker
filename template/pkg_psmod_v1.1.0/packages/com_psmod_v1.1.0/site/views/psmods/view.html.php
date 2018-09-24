<?php
defined("_JEXEC") or die;

class PsmodViewPsmods extends JViewLegacy //class FolioViewFolios
{
    protected $items;

    public function display($tpl = null)
    {
        $this->items = $this->get("Items");

        if(count($errors = $this->get("Errors")))
        {
            JError::raiseError(500, implode("\n", $errors));
            return false;
        }

        //samples for connecting
        //works to add icons to mobile web app.
        /*$myDoc3 = JFactory::getDocument();
        $href1 = "/mirror/images/flame2x.png";
        $attribs1 = array("sizes" => "128x128");
        $myDoc3->addHeadLink( $href1, "shortcut icon", "rel", $attribs1 );*/

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


        //turn off the address bar for mobile web apps
        /*$myDoc1 = JFactory::getDocument();
        $myDoc1->setMetaData( "mobile-web-app-capable", "yes" );

        $myDoc2 = JFactory::getDocument();
        $myDoc2->setMetaData( "apple-mobile-web-app-capable", "yes" );*/

        //for best results delete templates favicon
        $myDoc5 = JFactory::getDocument();
        $href3 = "/mirror/images/favicon2.ico";
        $rel3 = "shortcut icon";
        $type3 = "image/vnd.microsoft.icon";
        $myDoc5->addFavicon($href3,$type3, $rel3);

        //$myDoc6 = new JDocumentHtml;
        //$myDoc6->addFavicon($href3,$type3);

        //sets document title override
        $myDoc6 = JFactory::getDocument();
        //$myTitle1 = array();
        $myDoc5->setHeadData(["title" => "Picture Show"]);//$myTitle1


		$fileLink = JFactory::getDocument();

		$styleLoc = JUri::base() . "components/com_psmod/xfiles/css/psmod_site.css";
        $fileLink->addStyleSheet($styleLoc);

		$scriptLoc = JUri::base() . "components/com_psmod/xfiles/js/psmod_site.js";
        $fileLink->addScript($scriptLoc);


        parent::display($tpl);


    }

}

