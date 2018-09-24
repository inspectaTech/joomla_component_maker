<?php
defined("_JEXEC") or die;

class TablePagenest extends JTableNested
{

    public function __construct($db)
    {
        parent::__construct("#__menu","id",$db);
    }



    public function addRoot()
    {
        $db = jFactory::getDbo();

       $query = $db->getQuery(true)
        ->insert("#__menu")
        ->set("parent_id = 0")
        ->set("level = 0")
        ->set("title = " . $db->quote('root'))
        ->set("alias = " . $db->quote('root'))
        ->set("access = 1")
        ->set("path = " . $db->quote(''));
        $db->store($query);

        if($db->execute())
        {
                return false;

        }

        //return $db->insertid();
        $sneekPeek = JFactory::getDocument();
        $sneekPeek->addScriptDeclaration("alert(\"".$query."\");");
    }

    public function checkMenuParentData()
    {
        $db = jFactory::getDbo();
        $query = $db->getQuery(true);
        $query->select($db->quoteName("id"));
        $query->from($db->quoteName("#__menu"));
        $query->where($db->quoteName("title") . " LIKE ". $db->quote("COM_PSMOD_MENU"));//formerly psmod Test Page
        $db->setQuery($query);

        $results = $db->loadResult();

        if($results == "")
        {
           return "false";
        }
        else
        {
            return $results;

        }//end if
    }


    public function checkMenuItemData($dstr)
    {
        $db = jFactory::getDbo();
        $query = $db->getQuery(true);
        $query->select($db->quoteName("id"));
        $query->from($db->quoteName("#__menu"));
        $query->where($db->quoteName("title") . " LIKE ". $db->quote(htmlentities($dstr)));//formerly psmod Test Page
        $db->setQuery($query);

        $results = $db->loadResult();

        if($results == "")
        {
           return "false";
        }
        else
        {
            return $results;

        }//end if
    }


    public function checkTemplateData($dTN)
    {
        $db = jFactory::getDbo();
        $query = $db->getQuery(true);
        $query->select($db->quoteName("id"));
        $query->from($db->quoteName("#__template_styles"));
        $query->where($db->quoteName("template") . " LIKE ". $db->quote($dTN));//psmod Test Page
        $db->setQuery($query);

        $results = $db->loadResult();

        if($results == "")
        {
           return "false";
        }
        else
        {
            return $results;

        }//end if
    }

    public function checkComponentData()
    {
        $db = jFactory::getDbo();
        $query = $db->getQuery(true);
        $query->select($db->quoteName("extension_id"));
        $query->from($db->quoteName("#__extensions"));
        $query->where($db->quoteName("name") . " LIKE ". $db->quote("com_psmod"));//psmod Test Page
        $db->setQuery($query);

        $results = $db->loadResult();

        if($results == "")
        {
           return "false";
        }
        else
        {
            return $results;

        }//end if
    }//end checkComponentData

    public function checkMenuData()
    {
        $db = jFactory::getDbo();
        $query = $db->getQuery(true);
        $query->select($db->quoteName("id"));
        $query->from($db->quoteName("#__menu_types"));
        $query->where($db->quoteName("menutype") . " LIKE ". $db->quote("psmodmenu"));//psmod Test Page
        $db->setQuery($query);

        $results = $db->loadResult();

        if($results == "")
        {
           return "false";
        }
        else
        {
            return $results;

        }//end if
    }//end checkMenuData


/****************************************************************************************************************

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

        $db = jFactory::getDbo();
        $query = $db->getQuery(true);

        //insert columns
        $columns = array("title","ordering","position","published","module","access","showtitle","params","psmod_id");

        //insert values
        $values = array(
        $db->quote($data_obj->menu_title),
        1,
        $db->quote($data_obj->position),
        $db->quote($data_obj->status),
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
        $query->where($db->quoteName("psmod_id") . " LIKE ". $db->quote($idStr));//psmod Test Page
        $db->setQuery($query);

        $module_id = $db->loadResult();

        return $module_id;

    }//end getModuleId

    public function saveAssets($dStr,$moId)
    {
            $data_obj = json_decode($dStr);
            $name_str = "com_modules.module." . $moId;

            $nID = array("parent_id" => "18","level" => "2","name" => $name_str,
            "title" => $data_obj->menu_title,
            'rules' => '{"core.delete":{"6":1},"core.edit":{"6":1,"4":1},"core.edit.state":{"6":1,"5":1},"module.edit.frontend":[]}'
            );

            if(!parent::getTableName("assets"))
            {$this->setError(!parent::getError());
            return false;}


           if(!parent::setLocation("18","last-child"))
            {
                $this->setError(!parent::getError());
            return false;}


            if(!parent::save($nID))
            {$this->setError(!parent::getError());
            return false;}

            return $dStr;

    }
****************************************************************************************************************/

  function makePage($pStr)
  {
    $cur_user = jFactory::getUser();
    $psmod_user_id = $cur_user->id;

    if($psmod_user_id == 0){return "unregistered user";}

    $datObj = json_decode($pStr);
    $info_table = "#__psmod_pages";

    $db = jFactory::getDbo();
    $query = $db->getQuery(true);

    $columns = array('user_id','bookmarks');
    //insert values
    $values = array(
     $db->quote($arc_user_id),
     $db->quote(htmlentities($new_bkmk))
    );

    $query->insert($db->quoteName($info_table))
    ->columns($db->quoteName($columns))
    ->values(implode(',',$values));
    $db->setQuery($query);
    $results = $db->execute();

    $last_id = $db->insertid();
    return $last_id;
  }//makePage

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
