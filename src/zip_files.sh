
pf "zip files loading" 0 1

function zip_files () {
  case $template_type in
    "both" )
      pf "zip both temp_type section entered"
      case $work_mode in
        "zip" )
          # if zip remove the original files
          pf "zip both zip"
        ;;
        "both" )
          pf "zip both both"
          # get the com_ dir basename
          target zip_pkg_dir "pkg_" "dir"
          pf "zip pkg dir = $zip_pkg_dir"
          packages_space="$zip_pkg_dir/packages"
          pf "packages space = $packages_space"

          # make com zip
          target zip_com_dir "com_" "dir" $packages_space
          pf "zip com dir = $zip_com_dir"

          # make mod zip
          target zip_mod_dir "mod_" "dir" $packages_space
          pf "zip mod dir = $zip_mod_dir"

          # make temp_folder

          # copy pkg root Files

          # create pkg zip

        ;;
      esac
    ;;
    "*" )
      pf "zip all temp_type section entered"
      case $work_mode in
        "zip" )
          # if zip remove the original files
          pf "zip * zip"
        ;;
        "both" )
          pf "zip * both"
        ;;
      esac
    ;;
  esac
} #zip_files
