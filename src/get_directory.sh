
pf "get directory loading!" 0 1

function get_directory () {

  # link the return value to the input variable
  declare -n ret=$1

  search_dir=$2

  pf "search dir = $search_dir"

  type=$3

  #make sure it set to template or both

    #otherwise keep processing
    pf "get directory was triggered "

    #get the path to the pkg_
    while read -r file;
    do
      pkg_template_path="$file"
      echo "template pkg path is $pkg_template_path"
    done <<< $(find $search_dir -maxdepth 1  -type d -name "pkg_*")
    # template here is the name of the actual directory its looking in

    pf "get_dir type = $type"

    case $type in
        "component")
          # navigate to the default pkg and get the com_directory path
          pf " getting component directory "
          prefix="com_*"
        ;;
        "module")
          # navigate to the default pkg and get the mod_directory path
          pf " getting module directory "
          prefix="mod_*"
        ;;
        "plugin")
          # navigate to the default pkg and get the mod_directory path
          pf " getting module directory "
          prefix="plg_*"
        ;;
      esac

    case $type in
        "component" | "module")
          # navigate to the default pkg and get the mod_directory path
          pf " getting com/mod directory "

          packages_dir="$pkg_template_path/packages"
          # echo "new package path = $pkg_path"

          while read -r file;
          do
            com_path=$file
            ret="$com_path"
            pf "$prefix path = \n$ret"
          done <<< $(find $packages_dir -maxdepth 1 -type d -name $prefix)
        ;;
        "plugin")

          while read -r file;
          do
            plg_template_path="$file"
            echo "template plg path is $plg_template_path"
          done <<< $(find $search_dir -maxdepth 1  -type d -name "plg_*")

          # navigate to the default pkg and get the pkg_directory path

          pf " getting package directory "
          ret="$plg_template_path"
          pf "plg path = \n$ret"
        ;;
        "both")
          # navigate to the default pkg and get the pkg_directory path
          pf " getting package directory "
          ret="$pkg_template_path"
          pf "pkg path = \n$ret"
        ;;
    esac



    #add creation code here

} #create_component
