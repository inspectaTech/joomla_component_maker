
printf "\n ru sure running!"

function r_u_sure () {
  #research a default value
  confirm="${2:-'y'}"
  deny="${3:-'n'}"
  sure_txt="${1:-'are you sure? \n'}"

  #printf $sure_txt

  read -p "$1 ($2,$3) : " sure_input
  #printf "sure input = $sure_input"
  case $sure_input in
    "$2" | "$3")
    printf $sure_input
    ;;
    *)
    #run it back
    r_u_sure
    ;;
  esac

  #cat $sure_input
}
