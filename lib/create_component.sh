
printf "\n create component running"

function create_component () {
  #make sure it set to template or both
  if [ $template_type != "component" ] && [ $template_type != "both" ]
  then
    #if not go back
    printf "\n\n create component not triggered \n\n"
    return 1
  else
    #otherwise keep processing
    printf "\n\n create component was triggered \n\n"

    #create a temporary directory
    create_directory temp_component
    #create_directory temp_component delete

    #enter the temp directory and copy the appropriate file into the folders
    cd temp_component

    dir_type=$(template_url)


    #add creation code here

  fi
} #create_component
