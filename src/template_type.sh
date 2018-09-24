
pf "template type loading!" 0 1

function templateType () {
  declare -n tt_path=$1
  #check if a letter was entered - if not the right input  re-present the prompt


  pf "What type of template would you like to create?
  \n (Enter c or com for component, m or mod for module or b or pkg for both or p or plg for plugin)"
  read -p "(Enter the letter 'c or com' 'm or mod' 'p or plg' or 'b or pkg') : " template_letter

  template_letter=${template_letter,,}
  pf "template_letter = $template_letter"

      case $template_letter in
          "c" | "com")
            pf "get component directory called"
            template_type="component"
            get_directory tt_path "template" $template_type
          ;;
          "m" | "mod")
            pf "get module directory called"
            template_type="module"
            get_directory tt_path "template" $template_type
          ;;
          "b" | "pkg")
            pf "get package directory called"
            template_type="both"
            get_directory tt_path "template" $template_type
          ;;
          "p" | "plg")
            pf "get package directory called"
            template_type="plugin"
            get_directory tt_path "template" $template_type
          ;;
          "*" )
          echo "invalid entry "
          templateType
          ;;
      esac
      #echo $template_type
      #echo "valid"
  #getMode

} #templateType
