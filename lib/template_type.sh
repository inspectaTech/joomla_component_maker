
printf "\n template type running"

function templateType () {
  #check if a letter was entered - if not the right input  re-present the prompt

  echo "template_letter =" $template_letter

  printf "\n\nWhat type of template would you like to create?
  \n (Enter c for component, m for module, b for both or p for package)\n\n"
  read -p "(Enter the letter 'c' 'm'  'b' or 'p') : " template_letter

  template_letter=${template_letter,,}

  if [ $template_letter == "c" ] || [ $template_letter == "m" ] || [ $template_letter == "b" ] || [ $template_letter == "p" ]
  then
      case $template_letter in
          "c")
            template_type="component"
          ;;
          "m")
            template_type="module"
          ;;
          "b")
            template_type="both"
          ;;
          "b")
            template_type="package"
          ;;
      esac
      #echo $template_type
      #echo "valid"
  #getMode
  else
    echo "invalid entry \n\n"
    templateType
  fi
} #templateType
