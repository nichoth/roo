# roo

Problem Statement:
1. Create an app, which shows a list of applicants, with data
such as first name, last name, occupation, ssn information.
2. Initial data will be loaded asynchronously, from a mock json.
3. One should be able to add/ update/ remove applicants.
4. Add/Update should take to a form based details screen, and
navigate back to the list dashboard on successful save/update
or cancel.
5. Remove should ask for a confirmation in a modal window, before
actually removing the borrower.

Would prefer functional components, but feel free to use Class based
as well, based on your familiarity.

-------------------------------

## develop

Start a localhost server and rebuild the site when any js or css changes
```
$ npm start
```

This is an application (not a dependency for an application) that uses React.

We are using a *mock* backend that has a 1 second timeout before it
resolves a promise, to be sort of like a network request. See the constant
`TIME` defined in `/src/backend`.

This will persist your changes in memory only. To reset the application state,
just refresh the browser.

-------------------------------------

### npm version

Run some scripts before increasing the version number
```
$ npm version <major|minor|patch>
```

#### preversion
This will run the npm scripts `lint` and `deps`, which will throw an error
if eslint is bad or there are dependencies that are not being used.

#### postversion
After increasing the version number, it will push to github and also publish
to `npm`.

-----------------------------------------

## test
This is an example of end-to-end testing using cypress. The 
command `npm run test-cypress` will serve the app from your local machine and
also start the cypress GUI, which is where we would write tests -- see
`cypress/integration`.

To test error states, run `npm run test-cypress-err`.

This will start the app with an env variable set like `NODE_ENV = test_err`.
Use this to test error responses from the *mock* API server.

Run cypress tests:
```
$ npm run test-cypress
```
This will open the cypress GUI.

Any non-UI based testing (for example, testing application state) should be
done with `npm test-browser`. This will start a browser environment also,
but without the GUI interface of cypress.
