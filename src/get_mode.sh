
pf "get mode loading!" 0 1

function getMode () {
  #check if a letter was entered - if not the right input  re-present the prompt
  declare -n gm_ret=$1

  pf "What process would you like perform do today? \n(Enter t for template, z for zip or b for both)" 1 0
  read -p "(Enter the letter 't' 'z' or 'b') : " mode_letter
  # default is an invalid character
  mode_letter=${mode_letter:-i}

  mode_letter=${mode_letter,,}

  pf "mode_letter = $mode_letter"

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

      gm_ret="$work_mode"
      #echo $work_mode
      #echo "valid"
  #getMode
  else
    pf "invalid entry"
    getMode temp_var
    gm_ret="$temp_var"
  fi
} #getMode
