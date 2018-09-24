<?php
defined("_JEXEC") OR die;/*stops page from being accessed directly*/

/*class for the controller. component name folled my controller*/

/*Creating the controllers
b.Loc 1921
*/

class PsmodController extends JControllerLegacy
{
    //FolioController extends JControllerLegacy
    protected $default_view = "psmods";//folios

    public function display($cachable = false, $urlparams = false)
    {require_once JPATH_COMPONENT."/helpers/psmod.php";//folio

    $view = $this->input->get("view","psmods");//folios
    $layout = $this->input->get("layout","default");

     $id = $this->input->getInt("id");

      if($view == "psmod" && $layout == "edit" &&  !$this->checkEditId("com_psmod.edit.psmod", $id))//com_folio.edit.folio"
      {//$view == "folio"
          $this->setError(JText::sprintf("JLIB_APPLICATION_ERROR_UNHELD_ID",$id));
          $this->setMessage($this->getError(),"error");
          $this->setRedirect(JRoute::_("index.php?option=com_psmod&review=psmods", false));//?option=com_folio  &review=folios"

          return false;
          }

          parent::display();

          return $this;
      }//end display

        function uCheck()
        {
          JSession::checkToken( "get" ) or die( "Invalid Token" );
          //checks to see if the title is unique
            //$targTitle = $_POST["title"];

            //works for regular post data ajax call
            $postData = JFactory::getApplication()->input->post;
      			$uCheckData = $postData->get('data', 'defaultvalue', 'filter');
            //echo "uCheckData = " . $uCheckData;
            //return;

            if($uCheckData == "defaultvalue"){
              $postData = JFactory::getApplication()->input->json;
              $uCheckData = $postData->get('data','no such thing','RAW');
            }
            //echo $targTitle;
            //return;//works


            JTable::addIncludePath(JPATH_COMPONENT . "/tables");
            $table = JTable::getInstance("menumaker","Table");
            $menuId = $table->checkUniqueData($uCheckData);

            echo $menuId;//this works though

        }//end uCheck

        function saveModule()
        {
            JSession::checkToken( "get" ) or die( "Invalid Token" );
            JTable::addIncludePath(JPATH_COMPONENT . "/tables");
            $table = JTable::getInstance("moduleassets","Table");

            /*$menu_title = $_POST["menu_title"];
            $menu_id = $_POST["menu_id"];
            $dataStr = $_POST["data_string"];*/

            //works for regular post data ajax call
            $postData = JFactory::getApplication()->input->post;
            $searchStr = $postData->get('data', 'invalid data', 'filter');//NOTE!! stringifies when uploaded

            if($searchStr == 'invalid data'){echo $searchStr; return;}
            //echo $searchStr; return;

            $searchObj = json_decode($searchStr);
            $menu_title = $searchObj->menu_title;
            $menu_id = $searchObj->menu_id;
            $dataStr = $searchObj->data_string;
            $page_ids = $searchObj->page_ids;


            /*if($menu_id == 0)
            {
                $result = $table->preSaveMenu($dataStr);
            }*/


            //check for existence of module - can be used if the menu saves and the module doesn"t
            //this checker is to make sure the absent module_id wasn"t due only to an error

            //aleady has a module
            $module_id = $table->getModuleId($menu_id);//what if there is a menu_id of 0?

            $init_id = "initial menu id = " . $menu_id;//initial id = false
            $init_mod = "initial module id = " . $module_id;//initial id = false
            $init_data = "initial data = " . $dataStr;

            if($module_id == "false")
            {
                //does not have a module id
                $menu_id = $table->saveNewModule($dataStr);

                if($menu_id != "false")
                {
                    //has a menu id
                    $module_id = $table->getModuleId($menu_id);
                }//end if
            }//end if

            if($menu_id != "false" && $module_id != "false")
            {//has a menu id & has a module id

                //save new asset to asset table
                $name_str = "com_modules.module." . $module_id;
                $asset_id = $table->getAssetId($name_str);
                if($asset_id == "false" && $module_id != "false")
                {
                    //has a module id does not have an asset id

                    $mID = array("parent_id" => "18","level" => "2","name" => $name_str,
                    "title" => $menu_title,
                    'rules' => '{"core.delete":{"6":1},"core.edit":{"6":1,"4":1},"core.edit.state":{"6":1,"5":1},"module.edit.frontend":[]}'
                    );
                    $table->getTableName("assets");
                    $table->setLocation("18","last-child");//i don"t remember what this does
                    $table->save($mID);

                    //get asset_id
                    $asset_id = $table->getAssetId($name_str);

                     //save module_id in psmod table
                    if($asset_id != "false" && $module_id != "false")
                    {
                        $updateMsg = $table->updateTables($asset_id,$module_id,$menu_id,$dataStr);//8 124 67

                    }//end if
                }//end if asset_id


                if($asset_id != "false" && $module_id != "false")
                {
                    $updateModMsg = $table->updateModule($module_id,$menu_id,$dataStr);//8 124 67

                }//end if

                $mod_menu = $table->checkModMenu($module_id);
                if($mod_menu == "false")
                {
                    //just in case they were accidentally removed - reset to all pages.
                    //$mod_menu = $table->updateModMenu($module_id);
                }//end if

                  $page_ids = $table->processPages($module_id,$page_ids);

            }//end if($menu_id !=
                echo '{"menu_id":"' . $menu_id . '","module_id":"' . $module_id . '"}' ;//this works
                //echo '{"menu_id":"" . $menu_id . "","module_id":"" . $module_id . "","init_mod":"" . $init_mod . "","init_data":"" . $init_data . "","init_id":"".$init_id.""}' ;//test area

                return;
                //the below json code doesn"t parse correctly double quotes are better for the object parameters
                //echo '{"menu_id":"" . $menu_id . "","module_id":"" . $module_id . ""}' ;
                //echo $menu_id;

        }//end saveModule

