// popup.js

document.addEventListener('DOMContentLoaded', function () {
  var captureButton = document.getElementById('captureButton');

  captureButton.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var tab = tabs[0];

      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
          function: captureSelectedText,
        },
        function (result) {
          var selectedText = result[0].result;
          console.log('Selected Text:', selectedText);

          const heading = document.createElement('h1');
          heading.textContent = selectedText ? 'Your selected text is:' : 'No text selected';

          const displayText = document.createElement('p');
          displayText.textContent = selectedText;

          document.body.appendChild(heading);
          document.body.appendChild(displayText);
        }
      );
    });
  });
});

function captureSelectedText() { // returns the selected text
  return window.getSelection().toString();
}
