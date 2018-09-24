pf "update names loading!" 0 1

function update_names()
{
  pf "update names running!"

  dir_path=$1
  pf "update dir path= $dir_path"
  pf "update starting path= $(pwd)"

  # there is not current_name property
  # current_name=$3
  # current_name=${current_name,,}
  # pf "update current name = $current_name"

  # get the templates component/modules name
  case $dir_path in
      *plg_*)
      # plugin format has plg_groupname_plgname
      temp_title=$(echo "$dir_path" | sed 's/.*plg_\([A-Za-z0-9]*\)_\([A-Za-z0-9]*\)_v.*/\2/')
      ;;
      * )
      # underscores may be a problem
      # i can split at dashes and underscore, sentence case the words and concat back together
      temp_title=$(echo "$dir_path" | sed 's/.*\(com\|mod\|pkg\)_\([A-Za-z0-9]*\)_v.*/\2/')
      ;;
  esac
  pf "'$temp_title' has been set as the name to replace. press enter to continue \nor type a different name you'd like to replace"
  read -p "(press enter to continue or enter text here) : " replace_name

  temp_title=${replace_name:-"$temp_title"}

  pf "final replacement name is $temp_title "

  # pass in the users desired component name
  new_template_name="$2"
  new_template_name=${new_template_name,,}
  pf "update new name = $new_template_name"

  # enter the target directory - helps prevent naming conflicts - helps me not change the name of the
	# target folder itself
  # find . -depth -type d

  case $dir_path in
    *"pkg_"* )
      # pkg dir needs to be coded from within the folders found in packages dir
      # if its a package go into the package dir
      pf "entering pkg dir"
      cd "$dir_path"


      pf "update current path= $(pwd)";

      # get the packages dir - i could just use packages but...
      target base_dir "packages"
      pf "update target base dir1= $base_dir"
      # enter the packages folder
      cd $base_dir

      # get the com_ dir basename
      target base_dir "com_"
      pf "update target base dir2= $base_dir"
      # enter the com_ folder
      cd $base_dir

      pf "update current path= $(pwd)"

      # do the dir updates
      pf "update current path= $(pwd)"
      find . -type d | while read -r file;
      do
        if [[ -d $file ]]
        then
          mv "$file" "${file//$temp_title/$new_template_name}"
        fi
      done
      # back out of com_
      cd ..
      # update com_ dir
      mv $base_dir "${base_dir//$temp_title/$new_template_name}"

      # go to mod dir
      pf "update current path= $(pwd)"

      # get the mod_ dir basename
      target base_dir "mod_"
      pf "update target base dir2= $base_dir"
      # enter the com_ folder
      cd $base_dir

      # do the dir updates
      pf "update current path= $(pwd)"
      find . -type d | while read -r file;
      do
        if [[ -d $file ]]
        then
          mv "$file" "${file//$temp_title/$new_template_name}"
        fi
      done

      # back out of mod_
      cd ..
      # update com_ dir
      mv $base_dir "${base_dir//$temp_title/$new_template_name}"
      # create_directory /c/Users/d3pot/version-control/bash_scripting/joomla_component_maker/output delete

      # back out to output dir
      cd ../..

      # update the packages folder
      target base_dir "pkg_"
      pf "update target base dir2= $base_dir"
      # enter the com_ folder

      mv $base_dir "${base_dir//$temp_title/$new_template_name}"

    ;;
    * )
      pf "update starting path= $(pwd)"
      cd "$dir_path"
      pf "update current path= $(pwd)"

      find . -type d | while read -r file;
      do
        if [[ -d $file ]]
        then
          mv "$file" "${file//$temp_title/$new_template_name}"
        fi
      done

      # back out to output dir
      cd ..

      # update the outer folder
      # this section's dir_path has output so i had to make a basename version
      base_dir=$(basename $dir_path)
      mv $base_dir "${base_dir//$temp_title/$new_template_name}"

    ;;
  esac

  pf "update current path= $(pwd)"



  # we should be in the output dir

  # then change the names of all the files - while ur at it change target the file contents too.
  find . -type f | while read -r file;
  do
    # rename the contents first

    if [[ -e "$file" ]] && [[ ! -d $file ]]
    then
      # if its an actual file and its not a folder do this
      pf "processing file: $file" 0 1
      sed -i -e 's/'"${temp_title}"'/'"${new_template_name}"'/g' $file;
      sed -i -e 's/'"${temp_title^}"'/'"${new_template_name^}"'/g' $file;
      sed -i -e 's/'"${temp_title^^}"'/'"${new_template_name^^}"'/g' $file;

      # then change the file name
      mv "$file" "${file//$temp_title/$new_template_name}"
      # echo "$file";
    else
      # let us know what file is being discovered
      pf "discovery: $file" 0 1
    fi
  done

  if [ $work_mode == "zip" ] || [ $work_mode == "both" ]
  then
    zip_files
  fi

}
