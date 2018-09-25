
pf "template title loading!" 0 1

function template_title (){
  #  component_name|template_path
  declare -n ret_c_name=$1
  target=$2
  rename_namespace=""
  update_xml_file="n"


  # find the xml file
  pf "" 0 3
  update_xml_file="$(r_u_sure "do you want edit the configuration data of $target?" "y" "n" "n" )"
  pf "" 0 3

  if [ $update_xml_file = "y" ]
  then
    pf "update xml is yes"

    pf "xml template path = $target "
    pf "xml search pwd is $(pwd) "
    while read -r file;
    do
      xml_file_path="$file"
      echo "xml path is $xml_file_path"
    done <<< $(find $target -maxdepth 1  -type f -name "*.xml")

    pf " what is the authors name? (spaces allowed here)?" 1 0
    read authors_name
    authors_name=${authors_name:-'none'}

    # update xml authors name
    replace_xml $xml_file_path "author" "$authors_name"

    pf " what email address would you like to associate with this $display_label?" 1 0
    read -p ": " display_email
    display_email=${display_email:-'none'}

    # update xml email
    replace_xml $xml_file_path "authorEmail" "$display_email"

    pf " what web address would you like to associate with this $display_label?" 1 0
    read -p ": " display_url
    display_url=${display_url:-'none'}

    # update xml address
    replace_xml $xml_file_path "authorUrl" "$display_url"

    pf " what company name would you like to associate with this $display_label?" 1 0
    read -p ": " company_name
    company_name=${company_name:-'none'}
    copyright_str="(c) $my_year $company_name llc. All rights reserved."
    replace_xml $xml_file_path "copyright" "$copyright_str"

    # update xml company name

    my_year=$(date +%Y)
    my_month_year=$(date +%m-%Y)
    # update xml creation date
    replace_xml $xml_file_path "creationDate" "$my_month_year"

    pf " what is the official title of your $display_label (spaces allowed here)?" 1 0
    read -p "(for example: Test component) : " official_title

    official_title=${official_title:-'none'}
    # update xml authors name
    replace_xml $xml_file_path "name" "$official_title"

    pf " what is the name of the template you will be using with this $display_label?" 1 0
    read -p " (template name): " template_name

    if [ $template_type = "component" ] || [ $template_type = "both" ]
    then
      pf " what would you like the path to your component to be?" 1 0
      pf "(it will be added to the url index.php/custom-name for example: 'basic-test-page' or 'basic/test')" 0 1
      read -p ": " custom_path

      pf " what title would you like to describe your component page?" 1 0
      pf " (word or phrase - spaces are allowed for example: 'basic test page' )" 0 1
      read -p ": " component_description
      component_description=${component_description:-'none'}

      # update xml authors name
      replace_xml $xml_file_path "description" "$component_description"

    fi
  fi

  pf " template location = $template_location"
    # set the renaming defaults
    case $template_location in
      # template_location set in get_path
      "default")
      # do nothing
      console.log "t-title default section entered"
        d_val="y"
      ;;
      "*" )
        # find "$temp_dir" -maxdepth 1  -type d | read sample_file
        # pf "sample_file results = $target"
        # pf "type the number of the file want to use."
        # read -p "(for example test_Mod) : " tt_file_nbr
        console.log "t-title * section entered"
        d_val="n"

      ;;
    esac

    console.log "d_val = $d_val"
    # ask everybody if they want to rename?
    rename_namespace="$(r_u_sure "do you want to rename $target?" "y" "n" "$d_val" )"
    pf "" 0 3

  if [ $rename_namespace = "y" ]
  then

    pf "renaming namespace = y"

    display_label=""
    case $template_type in
        "component" | "module")
          display_label=$template_type
        ;;
        "both")
          display_label="component/module"
        ;;
    esac


    pf "what is the file title of your $display_label (use '_' underscore no spaces)?" 1 0
    read -p "(for example test_Mod) : " component_name

    if [ -z "$component_name" ]
    then
      pf "please enter a title\n"
      template_title com_name $target
      return
    fi

    if [ $component_name == "skip" ]
    then
      return
    fi
    #to lowercase - folio
    component_name=${component_name,,}
    ret_c_name="$component_name"

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


    if [ $template_type = "module" ]
    then
      get_module_parent
    fi

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

    official_title_mod="$official_title module"

  fi # end rename_namespace
}
