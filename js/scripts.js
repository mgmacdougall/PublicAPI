const gallery = document.getElementById('gallery');
const userCards = document.getElementsByClassName('card');
const searchContainer = document.querySelector('.search-container');

/// Script constants
const userURL = 'https://randomuser.me/api/?results=12';
let userData = []; // user object array
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

function setUserId() {
	return Math.floor(Math.random() * 1000);
}

/**
 * Filters out the users
 * @param {*} data
 */
function filterUsers(data) {
	userData = data.results.map((person) => {
		return getFilteredUserData(person);
	});
	return userData;
}

/**
 * Pulls off the object values need to create the user information
 * @param {*} data
 */
function getFilteredUserData(data) {
	let result = {};
	result['id'] = setUserId();
	result['firstname'] = data.name.first;
	result['lastname'] = data.name.last;
	result['image'] = data.picture.large;
	result['email'] = data.email;
	result['location'] = data.location;
	result['dateofbirth'] = data.dob.date;
	result['phone'] = data.phone;
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
		divMainCard.id = `${user.id}`;

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
		location.innerText = `${user.location.city}, ${user.location.state}`;

		cardInfoContainer.append(cardName);
		cardInfoContainer.append(email);
		cardInfoContainer.append(location);

		divMainCard.append(imgContainerDiv);
		divMainCard.append(cardInfoContainer);

		gallery.append(divMainCard);
		addClickEventToCards(divMainCard);
	}
}

/**
 * Removes all exisiting cards from the gallery board
 */
function removeExistingCards() {
	if (userCards.length > 0) {
		for (let card of userCards) {
			card.remove();
		}
	}
}

/**
 * Creates the modal for the card selected
 */
function createModal(id) {
	// Look up the user in the user data to get info needed for the user
	let dataForUserModal = userData.filter((user) => user['id'] == id);

	for (let userData of dataForUserModal) {
		let modalContainer = document.createElement('div');
		modalContainer.className = 'modal-container';

		let modalDiv = document.createElement('div');
		modalDiv.className = 'modal';

		let closeButton = document.createElement('button');
		closeButton.type = 'button';
		closeButton.id = 'modal-close-btn';
		closeButton.className = 'modal-close-btn';

		let moodalInfoContainer = document.createElement('div');
		moodalInfoContainer.className = 'modal-info-container';

		let modalImage = document.createElement('img');
		modalImage.className = 'modal-img';
		modalImage.alt = 'profile picture';
		modalImage.src = `${userData.image}`;

		let modalUserName = document.createElement('h3');
		modalUserName.id = 'name';
		modalUserName.classList.add('modal-name', 'cap');
		modalUserName.innerText = `${userData.firstname} ${userData.lastname}`;

		let modalEmail = document.createElement('p');
		modalEmail.className = 'modal-text';
		modalEmail.innerText = `${userData.email}`;

		let modalLocation = document.createElement('p');
		modalLocation.classList.add('modal-name', 'cap');
		modalLocation.innerText = `${userData.location.city}`;

		let space = document.createElement('hr');

		let modalPhone = document.createElement('p');
		modalPhone.className = 'modal-text';
		modalPhone.innerText = `${userData.phone}`;

		let modalAddress = document.createElement('p');
		modalAddress.className = 'modal-text';
		modalAddress.innerText = `${userData.location.street.number}, ${userData.location.street.name}, ${userData.location.city} ${userData.location.state} ${userData.location.postalcode} `;

		let modalBirthday = document.createElement('p');
		modalBirthday.className = 'modal-text';
		modalBirthday.innerText = `${userData.dateofbirth}`;

		moodalInfoContainer.append(modalImage);
		moodalInfoContainer.append(modalUserName);
		moodalInfoContainer.append(modalEmail);
		moodalInfoContainer.append(modalLocation);
		moodalInfoContainer.append(space);
		moodalInfoContainer.append(modalPhone);
		moodalInfoContainer.append(modalAddress);
		moodalInfoContainer.append(modalBirthday);
		modalDiv.append(moodalInfoContainer);
		modalDiv.append(closeButton);
		modalContainer.append(modalDiv);

		document.body.appendChild(modalContainer);
		closeModal();
	}
}

function createSearchBar() {
	let searchForm = document.createElement('form');
	searchForm.action = '#';
	searchForm.method = 'GET';

	let searchInput = document.createElement('input');
	searchInput.type = 'search';
	searchInput.id = 'search-input';
	searchInput.className = 'search-input';
	searchInput.placeholder = 'Search...';

	let submitButton = document.createElement('input');
	submitButton.type = 'submit';
	submitButton.value = '\u{1F50D}';
	submitButton.id = 'search-submit';
	submitButton.className = 'search-submit';

	searchForm.append(searchInput);
	searchForm.append(submitButton);
	addSubmitEventHandlerToSearch(searchForm);

	searchContainer.append(searchForm);
}

function closeModal() {
	const modalButton = document.querySelector('#modal-close-btn');
	const modalDialog = document.getElementsByClassName('modal-container');
	modalButton.addEventListener('click', (e) => modalDialog[0].remove());
}

/**
 * Adds a click event to the card that launches the modal for the user
 * @param {*} card
 */
function addClickEventToCards(card) {
	card.addEventListener('click', (e) => {
		let parentCard = e.target.closest('.card');
		let searchId = parentCard.id;
		createModal(searchId);
	});
}

function addSubmitEventHandlerToSearch(value) {
	value.addEventListener('submit', (e) => {
		let form = document.getElementById('search-input');
		let searchValue = form.value;
		searchUsers(searchValue);
		e.preventDefault();
	});
}

// Search functionality
function searchUsers(value) {
	let foundUserId = -1;
	let resultArray = [];
	for (let user of userData) {
		if (`${user.firstname} ${user.lastname}` === value) {
			foundUserId = user.id;
			break;
		}
	}

	// Now search the existing users usersData for the id
	for (let user of userData) {
		if (user.id == foundUserId) {
			resultArray.push(user);
			break;
		}
	}

	// now display the card
	if (foundUserId > -1) {
		removeExistingCards(); // remove existing cards
		createCards(resultArray);
	}
}

/// Event listeners
document.addEventListener('DOMContentLoaded', (e) => {
	removeExistingCards(); // remove existing cards from gallery

	fetch(userURL)
		.then(checkResponse)
		.then(JSON)
		.then(filterUsers)
		.then(createCards)
		.then(createSearchBar)
		.catch((e) => console.log(e));
});
