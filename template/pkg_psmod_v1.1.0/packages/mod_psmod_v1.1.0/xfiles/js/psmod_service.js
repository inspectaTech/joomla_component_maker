(function(){
console.log("angular running!");

var app = angular.module("pictureShow");
app.service("ShowData",['$http',"$sce","$rootElement",function($http,$sce,$rootElement){

    console.log("ShowData running!");
    var boss = this;
    this.app = "ShowData running";
    this.module_id = $rootElement[0].dataset.module;
    this.module_root = $rootElement[0].dataset.root;
    this.home_url = $rootElement[0].dataset.home;
    this.tool_data = {};
    this.data_ids = [];
    this.asset_info = [];
    console.log("module id = ",$rootElement);

    this.THTML = function(html){
      return $sce.trustAsHtml(html);
    };

    this.request = async function(gDObj,mode){

      let form_token = FORM_TOKEN;
      let urlMod = gDObj.task;
      let send_data = gDObj.data || "";
      let json_url = mode || "none";
      let site_url = (json_url == "none") ? ["index.php?option=com_psmod&task="
                                            ,urlMod,
                                            "&format=raw&",
                                            form_token,"=1"].join("")
                                            : json_url;
      let my_result = "";

      await $http.post(site_url,{data:send_data}).then((result)=>{
          //console.log("result = ",result.data);
          if(result.data == "Invalid Token"){
            //reload page
          }else if(result.data == undefined
          || result.data == "" || result.data == [] || typeof result.data == "string" && result.data.indexOf("<!doctype html>") != -1){
            my_result = "error";
          }else{
            my_result = result.data;
          }
      });

        return my_result;

    };//end request

    this.activate_template = async function(tool,home,mode)
    {
      if(typeof tool != "object" || Object.keys(tool).length === 0)return;

      let template_str = home || "showcase";
      let template_home = "." + template_str;
      let template_mode = mode || "tool_default";//alt = settings
      let tempNbr = (template_mode != "settings") ? 0 : 1;
      let custom_class = (template_mode != "settings") ? " " + tool.details.class_pfx + " " + tool.details.class_style + " " : "";
      let custom_style = (template_mode != "settings" && tool.details.custom_style != undefined) ? tool.details.custom_style : (tool.details.custom_style != undefined) ? tool.details.sample_style  : "";

      //bugfix for settings display problem - can't use same dimensions as slideshow display

      //clear the stage
      let t_home = (document.getElementById(template_str)) ? document.getElementById(template_str) : document.querySelector(template_home);
      t_home.innerHTML = "";

      let tool_str = escape(JSON.stringify(tool));//formerly crew="'+tool_str+'" & sttngs="' + tool_str + '"

      boss.current_tool = tool;
      boss.tool = tool;//i want to set the tool here so i don't have to use crew

      let tool_class = " " + tool.alias + " " + template_mode + " ";//important! triggers directive (tool.alias)
      let stage = " " + tool.file_name + "_" + template_mode;
      let stage_id = " " + tool.file_name + "_" +  boss.module_id + " ";//why tool.id not modul_id?

      let injection_data = '<div class="' + stage + " " + stage_id + " " + tool_class + custom_class + ' pure-h" data-cast="' + custom_class
      + '" data-motiv="' + template_mode + '" ' + ' data-marquee="' + tool.file_name + '" data-mode="site" '
      + 'data-home="' + boss.home_url + '" data-stage="' + stage_id + '" style="' + custom_style + '"></div>';
      //marquee is used in templateUrl to set dynamic template.html along with data-home
      //data-motiv is used in template.html ng-if statements

      t_home.innerHTML = injection_data;
      angular.element(t_home).injector().invoke(["$compile",function($compile)
      {
        //let dir_str = "." + tool.alias;//this may still have a dash instead of the needed underscore
        let dir_str = stage_id;//this is properly done with an underscore
         dir_str = "." + boss.removeSomething(dir_str,' ');
        let dir_obj = document.querySelectorAll(dir_str);//bugfix for multiple slideshows
        let scope = angular.element(t_home).scope();
        //im using tempNbt because this is loaded twice. once for the display the other for settings
        $compile(dir_obj[tempNbr])(scope);
      }]);

    }//activate_template

    this.removeSomething = function(val,char,rep)
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


}]);//end ShowData


})();//end closure
