(function(){
  var app = angular.module("pictureShow");
  app.service("ShowData",['$http',"$sce","$rootElement",function($http,$sce,$rootElement){

    var serve = this;
    this.data = {};
    var daT = new Date();
    this.loader = 1;
    this.temp_html = "";
    this.temp_tHtml = "";
    this.assetData = [];
    this.asset_reference = {};
    this.asset_ids = [];
    this.asset_info = [];
    this.mod_overlay = '0';
    this.current_tool = {};
    this.initiated = false;
    this.pageData = [];
    this.home_url = $rootElement[0].dataset.home;
    this.tool_templates = $rootElement[0].dataset.templates;
    this.colorData = [];
    this.colorJSON =[];

    //its kind of backwards but im using this to remember the static state of the asset_ids
    this.temp_asset_ids = [];
    this.module_id = "";
    this.canvas = {
      width:"400",
      height:"180",
      landscape:{w:"400","h":"180"},
      portrait:{w:"180","h":"400"},
      profile:{w:"300","h":"300"}
    };
    this.data_id = "none";
    this.mode = "init";
    this.sample_view = {};
    this.delete_mode;
    this.form = {font:{},size:{},color:{},date:{},body:{}};
    this.form.font.getValue = function(fVal)
      {
        if(arguments.length)
        {
          serve.data.text.head.font = fVal;
          serve.sample_custom_header();
        }//end if

        if(serve.data.text.head.font != undefined && serve.data.text.head.font.value != undefined){
          serve.data.text.head.font = serve.data.text.head.font.value;
          delete serve.data.text.head.font.value;
        }

        return serve.data.text.head.font;
      };
    this.form.size.getValue = function(sVal)
      {
        if(arguments.length)
        {
          serve.data.text.head.size = sVal;
          serve.sample_custom_header();
        }//end if

        if(serve.data.text.head.size != undefined && serve.data.text.head.size.value != undefined){
          serve.data.text.head.size = serve.data.text.head.size.value;
          delete serve.data.text.head.size.value;
        }

        return serve.data.text.head.size;
      };
      this.form.color.setColor = function(nC){
        //if there is a value do something
        var type = "color";
        if(arguments.length){
          //broadcast a msg to set a new header title
          serve.data.text.head.color = nC;
          //showCtrlr.message('set_txt_data',{type,data:nC});//deprecated - using service
          serve.sample_custom_header();
        };
        return serve.data.text.head.color;
      };
      this.form.date.create_date = function(mdStr)
      {
          let daT = new Date();
          serve.data.text.head.date[mdStr].timestamp = daT.getTime();
          serve.data.text.head.date[mdStr].date =  daT.toLocaleString();
      };

      this.THTML = function(html){
        return $sce.trustAsHtml(html);
      };


      this.default_data = {
        title:"",
        page_ids:[],
        img:"",
        img_obj:{},
        url:"",
        tags:"",
        canvas:{
          width:serve.canvas.landscape.w,
          height:serve.canvas.landscape.h
        },
        text:{
            head:{
              text:"",
              html:"",
              tHtml:"",
              font:"",
              size:"",
              color:"",
              date:
              {
                toggle_value:0,
                details:"",
                created:
                {
                  timestamp:0,
                  date:""
                },
                modified:
                {
                  timestamp:0
                }
              },
            },
            body:
            {
              html:"",
              raw:"",
              trust:""
            },
          link:{
            alias:"Read more",
            url:""
          }
        }
      }//end default data



    this.reset = function()
    {
      //console.log( 'Resetting')
      serve.data = angular.merge( serve.data, serve.default_data );
      //console.log("serve data =",serve.data);
      serve.data.text = angular.merge( serve.data.text, serve.default_data.text );
      //console.log("serve.data.text =",serve.data.text);
      serve.data.text.head = angular.merge( serve.data.text.head, serve.default_data.text.head );
      //console.log("serve.data.text.head =",serve.data.text.head);
      //console.log("serve.default_data.text.head =",serve.default_data.text.head);

      /*notes:
      https://docs.angularjs.org/api/ng/function/angular.merge
      merge is deprecated.  merge will copy everything over unless the destination has a
      property the src doesn't have. in that case the dst data will remain. (its an issue when
      you're trying to clear or reset)
      */

      //reset variables
      serve.data_id = "none";
      serve.mode = "init";
    }//end reset
    //console.log("showData running!");
  /*this.data.title = "da money";
    this.data.img = "showdata image";
    this.data.img_obj = {};

    this.data.url = "https://thumb7.shutterstock.com/display_pic_with_logo/101595/101595,1323683526,17/stock-photo-happy-smiling-young-man-presenting-and-showing-your-text-or-product-isolated-on-white-background-90618160.jpg";
    //this.mTimestamp = "";
    //this.timeModified = "";

    //this.cTimestamp = daT.getTime();
    //this.timeCreated = daT.toLocaleString();
    //this.tColor = "";

    //this.tLink = "";
    this.data.text = {
        head:{
          text:"",
          html:"",
          tHtml:"",
          font:{value:"",
            getValue:function(fVal)
            {
              if(arguments.length)
              {
                serve.data.text.head.font = fVal;
                serve.sample_custom_header();
              }//end if

              return serve.data.text.head.font;
            }
          },
          size:{value:"",
            getValue:function(sVal)
            {
              if(arguments.length)
              {
                serve.data.text.head.size = sVal;
                serve.sample_custom_header();
              }//end if

              return serve.data.text.head.size;
            }
          },
          color:"#7039e1",
          setColor:function(nC){
            //if there is a value do something
            var type = "color";
            if(arguments.length){
              //broadcast a msg to set a new header title
              serve.data.text.head.color = nC;
              //showCtrlr.message('set_txt_data',{type,data:nC});//deprecated - using service
              serve.sample_custom_header();
            };
            return serve.data.text.head.color;
          },
          date:
          {
            toggle_value:0,
            details:"",
            created:
            {
              timestamp:0,
              date:"",
              create_date:function()
              {
                var daT = new Date();
                serve.data.text.head.date.created.timestamp = daT.getTime();
                serve.data.text.head.date.created.date =  daT.toLocaleString();
              }
            },
            modified:
            {
              timestamp:0,
              modify_date:function()
              {
                var daT = new Date();
                serve.data.text.head.date.modified.timestamp = daT.getTime();
                serve.data.text.head.date.modified.date =  daT.toLocaleString();
              }
            }
          },
        },
        body:
        {
          html:"<p><span style='color: #000080; font-size: 18pt; font-family: Lobster, serif;'>Partner</span></p>"
          + "<p><strong><span style='font-size: 18pt; color: #00ccff;'>OF THE MONTH</span></strong></p>"
          + "<p>Delk, Inc. - the leading Enterprise Solutions Provider for project based businesses</p>"
          + "<p>Deltek</p>"
          + "<p><span style='color: #0000ff; font-size: 16pt;'>Think Outside The Box</span></p>"
          + "<hr style='border-color: #00ccff;' />"
          + "<p><span style='color: #0000ff; font-size: 14pt;'>Think Jakeel</span></p>",
          raw:"Partner\n\nOF THE MONTH\n\nDelk, Inc. - the leading Enterprise Solutions Provider for project based businesses\n\nDeltek\n\nThink Outside The Box\n\nThink Jakeel",
          trust:"",
          update_trust:function(){
            serve.data.text.body.trust =  $sce.trustAsHtml(serve.data.text.body.html);
          }
        },
      link:{
        alias:"Read more",
        url:""
      }
    };*/
    //this.dBody = $sce.trustAsHtml(this.tBody.html);
    serve.reset();
    serve.form.date.create_date("created");
    //serve.form.body.update_trust();


    //forms select values
    this.custom_head = {font:{},size:{}};
    this.custom_head.font.options = myFonts;
    this.custom_head.font.value = serve.data.text.head.font;
    this.custom_head.font.label = "font";
    this.custom_head.size.options = mySize;
    this.custom_head.size.value = serve.data.text.head.size;
    this.custom_head.size.label = "size";

    this.sample_custom_header = function(){

      if(serve.data.text.head.text == "")return;
      let sample_text = serve.data.text.head.text;
      let timeStr = serve.data.text.head.date.details;
      let fFam = (serve.data.text.head.font != undefined && serve.data.text.head.font != "") ?
      "font-family:" + serve.data.text.head.font + ";" : "font-family:sans-serif;";
      let fSiz = (serve.data.text.head.size != undefined && serve.data.text.head.size != "") ?
      "font-size:" + serve.data.text.head.size + ";" : "font-size:16pt;";
      let col = (serve.data.text.head.color != undefined && serve.data.text.head.color != "") ?
      "color:" + serve.data.text.head.color + ";" : "";

      let sample_html = "<p style='line-height:80%;" + fFam + fSiz + col + "'>"
      + sample_text + "</p>" + timeStr;

      //serve.data.text.head.html = sample_html;
      //serve.data.text.head.tHtml = $sce.trustAsHtml(sample_html);
      serve.temp_html = sample_html;
      serve.temp_tHtml = sample_html;
      document.querySelector(".tHead_time_display").innerHTML = serve.THTML(sample_html);
    };


    this.htmlDecode = function(input)
    {
      var doc = new DOMParser().parseFromString(input, "text/html");
      return doc.documentElement.textContent;
    }//end htmlDecode

    this.getShowData = async function(){

      let form_token = FORM_TOKEN;
      let urlMod = "ps_getData";
      let site_url = "index.php?option=com_psmod&task=" + urlMod + "&format=raw&" + form_token + "=1";

      await $http.post(site_url,{data:'{"some_json":"string"}'}).then((result)=>{
          //console.log("result = ",result.data);
          if(result.data == undefined || result.data == "Invalid Token"
          || result.data == "" || result.data == []){return;};

          serve.assetData = result.data;
          serve.assetData.forEach(function(entry)
          {
            //serve.asset_reference[`asset${entry.id}`] = entry;
            serve.asset_reference[entry.id] = entry;

          });

          //console.log("serve assetData = ",serve.assetData);
          //console.log(`asset_reference = `,serve.asset_reference);
      }).then((result)=>{
        if(serve.asset_ids.length != 0)
        {
          serve.asset_info = serve.update_asset_info(serve.asset_ids);
        }
      });

        return "finished";

    };//end getShowData

    this.update_asset_info = function(dIDs)
    {
      let comp_ids = [];
      dIDs.forEach(function(entry){
        if(serve.asset_reference[entry] != undefined){
          comp_ids.push(serve.asset_reference[entry]);
        }//end if
      });
      return comp_ids;
    }//end update_asset_info


    this.request = async function(gDObj,mode){
      /*
        sample:
        {data:"",task:""}//takes strings of data and task
        let trans = {}
        trans.data = JSON.stringify(ShowData.edit);
        trans.task = "pageMaker";
        let check_results = "";

        await ShowData.request(trans)
        .then(function(result){
          check_results = result;
        }).catch(function(err){
          console.log("a request error has occured: ",err);
        });
      */

      let form_token = FORM_TOKEN;
      let urlMod = gDObj.task;
      let send_data = gDObj.data || "";
      let json_url = mode || "none";
      let my_result = "";
      let site_url = (json_url == "none") ? ["index.php?option=com_psmod&task="
                                            ,urlMod,
                                            "&format=raw&",
                                            form_token,"=1"].join("")
                                            : json_url;

      await $http.post(site_url,{data:send_data}).then((result)=>{
          //console.log("result = ",result.data);
          if(result.data == "Invalid Token"){
            //reload page
          }else if(result.data == undefined
          || result.data == "" || result.data == [] || typeof result.data == "string" && result.data.indexOf("<!doctype html>") != -1){
            my_result = "error";
          }else{
            my_result = result.data;
          }
      });

        return my_result;

    };//end request

    this.uploadData = async function()
    {

      let form_token = FORM_TOKEN;
      let urlMod = "ps_upload";
      let site_url = "index.php?option=com_psmod&task=" + urlMod + "&format=raw&" + form_token + "=1";
      let up_data = {};
      up_data.params = JSON.stringify(serve.data);
      up_data.id = serve.data_id;
      up_data = JSON.stringify(up_data);

      await $http.post(site_url,{data:up_data}).then((result)=>{
        //console.log("result = ",result.data);
        serve.getShowData();
      });

        return "finished";

    };//end uploadData

    this.deleteShowData = async function(dID)
    {
      let form_token = FORM_TOKEN;
      let urlMod = "ps_delete";
      let site_url = "index.php?option=com_psmod&task=" + urlMod + "&format=raw&" + form_token + "=1";
      let up_data = {};

      up_data.id = dID;
      up_data = JSON.stringify(up_data);

      await $http.post(site_url,{data:up_data}).then((result)=>{
        //console.log("result = ",result.data);
        serve.getShowData();
      });
    }//deleteShowData

    this.disable_btn = function(str,bol)
    {
      let btn = (document.getElementById(str)) ? document.getElementById(str) : document.querySelector("." + str);
      switch(bol)
      {
        case true:
            angular.element(btn).addClass("w3-disabled");
        break;
        case false:
          angular.element(btn).removeClass("w3-disabled");
        break;
      }
    }//disable_btn

    this.getSelectedText = function(fNm,mod,inpt)
    {
        //takes id's no need for the "jform_" prefix just add the field's name
        //example "access" for "jform_access"
        //ex: getSelectedText("access","value");

        //other examples
        //var accessIndex = getSelectedText("access","match",resObj.access);
        //var statusIndex = getSelectedText("status","match",resObj.published);

        var objId = "jform_" + fNm;//fieldName
        var input_cont = document.getElementById(objId);
        var modifier = mod || "text";//defaults to text
        var returnData = "";
        var dEntry = (inpt != undefined || inpt === 0 || inpt != "") ? inpt : "";

       switch(modifier){
        case "index":
            var selected_index = input_cont.selectedIndex;
            returnData = selected_index;
        break;
        case "value":
            var indexObj = input_cont[input_cont.selectedIndex];
            var  selected_text = indexObj.value;//
            returnData = selected_text;
        break;
        case "match":

            if(isNaN(dEntry) == true)
            {
                //alert("string is not a number");
                for(var i=0; i < input_cont.childElementCount; i++)
                {
                    var indexObj = input_cont[i];
                    if(dEntry == indexObj.innerHTML)
                    {
                        returnData = i;//returns the index number of a given value
                    }
                }//end for

            }
            else
            {
               for(var i=0; i < input_cont.childElementCount; i++)
                {
                    var indexObj = input_cont[i];
                    if(dEntry == indexObj.value)
                    {
                        returnData = i;//returns the index number of a given value
                    }
                }//end for
            }

        break;

        case "index_value":
        for(var i=0; i < input_cont.childElementCount; i++)
         {
             var indexObj = input_cont[i];
             //console.log("dentry = ",dEntry);
             if(parseInt(dEntry) == i)
             {
                 returnData = indexObj.value;//returns the index number of a given value
             }
         }//end for
        break;

        case "content_value":
        for(var i=0; i < input_cont.childElementCount; i++)
         {
             var indexObj = input_cont[i];
             if(dEntry == indexObj.innerHTML)
             {
                 returnData = indexObj.value;//returns the index number of a given value
             }
         }//end for
        break;
        case "value_content":
        for(var i=0; i < input_cont.childElementCount; i++)
         {
             var indexObj = input_cont[i];
             if(dEntry == indexObj.value)
             {
                 returnData = indexObj.innerHTML;//returns the index number of a given value
             }
         }//end for
        break;
        case "value_index":
        for(var i=0; i < input_cont.childElementCount; i++)
         {
             var indexObj = input_cont[i];
             if(dEntry == indexObj.value)
             {
                 returnData = i;//returns the index number of a given value
             }
         }//end for
        break;
        case "content_index":

        for(var i=0; i < input_cont.childElementCount; i++)
         {
             var indexObj = input_cont[i];
             if(dEntry == indexObj.innerHTML)
             {
                 returnData = i;//returns the index number of a given value
             }
         }//end for

        break;

        default:
            var indexObj = input_cont[input_cont.selectedIndex]
            var  selected_text = indexObj.innerHTML;//
            returnData = selected_text;
        break;
       }//end switch


        return returnData;
    }//end getSelectedText

    this.getCheckedValue = function(eL,t,f)
    {
      let tar = (document.getElementById(eL)) ? document.getElementById(eL) : document.querySelector("." + eL);
      let tarVal = (tar.checked) ? t : f;
      return tarVal;

    }//getCheckedValue

    this.uniqueCheck = async function(uObj)
    {
        //alert("uniqueCheck running");
        let trans = {}
        trans.data = JSON.stringify(uObj);
        trans.task = "uCheck";
        let check_results = "";

        await serve.request(trans).then(function(result){
          //console.log("returned data = ",result);
          check_results = result;
        }).catch(function(err){
          check_results = "error";
          console.log("a request error has occured: ",err);
        });
        return check_results;

    }//uniqueCheck

    this.removeSomething = function(val,char,rep)
    {
      /*
      //sample
      ShowData.removeSomething(ShowData.edit.title,' ');//unnessesary spaces
      //control the spaces
      pal = ShowData.removeSomething(pal,' ','-');
      //replace slashes with dashes
      pal = ShowData.removeSomething(pal,'/','-');
      //make sure there are no double dashes
      pal = ShowData.removeSomething(pal,'-');
      */
      //removes multiple spaces leading and trailing
      let curVal = val;
      //let pattern1 =
      let multi_converter = new RegExp(char + '+','g');//  '/'+ char + '+/g or / +/g
      curVal = curVal.replace(multi_converter,char); //convert all multispaces to space
      let start_converter = new RegExp('^' + char,'g');
      curVal = curVal.replace (start_converter,"");  //remove space from start /^ /g
      let end_converter = new RegExp(char + '$','g');
      curVal = curVal.replace (end_converter,"");  //and end / $/g
      if(rep != undefined && rep != ""){
        let replacer = new RegExp(char,'g');
        curVal = curVal.replace(replacer,rep);
      }
      return curVal;
    };//end removeSomething

    this.month = ["january","february",
    "march","april",
    "may","june",
    "july","august",
    "september","october"
    ,"november","december"];

    this.day = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday"
    ];

    this.clear_element = function(elem,mod)
    {
      let mode = mod || "";
      let elem_str = "." + elem;
      let element = (document.getElementById(elem)) ? document.getElementById(elem) : document.querySelector(elem_str);

      if(element == undefined){return;}

      let el_par = element.parentNode;
      if(mod == "empty"){
        element.innerHTML = "";
      }else if(mod != ""){
        el_par.removeChild(element);
      }else {
        el_par.innerHTML = "";
      }
    }//end clear_element


    this.default_edit = {
      title:"",
      alias:"",
      id:"0",
      published:true,
      details:{},
      access:1,
      note:"",
      template_style_id:0,
      menutype:"psmodmenu"
    };/* publish_up:'0000-00-00 00:00:00', publish_down:'0000-00-00 00:00:00',*/
    this.default_template = "MobileMenu - Default";
    this.default_menutype = "psmod Menu";

    this.edit = {};
    this.ext_id = "";
    this.home_page_id = "0";
    this.tool = {};
    this.toolData = [];
    this.refresh_tool = "false";
    this.default_tool = {};

    this.valueChecker = function(sObj)
		{
			/*
			if found returns an array of string or index values

			example use:
			var isString =  valueChecker({"array":icon_keys,"string":target_string,"mod":"string","type":"ans"});
			if(isString[0] == -1)

			ans = array in string - (was checkStringForArray2) checkStringForArray2
			sna = string in array - (was check array for string);
			*/

			var testString = sObj.string;
			var testArray = sObj.array;
			var modifier = sObj.mod || "index";//other value is name
			var type = sObj.type || "ans";
			var strIndx = [];
			var action = (sObj.action != undefined && sObj.action == "match") ? "match" : "compare";


			strIndx[0] = (modifier == "index") ? -1 : "none";

			for(var i = 0; i < testArray.length; i++)
			{
				var targetString = (type == "ans") ? testString : testArray[i];//
				var testValue = (type == "ans") ? testArray[i] : testString;
				var is_present = "false";

				//does the string - (usually long) have any of the array values
				//"https://youtube.com/#*(&$)*&*(*)whatever".indexOf("youtube")

				if(action == "compare")
				{
					if(targetString.indexOf(testValue) != -1)
					{
						var is_present = "true";
					}
				}else
				{
					if(targetString == testValue)
					{
						var is_present = "true";
					}
				}//end else

				if(is_present == "true")
				{
					if(modifier == "index")
					{
						if(strIndx[0] == -1)
						{

							strIndx = [];
							strIndx = strIndx.concat(i);

						}else
						{
							strIndx = strIndx.concat(i);
						}//end else


					}else{

						if(strIndx[0] == "none")
						{
							strIndx = [];
							strIndx = strIndx.concat(testArray[i]);

						}else
						{
							strIndx = strIndx.concat(testArray[i]);
						}//end else

					}//end else modifier

				}//end if targetString

			}//end for

			return strIndx;

		}//valueChecker

    this.getToolData_og = async function()
    {
      //gets the json list of all tool parameters
      await serve.request({task:"getTools",data:JSON.stringify({data:"none"})})
            .then(function(results){
                //console.log("req results = ",results);
                //return a json object array
                serve.toolData = results;
            });
    }//end getToolData

    this.getToolData = async function()
    {
      //make an array of tool tool_template folders
      let tool_temp_array = serve.tool_templates.split(",");
      //gets the json list of all tool parameters
      tool_temp_array.forEach(async function(entry){
            let tool_name = serve.prep_tool_name(entry);
            let tool_url = entry + "/" + tool_name + ".json";
            await serve.request({task:"getTools",data:JSON.stringify({data:"none"})},
            tool_url)
            .then(function(results){
                //console.log("req results = ",results);
                //return a json object array
                //let final_results = (Array.isArray(results)) ? results[0] : results;
                let is_here = false;
                is_here = serve.toolData.some(function(entry)
                {
                  let tool_file = entry.file_name;
                  let res_file = results.file_name;

                  return (tool_file == res_file) ? true : false;
                });
                if(is_here == false)
                {
                  serve.toolData.push(results);
                }//end is_here

            });
            serve.toolData
      })
    }//end getToolData

    this.getColorJSON = async function()
    {

      let tool_url = `${ADMINCOMP}xfiles/js/color.json`;
      await serve.request({task:"none",data:JSON.stringify({data:"none"})},
      tool_url)
      .then(function(results){
        //console.log("req results = ",results);

        if(typeof results != "object" || Object.keys(results).length === 0)
        {//if its not an object go here
          console.log("big error in service.getcolorJSON",results);
          return;
        }else {
          serve.colorJSON = results;
        }

      }).catch(function(err){
        console.log("big error in service.getcolorJSON");
      });

      return;
    }//end getColorJSON

    this.getColorData = async function()
    {
      let my_db_color_data;
      await serve.request({task:"getPallet",data:JSON.stringify({data:"none"})})
      .then(function(results){
          //console.log("req results = ",results);
          //return a json object array
          serve.colorData = results;
          //convert the data back into objects
          serve.colorData.forEach(function(entry){
          entry.data = (typeof entry.data == "string") ? JSON.parse(entry.data) : entry.data;
          })

          console.log("color Data = ",serve.colorData);
          my_db_color_data = results;
      }).catch(function(err){
        console.error("an error occured in getDColor",err);
      });

      return my_db_color_data;

    }//getColorData


    this.prep_tool_name = function(entry)
    {
      let entry_ary = entry.split("/");
      let entry_index = parseInt(entry_ary.length) - 1;
      let entry_name = entry_ary[entry_index];
      return entry_name;
    }//prep_tool_name

    this.activate_template = async function(tool,home,mode)
    {
      if(typeof tool != "object" || Object.keys(tool).length === 0)return;

      let template_str = home || "showcase";
      let template_home = "." + template_str;
      let template_mode = mode || "tool_default";//alt = settings
      let tempNbr = (template_mode != "settings") ? 0 : 1;
      let custom_class = (template_mode != "settings") ? " " + tool.details.class_pfx + " " + tool.details.class_style + " " : "";
      let custom_style = (tool.details.sample_style != undefined) ? tool.details.sample_style  : "";
      //bugfix for settings display problem - can't use same dimensions as slideshow display

      //clear the stage
      let t_home = (document.getElementById(template_str)) ? document.getElementById(template_str) : document.querySelector(template_home);
      t_home.innerHTML = "";

      let tool_str = escape(JSON.stringify(tool));//formerly crew="'+tool_str+'" & sttngs="' + tool_str + '"

      serve.current_tool = tool;
      serve.tool = tool;//i want to set the tool here so i don't have to use crew

      let tool_class = " " + tool.alias + " " + template_mode + " ";
      let stage = " " + tool.file_name + "_" + template_mode;
      let stage_id = " " + tool.file_name + "_"+  serve.module_id + " ";

      let injection_data = '<div class="' + stage + " " + stage_id + " " + tool_class + custom_class + '" data-cast="' + custom_class
      + '" data-motiv="' + template_mode + '" ' + ' data-marquee="' + tool.file_name + '" data-mode="admin" '
      + 'data-home="' + serve.home_url + '" data-stage="' + stage_id + '" style="' + custom_style + '"></div>';
      //marquee is used in templateUrl to set dynamic template.html along with data-home
      //data-motiv is used in template.html ng-if statements

      t_home.innerHTML = injection_data;
      angular.element(t_home).injector().invoke(["$compile",function($compile)
      {
        let dir_str = "." + tool.alias;
        let dir_obj = document.querySelectorAll(dir_str);
        dir_str = stage_id;
        dir_str = "." + serve.removeSomething(dir_str,' ');
        let scope = angular.element(t_home).scope();
        //im using tempNbt because this is loaded twice. once for the display the other for settings
        $compile(dir_obj[tempNbr])(scope);
      }]);

    }//activate_template

    this.lt_or_dk = function(col){
      let color = tinycolor(col);
      let is_light = color.isLight();

      let txt_col = (is_light) ? "color:#000;" : "color:#fff; text-shadow: 2px 2px 2px #8c8989;";

      return txt_col;
    }

    this.screen_current = function(str)
    {
      switch(str)
      {
        case "height":
          //return
        break;
        case "width":
        break;

      }//end switch
    }//end screen_current

    this.bboy = function(obj)
    {
      return JSON.parse(JSON.stringify(obj));
    }//break_obj


  }]);//end service "ShowData"

  /*  {"Airstream":"Airstream"},{"alexBrush":"alexBrush"},{"Anagram":"Anagram"},
    {"Burnstown-Dam":"Burnstown-Dam"},{"Codystar":"Codystar"},{"Comic-Zine":"Comic-Zine"},
    {"Distant-Galaxy":"Distant-Galaxy"},{"Dobkin":"Dobkin"},{"FancyPants":"FancyPants"},
    {"FontleroyBrown":"FontleroyBrown"},{"42ndStreet":"42ndStreet"},{"Headhunter":"Headhunter"},
    {"Heavy-Data":"Heavy-Data"},{"homemade-apple":"homemade-apple"},{"limelight":"limelight"},
    {"Lobster":"Lobster"},{"lovers-quarrel":"lovers-quarrel"},{"membra":"membra"},
    {"Minotaur":"Minotaur"},{"Mutlu":"Mutlu"},{"oleo-script":"oleo-script"},
    {"Plexifont":"Plexifont"},{"schoolbell":"schoolbell"},{"SeasideResort":"SeasideResort"},
    {"Wasabi":"Wasabi"},{"Tangerine":"Tangerine"}
  ];*/
  var myFonts =
    {"Airstream":"Airstream","alexBrush":"alexBrush","Anagram":"Anagram",
    "Burnstown-Dam":"Burnstown-Dam","Codystar":"Codystar","Comic-Zine":"Comic-Zine",
    "Distant-Galaxy":"Distant-Galaxy","Dobkin":"Dobkin","FancyPants":"FancyPants",
    "FontleroyBrown":"FontleroyBrown","42ndStreet":"42ndStreet","Headhunter":"Headhunter",
    "Heavy-Data":"Heavy-Data","homemade-apple":"homemade-apple","limelight":"limelight",
    "Lobster":"Lobster","lovers-quarrel":"lovers-quarrel","membra":"membra",
    "Minotaur":"Minotaur","Mutlu":"Mutlu","oleo-script":"oleo-script",
    "Plexifont":"Plexifont","schoolbell":"schoolbell","SeasideResort":"SeasideResort",
    "Wasabi":"Wasabi","Tangerine":"Tangerine"};

  /*var mySize =
    {"8":"8pt"},{"10":"10pt"},{"12":"12"},{"14":"14pt"},
    {"16":"16pt"},{"18":"18pt"},{"22":"22pt"},{"26":"26pt"},{"32":"32pt"}*/

    //accurate sizing
    /*
    var mySize =
    {".4rem":"8pt",".5rem":"10pt",".6rem":"12pt",".7rem":"14pt",
    ".8rem":"16pt",".9rem":"18pt","1.1rem":"22pt","1.3rem":"26pt","1.6rem":"32pt"}
    */

    //exaggerated sizing
    /*var mySize =
    {".7rem":"8pt",".8rem":"10pt",".9rem":"12pt","1rem":"14pt",
    "1.4rem":"16pt","1.2rem":"18pt","1.8rem":"24pt","2.0rem":"26pt","2.8rem":"32pt"}*/

    var mySize =
    {"1.4vw":"8pt","1.7vw":"10pt","2vw":"12pt","2.3vw":"14pt",
    "2.6rvw":"16pt","2.9vw":"18pt","3.8vw":"24pt","4.1vw":"26pt","5.0vw":"32pt"};
    //1.4vw,1.7vw,2vw,2.3vw,2.6rvw,2.9vw,3.8vw,4.1vw,5.0vw


})();//end closure
