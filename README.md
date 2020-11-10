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

1. There is a search bar that will return the searched user, or a partial match on a letter or combination of letters.
2. There is a Previous & Next functionality is provided.

- the first user will have their Previous button disabled by default.
- the last user will have their Next button disabled by default.
3. There is an additional button in the search bar called 'Reset' that will reset the search results. 
4. CSS changes:
- Changed the font to use the Google font style Roboto 
- Added a hover effect to the cards using box-shadowing
- Reduced the opacity of the text in the modal paragraphs  (more for styling purposes)
- Added a black border to the cards to provide more umph
- Color palette to use a grey background for the header and a light grey on the body section.
- Addtion of a hidden property that controls the display values in the grid.  When assigned to an item in the UI the object will be hidden.
