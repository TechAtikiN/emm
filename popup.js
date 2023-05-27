let userSelectedTexts = [];
let finalSelectedText = ''
let promptBeginning = ''

document.addEventListener('DOMContentLoaded', function () {

  // remove the item from local storage
  // chrome.storage.local.remove('userSelectedTexts', function () {
  //   console.log('Item removed from local storage.');
  // });

  // get the stored array
  chrome.storage.local.get(['userSelectedTexts'], function (result) {
    userSelectedTexts = result.userSelectedTexts;
  });

  // get the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let tab = tabs[0];

    // execute the script on the active tab
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        function: captureSelectedText,
      },
      function (result) {
        let selectedText = result[0].result;
        let formatSelectedText = selectedText?.substring(0, 250) + '...' + selectedText.split(' ').pop();

        userSelectedTexts.push(selectedText);
        userSelectedTexts = userSelectedTexts.filter(item => item != '')
        userSelectedTexts = userSelectedTexts.reverse()

        let selectedTextsList = document.getElementById('selectedTextsList');
        for (i = 0; i < userSelectedTexts.length; i++) {
          const text = document.createElement('li')
          text.innerText = userSelectedTexts[i]
          selectedTextsList.appendChild(text)
        }

        const handleClick = (e) => {
          let target = e.target
          if (target.tagName === 'LI') {
            handleOnClickLi(target)
          }
        }

        const handleOnClickLi = (selectedLi) => {
          const previouslySelectedLi = document.querySelector('li.selected');
          if (previouslySelectedLi) {
            previouslySelectedLi.classList.remove('selected');
          }

          selectedLi.classList.add('selected')
          finalSelectedText = selectedLi.textContent
          console.log('finalSelectedText', finalSelectedText)
          return finalSelectedText
        }

        var liElements = document.querySelectorAll("li");
        let liArray = []
        for (var i = 0; i < liElements.length; i++) {
          liArray.push(liElements[i].textContent)
        }

        selectedTextsList.addEventListener("click", handleClick);


        console.log('finalSelectedText', finalSelectedText)

        // store the array in local storage
        chrome.storage.local.set({ 'userSelectedTexts': userSelectedTexts }, function () {
          console.log('Text is stored in local storage', userSelectedTexts);
        });

        // Perform task
        let optionButton = document.createElement('button')
        optionButton.innerText = 'Do Something!';
        optionButton.classList.add('do-something')
        document.body.appendChild(optionButton);

        // template for prompt

        // handle prompt
        promptBeginning = handlePrompt(promptBeginning)

        // fetch data from openai
        optionButton.addEventListener('click', fetchData)

        //answer from openai
        let answer = document.createElement('div')
        answer.setAttribute('id', 'answer')
        document.body.appendChild(answer)
      }
    );
  });

  // handle prompt
  const handlePrompt = (promptBeginning) => {
    let promptInitial = document.createElement('input')
    promptInitial.setAttribute('type', 'text')
    promptInitial.setAttribute('id', 'promptInitial')
    document.body.appendChild(promptInitial)
    promptInitial.setAttribute('placeholder', 'Something like??')

    promptInitial.addEventListener('change', function () {
      promptBeginning = promptInitial.value
    })

    const promptList = ['Give summary of the text', 'Give related words of', 'Explain in detail', 'Easily explain the text']

    const promptExamples = document.createElement('ul')
    promptExamples.setAttribute('id', 'promptExamples')

    for (i = 0; i < promptList.length; i++) {
      const promptExample = document.createElement('li')
      promptExample.innerText = promptList[i]
      promptExamples.appendChild(promptExample)
    }

    document.body.appendChild(promptExamples)

    return promptBeginning
  }
});

// fetch data from openai
const fetchData = async () => {

  console.log(`${promptBeginning} ${finalSelectedText}`)
  const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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'
    },
    body: JSON.stringify({
      prompt: `${promptBeginning} ${finalSelectedText}`,
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
    document.getElementById('answer').innerText = answer
  }
  else {
    console.log(response)
  }
}

// capture the selected text
const captureSelectedText = () => { // returns the selected text
  return window.getSelection().toString();
}
