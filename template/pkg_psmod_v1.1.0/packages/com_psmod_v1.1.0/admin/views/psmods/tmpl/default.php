<?php
defined("_JEXEC") or die;

$listOrder = "";
$listDirn = "";
/*this is the file that shows up in the back end display after
choosing folio in the components drop down menu.*/
?>


<!-- <h1>What?</h1>
<textarea rows="20" cols"50" >
<?php

/*require_once JPATH_COMPONENT."/views/folios/view.html.php";
$mish = JViewLegacy::__toString();//still not sure what this class does
echo $mish; //returns {"id":null,"title":null,"alias":null}
*/
?>
</textarea>
<div style="width:200px; height:200px; border:1px solid red;">
<a href="tel:202-713-1314">202-713-1314</a>

</div> -->

<?php /* I think I can use this to block out the rest of this code. */?>
<!-- -->


<form action="<?php echo JRoute::_("index.php?option=com_psmod&view=psmods");/*option=com_folio&view=folios */ ?>"
 method="post" name="adminForm" id="adminForm" >
 <div id="j-main-container" class="span12">
     <div class="clearfix"></div>
     <table class="table table-striped" id="psmodList"><!--id="folioList" -->
         <thead>
             <tr>
                 <th width="10%" class="center"><!-- hidden-phone -->
                     <input type="checkbox" name="checkall-toggle" value=""
                     title="<?php echo JText::_("JGLOBAL_CHECK_ALL"); ?>"
                     onclick="Joomla.checkAll(this)" />
                 </th>
                 <th class="title menus_title" >
                     <?php echo JHtml::_("grid.sort", "JGLOBAL_TITLE", "a.title",
                     $listDirn, $listOrder); ?>
                 </th>
                 <th width="5%" class="nowrap center hidden-phone">
                     <?php echo JHtml::_("grid.sort", "JGRID_HEADING_ID", "a.id",
                     $listDirn, $listOrder); ?>
                 </th>
                 <th width="20%" class="nowrap center hidden-phone">
                     style
                 </th>
                 <th width="20%" class="nowrap center">
                     <?php echo JHtml::_("grid.sort", "COM_PSMOD_HEADING_POSITION", "b.position",
                     $listDirn, $listOrder); ?>
                 </th>
                 <th width="5%" class="nowrap center">
                     <?php echo JHtml::_("grid.sort", "JSTATUS", "b.published",
                     $listDirn, $listOrder); ?>
                 </th>
                 <th width="5%" class="nowrap hidden-phone">
                     <?php echo JHtml::_("grid.sort", "COM_PSMOD_HEADING_MODULEID", "a.module_id",
                     $listDirn, $listOrder); ?>
                 </th>
             </tr>
         </thead>
         <tbody>
             <?php foreach($this->items as $i => $item): ?>
             <tr class="row<?php echo $i % 2; ?>" id="row<?php echo $i ?>">
                 <td class="center "><!-- hidden-phone -->
                     <?php echo JHtml::_("grid.id", $i, $item->id); ?>
                 </td>
                 <td class="nowrap has-context menus_title">
                 <a href="<?php echo JUri::current() . "?option=com_psmod&task"
                 . "=psmod.edit&id=".(int) $item->id; /*"index.php?option=com_folio&task
                 =folio.edit&id="*/ ?>">
                     <?php echo $this->escape($item->title); ?>
                 </a>
                 </td>
                 <td class="center hidden-phone">
                 <?php echo (int) $item->id; ?>
                 </td>
                 <td class="center hidden-phone">
                     <?php
                         $option_obj = json_decode($item->options);
                         $menu_style = (isset($option_obj->menu_style)) ? $this->escape($option_obj->menu_style) : "";
                         echo $menu_style;
                     ?>
                 </td>
                 <!--<td class="center hidden-phone">
                 <?php //$position = (isset($option_obj->position)) ? $this->escape($option_obj->position) : ""; echo $position; ?>
                 </td>-->
                 <td class="center">
                 <span class="label label-info">
                 <?php echo $this->escape($item->position); ?>
                 </span>
                 </td>
                 <td class="center">
                 <?php echo JHtml::_("jgrid.published",$item->published,$i,"psmods.","","cb",
                 $item->publish_up,$item->publish_down); ?>
                 </td>

                 <td class="center hidden-phone" id="module_<?php echo $i ?>">
                 <?php echo (int) $item->module_id; ?>
                 </td>

             </tr>
             <input type="hidden" name="options" value="" />
             <?php endforeach; ?>
         </tbody>
     </table>

     <input type="hidden" name="task" value="" />
     <input type="hidden" name="boxchecked" value="0" />
     <input type="hidden" name="filter_order" value="<?php echo $listOrder; ?>" />
     <input type="hidden" name="filter_order_Dir" value="<?php echo $listDirn; ?>" />
     <?php echo JHtml::_("form.token"); ?>

</form>
</div>
<script>
window["FORM_TOKEN"] = "<?php //echo JHtml::_("form.token"); ?>";
prepEvents();
</script>

