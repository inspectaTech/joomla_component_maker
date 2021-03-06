(function(){

  var app = angular.module("pictureShow");

    app.directive('ngDraggable',function($document) {
      return {
        restrict: 'AC',/*id like to make it a class*/
        scope: {
          dragOptions: '=ngDraggable'
        },
        link: function(scope, elem, attr) {
          //let  my_scope = scope;
          //let my_attr = attr;
          //let my_elem = elem;

          var startX, startY, x = 0, y = 0,
              start, stop, drag, container;

          var targ_el = elem[0];
          var width  = elem[0].offsetWidth,
              height = elem[0].offsetHeight;

          var start,drag,stop,container;

          var drag_handle = "false";

          // Obtain drag options
          if (scope.dragOptions) {
            drag_handle = scope.dragOptions.drag_handle || "false";
            start  = scope.dragOptions.start;
            drag   = scope.dragOptions.drag;
            stop   = scope.dragOptions.stop;
            var id = scope.dragOptions.container;
            if (id && id != "custom") {
                let container_targ = (document.getElementById(id)) ? document.getElementById(id) : document.querySelector("." + id);
                container = container_targ.getBoundingClientRect();
            }else if(id == "custom"){
              container = scope.dragOptions.custom;
            }
          }

          // Bind mousedown event
          elem.on('mousedown', function(e) {

            if(drag_handle != "false" && e.target.className.indexOf(drag_handle) == -1 && e.target != this)return;

            if(e.target.localName != "input"){
              e.preventDefault();//this stops unwanted hightlighting while moving
            }
            startX = e.clientX - elem[0].offsetLeft;
            startY = e.clientY - elem[0].offsetTop;
            $document.on('mousemove', mousemove);
            $document.on('mouseup', mouseup);
            if (start) start(e);
          });

          // Handle drag event
          function mousemove(e) {
            y = e.clientY - startY;
            x = e.clientX - startX;
            setPosition();
            if (drag) drag(e);
          }

          // Unbind drag events
          function mouseup(e) {
            $document.unbind('mousemove', mousemove);
            $document.unbind('mouseup', mouseup);
            if (stop) stop(e);
          }

          // Move element, within container if provided
          function setPosition() {
            let width  = targ_el.offsetWidth,
            height = targ_el.offsetHeight;
            container.right = window.innerWidth;
            let r_margin = 0;
            if(container.margin != undefined && container.margin != "" && container.margin != 0)
            {
              let get_pct = container.margin / 100;
              r_margin = container.right * get_pct;
            }//if

            if (container) {
              if (x < container.left) {
                x = container.left;
              } else if (x > container.right - width) {
                x = (container.right - r_margin) - width;
              }
              if (y < container.top) {
                y = container.top;
              } else if (y > container.bottom - height) {
                y = container.bottom - height;
              }
            }

            elem.css({
              top: y + 'px',
              left:  x + 'px'
            });
          }
        }
      }

    });

    /*

    http://jsfiddle.net/zargyle/35z4J/1/
    <div ng-app="test" ng-controller="testCtrl"><!-- testCtrl section needs mod -->
        <div id="container">
            <div class="shape" ng-draggable='dragOptions'></div>
        </div>
    </div>

    .controller('testCtrl', function($scope) {
        $scope.dragOptions = {
            start: function(e) {
              console.log("STARTING");
            },
            drag: function(e) {
              console.log("DRAGGING");
            },
            stop: function(e) {
              console.log("STOPPING");
            },
            container: 'container'
        }

    });


    */

})()
