<?php
defined("_JEXEC") or die;

/*the bind function is used to prepare the data immediately
before it is saved to the database

loc 2043
*/

//Junk table for making menus


class TableMenumaker extends JTable // extends JTable
{
    public function __construct(&$db)
    {
        parent::__construct("#__menu_types", "id", $db);//construct("#__folio"
    }

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

    public function checkUniqueData($tObj)
    {
      //$uC_input = json_decode($tObj);
      //return gettype($tObj);
      $uC_input = json_decode($tObj);
      $mode = $uC_input->mode;
      //return "mode = " . $mode;
      //if(!isset($arc_input->type)){$arc_input->type = "";}
      //if(!isset($arc_input->data_type)){$arc_input->data_type = "";}
      switch($mode){
        case "module":
          $check_table = "#__psmod";
          $check_field = "title";
          $check_select = "id";
          //return "module entered";
        break;
        case "page":
          $check_table = "#__assets";
          $check_field = "title";
          $check_select = "name";
          //return "page entered";
        break;
      }

        $db = jFactory::getDbo();
        $query = $db->getQuery(true);
        $query->select($db->quoteName($check_select));
        $query->from($db->quoteName($check_table));
        $query->where($db->quoteName($check_field) . " LIKE ". $db->quote(htmlentities($uC_input->text)));//psmod Test Page
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
    }//end checkMenuTitle

}//end TableMenumaker
