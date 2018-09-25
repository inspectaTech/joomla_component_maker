
pf "zip files loading" 0 1

function zip_files () {

  pf "zip files entered"
  console.log "zip files template type = $template_type"
  # i should be in the root
  pf "starting zip dir = $(pwd)"

  # move to the temp folder
  cd $temp_dir

  case $target_dir in
    pkg_* | */pkg_* )
          pf "pkg section entered"

          # get the com_ dir basename
          # target zip_pkg_dir "pkg_" "dir"

          console.log "target dir = $target_dir"
          # remember target dir has $temp_dir as part of its name
          zip_pkg_dir=$(basename $target_dir)

          pf "zip pkg dir = $zip_pkg_dir"
          # copy the directory and give it a temp name temp_zip
          cp -r $zip_pkg_dir "temp_zip"
          pf "copying $zip_pkg_dir to temp_zip file"

          # go into the temp zip/packages folder
          packages_space="temp_zip/packages"
          pf "packages space = $packages_space"

          cd "$packages_space"

          pf "current zip dir = $(pwd)"
          # make com zip
          target zip_com_dir "com_" "dir"
          pf "zip com dir = $zip_com_dir"
          zip -r $zip_com_dir".zip" "$zip_com_dir"
          # remove non-zip folder
          pf "removing file $zip_com_dir"
          rm -rf "$zip_com_dir" 2 2

          # make mod zip
          target zip_mod_dir "mod_" "dir"
          pf "zip mod dir = $zip_mod_dir"
          zip -r $zip_mod_dir".zip" "$zip_mod_dir"
          pf "removing file $zip_mod_dir" 2 2
          rm -rf "$zip_mod_dir"

          # back out two folders to the $temp_dir
          cd ../..

          zip -r $zip_pkg_dir".zip" "temp_zip"
          # get rid of temp_zip folder
          rm -rf "temp_zip"

    ;;
    * )
      pf "all files section entered"

      zip_dir=$(basename $target_dir)

      zip -r $zip_dir".zip" "$zip_dir"
      # for all other files that aren't pkg
    ;;
  esac
} #zip_files
