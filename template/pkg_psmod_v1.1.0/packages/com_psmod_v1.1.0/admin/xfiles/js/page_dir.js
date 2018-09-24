(function(){

  var app = angular.module("pictureShow");

  app.directive("pageAssets",function(){
    return{
      restrict:"A",
      templateUrl:BASEURL + "components/com_psmod/xfiles/js/page.html",
      scope: {
        pgData: '=pData'
      },
      link: function(scope, elem, attrs, ctrl) {
      },
      controller:"PageController",
      controllerAs:"pAssets",
      bindToController:true

    };//end return
  });//end directive

})();
