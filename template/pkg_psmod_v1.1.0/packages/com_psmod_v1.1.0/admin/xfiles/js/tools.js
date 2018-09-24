
(function(){
  var app = angular.module("pictureShow");


    app.controller("ToolController",["ShowData","$sce","$scope",function(ShowData,$sce,$scope){
      //console.log("tool js running!");
      var boss = this;
      this.toolData = ShowData.toolData;
      this.object_details = [];
      this.object_elements = {};

      $scope.$watch(function(){return ShowData.toolData}, function (newValue, oldValue, scope) {
        //Do anything with $scope.letters
        //console.log("newValue = ",newValue);
        //console.log("oldValue = ",oldValue);
        boss.toolData = newValue;
      }, true);
      /*$scope.$watch(function(){return boss.object_params}, function (newValue, oldValue, scope) {
        //boss.object_params = newValue;
      }, true);*/
      this.list_grow = 3;//needed a third/initial state (do nothing)

      this.grow_shrink = function()
      {
        boss.list_grow = (boss.list_grow == 1) ? 0 : 1;
      }//grow_shrink

      $scope.$on("reset list ctrls",function(event,data){
        boss.list_grow = 3;
      });

      this.head = "this is the head";
      this.body = "this is the body";
      this.last_active_btn;

      $scope.$on('tool pair check',function(event,data){
        boss.pair_check_all();
      });

      this.pair_check_all = function()
      {
        let tool_cont = document.querySelector(".tools_cont");
        let all_tools = tool_cont.querySelectorAll(".tool_space");
        all_tools.forEach(function(entry)
        {
          boss.pair_check_one(entry);
        });
      }//pair_check

      this.pair_check_one = function(tEl)
      {
        let tool_id = tEl.dataset.tool_id;
        let tool_checkbox = tEl.querySelector(".check_tool");

        let is_in_array = ShowData.valueChecker({"array":ShowData.tool_ids,"string":tool_id,"mod":"index","type":"sna","action":"match"});
        if(is_in_array[0] == -1)
        {
          tool_checkbox.checked = false;
        }else {
          tool_checkbox.checked = true;

        }
      }//check_one

      this.select_all = function()
      {
        //console.log("select all running!");
        //get the tool container
        let list_cont = document.querySelector(".tools_cont");
        let item_total = list_cont.querySelectorAll(".tool_space").length;
        let active_items = list_cont.querySelectorAll(".awake");
        //let active_items = list_cont.getElementsByClassName("awake");

        let all_tools = (item_total == active_items.length) ? true : false;

        //iterate through the list
        for(var t = 0; t < active_items.length; t++)
        {
          let tool_check = active_items[t].querySelector(".check_tool");
          tool_check.checked = true;
          let active_id = active_items[t].dataset.tool_id;

          //add the id to the array of id's - without duplicates
          let is_in_array = ShowData.valueChecker({"array":ShowData.tool_ids,"string":active_id,"mod":"index","type":"sna","action":"match"});

          if(is_in_array[0] == -1)
          {
            ShowData.tool_ids.push(active_id);
            //console.log("tool ids = ",ShowData.tool_ids.join());
          }//end if

        }//end for
        //console.log("selected tool ids = ",ShowData.tool_ids.join());

      }//select_all

      this.check_one = function(aId)
      {
        //console.log("check change detected");

        let targ_el = event.target;
        let is_checked = event.target.checked;
        let active_id = aId;

        let is_in_array = ShowData.valueChecker({"array":ShowData.tool_ids,"string":active_id,"mod":"index","type":"sna","action":"match"});

        switch(is_checked)
        {
          case true:
            if(is_in_array[0] == -1)
            {
              ShowData.tool_ids.push(active_id);
              //console.log("tool ids = ",ShowData.tool_ids.join());
            }//end if
          break;
          case false:
            if(is_in_array[0] != -1)
            {
              ShowData.tool_ids.splice(is_in_array[0],1);
              //console.log("tool ids = ",ShowData.tool_ids.join());
            }//end if
          break;
        }//end switch
      }//check_one

      this.clear_all = function()
      {
        //console.log("clear all running!");
        //get the tool container
        let list_cont = document.querySelector(".tools_cont");
        let item_total = list_cont.querySelectorAll(".tool_space").length;
        let active_items = list_cont.querySelectorAll(".awake");
        //let active_items = list_cont.getElementsByClassName("awake");

        let all_tools = (item_total == active_items.length) ? true : false;

        //iterate through the list
        for(var t = 0; t < active_items.length; t++)
        {
          let tool_check = active_items[t].querySelector(".check_tool");
          tool_check.checked = false;
          let active_id = active_items[t].dataset.tool_id;

          //add the id to the array of id's - without duplicates
          let is_in_array = ShowData.valueChecker({"array":ShowData.tool_ids,"string":active_id,"mod":"index","type":"sna","action":"match"});

          if(is_in_array[0] != -1)
          {
            ShowData.tool_ids.splice(is_in_array[0],1);
            //console.log("tool ids = ",ShowData.tool_ids.join());
          }//end if

        }//end for
        //console.log("clear tool ids = ",ShowData.tool_ids.join());

      }//clear_all

      //the tools reentry all start here after ShowData.getShowData (called below) gets the db data
      this.insertCanvas = function(dt)
      {
        var inObj = dt;
        let restrict_id = "tools_canvas_img" + inObj.id;
        if(document.querySelector("." + restrict_id)) return;


        let obj_details = (inObj.details != undefined && inObj.details != "" && typeof inObj.details == "string") ? JSON.parse(inObj.details)
        : (inObj.details != undefined && inObj.details != "" && typeof inObj.details == "object") ? inObj.details : "";
        //obj_details.text.head.html = $sce.trustAsHtml(obj_details.text.head.html);//delete later
        //obj_details.text.body.html = $sce.trustAsHtml(obj_details.text.body.html);//

        let details_str = "details" + inObj.id;

        // i didn't want to do numbers and create gap indexes so i used a multidim array
        //set the details to the object not the objects details
        boss.object_details[details_str] = inObj;

        ///make the tool_space dataset
        let my_dataset = boss.search_str_mkr(inObj);
        let t_space_str = "tool_space" + inObj.id;
        ///\r?\n|\r/g

        let enter_remover = new RegExp(/\r?\n|\r/g);//  '/'+ char + '+/g or / +/g
        my_dataset = my_dataset.replace(enter_remover," ");
        let my_space = document.getElementById(t_space_str);
        my_space.dataset.search_string = my_dataset.toLowerCase();
        my_space.dataset.tool_id = inObj.id;

        //see if this tool should be checked (associated with the module)
        ///boss.pair_check_one(my_space);

        //document.getElementById(a_space_str).dataset.tool_id = inObj.id;
        //console.log("search str = ",my_dataset);

        let obj_str = "tool_thumb" + inObj.id;
        let tool_id = "tool_img" + inObj.id;
        let addClass = " " + restrict_id + " arc_rich_img prev_img  portrait asset darken ";
        boss.canvas_mkr({name:obj_str,details:inObj,home:tool_id,class:addClass});


        //console.log("insert data = ",dt);
      }//insertCanvas

      this.search_str_mkr =  function(oPar)
      {
        //custom function for asset params
        let my_vals = oPar;
         let data_ary = [];
        for (var key in my_vals) {
            //console.log(my_vals[key]);
            switch(key){
              case "title":
              case "type":
              case "tags":
                if(my_vals[key] != undefined && my_vals[key] != ""){data_ary.push(my_vals[key])}
              break;
              case "text???":

              break;
            }//end switch
        }//end for
        return data_ary.join();
      }//search_str_mkr

      this.canvas_mkr = function(cObj)
      {
        if(cObj.restrict != undefined && document.querySelector("." + cObj.restrict)) return;

        //if home

        let can_home = cObj.home;
        let can_details = cObj.details;
        let can_custom_class = cObj.class || "";
        let can_url = ADMINCOMP + can_details.thumbnail;
        let can_w = (can_details.canvas != undefined && can_details.canvas.width != "")
        ? can_details.canvas.width : ShowData.canvas.landscape.w;
        let can_h = (can_details.canvas != undefined && can_details.canvas.height != "")
        ? can_details.canvas.height : ShowData.canvas.landscape.h;
        let can_restrict = cObj.restrict || "";
        let can_class = cObj.class || "";
        can_class += " " + can_restrict + " ";
        let can_name = cObj.name;//variable name
        let adjust = cObj.adjust || false;

        if(adjust){
          can_class += (parseInt(can_w) <= parseInt(can_h)) ? " portrait " : "";
        }//end if

        boss.object_elements[can_name] = new masterImage({home:can_home,varName:can_name,url:can_url,type:"banner",
        width:can_w,height:can_h});//looks like this controls the resolution
    		boss.object_elements[can_name].setCustomClass(can_class);
        boss.object_elements[can_name].setRawDisplay();
        /*if(can_details.img_obj.canvas_data != undefined && can_details.img_obj.canvas_data != "" && can_details.img_obj.canvas_data != {})
        {
          boss.object_elements[can_name].setView(can_details.img_obj.canvas_data);
        }*/
        boss.object_elements[can_name].clearHome("true");
        boss.object_elements[can_name].display();

        var tool_img_array = boss.object_elements[can_name].get_event_ids();
        var tool_img_id = tool_img_array[0];

      }//end canvas_mkr

      this.edit_scene = function(sID)
      {
        //set scene to edit_scene
        $scope.$emit("pls reset scene");
        boss.last_active_btn = "tool_btn" + sID;

        //add id
        //ShowData.data_id = sID;

        //add data
        let details_str = "details" + sID;
        //ShowData.data = boss.object_params[params_str];
        //ShowData.reset();
        /*
        if(Object.keys(boss.object_params[params_str].img_obj).length === 0 && boss.object_params[params_str].img_obj.constructor === Object)
        {
          boss.object_params[params_str].img_obj = "";//set to  a string to prevent merging
        }
        */

        //console.log("db params = ",boss.object_params[params_str]);
        ShowData.edit = angular.merge(ShowData.edit, boss.object_details[details_str]);
        /*
        $scope.$emit('broadcast preview form image');//app.js > form.js
        $scope.$emit('broadcast preview tags');//app.js > form.js
        //console.log("new ShowData = ",ShowData.data);
        $scope.$emit("pls switch tabs");
        */

      }//edit_scene

      this.prep_sample = function(aID,mode)
      {
        //a hack for mouseenter mouseleave
        let data_str = "data" + aID;
        let btn_str = "sample_btn" + aID;
        let exit_fn = false;
        if(boss.object_elements[data_str] == undefined)
        {
          boss.object_elements[data_str] = {};
        }

        if(ShowData.tab != "sample")
        {
          boss.last_active_btn = "";
        }
        let last_btn = (boss.last_active_btn == btn_str) ? true : false;
        let last_action = boss.object_elements[data_str].last_action;

        //manage the various states of the overly btns
        switch(mode){
          case "clear":
            //set a mouse leave function
            if(last_btn && last_action == "glance")
            {
              $scope.$emit("prep sample","clear");
              boss.last_active_btn = btn_str;
              boss.object_elements[data_str].last_action = mode;
              //console.log(btn_str + " " + mode);
            }//end if
            exit_fn = true;
          break;

          case "glance":
            if(last_btn && last_action == "click" || last_btn && last_action == "delete" )
            {
              //boss.last_active_btn = btn_str;
              //boss.object_elements[data_str].last_action = mode;
              //console.log(btn_str + " in " + mode + " do nothing");

              //if delete remove delete
              if(last_action == "delete"){
                boss.object_elements[data_str].last_action = "glance";
                $scope.$emit("manage delete","remove");
              }//end if
              exit_fn = true;
            }else{
              boss.last_active_btn = btn_str;
              boss.object_elements[data_str].last_action = mode;
              //console.log(btn_str + " out " + mode);
            }
          break;

          case "click":
            if(last_btn && last_action == "glance" || last_btn && last_action == "delete")
            {
              //happens when i havent left the btn but click
              boss.last_active_btn = btn_str;
              boss.object_elements[data_str].last_action = mode;
              //console.log(btn_str + " in " + mode);

              //if delete remove delete
              if(last_action == "delete"){
                boss.last_active_btn = "delete_btn" + sID;
                $scope.$emit("manage delete","remove");
              }//end if

              exit_fn = true;
            }else{
              boss.last_active_btn = btn_str;
              boss.object_elements[data_str].last_action = mode;
              //console.log(btn_str + " out " + mode);
            }
          break;

          case "delete":
              if(last_btn && last_action == "click")
              {
                //keep it the same add delete
                boss.last_active_btn = btn_str;
                boss.object_elements[data_str].last_action = mode;
                //console.log(btn_str + " in " + mode);
                $scope.$emit("manage delete","add");
                exit_fn = true;
              }else{
                //keep it the same add delete
                boss.last_active_btn = btn_str;
                boss.object_elements[data_str].last_action = mode;
                //console.log(btn_str + " in " + mode);
                if(last_btn && last_action == "delete" && ShowData.delete_mode == false)
                {
                  //hack for sample cancel btn being used then clicking delete btn
                  //resulting in 2 consecutive delete btns used = (toggles)
                  $scope.$emit("manage delete","add");
                  exit_fn = true;
                }
              }//end else
          break;
        }//end switch

        //console.log("exit = ",exit_fn);
        if(exit_fn == true){return;}

        let details_str = "details" + aID;
        let details = boss.object_details[details_str];

        let varName = "sample" + aID;
        let sample_home = "sample_img_cont";
        let sample_class = " sample_img ";

        ShowData.sample_view.title = details.title;
        ShowData.sample_view.id = aID;
        ShowData.sample_view.head = ShowData.THTML(details.text.head.html);
        ShowData.sample_view.body = ShowData.THTML(details.text.body.html);

        boss.canvas_mkr({
          name:varName,
          details,
          home:sample_home,
          class:sample_class,
          adjust:true/*,
          restrict:restrict_id*/
        });

        //console.log("emit running");
        if(mode == "delete")
        {
          $scope.$emit("prep delete",aID);
        }else{
          $scope.$emit("prep sample",aID);
        }//end else
      }//end prep_sample
      //console.log("select array = ",this.selectArray)

      //try to get the show data and store it in the custom shared service
      //this gets data from db and stores it in a variable - needs to be thenable
      this.getToolData = function()
      {
        ShowData.getToolData();
      }//end getToolData

      this.getToolData();

      $scope.$on("activate template",function(tDat){
        boss.activate_template(tDat);
        //called by module.js
      });

      this.activate_template = function(tool)
      {
        if(typeof tool != "object" || Object.keys(tool).length === 0)return;
        let my_tool = tool;
        if(ShowData.tool != undefined && ShowData.tool.file_name == tool.file_name)
        {
          //i need to add the current customized values into the new objects
          //which will create an updated object with new uncustomized features.
          my_tool = angular.merge( my_tool, ShowData.tool );//(dst,src) copies props from src to dst
        }//end if

        ShowData.activate_template(my_tool).then(function()
        {
          ShowData.tool = my_tool;
          ShowData.default_tool = my_tool;
        });
        //activate settings template
        ShowData.activate_template(my_tool,"template_settings","settings");

      }//activate_template

      this.radioCheck = function(tID)
      {
        let chk_str = "check_tool" + tID;
        document.getElementById(chk_str).checked = true;
      }//radioCheck

      this.autoCheck = function(tID){
          return (ShowData.current_tool.id == tID) ? true : false;
      }

      this.me_seeks= function(data)
      {
        boss;
        if(data != undefined)
        {
          //console.log("here comes data",data);
        }
        let tVar = data || "";
          //console.log("im working",tVar);
        return true;

      }//me_seeks


    }]);//toolController
})();
