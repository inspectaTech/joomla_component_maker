
pf "create package loading!" 0 1

function create_package () {
  #make sure it set to template or both
  if [ $template_type != "package" ]
  then
    #if not go back
    pf "create package not triggered "
    return 1
  else
    #otherwise keep processing
    pf "create package was triggered "

    # go to the default pkg and get the pkg_directory path

    # make sure the target directory has pkg in its name

  fi
} #create_package
