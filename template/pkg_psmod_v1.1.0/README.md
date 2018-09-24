
#total_pkg readme
[README formatting](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

***
#Joomla! notes
##the model

###NOTES FOR ADMIN COMPONENT DEVELOPMENT
models/psmods.php
this model file has the innerjoin db formatting
```php
$query->select(
    $this->getState(
    "list.select",
    "a.id, a.title," .
    "a.options, a.module_id,".
    "b.position,b.access,b.published,".
    "b.publish_up,b.publish_down"
    )
);

$query->from($db->quoteName("#__psmod","a"))
->join("INNER",$db->quoteName("#__modules","b") . "ON (" .
$db->quoteName("a.id") . " = " . $db->quoteName("b.psmod_id") . ")");//("#__folio")." AS a");
```
>views/psmods.php/tmp/default.php has the backend admins list view (the first screen you see when using the admin component)

>views/psmod.php/tmp/edit.php has the backend admin single entry editor_id

>models/forms/psmod.xml has generic form elements userful to joomla.  duplicate and rename to fit the db
>requirements.  be sure not to make unused field elements required="true" because it will be required for form
>submission even if it isn't part of your page display and not a db column

>views/psmods.php/view.html.php on the bottom of this page holds the components btn toolbar - add delete btn

```php
if($canDo->get("core.delete"))
{
    JToolbarHelper::deleteList("","psmods.delete","JTOOLBAR_DELETE");//this controls what is written on the delete btn
}
```

***
#fixes errors and gotchas


