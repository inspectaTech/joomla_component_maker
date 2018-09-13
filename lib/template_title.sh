
printf "\n template title running"

function template_title (){

  display_label=""
  case $template_type in
      "component" | "module" | "package")
        display_label=$template_type
      ;;
      "both")
        display_label="component/module"
      ;;
  esac

  printf "\n\n what is the file title of your $display_label (use '_' underscore no spaces)? \n"
  read -p "(for example test_Mod) : " component_name

  if [ $component_name == "skip" ]
  then
    return
  fi
  #to lowercase - folio
  component_name=${component_name,,}
  #shortcut to component_name - still folio
  cn=$component_name
  #to uppercase - FOLIO
  cn_caps=${component_name^^}

  #to initial caps - Folio
  cn_init=${component_name^}

  #full version with com_ added as a prefix - com_folio
  cn_full="com_"$component_name

  #all caps with COM_ - COM_FOLIO
  cn_full_caps="COM_"$cn_caps
  my_year=$(date +%Y)
  my_month_year=$(date +%m-%Y)

  printf "\n\n what is the official title of your $display_label (spaces allowed here)? \n"
  read -p "(for example: Test component) : " official_title

  printf "\n\n what is the name of the template you will be using with this $display_label? \n"
  read template_name

  if [ $template_type = "component" ] || [ $template_type = "both" ]
  then
    printf "\n\n what would you like the path to your $display_label to be? \n"
    printf "(it will be added to the url index.php/custom-name for example: 'basic-test-page' or 'basic/test') \n"
    read -p ": " custom_path

    printf "\n\n what title would you like to describe your component page? \n"
    printf " (word or phrase - spaces are allowed for example: 'basic test page' ) \n"
    read -p ": " component_title

  fi

  if [ $template_type = "module" ]
  then
    get_module_parent
  fi

  printf "\n\n what is the authors name? (spaces allowed here)? "
  read authors_name
  authors_name=${authors_name:-'none'}

  printf "\n\n what email address would you like to associate with this $display_label? \n"
  read -p ": " display_email
  display_email=${display_email:-'none'}

  printf "\n\n what web address would you like to associate with this $display_label? \n"
  read -p ": " display_url
  display_url=${display_url:-'none'}

  printf "\n\n what company name would you like to associate with this $display_label? \n"
  read -p ": " company_name
  company_name=${company_name:-'none'}

  #/********** MODULE VARIABLES ***********************************************/

  #echo "what is the file title of your module (_underscore no spaces)? "
  #echo "(for example test_Mod) : "
  #read module_name
  module_name=$cn
  #to lowercase
  module_name=${module_name,,}
  #to uppercase
  mn_caps=${module_name^^}
  #to initial caps
  mn_init=${module_name^}

  #full version with mod_ added as a prefix
  mn_full="mod_"$module_name

  #all caps with MOD_
  mn_full_caps="MOD_"$mn_caps
  my_year=$(date +%Y)
  my_month_year=$(date +%m-%Y)

  #echo "what is the file title of the component associated with this module(_underscore no spaces)? "
  #echo "(don't include 'com_'  for example test_Comp) : "
  #read component_name;

  #echo "what is the official title of your module (spaces allowed here)? "
  #echo "(for example Test Module)"
  #read official_title

  official_title_mod=$official_title" module"
}