        function getModuleData()
        {

            JSession::checkToken( "get" ) or die( "Invalid Token" );
            JTable::addIncludePath(JPATH_COMPONENT . "/tables");
            $table = JTable::getInstance("moduleassets","Table");


            $module_id = $_POST["module_id"];

            $moduledata = $table->getModuleData($module_id);

            echo $moduledata;


        }//end getModuleData

        function deleteModule()
        {
            JSession::checkToken( "get" ) or die( "Invalid Token" );
            JTable::addIncludePath(JPATH_COMPONENT . "/tables");
            $table = JTable::getInstance("moduleassets","Table");
            //echo "module string = " . $_POST["id_str"];
            //echo "\n module number is " . $_POST["module_number"];

            $module_number = $_POST["module_number"];

            if($module_number == "1")
            {
                $module[0] = $_POST["id_str"];
            }
            else
            {
                $module = explode(",",$_POST["id_str"]);
            }

            $delete_results = $table->deleteElements($module);

            echo "results are in " . $delete_results;

        }//end deleteModule

        function getUrls()
        {
          //what does this do? - i think this is dummy text
            JSession::checkToken( "get" ) or die( "Invalid Token" );
            JTable::addIncludePath(JPATH_COMPONENT . "/tables");
            $table = JTable::getInstance("moduleassets","Table");

            $title = $_POST["title"];
            $menuStr = $table->getUrls($title);

            echo $menuStr;

        }//end getUrls

        function ps_upload()
        {
            JSession::checkToken( "get" ) or die( "Invalid Token" );
            JTable::addIncludePath(JPATH_COMPONENT . "/tables");
            $table = JTable::getInstance("moduleassets","Table");

            //echo "ps_add running!";//its working - using angularjs service

            //now for a new (more secure)  way to get $_POST data

            //var_dump($app);

            $postData = JFactory::getApplication()->input->json;
            $var = $postData->get('data','no such thing','RAW');
            $resultStr = $table->uploadData($var);

            echo "var = " . $resultStr;

        }//end ps_upload

        function ps_delete()
        {
            JSession::checkToken( "get" ) or die( "Invalid Token" );
            JTable::addIncludePath(JPATH_COMPONENT . "/tables");
            $table = JTable::getInstance("moduleassets","Table");

            //echo "ps_add running!";//its working - using angularjs service

            //now for a new (more secure)  way to get $_POST data

            //var_dump($app);

            $postData = JFactory::getApplication()->input->json;
            $var = $postData->get('data','no such thing','RAW');
            //echo "see data = " . $var;

            $resultStr = $table->deleteData($var);

            echo "delete results = " . $resultStr;

        }//end ps_upload

        function ps_getData()
        {
            JSession::checkToken( "get" ) or die( "Invalid Token" );
            JTable::addIncludePath(JPATH_COMPONENT . "/tables");
            $table = JTable::getInstance("moduleassets","Table");


            $postData = JFactory::getApplication()->input->json;
            $var = $postData->get('data','no such thing','RAW');

            $resultStr = $table->getData();

            echo $resultStr;

        }//end ps_getData

        function ps_getPages()
        {
            JSession::checkToken( "get" ) or die( "Invalid Token" );
            JTable::addIncludePath(JPATH_COMPONENT . "/tables");
            $table = JTable::getInstance("moduleassets","Table");


            $postData = JFactory::getApplication()->input->json;
            $var = $postData->get('data','no such thing','RAW');
            //echo $var; return;

            $pageReturn = $table->getPages();

            echo $pageReturn;

        }//end ps_getPages

