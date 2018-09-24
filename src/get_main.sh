pf "get main loading!" 0 1

function get_main()
{
  declare -n g_main=$1

  local mode=${2:-default}
  pf "mode = $mode"
  local user_input=${3:-none}
  # find the dir we want to manipulate in the output dir
  # may be multiple files

    # everyting can do this
    # get the new directory from output folder
    local counter=0
    local file_count=""
    local current_file=""
    local file_list="\n\n"
    local file_base=""
    local my_file_nbr=""
    local limit=""
    local re='^[0-9]+$'
    local finished="false"

    while read -r file;
    do
      case $file in
        pkg_* | */pkg_* | com_*| */com_* | mod_*| */mod_* | plg_*| */plg_* )
        # use the file basename
        current_file="$file"
        file_base=$(basename $file)
        # add to the current count for display
        file_count=$(( $counter + 1 ))
        # concat a list just in case
        file_list="$file_list$file_count) $file_base\n\n"

        pf "user input = $user_input"
        pf "counter = $counter"

        if [ $mode = "input" ] && [[ $user_input =~ $re ]]  && [ $file_count -eq $user_input ]
        then
          g_main="$file"
          pf "return path = \n$g_main"
          finished="true"
        fi
        ((counter++))
        ;;
        * )
        pf "processing...  $file"
        ;;
      esac

    done <<< $( find "output" -maxdepth 1 -type d )

    # set the limit for later
    limit=$counter
    pf "limit = $limit"
    pf "g_main = $g_main"

    if [ $counter -eq 1 ] && [ -e $current_file ]
    then
      g_main="$current_file"
      pf "main file: $current_file"
    elif [ $counter -gt 1 ] && [ $finished = "false" ]
    then
      pf "multile files have been detected:"
      pf "$file_list" 2 4
      # pf "Enter the file number next to the file that you want to use." 1 0
      # read -p "(Enter the file number) : " my_file_nbr
      my_file_nbr="$(get_input "Enter the file number next to the file that you want to use." $limit )"
      pf "my_file_nbr = $my_file_nbr"

      get_main temp_var "input" "$my_file_nbr"
      pf "temp_var = $temp_var"
      g_main="$temp_var"
    fi

    # set the results to the return var
    # g_out=$target_dir
}
