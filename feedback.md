# Checklist for Northcoders News Front End

## README - write your own and make sure that it:

- [ ] has a link to the deployed version
- [ ] provides general info about your app
- [ ] includes link to your back end repo
- [ ] specifies the minimum version of Node required to run locally (check your Node version, `node --version` and use the major version that you are on)
- [ ] has clear instructions on how to run your project locally (`git clone <repo-url>, cd ...`)

## UX
- [ ] Refreshing doesn’t cause an issue on sub-pages (check on hosted version)
- [ ] No errors in the console






## Error Handlings
- [ ] Update user fails but gives positive feedback

//b-e
I may have handled the 400 wrong in backend, for some reason I can update a custom user but can't update mr.men.
Used 404 to reject relation not found in table, I think I need to change error handling in back-end.
currently no not null constraints on user table other than username?
should i reject null in model?









### Articles

- [ ] Can vote a maximum of once in either direction per page load

### Individual Article / Comments

- [ ] Can vote a maximum of once in either direction per page load

## Code

- [ ] `Home` and `Articles` have very similar functionality. Is there any way for them to be made a little more DRY?

- [ ] Seems like most initial states are empty arrays even when you'll be storing other data types there?






- [ ] No `console.log`s / comments
- [ ] Indent every child element one level

## MAKE SURE ALL TESTS ARE STILL PASSING IN BACK END
