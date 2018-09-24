
pf "create directory loading!" 0 1

function create_directory () {

  my_dir_name="$1"
  mode="$2"

  if [ $# -eq 0 ] || [ -z "$1" ]
  then
    pf " directory name was not given \nn"
    exit
  else
    pf "create directory else statement triggered! "
    pf "mode = $mode"
    case $mode in
      destroy | remove | delete)
        rm -rf $my_dir_name
        pf "directory $1 was deleted"
      ;;
      *)
        # id rather not have the overwrite attempt error so check for the existence first
        if [[ $(file --mime-type -b  "$my_dir_name") = *"/directory"* ]]
          then
            pf "directory detected n\n\ "
          else
            mkdir $my_dir_name
            pf "directory $1 was created"
        fi
      ;;
    esac

  fi

} #create_directory
