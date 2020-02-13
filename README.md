# Simple Apps need APIs

In this repo we see how many APIs emerge _without_ planning.

## Stage 1: A basic structure

* `svr.js` is a four line express static server.
* `index.html` contains just static content.
* `script.js` writes the the console on page load.

## Stage 2: Reading some data

* `svr.js` adds an array of default messages and a route (at `/messages`) that returns them in response to a GET request.
* `index.html` just has the `messagelist` id added so we can refer to it in the script.
* `script.js` adds a `loadMessages` function that fetches messages from the server, replacing the initial static content.

## Stage 3: Storing data

* `svr.js` adds a second route for `/messages`, this time defining what we do for POST requests – we add a new message.
* `index.html` includes two new input fields for entering a new message.
* `script.js` includes a new `sendMessage` function that posts the new message, and a `checkKeys` function that looks for ENTER being pressed so posting a new message is more usable.  The `loadMessages` function has been refactored to call smaller named functions.

## Stage 4: An API route for every message

* `svr.js` now stores objects instead of strings, using UUIDs to identify messages; and adds a new route at `/messages/:id` for getting the details of any individual message.
* `index.html` includes a new `detail` field.
* `script.js` allows users to hover over messages to get information about the time the message was posted (this is retrieved for each message as the `mouseenter` event occurs).

## Stage 5: Refactoring as a module

* `svr.js` has been simplified with all code that isn't specific to HTTP removed to a separate module.
* `messageboard.js` created which now contains all the core logic.

## Stage 6: An API route and client page for update messages

* `svr.js` adds a second route at `/messages/:id` to allow PUT requests so a message can be edited, also adds `extensions` parameter to `express.static` to automatically fill in `.html` in URLs.
* `messageboard.js` adds a function for updating a message.
* `script.js` now adds an "(edit)" link to each message.
* `message.html` created to show an individual message.
* `message.js` created with the client-side script for sending an edited message to the server with a PUT request.

## Stage 7: Style!

* `index.html` and `message.html` put the inputs in a `<header>` and add a link to the stylesheet
* `style.css` makes it all pretty, with dark and light mode

## Stage 8: Data belongs in a database

* `svr.js` uses the `messageboard` module asynchronously
* `messageboard.js` uses SQLite instead of an in-memory array, using the `sqlite` package
* `migrations-sqlite/001-initial.sql` is the SQL script that creates the necessary table (used in `messageboard.js` by the `db.migrate()` call)
* `database.sqlite` is the database file (it gets created by `messageboard.js` when we first run the server)

## Stage 9: PostgreSQL

* `messageboard.js` uses PostgreSQL instead of SQLite, using the `pg` package
* `messageboard.psql` is the SQL script that creates the necessary tables (used in `package.json` by the `setuppg` script)
* `config.json` specifies where to find a running PostgreSQL and which database to use (edit this if you have trouble connecting to your PostgreSQL)


## Exercise


Imagine a database with tables for lecturers and students, in which every student has a personal tutor who is a lecturer.

1. Who might want to use data from such a database? _(List potential users)_
2. Consider each type of user that wants to access the data: what functionality will they want from the web app? _(List use cases)_
3. Design a (read-only) API that provides the data necessary to fulfil the requirements identified above:
   * Identify the routes
   * Specify what the server would do in response to a GET request
   * Describe when the client web app will use the request
   * NB: You don't have to use any syntax here, you're just dealing with concepts.

When done with the above, extend the exercise:

4. Add a table of modules: every student currently studies several modules, and every module is currently taught by one or more lecturers. Repeat steps 1–3.
5. Consider that we need to remember the modules students took in previous years; so a final-year student can have 11 modules they studied before, and 5 they are studying currently. Repeat steps 1–3.
6. Consider who would want to update any of the data. Repeat steps 1–3 but this time design a read-write API: beside the GET routes you defined above, you can define PUT, POST, and DELETE routes.
