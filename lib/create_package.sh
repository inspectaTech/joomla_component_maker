
printf "\n create package running"

function create_package () {
  #make sure it set to template or both
  if [ $template_type != "package" ]
  then
    #if not go back
    printf "\n\n create package not triggered \n\n"
    return 1
  else
    #otherwise keep processing
    printf "\n\n create package was triggered \n\n"

    # bring pkg to the temp staging area
    # make sure the target directory has pkg in its name

  fi
} #create_package
