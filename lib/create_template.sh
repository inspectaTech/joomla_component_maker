
printf "\n create template running"

function create_template () {
  #make sure it set to template or both
  if [ $work_mode != "template" ] && [ $work_mode != "both" ]
  then
    printf "template work mode not selected \n\n"
    #if not go back
    return 1
  else
    templateType
    get_path
    template_title
    create_package
    create_component
    create_module
    #zip_files
    #don't need zip_files it will run independent of create_template
    #modify the filenames


  fi
} #create_template
