<?php
defined("_JEXEC") or die;

class TableModuleAssets extends JTableNested
{

    public function __construct($db)
    {
        parent::__construct("#__assets","id",$db);
    }

    public function saveNewModule($dStr)
    {
        $data_obj = json_decode($dStr);

        $db = jFactory::getDbo();
        $query = $db->getQuery(true);
        $query->select($db->quoteName("id"));
        $query->from($db->quoteName("#__psmod"));
        $query->where($db->quoteName("title") . " LIKE ". $db->quote($data_obj->menu_title));//psmod Test Page
        $db->setQuery($query);

        $menu_id = $db->loadResult();

        if($menu_id == "")
        {
            return "false";
        }//end if

        $db = jFactory::getDbo();
        $query = $db->getQuery(true);

        //insert columns
        $columns = array("title","ordering","position","published","publish_up","publish_down","module","access","showtitle","params","menu_id");

        //insert values
        $values = array(
        $db->quote($data_obj->menu_title),
        1,
        $db->quote($data_obj->position),
        $db->quote($data_obj->status),
        $db->quote($data_obj->publish_up),
        $db->quote($data_obj->publish_down),
        $db->quote("mod_psmod"),
        $db->quote($data_obj->access),
        0,
        $db->quote('{"moduleclass_sfx":"","module_tag":"div","bootstrap_size":"0","header_tag":"h3","header_class":"","style":"0"}'),
        $db->quote($menu_id));


        //prep the insert query
        $query->insert($db->quoteName("#__modules"))
        ->columns($db->quoteName($columns))
        ->values(implode(",",$values));
        $db->setQuery($query);
        $db->execute();

        return $menu_id;

    }//end saveNewModule


    public function getMenuId($dStr)
    {
        $data_obj = json_decode($dStr);

        $db = jFactory::getDbo();
        $query = $db->getQuery(true);
        $query->select($db->quoteName("id"));
        $query->from($db->quoteName("#__psmod"));
        $query->where($db->quoteName("title") . " LIKE ". $db->quote($data_obj->menu_title));//psmod Test Page
        $db->setQuery($query);

        $menu_id = $db->loadResult();

        return $menu_id;

    }//end getMenuId


    public function getModuleId($idStr)
    {
        $db = jFactory::getDbo();
        $query = $db->getQuery(true);
        $query->select($db->quoteName("id"));
        $query->from($db->quoteName("#__modules"));
        $query->where($db->quoteName("menu_id") . " LIKE ". $db->quote($idStr));//psmod Test Page
        $db->setQuery($query);

        $module_id = $db->loadResult();

        if($module_id == "")
        {
           return "false";
        }
        else
        {
            return $module_id;

        }//end if

    }//end getModuleId


    public function getAssetId($nStr)
    {
        $db = jFactory::getDbo();
        $query = $db->getQuery(true);
        $query->select($db->quoteName("id"));
        $query->from($db->quoteName("#__assets"));
        $query->where($db->quoteName("name") . " LIKE ". $db->quote($nStr));//psmod Test Page
        $db->setQuery($query);

        $asset_id = $db->loadResult();

        if($asset_id == "")
        {
           return "false";
        }
        else
        {
            return $asset_id;

        }//end if

    }//end getAssetId

    public function updateTables($aId,$moId,$meId,$dStr)
    {
        $data_obj = json_decode($dStr);
        //update module
        $db = jFactory::getDbo();
        $query = $db->getQuery(true);

        $fields = array
        (
        $db->quoteName("asset_id") . " = " . $db->quote($aId),
        $db->quoteName("position") . " = " . $db->quote($data_obj->position),
        $db->quoteName("published") . " = " . $db->quote($data_obj->status),
        $db->quoteName("access") . " = " . $db->quote($data_obj->access)

        );
        $conditions = array($db->quoteName("id") . " = " . $db->quote($moId));

        $query->update($db->quoteName("#__modules"))->set($fields )->where($conditions);
        $db->setQuery($query);
        $db->execute();

        //update psmod
        $db = jFactory::getDbo();
        $query = $db->getQuery(true);

        $fields = array($db->quoteName("module_id") . " = " . $db->quote($moId));
        $conditions = array($db->quoteName("id") . " = " . $db->quote($meId));

        $query->update($db->quoteName("#__psmod"))->set($fields )->where($conditions);
        $db->setQuery($query);
        $results = $db->execute();



        //create default page views in modules_menu
        $db = jFactory::getDbo();
        $query = $db->getQuery(true);

        $columns = array("moduleid","menuid");

        //insert values
        $values = array($db->quote($moId),0);

        //prep the insert query
        $query->insert($db->quoteName("#__modules_menu"))
        ->columns($db->quoteName($columns))
        ->values(implode(",",$values));
        $db->setQuery($query);
        $db->execute();


        return $results . " updates accomplished ";

    }//end updateTables

