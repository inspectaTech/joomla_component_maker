
(function(){
  var app = angular.module("pictureShow");
  app.directive("selectMenu",function(){
  return{
    restrict:"C",
    templateUrl:BASEURL + "components/com_psmod/xfiles/js/selectMenu.html",
    scope: {
      selData: '=sData',
      valData: '=vData'
    },
    controller:function(){

      //console.log("select array = ",this.selectArray)
    },
    controllerAs:"choice"
  };
});



})();