        function ps_getExt()
        {
          JSession::checkToken( "get" ) or die( "Invalid Token" );
          JTable::addIncludePath(JPATH_COMPONENT . "/tables");
          $table = JTable::getInstance("moduleassets","Table");


          $postData = JFactory::getApplication()->input->json;
          $var = $postData->get('data','no such thing','RAW');
          //echo $var; return;

          $extReturn = $table->getExt();

          echo $extReturn;
        }//ps_getExt

        function ps_setHome()
        {
          JSession::checkToken( "get" ) or die( "Invalid Token" );
          JTable::addIncludePath(JPATH_COMPONENT . "/tables");
          $table = JTable::getInstance("moduleassets","Table");


          $postData = JFactory::getApplication()->input->json;
          $hID = $postData->get('data','no such thing','RAW');
          //echo $var; return;

          $phoneHome = $table->setHome($hID);

          echo $phoneHome;
        }//ps_setHome

        function getModuleOrder()
        {
            JSession::checkToken( "get" ) or die( "Invalid Token" );
            JTable::addIncludePath(JPATH_COMPONENT . "/tables");
            $table = JTable::getInstance("moduleassets","Table");


            $postData = JFactory::getApplication()->input->json;
            $position = $postData->get('data','no such thing','RAW');


            //echo $var;
            //return;

            $resultStr = $table->getModuleOrder($position);

            echo $resultStr;

        }//end getModuleOrder

        function reorderModules()
        {
            JSession::checkToken( "get" ) or die( "Invalid Token" );
            JTable::addIncludePath(JPATH_COMPONENT . "/tables");
            $table = JTable::getInstance("moduleassets","Table");


            $postData = JFactory::getApplication()->input->json;
            $orders = $postData->get('data','no such thing','RAW');
            //echo $orders;
            //return;

            $resultStr = $table->reorderModules($orders);

            echo $resultStr;

        }//end reorderModules

        function addPallet()
        {
            JSession::checkToken( "get" ) or die( "Invalid Token" );
            JTable::addIncludePath(JPATH_COMPONENT . "/tables");
            $table = JTable::getInstance("moduleassets","Table");


            $postData = JFactory::getApplication()->input->json;
            $pallets = $postData->get('data','no such thing','RAW');
            //echo $orders;
            //return;

            $resultStr = $table->addPallet($pallets);

            echo $resultStr;

        }//end addPallet

        function getPallet()
        {
            JSession::checkToken( "get" ) or die( "Invalid Token" );
            JTable::addIncludePath(JPATH_COMPONENT . "/tables");
            $table = JTable::getInstance("moduleassets","Table");


            $postData = JFactory::getApplication()->input->json;
            $pallets = $postData->get('data','no such thing','RAW');
            //echo $orders;
            //return;

            $resultStr = $table->getPallet();

            echo $resultStr;

        }//end getPallet

