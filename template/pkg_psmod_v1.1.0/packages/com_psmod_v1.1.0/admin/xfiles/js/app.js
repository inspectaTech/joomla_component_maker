(function(){
//console.log("angular running!");

var app = angular.module("pictureShow", []);
app.controller('ShowController',["ShowData","$scope","$timeout",function(ShowData,$scope,$timeout){

  var showCtrlr = this;
  this.stable = false;
  this.service = ShowData;
  this.ShowData = ShowData.data;
  this.ShowCanvas = ShowData.canvas;
  this.ShowText = ShowData.data.text;
  this.ShowHead = ShowData.data.text.head;
  this.ShowDate = ShowData.data.text.head.date;
  this.ShowBody = ShowData.data.text.body;
  this.ShowLink = ShowData.data.text.link;
  this.directive = "manual-slideshow";

  this.testVar = "running the show.";
  this.stg = true;
  this.bldr = false;
  this.tab = "config";
  this.last_tab = "config";
  this.preview = 0;
  this.on = false;
  this.title = document.querySelector(".inputbox").value;
  this.scene_data = [];
  this.show_editor = 0;
  this.timeToggle = 0;
  this.last_elem;
  this.delete_mode = false;
  this.disable_all = true;
  this.visible_options = "assets";
  this.dragOptions = {
      start: function(e) {
        console.log("STARTING");
      },
      drag: function(e) {
        console.log("DRAGGING");
      },
      stop: function(e) {
        console.log("STOPPING");
      },
      container: 'custom',
      drag_handle:'drag_handle',
      custom:{
        bottom:508,
        height:Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
        left:0,
        right:Math.max(document.documentElement.clientWidth, window.innerWidth || 0),/*760*/
        top:-40,
        width:Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
        x:10,
        y:114,
        margin:4.5
      }
  };
  this.move_stgs = false;
  this.move_stgs_view = 3;
  this.move_opacity = true;
  this.set_move_stgs = function(str)
  {
    let mode = str;
    switch(mode)
    {
      case "reset":
          showCtrlr.move_stgs = false;
          showCtrlr.set_opacity('off',showCtrlr.move_opacity,'settings_mover');
      break;

      case "full":
        showCtrlr.move_stgs_view = 3;
        document.querySelector(".settings_mover").style.left = "0";
        document.querySelector(".settings_mover").style.top = "0";
      break;

      default:
        let nbr = (mode == "minus") ? -1 : 1;
        showCtrlr.move_stgs_view = (mode == "minus" && showCtrlr.move_stgs_view == 0 || mode != "minus" && showCtrlr.move_stgs_view == 3) ?
        showCtrlr.move_stgs_view : showCtrlr.move_stgs_view + nbr;
        console.log("stage view = ",showCtrlr.move_stgs_view);
      break;
    }

  }//set_move_stgs

  this.set_opacity = function(str,dta,cls)
  {
    let targ_el = document.querySelector("." + cls);
    let mode = (showCtrlr.on == false || dta == false || showCtrlr.move_stgs_view < 2) ? "off" : str;
    switch(mode)
    {
      case "on":
        targ_el.style.opacity = ".1";
      break;
      case "off":
        targ_el.style.opacity = "1";
      break;
    }//switch
  }//set_opacity

  this.toggle_move_opacity = function()
  {
    showCtrlr.move_opacity = (showCtrlr.move_opacity == true) ? false : true;
  }//toggle_move_opacity

  ShowData.delete_mode = this.delete_mode;
  var daT = new Date();
  ShowData.module_id = document.getElementById("jform_module_id").value;
  //this.timeCreated = daT.toLocaleString();
  //this.cTimestamp = daT.getTime();
  //console.log("tab = ",this.tab);
  this.module_position = "";

  this.showEditor = function()
  {
    showCtrlr.show_editor = 1;
    //$scope.$emit('setModTime');
    showCtrlr.setModTime();
    //console.log("build emit?");

    if(showCtrlr.ShowHead.html != ""){
      document.querySelector(".tHead_time_display").innerHTML = ShowData.THTML(showCtrlr.ShowHead.html);
    }//end if

    showCtrlr.message("update editor");
  }//end showEditor

  $scope.$on("display_assets",function(dDat){
    showCtrlr.display_assets(dDat);
  });
  $scope.$on("pls reset scene",function(){
    $scope.$broadcast("reset scene");
  });
  $scope.$on("pls activate template",function(tDat){
    $scope.$broadcast("activate template",tDat);
  });

  this.$onInit = function() {
    //sTCtrlr.my_stars = sTCtrlr.stars;
    //console.log(this);
    $timeout(function(){
       //console.log("appjs Digest with $timeout");
       //sTCtrlr.initiated = true;

    },5000,true).then(function(){
       ShowData.loader = 0;
       ShowData.initiated = true;
    });
  };


  this.display_assets = function(dDat)
  {
    showCtrlr.service.assetData = dDat;
  }//end display_assets


  this.message = function(message,data){
    $scope.$broadcast(message,data);//'sendText'
  }//end message

  $scope.$on('broadcast preview form image',function(event,data){
    showCtrlr.message('preview form image');
  });//> form.js

  $scope.$on('broadcast preview tags',function(event,data){
    showCtrlr.message('preview tags');
  });

  $scope.$on('broadcast asset pair check',function(event,data){
    showCtrlr.message('asset pair check');
  });

  $scope.$on('broadcast page pair check',function(event,data){
    showCtrlr.message('page pair check');
  });

  $scope.$on('hide_textEditor',function($arguments){
    showCtrlr.show_editor = 0;
    //$scope.$apply();
  });//> scene.js

  this.setTitle = function(ttl){
    //if there is a value do something
    if(arguments.length){
      //broadcast a msg to set a new header title
      //showCtrlr.message('set_txt_heading',newHead);
      showCtrlr.title = ttl;
      ShowData.module_title = ttl;
      if(showCtrlr.title == "")
      {
        showCtrlr.disable_all = true;
      }else{
        showCtrlr.disable_all = false;
      }//end else
    };
    //return arguments.length ? (_tHead = newHead) : _tHead;
    return showCtrlr.title;
  };//end setTitle

    var _tHead = "";
    this.setHead = function(newHead){
      //if there is a value do something
      if(arguments.length){
        //broadcast a msg to set a new header title
        //showCtrlr.message('set_txt_heading',newHead);
        showCtrlr.ShowHead.text = newHead;
      };
      //return arguments.length ? (_tHead = newHead) : _tHead;
      return showCtrlr.ShowHead.text;
    };//end setHead

    var _tLink = "";
    this.setLink = function(nL){
      //if there is a value do something
      var type = "link";
      if(arguments.length){
        //broadcast a msg to set a new header title

        //showCtrlr.message('set_txt_data',{type,data:nL});
        showCtrlr.ShowLink.url = nL;
      };
      //return arguments.length ? (_tLink = nL) : _tLink;
      return showCtrlr.ShowLink.url;
    };//end setLink



    var _tAlias = "";//defined outside because sometimes nothing is passed
    this.setAlias = function(nA){
      //if there is a value do something
      var type = "alias";
      if(arguments.length){
        //broadcast a msg to set a new header title
        showCtrlr.ShowLink.alias = nA;
        //showCtrlr.message('set_txt_data',{type,data:nA});
      };
      //return arguments.length ? (_tAlias = nA) : _tAlias;
      return showCtrlr.ShowLink.alias;
    };//end setHead

    var _mTime = "";
    $scope.$on('setModTime',function()
    {
      this.setModTime();
    });//end setTime

    this.setModTime = function()
    {
      ShowData.form.date.create_date("modified");
    }//end setModTime

    var _tTime = "";
    this.toggleTime = function()
    {
      if(showCtrlr.timeToggle < 3)
      {
        showCtrlr.timeToggle++;
      }else{
        showCtrlr.timeToggle = 0;
      }
      showCtrlr.ShowHead.toggle_value = showCtrlr.timeToggle;
      showCtrlr.message('toggleTime',showCtrlr.timeToggle);
    };//end toggleTime

  this.switch = function(){this.preview = (this.preview == 0) ? this.preview = 1 : this.preview = 0;}

  $scope.$on("pls switch tabs",function(event,data){
    //showCtrlr.switchTab("build");
    let swch_data = data || "build";
    showCtrlr.tab = swch_data;
  });
  this.switchTab = function(tName)
  {
    showCtrlr.tab = tName;
    showCtrlr.last_tab = tName;
    switch(tName){
      //visible_options controls the visible option icons
      case "build":
        showCtrlr.visible_options = "assets";
      break;
      case "page":
        showCtrlr.visible_options = "pages";
      break;
      case "tool":
        showCtrlr.visible_options = "tools";
        //showCtrlr.tab = "config";
        //showCtrlr.last_tab = "config";
      break;
    }
  };//end switchTab

  this.toggle = function()
  {
    switch(this.on)
    {
      case true:
        this.on = false;
      break;
      case false:
        this.on = true;
        showCtrlr.tab = showCtrlr.last_tab;
      break;
    }//end switch

    //always set this to off when this btn is pressed
    showCtrlr.set_opacity('off',showCtrlr.move_opacity,'settings_mover');
  };

  this.toggle_assets = function()
  {
    switch(this.assets_visible)
    {
      case true:
        this.assets_visible = false;
      break;
      case false:
        this.assets_visible = true;
      break;
    }//end switch
  };

  $scope.$on("prep sample",function(event,data_id){
    showCtrlr.toggle_log("sample",data_id);
    showCtrlr.delete_mode = false;
    ShowData.delete_mode = showCtrlr.delete_mode;
  });
  $scope.$on("prep delete",function(event,data_id){
    showCtrlr.toggle_log("sample",data_id);
    showCtrlr.delete_mode = true;
    ShowData.delete_mode = showCtrlr.delete_mode;
  });
  $scope.$on("manage delete",function(event,data){
    showCtrlr.manage_delete(data);
  });
  this.manage_delete = function(data)
  {    switch(data){
        case "add":
          showCtrlr.delete_mode = true;
          ShowData.delete_mode = showCtrlr.delete_mode;
        break;
        case "remove":
          showCtrlr.delete_mode = false;
          ShowData.delete_mode = showCtrlr.delete_mode;
        break;
      }//end switch

  }//end manage_delete

  this.reset_list_ctrls = function()
  {
    showCtrlr.message("reset list ctrls");
  }

  this.reset_sample = function()
  {
    ShowData.sample_view.title = "";
    ShowData.sample_view.id = "";
    ShowData.sample_view.head = "";
    ShowData.sample_view.body = "";
    showCtrlr.tab = "build";

    document.querySelector(".sample_img_cont").innerHTML = "";
  }//end reset_sample

  this.delete_asset = function(dID)
  {
    ShowData.deleteShowData(dID);
    showCtrlr.reset_sample();
  }//end delete_asset
  this.toggle_log = function(lStr,eID)
  {
    let elem = (eID != undefined && eID != "") ? eID : "";
    let new_element = (elem != "" && elem != "clear" && showCtrlr.last_elem != elem) ? true : false;
    if(showCtrlr.tab != lStr  && eID != "clear" || new_element == true  && eID != "clear" ){
      //if its log or sample (one of 2 special toggle states make it what it was)
      showCtrlr.last_tab = (showCtrlr.tab != "log" && showCtrlr.tab != "sample") ? showCtrlr.tab : showCtrlr.last_tab;
      showCtrlr.last_elem = elem;//either "" or not whatever it is set it.
      showCtrlr.tab = lStr;
      ShowData.tab = showCtrlr.tab;
    }else{
      //hack if elem == clear come in here
      showCtrlr.tab = showCtrlr.last_tab;
      ShowData.tab = showCtrlr.tab;
      showCtrlr.last_elem = "";
    }//end else
  };

  this.modulePosition = function(mP)
  {
    if(arguments.length){

      showCtrlr.module_position = mP;
    //ShowData.module_position = mP;

    };

    return showCtrlr.module_position;
  }//modulePosition

  this.call_to_order = function()
  {
    //console.log("call to order running");
    showCtrlr.message("get module order");
  }//call_to_order

  this.clearTime = function(mode)
  {
    event.preventDefault();
    event.stopPropagation();
    let clrVal = '0000-00-00 00:00:00';
    let startVar,endVar;
    switch(mode){
      case "module":
        startVar = ".publish_up";
        endVar = ".publish_down";
      break;
      case "page":
        startVar = ".publish_up2";
        endVar = ".publish_down2";
      break;
    }//end switch
  document.querySelector(startVar).value = clrVal;
  document.querySelector(endVar).value = clrVal;

  };//clearTime

  this.refresh = function()
  {
    $scope.$digest();

  }//refresh

}]);//end ShowController



app.controller("PanelController",function(){

  this.tab = 1;

  this.selectTab = function(nbr)
  {
    this.tab = nbr;
  };

  this.notMyTab = function(nbr)
  {
    return this.tab != nbr;
  };

  this.isMyTab = function(nbr)
  {
    /*ng-class="{hide_panel: panel.isMyTab(4)}"*/
    return this.tab === nbr;
  };
});//end PanelController


})();//end closure

/*
//getting the text editors text
var iframe = document.getElementById('jform_tedit_ifr');
var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
var currentText = innerDoc.body.innerHTML;
var pureText = innerDoc.body.innerText;
*/

/*
<input type="url" id="tEdit_link" class="tEdit_link tEdit_input" placeholder="enter a url..."
ng-model="show.setLink" ng-model-options="{ getterSetter: true }" />

this.fn = function(event,data){
  //if there is a value do something
  var type = "link";
  var type = event.target.dataset.type
  if(arguments.length){
    //broadcast a msg to set a new header title

    showCtrlr.message('set_txt_data',{type,data:nL});
  };
  return arguments.length ? (_tLink = nL) : _tLink;
};//end setLink
*/
