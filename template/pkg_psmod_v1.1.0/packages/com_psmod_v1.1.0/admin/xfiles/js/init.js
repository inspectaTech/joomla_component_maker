
function prepElements()
{
  //var tog_btn = document.getElementsByClassName("toggleBtn")[0];
  //tog_btn.onclick = toggleDisplay;

  //document.getElementsByClassName("img_upldr")[0].addEventListener("click",function(){view_file_saver();});

  document.querySelector(".inputbox").setAttribute("ng-model","show.setTitle");
  document.querySelector(".inputbox").setAttribute("ng-model-options","{ getterSetter: true }");

  //document.getElementById("jform_module_id").setAttribute("ng-model","show.service.module_id");

  document.getElementById('jform_data_ids').setAttribute("ng-model","module.setAssets");
  document.getElementById('jform_data_ids').setAttribute("ng-model-options","{ getterSetter: true }");

  document.getElementById('jform_tool_data').setAttribute("ng-model","module.setTools");
  document.getElementById('jform_tool_data').setAttribute("ng-model-options","{ getterSetter: true }");

  document.getElementById('jform_position').setAttribute("ng-model","show.modulePosition");
  document.getElementById('jform_position').setAttribute("ng-model-options","{ getterSetter: true }");

  //page connections
  //document.getElementById('jform_title2').setAttribute("ng-model","page.edit.title");
  document.getElementById('jform_access2').setAttribute("ng-model","page.update_access");
  //document.getElementById('jform_title2').setAttribute("ng-blur","page.uniqueCheck()");
  document.getElementById('jform_access2').setAttribute("ng-model-options","{ getterSetter: true }");

  document.getElementById('jform_template2').setAttribute("ng-model","page.update_template");
  document.getElementById('jform_template2').setAttribute("ng-model-options","{ getterSetter: true }");

  document.getElementById('jform_menutype2').setAttribute("ng-model","page.update_menutype");
  document.getElementById('jform_menutype2').setAttribute("ng-model-options","{ getterSetter: true }");


  //document.getElementById('jform_menutype3').setAttribute("ng-model","page.filter_page");
  //document.getElementById('jform_menutype3').setAttribute("ng-model-options","{ getterSetter: true }");

  document.getElementById('jform_menutype3').onchange=function()
  {
    angular.element(this).controller().filter_page();
    angular.element(this).controller().refresh();
    //console.log("filter changing");
  };


/*
document.getElementById('jform_publish_up2').setAttribute("ng-model","page.edit.publish_up");
document.getElementById('jform_publish_up2').onchange=function()
{
  angular.element(this).controller().edit.publish_up = this.value;
  angular.element(this).controller().refresh();
  console.log(angular.element(this).controller().edit.publish_up);
};
document.getElementById('jform_publish_down2').setAttribute("ng-model","page.edit.publish_down");
document.getElementById('jform_publish_down2').onchange=function()
{
  angular.element(this).controller().edit.publish_down = this.value;
  angular.element(this).controller().refresh();
  console.log(angular.element(this).controller().edit.publish_down);
};
*/

var asset_filter = new masterButtons({varName:"ast_filt",home:"asset_filter_cont",type:'filter'});//display_home
asset_filter.setPrefix("ast_filt");
asset_filter.setCustomClass([""]);
asset_filter.setLabels("type phrase then press enter:");
//asset_filter.setFilterMode({mode:'replace',_target:'ui-input-search'});
asset_filter.setFilterMode({mode:'manual',_target:'assets_cont',need_search_string:"false"});
//asset_filter.setFilterMode({mode:'jqm'});//,need_search_string:"false"
//asset_filter.setTitles("tag maker:");
asset_filter.setInputAttributes({"placeholder":"filter by title, date, tag..."});//another way to set placeholder - single entry for now
asset_filter.clearHome("false");
asset_filter.display();

var asset_id_ary = asset_filter.get_event_ids();
//var targetElement = document.getElementById(tags_id_ary[0]);

var page_filter = new masterButtons({varName:"pg_filt",home:"page_filter_cont",type:'filter'});//display_home
page_filter.setPrefix("pg_filt");
page_filter.setCustomClass([""]);
page_filter.setLabels("type phrase then press enter:");
//page_filter.setFilterMode({mode:'replace',_target:'ui-input-search'});
page_filter.setFilterMode({mode:'manual',_target:'pages_cont',need_search_string:"false"});
//page_filter.setFilterMode({mode:'jqm'});//,need_search_string:"false"
//page_filter.setTitles("tag maker:");
page_filter.setInputAttributes({"placeholder":"filter by title, date, tag..."});//another way to set placeholder - single entry for now
page_filter.clearHome("false");
page_filter.display();

var page_id_ary = page_filter.get_event_ids();
//var targetElement = document.getElementById(tags_id_ary[0]);

var tool_filter = new masterButtons({varName:"tl_filt",home:"tool_filter_cont",type:'filter'});//display_home
tool_filter.setPrefix("tl_filt");
tool_filter.setCustomClass([""]);
tool_filter.setLabels("type phrase then press enter:");
//tool_filter.setFilterMode({mode:'replace',_target:'ui-input-search'});
tool_filter.setFilterMode({mode:'manual',_target:'tools_cont',need_search_string:"false"});
//tool_filter.setFilterMode({mode:'jqm'});//,need_search_string:"false"
//tool_filter.setTitles("tag maker:");
tool_filter.setInputAttributes({"placeholder":"filter by title, date, tag..."});//another way to set placeholder - single entry for now
tool_filter.clearHome("false");
tool_filter.display();

var tool_id_ary = tool_filter.get_event_ids();
//var targetElement = document.getElementById(tags_id_ary[0]);


let myIn = document.getElementsByTagName("input");
for(let b = 0; b < myIn.length; b++)
{
  myIn[b].onfocus = function(e){e.target.select();}
}
  //document.querySelector(".imageurl").setAttribute("ng-model","scene.url");
  //document.querySelector(".imageurl").setAttribute("ng-model-options","{updateOn : 'change blur'}");

    /*document.querySelector(".form_display").addEventListener("mouseover",function(){
      console.log("mouseover checking.");
      if(document.querySelector(".link_title_input").value != document.querySelector(".imageurl").value)
      {
        console.log("mouseover updating.");
        //document.querySelector(".link_title_input").value = document.querySelector(".imageurl").value;
        //var doc_val = document.querySelector(".imageurl").value;
        var scope = angular.element(document.querySelector(".imageurl"));
        scope.triggerHandler('input');
      }//end if
    });//end onmouseover
    */

    let up_cont = document.querySelector(".upload-cont");

    let btn = document.createElement('input');
    btn.id = "check_upload";
    btn.type = "checkbox";
    btn.className = "check_upload w3-check";//<input class="w3-check" type="checkbox" checked="checked">
    btn.setAttribute("ng-click","form.activate_upload($event)");
    if(up_cont.childNodes != 0)
    {
      up_cont.insertBefore(btn,up_cont.firstChild);
    }else{
      up_cont.appendChild(btn);
    }//end if

    let a_btn = up_cont.querySelector('.hasTooltip');
    a_btn.setAttribute("ng-click","form.uncheck()");

    //manually activate angularjs
    //https://appendto.com/2016/05/angular-bootstrap-explained-3-examples/
    //If you use angular.bootstrap to start your application, you shouldn’t use the ng-app directive.
    angular.bootstrap(document.querySelector('.bigBox'), ['pictureShow']);

    //document.querySelector(".txt_edit_cont").setAttribute("ng-show","show_editor");
    let imUpC = document.querySelector('.image_upload_ctrls');
    let select_up = imUpC.querySelector('.modal.btn');
    select_up.onclick = function(){
      let sbx_w_up = document.getElementById("sbox-window");
      let up_str = sbx_w_up.className;
      sbx_w_up.className = up_str.replace("position","");
      sbx_w_up.className += " upload ";

    }

    let posInp = document.querySelector('.position_input');
    let posBtn = posInp.querySelector('.modal.btn');
    posBtn.onclick = function(){
      let sbx_w_pos = document.getElementById("sbox-window");
      let pos_str = sbx_w_pos.className;
      sbx_w_pos.className = pos_str.replace("upload","");
      sbx_w_pos.className += " position ";

    }

}//prepElements

