# DinoHax
Modifications to chrome's built-in game, on the no internet page.

You can load this in jQuery through the console, using the following script.
```
var jQuery = document.createElement('script');
jQuery.src = "https://code.jquery.com/jquery-3.3.1.min.js";
document.getElementsByTagName('head')[0].appendChild(jQuery);
setTimeout(function(){    jQuery.getScript('https://raw.githubusercontent.com/Samozd/DinoHax/main/dinohax.js')
},250);
```
or just execute the code founded in dinohax.js. A wrong CORB detection will be made due to the fact that I can't github if you use this on a live webpage.

This is my first repo, so tell me if I made a mistake. Thank you!
