<?php
defined("_JEXEC") or die;

Class PsmodHelper   //FolioHelper
{
    public static function getActions($categoryId = 0)
    {
        $user = JFactory::getUser();
        $result = new JObject;

        if(empty($categoryId))
        {
            $assetName = "com_psmod";//$assetName = "com_folio";
            $level = "component";
        }
        else
        {
            //I think int($categoryId);
            $assetName = "com_psmod.category.".(int)$categoryId;//$assetName = "com_folio.category
            $level = "category";
        }

        $actions = JAccess::getActions("com_psmod", $level);//getActions("com_folio"

        foreach($actions as $action)
        {
            $result->set($action->name, $user->authorise($action->name, $assetName));
        }

        return $result;

        }
    }
