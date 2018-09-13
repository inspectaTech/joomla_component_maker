
printf "\n create module running"

function create_module () {
  #make sure it set to template or both
  if [ $template_type != "module" ] && [ $template_type != "both" ]
  then
    #if not go back
    printf "\n\n create module not triggered \n\n"
    return 1
  else
    #otherwise keep processing
    printf "\n\n create module was triggered \n\n"


  fi
} #create_module
