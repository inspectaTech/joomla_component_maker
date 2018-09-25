
pf "create template loading!" 0 1

function create_template () {
  #make sure it set to template or both
  # if [ $work_mode != "template" ] && [ $work_mode != "both" ]
  # then
  #   pf "template work mode not selected "
  #   #if not go back
  #   return 1
  # else
    # templateType
    # create target_dir variable from its results
    #  @ required get_path - sets template_url
    get_path
    #  @ optional prep_output - depends on template_url
    prep_output
    get_main target_dir
    console.log "get_main target_dir =  $target_dir"
    template_title com_name $target_dir

    # i only want to be able to update target_dir
    update_names $target_dir $com_name
    #zip_files
    #don't need zip_files it will run independent of create_template
    #modify the filenames
  # fi
} #create_template
