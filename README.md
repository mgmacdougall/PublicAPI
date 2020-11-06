# PublicAPI

## Description:

The project creates an employee directory from the `https://randomuser.me/` site.
On loading 12 random users will be rendered on the page.

Meets Expectations Requirements Met:

1. 12 Random users are retrieved using the built in 'Fetch API'

- refreshing the page will create 12 new random users from the `randomuser.me` end point

2. Each card contains the following information:

- First/Last Name, Email, City, Location

3. Modal dialog is created when the card is clicked on

- infomation displayed is as per the Ruberic

4. The cards and modal match the mock up provided.
   NOTE: To close the dialog there are two ways:

- Click on the `-` in the corner
- Or, use the `Escape` keyboard to close the window.

Exceeds Expectations:

1. There is a search bar that will return the searched user, or no change will occur
   if there a search returns no users.
2. There is a Previous & Next functionality is provided.

- the first user will have their Previous button disabled by default.
- the last user will have their Next button disabled by default.

3. CSS changes:

- background color changed to Orange
- new class for disabled button has been added. Disabled buttons have their mouse over,
  click action, and the opacity for the button provides a visual clue that the button cannot be clicked.
- the font has been changed Google font `family=Nunito`. These have been included using the Google fonts CDN.
