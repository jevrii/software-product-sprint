// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random greeting to the page.
 */
function addRandomGreeting() {
  const greetings =
      ['Hello world!', '¡Hola Mundo!', '你好，世界！', 'Bonjour le monde!'];

  // Pick a random greeting.
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Add it to the page.
  const greetingContainer = document.getElementById('greeting-container');
  greetingContainer.innerText = greeting;
}

function loadContent() {
    addComments();
    setFormVisibilityBasedOnLogin();
}

function addComments() {
  fetch('/data').then(response => response.json()).then((comments) => {
    // stats is an object, not a string, so we have to
    // reference its fields to create HTML content
    console.log(comments);

    const commentsListElement = document.getElementById('comments-container');
    commentsListElement.innerHTML = '';

    var i;
    for (i = 0; i < comments.length; i++) {
        commentsListElement.appendChild(createListElement(comments[i].email + ": " + comments[i].comment));
    }
  });
}

function setFormVisibilityBasedOnLogin() {
    fetch('/login_status').then(response => response.json()).then((login_status) => {
    // stats is an object, not a string, so we have to
    // reference its fields to create HTML content
    if (login_status.logged_in == true) {
        document.getElementById("comment_form").style.display = "block";
        document.getElementById("comments_form_hide_msg").style.display = "none";
        document.getElementById("login_button").style.display = "none";
        document.getElementById("logout_button").style.display = "block";
        document.getElementById("logout_button").href = login_status.logoutUrl;
    }
    else {
      document.getElementById("comment_form").style.display = "none";
      document.getElementById("comments_form_hide_msg").style.display = "block";
      document.getElementById("login_button").style.display = "block";
      document.getElementById("logout_button").style.display = "none";
      document.getElementById("login_button").href = login_status.loginUrl;
    }
  });
}

/** Creates an <li> element containing text. */
function createListElement(text) {
  const liElement = document.createElement('li');
  liElement.innerText = text;
  return liElement;
}