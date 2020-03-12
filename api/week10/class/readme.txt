Becoming acquainted:
   ✅1. Download the files in this directory into a new directory not related to git or node.
   ✅2. Examine the code and ask questions to someone around you about things that are unclear
   ✅3. Run:
      npm install express
      node server.js 

Making it better:

   Isolate the code that actually runs the server from the code that runs code on webpages.

      ✅4. Remove all code from server.js that is not required to actually run the server. This will include:
               Removing all routes (app.get, app.post, etc.)
               Removing unneeded modules (the book controller)
      ✅5. Create a new file to handle the routes, that will call the code from bookController and handle all logic.

   Once you can successfully run that...
      6. Add code so that the json object isn't just printed to the screen, but so the data formatted in a professional way
   
   Let's take out the hard-coded json
      7. Use what you learned in your reading and team activity this week to put this book data into a local database, and modify your code so that you get the data from the db, instead of a hard-coded json.

   Let's modify the database  
      8. Write code that allows a user to add a new book to the database.


