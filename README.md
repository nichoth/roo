# roo

Problem Statement:
1. Create an app, which shows a list of applicants, with data
such as first name, last name, occupation, ssn information.
2. Initial data will be loaded asynchronously, from a mock json.
3. One should be able to add/ update/ remove applicants.
4. Add/ Update should take to a form based details screen, and
navigate back to the list dashboard on successful save/ update
or cancel.
5. Remove should ask for a confirmation in a modal window, before
actually removing the borrower.
Would prefer functional components, but feel free to use Class based
as well, based on your familiarity.

-------------------------------


"Add/ Update should take to a form based details screen"

A use for routes.

`/update/:index`
`/add`


---------------------------------------------

Need to mock an API for a backend

* `getApplicants` -- 
```js
setTimeout(function () {
    resolvePromise([{ name, lastName, occupation, ssn }])
}, 1000)
```

* add/ update/ remove applicants.

```js
var applicants = [
    { name, lastName, occupation, ssn }
]
function add() {
    applicants.push(newApplicant)
    // then go back to the home page
}

update(i)

remove(i)
```

CRUD operations should go back to the dashboard after success
