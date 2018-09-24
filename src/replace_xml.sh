
function replace_xml()
{
  # file/tag/new_value/old_value
  xf_path=$1
  printf "\nxf path = $xf_path\n\n"
  tag=$2
  printf "\ntag = $tag\n\n"
  new_value=${3:-"none"}
  printf "\nnew value = $new_value\n\n"
  old_value=${4:-"none"}
  printf "\nold value = $old_value\n\n"


  find $xml_file_path -type f |  while read file;
  do
    printf "\nfind/replace file = $file\n\n";
    # current_name="inspectaTech"
    # new_name="inspectaTech2"
    case $old_value in
        "none" )
        printf "\nunfiltered area entered\n\n"
          sed -i "s/\(<$tag.*>\)[^<>]*\(<\/$tag.*\)/\1$new_value\2/" $file
        ;;
        * )
        printf "\nfiltered area entered, $old_value, $new_value\n\n"
          sed -i "s/\(<$tag.*>\)$old_value*\(<\/$tag.*\)/\1$new_value\2/" $file
        ;;
    esac
  done;
}
