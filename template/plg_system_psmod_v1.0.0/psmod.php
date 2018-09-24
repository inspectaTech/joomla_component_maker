<?php
/**
 * @package     Joomla.Plugin
 * @subpackage  System.psmod
 * @since 1.0
 * @copyright   Copyright (C) 2005 - 2018 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

/**
 * Joomla! psmod Plugin.
 *
 * @since  1.6
 * @deprecate  4.0  Obsolete
 */
class PlgSystemPsmod extends JPlugin
{
	/**
	 * After initialise.
	 *
	 * @return  void
	 *
	 * @since   1.6
	 * @deprecate  4.0  Obsolete
	 */
	public function onAfterInitialise()
	{
		// // Get the header.
		// $header = $this->params->get('header', 'NOI ADM DEV PSAi COM NAV OUR OTRo STP IND DEM');
		// $header = trim($header);
		//
		// // Bail out on empty header (why would anyone do that?!).
		// if (empty($header))
		// {
		// 	return;
		// }
		//
		// // Replace any existing P3P headers in the response.
		// JFactory::getApplication()->setHeader('P3P', 'CP="' . $header . '"', true);

		// Do something onAfterInitialise
		// $fileLink = JFactory::getDocument();
		// $fileLink->addScriptDeclaration('console.log("onAfterInitialise started"); alert("onAfterInitialise started");');
	}

	/**
	 * Listener for the `onAfterRoute` event
	 *
	 * @return  void
	 *
	 * @since   1.0
	 */
	public function onAfterRoute()
	{
		// Do something onAfterRoute
		// $fileLink = JFactory::getDocument();
		// $fileLink->addScriptDeclaration('console.log("onAfterRoute started"); alert("onAfterRoute started")');
	}

	/**
	 * Listener for the `onAfterDispatch` event
	 *
	 * @return  void
	 *
	 * @since   1.0
	 */
	public function onAfterDispatch()
	{
		// Do something onAfterDispatch
		// $fileLink = JFactory::getDocument();
		// $fileLink->addScriptDeclaration('console.log("onAfterDispatch started"); alert("onAfterDispatch started")');
	}

	/**
	 * Listener for the `onAfterRender` event
	 *
	 * @return  void
	 *
	 * @since   1.0
	 */
	public function onAfterRender()
	{
		// Do something onAfterRender
		$fileLink = JFactory::getDocument();
		$fileLink->addScriptDeclaration('console.log("onAfterRender started");
		//alert("onAfterRender started");
		// console.log("starting service worker");
		// alert("starting service worker");
		// console.log("get service worker = ",getServiceWorker);
		// getServiceWorker();
		// ');


	}

	/**
	 * Listener for the `onBeforeCompileHead` event
	 *
	 * @return  void
	 *
	 * @since   1.0
	 */
	public function onBeforeCompileHead()
	{
		//hint for onBeforeCompileHead
		// https://joomla.stackexchange.com/questions/12098/cant-add-javascript-in-plugin

		// Do something onAfterRender

		// show an alert
		$fileLink = JFactory::getDocument();
		// $fileLink->addScriptDeclaration('console.log("onBeforeCompileHead started"); alert("onBeforeCompileHead started")');

		// new path
		$fireManifest = JUri::base() . "plugins/system/psmod/firebase/manifest.json";
		$fileLink->addHeadLink($fireManifest,'manifest','rel');

		$firebase = "https://www.gstatic.com/firebasejs/3.6.0/firebase.js";
		$fileLink->addScript($firebase);

		$firebase_main = JUri::base() . "plugins/system/psmod/firebase/fire.js";
		$fileLink->addScript($firebase_main);

		// this is the last thing that runs since i can't get onAfterRender running
		$fileLink->addScriptDeclaration('
		// console.log("starting service worker");
		// alert("starting service worker");
		// console.log("get service worker = ",getServiceWorker);
		// fire.js depends on ROOT_URL
		window[\'ROOT_URL\'] =  "' . JUri::root() . '";
		// console.log("root = ",ROOT_URL);
		// start the service worker
		getServiceWorker();
		');
	}

	// $fileLink = JFactory::getDocument();

	// original paths
	// $fireManifest = JUri::base() . "components/com_aliintro/xfiles/js/firebase/manifest.json";
	// $fileLink->addHeadLink($fireManifest,'manifest','rel');

	// $firebase = "https://www.gstatic.com/firebasejs/3.6.0/firebase.js";
	// $fileLink->addScript($firebase);

	// $firebase_main = JUri::base() . "components/com_aliintro/xfiles/js/firebase/fire.js";
	// $fileLink->addScript($firebase_main);

	// more firebase code i hadn't used
	//$homeManifest = JUri::base() . "components/com_aliintro/xfiles/manifest.json";
	//$fileLink->addHeadLink($fireManifest,'manifest','rel');
	//$fileLink->addHeadLink($homeManifest,'manifest','rel');
	//$fileLink->setMetaData('google-signin-client_id','1033836948812-jrge6nv090i395ts1tgt06dj5qjavtsd.apps.googleusercontent.com');
	//$fileLink->setMetaData('Content-Type','text/sw+javascript',true);


}
