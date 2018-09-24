<?php defined("_JEXEC") or die ;
$release_version = "development";//"production"
$core = "core/";
//$xfiles = JUri::base(). "components/com_psmod/xfiles/";
$xfiles = "modules/mod_psmod/xfiles/";
$url_prefix= ($release_version == "production") ? JUri::base() : JUri::root();
$home_url = ($release_version == "production") ? JUri::base() . $xfiles : JUri::root() . $core;
$rel_url = ($release_version == "production") ? $xfiles : $core;

?>

<div class="mod_psmod<?php echo $module->id ?> mod_psmod" data-module="<?php echo $module->id ?>"
  ng-controller="showTimeController as showTime" root="mod_psmod<?php echo $module->id ?>"
  data-home="<?php echo $home_url; ?>">
  <div id="tool_showcase<?php echo $module->id ?>" class="tool_showcase<?php echo $module->id ?>"></div>
  <!--showTime: {{showTime.app}}</br>
  showData module id: {{showTime.service.module_id}}-->
</div>
<script>

window["SITEURL"] = "<?php echo JUri::current(); ?>";//has index.php in it
window["BASEURL"] =  "<?php echo JUri::base(); ?>";//has administrator/
window["ADMINCOMP"] =  "<?php echo JUri::base(); ?>components/com_psmod/";//has administrator/
window["ROOTURL"] =  "<?php echo JUri::root(); ?>";//just the .com/ address
window["FORM_TOKEN"] = "<?php echo JSession::getFormToken(); ?>";

  if(!mod_id_class){var mod_id_class}
    mod_id_class = ".mod_psmod<?php echo $module->id ?>";
    angular.bootstrap(document.querySelector(mod_id_class), ['pictureShow']);

</script>
