const testButton = document.getElementById('testbutton');

/// Script constants
const userURL = 'https://randomuser.me/api/?results=12';
const users = []; // used to store resulting users
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
 * @param {*} d
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

/// Event listeners
//********** TEST BUTTON - REMOVE ME */
testButton.addEventListener('click', (e) => {
	fetch(userURL)
		.then(checkResponse)
		.then(JSON)
		.then(filterUsers)
		.then((v) => console.log(v))
		.catch((e) => console.log(e));
});
