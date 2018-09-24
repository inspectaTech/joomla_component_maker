<?php
defined("_JEXEC") or die;

/*the bind function is used to prepare the data immediately
before it is saved to the database

loc 2043
*/


class PsmodTablePsmod extends JTable //FolioTableFolio extends JTable
{
    public function __construct(&$db)
    {
        parent::__construct("#__psmod", "id", $db);//construct("#__folio"
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

  
}
