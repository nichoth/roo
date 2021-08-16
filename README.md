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

Thanks to free hosting, you can [view this demo on the internet](https://roo-demo.netlify.app/).

[![Netlify Status](https://api.netlify.com/api/v1/badges/3f0b9f4f-2c6e-4fe8-ad6a-be7f8520824d/deploy-status)](https://app.netlify.com/sites/roo-demo/deploys)

------------------------------------

## todo

* should do better form validation on the edit/create forms.
  - validate the SSN -- should be only numeric, 9 digits
  - validate that the names are alphabet letters
  - validate that the occupation name is alpha-numeric
* should display the SSN better. You could show it with hyphens: `123-12-1234`
* write real tests in cypress
  - test the error states -- should show errors in the UI
  - test the happy states
* write real tests in node -- `test/index.js`

------------------------------------

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

The JS is being bundled with
[browserify](https://www.npmjs.com/package/browserify),
and the development server is [budo](https://www.npmjs.com/package/budo), a
static server based on browserify.

-----------------------------------

## structure
The application state is kept in a top level observable state object, defined 
in `/src/state.js`. This way you can write tests for the application state
without needing React or the DOM. As an example, see `test/index.js`.

```js
// test/index.js
var bus = Bus({ memo: true })
subscribe(bus, state)
// the application state is now connected to the event bus

test('example test', t => {
    t.equal(state.applicants(), null, 'should start with null applicants')
    var apps = { firstName: 'a', lastName: 'b', ssn: '123', occupation: 'c'}
    bus.emit(evs.applicants.got, [
        // list of applicants here
        apps
    ])
    t.equal(state.applicants().length, 1, 'should update the state')
    t.end()
})
```

-----------------------------------------

## routes

We are using client side routing via [route-event](https://www.npmjs.com/package/route-event). We only call `ReactDOM.render` once, when the page first loads.
Subsequent route changes are handled in application state via a `path` key, so
we re-render the application whenever the route changes, instead of making a 
new request to the server for a new page.

-------------------------------------

## npm version

Run some scripts before increasing the version number
```
$ npm version <major|minor|patch>
```

### preversion
This will run the npm scripts `lint`, `deps`, and `test`, which will throw an error
if eslint is bad or there are dependencies that are not being used, or if the
tests fail.

### postversion
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

Anything that does not depend on a browser environment, like testing an API
adapter module, should go in `test/index.js`. This test file is run from node,
so cannot use any browser APIs.