        function pageMaker()
        {
            JSession::checkToken( "get" ) or die( "Invalid Token" );
            JTable::addIncludePath(JPATH_COMPONENT . "/tables");
            $table = JTable::getInstance("pagenest","Table");


            $postData = JFactory::getApplication()->input->json;
            $pgData = $postData->get('data','no such thing','RAW');

            $page_obj =  json_decode($pgData);
            $resultStr = "";
            //echo $pgData;
            //return;

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

        /************************  CHECK PARENT DATA  *************************/

             $parentId = $table->checkMenuParentData();
             //$JQMLink->addScriptDeclaration("alert(\"the menu id is ".$menuId."\");");

             //checks for table data and adds data
             //this should be done when the component is installed but if not.
             if($parentId == "false")
             {
                 $mD = array("menutype" => "main","title" => "COM_PSMOD_MENU","alias" => "com-psmod-menu",
                 "path"=>"com-psmod-menu","link" => "index.php?option=com_psmod",
                 "type" => "component","published" => "0", "parent_id" => "1", "level" => "1", "language" => "*",
                 "access" => "1","template_style_id" => "0", "component_id" => $componentId);
                 $table->getTableName("menu");
                 $table->setLocation("1","last-child");
                 $table->save($mID);
                // $table->bind($mD);
                 //$table->store();
                 //run it again
                 $parentId = $table->checkMenuParentData();
                 $resultStr .= "parent renewed, ";


                 //$JQMLink->addScriptDeclaration("alert(\"the menu id is ".$menuId."\");");

             }//end if
        /************************  END CHECK PARENT DATA   *************************/

        /************************  ADD PAGE DATA   *************************/

          //$pageId = $table->makePage($pgData);

        /************************  END CHECK PARENT DATA   *************************/


     		/************************  CHECK MENU DATA  *************************/
             //for menu_types table
     		//creates its own MAIN MENU
             $menuId = $table->checkMenuData();
             //$JQMLink->addScriptDeclaration("alert(\"the menu id is ".$menuId."\");");

             //checks for table data and adds data
             //this should be done when the component is installed but if not.
             if($menuId == "false")
             {
                 $mD = array("menutype" => "psmodmenu","title" => "psmod Menu",
                 "description" => "Private test menu for the private Picture show test page");
                 $table->getTableName("menu_types");
                 $table->save($mD);//was table2
                // $table->bind($mD);
                 //$table->store();
                 $menuId = $table->checkMenuData();
                 $resultStr .= "menutype renewed, ";


                 //$JQMLink->addScriptDeclaration("alert(\"the menu id is ".$menuId."\");");

             }//end if

             /************************  END CHECK MENU DATA  *************************/



     		/************************  CHECK MENU ITEM DATA  *************************/
     		/* !!!! THE MAIN EVENT !!!! */
     		//This and the file above but mainly this is the true purpose of this section of code
     		//creates a menu dynamically for this component which will result in a siteside page being available
     		//creates a menu item for the new main menu

             $menuItemId = $table->checkMenuItemData($page_obj->title);

            //$JQMLink->addScriptDeclaration("alert(\"the item id is ".$menuItemId."\");");

             //checks for table data and adds data
             if($menuItemId == "false")
             {
                 $mID = array("title" => $page_obj->title,"menutype" => "psmodmenu","alias" => $page_obj->alias,
                 "path"=>$page_obj->alias,"link" => "index.php?option=com_psmod&view=psmods",
                 "type" => "component","published" => $page_obj->published, "parent_id" => $parentId, "level" => "2", "language" => "*",
                 "access" => $page_obj->access,"note" => $page_obj->note,
                 "template_style_id" => $page_obj->template_style_id, "component_id" => $componentId);
                 $table->getTableName("menu");
                 /*"publish_up"=>$page_obj->publish_up,"publish_down"=>$page_obj->publish_down,*/
                 //note the alias and path are both not only case sensitive but must be lower case.
                 //It can be written in any case but joomla only correctly processes the alias" that are lower case for page views
                 // I spent hours with this little detail

                 //everything else is not needed ->save() does them all automagically
                 //$table->bind($sd); //$table->store(); //$table->rebuild(); //$table->rebuildPath($menuItemId);

                 $table->setLocation("3","last-child");
                 $table->save($mID);

                 //$menuItemId = $table->checkMenuItemData();
                 $resultStr .= "page processed";

                 //$JQMLink = JFactory::getDocument();
                 //$JQMLink->addScriptDeclaration("alert(\"the item id is ".$menuItemId."\");");

             }//end if

             /************************  END CHECK MENU ITEM DATA  *************************/

            //$resultStr = $table->reorderModules($pgData);

            echo $resultStr;

        }//end pageMaker

        function getTools()
        {
          JSession::checkToken( "get" ) or die( "Invalid Token" );

            //works for regular post data ajax call
            $postData = JFactory::getApplication()->input->post;
            $uCheckData = $postData->get('data', 'defaultvalue', 'filter');

            if($uCheckData == "defaultvalue"){
              $postData = JFactory::getApplication()->input->json;
              $uCheckData = $postData->get('data','no such thing','RAW');
            }

            echo '
            [
              {
                "id":"sS-1",
                "title":"manual slideshow",
                "alias":"manual-slideshow",
                "file_name":"manual_slideshow",
                "type":"slideshow",
                "img":"xfiles/images/loosie.jpg",
                "thumbnail":"xfiles/images/loosie.jpg",
                "params":{
                  "data":"none"
                },
                "details":{
                  "data":"none",
                  "width":"default",
                  "height":"default",
                  "ratio":"2.6666666",
                  "responsive":"1",
                  "background":"#ffffff",
                  "class_pfx":"",
                  "class_style":"",
                  "custom_class":"",
                  "sample_class":"",
                  "class_alt": "",
                  "btn_hover":"",
                  "btn_bg":"#000000",
                  "btn_opacity":100,
                  "btn_hex":"#000000",
                  "btn_style":"background-color:#000000;",
                  "hover_bg":"#CCCCCC",
                  "hover_opacity":100,
                  "hover_hex":"#CCCCCC"
                }
              }
            ]';


        }//end getTools

}//PsmodController