function sampleDisplay()
{
    //alert("sampleMenu running!");
    //preps form data for the iframe to pass it the optionObject
    //and dataObject parameters

    let testForm = document.getElementById('show_form');


  //  var mainTitle = document.getElementById('jform_title');
    //var titleContainer = document.getElementsByClassName('main_title')[0];
    //titleContainer.value = mainTitle.value

  //  var dataContainer = document.getElementsByClassName('menu_data')[0];
    //var dataValue = dataContainer.value;

    //var optionsContainer = document.getElementsByClassName('menu_options')[0];
    //var optionsValue = optionsContainer.value;

    var newDataContainer = document.getElementsByClassName('menu_data2')[0];
    newDataContainer.value = "something";

    var newOptionsContainer = document.getElementsByClassName('menu_options2')[0];
    newOptionsContainer.value = "something else";

    console.dir(testForm);
    testForm.submit();

}//end sampleDisplay

function toggleDisplay()
{
  let targ_el = document.getElementsByClassName("contentBox_upr")[0];
  let show_el = document.getElementsByClassName("showcase")[0];
  let low_el = document.getElementsByClassName("contentBox_lwr")[0];
  //console.log("toggle display running!");
  if(targ_el.style.display == "none" || targ_el.style.display == "" )
  {
    targ_el.style.display = "block";
    show_el.className += " w3-animate-right";
    low_el.className = low_el.className.replace(" grand","");
    angular.element()

  }else {
    targ_el.style.display = "none";
    show_el.className = show_el.className.replace(" w3-animate-right","")
    low_el.className += " grand";
  }

}//toggleDisplay

