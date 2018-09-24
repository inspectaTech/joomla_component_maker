(function(){
  var app = angular.module("pictureShow");
  app.controller('FormController',["ShowData","$scope",function(ShowData,$scope){

    var formCtrlr = this;
    var object_elements = {};

    this.newDisplay = {};//give it a unique id
    this.edit_index = "none";

    this.ShowData = ShowData.data;
    this.ShowCanvas = ShowData.canvas;
    this.ShowText = ShowData.data.text;
    this.ShowHead = ShowData.data.text.head;
    this.ShowDate = ShowData.data.text.head.date;
    this.ShowBody = ShowData.data.text.body;
    this.ShowLink = ShowData.data.text.link;
    this.ShowTags = ShowData.data.tags;
    this.maintain_ratio = 0;
    this.portrait = false;
    this.can_style = "landscape";
    this.addClass = "";
    this.config_canvas = false;
    this.sample_view = ShowData.sample_view;


    this.display = [];
    this.updateForm = function(){
      $scope.$apply();
    }

    this.prep_save = function(){
      document.querySelector(".btn.btn-success.button-save-selected").addEventListener("mouseup",function(){
      formCtrlr.url = document.querySelector(".imageurl").value;
      document.querySelector(".link_title_input").value = document.querySelector(".imageurl").value;});
    }

    this.canvas_config = function(str)
    {
      switch(str)
      {
        case "open":
          formCtrlr.config_canvas = true;
            ShowData.disable_btn("add_scene",true);
            ShowData.disable_btn("cancel_scene",true);
        break;
        case "close":
          formCtrlr.config_canvas = false;
          ShowData.disable_btn("add_scene",false);
          ShowData.disable_btn("cancel_scene",false);
        break;
      }//end switch
    }//end canvas_config

    //this.city = document.querySelector(".cityTest").selectedOptions[document.querySelector(".cityTest").selectedIndex].innerHTML;
    this.testTitle = "whatever" + this.city;
      this.update_TT = function(){
      //let testVar = (document.querySelector(".cityTest")) ? document.querySelector(".cityTest").value : this.city;
      //this.city = testVar;
    }
    this.add_to_display = function(){

    };//end add to display
    this.target_update = function(){
      //locates the edit_index
    };//end target_update
    this.update_display = function(){
      //check to make sure its not a duplicate record
      //if it is update the record with the new data
    };//end add to display

    this.custom_canvas_width = function(data)
    {
      if(arguments.length){
        formCtrlr.ShowData.canvas.width = data;
        formCtrlr.img_preview();
      };//end if
      return formCtrlr.ShowData.canvas.width;
    }//customize_canvas

    this.custom_canvas_height = function(data)
    {
      if(arguments.length){
        formCtrlr.ShowData.canvas.height = data;
        formCtrlr.img_preview();
      };//end if
      return formCtrlr.ShowData.canvas.height;
    }//customize_canvas

    $scope.$watch('url', function(newValue, oldValue) {
    //console.log(newValue);
    //console.log(oldValue);
    });

    this.onTextClick = function ($event) {
      $event.target.select();
    };//end onTextClick

    this.activate_upload = function ($event) {
      //console.log('activate upload running');
      //console.log('target is checked = ',$event.target.checked);
      if(document.querySelector(".imageurl").value == ""){$event.target.checked = false; return;}

      if($event.target.checked)
      {
        //ng-model previously set
        var newVal = ROOTURL + "/" + document.querySelector(".imageurl").value;
        document.querySelector(".link_title_input").value = newVal;
        var scope = angular.element(document.querySelector(".link_title_input"));
        scope.triggerHandler('input');//trigger oninput event

        let url_value = document.querySelector(".link_title_input").value

        formCtrlr.set_img_preview(url_value);
      }

    };//end activate_upload

    this.uncheck = function()
    {
      document.querySelector(".check_upload").checked = false;
    }

    this.view_img_editor = function(scene_url)
    {
      //if input is empty do nothing
      if(document.querySelector(".link_title_input").value == "") return;

      //create a lightbox
      var iBx  = new masterButtons({varName:'iBx',home:"ps_hidden_cont2",type:'lightbox'});//display_home
      iBx.setPrefix('iBx');//single-page
      iBx.setCustomClass(["arc_list_preview"]);//single-page
      iBx.setCloseBtn("false");//single-page - false
      iBx.setSinglePage();//single-page
      //iBx.setLabels(["recent","favorites","search"]);
      //iBx.setIcons(["star","bookmark","search"]);
      //iBx.view_ctrl_row();//changes the default ctrls toggle view into a row view
      iBx.setGoBtn("true");//single-page - false
      iBx.setGoCallout(formCtrlr.customize_image);
      //iBx.setCancelBtn("false");
      iBx.clearHome("false");//single-page - false
      iBx.display();//single-page

      let iBx_id_ary = iBx.get_event_ids();
      let rec_view = iBx_id_ary[0];
      let fav_view = iBx_id_ary[1];//this changes the page that fills with the list_bookmarks data

      this.set_img_editor(scene_url);



    //var media_el = document.getElementsByClassName("test_move")[0];
    //var my_media_el = media_el.cloneNode("true");
    //my_media_el.id = "media_upload";
    //my_media_el.className = my_media_el.className += " media_upload";
    //my_media_el.style.display = "block";
    //let lBx_page = document.getElementById(rec_view);
    //lBx_page.appendChild(media_el);

    }//end view_img_editor

    $scope.$on('preview form image',function(event,data){
      formCtrlr.img_preview();
    });
    this.img_preview = function()
    {
      formCtrlr.addClass = (parseInt(formCtrlr.ShowData.canvas.width) <= parseInt(formCtrlr.ShowData.canvas.height)) ? " portrait " : "";

      object_elements.prev_img = new masterImage({home:"canvas_display",varName:"prev_img",url:formCtrlr.ShowData.url,type:"banner",
      width:formCtrlr.ShowData.canvas.width,height:formCtrlr.ShowData.canvas.height});//looks like this controls the resolution
  		object_elements.prev_img.setCustomClass("form_img_preview prev_img " + formCtrlr.addClass);

      let me_seeks = Object.keys(formCtrlr.ShowData.img_obj).length;
      let me_seeks2 = formCtrlr.ShowData.img_obj.constructor;
      if(Object.keys(formCtrlr.ShowData.img_obj).length !== 0 && formCtrlr.ShowData.img_obj.constructor === Object)
      {
        object_elements.prev_img.setView(formCtrlr.ShowData.img_obj.canvas_data);
      }
      object_elements.prev_img.setRawDisplay();
      //object_elements.prev_img.setFitDisplay();
      object_elements.prev_img.display();


      var prev_img_array = object_elements.prev_img.get_event_ids();
      var prev_img_id = prev_img_array[0];
    }//end img_preview

    this.set_img_preview = function(scene_url)
    {
      if(arguments.length){
      formCtrlr.ShowData.url = scene_url;
      formCtrlr.img_preview();

    };//end  if arguments.length

      return formCtrlr.ShowData.url;

    }//end set_img_preview

    this.orient_canvas = async function(pref)
    {
      let myEl = "";
      switch(pref)
      {
        case "portrait":
        formCtrlr.ShowData.canvas.width = formCtrlr.ShowCanvas.portrait.w;
        formCtrlr.ShowData.canvas.height = formCtrlr.ShowCanvas.portrait.h;
        formCtrlr.portrait = true;
        formCtrlr.addClass = " portrait ";
        formCtrlr.can_style = "portrait";
        await formCtrlr.img_preview();
        //myEl = angular.element(document.querySelector(".prev_img_ImgCanvas"));
        //myEl[0].addClass("portrait");
        break;

        case "profile":
        formCtrlr.ShowData.canvas.width = formCtrlr.ShowCanvas.profile.w;
        formCtrlr.ShowData.canvas.height = formCtrlr.ShowCanvas.profile.h;
        formCtrlr.portrait = false;
        formCtrlr.addClass = "";
        formCtrlr.can_style = "profile";
        await formCtrlr.img_preview();
        //myEl = angular.element(document.querySelector(".prev_img_ImgCanvas"));
        //myEl.removeClass("portrait");
        break;

        default:
        //landscape is default
          formCtrlr.ShowData.canvas.width = formCtrlr.ShowCanvas.landscape.w;
          formCtrlr.ShowData.canvas.height = formCtrlr.ShowCanvas.landscape.h;
          formCtrlr.portrait = false;
          formCtrlr.addClass = "";
          formCtrlr.can_style = "landscape";
          await formCtrlr.img_preview();
          //myEl = angular.element(document.querySelector(".prev_img_ImgCanvas"));
          //myEl.removeClass("portrait");
        break;

      }//end switch



    }//end orient_canvas

    this.testModel = function()
    {
      //console.log("testModel running");
    }//end testModel

    //initiates preview
    if(formCtrlr.ShowData.url != ""){
      formCtrlr.set_img_preview(formCtrlr.ShowData.url);
    }//end if

    this.set_img_editor = function(scene_url)
    {
      //console.log("add edit canvas callback running");
    //create edit canvas
    object_elements.edit_img = new masterImage({home:'iBx_glass_content',varName:"edit_img",url:scene_url,
    type:"banner",mode:"edit",width:formCtrlr.ShowData.canvas.width,height:formCtrlr.ShowData.canvas.height});
    object_elements.edit_img.setCustomClass("edit_img" + formCtrlr.addClass);
    //object_elements.edit_img.advCtrls();//turn on/off controls
    object_elements.edit_img.matchView();
    //i may always have image data to pass it.

    if(formCtrlr.ShowData.img_obj != undefined && formCtrlr.ShowData.img_obj != {} && formCtrlr.ShowData.img_obj.canvas_data != undefined)
    {
      object_elements.edit_img.setView(formCtrlr.ShowData.img_obj.canvas_data);
    }

    object_elements.edit_img.display();

    var edit_img_id_array = object_elements.edit_img.get_event_ids();
    object_elements.edit_imgElement = document.getElementById(edit_img_id_array[0]);
    var edit_img_id = edit_img_id_array[0];

    //where will i store its data for use?
    }//end set_img_editor

    this.customize_image = function()
    {
      //console.log("customize image running!");
      if(object_elements.prev_img != undefined)
      formCtrlr.ShowData.img_obj = object_elements.edit_img.getImgData();
      object_elements.prev_img.setView(formCtrlr.ShowData.img_obj.canvas_data);
      object_elements.prev_img.clearHome("true");
      object_elements.prev_img.display();

    }//end customize_image


    this.refresh = function()
    {
      $scope.$digest();

    }//refresh

  }]);//end FormController

  app.directive("textPreview",function(){
    /*
    //deprecated working version
    "<div class='tp_head'><h5>{{editorText.head.tHtml}}</h5></div>"
    */
    return{
      restrict:"C",
      template:"<div class='tp_head'><div ng-bind-html='txtView.service.THTML(editorText.head.html)'></div></div>"
                  + "<div class='tp_body' ng-bind-html='txtView.service.THTML(editorText.body.html)'></div>",
        scope: {
          editorText: '=eTxt'
        },
        controller:["ShowData","$scope",function(ShowData,$scope){
          this.service = ShowData;
          $scope.$watch(function(){return ShowData.data}, function (newValue, oldValue, scope) {

            //display.AssetData = newValue;

          }, true);
        }],
        controllerAs:"txtView"
    };
  });

})();//end closure

/*
(function(){

})();
*/
