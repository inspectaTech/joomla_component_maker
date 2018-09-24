//alert("d3 script running!");

	function d3_create_panel(obj)
	{
		//creates a popup panel
		var home = obj.home;
		var pop_name = obj.popup_name;
		var pan_name = obj.panel_name;

		var modal_target = (document.getElementById(home)) ? document.getElementById(home) : document.getElementsByClassName(home)[0];

			var d3_popup = document.createElement("div");
			d3_popup.id = "d3_popup";//pop_name
			d3_popup.className = "d3_popup";
			d3_popup.dataset.role = "popup";
			d3_popup.setAttribute("data-overlay-theme","b");
			d3_popup.dataset.theme = "a";
			d3_popup.setAttribute("data-dismissible","false");

				var d3_panel = document.createElement("div");
				d3_panel.id = "d3_panel";//pan_name
				d3_panel.dataset.role = "panel";
				d3_panel.dataset.position = "right";
				d3_panel.dataset.display = "overlay";
				d3_panel.dataset.theme = "a";
				d3_panel.setAttribute("data-position-fixed","false");
				d3_panel.setAttribute("data-dismissible","false");
				d3_panel.setAttribute("data-swipe-close","false");

					var d3_panel_close = document.createElement("a");
					d3_panel_close.id = "gps_panel_close"
					d3_panel_close.setAttribute("href","#");
					//d3_panel_close.onclick = alight_panel_reset;

					d3_panel_close.dataset.rel = "close";
					d3_panel_close.dataset.ajax = "false";
					d3_panel_close.className = "gps_panel_btn ui-btn ui-btn-right ui-btn-inline ui-shadow"
					+ " ui-corner-all ui-mini ui-icon-delete ui-btn-icon-right ui-btn-icon-notext";
					d3_panel_close.innerHTML = "cancel";


					var d3_panel_inner = document.createElement("div");
					d3_panel_inner.id="d3_innerPanel";
					d3_panel_inner.className = "ui-panel-inner";

				d3_panel.appendChild(d3_panel_close);
				//d3_panel.appendChild(d3_panel_refresh);//moved to prep_CoordViewer3()
				d3_panel.appendChild(d3_panel_inner);

			//d3_popup.appendChild(d3_panel);


		/*********************  The rest of the inner popup panel **********************/
		var pUS_closeBtn =  document.createElement("a");
				pUS_closeBtn.id = "pUS_closeBtn";
				pUS_closeBtn.setAttribute("href","#");
				pUS_closeBtn.dataset.rel = "back";
				pUS_closeBtn.className = "ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right";
				//pUS_closeBtn.onclick = user_reset;
				pUS_closeBtn.title = "cancel";
				pUS_closeBtn.innerHTML = "close";

				var d3_panel_main = document.createElement("div");
				d3_panel_main.id = "d3_panel_main";
				d3_panel_main.setAttribute("role","main");
				d3_panel_main.className = "ui-content ";

					var d3_panel_main_content = document.createElement("div");
					d3_panel_main_content.id = "d3_panel_main_content";
					d3_panel_main_content.className = "d3_panel_main_content ui-grid-a";

						//content area

					//d3_panel_main_content.appendChild();

					var d3_panel_infoBox = document.createElement("div");
					d3_panel_infoBox.id = "d3_panel_infoBox";
					d3_panel_infoBox.className = "d3_panel_infoBox";

						var d3_panel_infoBtn = document.createElement("div");
						d3_panel_infoBtn.id = "d3_panel_infoBtn";
						d3_panel_infoBtn.setAttribute("href","#");
						d3_panel_infoBtn.className = "d3_panel_infoBtn ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-info ui-btn-icon-notext";
						d3_panel_infoBtn.title = "help info";
						d3_panel_infoBtn.onclick = function(){d3_toggleDisplay({"id":"d3_infoBox"});d3_toggleDisplay({"id":"d3_panel_infoBtn"});};
						d3_panel_infoBtn.innerHTML = "info";
						d3_panel_infoBtn.style.display = "block";



					d3_panel_infoBox.appendChild(d3_panel_infoBtn);


					var d3_panel_infoCont = document.createElement("div");
					d3_panel_infoCont.id = "d3_panel_infoCont";
					d3_panel_infoCont.className = "d3_panel_infoCont";

						var d3_infoBox = document.createElement("div");
						d3_infoBox.id = "d3_infoBox";
						d3_infoBox.className = "d3_infoBox";
						d3_infoBox.style.display = "none";

							var d3_info_close_btn = document.createElement("a");
							d3_info_close_btn.id = "d3_info_close_btn";
							d3_info_close_btn.setAttribute("href","#");
							d3_info_close_btn.className = "d3_info_close_btn  ui-btn ui-corner-all ui-alt-icon ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right";
							d3_info_close_btn.onclick = function(){d3_toggleDisplay({"id":"d3_infoBox"});d3_toggleDisplay({"id":"d3_panel_infoBtn"});};

							var main_d3_info = document.createElement("div");
							main_d3_info.id = "main_d3_info";
							main_d3_info.className = "main_d3_info";
							main_d3_info.innerHTML = "<p>You dont have to be registered to start exchanging information. If you are a brand new user click the guest icon.</p>";

						d3_infoBox.appendChild(d3_info_close_btn);
						d3_infoBox.appendChild(main_d3_info);


					d3_panel_infoCont.appendChild(d3_infoBox);

				d3_panel_main.appendChild(d3_panel_main_content);
				d3_panel_main.appendChild(d3_panel_infoBox);
				d3_panel_main.appendChild(d3_panel_infoCont);

			d3_popup.appendChild(pUS_closeBtn);
			d3_popup.appendChild(d3_panel_main);


		modal_target.appendChild(d3_popup);

		//$("#d3_popup").popup();

	}//end d3_create_ui

	function d3_toggleDisplay(obj)
	{
		var disp_id = obj.id;
		var targ_el = (document.getElementById(disp_id)) ? document.getElementById(disp_id) : document.getElementsByClassName(disp_id)[0];

		targ_el.style.display = (targ_el.style.display == "none") ? "block" : "none";

	}//end d3_toggleDisplay

    function getFakeCnxData(mId)
    {
		//called from default in views > cnxs > tmpl > default
		//ajax calls getFakeData in cnx controller.php

        //alert("module id = " + mId);




			var uploadData = {};

			var form_token = FORM_TOKEN;


			var urlMod = "getFakeData";//put controller.php method call here

			var ctrl_Url = "index.php?option=com_psmod&task=" + urlMod + "&format=raw&" + form_token + "=1";//this works



			$(document).ready(function()
			{
			   //alert("getMenuData running!");
			   $.ajax(
			   {

				url:ctrl_Url,
				/*data:{"userData":userData},*/
				data:uploadData,
				//data:userData,
				type:"POST",
				   success:function(result,textStatus,xhr)
				   {
					   console.log("scan textStatus = " + textStatus);
					   console.log("scan xhr  = " + xhr);
					   console.info("scan xhr status = " + xhr.status);

					   //alert("Ajax test result data = " + result);//string
						console.log("Ajax test result data = " + result);//string
						//var makeMenu = new menuMaker(result);
						//makeMenu.display();

						//if upload is successful

						//change the upload icon to successful
						//if(result.indexOf("invalid token") == -1)
						if(result != "Invalid Token")
						{
							if(result == "controller connection successful")
							{



							}
							else if(result.indexOf("<!doctype html>") == -1){
								//this comes up if the entire page"s html comes back in the request
								alert("Give me moment...  Resubmit your entry by  \n pressing the go button again.");

								//$.mobile.loading("hide");
							}
						}else
						{
								alert("Its not you... its me. \n Your session timer has expired. \n Please reset the page and give \n \"us\" a little more time.")

								window.location.replace(SITEURL);
						}

						//hide

					}

				})
			})//end ajax

    }//end getFakeCnxData
