
pf "user input loading!" 0 1

function r_u_sure () {
  #research a default value
  sure_txt="${1:-'are you sure? \n'}"
  confirm="${2:-'y'}"
  deny="${3:-'n'}"
  def_val=${4:-"none"}

  #pf "$sure_txt"

  read -p "$sure_txt ($2,$3) : " sure_input
  #pf "sure input = $sure_input"
  if [ $def_val != "none" ]
  then
    sure_input=${sure_input:-$def_val}
  fi
  case $sure_input in
    "$2" | "$3")
    pf "$sure_input" 0 0
    ;;
    *)
    #run it back
    pf "$(r_u_sure "$sure_txt" "$confirm" "$deny" "$def_val" )"
    ;;
  esac

  #cat $sure_input
}

function get_input () {
  #research a default value
  # str, nbr/txt, 0/1, def_val [mode - for fn use only]

  local sure_txt="${1:-'update input prompt. \n'}"
  local type=${2:-txt}
  local skip=${3:-0}
  local def_val=${4:-none}
  local mode=${5:-init}
  local invalid_str=""
  local cr=`echo $'\n.'`
  local re='^[0-9]+$'
  cr=${cr%.}

  if [ $mode = "rerun" ]
  then
    invalid_str="$cr""invalid input. $cr"
  fi

  read -p "$invalid_str$sure_txt $cr:> " sure_input

  if [ $skip -eq 1 ]
  then
    sure_input=${sure_input:-$default_value}
  fi

  # case $sure_input in
  #   *[0-9][^a-zA-z-_]*)
  #   echo "is a number"
  #   ;;
  # esac

  # filters: empty, type, type is a number, imput is a number, number limit
  if [ -z "$sure_input" ] ||
  [[ $type != "txt" ]] &&
  [[ $type =~ $re ]] &&
  ! [[ "$sure_input" =~ $re ]] ||
  [[ "$sure_input" -gt "$type" ]]
  then
    mode="rerun"
    pf "$(get_input "$sure_txt" "$type" "$skip" "$def_val" "$mode" )"
  else
    pf "$sure_input" 0 0
  fi


  #cat $sure_input
}
