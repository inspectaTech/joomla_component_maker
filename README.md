# joomla_component_maker (JCM)

To package localhost joomla files:
1. - [ ] source .bashrc
2. - [ ] create the template you need using uw (skip the path)
3. - [ ] answer the config questions
4. - [ ] once the output component has been made delete the site and admin dir contents and paste in the  localhost component files
5. - [ ] check to make sure xml files are correct
6. - [ ] run uw again in zip mode
7. - [ ] upload to the server


TODO:

menu title is in the sys.ini file
COM_EXAMPLE="Example"
COM_EXAMPLE_XML_DESCRIPTION="A simple portfolio extension."
COM_EXAMPLE_MENU="AExample"

i need to modify the language files dynamically using uw
specifically: COM_ARC_TITLE_ARC = "Arc" (com_arc.ini)

# converting local joomla components back into zip files
1. use JCM to modify the template components into a your desired component/module/pkg
2. remove the contents of the target dir within the modified directory
3. paste in the local files
4. make sure xml is correct - (especially version # & date)
5. make sure com_example.sys.ini file is correct (see sample above)
6. run JCM again in zip (z) mode
7. set the modified directory as the target when prompted
8. upload to joomla site
