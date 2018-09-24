<?php
defined("_JEXEC") or die;

class TablePsmod extends JTable
{

    public function __construct($db)
    {
        parent::__construct("#__psmod","id",$db);
    }



	public function places($moId)
	{
		//run some $db query
		//return something;
    $db = jFactory::getDbo();
    $query = $db->getQuery(true);
    $query->select($db->quoteName(array("tool_data","data_ids")));
    $query->from($db->quoteName("#__psmod"));
    $query->where($db->quoteName("module_id") . " = " . $db->quote(htmlentities($moId)));//psmod Test Page
    //$query->order($db->quoteName('category') . ' , ' . $db->quoteName('desc_data'));
    $db->setQuery($query);

    //return $query->dump();

    $dbData = $db->loadObjectList();


		return json_encode($dbData);

	}//places

  public function getAssets($asID)
  {

          $info_table = '#__psmod_assets' ;

          $db = jFactory::getDbo();
          $query = $db->getQuery(true);

            //this is my fix for query IN condition array string
            //db quote to escape - sanitize
            $move_ids = $db->quote($asID);

            //explode with more sanitation
            $move_ids = explode(',',htmlentities($move_ids));
            //implode below to add inner quotes

            $query->select('*');
            $query->from($db->quoteName($info_table));
            $query->where($db->quoteName('id') . ' IN (' . implode("','",$move_ids) . ')');
            //bugfix for stopping IN keyword reordering
            $query->order("FIND_IN_SET(" . $db->quoteName('id') . "," . $db->quote(htmlentities($asID)) . ")");
            $db->setQuery($query);

            //return $query->dump();

            /* //working sample
              SELECT * FROM `uavz2_psmod_assets`
              WHERE `id` IN ('38','36','1','6','3','5','29')
              ORDER BY FIND_IN_SET(`id`,'38,36,1,6,3,5,29')
            */

            $dbData = $db->loadObjectList();

          for($v = 0; $v < count($dbData); $v++){
            $dbData[$v]->params = html_entity_decode($dbData[$v]->params);
          }

          return json_encode($dbData);
  }//getAssets

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
