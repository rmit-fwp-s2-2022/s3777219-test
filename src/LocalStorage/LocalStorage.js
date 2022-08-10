const USERS_KEY = "users";
const USER_KEY = "user";

// Initialise local storage "users" with data, if the data is already set this function returns immediately.
function initUsers() {
  // Stop if data is already initialised.
  if (localStorage.getItem(USERS_KEY) !== null) return;

  // User data is hard-coded, passwords are in plain-text.
  const users = [
    {
      email: "hoanglongnguyen733@gmail.com",
      username: "long",
      password: "123",
    },
    {
      email: "tania",
      password: "456",
    },
  ];

  // Set data into local storage.
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getUsers() {
  // Extract user data from local storage.
  const data = localStorage.getItem(USERS_KEY);

  // Convert data to objects.
  return JSON.parse(data);
}

// NOTE: In this example the login is also persistent as it is stored in local storage.
function verifyUser(username, email, password) {
  const users = getUsers();
  for (const user of users) {
    if (
      email === user.email &&
      username === user.username &&
      password === user.password
    ) {
      setUser(username);
      return true;
    }
  }

  return false;
}

function setUser(username) {
  localStorage.setItem(USER_KEY, username);
}

function getUser() {
  return localStorage.getItem(USER_KEY);
}

function removeUser() {
  localStorage.removeItem(USER_KEY);
}

export { initUsers, verifyUser, getUser, removeUser };