    public function updateModule($moId,$meId,$dStr)
    {
         $data_obj = json_decode($dStr);
        //update module
        $db = jFactory::getDbo();
        $query = $db->getQuery(true);

        $fields = array
        (
        $db->quoteName("position") . " = " . $db->quote($data_obj->position),
        $db->quoteName("published") . " = " . $db->quote($data_obj->status),
        $db->quoteName("access") . " = " . $db->quote($data_obj->access),
        $db->quoteName("publish_up") . " = " . $db->quote($data_obj->publish_up),
        $db->quoteName("publish_down") . " = " . $db->quote($data_obj->publish_down),
        $db->quoteName("ordering") . " = " . $db->quote($data_obj->ordering)
        );
        $conditions = array($db->quoteName("id") . " = " . $db->quote($moId));

        $query->update($db->quoteName("#__modules"))->set($fields )->where($conditions);
        $db->setQuery($query);
        $db->execute();

    }//end update module

    public function getModuleData($moId)
    {

        $db = jFactory::getDbo();
        $query = $db->getQuery(true);
        $query->select($db->quoteName(array("position","published","access","publish_up","publish_down","ordering")));
        $query->from($db->quoteName("#__modules"));
        $query->where($db->quoteName("id") . " LIKE ". $db->quote($moId));//psmod Test Page
        $db->setQuery($query);

        $moduleData = $db->loadObject();
        $page_id = $this->getPageIds($moId);

        $moduleData->page_ids = $page_id;
        $moduleData = json_encode($moduleData);

        return $moduleData;

    }//end getModuleData

    public function preSaveMenu($dStr)
    {
        $data_obj = json_decode($dStr);

        $db = jFactory::getDbo();
        $query = $db->getQuery(true);

        $columns = array("title");

        //insert values
        $values = array(
        $db->quote($data_obj->menu_title));
        //prep the insert query
        $query->insert($db->quoteName("#__psmod"))
        ->columns($db->quoteName($columns))
        ->values($values);
        $db->setQuery($query);
        $db->execute();



    }//end preSaveMenu


    public function deleteElements($mod)
    {
        $results = "";

        for($i = 0;$i < count($mod); $i++)
        {
            //remove modules
            $db = jFactory::getDbo();
            $query = $db->getQuery(true);

            $conditions = array($db->quoteName("id") . " = " . $db->quote($mod[$i]));

            $query->delete($db->quoteName("#__modules"))->where($conditions);
            $db->setQuery($query);
            $results .= $db->execute();

            //remove asset
            $db = jFactory::getDbo();
            $query = $db->getQuery(true);

            $conditions = array($db->quoteName("name") . " = " . $db->quote("com_modules.module." . $mod[$i]));

            $query->delete($db->quoteName("#__assets"))->where($conditions);
            $db->setQuery($query);
            $results .= $db->execute();

            //remove modules_menu
             $db = jFactory::getDbo();
            $query = $db->getQuery(true);

            $conditions = array($db->quoteName("moduleid") . " = " . $db->quote($mod[$i]));

            $query->delete($db->quoteName("#__modules_menu"))->where($conditions);
            $db->setQuery($query);
            $results .= $db->execute();

        }//end for

        return $results;

    }//end deleteElements

    public function getUrls($tStr)
    {
        $db = jFactory::getDbo();
        $query = $db->getQuery(true);
        $query->select($db->quoteName(array("path","link")));
        $query->from($db->quoteName("#__menu"));
        $query->where($db->quoteName("title") . " LIKE ". $db->quote($tStr));//psmod Test Page
        $db->setQuery($query);

        $urlData = json_encode($db->loadObject());

        if($urlData == "" or $urlData == "null")
        {
           return "false";
        }
        else
        {
            return $urlData;

        }//end if

    }//end getUrls


    public function checkModMenu($moId)
    {
        //not really needed.  but if someone does its here.

        $db = jFactory::getDbo();
        $query = $db->getQuery(true);
        $query->select($db->quoteName("menuid"));
        $query->from($db->quoteName("#__modules_menu"));
        $query->where($db->quoteName("moduleid") . " LIKE ". $db->quote($moId));//psmod Test Page
        $db->setQuery($query);

        $mData = $db->loadResult();

        if($mData == "")
        {
           return "false";
        }
        else
        {
            return "true";

        }//end if


    }//end checkModMenu

