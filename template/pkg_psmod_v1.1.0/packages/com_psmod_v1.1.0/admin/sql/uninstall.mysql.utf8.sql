DROP TABLE IF EXISTS `#__psmod`;
DROP TABLE IF EXISTS `#__psmod_assets`;
 DELETE FROM `#__menu` WHERE `menutype` = 'psmodmenu';
 DELETE FROM `#__menu_types` WHERE `menutype` = 'psmodmenu';
