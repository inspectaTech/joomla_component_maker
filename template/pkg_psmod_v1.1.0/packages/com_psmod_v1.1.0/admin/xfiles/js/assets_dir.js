
(function(){
  var app = angular.module("pictureShow");

  app.directive("displayAssets",function(){
  return{
    restrict:"A",
    templateUrl:BASEURL + "components/com_psmod/xfiles/js/assets.html",
    scope: {
      appData: '=aData',
      valData: '=vData'
    },
    controller:"AssetController",
    controllerAs:"display",
     bindToController: true
  };
});
})();