    public function updateModMenu($moId)
    {
        //not really needed.  but if someone does its here.

        //create default page views in modules_menu
        $db = jFactory::getDbo();
        $query = $db->getQuery(true);

        $columns = array("moduleid","menuid");

        //insert values
        $values = array($db->quote($moId),0);

        //prep the insert query
        $query->insert($db->quoteName("#__modules_menu"))
        ->columns($db->quoteName($columns))
        ->values(implode(",",$values));
        $db->setQuery($query);
        $db->execute();


        return " mod menu updated";

    }//updateModMenu

    function uploadData($dStr)
    {

      $cur_arc_user = jFactory::getUser();
      $arc_user_id = $cur_arc_user->id;
      if($arc_user_id == 0){return "unregistered user";}

      $obj = json_decode($dStr);
      $info_table = "#__psmod_assets";

      $now = new DateTime();
      $timestamp = $now->getTimestamp() * 1000;

      $db = jFactory::getDbo();
      $query = $db->getQuery(true);

      //prep the insert query
      if($obj->id == "none"){
        $columns = array("user_id","created","modified","params");
        //insert values
        $values = array($arc_user_id,$timestamp,$timestamp,$db->quote(htmlentities($obj->params)));

        $query->insert($db->quoteName($info_table))
        ->columns($db->quoteName($columns))
        ->values(implode(",",$values));
        $db->setQuery($query);
        $db->execute();
      }else{
        $fields = array
        (
          $db->quoteName("modified") . " = " . $timestamp,
          $db->quoteName("params") . " = " . $db->quote(htmlentities($obj->params))
        );

        $conditions = array(
          $db->quoteName("id") . " = " . $db->quote($obj->id)
        );

        $query->update($db->quoteName("#__psmod_assets"))->set($fields )->where($conditions);
        $db->setQuery($query);
        $db->execute();
      }

      return "psmod_assets updated";

    }//end uploadData

    function deleteData($dStr)
    {

      $cur_arc_user = jFactory::getUser();
      $arc_user_id = $cur_arc_user->id;
      if($arc_user_id == 0){return "unregistered user";}

      $obj = json_decode($dStr);
      $info_table = "#__psmod_assets";

      $db = jFactory::getDbo();
      $query = $db->getQuery(true);

      //prep the insert query
      $conditions = array(
        $db->quoteName('id') . ' = ' . $db->quote(htmlentities($obj->id))
      );


    $query = $db->getQuery(true);
    $query->delete($db->quoteName($info_table));
    $query->where($conditions);//aliintro Test Page
    $db->setQuery($query);
    $results = $db->execute();

      return "ps_delete processed";

    }//end deleteData

    function getData()
    {
      $cur_arc_user = jFactory::getUser();
      $arc_user_id = $cur_arc_user->id;
      if($arc_user_id == 0){return "unregistered user";}

      $db = jFactory::getDbo();
      $query = $db->getQuery(true);
      $query->select('*');
      $query->from($db->quoteName("#__psmod_assets"));
      $db->setQuery($query);

      $dbData = $db->loadObjectList();

      for($v = 0; $v < count($dbData); $v++){
        $dbData[$v]->params = html_entity_decode($dbData[$v]->params);
      }

      return json_encode($dbData);

    }//end getData

    function getPages()
    {
      $cur_arc_user = jFactory::getUser();
      $arc_user_id = $cur_arc_user->id;
      if($arc_user_id == 0){return "unregistered user";}

      /*    title:"",
            alias:"",
            id:"0",
            published:true,
            access:1,
            publish_up:'0000-00-00 00:00:00',
            publish_down:'0000-00-00 00:00:00',
            template_style_id:0,
            menutype:"psmodmenu"
      */
      $fields = [
        "id",
        "title",
        "alias",
        "params",
        "access",
        "menutype",
        "published",
        "component_id",
        "home",
        "template_style_id"
      ];

      $db = jFactory::getDbo();
      $query = $db->getQuery(true);
      $query->select($db->quoteName($fields));
      $query->from($db->quoteName("#__menu"));
      $db->setQuery($query);

      $dbMenus = $db->loadObjectList();

      for($v = 0; $v < count($dbMenus); $v++){
        //$dbData[$v]->params = html_entity_decode($dbData[$v]->params);
      }

      return json_encode($dbMenus);

    }//end getPages

