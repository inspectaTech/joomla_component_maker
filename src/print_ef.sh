
function pf()
{
  # creates a print message system - like console.log
  print_str="$1"

  pfx_range=${2:-1}
  get_line_breaks pfx_lb pfx_range
  sfx_range=${3:-2}
  get_line_breaks sfx_lb sfx_range

   printf "$pfx_lb$print_str$sfx_lb"
}

function get_line_breaks()
{
  # printf "line_breaks_called"
  declare -n glb_str=$1
  local n_str=""
  local range=$2

  for (( c=0; c<$range; c++ ))
  do
    # printf "$c"
    n_str="$n_str\n"
    # n_str="$n_str extra"
  done

  glb_str="$n_str"
}

function console.log()
{
  # creates a print message system - like console.log
  print_str="$1"
  printf "\n$print_str\n\n"
}
