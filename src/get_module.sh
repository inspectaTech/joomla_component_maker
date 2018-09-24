
pf "create module loading!" 0 1

function create_module () {
  #make sure it set to template or both
  if [ $template_type != "module" ] && [ $template_type != "both" ]
  then
    #if not go back
    pf "create module not triggered "
    return 1
  else
    #otherwise keep processing
    pf "create module was triggered "

    # go to the default pkg and get the com_directory path

  fi
} #create_module
