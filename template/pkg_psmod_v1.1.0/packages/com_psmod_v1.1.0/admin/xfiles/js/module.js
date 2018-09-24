(function(){
  var app = angular.module("pictureShow");

  app.controller("ModuleController",["$scope","ShowData","$timeout",function($scope,ShowData,$timeout){

    var modCtrlr = this;
    this.tab = 1;
    this.seeSection = '1';
    this.shuffle = 'modules';
    this.asset_ids;
    this.tool;
    this.service = ShowData;
    this.start_template = false

    this.initialize_asset = function()
    {
      let my_val = document.getElementById('jform_data_ids').value;
      if(my_val != ""){
        my_val = my_val.split(",");
        ShowData.asset_ids = my_val;
      }else {
        my_val = [];
      }
      modCtrlr.asset_ids = my_val;
      $scope.$emit('broadcast asset pair check');

      let txt_val = document.getElementById('jform_tool_data').innerHTML;
      if(txt_val != "" && "{}"){
        txt_val = JSON.parse(txt_val);
        ShowData.tool = txt_val;
        modCtrlr.tool = txt_val;
        modCtrlr.start_template = true;
      }else{
        //automatically add a tool

      }
    }//initialize_asset

    this.initialize_asset();// = ShowData.asset_ids;

    this.$onInit = function() {
      //sTCtrlr.my_stars = sTCtrlr.stars;
      //console.log(this);
      $timeout(function(){
         //console.log("post Digest with $timeout");
         if(modCtrlr.start_template == true)
         {
           ShowData.activate_template(ShowData.tool);
           ShowData.activate_template(ShowData.tool,"template_settings","settings");
         }else{
           //getToolData - get the generic data from the tool json the controller
           ShowData.getToolData().then(function(){
             ShowData.tool = ShowData.toolData[0];
             modCtrlr.tool = ShowData.toolData[0];

             ShowData.activate_template(ShowData.tool);
             ShowData.activate_template(ShowData.tool,"template_settings","settings");
           }).catch(function(err){
             console.error("module.js error",err);
           });
         }
      },0,true).then(function(){
         //sTCtrlr.showDivs(slideIndex);
      });
    };

    $scope.$watch(function(){return modCtrlr.asset_ids}, function (newValue, oldValue,scope) {
        if(newValue){
        //console.log("module input change detected");
        //Do anything with $scope.letters
        //console.log("modctrlr asset id newValue = ",newValue);
        //console.log("oldValue = ",oldValue);
        ShowData.asset_ids = newValue;
        modCtrlr.asset_ids = newValue;
        ShowData.asset_info = ShowData.update_asset_info(newValue);
      }
    }, true);

    $scope.$watch(function(){return ShowData.asset_ids}, function (newValue, oldValue,scope) {
        if(newValue){
        //console.log("module input change detected");
        //console.log("showData asset id newValue = ",newValue);
        ShowData.asset_ids = newValue;
        modCtrlr.asset_ids = newValue;
        ShowData.asset_info = ShowData.update_asset_info(newValue);
      }
    }, true);

    $scope.$watch(function(){return modCtrlr.tool}, function (newValue, oldValue,scope) {
        if(newValue){
        //console.log("module input change detected");
        //Do anything with $scope.letters
        //console.log("modctrlr asset id newValue = ",newValue);
        //console.log("oldValue = ",oldValue);
        ShowData.tool = newValue;
        modCtrlr.tool = newValue;
      }
    }, true);

    $scope.$watch(function(){return ShowData.tool}, function (newValue, oldValue,scope) {
        if(newValue){
        //console.log("module input change detected");
        //console.log("showData asset id newValue = ",newValue);
        ShowData.tool = newValue;
        modCtrlr.tool = newValue;
      }
    }, true);

    this.setAssets = function(adat){
      //if there is a value do something
      if(arguments.length){
        //broadcast a msg to set a new header title
        //showCtrlr.message('set_txt_heading',newHead);
        modCtrlr.asset_ids = adat.split(",");
        ShowData.asset_ids = adat.split(",");
        //ShowData.asset_info = ShowData.update_asset_info(ShowData.asset_ids);
      };
      //return arguments.length ? (_tHead = newHead) : _tHead;
      //return modCtrlr.asset_ids;//this doesn't work - it is passing an array instead of a string

      let clean_data = modCtrlr.asset_ids.join();
      clean_data = ShowData.removeSomething(clean_data,',');
      return clean_data;
    };//end setAssets

    this.setTools = function(adat){
      //if there is a value do something
      if(arguments.length){

        modCtrlr.tool = JSON.parse(adat);
        ShowData.tool = JSON.parse(adat);

        $scope.$emit("pls activate template",ShowData.tool);

      };
      if(modCtrlr.tool["$$hashKey"])delete modCtrlr.tool["$$hashKey"];
      return JSON.stringify(modCtrlr.tool);
    };//end setTools

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

    this.refresh = function()
    {
      $scope.$digest();

    }//refresh

  }]);//end ModuleController

})();//end closure

/*
(function(){

})();
*/
