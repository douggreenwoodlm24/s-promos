
<cfscript>
var str = ArrayNew(1);
test= structnew();
test.ashwani="test";
test.pm="marlow";
arrayAppend(str,test);
jdata=SerializeJSON(str);
</cfscript>
<cfoutput>#jdata#</cfoutput>
<!---
[
  {
    "name":"Samsung Galaxy",
    "color": "Black",
    "storage": "32GB",
    "imageName":"samsung_galaxy.png",
    "manufacturer": "samsung",
    "os": "android",
    "price":"999",
    "href": "/tmp.html", 
    "description":"The Samsung Galaxy S7 boasts a 5.1-inch Super AMOLED display ideal for gaming. It also comes with expandable storage plus an ergonomically engineered metal body and compact curved rear design."
  },
  {
    "name":"Sony Xperia",
    "color": "Black",
    "storage": "32GB",
    "imageName":"sony_xperia.png",
    "manufacturer": "sony",
    "os": "android",
    "price":"899",
    "href": "/tmp.html", 
    "description":"Featuring Sony's best smartphone camera to date, the waterproof Sony Xperia Z5 is packed with premium features including a 5.2-inch full-HD TRILUMINOS display, hi-res audio, 4K video recording and a 2-day battery."
  }
]
--->