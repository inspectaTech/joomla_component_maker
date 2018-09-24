
(function(){
  var app = angular.module("pictureShow");


    app.controller("ColorController",["ShowData","$sce","$scope","$timeout",function(ShowData,$sce,$scope,$timeout){
      //console.log("tool js running!");
      //dependecies tinyColor.js
      //data.js
      var boss = this;
      this.toolData = ShowData.toolData;
      this.service = ShowData;
      this.object_details = [];
      this.object_elements = {};
      boss.initiated = true;
      boss.init_state = "start";
      boss.colorJSON = ShowData.colorJSON;//json file data
      boss.colorData = ShowData.colorData;//db data
      boss.current_color;
      boss.fav_icon = "favorite_border";//"favorite"
      boss.fav_icon_color = "#ccc";
      this.loader = 0;
      boss.show_dropdown = "none";
      boss.editor_pallet = {};
      boss.valid_title = "default";
      boss.editor_mode = "add";
      boss.my_color_data = [];
      boss.all_color_data = [];
      boss.module_colors = [];
      boss.window_section = "current";
      boss.open_wrapper = 'none';
      boss.expand_wrapper = 'none';
      boss.auto_editor = false;
      boss.temp_color = "#fff";
      boss.auto_input_text = "#fff";

      boss.blank_pallet = {
        title:"",
        id:"",
        user_name:"",
        user_id:"",
        data:[
            {
              title:"level0",
              swatches:[]
            }
        ]
      };

      $scope.$watch(function(){return ShowData.colorJSON}, function (newValue, oldValue, scope) {
        //Do anything with $scope.letters
        //console.log("newValue = ",newValue);
        if(newValue){
          boss.colorJSON = newValue;
        }//if
      }, true);

      $scope.$watch(function(){return ShowData.colorData}, function (newValue, oldValue, scope) {
        //Do anything with $scope.letters
        //console.log("newValue = ",newValue);
        if(newValue){
          boss.colorData = newValue;
        }//if
      }, true);


      //i had a watch monitoring the changes in editor_pallet but i didn't need it.

      this.toggle_wrapper = function(ndx)
      {
        if(boss.open_wrapper == ndx){
          boss.open_wrapper = "none";
        }else {
          boss.open_wrapper = ndx;
        }
      }//toggle_wrapper

      this.toggle_expand = function(ndx)
      {
        event.stopPropagation();
        if(boss.expand_wrapper == ndx){
          boss.expand_wrapper = "none";
        }else {
          boss.expand_wrapper = ndx;
          if(boss.expandto != undefined && boss.expandto != ""){
            let expand_parent = document.querySelector("." + boss.expandto);
            expand_parent.scrollTo(0,0);
          }
        }
      }//toggle_expand

      this.$onInit = function() {
        //in here i can run $timouts, watchers and $timouts inside of watchers

        $timeout(function(){
           //console.log("post Digest with $timeout");
           boss.initiated = true;

        },0,true).then(function(){

        });//end .then() of $timeout

      };//$oninit

      this.start_auto_mode = function()
      {
        //start auto mode
        boss.auto_editor = true;

        //prep temp color
        boss.temp_color = ShowData.bboy(boss.current_color);
        boss.auto_input_text = boss.temp_color;
      }//start_auto

      this.check_auto = function()
      {
        let test_val = boss.auto_input_text;
        test_val = (test_val.charAt(0) != "#") ? "#" + test_val : test_val;
        let color = tinycolor(test_val);
        let is_valid = color.isValid();

        if(is_valid) {

          let hex_col = color.toHexString()
          boss.temp_color = hex_col;
          boss.auto_input_text = hex_col;
        }

      }//check_auto

      this.getDestinationColor = function()
      {
        //let targ_el = document.querySelector("." + boss.destination);
        //destination_color = targ_el.value;
        boss.current_color = boss.destination[boss.property]
        boss.getModuleColors();
      }//getDestinationColor

      this.getModuleColors = function()
      {
        boss.module_colors = boss.collection();
      }//getModuleColors

      this.update_input_color = function(cVal)
      {
        let color = tinycolor(cVal);
        let hx_col = color.toHexString();
        boss.current_color = hx_col;
        //let color_value = cVal;
        let color_object = boss.destination;

        //let color = tinycolor("red");
        //let new_color = color.toHexString();

        color_object[boss.property] = boss.current_color;//color_value


        //just send the value
        if(boss.callout != undefined){
          boss.callout(color_object[boss.property],boss.params[0],boss.params[1]);
        }//end if

      }//update_input_color

      this.save_pallet = function()
      {
        boss.loader = 1;
        let validity = boss.check_title();
        //prep pallet object
        let meseeks = boss.editor_pallet.data[0].swatches.length;
        if(validity == "invalid" || boss.editor_pallet.data[0].swatches.length  == 0)return;

        let save_data = ShowData.bboy(boss.editor_pallet);

        save_data.data = JSON.stringify(save_data.data);
        save_data.mode = boss.editor_mode;

        switch (boss.editor_mode) {
          case "add":

            ShowData.request({task:"addPallet",data:JSON.stringify(save_data)})
            .then(function(results){
              console.log("req results = ",results);

              if(results !=  "your upload was not successful")
              {
                //add new data to the module_data
                try{
                  ShowData.colorData.push(JSON.parse(results));
                }catch(err){

                }

                //reset the display
                boss.window_section = 'personal';
                boss.reset_editor();
              }
              boss.loader = 0;
            });
          break;

          case "edit":

          break;
        }//switch

      }//save_pallet

      this.check_title = function(){
        let title_input = document.querySelector(".col_edit_title_input");
        //clean it up
        title_input.value = ShowData.removeSomething(title_input.value," ")

        if(title_input.value == undefined || title_input.value == "")
        {
          boss.valid_title = "invalid";
          return "invalid";
        }else {
          boss.valid_title = "valid";
          return "valid";
        }//else

      }//check_title

      boss.create_new_pallet = function()
      {
        boss.reset_editor();
      }//create_new_pallet

      this.reset_editor = function()
      {
        //reset the editor_pallet
        boss.editor_pallet = {};
        //console.log( 'Resetting')
        boss.editor_pallet = angular.merge( boss.editor_pallet, boss.blank_pallet );
        boss.valid_title = "default";

        //clear the title input
        let title_input = document.querySelector(".col_edit_title_input");
        title_input.value = "";

        //close the dropdown menu
        boss.show_dropdown = "none";
        boss.editor_mode = "add";
      }//reset_editor

      boss.swatch_menu = function(ttl)
      {
        //shows dropdown matching level tit
          boss.show_dropdown = ttl || "none";
      }//swatch_menu

      boss.add_swatches = function(lvl){
        let inp_cls_str = ".col_edit_color_input." + lvl;
        let targ_el = document.querySelector(inp_cls_str);
        let color_value = targ_el.value;

        //remove excess spaces
        color_value = ShowData.removeSomething(color_value," ");

        //add a hashmark if there is none
        color_value = (color_value.charAt(0) != "#") ? "#" + color_value : color_value;

        //put what we have so far back
        targ_el.value = color_value;

        let color_checker = new RegExp(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
        console.log("color_cheker test = ",color_checker.test(color_value));
        let meseeks = color_checker.test(color_value);

        if(color_value == undefined || color_value == "" || color_checker.test(color_value) == false)return;
        //how can i make sure its a color


            //add to array
            boss.editor_pallet.data.forEach(function(entry)
            {
              //if its the right level go into action
              if(entry.title == lvl)
              {
                //duplicate checker
                let is_in_array = ShowData.valueChecker({"array":entry.swatches,"string":color_value,"mod":"index","type":"sna"});

                if(is_in_array[0] == -1)
                {
                  //add the new swatch color to the array
                    entry.swatches.push(color_value);
                }//if
              }//if
            });//foreach

        boss.reset_dropdown(lvl);

      };//add_swatches

      this.removeSwatch = function(lvl,col)
      {
        let newAry;
        boss.editor_pallet.data.forEach(function(entry){
          //get the right lvl
          if(entry.title == lvl)
          {
            let myLvl = entry;
            entry.swatches.forEach(function(color,ndx){
              if(color == col)
              {
                myLvl.swatches.splice(ndx, 1);
                newAry = myLvl.swatches;
              }//if
            });
          }//if
        });
      }//removeSwatch

      this.level_up = function(lvl,mod)
      {
        let mode = mod || "add";
        switch (mode) {
          case "remove":
          //make sure you can't remove the last level
          if(boss.editor_pallet.data.length < 2)return;

            boss.editor_pallet.data.forEach(function(entry,ndx){
              if(entry.title == lvl){
                boss.editor_pallet.data.splice(ndx, 1);
              }//if
            });

            //rename the titles - prevents incremental chaos
            boss.editor_pallet.data.forEach(function(entry,ndx){
              let lvl_str = "level" + ndx;
              entry.title = lvl_str;
            });
          break;
          default:

          let lvl_str = "level" + boss.editor_pallet.data.length;
          boss.editor_pallet.data.push({title:lvl_str,swatches:[]});
        }//switch

      }//level_up

      this.reset_dropdown = function(lvl)
      {
        let inp_cls_str = ".col_edit_color_input." + lvl;
        let targ_el = document.querySelector(inp_cls_str);
        targ_el.value = "";
        boss.swatch_menu();

      }
      /*
      CREATE TABLE IF NOT EXISTS `uavz_psmod_colors` ( `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT, `title` VARCHAR(250) UNIQUE NOT NULL DEFAULT '', `user_id` INT(11) NOT NULL, `user_name` VARCHAR(255) UNIQUE NOT NULL DEFAULT '', `data` TEXT NOT NULL DEFAULT '', PRIMARY KEY (`id`) )ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1
      */

      ShowData.getColorData();/*.then(function(results){
        let my_results = results;
      });*/



      //gets the color json data
      ShowData.getColorJSON().then(function(){
        var color = tinycolor("red");
        console.log("tinycolor test red to hex",color.toHexString());
      });

      boss.setFavData = function(iID)
      {
        let id_nbr = parseInt(iID);
        let is_even =  (id_nbr % 2 == 0) ? true : false;
        //check to see if it is in the array
        let temp_class = (is_even) ? "order:-1;" : "";

        if(is_even){
          boss.fav_icon = "favorite";//"favorite"
          boss.fav_icon_color = "gold";
        }else {
          boss.fav_icon = "favorite_border";//"favorite"
          boss.fav_icon_color = "#ccc";
        }//if
        return temp_class;
      }//setFavData


      this.me_seeks= function(data)
      {
        boss;
        if(data != undefined)
        {
          console.log("here comes data",data);
        }
        let tVar = data || "";
        console.log("im working",tVar);
        return true;

      }//me_seeks


    }]);//colorController
})();
