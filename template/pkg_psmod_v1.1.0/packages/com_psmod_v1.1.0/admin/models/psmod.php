<?php
defined("_JEXEC") or die;


class PsmodModelPsmod extends JModelAdmin  //FolioModelFolio extends JModelAdmin
{
    protected $text_prefix = "COM_PSMOD";//$text_prefix = "COM_FOLIO";

    public function getTable($type = "Psmod", $prefix = "PsmodTable",/*type = "Folio", $prefix = "FolioTable"*/
    $config = array())
    {
        return JTable::getInstance($type, $prefix, $config);
    }

    public function getForm($data = array(), $loadData = true)
    {
        $app = JFactory::getApplication();

        $form = $this->loadForm("com_psmod.psmod", "psmod", array("control" =>
        "jform", "load_data" => $loadData));//loadForm("com_folio.folio", "folio",
            if(empty($form))
            {
                return false;
            }

            return $form;

    }

    protected function loadFormData()
    {
        $data = JFactory::getApplication()->getUserState("com_psmod.edit.psmod.data",array());//getUserState("com_folio.edit.folio.data"

        if(empty($data))
        {
            $data = $this->getItem();
        }

        return $data;
    }

    protected function prepareTable($table)
    {
        $table->title = htmlspecialchars_decode($table->title, ENT_QUOTES);
    }
}
