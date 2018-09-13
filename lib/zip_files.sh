
printf "\n zip files running"

function zip_files () {
  #make sure it set to template or both
  if [ $work_mode != "zip" ] && [ $work_mode != "both" ]
  then
    #if not go back
    printf "\n\n zip not triggered \n\n"
    return 1
  else
    #otherwise keep processing
    printf "\n\n zip was triggered \n\n"
    if [ $work_mode = "zip" ]
    then
      #if its zip alone create_template didn't run, you will need a path
      get_path
    fi

    #sanitize url and give hint if they type help

  fi
} #zip_files
