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

/**
 * Filters out the users
 * @param {*} data
 */
function filterUsers(data) {
	userData = data.results.map((person, idx) => {
		return getFilteredUserData(person, idx);
	});
	return userData;
}

/**
 * Pulls off the object values need to create the user information
 * @param {*} data
 */
function getFilteredUserData(data, id) {
	let result = {};
	result['id'] = id;
	result['firstname'] = data.name.first;
	result['lastname'] = data.name.last;
	result['image'] = data.picture.large;
	result['email'] = data.email;
	result['location'] = data.location;
	result['dateofbirth'] = data.dob.date;
	result['phone'] = data.phone;
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
		imageHolder.className = 'card-img';
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
		moodalInfoContainer.id = `${userData.id}`;

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
		modalAddress.innerText = `${userData.location.street.number}, ${userData.location.street.name}, ${userData.location.city} ${userData.location.state} ${userData.location.postcode} `;

		let modalBirthday = document.createElement('p');
		modalBirthday.className = 'modal-text';
		modalBirthday.innerText = `Birthday: ${formatDate(userData.dateofbirth)}`;

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
		createNavBar(modalContainer);
		document.body.appendChild(modalContainer);
		closeModal();
		keyCloseModal();
		addNextListener();
		addPreviousListener();
	}
}

// Create next and previous for the modal dialog
function createNavBar(dialog) {
	const modalButtonContainer = document.createElement('div');
	modalButtonContainer.className = 'modal-btn-container';

	let modalPrevButton = document.createElement('button');
	modalPrevButton.type = 'button';
	modalPrevButton.id = 'modal-prev';
	modalPrevButton.classList.add('modal-prev', 'btn');
	modalPrevButton.innerText = 'Previous';

	let modalNextButton = document.createElement('button');
	modalNextButton.type = 'button';
	modalNextButton.id = 'modal-next';
	modalNextButton.classList.add('modal-next', 'btn');
	modalNextButton.innerText = 'Next';

	modalButtonContainer.appendChild(modalPrevButton);
	modalButtonContainer.appendChild(modalNextButton);
	dialog.append(modalButtonContainer);
}

// Next button listener
function addNextListener() {
	let nextButton = document.querySelector('#modal-next');
	let totalVisibleCards = [...document.querySelectorAll('div.card:not(.hidden)')];
	let currentVisibleName = document.querySelector('.modal-info-container h3').innerText;

	let idxInView = totalVisibleCards.findIndex((card) => card.querySelector('h3').innerText === currentVisibleName);
	let nextCard = (idxInView += 1);

	if (idxInView > -1 && idxInView < totalVisibleCards.length) {
		nextButton.addEventListener('click', (e) => {
			let nextCardIdx = totalVisibleCards[nextCard].id;
			removeCurrentModal(e);
			createModal(nextCardIdx);
		});
	} else {
		disableButton(nextButton);
	}
}

// Previous button listener
function addPreviousListener() {
	let previousButton = document.querySelector('#modal-prev');
	let totalVisibleCards = [...document.querySelectorAll('div.card:not(.hidden)')];
	let currentVisibeName = document.querySelector('.modal-info-container h3').innerText;

	let idxInView = totalVisibleCards.findIndex((card) => card.querySelector('h3').innerText === currentVisibeName);
	let previousCard = (idxInView -= 1);

	if (idxInView >= 0) {
		previousButton.addEventListener('click', (e) => {
			let previousCardIdx = totalVisibleCards[previousCard].id;
			removeCurrentModal(e);
			createModal(previousCardIdx);
		});
	} else {
		disableButton(previousButton);
	}
}

/**
 * Disables the given button
 * @param {*} button
 */
function disableButton(button) {
	button.classList.add('btn-disabled');
	button.disabled = 'true';
	button.style['pointer-events'] = 'none';
}

// remove current modal container
function removeCurrentModal(element) {
	element.target.parentElement.parentElement.remove();
}

/**
 * Returns the date in d-m-YYYY format (for example: 4-5-1971)
 * @param {*} longdate
 */
function formatDate(longdate) {
	let date = new Date(longdate).toISOString().split('T')[0];
	return date;
}

/**
 * Create the search bar
 */
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

	let resetButton = document.createElement('input');
	resetButton.type = 'reset';
	resetButton.value = 'Reset';
	resetButton.id = 'reset-search';
	resetButton.className = 'search-submit';

	searchForm.append(searchInput);
	searchForm.append(submitButton);
	searchForm.append(resetButton);

	addSubmitEventHandlerToSearch(searchForm);
	addResetEventHandlerToSearch(searchForm);
	searchContainer.append(searchForm);
}

/**
 * Close the modal dialog
 */
function closeModal() {
	const modalButton = document.querySelector('#modal-close-btn');
	const modalDialog = document.getElementsByClassName('modal-container');
	modalButton.addEventListener('click', (e) => modalDialog[0].remove());
}

function keyCloseModal() {
	const modalContainer = document.querySelector('.modal-container');
	window.addEventListener('keydown', function _keyAction(e) {
		if (e.key === 'Escape') {
			modalContainer.remove();
			window.removeEventListener('keydown', _keyAction);
		}
	});
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

/**
 * Search event handler
 * @param {*} value
 */
function addSubmitEventHandlerToSearch(value) {
	value.addEventListener('submit', (e) => {
		let form = document.getElementById('search-input');
		let searchValue = form.value;
		searchUsers(searchValue);
		form.value = '';
		e.preventDefault();
	});
}

/**
 * Responsible for resetting the search results back to all users
 * @param {*} value
 */
function addResetEventHandlerToSearch(value) {
	value.addEventListener('reset', (e) => {
		unHideUser();
	});
}

/**
 * Hides the array of users passed in
 * @param {*} userCards
 */
function hideUsers(userCards) {
	let cards = [...document.getElementsByClassName('card')];
	for (user of userCards) {
		let idx = parseInt(user.id);
		cards[idx].classList.add('hidden');
	}
}

/**
 * Changes all cards to visible
 */
function unHideUser() {
	let cards = [...document.querySelectorAll('.hidden')];
	cards.forEach((card) => {
		card.classList.remove('hidden');
	});
}

/**
 * Search for users names  must be full name only
 * @param {*} value
 */
function searchUsers(value) {
	let foundUserId = -1;
	let usersToDisplay = []; // array of found users
	let usersToHide = []; // array of

	for (let user of userData) {
		if (`${user.firstname} ${user.lastname}`.includes(value)) {
			foundUserId = user.id;
			usersToDisplay.push(user);
		} else {
			usersToHide.push(user);
		}
	}

	hideUsers(usersToHide);
}

/**
 * Display an error message to the console
 * @param {*} err
 */
function displayErrorMsg(err) {
	console.log(Error(err));
}

/**
 * Main fetch event listener for the application
 */
document.addEventListener('DOMContentLoaded', (e) => {
	fetch(userURL)
		.then(checkResponse)
		.then(JSON)
		.then(filterUsers)
		.then(createCards)
		.then(createSearchBar)
		.catch(displayErrorMsg);
});
