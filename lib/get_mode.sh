
printf "\n get mode running"

function getMode () {
  #check if a letter was entered - if not the right input  re-present the prompt

  echo "mode_letter =" $mode_letter

  printf "\n\nWhat process would you like perform do today? \n(Enter t for template, z for zip or b for both)\n\n"
  read -p "(Enter the letter 't' 'z' or 'b') : " mode_letter

  mode_letter=${mode_letter,,}

  ltr_z='z'
  if [ $mode_letter == "t" ] || [ $mode_letter == "z" ] || [ $mode_letter == "b" ]
  then
      case $mode_letter in
          "t")
            work_mode="template"
          ;;
          "z")
            work_mode="zip"
          ;;
          "b")
            work_mode="both"
          ;;
      esac
      #echo $work_mode
      #echo "valid"
  #getMode
  else
    echo "invalid"
    getMode
  fi
} #getMode
