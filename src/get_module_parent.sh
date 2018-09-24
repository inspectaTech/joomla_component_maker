
pf "get module parent loading" 0 1

function get_module_parent () {
  if [[ $template_type = "module" ]]
  then
    pf "what is the official name of the component you want your module to be associated with? \n"
    pf "enter a components name (example: com_componentname) or enter 'none' "
    read -p ": " module_parent
    pf " "


    case $module_parent in
      "com_"*)
      pf "component name is valid"
      ;;
      # if its differnt from mod name find a specific file or find ajax urls and change component name
      "none")
      # this runs the r_u_sure function and feeds it the txt and the confirm/deny test
      # modules don't have controllers - where does the ajax call call to?
        im_sure="$(r_u_sure "are you sure this module doesn't need ..." "y" "n" "y")"
        pf "im sure = $im_sure \n"

        if [ $im_sure == "n" ]
        then
          get_module_parent
        fi
      ;;
      *)
      pf "nothing matches case "
      get_module_parent
      ;;
    esac

  fi

} #get_module_parent
