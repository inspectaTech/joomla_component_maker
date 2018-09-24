pf "target loading!" 0 1
function target()
{
  # varname, dirname, file/dir, startpath, depth
  declare -n ret_targ=$1
  target="$2"
  pf "target target = $target "

  type="${3:-dir}"
  pf "target type = $type "

  starting="${4:-.}"

  depth="${5:-1}"
  pf "target depth = $depth "

  if [ $type == "file" ] || [ $type == "-f" ]
  then
    pf "if file entered "
    while read -r file
    do
      # then change the file name
      base=$(basename $file)
      # pf "file base target = $base "
      case $base in
          *"$target"* )
            pf "target file was found "
            ret_targ=$file;
          ;;
      esac
      # echo "$file";
    done <<< $( find "$starting" -maxdepth $depth -type f )
  elif [ $type == "dir" ] || [ $type == "-d" ]
    then
      pf "if dir entered "
      while read -r file
      do
        base=$(basename $file)
        # pf "dir base target = $base "
        case $base in
            *"$target"* )
              pf "target file was found "
              ret_targ=$file;
            ;;
        esac
      done <<< $( find "$starting" -maxdepth $depth -type d  )
    fi

}
