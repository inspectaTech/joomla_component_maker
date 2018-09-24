(function(){
console.log("angular running!");

var app = angular.module("pictureShow", []);
app.controller('showTimeController',["ShowData","$scope","$timeout","$rootElement",function(ShowData,$scope,$timeout,$rootElement){

    console.log("showTimeController running!");
    var boss = this;
    this.service = ShowData;
    this.app = "showtime app running";

    $scope.$watch(function(){return ShowData.app}, function (newValue, oldValue,scope) {
        if(newValue){
        console.log("app change detected");

        boss.app = newValue;
      }
    }, true);

    this.getData = async function()
    {
      let trans = {};
      trans.task = "places";
      trans.data = ShowData.module_id;

      //this await here works to delay the processing of this function until the data returns from the db
      await boss.service.request(trans)
      .then(function(results)
      {
        console.log("places results = ",results);
        if(results != "error"){

          ShowData.app = results;
          ShowData.tool_data = JSON.parse(results[0].tool_data);
          ShowData.data_ids = results[0].data_ids.split(",");
          console.log("tool_data = ",ShowData.tool_data);
        }
        //$scope.$apply();
      }).catch(function(err)
      {
        console.log(`psmod_app getData error ${err}`);
      });

      console.log("getData finished running!");
    }//getData

    this.getAssets = async function()
    {
      let trans = {};
      trans.task = "getAssets";
      trans.data = ShowData.data_ids.join();

      if(trans.data == "") return;

      await boss.service.request(trans)
      .then(function(results)
      {
        console.log("places results = ",results);
        if(results != "error"){

          ShowData.asset_info = results;

          console.log("tool_data = ",ShowData.asset_info);
        }
        //$scope.$apply();
      }).catch(function(err)
      {
        console.log(`psmod_app getData error ${err}`);
      });

      console.log("getAssets finished running!");

      return;
    }//getAssets

    this.$onInit = async function() {

      await boss.getData()
      await boss.getAssets()
      .then(function(){
        //once the assests are returned bootstrap the tool_showcase
        if(typeof boss.service.asset_info == "object" && boss.service.asset_info.length  != 0){
          let home_str = "tool_showcase" + boss.service.module_id;
          boss.service.activate_template(boss.service.tool_data,home_str);
        }//end if
      });
        $timeout(function(){
          //$scope.$apply();
          console.log("data-module = ",boss.service.module_id);

        },0,true).then(function(){
          //sTCtrlr.showDivs(slideIndex);
        });

      return;
    };//onInit




}]);//end ShowController


})();//end closure
