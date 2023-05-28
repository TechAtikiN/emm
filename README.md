# EMM!📚

### EMM! is a Chrome extension that allows you to capture selected text from webpages, customize prompts, and fetch relevant information using OpenAI's API.
<br>

# Technologies used
- [x] Chrome Extension APIs
- [x] JavaScript
- [x] HTML
- [x] CSS
- [x] OpenAI API
- [x] Fetch API
<br>

# How it works?
📌 **Captures** selected text from the active tab of the browser<br>
💾 **Stores** the captured text in local storage for future reference.<br>
📋 **Displays** list of captured texts on the webpage.<br>
✅ **Select** a text from the list.<br>
💭 **Handles** user prompts to customize the generated prompt for OpenAI's text completion API.<br>
🔎 **Fetches** relevant data from the OpenAI API.
📊 Displays the response from the OpenAI API

## Setup Guide

<details>
<summary>Clone the Repository</summary>
1. Clone the EMM! repository from GitHub to your local machine.<br>
2. Open the `popup.js` file and replace `API_KEY` with your OpenAI API Key.
</details>

<details>
<summary> Open Chrome Extensions</summary>
1. In the top-right corner of the Chrome Extensions page, toggle the Developer mode switch to enable it. <br>
2. Click on the "Load unpacked" button and   Navigate to the cloned EMM! repository folder on your local machine, select it and load the extension.
</details>

<details>
<summary> Verify in the browser</summary>
1. EMM appears in the list of installed  extensions on the Chrome Extensions page. Enable it.<br>
2. Click on the extension icon to capture selected text, customize prompts, and fetch relevant information.
</details>

<details>
<summary> Explore EMM!</summary>
1. Capture selected text by selecting it on the webpage.<br>
2. The captured text will be stored locally and displayed in a scrollable list on the extension's popup.<br>
3. Select a text from the list to customize prompts for fetching information.<br>
4. Use the provided input field to modify the prompt.<br>
5. Click the "Do Something!" button to fetch data using OpenAI's API.<br>
6. The response from the API will be displayed below.<br>
7. Repeat
</details>
