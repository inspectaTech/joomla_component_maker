(function(){

  var app = angular.module("pictureShow");

  app.controller('PageController',["ShowData","$scope","$timeout",function(ShowData,$scope,$timeout){
    //console.log("PageController running!");

    var pageCtrlr = this;

    this.subPager = '1';

    this.service = ShowData;

    this.refresh = function()
    {
      $scope.$digest();

    }//refresh

    this.cycle_number = 0;
    this.cycle_start = false;
    this.cycle_default_menu = "psmodmenu";//im using the value not the content 'psmod Menu'

    this.hold_fire;
    this.hold_mode = 0;
    this.event_attached = false;//bugfix for attaching one event
    this.move_timer;//bugfix prevents from creating multiple & separate move timers

    this.list_grow = 3;//needed a third/initial state (do nothing)
    this.home_btn_press = false;

    this.grow_shrink = function()
    {
      pageCtrlr.list_grow = (pageCtrlr.list_grow == 1) ? 0 : 1;
    }//grow_shrink

    $scope.$on("reset list ctrls",function(event,data){
      pageCtrlr.list_grow = 3;
    });

    /*https://stackoverflow.com/questions/9457891/how-to-detect-if-domcontentloaded-was-fired
    if (document.readyState === "complete" || document.readyState === "loaded") {}*/

/*
    $scope.$watch(function(){return document.querySelector(".publish_up2").value;}, function(newValue, oldValue) {
        if (newValue)
            console.log("I see a data change!");
            ShowData.edit.publish_up = newValue;
    }, true);//this watch works with $scope.$digest();

    $scope.$watch(function(){return ShowData.edit.publish_down}, function(newValue, oldValue) {
        if (newValue)
            console.log("I see a data change!");
    }, true);//this watch works with $scope.$digest();
*/

  $scope.$watch(function(){return ShowData.data.page_ids}, function (newValue, oldValue,scope) {
      if(newValue){
      //console.log("page id change detected");
      //Do anything with $scope.letters
      //console.log("page_id newValue = ",newValue);
      //console.log("oldValue = ",oldValue);
       ShowData.data.page_ids = newValue;
       pageCtrlr.pair_check_all();
    }
  }, true);

  $scope.$watch(function(){return ShowData.pageData}, function (newValue, oldValue,scope) {
      if(newValue){
      //console.log("pageData change detected");
      //Do anything with $scope.letters
      //console.log("pageData newValue = ",newValue);
      //console.log("oldValue = ",oldValue);
       pageCtrlr.PageData = newValue;

       //this works here to trick angular into a $digest to evaluate the data
       $timeout(function(){
       },0,true).then(function(){
       });
    }
  }, true);

    this.refresh = function()
    {
      $scope.$digest();
    }//refresh

    /*https://stackoverflow.com/questions/9457891/how-to-detect-if-domcontentloaded-was-fired
    if (document.readyState === "complete" || document.readyState === "loaded") {}*/

/*
    $scope.$watch(function(){return document.querySelector(".publish_up2").value;}, function(newValue, oldValue) {
        if (newValue)
            console.log("I see a data change!");
            pageCtrlr.service.edit.publish_up = newValue;
    }, true);//this watch works with $scope.$digest();

    $scope.$watch(function(){return pageCtrlr.service.edit.publish_down}, function(newValue, oldValue) {
        if (newValue)
            console.log("I see a data change!");
    }, true);//this watch works with $scope.$digest();
*/

    this.update_access = function(newHead){
      //if there is a value do something
      if(arguments.length){
        //broadcast a msg to set a new header title
        //showCtrlr.message('set_txt_heading',newHead);
        ShowData.edit.access = newHead;
      };
      //return arguments.length ? (_tHead = newHead) : _tHead;
       var accessIndex = ShowData.getSelectedText("access2","match",ShowData.edit.access);
      document.getElementById('jform_access2').selectedIndex = accessIndex;
      return ShowData.edit.access;

    };//end update_access

    this.cycle_menu = function()
    {
      //console.log("cycle menu running");
      let menu_el = document.getElementById("jform_menutype2");
      //console.dir(menu_el);console.dir(menu_el[0]);console.dir(menu_el.length);

      if(pageCtrlr.cycle_start == false){
        let start_index = ShowData.getSelectedText("menutype2","value_index",pageCtrlr.cycle_default_menu);
        pageCtrlr.cycle_number = parseInt(start_index);
        pageCtrlr.cycle_start = true;

      }//end if

      //get the menu value
      let menu_value = ShowData.getSelectedText("menutype2","index_value",pageCtrlr.cycle_number);
      //console.log("menu value",menu_value);

      //add the value to the view
      let filter_elem = document.querySelector(".pg_filt_filter_input");
      filter_elem.value = menu_value;
      filter_elem.oninput();

      //console.log("cycle number = ",pageCtrlr.cycle_number)
      if(pageCtrlr.cycle_number < (menu_el.length - 1))
      {
        pageCtrlr.cycle_number++
      }else{
        pageCtrlr.cycle_number = 0;
      }
      //get the menu choices and put them into an array

    }//cycle_menu

    $scope.$on('page pair check',function(event,data){
      pageCtrlr.pair_check_all();
    });

    this.pair_check_all = function()
    {
      let pages_cont = document.querySelector(".pages_cont");
      let all_pages = pages_cont.querySelectorAll(".page_space");
      all_pages.forEach(function(entry)
      {
        pageCtrlr.pair_check_one(entry);
      });
    }//pair_check_all

    this.pair_check_one = function(tEl)
    {
      let page_id = tEl.dataset.page_id;
      let page_checkbox = tEl.querySelector(".check_page");
      if(typeof ShowData.data.page_ids != "object" || typeof ShowData.data.page_ids.length < 1){return;}
      let are_all_checked = (ShowData.data.page_ids.length == 1 && parseInt(ShowData.data.page_ids[0]) === parseInt("0")) ? "true" : "false";

      let is_in_array = ShowData.valueChecker({"array":ShowData.data.page_ids,"string":page_id,"mod":"index","type":"sna","action":"match"});
      if(is_in_array[0] == -1 && are_all_checked == "false")
      {
        page_checkbox.checked = false;
      }else {
        page_checkbox.checked = true;
      }
    }//pair_check_one

    this.select_all = function(mod)
    {
      //console.log("select all running!");
      //get the asset container
      let list_cont = document.querySelector(".pages_cont");
      let total_items = list_cont.querySelectorAll(".page_space");
      let item_total = total_items.length;
      let checked_total = pageCtrlr.total_checked(total_items);
      let active_items = list_cont.querySelectorAll(".awake");
      //let active_items = list_cont.getElementsByClassName("awake");
      let mode = mod || "default";//manual force - called by another function
      //if the amount of active (visible) items == the total available && # of checked items == that total youre looking at all the pages.
      let all_pages = (item_total == active_items.length && item_total == checked_total) ? true : false;
      let target_items = (mode == "force") ? total_items : active_items;

      //iterate through the list
      for(var t = 0; t < target_items.length; t++)
      {
        let page_check = target_items[t].querySelector(".check_page");
        page_check.checked = true;
        let active_id = target_items[t].dataset.page_id;

        //add the id to the array of id's - without duplicates
        let is_in_array = ShowData.valueChecker({"array":ShowData.data.page_ids,"string":active_id,"mod":"index","type":"sna","action":"match"});

        if(all_pages == true && mode != "force"){
          ShowData.data.page_ids = [0];
        }
        else if(is_in_array[0] == -1)
        {
          ShowData.data.page_ids = (typeof(ShowData.data.page_ids) == "object" && ShowData.data.page_ids[0] === 0) ? [] : ShowData.data.page_ids ;
          ShowData.data.page_ids.push(active_id);
          //console.log("page ids = ",ShowData.data.page_ids.join());
        }//end if

      }//end for

      //console.log("selected page ids = ",ShowData.data.page_ids.join());

    }//select_all

    this.full_count = function()
    {
      let list_cont = document.querySelector(".pages_cont");
      let total_items = list_cont.querySelectorAll(".page_space");
      let item_total = total_items.length;
      let checked_total = pageCtrlr.total_checked(total_items);
      let active_items = list_cont.querySelectorAll(".awake");
      //let active_items = list_cont.getElementsByClassName("awake");
      let all_pages = (item_total == active_items.length && item_total == checked_total) ? true : false;

      return all_pages;
    }//full_count

    this.check_one = function(pId)
    {
      //console.log("check change detected");

      let targ_el = event.target;
      let is_checked = event.target.checked;
      let active_id = pId;

      //on unchecking (is_checked == false) if select all mode is active array = [0]
      if(is_checked == false && ShowData.data.page_ids.length == 1 && parseInt(ShowData.data.page_ids[0]) === 0){
        //ShowData.data.page_ids = [];
        //run a forced select all - (leaves all the ids in the array w/o coverting to [0])
        pageCtrlr.select_all('force');
        //then remve the id
      }

      let is_in_array = ShowData.valueChecker({"array":ShowData.data.page_ids,"string":active_id,"mod":"index","type":"sna","action":"match"});

      switch(is_checked)
      {
        case true:
          if(is_in_array[0] == -1)
          {
              ShowData.data.page_ids.push(active_id);

              //check the count - if the count is full convert to zero
              let is_count_full = pageCtrlr.full_count();

              if(is_count_full == true){
                  ShowData.data.page_ids = [0];
              }//end if is_count_full
            //console.log("asset ids = ",ShowData.data.page_ids.join());
          }//end if
        break;
        case false:

          if(is_in_array[0] != -1)
          {
            ShowData.data.page_ids.splice(is_in_array[0],1);
            //console.log("asset ids = ",ShowData.data.page_ids.join());
          }//end if
        break;
      }//end switch
    }//check_one


    this.set_hold_mode = function(hdta,fn1,fn2)
    {
      //console.log("hold event happening");
      //console.log("hold event = ",event);//works
      //console.log("hold element = ",el);//doesnt work in angular - i passed 'this' (no quotes)
      //console.log("hold element = ",event.target);
      //console.log("hold fn = ",fn1);//works
      //console.log("hold data = ",hdta);//works

      //let me_seeks = e;
      var move_element = event.target;
      var hold_time = 1000;//1000 = 1sec
      var use_event = ("ontouchend" in move_element) ? "touchend" : "mouseup";
      pageCtrlr.hold_fired = false;//define a object global hold_fired variable
      var myEvent = event;
      /*let flt_btn = document.querySelector(".page_filt_btn");
      let ctrl_option = document.querySelector(".pages_ctrls_option");*/
      pageCtrlr.move_timer = setTimeout(function()
      {
        pageCtrlr.hold_fired = true;
        /*pageCtrlr.hold_mode = 1;*/
        pageCtrlr.hold_mngr("set");

        //console.log("hold is fired");
        //console.log("hold_mode = ",pageCtrlr.hold_mode);
        if(fn1 != undefined && typeof(fn1) == "function")
        {
          //prevents multiple active_blue classes
          /*flt_btn.className += (flt_btn.className.indexOf("active_blue") == -1) ? " active_blue" : "";
          ctrl_option.style.display = "flex";*/
          fn1(move_element,hdta);
          //custom color change
        }//end if
        clearTimeout(pageCtrlr.move_timer); pageCtrlr.move_timer = "";

      }, hold_time);//trigger_move
      //alert("use_event = " + use_event);

      if(pageCtrlr.event_attached == false){
        move_element.addEventListener(use_event,function(){
          clearTimeout(pageCtrlr.move_timer); pageCtrlr.move_timer = "";
          event.preventDefault();
          event.stopPropagation();

          //console.log(pageCtrlr.move_timer);
          if(pageCtrlr.hold_fired != true && pageCtrlr.hold_mode != 1 && fn2 != undefined && typeof(fn2) == "function"){
            fn2(move_element,hdta);
            //console.log("hold is not fired");
          }else if(pageCtrlr.hold_fired == false && pageCtrlr.hold_mode == 1){
            //console.log("hold is reset");
            /*pageCtrlr.hold_mode = 0;*/
            //console.log("hold_mode = ",pageCtrlr.hold_mode);
            pageCtrlr.hold_mngr("unset");
            /*let cls_str = flt_btn.className;
            flt_btn.className = cls_str.replace("active_blue","");
            ctrl_option.style.display = "none";*/
          }//end if
        });
        pageCtrlr.event_attached = true;


        window.addEventListener("scroll",function(){
          clearTimeout(pageCtrlr.move_timer); pageCtrlr.move_timer = ""; //alert("window scroll fireing");
        });
      } //end if event_attached
      /*
      document.getElementById("arc_display").addEventListener("scroll",function(){
        clearTimeout(move_timer);  //alert("element scroll fireing");
      });
      */

      //console.log("move mode running");
      //alert("move mode running");
      //also connected to view_li_details

    }//end set_hold_mode

    this.hold_mngr = function(str)
    {
      //pageCtrlr.hold_mngr("true");
      let mode = str;
      let flt_btn = document.querySelector(".page_filt_btn");
      let ctrl_option = document.querySelector(".pages_ctrls_option");
      switch(str)
      {
        case "set":
          pageCtrlr.hold_mode = 1;
          flt_btn.className += (flt_btn.className.indexOf("active_blue") == -1) ? " active_blue" : "";
          ctrl_option.style.display = "flex";
        break;

        case "unset":
        //removes the hold mode popup view
          pageCtrlr.hold_mode = 0;
          let cls_str = flt_btn.className;
          flt_btn.className = cls_str.replace("active_blue","");
          ctrl_option.style.display = "none";
        break;
      }
    }//hold_mngr

    this.filter_page = function()
    {
      let menu_value = ShowData.getSelectedText("menutype3","value");
     //document.getElementById('jform_menutype3').selectedIndex = menutype2Index;

     let filter_elem = document.querySelector(".pg_filt_filter_input");
     filter_elem.value = menu_value;
     filter_elem.oninput();
     pageCtrlr.hold_mngr("unset");

    }//filter_page

    this.total_checked = function(tAry)
    {
      //checks to see how many of the given items are checked
      //takes an array of elements
      let targetArray = tAry;
      let check_count = 0;
      for(var t = 0; t < targetArray.length; t++)
      {
        let page_check = targetArray[t].querySelector(".check_page");
        if(page_check.checked == true)
        {
          check_count++
        }
      }//end for
      return check_count;

    }//total_checked

    this.clear_all = async function()
    {
      //console.log("clear all running!");
      //get the asset container
      let list_cont = document.querySelector(".pages_cont");
      let total_items = list_cont.querySelectorAll(".page_space");
      let item_total = total_items.length;
      let active_items = list_cont.querySelectorAll(".awake");
      //let active_items = list_cont.getElementsByClassName("awake");

      let all_pages = (item_total == active_items.length) ? true : false;

      //iterate through the list
      if(all_pages == true)
      {
        ShowData.data.page_ids = [];

        for(var t = 0; t < active_items.length; t++)
        {
          let page_check = active_items[t].querySelector(".check_page");
          page_check.checked = false;
        }//end for - mini check none

      }else
      {
        if(typeof(ShowData.data.page_ids) == "object" && ShowData.data.page_ids[0] === 0){
          //if select all was for all pages - re add all items to allow for specified removal
          //clear the array
          ShowData.data.page_ids = [];
          //repopulate the array
          await pageCtrlr.select_all("force");
        }//end if

        for(var t = 0; t < active_items.length; t++)
        {
          let page_check = active_items[t].querySelector(".check_page");
          page_check.checked = false;
          let active_id = active_items[t].dataset.page_id;

          //add the id to the array of id's - without duplicates
          let is_in_array = ShowData.valueChecker({"array":ShowData.data.page_ids,"string":active_id,"mod":"index","type":"sna","action":"match"});


          if(is_in_array[0] != -1)
          {

            ShowData.data.page_ids = (typeof(ShowData.data.page_ids) == "object" && ShowData.data.page_ids[0] === 0) ? [] : ShowData.data.page_ids ;
            ShowData.data.page_ids.splice(is_in_array[0],1);
            //console.log("page ids = ",ShowData.data.page_ids.join());
          }//end if

        }//end for
      }//end else if ShowData.data wrapper

      //console.log("clear page ids = ",ShowData.data.page_ids.join());

    }//clear_all



    this.update_template = function(newHead){
      //if there is a value do something
      if(arguments.length){
        //broadcast a msg to set a new header title
        //showCtrlr.message('set_txt_heading',newHead);

        ShowData.edit.template_style_id = newHead;
      };
      //return arguments.length ? (_tHead = newHead) : _tHead;
       let templateIndex = ShowData.getSelectedText("template2","match",ShowData.edit.template_style_id);
      document.getElementById('jform_template2').selectedIndex = templateIndex;
      return ShowData.edit.template_style_id;
    };//end update_template

    this.is_published = function(){
      return (ShowData.edit.published == 1) ? true : false;

    };//end update_template

    this.update_menutype = function(newHead){
      //if there is a value do something
      if(arguments.length){
        //broadcast a msg to set a new header title
        //showCtrlr.message('set_txt_heading',newHead);

        ShowData.edit.menutype = newHead;
      };
      //return arguments.length ? (_tHead = newHead) : _tHead;
       let menutype2Index = ShowData.getSelectedText("menutype2","value_index",ShowData.edit.menutype);
      document.getElementById('jform_menutype2').selectedIndex = menutype2Index;
      return ShowData.edit.menutype;
    };//end update_menutype

    this.uniqueCheck = function()
    {
      //remove unneccessary spaces
      ShowData.edit.title = (ShowData.edit.title == undefined) ? "": ShowData.removeSomething(ShowData.edit.title,' ');
      if(ShowData.edit.title == undefined || ShowData.edit.title == ""){return;}

      //event is availale as long as i don't add it to the function(param)
      //console.log("uniqueCheck event =",event.target);
      //let targetVal = event.target.value;
      let idValue = ShowData.edit.id;
      let page_msg_cont = document.querySelector(".pageTitleMsg");

      ShowData.uniqueCheck(
      {
        text:ShowData.edit.title,
        id:ShowData.edit.id,
        mode:"page"
      })
      .then(function(result){
        //parseInt(str.replace(/[^\d]/g, ''), 10)
        switch(result)
        {
          case "error":
          break;
          case "false":
            //enable the save button
            //
            //hide the message
            page_msg_cont.style.display = "none";
            //when name is ok to use
          break;
          default:
              let conv_id = "" + parseInt(result.replace(/[^\d]/g, ''), 10)
              //alert("result is not false");
               if(conv_id != idValue)
               {
                 //disable the save button
                 //
                 //fill the message
                 page_msg_cont.innerText = "Please choose another title."
                 page_msg_cont.style.display = "inline-block";
               }else
               {
                 /*removes the disabled if name is already chosen and you try to return
                 to the originally saved name */
                  //enable the save button
                 //
                 //hide the message
                 page_msg_cont.style.display = "none";
               }//end else
            break;
          };//switch
      });


      //let targ_txt = document.
    };//uniqueCheck

    this.prepAlias = function()
    {
      //bugfix for undefined error
      ShowData.edit.alias = (ShowData.edit.alias == undefined) ? "": ShowData.edit.alias;
      let pal;
      if(ShowData.edit.alias == "")
      {
        pal = ShowData.edit.title;
        //control the spaces
        pal = ShowData.removeSomething(pal,' ','-');
        //replace slashes with dashes
        pal = ShowData.removeSomething(pal,'/','-');
        //make sure there are no double dashes
        pal = ShowData.removeSomething(pal,'-');

        ShowData.edit.alias = pal.toLowerCase();
      }else {
        pal = ShowData.edit.alias;
        //control the spaces
        pal = ShowData.removeSomething(pal,' ','-');
        //replace slashes with dashes
        pal = ShowData.removeSomething(pal,'/','-');
        //make sure there are no double dashes
        pal = ShowData.removeSomething(pal,'-');

        ShowData.edit.alias = pal.toLowerCase();

      }

    };//prepAlias


    this.reset_page = function()
    {
      //console.log( 'Resetting')
      ShowData.edit = angular.merge( ShowData.edit, ShowData.default_edit );
    };


    this.uniqueCheck = function()
    {
      pageCtrlr.service.edit.title = (pageCtrlr.service.edit.title == undefined) ? "":ShowData.removeSomething(pageCtrlr.service.edit.title,' ');
      if(pageCtrlr.service.edit.title == undefined || pageCtrlr.service.edit.title == ""){return;}

      //event is availale as long as i don't add it to the function(param)
      //console.log("uniqueCheck event =",event.target);
      //let targetVal = event.target.value;
      let idValue = pageCtrlr.service.edit.id;
      let page_msg_cont = document.querySelector(".pageTitleMsg");

      ShowData.uniqueCheck(
      {
        text:pageCtrlr.service.edit.title,
        id:pageCtrlr.service.edit.id,
        mode:"page"
      })
      .then(function(result){
        //parseInt(str.replace(/[^\d]/g, ''), 10)
        switch(result)
        {
          case "error":
          break;
          case "false":
            //enable the save button
            //
            //hide the message
            page_msg_cont.style.display = "none";
            //when name is ok to use
          break;
          default:
              let conv_id = "" + parseInt(result.replace(/[^\d]/g, ''), 10)
              //alert("result is not false");
               if(conv_id != idValue)
               {
                 //disable the save button
                 //
                 //fill the message
                 page_msg_cont.innerText = "Please choose another title."
                 page_msg_cont.style.display = "inline-block";
               }else
               {
                 /*removes the disabled if name is already chosen and you try to return
                 to the originally saved name */
                  //enable the save button
                 //
                 //hide the message
                 page_msg_cont.style.display = "none";
               }//end else
            break;
          };//switch
      });


      //let targ_txt = document.
    };//uniqueCheck

    this.prepAlias = function()
    {
      //bugfix for undefined error
      pageCtrlr.service.edit.alias = (pageCtrlr.service.edit.alias == undefined) ? "": pageCtrlr.service.edit.alias;
      let pal;
      if(pageCtrlr.service.edit.alias == "")
      {
        pal = pageCtrlr.service.edit.title;
        //control the spaces
        pal = ShowData.removeSomething(pal,' ','-');
        //replace slashes with dashes
        pal = ShowData.removeSomething(pal,'/','-');
        //make sure there are no double dashes
        pal = ShowData.removeSomething(pal,'-');

        pageCtrlr.service.edit.alias = pal.toLowerCase();
      }else {
        pal = pageCtrlr.service.edit.alias;
        //control the spaces
        pal = ShowData.removeSomething(pal,' ','-');
        //replace slashes with dashes
        pal = ShowData.removeSomething(pal,'/','-');
        //make sure there are no double dashes
        pal = ShowData.removeSomething(pal,'-');

        pageCtrlr.service.edit.alias = pal.toLowerCase();

      }

    };//prepAlias


    this.reset_all = function(dStr)
    {
      //reset the page variables
      let mode = dStr || "default";

      if(mode != "limited"){
        pageCtrlr.reset_page();
      }//end if

      //reset the default template

      ShowData.edit.template_style_id = ShowData.getSelectedText("template2","content_value",ShowData.default_template);
      document.getElementById('jform_template2').selectedIndex = ShowData.getSelectedText("template2","value_index",ShowData.edit.template_style_id);

      //reset the menu
      ShowData.edit.menutype = ShowData.getSelectedText("menutype2","content_value",ShowData.default_menutype);
      let sel_index = ShowData.getSelectedText("menutype2","value_index",ShowData.edit.menutype);
      document.getElementById('jform_menutype2').selectedIndex = sel_index;

      //console.log()
      //document.querySelector(".publish_up2").value = ShowData.edit.publish_up;
      //document.querySelector(".publish_down2").value = ShowData.edit.publish_down;


      //clear the canvas
      //ShowData.clear_element("prev_img_canvas_area",1);
      //ShowData.clear_element("tHead_time_display","empty");

      //clear the text editor
      //sceneCtrlr.updateEditor();
    }//end reset_all

    this.processEntry = async function(str)
    {
      //event.preventDefault();
      //event.stopPropagation();
      //console.log("showForm valid = ",$scope.showForm.$valid);
      switch(str)
      {
        case "cancel":
          pageCtrlr.reset_all();
          pageCtrlr.subPager = '1';
        break;

        case "submit":

          //console.log("pageForm valid = ",$scope.pageForm.$valid);
          if($scope.pageForm.$valid != true) return;
          //console.log("pageForm is valid!");
          ShowData.loader = 1;

          //alert("uniqueCheck running");
          let trans = {}

          ShowData.edit.published = (ShowData.edit.published == true) ? 1 : 0;
          trans.data = JSON.stringify(ShowData.edit);

          trans.task = "pageMaker";
          let check_results = "";

          await ShowData.request(trans)
          .then(function(result){
            //console.log("returned data = ",result);
            check_results = result;


            //repopulate the page library
          }).catch(function(err){
            console.log("a request error has occured: ",err);
          });

          pageCtrlr.getPageData();
          pageCtrlr.reset_all();

          return check_results;


          break;

      }//end switch
    }//processEntry

    this.reset_all();

    /***********************************************************************/
    /*******************   DIRECTIVE CONTROLLER SECTION    ********************/
    /***********************************************************************/

    //var display = this;
    this.object_details = [];
    this.page_default_icon = ADMINCOMP + "xfiles/images/loosie.jpg";
    this.object_elements = {};
    this.PageData = ShowData.pageData;
    /*$scope.$watch(function(){return ShowData.assetData}, function (newValue, oldValue, scope) {
      //Do anything with $scope.letters
      //console.log("newValue = ",newValue);
      //console.log("oldValue = ",oldValue);
      pageCtrlr.AssetData = newValue;

    }, true);*/
    /*$scope.$watch(function(){return pageCtrlr.object_details}, function (newValue, oldValue, scope) {
      //pageCtrlr.object_details = newValue;
    }, true);*/

    this.head = "this is the head";
    this.body = "this is the body";
    this.last_active_btn;

    this.getPageData = async function()
    {
      let trans = {};
      let ext = {};


      //trans.data = JSON.stringify(ShowData.edit);

      ext.data = "com_psmod";
      ext.task = "ps_getExt";
      let check_ext = "";

      await ShowData.request(ext).then(function(result){
        pageCtrlr.service.ext_id = result;
        //console.log("com_psmod ext = ",result);
      }).catch(function(err){
        console.log("a request error has occured: ",err);
      });

      trans.data = "test send pageData";
      trans.task = "ps_getPages";
      let check_results = "";

      ShowData.request(trans)
      .then(function(result){
        //console.log("page return data = ",result);
        check_results = result;
        //pageCtrlr.reset_all();
        pageCtrlr.service.pageData = result;

        //NOTE: pageCtrlr.service.pageData is the entire array, ShowData.edit is the single object

        $scope.$digest();

        //repopulate the page library
      }).catch(function(err){
        console.log("a request error has occured: ",err);
      });

      return check_results;

    }//end getPageData

    this.insertCanvas = function(dt,lst)
    {
      var inObj = dt;
      let restrict_id = "page_canvas_img" + inObj.id;
      let last_el = lst || false;

      if(document.querySelector("." + restrict_id)) return;


      let obj_details = (inObj.details != undefined && inObj.details != "") ? JSON.parse(inObj.details) : "";
      //obj_details.text.head.html = $sce.trustAsHtml(obj_details.text.head.html);//delete later
      //obj_details.text.body.html = $sce.trustAsHtml(obj_details.text.body.html);//

      let details_str = "details" + inObj.id;

      // i didn't want to do numbers and create gap indexes so i used a multidim array
      //set the details to the object not the objects details
      pageCtrlr.object_details[details_str] = inObj;

      ///make the asset_space dataset
      let my_dataset = pageCtrlr.search_str_mkr(inObj);
      let p_space_str = "page_space" + inObj.id;
      ///\r?\n|\r/g

      let enter_remover = new RegExp(/\r?\n|\r/g);//  '/'+ char + '+/g or / +/g
      my_dataset = my_dataset.replace(enter_remover," ");
      let my_space = document.getElementById(p_space_str);
      my_space.dataset.search_string = my_dataset.toLowerCase();
      my_space.dataset.page_id = inObj.id;
      //console.log("search str = ",my_dataset);
      pageCtrlr.pair_check_one(my_space);


      let obj_str = "page_thumb" + inObj.id;
      let page_id = "page_img" + inObj.id;
      let addClass = " " + restrict_id + " arc_rich_img prev_img  portrait asset darken ";
      pageCtrlr.canvas_mkr({name:obj_str,details:obj_details,home:page_id,class:addClass});
      if(ShowData.initiated == true && last_el == true){
        $timeout(function(){
           console.log("appjs Digest with $timeout");

        },0,true).then(function(){
          console.log("loader is off");
          ShowData.loader = 0;
        });
      }


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
            case "menutype":
            case "alias":
              if(my_vals[key] != undefined && my_vals[key] != ""){data_ary.push(my_vals[key])}
            break;
            case "text???":
            /*
              if(my_vals[key].body.raw  != undefined && my_vals[key].body.raw != ""){data_ary.push(my_vals[key].body.raw)}
              if(my_vals[key].link.alias  != undefined && my_vals[key].link.alias != ""){data_ary.push(my_vals[key].link.alias)}
              if(my_vals[key].link.url  != undefined && my_vals[key].link.url != ""){data_ary.push(my_vals[key].link.url)}
              if(my_vals[key].head.text  != undefined && my_vals[key].head.text  != ""){data_ary.push(my_vals[key].head.text)}
              if(my_vals[key].head.date.created.date  != undefined && my_vals[key].head.date.created.date  != ""){
                data_ary.push(my_vals[key].head.date.created.date);
                let nD = new Date(my_vals[key].head.date.created.date);
                console.log("new date = ",nD);
                data_ary.push(ShowData.day[nD.getDay()]);
                data_ary.push(ShowData.month[nD.getMonth()]);
              }
              */
              /*if(my_vals[key].head.date.created.timestamp  != undefined && my_vals[key].head.date.created.timestamp  != "" &&
              my_vals[key].head.date.created.timestamp  != "0"){
                data_ary.push(my_vals[key].head.date.created.timestamp)
              }*/
            break;
          }//end switch
      }//end for
      return data_ary.join();
    }//search_str_mkr

    this.canvas_mkr = function(cObj)
    {
      //http://localhost/Joomla/administrator/components/com_psmod/xfiles/images/loosie.jpg

      if(cObj.restrict != undefined && document.querySelector("." + cObj.restrict)) return;
      let can_home = cObj.home;
      let can_details = cObj.details;
      let can_custom_class = cObj.class || "";
      let can_url = (can_details.url != undefined && can_details.url != "") ? can_details.url : pageCtrlr.page_default_icon;
      let can_w = "300";
      let can_h = "300";
      let can_restrict = cObj.restrict || "";
      let can_class = cObj.class || "";
      can_class += " " + can_restrict + " ";
      let can_name = cObj.name;//variable name
      let adjust = cObj.adjust || false;

      //console.log("canvas url = ",can_url);

      if(adjust){
        can_class += (parseInt(can_w) <= parseInt(can_h)) ? " portrait " : "";
      }//end if

      pageCtrlr.object_elements[can_name] = new masterImage({home:can_home,varName:can_name,url:can_url,type:"banner",
      width:can_w,height:can_h});//looks like this controls the resolution
      pageCtrlr.object_elements[can_name].setCustomClass(can_class);
      pageCtrlr.object_elements[can_name].setRawDisplay();

        //major bug with this section
        //can_details != "" && can_details.img_obj != undefined &&
      /*if(can_details.img_obj.canvas_data != undefined
      && can_details.img_obj.canvas_data != "" && can_details.img_obj.canvas_data != {})
      {
        pageCtrlr.object_elements[can_name].setView(can_details.img_obj.canvas_data);
      }*/
      pageCtrlr.object_elements[can_name].clearHome("true");
      pageCtrlr.object_elements[can_name].display();

      var page_img_array = pageCtrlr.object_elements[can_name].get_event_ids();
      var page_img_id = page_img_array[0];

    }//end canvas_mkr

    this.edit_scene = function(sID)
    {
      //set scene to edit_scene
      //$scope.$emit("pls reset scene");
      pageCtrlr.last_active_btn = "edit_btn" + sID;

      //add id
      //ShowData.data_id = sID;

      //add data
      //add db object data

      let details_str = "details" + sID;
      /*
      //ShowData.data = pageCtrlr.object_details[details_str];
      //ShowData.reset();
      if(Object.keys(pageCtrlr.object_details[details_str].img_obj).length === 0 && pageCtrlr.object_details[details_str].img_obj.constructor === Object)
      {
        pageCtrlr.object_details[details_str].img_obj = "";//set to  a string to prevent merging
      }//end if
      */
      //reset the form
      //pageCtrlr.reset_all("limited");

      //console.log("db details = ",pageCtrlr.object_details[details_str]);

      ShowData.edit = angular.merge(ShowData.edit, pageCtrlr.object_details[details_str]);//this works
      //ShowData.edit = angular.merge( ShowData.edit, pageCtrlr.default_edit );
      //ShowData.edit = pageCtrlr.object_details[details_str];//experiment - this works too

      //pageCtrlr.reset_all();
      //console.log("edit object",ShowData.edit);
      //$scope.$digest();
      //$scope.$emit('broadcast preview form image');
      //ShowData.edit.title = "test title";


      $scope.$emit("pls switch tabs","page");

    }//edit_scene

    this.prep_sample = function(aID,mode)
    {
      //a hack for mouseenter mouseleave
      let data_str = "data" + aID;
      let btn_str = "sample_btn" + aID;
      let exit_fn = false;
      if(pageCtrlr.object_elements[data_str] == undefined)
      {
        pageCtrlr.object_elements[data_str] = {};
      }

      if(ShowData.tab != "sample")
      {
        pageCtrlr.last_active_btn = "";
      }
      let last_btn = (pageCtrlr.last_active_btn == btn_str) ? true : false;
      let last_action = pageCtrlr.object_elements[data_str].last_action;

      switch(mode){
        case "clear":
          //set a mouse leave function
          if(last_btn && last_action == "glance")
          {
            $scope.$emit("prep sample","clear");
            pageCtrlr.last_active_btn = btn_str;
            pageCtrlr.object_elements[data_str].last_action = mode;
            //console.log(btn_str + " " + mode);
          }//end if
          exit_fn = true;
        break;

        case "glance":
          if(last_btn && last_action == "click" || last_btn && last_action == "delete" )
          {
            //pageCtrlr.last_active_btn = btn_str;
            //pageCtrlr.object_elements[data_str].last_action = mode;
            //console.log(btn_str + " in " + mode + " do nothing");

            //if delete remove delete
            if(last_action == "delete"){
              pageCtrlr.object_elements[data_str].last_action = "glance";
              $scope.$emit("manage delete","remove");
            }//end if
            exit_fn = true;
          }else{
            pageCtrlr.last_active_btn = btn_str;
            pageCtrlr.object_elements[data_str].last_action = mode;
            //console.log(btn_str + " out " + mode);
          }
        break;

        case "click":
          if(last_btn && last_action == "glance" || last_btn && last_action == "delete")
          {
            //happens when i havent left the btn but click
            pageCtrlr.last_active_btn = btn_str;
            pageCtrlr.object_elements[data_str].last_action = mode;
            //console.log(btn_str + " in " + mode);

            //if delete remove delete
            if(last_action == "delete"){
              pageCtrlr.last_active_btn = "delete_btn" + sID;
              $scope.$emit("manage delete","remove");
            }//end if

            exit_fn = true;
          }else{
            pageCtrlr.last_active_btn = btn_str;
            pageCtrlr.object_elements[data_str].last_action = mode;
            //console.log(btn_str + " out " + mode);
          }
        break;

        case "delete":
            if(last_btn && last_action == "click")
            {
              //keep it the same add delete
              pageCtrlr.last_active_btn = btn_str;
              pageCtrlr.object_elements[data_str].last_action = mode;
              //console.log(btn_str + " in " + mode);
              $scope.$emit("manage delete","add");
              exit_fn = true;
            }else{
              //keep it the same add delete
              pageCtrlr.last_active_btn = btn_str;
              pageCtrlr.object_elements[data_str].last_action = mode;
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

      return;
      let details_str = "details" + aID;
      let details = pageCtrlr.object_details[details_str];
      let varName = "sample" + aID;
      let sample_home = "sample_img_cont";
      let sample_class = " sample_img ";


      ShowData.sample_view.title = details.title;
      ShowData.sample_view.id = aID;
      ShowData.sample_view.head = ShowData.THTML(details.text.head.html);
      ShowData.sample_view.body = ShowData.THTML(details.text.body.html);

      pageCtrlr.canvas_mkr({
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

    this.testHome = function(tObj)
    {
      let test_obj = tObj;
      let test_id = test_obj.id;
      let test_home = test_obj.home;

      if(parseInt(test_home) === 1)
      {
        ShowData.home_page_id = test_id;
      }
    }//testHome

    this.set_home = async function(pID)
    {
      if(ShowData.home_page_id == pID)
      {
        console.log("home page id is the same")
        return;
      }//end if

      //set the loader
      ShowData.loader = 1;
      pageCtrlr.home_btn_press = true;

      let pgDat = {};
      pgDat.data = pID;
      pgDat.task = "ps_setHome";


      await ShowData.request(pgDat).then(function(result){
        //refresh the page data section
        pageCtrlr.getPageData();
        console.log("com_psmod ext = ",result);

        //change the home_page_id
        //ShowData.home_page_id = pID;
      }).catch(function(err){
        console.log("a request error has occured: ",err);
      });
    }//set_home

    this.getPageData();

  }]);//controller

})();
