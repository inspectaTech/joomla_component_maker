<?php
defined("_JEXEC") OR die;

/*b.Loc 1957*/
//i think i added an s here that it didnt need
class PsmodControllerPsmods extends JControllerAdmin
{
    //FolioControllerFolios extends JControllerAdmin
    //has the form of componentNameControllerViewName
    public function getModel($name = "Psmod", $prefix = "PsmodModel",
    $config = array("ignore_request" => true))
    {//$name = "Folio", $prefix = "FolioModel",
        $model = parent::getModel($name, $prefix, $config);
        return $model;
    }
}
