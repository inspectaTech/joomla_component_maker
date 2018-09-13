
printf "\n get path running"

function get_path () {
  #run create_template
  printf "\n\nEnter the path of the target directory?
  \n (use: dirname or /directory/dirname)\n\n"
  read -p "(Enter the file path or type help) : " template_url

  #if one isn't given use the default template
  template_url=${template_url:-'dummy'}

  #does the file exist?
  printf "\n directory = $template_url"
  printf "\n directory type = $(file --mime-type -b  "$template_url")\n"
  if [[ $(file --mime-type -b  "$template_url") = *"/directory"* ]]
  then
    printf "\n its a directory \n\n"
    echo "\n directory: " $template_url

    case $template_url in
      pkg_* | */pkg_*)
        printf "\n directory is a package \n\n"
      ;;
      com_*| */com_*)
        printf "\n directory is a component \n\n"
      ;;
      mod_*| */mod_)
        printf "\n directory is a module \n\n"
      ;;
      *)
        printf "\n this is not a valid directory, it should be a pkg, com, or mod directory \n\n"
        get_path
      ;;
    esac

  elif [[ $template_url == "help" ]]
  then
    printf "\nthe easiest remedy is to put the template you want
     to work with in the same directory as the template creator file
     then you would only need to add the directory name to the input
    ex: my_directory \n
    \n the next help would be to navigate into the target template directory
     using the 'cd' command and typing the 'pwd' command to get
     the current working directory then return to the template maker
     directory & using your mouse precision highlight the path
     ex: /c/Users/d3pot/version-control/bash_scripting/bash_joomla
     and paste it using the mouse right-click & paste menu option."

    get_path
  else
    printf "\n invalid directory path \n\n"
    get_path
  fi

  #if its not valid rerun
  #get_path

} #get_path
