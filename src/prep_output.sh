pf "prep_output loading!"

function prep_output()
{
  # this section takes the template url and copies it to the temp/output folder
  #does the file exist?

  # this isn't needed if continue in place is chosen

  #create a temporary directory
  create_directory output
  #create_directory output delete

  case $template_location in
    "present" )
    # do nothing its already there
    ;;
    *)

      # copy the appropriate file into the folders
      current_directory=$(pwd)
      pf "current directory = $current_directory "

      # copy the template directory to the new folder
      # cp -r "../"$template_url .

      cp -r $template_url output
      pf "making copies..."

    ;;
  esac


}
