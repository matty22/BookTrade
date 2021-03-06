
// Function that edits a user profile
function userEdited() {

  let user = JSON.parse(localStorage.getItem('user'));
  let userObj = {};

  userObj.id = user._id;
  userObj.name = document.getElementById('name').value;
  userObj.city = document.getElementById('city').value;
  userObj.state = document.getElementById('state').value;

  if (userObj.id) {
    // Setup data object to send to Express route
    var json = JSON.stringify(userObj);
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', 'https://matty22booktrade.herokuapp.com/users/edit/data', true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onload = function() {
        if (xhr.status === 200) {
          window.location = '/books'
        }
        else {
            console.error("you suck: signup.js page");
        }
    }
    xhr.send(json);
  }
}