
printf "\n create directory running"

function create_directory () {

  my_dir_name="$1"
  mode="$2"

  if [ $# -eq 0 ] || [ -z "$1" ]
  then
    printf "\n directory name was not given \nn"
    exit
  else
    printf "mode = $mode"
    case $mode in
      destroy | remove | delete)
        rm -rf $my_dir_name
        printf "\n directory $1 was deleted \n\n"
      ;;
      *)
        # id rather not have the overwrite attempt error so check for the existence first
        if [[ $(file --mime-type -b  "$my_dir_name") = *"/directory"* ]]
          then
          else

            mkdir $my_dir_name
            printf "\n directory $1 was created \n\n"
        fi
      ;;
    esac
  fi

} #create_directory
