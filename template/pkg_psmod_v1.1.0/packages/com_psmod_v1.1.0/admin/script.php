<?php

defined("_JEXEC") or die;

class com_psmodInstallerScript /*com_folioInstallerScript*/
{
    function install($parent)
    {
        //JFactory::getDocument()->addScriptDeclaration("alert(\" parent is ".$parent."\")");
        $parent->getParent()->setRedirectURL("index.php?option=com_psmod");
    }

    function uninstall($parent)
    {
        echo "<p>" . JText::_("COM_PSMOD_UNINSTALL_TEXT") . "</P>";
    }

    function update($parent)
    {
        echo "<p>" . JText::_("COM_PSMOD_UPDATE_TEXT") . "</P>";
    }

    function preflight($type, $parent)
    {
        echo "<p>" . JText::_("COM_PSMOD_PREFLIGHT_" . $type . "_TEXT") . "</P>";
    }

    function postflight($type, $parent)
    {
        echo "<p>" . JText::_("COM_PSMOD_POSTFLIGHT_" . $type . "_TEXT") . "</P>";
    }
}