function switchTab(tName)
{
  //var e = event || window.event;
  let build_cont = document.querySelector(".bldr_cont");
  let set_cont = document.querySelector(".stgs_cont");

  let active_cont = document.querySelector(".editor_sect.tab_show");
  active_cont.className = active_cont.className.replace(" tab_show","");

  switch(tName)
  {
    case "build":
    build_cont.className += " tab_show";
    break;

    default:
    set_cont.className += " tab_show";
    break;
  }//end switch

}//switchTab

/****  CORE MODULE SECTION module maker ***********************************/
    //alert("pmod.js running!");
    //console.log("pmod.js running!");

    dataObject = [{}];//the key to the object array is its initiation
    //I can not splice out the data and indexes shift without error
    optionObject = {};
    moduleData = {};

    function prepModuleEvents()
    {//"testBut"
        var saveBtn = document.getElementById("toolbar-save");

        saveBtn.firstElementChild.onclick = async function(){
          //console.log(Joomla);
          //made sure it doesn"t save & redirect right away
          //try promises next time
          prepSaveModule();//bugfix to update module object b4 saving
           Joomla.submitbutton("psmod.apply");
           await saveModule()/**/;}

        //development test button section
        //var saveBtn2 = document.getElementById("testBut");
        //saveBtn2.onclick = saveModule;
        //

        var titleArea = document.getElementById("jform_title");
        titleArea.onblur = uniqueCheck;

        //ids auto given to joomla input on edit page
        var menu_id = document.getElementById("jform_id");
        var module_id = document.getElementById("jform_module_id");
        var access = document.getElementById("jform_access");
        //var status = document.getElementById("jform_status");//replaced by flipswitch
        var position = document.getElementById("jform_position");
        var status = document.querySelector(".stgs_access_input");

        //use the hidden status field to determine the on off value of the flipswitch
        status.checked = parseInt(getSelectedText("status","value"));

        //no need for these it updates b4 it saves
        //titleArea.addEventListener("change",prepSaveModule);
        //access.addEventListener("change",prepSaveModule);
        //status.addEventListener("change",prepSaveModule);
        //position.addEventListener("change",prepSaveModule);

        if(menu_id.value != 0 && module_id.value != 0)
        {
            //position.value = "custom_panel";//sets a default setting just in case
      //not needed. at least not anymore.
            getModuleData(module_id.value);
      //prepSaveModule(); //needs to run in ajax success function


        }//end if
        else
        {
            position.value = "custom_panel";
            //why wouldn"t i run it here.  why wait for a user initiated action
            prepSaveModule();
        }

        //for the failed module save
        if(menu_id.value != 0 && module_id.value == 0){

            /*notice: there are times when the ajax goes faster than expected and
            tries to save the module before the menu gets to save and there is no menu
            reference for the module so it all comes back false. then the menu saves
            this section is written to detect this occurance and resubmit the module save*/

            if(document.getElementsByClassName("alert-success")[0]){
              var alertBox = document.getElementsByClassName("alert-success")[0];
              alertBox.className = "alert alert-warning";
              alertMsg = document.getElementsByClassName("alert-message")[0];
              alertMsg.innerHTML = "one moment while module is still saving... </br> you may need to reconfigure your module position and module config data.";
            }
            prepSaveModule();//it has to be down below the area where the position.value is still being configured
            saveModule();//happens on a new refreshed page with a newly saved menu but no module data saved

        }//end if

        /*alert("pathname = " + window.location.pathname + " \n " + " hostname = " + window.location.hostname
        + " \n " + " protocol = " + window.location.protocol + " \n " + " SITEURL = " + SITEURL);*/

    }//end prepModuleEvents

    function uniqueCheck()
    {
        let tData = {}
        var titleArea = document.getElementById("jform_title");
        var titleValue = titleArea.value;
        //data:{title:titleValue} works
        //method:"POST" or type:"POST" works
        //removes multiple spaces leading and trailing
        let curVal = titleValue;
        curVal = curVal.replace(/ +/g," "); //convert all multispaces to space
        curVal = curVal.replace (/^ /g,"");  //remove space from start
        curVal = curVal.replace (/ $/g,"");  //and end

        document.getElementById("jform_title").value = curVal;
        titleValue = titleArea.value;


        //alert("uniqueCheck running");
        tData.text = titleValue;
        tData.mode = "module";
        var titleMsg = document.getElementById("titleMsg");
        var form_token = FORM_TOKEN;
        var ctrlrUrl = "index.php?format=raw&option=com_psmod&task=uCheck&" + form_token + "=1";
        var saveBtn = document.getElementById("toolbar-save");
        var idCont = document.getElementById("jform_id");
        var idValue = idCont.value;

        //can i automatically disable until check is finished?
        //saveBtn.firstElementChild.setAttribute("disabled","true");

        jQuery(document).ready(function()
        {
           jQuery.ajax(
           {
            url:ctrlrUrl,data:{data:JSON.stringify(tData)},type:"POST",
               success:function(result)
               {
                   //alert(result + " will return");
                   if(result != "false")
                   {
                    //alert("result is not false");
                    //disable the save button
                        if(result != idValue)
                        {
                        saveBtn.firstElementChild.setAttribute("disabled","true");
                        //fill the message
                        titleMsg.innerText = "Please choose another title."
                        titleMsg.style.display = "inline-block";
                        }//end if
                        else
                        {
                            /*removes the disabled if name is already chosen and you try to return
                            to the originally saved name */
                             //enable the save button
                            saveBtn.firstElementChild.removeAttribute("disabled");
                            //hide the message
                            titleMsg.style.display = "none";
                            //when name is ok to use
                            prepSaveModule();//I still need it to update here with title change
                        }

                    }else
                    {
                        //enable the save button
                        saveBtn.firstElementChild.removeAttribute("disabled");
                        //hide the message
                        titleMsg.style.display = "none";
                        //when name is ok to use
                        prepSaveModule();

                    }//end else


                }//end success

            })//end ajax

        })//end ready

    }//end uniqueCheck

    function prepSaveModule()
    {
        var title = document.getElementById("jform_title").value;
        var id = document.getElementById("jform_id").value;
        var access = getSelectedText("access","value");
        //var status = getSelectedText("status","value");
        var position = document.getElementById("jform_position").value;
        var status = getCheckedValue("stgs_access_input",1,0);
        var publish_up = document.getElementById("jform_publish_up").value;
        var publish_down = document.getElementById("jform_publish_down").value;
        var ordering = document.getElementById("jform_ordering").value;
        var page_ids =   angular.element(document.getElementById("jform_title")).controller().service.data.page_ids.join();
        page_ids = removeSomething(page_ids,",");

        //console.log("page ids = ",page_ids);

        moduleData = {"menu_title":title,"menu_id":id,access,status,position,publish_up,publish_down,ordering,page_ids};

    }//end prepSaveModule

    function saveModule()
    {
        //alert("save module running");

        if(moduleData.menu_title == ""){return;}

        var form_token = FORM_TOKEN;
        var testUrl = "index.php?format=raw&option=com_psmod&task=saveModule&" + form_token + "=1";
        if(moduleData.data_string != undefined){delete moduleData.data_string;}//removes data_string loop}

        var moduleStr = JSON.stringify(moduleData);//not working as a json str
        moduleData.data_string = moduleStr;
        //alert("POST data string = " + moduleData.data_string);
        //I can send entire objects as data and it will be parsed and available in $_POST[""]
        jQuery(document).ready(function()
        {
            jQuery.ajax(
            {
             url:testUrl,
             /*data:moduleData,*/
             data:{data:JSON.stringify(moduleData)},
             type:"POST",
                success:function(result)
                {
                    //alert(result + "has returned");
                    //console.log("ajax results = " + result);

                    var resultData = JSON.parse(result);

                    if(resultData.module_id != "false")
                    {
                        if(document.getElementsByClassName("alert-warning")[0])
                        {
                            var alertBox = document.getElementsByClassName("alert-warning")[0];
                             alertBox.className = "alert alert-success";
                             alertMsg = document.getElementsByClassName("alert-message")[0];
                             alertMsg.innerHTML = "module saved successfully";
                         }//end if

                         //without this the save is successful but the page refresh ends in a sloppy redirect with an error.
                         window.location.replace(SITEURL + "?option=com_psmod&view=psmods");
                    }//end if



                 }//end success

             });//end ajax
         });//end document ready

     }//end saveModule

     function getSelectedText(fNm,mod,inpt)
     {
         //takes id's no need for the "jform_" prefix just add the field's name
         //example "access" for "jform_access"
         //ex: getSelectedText("access","value");

         //other examples
         //var accessIndex = getSelectedText("access","match",resObj.access);
         //var statusIndex = getSelectedText("status","match",resObj.published);

         var objId = "jform_" + fNm;//fieldName
         var input_cont = document.getElementById(objId);
         var modifier = mod || "text";//defaults to text
         var returnData = "";
         var dEntry = inpt || "";

        switch(modifier){
         case "index":
             var selected_index = input_cont.selectedIndex;
             returnData = selected_index;
         break;
         case "value":
             var indexObj = input_cont[input_cont.selectedIndex];
             var  selected_text = indexObj.value;//
             returnData = selected_text;
         break;
         case "match":

             if(isNaN(dEntry) == true)
             {
                 //alert("string is not a number");
                 for(var i=0; i < input_cont.childElementCount; i++)
                 {
                     var indexObj = input_cont[i];
                     if(dEntry == indexObj.innerHTML)
                     {
                         returnData = i;//returns the index number of a given value
                     }
                 }//end for

             }
             else
             {
                for(var i=0; i < input_cont.childElementCount; i++)
                 {
                     var indexObj = input_cont[i];
                     if(dEntry == indexObj.value)
                     {
                         returnData = i;//returns the index number of a given value
                     }
                 }//end for
             }

         break;
         default:
             var indexObj = input_cont[input_cont.selectedIndex]
             var  selected_text = indexObj.innerHTML;//
             returnData = selected_text;
         break;
        }//end switch


         return returnData;
     }//end getSelectedText

     function getCheckedValue(eL,t,f)
     {
       let tar = (document.getElementById(eL)) ? document.getElementById(eL) : document.querySelector("." + eL);
       let tarVal = (tar.checked) ? t : f;
       return tarVal;

     }//getCheckedValue

     function getModuleData(mID)
     {
        var module_id = document.getElementById("jform_module_id").value;
        var form_token = FORM_TOKEN; //&" + form_token + "=1"
        var ctrl_Url = "index.php?format=raw&option=com_psmod&task=getModuleData&" + form_token + "=1";

        jQuery(document).ready(function()
        {
            jQuery.ajax(
            {
             url:ctrl_Url,
             data:{module_id:module_id},
             type:"POST",
                success:function(result)
                {
                    //alert("module data = " + result);//string
                    //break it up
                     var resObj = JSON.parse(result);
                     //put it where it belongs
                     var accessForm = document.getElementById("jform_access");
                     var statusForm = document.getElementById("jform_status");

                     //because these are select elements i have to match the db data with the
                     //possible options and return the target option index as the selectedIndex
                     var accessIndex = getSelectedText("access","match",resObj.access);
                     var statusIndex = getSelectedText("status","match",resObj.published);
                     accessForm.selectedIndex = accessIndex;
                     statusForm.selectedIndex = statusIndex;
                    document.querySelector(".stgs_access_input").checked = parseInt(resObj.published);//bugfix the flipswitch issue
          //alert("ajax position is " + resObj.position);
                     document.getElementById("jform_position").value = resObj.position;
                     let changer = new Event('change');
                     document.getElementById('jform_position').dispatchEvent(changer);
                     document.getElementById("jform_publish_up").value = resObj.publish_up;
                     document.getElementById("jform_publish_down").value = resObj.publish_down;
                     document.getElementById("jform_ordering").value = resObj.ordering;

                     let page_ids = removeSomething(resObj.page_ids,",");
                     //console.log("page ids = ",resObj.page_ids);
                     angular.element(document.getElementById("jform_title")).controller().service.data.page_ids = page_ids.split(",");//bugfix - split needed ","
                     angular.element(document.getElementById("jform_title")).controller().refresh();

          //data needs to be loaded into the data storage location
                    prepSaveModule();
                 }

             })
         })//end ajax


     }//end getModuleData

     function removeSomething(val,char,rep)
     {
       /*
       //sample
       ShowData.removeSomething(ShowData.edit.title,' ');//unnessesary spaces
       //control the spaces
       pal = ShowData.removeSomething(pal,' ','-');
       //replace slashes with dashes
       pal = ShowData.removeSomething(pal,'/','-');
       //make sure there are no double dashes
       pal = ShowData.removeSomething(pal,'-');
       */
       //removes multiple spaces leading and trailing
       let curVal = val;
       //let pattern1 =
       let multi_converter = new RegExp(char + '+','g');//  '/'+ char + '+/g or / +/g
       curVal = curVal.replace(multi_converter,char); //convert all multispaces to space
       let start_converter = new RegExp('^' + char,'g');
       curVal = curVal.replace (start_converter,"");  //remove space from start /^ /g
       let end_converter = new RegExp(char + '$','g');
       curVal = curVal.replace (end_converter,"");  //and end / $/g
       if(rep != undefined && rep != ""){
         let replacer = new RegExp(char,'g');
         curVal = curVal.replace(replacer,rep);
       }
       return curVal;
     };//end removeSomething
