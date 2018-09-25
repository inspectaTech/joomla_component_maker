
pf "get path loading!" 0 1

function get_path () {

# prep the return variable

  #run create_template
  pf "Enter the path of the target directory? (use: dirname or /directory/dirname) \n
  (Enter a file path or press c to continue in place* or type help) " 1 1
  read -p ": " template_url

  #if one isn't given use the default template
  template_url=${template_url:-default}

  case $template_url in
    pkg_* | */pkg_* | com_*| */com_* | mod_*| */mod_ | plg_*| */plg_* )
      template_location="remote"
      console.log "custom template url = $template_url "
      # if they pasted a path and its fits here copy the folder to the $temp_dir folder
    ;;
    "default")
      template_location="default"
      console.log "using default template"
      # uses get_directory get the path of the target directory
      templateType template_url
      pf "dynamic template url = $template_url "
    ;;
    "c" | "continue" )

      console.log "continue section entered"
      template_location="present"
      # checks the existence of the $temp_dir folder
      #if no $temp_dir folder make it and send instructions

      #checks the existence of a file with pkg,com,mod or plg

      #if multiple files exist prompt for name of target

      # if one file exists confirm its use - file detected y, n or continue

    ;;
    "help" | "--help" | "h" | "-h" )
    # add help text here

          pf "hint 1:\n
          the easiest remedy is to put the template you want
           to work with in the same directory as the template creator file
           then you would only need to add the directory name to the input
          ex: my_directory \n
          \n\n
          hint 2:\n
          the next help would be to navigate into the target template directory
           using the 'cd' command and typing the 'pwd' command to get
           the current working directory then return to the template maker
           directory & using your mouse precision highlight the path
           for example: '/c/Users/d3pot/version-control/bash_scripting/bash_joomla'
           and paste it using the mouse right-click & paste menu option.
           \n\n
          hint 3:\n
           to continue in place paste the folder you would like to work with inside
           of the $temp_dir folder or if there isn't an $temp_dir folder start the process by
           choosing c for continue and the script will create an $temp_dir folder for you
           to paste your files into. -( or just create your own in the j.c.m root folder.)
           "

      exit 1
    ;;
    * )
    pf " this is not a valid directory, it should be a pkg, com, or mod directory "
    get_path
    ;;
  esac

    # i don't need to check it here
      # pf " directory = $template_url"
      # pf " directory type = $(file --mime-type -b  "$template_url")\n"
      # if [[ $(file --mime-type -b  "$template_url") = *"/directory"* ]]
      # then
      #   pf "its a directory "
      #   pf "directory: $template_url"
      # else
      #   pf " invalid directory path "
      #   get_path
      # fi

  #if its not valid rerun
  #get_path

} #get_path
