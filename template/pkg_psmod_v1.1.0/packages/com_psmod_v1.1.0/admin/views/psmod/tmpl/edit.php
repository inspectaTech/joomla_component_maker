<?php
defined("_JEXEC") or die;
//$my_directive = "manual-slideshow";
$release_version = "development";//"production"
//prep url for template home
$core = "../core/";//needed for admin
$xfiles = "components/com_psmod/xfiles/";
$url_prefix= ($release_version == "production") ? JUri::base() : JUri::root();
$home_url = ($release_version == "production") ? JUri::base() . $xfiles : JUri::root() . $core;
$rel_url = ($release_version == "production") ? $xfiles : $core;

$dir = $rel_url . "tool_templates/";//relative path works

//prefixes may not work with php glob($dir) but they do work in a string in js
$template_ary = [];
foreach (glob($dir ."*") as $filename) {
  $my_filename = str_replace("../","",$filename);//this gets rid of '../' or '../core'
    if(is_dir($filename))
    {
      array_push($template_ary,$url_prefix . $my_filename);
    }
}//foreach

//creates an array of template directories and useful to extract template filenames
$tool_templates = implode(",",$template_ary);//stringify the array
?>
<!-- ng-app="pictureShow" -->
<div class="bigBox_outer">
<div class="bigBox"  ng-controller="ShowController as show" data-home="<?php echo $core; ?>" data-templates="<?php echo $tool_templates; ?>">
  <div class="bigBox_lighty" ng-show="show.stable == true"></div><!-- end bigBox_lighty -->
  <div id="ps_hidden_cont" class="ps_hidden_cont2">
  </div><!--end hidden_cont2-->
  <div class="bigBox_content" ng-class="{stabilize:show.stable == true}">
  <div ng-show="show.service.loader" class="curtain"  ng-click="show.service.loader = 0">
    <div class="intermission loader"></div>
  </div>
  <div id="ps_hidden_cont" class="ps_hidden_cont">

    <div id="fBx_lightbox_6763" ng-controller="PanelController as panel" ng-class="{tEdit_show:show.show_editor}" class="fBx_lightbox_5129  fBx_lightbox txt_edit_cont  lightbox popup arc_list_preview ">
      <div id="fBx_glassHouse_6763" class="fBx_glassHouse_6763 fBx_glassHouse txt_edit_display  glassHouse  arc_list_preview ">
        <div id="fBx_glass_title_6763" class="fBx_glass_title_6763 fBx_glass_title  glass_title  arc_list_preview ">
          <h5></h5>
        </div>
        <button class="tEdit_head_btn tEdit_Btn w3-btn" ng-class="{'w3-blue': panel.isMyTab(1)}"
        ng-click="panel.selectTab(1)">Title Text</button>
        <button class="tEdit_body_btn tEdit_Btn w3-btn" ng-class="{'w3-blue': panel.isMyTab(2)}"
        ng-click="panel.selectTab(2)">Body Text</button>
        <button class="tEdit_foot_btn tEdit_Btn w3-btn" ng-class="{'w3-blue': panel.isMyTab(3)}"
        ng-click="panel.selectTab(3)">link</button>
        <!--<div class="inAll">--->
        <div id="fBx_glass_header_6763" ng-class="{hide_panel: panel.notMyTab(1)}" class="fBx_glass_header_6763 fBx_glass_header  glass_header  arc_list_preview ">
          <div class="tEdit_header_txt_cont tEdit_tiny">

            <div class="tHead_label_cont">

              <label class="tHead_label">Custom Header <small>(*optional)</small></label>
              <div class="tHead_btns">
                <div class="select-menu" v-Data='show.service.form.font' s-Data='show.service.custom_head.font'></div>
                <div class="select-menu" v-Data='show.service.form.size' s-Data='show.service.custom_head.size'></div>
                <button class="tHead_time" ng-class="" ng-click="show.toggleTime()">
                  <i class="material-icons" style="font-size:1rem;color:forestgreen">access_time</i><!--subject-->
                </button>
                <div class="tHead_color"><input type="color" id="tHead_color"
                ng-model="show.service.form.color.setColor" ng-model-options="{ getterSetter: true }"/></div>
              </div>
            </div>
            <input type="text" id="tHead_input" class="tHead_input" placeholder="enter a heading..."
            ng-model="show.setHead" ng-model-options="{ getterSetter: true }" />
            <div class="tHead_time_display"></div>
          </div>
        </div>
        <div id="fBx_glass_content_6763" ng-class="{hide_panel: panel.notMyTab(2)}" class="fBx_glass_content_6763 fBx_glass_content  glass_content  arc_list_preview ">
          <div id="fBx_glass_page_0_6763" class="fBx_glass_page_0_6763 fBx_glass_page_0 fBxpage fBx_glass_page  glass_page lbx_page_show glass_page  arc_list_preview " data-title="" style="display: block;">

            <div class="test_move">
            <div class="control-group txt-edit" style="">
                <div class="controls" style="">
                    <?php echo $this->form->getInput("tedit"); //the actual field for the title ?>
                </div>
            </div>
          </div><!--end test_move-->
          </div>
        </div>

        <div class="tEdit_footer tEdit_tiny"  ng-class="{hide_panel: panel.notMyTab(3)}">
          <label class="tAlias_label">Customize 'Read more' text <small>(*optional)</small></label>
          <input type="text" id="tEdit_alias" class="tEdit_alias tEdit_input" placeholder="enter replacement text..."
          ng-model="show.setAlias" ng-model-options="{ getterSetter: true }" />
          <label class="tLink_label">Add a title <small>(*optional)</small></label>
          <input type="url" id="tEdit_link" class="tEdit_link tEdit_input" placeholder="enter a url..."
          ng-model="show.setLink" ng-model-options="{ getterSetter: true }" />
        </div>
      <!--</div> end inAll -->
        <div id="fBx_glass_controls_6763" class="fBx_glass_controls_6763 fBx_glass_controls  glass_controls  arc_list_preview ">
          <button id="fBx_glass_confirm_6763" ng-click="show.message('sendText')" class="fBx_glass_confirm_6763 fBx_glass_confirm glass_confirm  ui-btn ui-icon-check ui-btn-icon-left ui-btn-icon-notext arc_list_preview " title="submit">
            <h4>OK</h4>
          </button>
          <button id="fBx_glass_cancel_6763" ng-click="show.show_editor = 0" class="fBx_glass_cancel_6763 fBx_glass_cancel editor_cancel glass_cancel  ui-btn ui-icon-delete ui-btn-icon-left ui-btn-icon-notext  arc_list_preview " title="cancel">
            <h4>Cancel</h4>
          </button>
        </div>
      </div>
    </div><!--end lightbox -->
  </div><!--end hidden_cont-->
  <!--<div class="boxCtrls w3-row w3-bar green">
  </div>-->
    <div class="contentBox_upr grand w3-row" ng-class="{pre_View : show.on}">
      <div class="faux_vert w3-col m2 w3-card-2"></div><!-- end faux_vert -->
      <div class="showcase w3-rest" ng-class="{'pre_View w3-animate-right' : show.on}">
        <!--
          <div class="<?php //echo $my_directive; ?> pure-h" stars="['one','two']" marquee="manual_slideshow" make-up=""></div>
        -->
        <!--
          <iframe  name="showFrame" class="showFrame" ></iframe>
        -->
        <!-- hidden form and test btn --><!-- index.php/picture-show -->
        <!--
        <form id="show_form" style="display:none"  target="showFrame" action="<?php //$psURL = JUri::root().'index.php?option=com_psmod&view=psmods'; echo $psURL; ?>"
        method="POST" >
            <input type="text" class="menu_data2" name="menu_data2" value="whatever" />
            <input type="text" class="main_title" name="main_title" value="" />
            <input type="text" class="menu_options2" name="menu_options2" value="" />
            <?php //echo JHtml::_("form.token"); ?>
            <input type="submit" value="Submit">
        </form>
        <button type="button" onclick="sampleDisplay()" >update sample</button>
        -->
      </div><!-- end showcase -->
    </div>
    <div class="contentBox_lwr w3-row" ng-class="{pre_View : show.on}" ng-controller="FormController as form" >
      <div  class="vert_tabs w3-col m2 w3-card-2" >
        <h5 class="vert_menu-title w3-bar-item" ng-class="{pre_View : show.on}">Sample</h5>
        <button class="toggleBtn box_ctrl w3-bar-item w3-button tablink" ng-class="{pre_View : show.on}"
        ng-click="show.toggle()" title="view sample">
          <i class="material-icons" style="font-size:1rem;color:white">pageview</i>
        </button><!-- onclick="console.log('btn clicked'); w3.toggleShow('#contentBox_upr');" -->
        <button class="stableBtn box_ctrl w3-bar-item w3-button tablink" type="button" ng-show="show.stable == false"
        ng-click="show.stable = true" title="Showcase View. Good for screens with larger fonts. Helps stabilize scroll bars." >
          <i class="material-icons" style="font-size:1rem;color:white">flight_takeoff</i>
        </button><!-- onclick="sampleDisplay()"  -->
        <button class="stableBtn box_ctrl w3-bar-item w3-button tablink" type="button" ng-show="show.stable == true"
        ng-click="show.stable = false" title="return to default view." >
          <i class="material-icons" style="font-size:1rem;color:white">flight_land</i>
        </button><!-- onclick="sampleDisplay()"  -->
        <h5 class="vert_menu-title w3-bar-item ">Editor</h5>
        <button class="moduleBtn box_ctrl w3-bar-item w3-button tablink" ng-click="show.switchTab('config')" title="module settings" >
          <i class="material-icons" style="font-size:1rem;color:white">settings</i>
        </button><!-- onclick="console.log('btn clicked'); w3.toggleShow('#contentBox_upr');" -->
        <button class="pageBtn box_ctrl w3-bar-item w3-button tablink" ng-click="show.switchTab('page')" title="page editor">
          <i class="material-icons" style="font-size:1rem;color:white">note_add</i>
        </button><!-- onclick="console.log('btn clicked'); w3.toggleShow('#contentBox_upr');" -->
        <button class="editBtn box_ctrl w3-bar-item w3-button tablink" ng-click="show.switchTab('build')" title="show builder">
          <i class="material-icons" style="font-size:1rem;color:white">camera_enhance</i><!-- formerly build-->
        </button><!-- onclick="console.log('btn clicked'); w3.toggleShow('#contentBox_upr');" -->
        <button class="toolBtn box_ctrl w3-bar-item w3-button tablink" ng-click="show.switchTab('tool')" title="show builder">
          <i class="material-icons" style="font-size:1rem;color:white">build</i><!-- formerly build-->
        </button>
        <?php $user = JFactory::getUser(); $add_log = false; $groups = $user->get('groups'); foreach($groups as $group){if(intVal($group) == 8){$add_log = true;}}; ?>
      <?php if ($add_log == true) : ?>
        <button class="logBtn box_ctrl w3-bar-item w3-button tablink" ng-click="show.toggle_log('log')" title="build log">
          <i class="material-icons" style="font-size:1rem;color:white">edit</i>
        </button><!-- onclick="console.log('btn clicked'); w3.toggleShow('#contentBox_upr');" -->
      <?php endif; ?>
      </div><!--end vert_tabs class=" red" -->
    <div class="display_sect w3-rest">
      <div class="img_display w3-col m8" ng-class="{move_mode : show.on}">
        <div class="view_select w3-row" >
            <button class="view_ctrl w3-white w3-btn blue"></button>
            <button class="view_ctrl w3-white w3-btn blue"></button>
            <button class="view_ctrl w3-white w3-btn blue"></button>
            <button class="view_ctrl w3-white asset_view w3-btn blue" ng-click="show.visible_options = 'pages';show.reset_list_ctrls()" title="display pages">
              <i class="material-icons asset_list_img" style="font-size:1.5rem;color:#16438a">insert_drive_file</i>
            </button>
            <button class="view_ctrl w3-white asset_view w3-btn blue" ng-click="show.visible_options = 'assets';show.reset_list_ctrls()" title="display scenes">
              <i class="material-icons asset_photo_img" style="font-size:1.5rem;color:#16438a">photo_library</i>
            </button>
            <button class="view_ctrl w3-white asset_view w3-btn blue" ng-click="show.visible_options = 'tools';show.reset_list_ctrls()" title="display tools">
              <i class="material-icons asset_tools_img" style="font-size:1.5rem;color:#16438a">build</i>
            </button>
        </div>
        <div class="assets_section" ng-show="show.visible_options == 'assets'" ng-controller="AssetController as asset">
          <div display-assets class="assets_cont w3-row "  a-data='show'></div>
          <div class="assets_ctrls list_ctrls w3-card" ng-class="{shrink:asset.list_grow == 0,grow:asset.list_grow == 1}">
            <button class="view_ctrl w3-white asset_view w3-btn blue" ng-click="asset.grow_shrink()">
              <i class="material-icons"  style="font-size:1.5rem;color:#16438a">search</i>
            </button>
            <div class="list_inner asset_ctrl_inner" ng-class="{showup:asset.list_grow == 1}">
              <div class="asset_filter_cont"></div>
              <div class="asset_filt_ctrls">
                <button class="asset_filt_btn asset_filt_chkAll w3-white  w3-btn" ng-click="asset.select_all()">
                  <i class="material-icons"  style="font-size:1rem;color:#16438a">done_all</i>
                </button>
                <button class="asset_filt_btn asset_filt_chkNone w3-white w3-btn" ng-click="asset.clear_all()">
                  <i class="material-icons"  style="font-size:1rem;color:#16438a">block</i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="pages_section" ng-show="show.visible_options == 'pages'" ng-controller="PageController as page">
          <div page-assets class="pages_cont w3-row " p-data='show'></div>
          <div class="pages_ctrls list_ctrls w3-card" ng-class="{shrink:page.list_grow == 0,grow:page.list_grow == 1}">
            <div class="pages_ctrls_option">
                <?php echo $this->form->getInput("menutype3"); //the actual field for the title ?>
                <labe class="pc_option_label">what is this</label>
            </div>
            <div class="pages_ctrls_default">
              <button class="view_ctrl w3-white asset_view w3-btn blue" ng-click="page.grow_shrink()">
                <i class="material-icons"  style="font-size:1.5rem;color:#16438a">search</i>
              </button>
              <div class="list_inner page_ctrl_inner" ng-class="{showup:page.list_grow == 1}">
                <div class="page_filter_cont"></div>
                <div class="page_filt_ctrls">
                  <button class="page_filt_btn page_filt_menu w3-white w3-btn"
                  ng-mousedown="page.set_hold_mode('here goes some text','',page.cycle_menu)">
                    <i class="material-icons"  style="font-size:1rem;color:#16438a">chrome_reader_mode</i>
                  </button>
                  <button class="page_filt_btn page_filt_chkAll w3-white  w3-btn" ng-click="page.select_all()">
                    <i class="material-icons"  style="font-size:1rem;color:#16438a">done_all</i>
                  </button>
                  <button class="page_filt_btn page_filt_chkNone w3-white w3-btn" ng-click="page.clear_all()">
                    <i class="material-icons"  style="font-size:1rem;color:#16438a">block</i>
                  </button>
                </div>
              </div>
            </div><!-- end pages_ctrls_default -->
          </div>
        </div><!-- end pages_section -->
        <div class="tools_section" ng-show="show.visible_options == 'tools'" ng-controller="ToolController as tool">
          <div display-tools class="tools_cont w3-row "  t-data='show'></div>
          <div class="tools_ctrls list_ctrls w3-card" ng-class="{shrink:tool.list_grow == 0,grow:tool.list_grow == 1}">
            <button class="view_ctrl w3-white tool_view w3-btn blue" ng-click="tool.grow_shrink()">
              <i class="material-icons"  style="font-size:1.5rem;color:#16438a">search</i>
            </button>
            <div class="list_inner tool_ctrl_inner" ng-class="{showup:tool.list_grow == 1}">
              <div class="tool_filter_cont"></div>
              <div class="tool_filt_ctrls">
                <!--<button class="tool_filt_btn tool_filt_chkAll w3-white  w3-btn" ng-click="tool.select_all()">
                  <i class="material-icons"  style="font-size:1rem;color:#16438a">done_all</i>
                </button>
                <button class="tool_filt_btn tool_filt_chkNone w3-white w3-btn" ng-click="tool.clear_all()">
                  <i class="material-icons"  style="font-size:1rem;color:#16438a">block</i>
                </button>-->
              </div>
            </div>
          </div>
        </div><!-- end tools_section -->
      </div><!-- end top_display ng-hide="show.on" -->
      <div class="form_display w3-rest" ng-controller="SceneController as scene" ng-init="testVar='angular running.'">
        <div class="stgs_cont editor_sect ng-hide" ng-controller="ModuleController as module" ng-show="show.tab === 'config'">
          <h5 class="show_title" ng-class="{pre_View : show.on}">{{show.title}}</h5>
          <form name="masterForm" action="<?php echo JRoute::_("index.php?option=com_psmod&layout=edit&id="
          .(int) $this->item->id); ?> " ng-submit="masterForm.$valid" method="post" name="adminForm" id="adminForm"
          class="form-validate" novalidate ><!-- option=com_folio&layout -->
              <div class="row-fluid">
                  <div class="span10 form-horizontal ps_config_span">

                      <fieldset>
                          <?php echo JHtml::_("bootstrap.startPane", "myTab",
                          array("active" => "details")); ?>

                          <?php echo JHtml::_("bootstrap.addPanel", "myTab", "details",
                          empty($this->item->id) ? JText::_("COM_PSMOD_NEW_PSMOD", true) :
                          JText::sprintf("COM_PSMOD_EDIT_PSMOD", $this->item->id, true));
                          //JText::_("COM_FOLIO_NEW_FOLIO"   sprintf("COM_FOLIO_EDIT_FOLIO"
                          ?>


                            <div class="stgs_config_cont">
                              <div class="config_section1 config_section" ng-show="module.seeSection == '1'">
                                <h4 class="mod_set_title" ng-class="{pre_View : show.on}">Module Settings</h4>
                                <div class="control-group ps_config_ctrls show_title_ctrlgrp">
                                  <div class="control-label ps_config_label show_title_label">
                                  <script> //alert("<?php echo "edit.php alert " . $this ?>"); </script>

                                      <?php echo $this->form->getLabel("title");
                                      /*edit/new forms initial title field  and label gets data from
                                      FolioViewFolio $this->form = $this->get("Form");*/
                                      ?>
                                  </div>
                                  <div class="titleCont ps_config_input show_title_input">
                                      <?php echo $this->form->getInput("title");//the actual field for the title ?>
                                      <div id="titleMsg" class="titleMsg alert-danger" style=""></div>
                                  </div>
                              </div>
                              <div class="control-group ps_config_ctrls show_title_ctrlgrp" style="display:none">
                                <div class="control-label ps_config_label show_title_label">
                                    <?php echo $this->form->getLabel("data_ids"); ?>
                                </div>
                                <div class="titleCont ps_config_input show_title_input">
                                    <?php echo $this->form->getInput("data_ids");//the actual field for the title ?>
                                </div>
                              </div>
                              <div class="control-group ps_config_ctrls show_title_ctrlgrp" style="display:none">
                                <div class="control-label ps_config_label show_title_label">
                                    <?php echo $this->form->getLabel("data"); ?>
                                </div>
                                <div class="titleCont ps_config_input show_title_input">
                                    <?php echo $this->form->getInput("tool_data");//the actual field for the title ?>
                                </div>
                              </div>
                              <div class="ps_config_mini_cont">
                                <div class="control-group ps_config_ctrls ps_mini" style="">
                                    <div class="control-label ps_config_label show_id_label" style="">
                                        <?php echo $this->form->getLabel("id"); // display:none; title field label ?>
                                    </div>
                                    <div class="controls ps_config_input show_id_input" style="">
                                        <?php echo $this->form->getInput("id"); //the actual field for the title ?>
                                    </div>
                                </div>
                                <div class="control-group ps_config_ctrls ps_mini" style="">
                                  <div class="control-label ps_config_label module_id_label" style="">
                                    <?php echo $this->form->getLabel("module_id"); // display:none; title field label ?>
                                  </div>
                                  <div class="controls ps_config_input module_id_input" style="">
                                    <?php echo $this->form->getInput("module_id"); //the actual field for the title ?>
                                  </div>
                                </div>
                              </div><!-- end ps_config_mini_cont -->
                                <div class="stgs_tab_ctrls">
                                  <div class="w3-third tablink w3-bottombar mod_access_btn w3-hover-light-grey stgs_tab stgs_tab1"
                                  ng-class="{'bottom_blue':module.isMyTab(1)}" ng-click="module.selectTab(1)" title="module access" >
                                    <i class="material-icons" style="font-size:1rem;color:#16438a">extension</i>
                                  </div>
                                  <div class="w3-third tablink w3-bottombar mod_publish_btn w3-hover-light-grey stgs_tab stgs_tab2"
                                  ng-class="{'bottom_blue':module.isMyTab(2)}" ng-click="module.selectTab(2)" title="effective date" >
                                    <i class="material-icons" style="font-size:1rem;color:#16438a">access_time</i>
                                  </div>
                                  <div class="w3-third tablink w3-bottombar mod_order_btn w3-hover-light-grey stgs_tab stgs_tab2"
                                  ng-class="{'bottom_blue':module.isMyTab(3)}" ng-click="show.call_to_order(); module.selectTab(3);" title="reorder modules" >
                                    <i class="material-icons" style="font-size:1rem;color:#16438a">reorder</i>
                                  </div>
                                </div>
                                <div class="stgs_tab_cont1 stgs_tab_cont" ng-show="module.isMyTab(1)">
                                <div class="stgs_access_cont">
                                    <label class="stgs_access_label stgs_access">access:</label>
                                    <label class="stgs_switch switch">
                                      <input class="stgs_access_input stgs_access access" type="checkbox">
                                      <span class="fs_slider"></span>
                                    </label>
                                </div>
                                <div class="control-group ps_config_ctrls" style="">
                                    <div class="control-label ps_config_label access_label" style="">
                                        <?php echo $this->form->getLabel("access"); // display:none; title field label ?>
                                    </div>
                                    <div class="controls ps_config_input access_input" style="">
                                        <?php echo $this->form->getInput("access"); //the actual field for the title ?>
                                    </div>
                                </div>
                                <div class="control-group ps_config_ctrls" style="display:none;">
                                    <div class="control-label ps_config_label status_label" style="">
                                        <?php echo $this->form->getLabel("status"); // display:none; title field label ?>
                                    </div>
                                    <div class="controls ps_config_input status_input" style="">
                                        <?php echo $this->form->getInput("status"); //the actual field for the title ?>
                                    </div>
                                </div>
                                <div class="control-group ps_config_ctrls" style="display:none;">
                                    <div class="control-label ps_config_label order_label" style="">
                                        <?php echo $this->form->getLabel("ordering"); // display:none; title field label ?>
                                    </div>
                                    <div class="controls ps_config_input order_input" style="">
                                        <?php echo $this->form->getInput("ordering"); //the actual field for the title ?>
                                    </div>
                                </div>
                              </div><!-- stgs_tab_cont1 -->
                              <div class="stgs_tab_cont2 stgs_tab_cont" ng-show="module.isMyTab(2)">
                                <div class="control-group ps_config_ctrls" style="">
                                    <div class="control-label ps_config_label publish_date_label" style="">
                                        <?php echo $this->form->getLabel("publish_up"); // display:none; title field label ?>
                                    </div>
                                    <div class="controls ps_config_input publish_date_input" style="">
                                        <?php echo $this->form->getInput("publish_up"); //the actual field for the title ?>
                                    </div>
                                </div>
                                <div class="control-group ps_config_ctrls" style="">
                                    <div class="control-label ps_config_label publish_date_label" style="">
                                        <?php echo $this->form->getLabel("publish_down"); // display:none; title field label ?>
                                    </div>
                                    <div class="controls ps_config_input publish_date_input" style="">
                                        <?php echo $this->form->getInput("publish_down"); //the actual field for the title ?>
                                    </div>
                                </div>
                                <button class="clear_time w3-button" title="reset for an unlimited timeframe" ng-click="show.clearTime('module')">reset</button>
                              </div><!-- stgs_tab_cont2 -->
                              <div class="stgs_tab_cont3 stgs_tab_cont" ng-show="module.isMyTab(3)">
                              </div><!-- stgs_tab_cont3 -->
                            </div><!-- config_section1 -->
                            <div class="config_section2 config_section" ng-show="module.seeSection == '2'">
                              <div class="mod_pos_cont" ng-show="module.service.mod_overlay == '1'">
                                <button class="order_shuffle mod_btn order_action w3-btn" type="button"
                                ng-class="{active:module.shuffle == 'modules'}" ng-click="module.service.mod_overlay = '0'">
                                <i class="material-icons"  style="font-size:1.5rem;color:#16438a">cancel</i>
                                </button>

                                <div class="control-group ps_config_ctrls" style="">
                                    <div class="control-label ps_config_label position_label" style="">
                                        <?php echo $this->form->getLabel("position"); // display:none; title field label ?>
                                    </div>
                                    <div class="controls ps_config_input position_input" style="">
                                        <?php echo $this->form->getInput("position"); //the actual field for the title ?>
                                    </div>
                                </div>
                              </div>
                              <label class="re-order_label"><strong>reordering {{module.shuffle}}</strong></label>
                              <div class="config_shuffle_btn_cont">
                                <button class="order_shuffle mod_btn order_action w3-btn" type="button"
                                ng-class="{active:module.shuffle == 'modules'}" ng-click="module.shuffle = 'modules'">
                                modules</button>
                                <button class="order_shuffle aset_btn order_action w3-btn" type="button"
                                ng-class="{active:module.shuffle == 'scenes'}"
                                ng-click="show.call_to_order(); module.shuffle = 'scenes'">
                                scenes</button>
                              </div>
                              <div class="control-group ps_config_ctrls ordering" data-mode="modules"
                              o-data='show.module_position' order-mode="module" ng-show="module.shuffle == 'modules'" style="">
                              </div>
                              <div class="control-group ps_config_ctrls ordering" data-mode="assets" style=""
                              a-data='show.service.asset_reference' order-mode="'asset'" a-ids='show.service.asset_ids' ng-show="module.shuffle == 'scenes'" >
                              </div>
                            </div>
                            <div class="config_section3 config_section" ng-show="module.seeSection == '3'">
                            </div>
                            <div class="config_section_btn_cont">
                              <button class="w3-white w3-btn w3-circle" type="button"
                              ng-class="{active:module.seeSection == '1'}" ng-click="module.seeSection = '1'"></button>
                              <button class="w3-white w3-btn w3-circle" type="button"
                              ng-class="{active:module.seeSection == '2'}"
                              ng-click="show.call_to_order(); module.seeSection = '2'"></button>
                              <!--
                                <button class="w3-white w3-btn w3-circle" type="button"
                                ng-class="{active:module.seeSection == '3'}"
                                ng-click="show.call_to_order(); module.seeSection = '3'"></button>
                              -->
                            </div>

                          </div><!-- end stgs_config_cont -->

                              <!-- END INVISIBLE SECTION -->

                              <?php echo JHtml::_("bootstrap.endPanel"); ?>

                              <input type="hidden" name="task" value="" />
                              <?php echo JHtml::_("form.token"); ?>
                              <?php echo JHtml::_("bootstrap.endPanel"); ?>
                      </fieldset>
                  </div>
              </div>
          </form>
        </div><!--end stgs_cont -->

        <div class="bldr_cont editor_sect ng-hide" ng-show="show.tab === 'build'">
          <h4 class="img_bldr_title" ng-class="{pre_View : show.on}">Scene Builder</h4>
          <h5 class="show_title" ng-class="{pre_View : show.on}">{{show.title}}</h5>
          <form name="showForm" id="showForm" class=""  novalidate autocomplete="off" novalidate><!-- form-validate option=com_folio&layout -->
            <input autocomplete="off" name="hidden" type="text" style="display:none;">
              <div class="row-fluid">
                  <div class="span10 form-horizontal upload-span">
                      <fieldset>
                      <div class="build_section1 build_sections" ng-show="scene.seeSection == '1'">
                      <div class="build_title_cont">
                        <label class="build_title_label">node title:</label>
                        <input type="text" id="build_title_input"
                        ng-model="scene.ShowData.title" class="build_title_input build_form" required/>
                      </div>
                              <div class="control-group upload-cont" style="">
                                  <div class="control-label" style="">
                                      <?php echo $this->form->getLabel("imageurl"); //title field label ?>
                                  </div>
                                  <div class="controls image_upload_ctrls" style="">
                                      <?php echo $this->form->getInput("imageurl"); //the actual field for the title ?>
                                  </div>
                              </div>
                              <div class="link_title_cont">
                                <!--<label class="link_title_label">node tite:</label>
                                ng-model-options="{updateOn : 'blur change'}"-->
                                <input type="url" id="link_title" class="link_title_input build_form " ng-focus="form.onTextClick($event)"
                                placeholder="add an image link..." ng-class="{'w3-disabled':form.isReady}"
                                 value="{{scene.ShowData.url}}" ng-model="form.set_img_preview" ng-model-options="{ getterSetter: true }"
                                 required />
                              </div>
                              <div class="edit_txt_cont">
                                <!--<label class="link_title_label">node tite:</label>
                                ng-model-options="{updateOn : 'blur change'}"-->
                                <input type="hidden" id="editor_text" class="editor_text build_form "
                               ng-model="scene.ShowData.text" /><!--value="{{scene.ShowData.text}}"-->
                              </div>

                              <!-- <p>{{form.url}}--></p><!-- used for learning to update the module -->
                              <hr class="splitter"/>
                              <div class="preview_ctrls_cont">
                                <button class="preview_img preview_btn w3-button" ng-click="txt_on = false">
                                  <i class="material-icons" style="font-size:1rem;color:black">photo_camera</i>
                                </button>
                                <button class="preview_txt preview_btn w3-button" ng-click="txt_on = true">
                                  <i class="material-icons" style="font-size:1rem;color:black">insert_drive_file</i>
                                </button>
                              </div>
                              <!--
                              <div></div>
                              <button></button>
                              -->
                              <div class="preview_area w3-border">
                                <button class="pv_img pv_edit_btn w3-button w3-border w3-circle w3-white"
                                ng-click="form.view_img_editor(scene.ShowData.url)" ng-class="{txt_on:txt_on}">
                                  <i class="material-icons " style="font-size:1rem;color:black">photo_size_select_large</i>
                                </button>
                                <button class="pv_txt pv_edit_btn w3-button w3-border w3-circle w3-white" ng-class="{txt_on:txt_on}"
                                ng-click="show.showEditor()">
                                  <i class="material-icons" style="font-size:1rem;color:black">spellcheck</i><!--subject-->
                                </button>
                                <button class="pv_set pv_edit_btn w3-button w3-border w3-circle w3-white" ng-class="{txt_on:txt_on}"
                                ng-click="form.canvas_config('open')">
                                  <i class="material-icons" style="font-size:1rem;color:black">settings</i><!--subject-->
                                </button>
                                <div class="preview_img_cont pv_cont" ng-class="{txt_on:txt_on}">
                                  <div class="canvas_form" ng-class="{reveal:form.config_canvas}">
                                    <div class="can_form_ctrls"  >
                                      <button class="can_land w3-white w3-btn can_orient" ng-click="form.orient_canvas('landscape')"></button>
                                      <button class="can_port w3-white w3-btn can_orient" ng-click="form.orient_canvas('portrait')"></button>
                                      <button class="can_prof w3-white w3-btn can_orient" ng-click="form.orient_canvas('profile')"></button>
                                      <button class="can_cancel w3-white w3-btn can_orient" ng-click="form.canvas_config('close')" ></button>
                                    </div>
                                    <div class="can_info">
                                      <label class="cust_can_label cic">canvas layout:</label>
                                      <div class="can_style">{{form.can_style}}</div>
                                    </div>
                                    <div class="can_inp_cont">
                                      <label class="cust_can_label cic">width</label>
                                      <input type="text" class="cust_can_input cic" ng-model="form.custom_canvas_width"  ng-model-options="{ getterSetter: true }"/>
                                      <!--<button class="cust_can_cancel cic"></button> -->
                                    </div>
                                    <div class="can_inp_cont">
                                      <label class="cust_can_label cic">height</label>
                                      <input type="text" class="cust_can_input cic" ng-model="form.custom_canvas_height"  ng-model-options="{ getterSetter: true }"/>
                                      <!--<button class="cust_can_cancel cic"></button> -->
                                    </div>
                                  </div>
                                  <div class="canvas_display" ng-class="{portrait:form.portrait}">
                                  </div>
                                </div>
                                <div class="text_area pv_cont" ng-class="{txt_on:txt_on}">
                                  <div class="text-preview" e-txt='scene.ShowText'></div>
                                </div>
                              </div><!-- end preview_area" -->
                            </div>
                            <div class="build_section2 build_sections"  ng-show="scene.seeSection == '2'">
                            </div>
                            <div class="build_section3 build_sections" ng-show="scene.seeSection == '3'">
                            </div>
                            <div class="build_section_btn_cont">
                              <button class="w3-white w3-btn w3-circle"
                              ng-class="{active:scene.seeSection == '1'}" ng-click="scene.seeSection = '1'"></button>
                              <button class="w3-white w3-btn w3-circle"
                              ng-class="{active:scene.seeSection == '2'}" ng-click="scene.seeSection = '2'"></button>
                              <button class="w3-white w3-btn w3-circle"
                              ng-class="{active:scene.seeSection == '3'}" ng-click="scene.seeSection = '3'"></button>
                            </div>
                              <div class="submit_ctrls">
                                <button type="submit" value="submit scene" class="add_scene w3-button w3-round-xlarge" ng-click="scene.processEntry('submit')">
                                  <i class="material-icons" style="font-size:1rem;color:forestgreen">check_circle</i><!--subject-->
                                </button>
                                <button class="cancel_scene w3-button w3-round-xlarge" ng-click="scene.processEntry('cancel')">
                                  <i class="material-icons" style="font-size:1rem;color:FireBrick">cancel</i><!--subject-->
                                </button>
                            </div>
                      </fieldset>
                    </div>
                  </div>
          </form>
        </div><!--end bldr_cont -->

        <div class="page_cont editor_sect ng-hide" ng-show="show.tab === 'page'"
        ng-controller="PageController as page">
          <h5 class="show_title" ng-class="{pre_View : show.on}">{{show.title}}</h5>
          <form name="pageForm" id="pageForm"
          class="form-validate" novalidate><!-- option=com_folio&layout -->
              <div class="row-fluid">
                  <div class="span10 form-horizontal ps_config_span">

                      <fieldset>
                        <div class="stgs_config_cont page_content" >
                            <h4 class="page_edit_title" ng-class="{pre_View : show.on}">Page Editor</h4>
                            <div class="page_subPage page_subPage1" ng-show="page.subPager == '1'">
                              <div class="page_access_cont">
                                <label class="page_access">access:</label>
                                <label class="page_switch switch">
                                  <input class="access" type="checkbox" ng-model="page.is_published()" ng-model-options="{ getterSetter: true }"/>
                                  <span class="fs_slider"></span>
                                </label>
                              </div>
                              <div class="control-group ps_config_ctrls pg_ed">
                                <div class="titleCont ps_config_input page_title_input">
                                    <?php //echo $this->form->getInput("title2");//the actual field for the title ?>

                                    <input class="pageTitleInput borderline" ng-model="page.service.edit.title" title="{{page.service.edit.title}}"

                                    ng-blur="page.uniqueCheck(); page.prepAlias()" required/>
                                    <div id="pageTitleMsg" class="pageTitleMsg alert-danger" style=""></div>
                                </div>
                                <div class="control-label ps_config_label page_title_label">
                                    <?php //echo $this->form->getLabel("title2");?>
                                    <label>Page Title</label>
                                </div>
                              </div>
                              <div class="control-group ps_config_ctrls pg_ed">
                                <div class="aliasCont ps_config_input page_alias_input">
                                    <?php //echo $this->form->getInput("title2");//the actual field for the title ?>

                                    <input class="pageAliasInput borderline" ng-model="page.service.edit.alias"
                                    ng-blur="page.prepAlias()" title="{{page.service.edit.alias}}" required/>

                                </div>
                                <div class="control-label ps_config_label page_alias_label">
                                    <?php //echo $this->form->getLabel("title2");?>
                                    <label>Url alias <small>(ex: .com/your-alias)</small></label>
                                </div>
                              </div>
                              <div class="control-group ps_config_ctrls pg_ed page_access_cont" style="">
                                <div class="page_access_section">
                                  <div class="controls ps_config_input access_input" style="">
                                      <?php echo $this->form->getInput("access2"); //the actual field for the title ?>
                                  </div>
                                  <div class="control-label ps_config_label access_label" style="">
                                      <?php echo $this->form->getLabel("access2"); // display:none; title field label ?>
                                  </div>
                                </div>
                                <div class="page_id_sect">

                                  <div class="page_id_div" title="{{page.service.edit.id}}">{{page.service.edit.id}}</div>

                                  <label class="page_id_label">id</label>
                              </div>
                              </div>
                              <div class="control-group ps_config_ctrls pg_ed" style="display:none;">
                                  <div class="control-label ps_config_label status_label" style="">
                                      <?php echo $this->form->getLabel("status2"); // display:none; title field label ?>
                                  </div>
                                  <div class="controls ps_config_input status_input" style="">
                                      <?php echo $this->form->getInput("status2"); //the actual field for the title ?>
                                  </div>
                              </div>
                            </div><!-- end page_subPage1 -->
                            <div class="page_subPage page_subPage2" ng-show="page.subPager == '2'">
                              <div class="control-group ps_config_ctrls" style="">
                                  <div class="control-label ps_config_label publish_date_label" style="">
                                      <?php echo $this->form->getLabel("template2"); // display:none; title field label ?>
                                  </div>
                                  <div class="controls ps_config_input publish_date_input" style="">
                                      <?php echo $this->form->getInput("template2"); //the actual field for the title ?>
                                  </div>
                              </div>
                              <!--
                              <div class="control-group ps_config_ctrls" style="display:none">
                                  <div class="control-label ps_config_label publish_date_label" style="">
                                      <?php //echo $this->form->getLabel("publish_up2"); // display:none; title field label ?>
                                  </div>
                                  <div class="controls ps_config_input publish_date_input" style="">
                                      <?php //echo $this->form->getInput("publish_up2"); //the actual field for the title ?>
                                  </div>
                              </div>
                              <div class="control-group ps_config_ctrls" style="display:none">
                                  <div class="control-label ps_config_label publish_date_label" style="">
                                      <?php //echo $this->form->getLabel("publish_down2"); // display:none; title field label ?>
                                  </div>
                                  <div class="controls ps_config_input publish_date_input" style="">
                                      <?php //echo $this->form->getInput("publish_down2"); //the actual field for the title ?>
                                  </div>
                              </div>
                              <button class="clear_time page_time w3-button" style="display:none"
                              title="reset for an unlimited timeframe"
                              ng-click="show.clearTime('page')">reset
                              </button>
                             -->
                             <div class="control-group ps_config_ctrls" style="">
                                 <div class="control-label ps_config_label publish_date_label" style="">
                                     <?php echo $this->form->getLabel("menutype2"); // display:none; title field label ?>
                                 </div>
                                 <div class="controls ps_config_input publish_date_input" style="">
                                   <?php echo $this->form->getInput("menutype2"); //the actual field for the title ?>
                                 </div>
                             </div>
                            </div><!-- end page_subPage2 -->
                            <div class="page_subPage page_subPage3" ng-show="page.subPager == '3'">

                            </div><!-- end page_subPage3 -->
                            <div class="page_subPage page_subPage4" ng-show="page.subPager == '4'">
                              <div class="page_log_cont" style="">
                                <label>page log</label>

                                <p>title:{{page.service.edit.title}}</p>
                                <p>published:{{page.service.edit.published}}</p>
                                <p>page data: {{page.service.data.page_ids.join()}}</p>
                                <p>access:{{page.service.edit.access}}</p>
                                <p>start:{{page.service.edit.publish_up}}</p>
                                <p>end:{{page.service.edit.publish_down}}</p>
                                <p>template:{{page.service.edit.template_style_id}}</p>
                                <p>pg menutype:{{page.service.edit.menutype}}</p>

                                <p>valid form:{{pageForm.$valid}}</p>
                              </div>
                            </div><!-- end page_subPage4 -->
                            <div class="page_ctrls">
                            <div class="page_subPage_btn_cont">
                              <button class="w3-white w3-btn w3-circle"
                              ng-class="{active:page.subPager == '1'}" ng-click="page.subPager = '1'"></button>
                              <button class="w3-white w3-btn w3-circle"
                              ng-class="{active:page.subPager == '2'}" ng-click="page.subPager = '2'"></button>
                              <button class="w3-white w3-btn w3-circle"
                              ng-class="{active:page.subPager == '3'}" ng-click="page.subPager = '3'"></button>
                              <button class="w3-white w3-btn w3-circle"
                              ng-class="{active:page.subPager == '4'}" ng-click="page.subPager = '4'"></button>
                            </div>

                            <div class="page_submit">
                              <button value="save page" class="add_page w3-btn w3-round-xlarge" ng-click="page.processEntry('submit')">

                                <i class="material-icons page_save" ng-hide="page.service.edit.id == '0'" style="font-size:1rem;color:#16438a"
                                ng-class="{visible:page.mode != 'init'}">save</i><!--subject-->
                                <i class="material-icons page_add" ng-show="page.service.edit.id == '0'"

                                style="font-size:1rem;color:#16438a">add</i>
                              </button>
                              <button class="clear_page w3-btn w3-round-xlarge" ng-click="page.processEntry('cancel')">
                                <i class="material-icons" style="font-size:1rem;color:#16438a">delete</i><!--subject-->
                              </button>
                            </div>
                          </div><!-- end ctrls -->
                          </div><!-- end stgs_config_cont -->

                              <!-- END INVISIBLE SECTION display:none;-->



                      </fieldset>
                  </div>
              </div>
          </form>
        </div><!--end page_cont -->
        <div class="tool_cont editor_sect ng-hide" ng-show="show.tab === 'tool'">
          <div class="stgs_config_cont page_content">
            <h5 class="show_title" ng-class="{pre_View : show.on}">{{show.title}}</h5>
            <div id="some_id" class="settings_mover" ng-class="{
                'move_mode w3-card' : show.move_stgs && show.on,
                'stage2':show.move_stgs && show.on && show.move_stgs_view == 2,
                'stage1':show.move_stgs && show.on && show.move_stgs_view == 1,
                'stage0':show.move_stgs && show.on && show.move_stgs_view == 0
              }" ng-mouseenter="show.set_opacity('off',show.move_opacity,'settings_mover')" ng-mouseleave="show.set_opacity('on',show.move_opacity,'settings_mover')"
              ng-draggable='show.dragOptions'>
              <div class="squaredOne" ng-hide="show.on" ng-click="show.set_move_stgs('full')">
                <input type="checkbox" value="None" id="squaredOne" name="check" checked ng-model="show.move_stgs" />
                <label for="squaredOne" ></label>
              </div>
              <button class="w3-white w3-btn drag_handle" ng-show="show.move_stgs && show.on &&show.move_stgs_view == 0"
              ng-dblclick="show.set_move_stgs('full');show.set_opacity('off',show.move_opacity,'settings_mover')" >
                <i class="material-icons drag_handle" style="font-size:2rem;color:#17315a">settings</i><!--show.tab = 'build'-->
              </button>
              <div class="stgs_mov_ctrls drag_handle" ng-show="show.move_stgs && show.on && show.move_stgs_view != 0" >

                <div class="move_opacity squaredOne navy" >
                  <input type="checkbox" value="None" id="move_opacity" name="opacity" checked ng-model="show.move_opacity" />
                  <label for="move_opacity" ></label>
                </div>
                <button class="w3-white w3-btn " ng-click="show.set_move_stgs('plus')">
                  <i class="material-icons" style="font-size:1.5rem;color:#17315a">add_circle</i><!--show.tab = 'build'-->
                </button>
                <button class="w3-white w3-btn " ng-click="show.set_move_stgs('minus')">
                  <i class="material-icons" style="font-size:1.5rem;color:#17315a">remove_circle</i><!--show.tab = 'build'-->
                </button>
                <button class="w3-white w3-btn " ng-click="show.set_move_stgs('reset')">
                  <i class="material-icons" style="font-size:1.5rem;color:#17315a">close</i><!--show.tab = 'build'-->
                </button>
              </div>
              <div class="template_settings" ng-hide="show.move_stgs && show.on && show.move_stgs_view == 0"></div>
            </div><!-- end settings_mover -->
          </div><!-- end stgs_config_cont -->
        </div><!--end tool_cont -->
      <?php if ($add_log == true) : ?>
        <div class="log_cont w3-orange editor_sect ng-hide" ng-show="show.tab === 'log'">
          <p>title {{scene.ShowData.title}}</p>
          <p>tHead {{scene.ShowHead}}</p>
          <p>tcolor {{scene.ShowHead.color}}</p>
          <p>body data {{scene.ShowBody}}</p>
          <p>valid {{showForm.$valid}}</p>
          <p>tAlias {{scene.ShowLink.alias}}</p>
          <p>tLink {{scene.ShowLink.url}}</p>
          <p>created {{scene.ShowDate.created.date}}</p>
          <p>cTimestamp {{scene.ShowDate.created.timestamp}}</p>
          <p>modified {{scene.ShowDate.modified.date}}</p>
          <p>mTimestamp {{scene.ShowDate.modified.timestamp}}</p>
        </div><!--end log_cont -->
      <?php endif; ?>
        <div class="sample_cont w3-card-4 editor_sect ng-hide"  ng-show="show.tab === 'sample'">
          <div class="sample_delete" ng-show="show.delete_mode">
            <h4>are you sure you want to delete:</h4>
            <h4 class="sample_asset_title">{{form.sample_view.title}}</h4>
            <div class="sample_delete_ctrls">
              <button class="sam_del_delete sDB w3-btn " ng-click="show.delete_asset(form.sample_view.id)" title="delete">
                <i class="material-icons" style="font-size:2rem;color:white">delete</i>
              </button>
              <button class="sam_del_cancel sDB w3-btn " ng-click="show.manage_delete('remove')"  title="cancel">
                <i class="material-icons" style="font-size:2rem;color:white">close</i>
              </button>
            </div>
          </div>
          <button class="sample_cont_close w3-btn w3-circle" ng-click="show.toggle_log('sample','clear')" title="show builder">
            <i class="material-icons" style="font-size:1rem;color:white">close</i><!--show.tab = 'build'-->
          </button>
          <h4 class="sample_asset_title">{{form.sample_view.title}}</h4>
          <div class="sample_img_cont"></div>
          <hr/>
          <div class='sv_head' ng-bind-html="form.sample_view.head"></div>
          <div ng-bind-html="form.sample_view.body"></div>
        </div>
      </div><!--end form_display -->

    </div><!--end display_sect -->
    <!--<p>test title = {{form.testTitle}} </p>
    <p>test city = {{form.city}}</p> -->
  </div><!--end contentBox -->
  <!--<p>my area {{myIn}}</p> -->
</div><!-- end bigBox_content -->
</div><!-- end bigBox -->
</div><!-- bigBox_outer -->
<script>
window["SITEURL"] = "<?php echo JUri::current(); ?>";//has index.php in it
window["BASEURL"] =  "<?php echo JUri::base(); ?>";//has administrator/
window["ADMINCOMP"] =  "<?php echo JUri::base(); ?>components/com_psmod/";//has administrator/
window["ROOTURL"] =  "<?php echo JUri::root(); ?>";//just the .com/ address
window["FORM_TOKEN"] = "<?php echo JSession::getFormToken(); ?>";
window["TEMPLATEURL"] =  "<?php echo JUri::base(); ?>";//has administrator/

const MY_GROUP = "<?php $user = JFactory::getUser(); echo $groups = implode(",",$user->get('groups')); ?>";

console.log(MY_GROUP);

document.addEventListener('DOMContentLoaded', function () {
  console.log("content loaded running!");
  prepElements();
  prepModuleEvents();
});

</script>