    function getExt()
    {
      $cur_arc_user = jFactory::getUser();
      $arc_user_id = $cur_arc_user->id;
      if($arc_user_id == 0){return "unregistered user";}

      $db = jFactory::getDbo();
      $query = $db->getQuery(true);
      $query->select("extension_id");
      $query->from($db->quoteName("#__extensions"));
      $query->where($db->quoteName("name") . " = ". $db->quote("com_psmod"));
      $db->setQuery($query);

      $extResult = $db->loadResult();


      return $extResult;

    }//end getExt

    function setHome($hID)
    {
      $cur_arc_user = jFactory::getUser();
      $arc_user_id = $cur_arc_user->id;
      if($arc_user_id == 0){return "unregistered user";}

      $this->clearHome();

      $db = jFactory::getDbo();
      $query = $db->getQuery(true);

      $fields = array
      (
      $db->quoteName("home") . " = 1"
      );
      $conditions = array($db->quoteName("id") . " = " . $db->quote(htmlentities($hID)));

      //UPDATE mytable SET table_column = 'test';
      $query->update($db->quoteName("#__menu"))->set($fields )->where($conditions);
      $db->setQuery($query);
      $results = $db->execute();

      if($results != false)
      {
        return "home update successful";
      }else {
        return "home update unsuccessful";
      }
    }//setHome

    function clearHome()
    {
      $db = jFactory::getDbo();
      $query = $db->getQuery(true);

      $fields = array
      (
      $db->quoteName("home") . " = 0"
      );

      //UPDATE mytable SET table_column = 'test';//updates all in column
      $query->update($db->quoteName("#__menu"))->set($fields);
      $db->setQuery($query);
      $results = $db->execute();
    }//clearHome

    function getModuleOrder($gMO)
    {
      $cur_arc_user = jFactory::getUser();
      $arc_user_id = $cur_arc_user->id;
      if($arc_user_id == 0){return "unregistered user";}

      $position = $gMO;
      //return "running order ".$position;

      $db = jFactory::getDbo();
      $query = $db->getQuery(true);
      $query->select($db->quoteName(array("id","title")));
      $query->from($db->quoteName("#__modules"));
      $query->where($db->quoteName("position") . " = ". $db->quote(htmlentities($position)));//psmod Test Page
      $query->order($db->quoteName('ordering') . ' ASC');
      //$query->order($db->quoteName('category') . ' , ' . $db->quoteName('desc_data'));
      $db->setQuery($query);

      //return $query->dump();

      $dbData = $db->loadObjectList();

      return json_encode($dbData);
    }//getModuleOrder

    function reorderModules($rOobj)
    {
      $cur_arc_user = jFactory::getUser();
      $arc_user_id = $cur_arc_user->id;
      if($arc_user_id == 0){return "unregistered user";}

      $reorder_array = json_decode($rOobj);
      if(count($reorder_array) == 0){return "no data available";}
      $results = "";

      for($r = 0; $r < count($reorder_array); $r++)
      {
        $item = $reorder_array[$r];
        if($item->id == 0 OR $item->id == "0"){continue;}

        $db = jFactory::getDbo();
        $query = $db->getQuery(true);

        $fields = array
        (
        $db->quoteName("ordering") . " = " . $db->quote($item->order)
        );
        $conditions = array($db->quoteName("id") . " = " . $db->quote($item->id));

        $query->update($db->quoteName("#__modules"))->set($fields )->where($conditions);
        $db->setQuery($query);
        $results .= $db->execute();
      }

      return "reorder results = " . $results;
    }//reorderModules

    function editPallet($dStr)
    {
      $cur_arc_user = jFactory::getUser();
      $col_user_id = $cur_arc_user->id;
      $col_username = $cur_arc_user->username;

      if($col_user_id == 0){return "unregistered user";}

      $color_obj = json_decode($dStr);
      if($col_user_id !== $color_obj->user_id){return;};

      $db = jFactory::getDbo();
      $query = $db->getQuery(true);

      $fields = array
      (
      $db->quoteName("title") . " = " . $db->quote(htmlentities($color_obj->title)),
      $db->quoteName("user_id") . " = " . $db->quote($color_obj->user_id),
      $db->quoteName("user_name") . " = " . $db->quote($color_obj->user_name),
      $db->quoteName("data") . " = " . $db->quote(htmlentities($color_obj->data))
      );
      $conditions = array($db->quoteName("id") . " = " . $db->quote(htmlentities($color_obj->id)));

      $query->update($db->quoteName("#__psmod_colors"))->set($fields)->where($conditions);
      $db->setQuery($query);
      $db->execute();

    }//editPallet

