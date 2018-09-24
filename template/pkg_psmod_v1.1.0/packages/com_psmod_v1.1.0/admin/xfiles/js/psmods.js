//alert("psmod running!")


    function psmodSampleAjax2()
    {
        var testUrl = "index.php?format=raw&option=com_psmod&task=getFakeData";
        var tStr = " this with an s "
        //alert("checked ids = " + module_data.id_str + "\n module number is " + module_data.module_number);

        jQuery(document).ready(function()
        {
            jQuery.ajax(
            {
                url:testUrl,
                data:{"title": tStr},
                type:"POST",
                success:function(result)
                {
                   //alert("test " + result + " has returned");

                }

            })
        });//end jQ(doc

    }//end psmodSampleAjax2

    //used for admin list view
    function prepEvents()
    {
        //alert("new script running!");
        var deleteBtn = document.getElementById("toolbar-delete");
        deleteBtn.firstElementChild.onclick = function()
        {
            if (document.adminForm.boxchecked.value==0)
            {
                alert("What Please first make a selection from the list.");
            }
            else
            {
                deleteModule();
                //Joomla.submitbutton("psmods.delete")
            };
        }//end function

    }//end prepEvents

    module_data = {};
    function deleteModule()
    {
        var form_token = FORM_TOKEN;
        var testUrl = "index.php?format=raw&option=com_psmod&task=deleteModule&" + form_token + "=1";
        prepIdString();

        //alert("checked ids = " + module_data.id_str + "\n module number is " + module_data.module_number);

        jQuery(document).ready(function()
        {
            jQuery.ajax(
            {
                url:testUrl,
                data:module_data,
                type:"POST",
                success:function(result)
                {
                   //alert(result + " has returned");
                   Joomla.submitbutton("psmods.delete");

                }

            })
        });//end jQ(doc

    }//end deleteModule

    function prepIdString()
    {
        //used to prepare the delete id string
        var checkEl = document.adminForm["cid[]"];///boxchecked.value
            module_data = {};
            module_data.module_number = document.adminForm.boxchecked.value;
            module_data.id_str = "";

            for(var i=0; i < checkEl.length; i++)
            {
                if(checkEl[i].checked == true)
                {
                    mIdStr = "module_" + i;
                    module_El = document.getElementById(mIdStr)
                    if(module_data.id_str == "")
                    {
                        module_data.id_str = "" + parseInt(module_El.innerHTML) + "";
                    }
                    else
                    {
                        module_data.id_str += "," + parseInt(module_El.innerHTML)  + "";
                    }//end else

                }//end if
            }//end for
        }//end prepIdString

    
