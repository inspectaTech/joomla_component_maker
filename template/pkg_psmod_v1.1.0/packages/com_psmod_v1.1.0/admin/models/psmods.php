<?php
defined("_JEXEC") or die;

/* Creating the model for the list view

  b.Loc 1981  */

class PsmodModelPsmods extends JModelList //FolioModelFolios extends JModelList
{
    public function __construct($config = array())
    {
        if(empty($config["filter_fields"]))
        {
          $config["filter_fields"]= array(
          "id","a.id",
          "title","a.title",
          "module_id","a.module_id",
          "options","a.options",
          "position","b.position",
          "access","b.access",
          "published","b.published",
          "publish_up","b.publish_up",
          "publish_down","b.publish_down"
          );
        }

        parent::__construct($config);
    }

    protected function getListQuery()
    {
        $db = $this->getDbo();
        $query = $db->getQuery(true);

        $query->select(
            $this->getState(
            "list.select",
            "a.id, a.title," .
            "a.options, a.module_id,".
            "b.position,b.access,b.published,".
            "b.publish_up,b.publish_down"
            )
        );

        $query->from($db->quoteName("#__psmod","a"))
        ->join("INNER",$db->quoteName("#__modules","b") . "ON (" .
        $db->quoteName("a.id") . " = " . $db->quoteName("b.menu_id") . ")");//("#__folio")." AS a");

        return $query;
    }
}