    function addPallet($dStr)
    {
      $cur_arc_user = jFactory::getUser();
      $col_user_id = $cur_arc_user->id;
      $col_username = $cur_arc_user->username;
      $tableName = "#__psmod_colors";

      if($col_user_id == 0){return "unregistered user";}
      $color_obj = json_decode($dStr);


      $db = jFactory::getDbo();
      $query = $db->getQuery(true);

      $columns = array("title","user_id","user_name","data");

      //insert values
      $values = array(
        $db->quote(htmlentities($color_obj->title)),
        $db->quote($col_user_id),
        $db->quote($col_username),
        $db->quote(htmlentities($color_obj->data))
      );

      //prep the insert query
      $query->insert($db->quoteName($tableName))
      ->columns($db->quoteName($columns))
      ->values(implode(",",$values));
      $db->setQuery($query);
      $color_results = $db->execute();
      $last_id = $db->insertid();

      if($color_results == 1){

        $conditions = array(
          $db->quoteName('id') . ' = ' . $db->quote($last_id)
        );

        //test run
        $query->select('*');
        $query->from($db->quoteName($tableName));
        $query->where($conditions);//aliintro Test Page
        $db->setQuery($query);
        $result_data = $db->loadResult();

        return $result_data;
      }else {
          return "your upload was not successful";
      }
    }//addPallet

  function getPallet()
  {
    $cur_arc_user = jFactory::getUser();
    $arc_user_id = $cur_arc_user->id;
    if($arc_user_id == 0){return "unregistered user";}

    $db = jFactory::getDbo();
    $query = $db->getQuery(true);
    $query->select('*');
    $query->from($db->quoteName("#__psmod_colors"));
    $db->setQuery($query);

    $dbData = $db->loadObjectList();

    for($v = 0; $v < count($dbData); $v++){
      $dbData[$v]->data = html_entity_decode($dbData[$v]->data);
    }

    return json_encode($dbData);

  }//end getPallet

    function processPages($mID,$pID)
    {
      $cur_arc_user = jFactory::getUser();
      $arc_user_id = $cur_arc_user->id;
      if($arc_user_id == 0){return "unregistered user";}

      $modID = $mID;
      $pgID = $pID;

      //inspired by com_arc > arcassets.php > pairMyData
      switch($pgID)
      {
          case "":
            //if empty remove all the page entries with the modID
          break;

          case "0":
            //remove all the page entries with modID and add one with 0
          break;

          default:

            //make an array of what is there, compare it with the uploaded Array
            $pair_table = '#__modules_menu';

            //get pair current link_id record
            $db = jFactory::getDbo();
            $query = $db->getQuery(true);

            $conditions = array(
              $db->quoteName('moduleid') . ' = ' . $db->quote($modID)
            );


            $query->select('menuid');
            $query->from($db->quoteName($pair_table));
            $query->where(implode(",",$conditions));//aliintro Test Page
            $db->setQuery($query);
            $curr_pg_ids_ary = $db->loadColumn();

            //prep the upload Array from the upload string
            $upld_pg_ids_ary = explode(",",$pgID);

            //compare the two values if there are db values
            if($curr_pg_ids_ary == true)
            {
              //checks for deletions
              //return "entered id ary space";

              for($b=0;$b < count($curr_pg_ids_ary); $b++)
              {

                //if the recorded list has entries not on the current list use the
                //deleter to remove those paired entries
                $is_it_there = array_search($curr_pg_ids_ary[$b],$upld_pg_ids_ary,true);

                //remove what is current but not in the upload
                if($is_it_there == "" && $is_it_there !== 0)
                {

                  //return $db_info_ids_ary[$b] . " is not there - delete";//works
                  $del_obj = (object)[];
                  $del_obj->module_id = $modID;
                  $del_obj->menu_id = $curr_pg_ids_ary[$b];
                  $del_obj->pair_table = $pair_table;
                  $del_obj->mode = "delete";

                  $this->pair_pages($del_obj);

                }//end if
              }//end for

                //add what uploads are not in the current list.
                for($c=0;$c < count($upld_pg_ids_ary); $c++)
                {

                  //prevent duplicates - [i don't think this checks for duplicates]
                  $is_it_here = array_search($upld_pg_ids_ary[$c],$curr_pg_ids_ary,true);

                  if($is_it_here == "" && $is_it_here !== 0)
                  {
                    //return $input_ids_ary[$c] . " is not here - add";//works

                    $add_obj = (object)[];
                    $add_obj->module_id = $modID;
                    $add_obj->menu_id = $upld_pg_ids_ary[$c];
                    $add_obj->pair_table = $pair_table;
                    $add_obj->mode = "add";

                    $pp_ret = $this->pair_pages($add_obj);
                    //return "process_pair return = " . $pp_ret;
                  }//end if

                }//end for


            }else{
              //return "entered else space";
              //if no values are found in the db just add them
              for($c=0; $c < count($upld_pg_ids_ary); $c++)
              {

                  $add_obj = (object)[];
                  $add_obj->module_id = $modID;
                  $add_obj->menu_id = $upld_pg_ids_ary[$c];
                  $add_obj->pair_table = $pair_table;
                  $add_obj->mode = "add";

                  $pp_ret = $this->pair_pages($add_obj);
                  //return "process_pair return = " . $pp_ret;

              }//end for

            }//end else

          break;
      }//end switch
    }//processPages

