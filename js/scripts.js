const testButton = document.getElementById('testbutton');
const gallery = document.getElementById('gallery');

/// Script constants
const userURL = 'https://randomuser.me/api/?results=12';

/**
 * Converts response  to json
 * @param {*} resp the resonse to be converted.
 */
function JSON(resp) {
	return resp.json();
}

/**
 * Checks the response for any error and will resolve  or reject the promise
 * @param {*} response
 */
function checkResponse(response) {
	if (response.status === 200 && response.ok) {
		return Promise.resolve(response);
	} else {
		return Promise.reject(Error('There was an error connecting.'));
	}
}

/**
 * Filters out the users
 * @param {*} data
 */
function filterUsers(data) {
	return data.results.map((person) => {
		return getFilteredUserData(person);
	});
}

/**
 * Pulls off the object values need to create the user information
 * @param {*} data
 */
function getFilteredUserData(data) {
	let result = {};
	result['firstname'] = data.name.first;
	result['lastname'] = data.name.last;
	result['image'] = data.picture.medium;
	result['email'] = data.email;
	result['location'] = data.location;
	result['dateofbirth'] = data.dob.date;
	return result;
}

/**
 * Creates the cards on the main gallery
 * @param {*} users
 */
function createCards(users) {
	for (let user of users) {
		let divMainCard = document.createElement('div');
		divMainCard.className = 'card';

		let imgContainerDiv = document.createElement('div');
		imgContainerDiv.className = 'card-img-container';

		let imageHolder = document.createElement('img');
		imageHolder.src = `${user.image}`;
		imgContainerDiv.append(imageHolder);

		let cardInfoContainer = document.createElement('div');
		cardInfoContainer.className = 'card-info-container';

		let cardName = document.createElement('h3');
		cardName.className = 'card-name cap';
		cardName.innerText = `${user.firstname} ${user.lastname}`;

		let email = document.createElement('p');
		email.className = 'card-text';
		email.innerText = `${user.email}`;

		let location = document.createElement('p');
		location.classList.add('card-text', 'cap');
		location.innerText = `${user.location.city} ${user.location.state}`;

		cardInfoContainer.append(cardName);
		cardInfoContainer.append(email);
		cardInfoContainer.append(location);

		divMainCard.append(imgContainerDiv);
		divMainCard.append(cardInfoContainer);

		gallery.append(divMainCard);
	}
}

/// Event listeners
//********** TEST BUTTON - REMOVE ME */
testButton.addEventListener('click', (e) => {
	fetch(userURL)
		.then(checkResponse)
		.then(JSON)
		.then(filterUsers)
		.then(createCards)
		.catch((e) => console.log(e));
});
