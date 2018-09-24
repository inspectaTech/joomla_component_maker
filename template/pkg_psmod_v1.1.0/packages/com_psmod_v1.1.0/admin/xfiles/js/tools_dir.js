
(function(){
  var app = angular.module("pictureShow");

  app.directive("displayTools",function(){
  return{
    restrict:"A",
    templateUrl:BASEURL + "components/com_psmod/xfiles/js/tools.html",
    scope: {
      appData: '=tData',
      valData: '=vData'
    },
    controller:"ToolController",
    controllerAs:"work",
     bindToController: true
  };
});
})();
