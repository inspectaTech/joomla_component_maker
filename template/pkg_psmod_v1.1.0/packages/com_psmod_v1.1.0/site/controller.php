<?php
defined("_JEXEC") or die;

class psmodController extends JControllerLegacy //class folioController
{
	//SITESIDE CONTROLLER


	function places()
	{
		JSession::checkToken( "get" ) or die( "Invalid Token" );
		JTable::addIncludePath(JPATH_COMPONENT . "/tables");
		$table = JTable::getInstance("psmod","Table");

		//works for regular post data ajax call
		$postData = JFactory::getApplication()->input->post;
		$placesData = $postData->get('data', 'defaultvalue', 'filter');

		if($placesData == "defaultvalue"){
			$postData = JFactory::getApplication()->input->json;
			$placesData = $postData->get('data','no such thing','RAW');
		}

		$placesReturn = $table->places($placesData);

		echo $placesReturn;


	}//end places

	function getAssets()
	{
		JSession::checkToken( "get" ) or die( "Invalid Token" );
		JTable::addIncludePath(JPATH_COMPONENT . "/tables");
		$table = JTable::getInstance("psmod","Table");

		//works for regular post data ajax call
		$postData = JFactory::getApplication()->input->post;
		$asset_ids = $postData->get('data', 'defaultvalue', 'filter');

		if($asset_ids == "defaultvalue"){
			$postData = JFactory::getApplication()->input->json;
			$asset_ids = $postData->get('data','no such thing','RAW');
		}//end if

		$return_assets = $table->getAssets($asset_ids);

		echo $return_assets;


	}//end getAssets



}//END psmodController
