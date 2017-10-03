
// On page load, grab all the books available in the database and display to user
window.onload = function() {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000/books/data', true);
  xhr.onload = function() {
      if (xhr.status === 200) {
        let bookArray = JSON.parse(xhr.responseText);
        bookArray.forEach(function(element) {
          let cardChild = document.createElement("div");
          cardChild.innerHTML = "<img class='bookImage' src='" + element.image_url +"'><input id='" + element._id + "'type='button' value='Request Book' onclick='requestBook(event)'>";
          document.getElementById("library").appendChild(cardChild);
        });
      }
      else {
          alert("You done goofed");
      }
  }
  xhr.send();
}


// Upon book request, find the book in the database, then find the owner of that book
// and add that book to their requests array
function requestBook(event) {

  // First, find the requested book
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000/books/data/request/' + event.srcElement.id, true);
  xhr.onload = function() {
      if (xhr.status === 200) {
        
        // Then, find that book's owner and stick the returned book object in their requests array
        let responseArray = JSON.parse(xhr.responseText);
        let response = responseArray[0];
        console.log(response);
        
        let bookXhr = new XMLHttpRequest();
        bookXhr.open('PUT', 'http://localhost:3000/users/request/data?owner=' + response.owner + '&bookId=' + response._id, true);
        bookXhr.onload = function() {
            if (bookXhr.status === 200) {
             console.log("This is the updated user: " + bookXhr.responseText);
            }
            else {
                alert("You done goofed");
            }
        }
        bookXhr.send();
      }
      else {
          alert("You done goofed");
      }
  }
  xhr.send();
}