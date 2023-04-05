# UTKCC Website

This repository is for hosting the website of UTKCC, `University of Toronto: Korean Commerce Community` via GitHub Pages. 

## Instructions for future website admins

Unless a completely new feature is needed, most contents can be modified by editing a small portion of codes.

### Updating the `Events` Page

#### Social Events:

Navigate to `./events/social-events.json`. This is a JSON file which stores information about social events; `app.js` automatically fetches data from here and renders the social events page. 

* Adding a new social event
  1. The default (and preferred) image ratio is 1:1. Prepare this file and add to the folder `./img/events/`. 
  2. Make a dictionary with the following format:
     ```{javascript}
       {
         "name": "<<put the name of the event here>>",
         "image": "./img/events/<<name of the image file>>",
         "explanation": "<<explanation of the event>>" 
       }
     ```
     - Line breaks in here must be replaced with `<br>`s and should be written in a single line.
     - Do NOT include <<>>. Put in texts only.
  3. Append (copy and paste) to the bottom of the dictionary. Don't forget to add a `,` before the new dictionary. 
     ```{javascript}
       {
         "Events": [ 
           ... other events ,
           {
             "name": "Social Event 1",
             "image": "./img/events/event-img.png",
             "explanation": "This is an example event."
           }
         ]
       }
     ```

* Removing an existing social event
  
  Remove the code chunk that corresponds to the event. Note, the very first social event object (that is meant to work as an example, hence ignored by `app.js`) should not be removed. 

## Authors
16th (2022-23):
[@ryubsmile](https://www.github.com/ryubsmile)
[@JustKim04](https://www.github.com/JustKim04)
[@yujin013514](https://www.github.com/yujin013514)

17th (2023-24):
[@ryubsmile](https://www.github.com/ryubsmile)
[@JustKim04](https://www.github.com/JustKim04)
and to be added more...

## License

[MIT](https://choosealicense.com/licenses/mit/)
