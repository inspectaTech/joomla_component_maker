<?php
// Check to ensure this file is included in Joomla!
defined('_JEXEC') or die('Restricted access');

jimport('joomla.form.formfield');

class JFormFieldCityTest extends JFormField {

	protected $type = 'CityTest';
  //JFormFieldCityTest also has to match cityTest.php (php title isn't case sensitive citytest also works)

	// getLabel() left out

	public function getInput() {
		return '<select id="'.$this->id.'" name="'.$this->name.'" class="'.$this->class.'">'.
		       '<option value="1" >Washington DC</option>'.
		       '<option value="2" >Chicago</option>'.
		       '<option value="3" >San Francisco</option>'.
		       '</select>';
	}
}
//form fild location C:\xampp\htdocs\Joomla\libraries\joomla\form\fields
//other form fild location C:\xampp\htdocs\Joomla\libraries\cms\form\field
