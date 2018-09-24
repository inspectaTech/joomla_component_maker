(function(){
  var app = angular.module("pictureShow");
  app.controller("SceneController",['$scope',"ShowData","$sce",function($scope,ShowData,$sce){

    var sceneCtrlr = this;
    this.service = ShowData;
    this.ShowData = ShowData.data;
    this.ShowText = ShowData.data.text;
    this.ShowHead = ShowData.data.text.head;
    this.ShowDate = ShowData.data.text.head.date;
    this.ShowBody = ShowData.data.text.body;
    this.ShowLink = ShowData.data.text.link;
    this.seeSection = 1;
    var object_elements = {};


    this.addScene = function(){

    };
    var scope = $scope;

    /*this.check_input = function(cNs,xdt){

      // was on li 198
      // ng-blur="scene.check_input('.build_title_input','title')"

      var t_el = document.querySelector(cNs);

      console.log("ng change running.",cNs);
      this.scene[xdt] = t_el.value;
      console.log(this.scene[xdt]);
      //scope.$apply();
    };*/

    this.htmlDecode = function(input)
    {
      var doc = new DOMParser().parseFromString(input, "text/html");
      return doc.documentElement.textContent;
    }//end htmlDecode

    $scope.$on('set_txt_heading',function(event,data){
      sceneCtrlr.ShowHead.text = (data != undefined) ? data : sceneCtrlr.ShowHead.text;//document.querySelector(".tHead_input").value
    });

    $scope.$on('set_txt_data',function(event,data){
      switch(data.type){
        case "alias":
          sceneCtrlr.ShowLink.alias = (data.data != undefined) ? data.data : sceneCtrlr.ShowLink.alias;//document.querySelector(".tHead_input").value
        break;

        case "color":
          sceneCtrlr.ShowHead.color = (data.data != undefined) ? data.data : sceneCtrlr.ShowHead.color;//document.querySelector(".tHead_input").value
        break;

        case "created":
        //no longer needed the creation data is now created in ShowData
          sceneCtrlr.ShowDate.created.timestamp = (data.data != undefined) ? data.data : sceneCtrlr.ShowDate.created.timestamp;//document.querySelector(".tHead_input").value
          var cDate = new Date(sceneCtrlr.ShowDate.created.timestamp);
          sceneCtrlr.ShowDate.created.date = cDate.toLocaleString();
        break;

        default:
          sceneCtrlr.ShowLink.url = (data.data != undefined) ? data.data : sceneCtrlr.ShowLink.url;//document.querySelector(".tHead_input").value
        break;
      };
    });

    $scope.$on('sendText',function(event,data){
      //get the text editor data

      var iframe = document.getElementById('jform_tedit_ifr');
      var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
      var editorText = innerDoc.body.innerHTML;
      var pureText = innerDoc.body.innerText;

      //add both to a variable
      sceneCtrlr.ShowBody.html = editorText;
      sceneCtrlr.ShowBody.raw = pureText;
      //sceneCtrlr.dBody = sceneCtrlr.htmlDecode(sceneCtrlr.tBody.html);
      //sceneCtrlr.service.form.body.update_trust();
      //sceneCtrlr.ShowBody.trust = $sce.trustAsHtml(sceneCtrlr.ShowBody.html);//doesn't need to do it twice

      sceneCtrlr.ShowHead.html = sceneCtrlr.service.temp_html;//temp_html was b4 confirmation
      sceneCtrlr.ShowHead.tHtml = sceneCtrlr.service.temp_tHtml;

      //clear the editorText
      $scope.$emit('hide_textEditor');
      //innerDoc.body.innerHTML = "";

      //update the view
      //scope.$apply();
    });

    $scope.$on('preview tags',function(event,data){
      sceneCtrlr.createTags();
    });

    this.createTags = function(obj_data)
    {
      var tagSYS_home = "build_section2";
      var tagsMaxLength = 200;
			object_elements.tagSYS  = new masterButtons({varName:'bldrTagSYS',home:tagSYS_home,type:'tags'});
			object_elements.tagSYS.setPrefix('bldrTagSYS');
			object_elements.tagSYS.setCustomClass(["iconbox"]);
			object_elements.tagSYS.setInputIcon("plus","right","ui-btn ui-btn-right ui-btn-inline ui-nodisc-icon ui-mini ui-btn-icon-right ui-btn-icon-notext");
			//object_elements.tagSYS.setPosition("up");
			object_elements.tagSYS.setLabels("<small>type a phrase then press enter:</small>");
			//object_elements.tagSYS.preserveEntry();
			//if(in_value == "activity"){
				object_elements.tagSYS.setTitles("Scene tags:");
				//document.getElementById("contact_form_rear_title").innerHTML = "<h6>list maker:</h6>";
			//}//end if

			object_elements.tagSYS.setInputAttributes({"maxlength":tagsMaxLength});
			object_elements.tagSYS.setInputAttributes({"placeholder":"enter text..."});//another way to set placeholder - single entry for now

			if(ShowData != undefined && ShowData.data.tags != undefined && ShowData.data.tags != "")
			{
				object_elements.tagSYS.setTags(ShowData.data.tags);//sets initial text
			}//end if
			//setFirst
			//_replace
			//setTags
			//object_elements.tagSYS.setCallout(checkChange,{"mode":"validate","more_info":more_info},trans_obj);
			//object_elements.tagSYS.clearHome("false");
			object_elements.tagSYS.display();

			var tags_id_ary = object_elements.tagSYS.get_event_ids();
			var targetElement = document.getElementById(tags_id_ary[0]);

      //object_elements.tagSYS.getCurrentValue();
    }//createTags

    this.createTags();

    var _tTime = "";
    $scope.$on('toggleTime',function(event,timeToggle)
    {
      //if there is a value do something
      if(sceneCtrlr.ShowDate.modified.date != undefined)
      {
        ShowData.form.date.create_date("modified");
      }//end if

      //broadcast a msg to set a new header title
      var create_str = "created on: " + sceneCtrlr.ShowDate.created.date;
      var mod_str = "modified on: " + sceneCtrlr.ShowDate.modified.date;


      switch(timeToggle)
      {
        case 1:
          var type = "created";
          _tTime = "<p class='head_date'>" + create_str + "</p>";//"created on: " + sceneCtrlr.timeCreated;
        break;

        case 2:
          var type = "modified";
          _tTime = "<p class='head_date'>" + mod_str + "</p>";
        break;

        case 3:
          _tTime = "<p class='head_date'>" + create_str + "</p><p class='head_date'>" + mod_str + "</p>";

        break;

        default:
          _tTime = "";
        break;

      }

      sceneCtrlr.ShowHead.date.details = _tTime;
      sceneCtrlr.service.sample_custom_header();

    });//end toggleTime




    $scope.$on("update editor",function(event,timeToggle){
      //console.log("editor being updated");
      var iframe = document.getElementById('jform_tedit_ifr');
      var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
      innerDoc.body.innerHTML = sceneCtrlr.ShowBody.html;
    });

    this.processEntry = function(str)
    {
      //console.log("showForm valid = ",$scope.showForm.$valid);
      switch(str)
      {
        case "cancel":
          sceneCtrlr.reset_all();
        break;

        case "submit":

        //console.log("showForm valid = ",$scope.showForm.$valid);
        if($scope.showForm.$valid != true) return;

        //validate the tagSYS
        let check_it = object_elements.tagSYS.runDataCheck();
        if(check_it == "invalid")
        {
          console.error("tags data is invalid");
          return;
        }//end if
        //get the tags params
        let tag_data = object_elements.tagSYS.getCurrentValue();
        //console.log("tag_data = ",tag_data);
        //return;

        //add the tag data to the service
        sceneCtrlr.service.data.tags = tag_data;

          //console.log("form is valid!");
          sceneCtrlr.service.uploadData();
          //reset the scene
          sceneCtrlr.reset_all();


          sceneCtrlr.service.getShowData().then(function(data){
            //console.log("running the show ", data);

            //$scope.$emit('display_assets',data);

          }).catch(function(err){

            console.log("catch error found ",err);
          });

        break;

      }//end switch

    }//end processEntry

    $scope.$on("reset scene",function(){
      sceneCtrlr.reset_all();
    });

    this.reset_all = function()
    {
      ShowData.reset();

      //clear the canvas
      ShowData.clear_element("prev_img_canvas_area",1);
      ShowData.clear_element("tHead_time_display","empty");

      //clear the text editor
      sceneCtrlr.updateEditor();
      sceneCtrlr.createTags();
    }//end reset_all

    this.updateEditor = function(mod,dt)
    {
      let data = dt || "";
      var iframe = document.getElementById('jform_tedit_ifr');
      var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
      var editorText = innerDoc.body.innerHTML;
      //var pureText = innerDoc.body.innerText;

      editorText.innerHTML = data;

    }//updateEditor


    this.refresh = function()
    {
      $scope.$digest();

    }//refresh

  }]);//end SceneController

})();//end closure
