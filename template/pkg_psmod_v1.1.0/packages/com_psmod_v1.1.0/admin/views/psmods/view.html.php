<?php
defined("_JEXEC") or die;

class PsmodViewPsmods extends JViewLegacy  //class FolioViewFolios
{
    protected $items;


    public function display($tpl = null)
    {

        $this->items = $this->get("items");

        if(count($errors = $this->get("Errors")))
        {
            JError::raiseError(500, implode("\n", $errors));
            return false;
        }

        $this->addToolbar();
        parent::display($tpl);

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

		$fileLink = JFactory::getDocument();

		$scriptLoc2 = JUri::base() . "components/com_psmod/xfiles/js/psmods.js";
		$fileLink->addScript($scriptLoc2);

		$styleLoc2 = JUri::base() . "components/com_psmod/xfiles/css/psmods.css";
		$fileLink->addStyleSheet($styleLoc2);



		/**************************  PAGE MAKER  ****************************/
		//Script used to create a siteside page on arrival to components admin page

		//Requires a table that can create nested sets for the lft and rgt fields in the menu table
		//if it doesn"t run this
        JTable::addIncludePath(JPATH_COMPONENT . "/tables");
        //$JQMLink = JFactory::getDocument();

        $table = JTable::getInstance("nestedsets","Table");
        $table2 = JTable::getInstance("menumaker","Table");

		/************************  CHECK TEMPLATE  *************************/
		//gets template id to add to menu table record
		$desired_template_name = "mobilemenu";

        $templateId = $table->checkTemplateData($desired_template_name);
        //$JQMLink->addScriptDeclaration("alert(\"the template id is ". $templateId ."\");");
        if($templateId == "false")
        {
            $templateId = 0;
        }
        /************************  END TEMPLATE  *************************/

       /************************  CHECK COMPONENT  *************************/
        /*gets component id to add to menu table data - no need for parameters. the component it checks
		for should have same name as this component*/

        $componentId = $table->checkComponentData();
        //$JQMLink->addScriptDeclaration("alert(\"the extension id is ". $componentId ."\");");
        if($componentId == "false")
        {
            //i many need to create an error message here
            $componentId = 0;
        }
        /************************  END COMPONENT  *************************/


		/************************  CHECK MENU DATA  *************************/
        //for menu_types table
		//creates its own MAIN MENU
        $menuId = $table2->checkMenuData();
        //$JQMLink->addScriptDeclaration("alert(\"the menu id is ".$menuId."\");");

        //checks for table data and adds data
        //this should be done when the component is installed but if not.
        if($menuId == "false")
        {
            $mD = array("menutype" => "psmodmenu","title" => "psmod Menu",
            "description" => "Private test menu for the private Picture show test page");
            $table2->getTableName("menu_types");
            $table2->save($mD);
           // $table->bind($mD);
            //$table->store();
            $menuId = $table2->checkMenuData();


            //$JQMLink->addScriptDeclaration("alert(\"the menu id is ".$menuId."\");");

        }//end if

        /************************  END CHECK MENU DATA  *************************/



		/************************  CHECK MENU ITEM DATA  *************************/
		/* !!!! THE MAIN EVENT !!!! */
		//This and the file above but mainly this is the true purpose of this section of code
		//creates a menu dynamically for this component which will result in a siteside page being available
		//creates a menu item for the new main menu

        $menuItemId = $table->checkMenuItemData();

       //$JQMLink->addScriptDeclaration("alert(\"the item id is ".$menuItemId."\");");

        //checks for table data and adds data
        if($menuItemId == "false")
        {
            $mID = array("title" => "Picture Show","menutype" => "psmodmenu","alias" => "picture-show",
            "path"=>"picture-show","link" => "index.php?option=com_psmod&view=psmods",
            "type" => "component","published" => "1", "parent_id" => "1", "level" => "1", "language" => "*",
            "access" => "1","template_style_id" => $templateId, "component_id" => $componentId);
            $table->getTableName("menu");
            //note the alias and path are both not only case sensitive but must be lower case.
            //It can be written in any case but joomla only correctly processes the alias" that are lower case for page views
            // I spent hours with this little detail

            //everything else is not needed ->save() does them all automagically
            //$table->bind($sd); //$table->store(); //$table->rebuild(); //$table->rebuildPath($menuItemId);

            $table->setLocation("1","last-child");
            $table->save($mID);

            //$menuItemId = $table->checkMenuItemData();


            //$JQMLink = JFactory::getDocument();
            //$JQMLink->addScriptDeclaration("alert(\"the item id is ".$menuItemId."\");");

        }//end if

        /************************  END CHECK MENU ITEM DATA  *************************/






    }//end display

    protected function addToolbar()
    {

        $canDo = PsmodHelper::getActions(); //$canDo = FolioHelper::getActions();
        /*
          $can_str = var_export($canDo);
          //returns:
          // JObject::__set_state(array( "_errors" => array ( ), "core.admin" => true, "core.manage" => true, "core.create" => true,
          // "core.delete" => true, "core.edit" => true, "core.edit.state" => true, "core.edit.own" => true, ))
        */

        $bar = JToolBar::getInstance("toolbar");

        //may need a capital B as in JToolBarHelper
        $twitt =
        //JToolbarHelper::title(JText::_("COM_FOLIO_MANAGER_FOLIOS"), "");
        JToolbarHelper::title(JText::_("COM_PSMOD_TITLE_PSMOD"), "");
        JToolbarHelper::addNew("psmod.add");/*adds the "new" button to the folio screen*/ //"folio.add"

            if($canDo->get("core.edit"))
            {
                JToolbarHelper::editList("psmod.edit"); //folio.edit - adds edit button
            }
            if($canDo->get("core.admin"))
            {
                JToolbarHelper::preferences("com_psmod"); //com_folio - adds option button
            }
            if($canDo->get("core.delete"))
            {
                JToolbarHelper::deleteList("","psmods.delete","JTOOLBAR_DELETE");//this controls what is written on the delete btn
            }
        }
    }
