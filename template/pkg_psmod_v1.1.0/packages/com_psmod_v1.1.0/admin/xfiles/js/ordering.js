
(function(){
  var app = angular.module("pictureShow");
  app.directive("ordering",function(){
  return{
    restrict:"C",
    templateUrl:function(elem, attr){
      let mode = attr.mode;
      let urlStr = `${BASEURL}components/com_psmod/xfiles/js/order_${mode}.html`;

      //console.log(`new url string = ${urlStr}`);

      return urlStr;
    },
    scope: {
      modPos: '=oData',
      asetPos: '=aData',
      asetIds: '=aIds',
      orderMode: '='
    },
    link: function(scope, elem, attrs, ctrl) {


      elem.on("dragstart",function(event){ctrl.dragstart_handler(event);});

      elem.on("dragover",function(event){ctrl.allowDrop(event);});

      elem.on("drop",function(event){ctrl.drop_handler(event);});

      elem.on("dragenter",function(event){ctrl.dummy(event,"in");});

      elem.on("dragend",function(event){ctrl.stop_the_press(event);});


      },
    controller:["ShowData","$sce","$scope","$timeout",function(ShowData,$sce,$scope,$timeout){
      //console.log("ordering js running!");
      var orderCtrlr = this;
      this.OrderData = ShowData.orderData;
      this.object_params = [];
      this.module_list = [];
      this.list_order = [];
      this.asset_order = [];
      this.module_title = ShowData.module_title;
      this.first_run = false;
      this.mode;
      this.service = ShowData;

      $scope.$watch(function(){return ShowData.OrderData}, function (newValue, oldValue, scope) {
        //Do anything with $scope.letters
        //console.log("newValue = ",newValue);
        //console.log("oldValue = ",oldValue);
        orderCtrlr.OrderData = newValue;

      }, true);

      $scope.$watch(function(){return orderCtrlr.module_list}, function(newValue, oldValue) {
          if (newValue)
              //console.log("I see an ordering module list change!")
              ;
      }, true);//this watch works with $scope.$digest();

      $scope.$watch(function(){return ShowData.module_title}, function(newValue, oldValue) {
          if (newValue)

            //confine to module mode
            if(orderCtrlr.mode != "module")return;

              orderCtrlr.module_title = newValue;
              //console.log("I see an order module_title change!",orderCtrlr.module_title);
              let orders = document.querySelectorAll(`.${orderCtrlr.mode}_mov`);
              let visible_title = (ShowData.module_title != undefined && ShowData.module_title != "") ? ShowData.module_title : "untitled";

              for(let h = 0; h < orders.length; h++)
              {
                let test_obj = JSON.parse(orders[h].dataset.module_data);
                if(test_obj.id == "0"){
                  test_obj.title = visible_title;
                  orders[h].dataset.module_data = JSON.stringify(test_obj);
                  orders[h].innerHTML = visible_title;
                }
              }
      }, true);//this watch works with $scope.$digest();


      //https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API

      //https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_draganddrop


      document.addEventListener('DOMContentLoaded', function () {

          //console.log("ordering content loaded running!")
          orderCtrlr.prep_elements();
      });

      var last_item = "";
      var last_count = 0;
      var move_obj;
      var list_order = [];//closure variables

      this.prep_elements = function()
      {
      	//document.querySelector("._cont").addEventListener("dragover",function(event){orderCtrlr.allowDrop(event)});


      /*
      //i think this is deprecated
        let all_divs = document.querySelectorAll(".mov");

        for(let b = 0; b < all_divs.length; b++){
        	let cur_div = all_divs[b];
          cur_div.addEventListener("dragstart",function(event){orderCtrlr.dragstart_handler(event);});

          cur_div.addEventListener("dragover",function(event){orderCtrlr.allowDrop(event);});

          cur_div.addEventListener("drop",function(event){orderCtrlr.drop_handler(event);});

          cur_div.addEventListener("dragenter",function(event){orderCtrlr.dummy(event,"in");});

          cur_div.addEventListener("dragend",function(event){orderCtrlr.stop_the_press(event);});


        }//end for

        orderCtrlr.list_report();
        */

      }//end prep_elements

      this.prep_assets = function(mod)
      {
        orderCtrlr.mode = mod;
        ShowData.temp_asset_ids = ShowData.asset_ids.join();
      }//pre_assets


      this.dragstart_handler = function(ev) {
        // Add the drag data
        if(ev.dataTransfer){
        ev.dataTransfer.setData("text/plain", ev.target.id);
        //console.log(ev.target.id);
        move_obj = document.getElementById(ev.target.id);
        move_obj.className += " ghost";
          //console.log("move class = ",move_obj.className);
        //img test
          //var img = new Image();
        //img.src = 'http://miftyisbored.com/wp-content/uploads/2013/07/autobots-logo-17.jpg';
        //ev.dataTransfer.setDragImage(img, 10, 10);//not working

          ev.dropEffect = "move";
        }//end if
      }//end dragstart_handler

      this.allowDrop = function(ev) {
          ev.preventDefault();
        if(ev.dataTransfer){
           ev.dataTransfer.dropEffect = "move";
        }else{return;}//end if
      }//end allowDrop

      this.drop_handler = function(ev) {
       ev.preventDefault();
          //console.log("drop recognized");
       // Get the id of the target and add the moved element to the target's DOM
       var data = ev.dataTransfer.getData("text");
       let mover = document.getElementById(data);
       let targEl = ev.target;

        //console.log("dropable = ",targEl.)

        orderCtrlr.placeItem(ev,targEl,mover);
        move_obj.className = move_obj.className.replace(" ghost","");
        //removeItem(ev,targEl,"drop");
        //ev.target.appendChild(document.getElementById(data));
        //console.log("move class = ",move_obj.className);

                switch(orderCtrlr.mode)
                {
                  case "asset":
                    orderCtrlr.asset_report();
                  break;
                  case "module":
                    orderCtrlr.list_report();
                  break;
                }
      }//end drop_handler

      this.dummy = function(ev,str){
        ev.preventDefault();
        let targEl = ev.target;
        //console.log("my id = ",targEl.id);

        let data = ev.dataTransfer.getData("text");
        let mover = document.getElementById(data);


        switch(str)
          {
            case "in":

              //console.log("place in");

              orderCtrlr.placeItem(ev,targEl,move_obj);

            break;
            case "out":
              //console.log("place out");
              //removeItem(ev,targEl);

            break;
          }
      }//end dummy

      this.placeItem = function(ev,targEl,mover)
      {
        let sibling = targEl.nextSibling;
        let bigDaddy = targEl.parentNode;
        if(bigDaddy.className.indexOf(`${orderCtrlr.mode}_dropzone`) == -1) return;

        if(targEl != bigDaddy.firstChild || targEl != bigDaddy.lastChild ){
          bigDaddy.insertBefore(mover,sibling);
        }else if(mover != targEl){
          bigDaddy.insertBefore(mover,targEl);
        }

      }//end placeItem

      this.asset_report = async function()
      {
        orderCtrlr.asset_order = [];

        await document.querySelectorAll(`.${orderCtrlr.mode}_mov`).forEach(function(entry){

          let list_id = entry.dataset.my_id;
          orderCtrlr.asset_order.push(list_id);
        });

        let stringy = orderCtrlr.asset_order.join();
        ShowData.asset_ids = stringy.split(",");
      }//asset_report


      this.list_report = function()
      {
        //reset the list_report
        orderCtrlr.list_order = [];

        let every_place = document.querySelectorAll(`.${orderCtrlr.mode}_mov`);
        let module_id = document.getElementById("jform_module_id").value;

        for(let r = 0;r < every_place.length;r++)
        {
          let list_obj = JSON.parse(every_place[r].dataset.module_data);
          list_obj.order = r;
          if(list_obj.id == module_id){
            document.getElementById("jform_ordering").value = r;
          }

          orderCtrlr.list_order.push(list_obj);
        }//end for

        //console.log("list order =",orderCtrlr.list_order);
        //orderCtrlr.module_list = orderCtrlr.list_order;
        //document.querySelector(".order_log").innerHTML = "<p>" + list_order + "</p>" +  document.querySelector(".order_log").innerHTML;
      }//end list_report

      this.stop_the_press = function(ev)
      {
          ev.target.className = move_obj.className.replace(" ghost","");
      }//end stop_the_press

      $scope.$on('get module order',function($arguments){
        if(orderCtrlr.first_run != true)
        {
          orderCtrlr.first_run = true;
          orderCtrlr.getModuleOrder();
        }
        //$scope.$apply();
      });

      this.getModuleOrder = function(strVal)
      {
        let position = document.getElementById("jform_position").value;
        let mode = strVal || "default";
        //console.log("position = ",position);
        ShowData.request({task:"getModuleOrder",data:position})
        .then(function(results){
            //console.log("req results = ",results);
            if(results != "none")
            {
              //check to see if this module has been saved yet
              let add_placeholder = "false";
              let cur_mod_id = document.getElementById("jform_module_id").value;
              let cur_mod_title = document.getElementById("jform_title").value;
              cur_mod_title = (cur_mod_title == "") ? "untitled" : cur_mod_title;

              if(cur_mod_id == "" || cur_mod_id == "0"){
                add_placeholder = "true";
              }
              orderCtrlr.module_list = results;

              if(add_placeholder == "true")
              {
                let cur_mod_order = document.getElementById("jform_ordering").value;
                let list_count = orderCtrlr.module_list.length;
                let temp_obj = {};
                if(mode != "reset" && parseInt(cur_mod_order) != "NAN" && parseInt(cur_mod_order) < list_count)
                {
                  temp_obj = {id:"0",title:cur_mod_title,order:cur_mod_order};
                  orderCtrlr.module_list.splice(cur_mod_order,0,temp_obj);
                }else{
                  temp_obj = {id:"0",title:cur_mod_title,order:list_count};
                  //automatically make the module (placeholder) last on the list
                  document.getElementById("jform_ordering").value = list_count;
                  orderCtrlr.module_list.push(temp_obj);
                }//end else
              }//end if

              $scope.$digest();

            }//end if
        }).catch(function(err){
          //console.log(err);
          let err_str = (typeof err == "string") ? true : false;
          if(err_str  && err.indexOf("<!DOCTYPE html>") != -1 || err_str && err.indexOf("You are not authorised to view this resource.") != -1)
          {
            alert("your session timer has expired. pls log in again.");
            window.location.replace(SITEURL);
          }//end if
          //<!DOCTYPE html>↵<html lang="en-gb" dir="ltr">↵<hea…	}↵			}↵		})(jQuery);↵	</script>↵</body>↵</html>↵", status: 403, config: {…}, statusText: "You are not authorised to view this resource.", headers: ƒ}
        });
      };//getModuleOrder

      this.reorderModules = function()
      {
        ShowData.request({task:"reorderModules",data:JSON.stringify(orderCtrlr.list_order)})
        .then(function(results){
            //console.log("req results = ",results);
            orderCtrlr.getModuleOrder();
        });
      }//reorderModules

      this.getTitle = function(pStr)
      {
        if(pStr == undefined || pStr == ""){return;}
        let param_obj = JSON.parse(pStr);
        return param_obj.title;

      }//getTitle

      this.save_assets = function()
      {
        ShowData.temp_asset_ids = ShowData.asset_ids.join();
        $scope.$emit('broadcast asset pair check');

      }//save_assets

      this.refresh = function()
      {
        //$timeout(function(){$scope.$digest();},false);
        let temp_array = (ShowData.temp_asset_ids != "") ? ShowData.temp_asset_ids.split(",") : [];
        ShowData.asset_ids = temp_array;
        //console.log("splitting hairs");
        $scope.$emit('broadcast asset pair check');
      }//refresh

      this.prep_elements();

    }],
    controllerAs:"order"/*,
     bindToController: true
     //this stops scope variables from working*/
  };
});
})();
