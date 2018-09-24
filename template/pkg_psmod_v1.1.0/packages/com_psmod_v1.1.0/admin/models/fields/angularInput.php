<?php
// Check to ensure this file is included in Joomla!
defined('_JEXEC') or die('Restricted access');

jimport('joomla.form.formfield');

class JFormFieldAngularInput extends JFormField {

	protected $type = 'AngularInput';
  //JFormFieldCityTest also has to match cityTest.php (php title isn't case sensitive citytest also works)

	// getLabel() left out

	public function getInput() {
		return '<input id="'.$this->id.'" class="'.$this->class.'" name="'.$this->name.' "  ">';/*'.$this->ngInit.'*/
	}
}
