
printf "\n get module parent running"

function get_module_parent () {
  if [[ $template_type = "module" ]]
  then
    printf "\n\n what is the official name of the component you want your module to be associated with? \n"
    printf "enter a components name (example: com_componentname) or enter 'none' \n\n"
    read -p ": " module_parent
    printf "\n\n "


    case $module_parent in
      "com_"*)
      printf "component name is valid"
      ;;
      "none")
      # this runs the r_u_sure function and feeds it the txt and the confirm/deny test
        im_sure="$(r_u_sure "are you sure this module doesn't need ..." "y" "n")"
        printf "im sure = $im_sure \n"

        if [ $im_sure == "n" ]
        then
          get_module_parent
        fi
      ;;
      *)
      printf "nothing matches case \n\n"
      get_module_parent
      ;;
    esac

  fi

} #get_module_parent
