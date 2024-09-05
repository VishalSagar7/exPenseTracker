
const sendMsgBtn = document.getElementById('chat-input-send-btn');
const spinner = document.getElementById('spinner');
// Function to format text by replacing ** with <strong> for bold formatting
// Function to format text by replacing ** with <strong> for bold formatting and * with line breaks
function formatText(text) {
    // Replace ** with <strong> for bold formatting
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Replace single * with line breaks
    formattedText = formattedText.replace(/\*(.*?)\*/g, '<br>$1<br>');

    return formattedText;
}

// Function to display formatted text on screen
function displayOnScreen(yourQuestion, ans) {
    const mainDiv = document.getElementById('chat-bot-child-div');

    // Format the bot's answer
    const formattedAnswer = formatText(ans);

    // Create HTML for the question and answer
    const yourQuestionPara = `<p id="your-question"><span>You: </span>${yourQuestion}</p>`;
    const botAnsPara = `<p id="chatbots-ans"><span>Bot: </span>${formattedAnswer}</p>`;

    // Create a container for the conversation
    const box = document.createElement('div');
    box.setAttribute('id', "conversation-box");

    // Set the innerHTML of the container to include both question and answer
    box.innerHTML = yourQuestionPara + botAnsPara;

    // Append the container to the main div
    mainDiv.appendChild(box);
    spinner.style.display = 'none';
    sendMsgBtn.style.backgroundColor = 'rgb(7, 130, 179)'


}







import { GoogleGenerativeAI } from "@google/generative-ai";
  let API_KEY = "AIzaSyA9j_aLpVhvoRtFdNxNEp0AQMgwl4aWc00";
const genAI = new GoogleGenerativeAI(API_KEY);
let btn = document.querySelector(".btn");
let messageContainer = document.querySelector("#msg-container");

async function askQuestions(userInput) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


    const prompt = userInput;

    const result = await model.generateContent(prompt);
  
    const response = await result.response

    
    
    console.log(response);
    
    const text = response.text();
    // console.log(text);


    displayOnScreen(userInput,text)


}






sendMsgBtn.addEventListener('click', () => {
    
    const input = document.getElementById('chatbot-input');
    const userInput = input.value;

    if (!userInput) {
        alert("Please give input");
        return;
    }
    spinner.style.display = 'block';

    askQuestions(userInput);

    // Clear the input box after calling askQuestions
    input.value = "";

    sendMsgBtn.style.backgroundColor = 'rgb(81, 186, 227)'


});






//