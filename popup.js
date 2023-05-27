document.addEventListener('DOMContentLoaded', function () {

  // set up the button click handler
  let captureButton = document.getElementById('captureButton');
  let selectedTextDiv = document.getElementById('selectedText');

  // initialize the selected text
  updateUserSelectedText('No text selected');

  captureButton.addEventListener('click', function () {

    // get the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let tab = tabs[0];

      // execute the script on the active tab
      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
          function: captureSelectedText,
        },
        // handle the results of the script execution
        function (result) {
          let selectedText = result[0].result;
          let formatSelectedText = selectedText.substring(0, 250) + '...' + selectedText.split(' ').pop();

          formatSelectedText ? captureButton.innerText = 'View Text' : captureButton.innerText = 'Capturing...';
          updateUserSelectedText(formatSelectedText);

          // store the selected text to local storage
          let storeButton = document.createElement('button')
          storeButton.innerText = 'Store Text';
          document.body.appendChild(storeButton);

          storeButton.addEventListener('click', function () {
            chrome.storage.local.set({ 'selectedText': selectedText }, function () {
            });
          });

          // get the stored text from local storage
          chrome.storage.local.get(['selectedText'], function (result) {
            let storedVariable = result.selectedText;
          });

          // Perform task
          let optionButton = document.createElement('button')
          optionButton.innerText = 'Perform Operation';
          document.body.appendChild(optionButton);

          // template for prompt
          let promptBeginning = ''

          let promptInitial = document.createElement('input')
          promptInitial.setAttribute('type', 'text')
          promptInitial.setAttribute('id', 'promptInitial')
          promptInitial.setAttribute('placeholder', 'What do you want to do with the selected text?')
          document.body.appendChild(promptInitial)

          promptInitial.addEventListener('change', function () {
            promptBeginning = promptInitial.value
          })

          const promptList = ['Give summary of the text', 'Give related words', 'Spanish version of', 'Easily explain the text']

          const promptExamples = document.createElement('ul')

          promptExamples.setAttribute('id', 'promptExamples')
          for (i = 0; i < promptList.length; i++) {
            const promptExample = document.createElement('li')
            promptExample.innerText = promptList[i]
            promptExamples.appendChild(promptExample)
          }
          document.body.appendChild(promptExamples)

          // fetch data from openai
          optionButton.addEventListener('click', fetchData(selectedText, promptBeginning))
        }

      );
    });
  });
  // update the selected text
  function updateUserSelectedText(text) {
    selectedTextDiv.innerHTML = text;
  }
});

// fetch data from openai
const fetchData = async (promptBeginning, selectedText) => {

  const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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'
    },
    body: JSON.stringify({
      prompt: `${promptBeginning} ${selectedText}`,
      temperature: 0.9,
      max_tokens: 2048,
      frequency_penalty: 0.5,
      presence_penalty: 0
    })
  })

  if (response.ok) {
    const data = await response.json()
    const answer = data.choices[0].text
    console.log(answer)
  }
  else {
    console.log(response)
  }
}

function captureSelectedText() { // returns the selected text
  return window.getSelection().toString();
}
