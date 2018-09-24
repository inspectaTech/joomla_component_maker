(function(){
  var app = angular.module("pictureShow");

  app.directive("advancedColors",function(){
  return{
    restrict:"AC",
    templateUrl:BASEURL + "components/com_psmod/xfiles/js/color.html",
    scope: {
      destination: '=',
      property: '@',
      callout: '=',
      params: '=',
      collection: '=',
      expandto: '@'
    },
    controller:"ColorController",
    controllerAs:"picasso",
     bindToController: true
  };
});
})();
