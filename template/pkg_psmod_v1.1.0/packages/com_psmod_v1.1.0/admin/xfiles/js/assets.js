
(function(){
  var app = angular.module("pictureShow");


    app.controller("AssetController",["ShowData","$sce","$scope",function(ShowData,$sce,$scope){
      //console.log("asset js running!");
      var assetCtrlr = this;
      this.AssetData = ShowData.assetData;
      this.object_params = [];
      this.object_elements = {};
      $scope.$watch(function(){return ShowData.assetData}, function (newValue, oldValue, scope) {
        //Do anything with $scope.letters
        //console.log("newValue = ",newValue);
        //console.log("oldValue = ",oldValue);
        assetCtrlr.AssetData = newValue;
      }, true);
      /*$scope.$watch(function(){return assetCtrlr.object_params}, function (newValue, oldValue, scope) {
        //assetCtrlr.object_params = newValue;
      }, true);*/
      this.list_grow = 3;//needed a third/initial state (do nothing)

      this.grow_shrink = function()
      {
        assetCtrlr.list_grow = (assetCtrlr.list_grow == 1) ? 0 : 1;
      }//grow_shrink

      $scope.$on("reset list ctrls",function(event,data){
        assetCtrlr.list_grow = 3;
      });

      this.head = "this is the head";
      this.body = "this is the body";
      this.last_active_btn;

      $scope.$on('asset pair check',function(event,data){
        assetCtrlr.pair_check_all();
      });

      this.pair_check_all = function()
      {
        let asset_cont = document.querySelector(".assets_cont");
        let all_assets = asset_cont.querySelectorAll(".asset_space");
        all_assets.forEach(function(entry)
        {
          assetCtrlr.pair_check_one(entry);
        });
      }//pair_check

      this.pair_check_one = function(tEl)
      {
        let asset_id = tEl.dataset.asset_id;
        let asset_checkbox = tEl.querySelector(".check_asset");

        let is_in_array = ShowData.valueChecker({"array":ShowData.asset_ids,"string":asset_id,"mod":"index","type":"sna","action":"match"});
        if(is_in_array[0] == -1)
        {
          asset_checkbox.checked = false;
        }else {
          asset_checkbox.checked = true;

        }
      }//check_one

      this.select_all = function()
      {
        //console.log("select all running!");
        //get the asset container
        let list_cont = document.querySelector(".assets_cont");
        let item_total = list_cont.querySelectorAll(".asset_space").length;
        let active_items = list_cont.querySelectorAll(".awake");
        //let active_items = list_cont.getElementsByClassName("awake");

        let all_assets = (item_total == active_items.length) ? true : false;

        //iterate through the list
        for(var t = 0; t < active_items.length; t++)
        {
          let asset_check = active_items[t].querySelector(".check_asset");
          asset_check.checked = true;
          let active_id = active_items[t].dataset.asset_id;

          //add the id to the array of id's - without duplicates
          let is_in_array = ShowData.valueChecker({"array":ShowData.asset_ids,"string":active_id,"mod":"index","type":"sna","action":"match"});

          if(is_in_array[0] == -1)
          {
            ShowData.asset_ids.push(active_id);
            //console.log("asset ids = ",ShowData.asset_ids.join());
          }//end if

        }//end for
        //console.log("selected asset ids = ",ShowData.asset_ids.join());

      }//select_all

      this.check_one = function(aId)
      {
        //console.log("check change detected");

        let targ_el = event.target;
        let is_checked = event.target.checked;
        let active_id = aId;

        let is_in_array = ShowData.valueChecker({"array":ShowData.asset_ids,"string":active_id,"mod":"index","type":"sna","action":"match"});

        switch(is_checked)
        {
          case true:
            if(is_in_array[0] == -1)
            {
              ShowData.asset_ids.push(active_id);
              //console.log("asset ids = ",ShowData.asset_ids.join());
            }//end if
          break;
          case false:
            if(is_in_array[0] != -1)
            {
              ShowData.asset_ids.splice(is_in_array[0],1);
              //console.log("asset ids = ",ShowData.asset_ids.join());
            }//end if
          break;
        }//end switch
      }//check_one

      this.clear_all = function()
      {
        //console.log("clear all running!");
        //get the asset container
        let list_cont = document.querySelector(".assets_cont");
        let item_total = list_cont.querySelectorAll(".asset_space").length;
        let active_items = list_cont.querySelectorAll(".awake");
        //let active_items = list_cont.getElementsByClassName("awake");

        let all_assets = (item_total == active_items.length) ? true : false;

        //iterate through the list
        for(var t = 0; t < active_items.length; t++)
        {
          let asset_check = active_items[t].querySelector(".check_asset");
          asset_check.checked = false;
          let active_id = active_items[t].dataset.asset_id;

          //add the id to the array of id's - without duplicates
          let is_in_array = ShowData.valueChecker({"array":ShowData.asset_ids,"string":active_id,"mod":"index","type":"sna","action":"match"});

          if(is_in_array[0] != -1)
          {
            ShowData.asset_ids.splice(is_in_array[0],1);
            //console.log("asset ids = ",ShowData.asset_ids.join());
          }//end if

        }//end for
        //console.log("clear asset ids = ",ShowData.asset_ids.join());

      }//clear_all

      //the assets reentry all start here after ShowData.getShowData (called below) gets the db data
      this.insertCanvas = function(dt)
      {
        var inObj = dt;
        let restrict_id = "asset_canvas_img" + inObj.id;
        if(document.querySelector("." + restrict_id)) return;



        let obj_params = JSON.parse(inObj.params);
        //obj_params.text.head.html = $sce.trustAsHtml(obj_params.text.head.html);//delete later
        //obj_params.text.body.html = $sce.trustAsHtml(obj_params.text.body.html);//

        ///make the asset_space dataset
        let my_dataset = assetCtrlr.search_str_mkr(obj_params);
        let a_space_str = "asset_space" + inObj.id;
        ///\r?\n|\r/g

        let enter_remover = new RegExp(/\r?\n|\r/g);//  '/'+ char + '+/g or / +/g
        my_dataset = my_dataset.replace(enter_remover," ");
        let my_space = document.getElementById(a_space_str);
        my_space.dataset.search_string = my_dataset.toLowerCase();
        my_space.dataset.asset_id = inObj.id;

        //see if this asset should be checked (associated with the module)
        assetCtrlr.pair_check_one(my_space);

        //document.getElementById(a_space_str).dataset.asset_id = inObj.id;
        //console.log("search str = ",my_dataset);

        let params_str = "params" + inObj.id;

        // i didn't want to do numbers and create gap indexes so i used a multidim array
        assetCtrlr.object_params[params_str] = obj_params;
        let obj_str = "thumb" + inObj.id;
        let asset_id = "asset_img" + inObj.id;
        let addClass = " " + restrict_id + " arc_rich_img prev_img  portrait asset darken ";
        assetCtrlr.canvas_mkr({name:obj_str,params:obj_params,home:asset_id,class:addClass});


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
              case "img":
              case "url":
              case "title":
              case "tags":
              if(my_vals[key] != undefined && my_vals[key] != ""){data_ary.push(my_vals[key])}
              break;
              case "text":
                if(my_vals[key].body.raw  != undefined && my_vals[key].body.raw != ""){data_ary.push(my_vals[key].body.raw)}
                if(my_vals[key].link.alias  != undefined && my_vals[key].link.alias != ""){data_ary.push(my_vals[key].link.alias)}
                if(my_vals[key].link.url  != undefined && my_vals[key].link.url != ""){data_ary.push(my_vals[key].link.url)}
                if(my_vals[key].head.text  != undefined && my_vals[key].head.text  != ""){data_ary.push(my_vals[key].head.text)}
                if(my_vals[key].head.date.created.date  != undefined && my_vals[key].head.date.created.date  != ""){
                  data_ary.push(my_vals[key].head.date.created.date);
                  let nD = new Date(my_vals[key].head.date.created.date);
                  //console.log("new date = ",nD);
                  data_ary.push(ShowData.day[nD.getDay()]);
                  data_ary.push(ShowData.month[nD.getMonth()]);
                }
                /*if(my_vals[key].head.date.created.timestamp  != undefined && my_vals[key].head.date.created.timestamp  != "" &&
                my_vals[key].head.date.created.timestamp  != "0"){
                  data_ary.push(my_vals[key].head.date.created.timestamp);
                }*/
              break;
            }//end switch
        }//end for
        //clearn it up some
        let new_str = data_ary.join();
        new_str = ShowData.removeSomething(new_str,' ');//unnessesary spaces
        new_str = ShowData.removeSomething(new_str,',');//unnessesary ','

        return new_str;

      }//search_str_mkr

      this.canvas_mkr = function(cObj)
      {
        if(cObj.restrict != undefined && document.querySelector("." + cObj.restrict)) return;

        //if home

        let can_home = cObj.home;
        let can_params = cObj.params;
        let can_custom_class = cObj.class || "";
        let can_url = can_params.url;
        let can_w = (can_params.canvas != undefined && can_params.canvas.width != "")
        ? can_params.canvas.width : ShowData.canvas.landscape.w;
        let can_h = (can_params.canvas != undefined && can_params.canvas.height != "")
        ? can_params.canvas.height : ShowData.canvas.landscape.h;
        let can_restrict = cObj.restrict || "";
        let can_class = cObj.class || "";
        can_class += " " + can_restrict + " ";
        let can_name = cObj.name;//variable name
        let adjust = cObj.adjust || false;

        if(adjust){
          can_class += (parseInt(can_w) <= parseInt(can_h)) ? " portrait " : "";
        }//end if

        assetCtrlr.object_elements[can_name] = new masterImage({home:can_home,varName:can_name,url:can_url,type:"banner",
        width:can_w,height:can_h});//looks like this controls the resolution
    		assetCtrlr.object_elements[can_name].setCustomClass(can_class);
        assetCtrlr.object_elements[can_name].setRawDisplay();
        if(can_params.img_obj.canvas_data != undefined && can_params.img_obj.canvas_data != "" && can_params.img_obj.canvas_data != {})
        {
          assetCtrlr.object_elements[can_name].setView(can_params.img_obj.canvas_data);
        }
        assetCtrlr.object_elements[can_name].clearHome("true");
        assetCtrlr.object_elements[can_name].display();

        var asset_img_array = assetCtrlr.object_elements[can_name].get_event_ids();
        var asset_img_id = asset_img_array[0];

      }//end canvas_mkr

      this.edit_scene = function(sID)
      {
        //set scene to edit_scene
        $scope.$emit("pls reset scene");
        assetCtrlr.last_active_btn = "edit_btn" + sID;

        //add id
        ShowData.data_id = sID;

        //add data
        let params_str = "params" + sID;
        //ShowData.data = assetCtrlr.object_params[params_str];
        //ShowData.reset();
        if(Object.keys(assetCtrlr.object_params[params_str].img_obj).length === 0 && assetCtrlr.object_params[params_str].img_obj.constructor === Object)
        {
          assetCtrlr.object_params[params_str].img_obj = "";//set to  a string to prevent merging
        }

        //console.log("db params = ",assetCtrlr.object_params[params_str]);
        ShowData.data = angular.merge( ShowData.data, assetCtrlr.object_params[params_str] );
        $scope.$emit('broadcast preview form image');//app.js > form.js
        $scope.$emit('broadcast preview tags');//app.js > form.js
        //console.log("new ShowData = ",ShowData.data);
        $scope.$emit("pls switch tabs");

      }//edit_scene

      this.prep_sample = function(aID,mode)
      {
        //a hack for mouseenter mouseleave
        console.log("asset.js prep_sample running");
        let data_str = "data" + aID;
        let btn_str = "sample_btn" + aID;
        let exit_fn = false;
        if(assetCtrlr.object_elements[data_str] == undefined)
        {
          assetCtrlr.object_elements[data_str] = {};
        }

        if(ShowData.tab != "sample")
        {
          assetCtrlr.last_active_btn = "";
        }
        let last_btn = (assetCtrlr.last_active_btn == btn_str) ? true : false;
        let last_action = assetCtrlr.object_elements[data_str].last_action;

        //manage the various states of the overly btns
        switch(mode){
          case "clear":
            //set a mouse leave function
            if(last_btn && last_action == "glance")
            {
              $scope.$emit("prep sample","clear");
              assetCtrlr.last_active_btn = btn_str;
              assetCtrlr.object_elements[data_str].last_action = mode;
              //console.log(btn_str + " " + mode);
            }//end if
            exit_fn = true;
          break;

          case "glance":
            if(last_btn && last_action == "click" || last_btn && last_action == "delete" )
            {
              //assetCtrlr.last_active_btn = btn_str;
              //assetCtrlr.object_elements[data_str].last_action = mode;
              //console.log(btn_str + " in " + mode + " do nothing");

              //if delete remove delete
              if(last_action == "delete"){
                assetCtrlr.object_elements[data_str].last_action = "glance";
                $scope.$emit("manage delete","remove");
              }//end if
              exit_fn = true;
            }else{
              assetCtrlr.last_active_btn = btn_str;
              assetCtrlr.object_elements[data_str].last_action = mode;
              //console.log(btn_str + " out " + mode);
            }
          break;

          case "click":
            if(last_btn && last_action == "glance" || last_btn && last_action == "delete")
            {
              //happens when i havent left the btn but click
              assetCtrlr.last_active_btn = btn_str;
              assetCtrlr.object_elements[data_str].last_action = mode;
              //console.log(btn_str + " in " + mode);

              //if delete remove delete
              if(last_action == "delete"){
                assetCtrlr.last_active_btn = "delete_btn" + sID;
                $scope.$emit("manage delete","remove");
              }//end if

              exit_fn = true;
            }else{
              assetCtrlr.last_active_btn = btn_str;
              assetCtrlr.object_elements[data_str].last_action = mode;
              //console.log(btn_str + " out " + mode);
            }
          break;

          case "delete":
              if(last_btn && last_action == "click")
              {
                //keep it the same add delete
                assetCtrlr.last_active_btn = btn_str;
                assetCtrlr.object_elements[data_str].last_action = mode;
                //console.log(btn_str + " in " + mode);
                $scope.$emit("manage delete","add");
                exit_fn = true;
              }else{
                //keep it the same add delete
                assetCtrlr.last_active_btn = btn_str;
                assetCtrlr.object_elements[data_str].last_action = mode;
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

        let params_str = "params" + aID;
        let params = assetCtrlr.object_params[params_str];
        let varName = "sample" + aID;
        let sample_home = "sample_img_cont";
        let sample_class = " sample_img ";

        ShowData.sample_view.title = params.title;
        ShowData.sample_view.id = aID;
        ShowData.sample_view.head = ShowData.THTML(params.text.head.html);
        ShowData.sample_view.body = ShowData.THTML(params.text.body.html);

        assetCtrlr.canvas_mkr({
          name:varName,
          params,
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
      ShowData.getShowData().then(function(data){
        //console.log("then data is ", data);
        //showCtrlr.display_assets(data)
        //here you would take the data and add it to the view

        //showCtrlr.service.db_scenes = JSON.parse(data);
        //console.log("db scenes = ",showCtrlr.service.db_scenes);

        //this data is a json title and not the data from the service being passed
        //this passes the created data that is made here in this show constructor to the rest
        //of the controllers - no longer needed
        //showCtrlr.message('set_txt_data',{type:"created",data:showCtrlr.cTimestamp});

      }).catch(function(err){
        console.log("catch error found ",err);
      });
    }]);//AssetController
})();
