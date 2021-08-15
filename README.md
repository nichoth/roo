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

We are using a *mock* backend that has a 1 second timeout before it
resolves a promise, to be sort of like a network request.

See the constant 'TIME` defined in `/src/backend`.