    function pair_pages($pObj)
    {

      $process_data = $pObj;
      $action = $process_data->mode;
      $pair_table = $process_data->pair_table;

      $db = jFactory::getDbo();
      $query = $db->getQuery(true);

      switch($action)
      {
        case "add":

          //test run
          $conditions = array(
            $db->quoteName('moduleid') . ' = ' . $db->quote(htmlentities($process_data->module_id)),
            $db->quoteName('menuid') . ' = ' . $db->quote(htmlentities($process_data->menu_id))
          );

          //test run
          $query->select('moduleid');
          $query->from($db->quoteName($pair_table));
          $query->where($conditions);//aliintro Test Page
          $db->setQuery($query);
          $test_result = $db->loadResult();

          if($test_result == false)
          {

            $db = jFactory::getDbo();
            $query = $db->getQuery(true);

            $columns = array('moduleid','menuid');

            $values = array(
            $db->quote(htmlentities($process_data->module_id)),
            $db->quote(htmlentities($process_data->menu_id))
            );


            //prep the insert query
            $query->insert($db->quoteName($pair_table))
            ->columns($db->quoteName($columns))
            ->values(implode(',',$values));
            $db->setQuery($query);
            $results = $db->execute();

            if($results == 0){
              return " add page pairing failed and results = " . $results;
            }else {
              return " add page pairing success and results = " . $results;
            }//end else
          }//end if $test_result

        break;

        case "delete":

            $conditions = array(
              $db->quoteName('moduleid') . ' = ' . $db->quote(htmlentities($process_data->module_id)),
              $db->quoteName('menuid') . ' = ' . $db->quote(htmlentities($process_data->menu_id))
            );


            $query = $db->getQuery(true);
            $query->delete($db->quoteName($pair_table));
            $query->where($conditions);//aliintro Test Page
            $db->setQuery($query);
            $results = $db->execute();

            //return $results;
            if($results == 0){
              return " page pairing delete failed and results = " . $results;
            }else {
              return " page pairing delete success and results = " . $results;
            }

        break;
      }//end switch

    }//end pair_pages;

    function getPageIds($mID)
    {
      $cur_arc_user = jFactory::getUser();
      $arc_user_id = $cur_arc_user->id;
      if($arc_user_id == 0){return "unregistered user";}

      $modID = $mID;

      //inspired by com_arc > arcassets.php > pairMyData

            //make an array of what is there, compare it with the uploaded Array
            $pair_table = '#__modules_menu';

            //get pair current link_id record
            $db = jFactory::getDbo();
            $query = $db->getQuery(true);

            $conditions = array(
              $db->quoteName('moduleid') . ' = ' . $db->quote($modID)
            );


            $query->select('menuid');
            $query->from($db->quoteName($pair_table));
            $query->where(implode(",",$conditions));//aliintro Test Page
            $db->setQuery($query);
            $curr_pg_ids_ary = $db->loadColumn();

            if($curr_pg_ids_ary != false){
              return implode(",",$curr_pg_ids_ary);
            }else{
              return "";
            }//end else

    }//getPageIds


    public function bind($array, $ignore = "")
    {
        return parent::bind($array, $ignore);
    }

    /*the store function writes the data to the database when you
    submit the form*/

    public function store($updateNulls = false)
    {
        return parent::store($updateNulls);
    }

}//end class
//end TableModuleAssets
