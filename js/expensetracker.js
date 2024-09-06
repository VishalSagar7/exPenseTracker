

  

const expenseTrackerBtn = document.getElementById('expense-tracker-form-btn');
const description = document.getElementById('item-description');
const amount = document.getElementById('item-amount');
const category = document.getElementById('item-catagory');
const userDataText = document.getElementById('user-data-text');
const ctx = document.getElementById('user-data-visuals').getContext('2d');

// Initialize the chart variable
let myChart;

var typed = new Typed('#taglinepara', {
    strings: ['<p>"Our financial tracker empowers you to effortlessly monitor your expenses, visualize spending patterns, and calculate taxes—all in one place. Take control of your finances with insightful analytics and personalized tax calculations that help you optimize your budget and achieve your financial goals."</p>'],
    typeSpeed: 30,
  });

// Function to get user expenses from localStorage
function getUserExpenses() {
    return JSON.parse(localStorage.getItem('userExpenseArray')) || [];
}

const userExpenses = getUserExpenses();
// console.log(userExpenses);




// Function to display user expenses
function displayUserExpenses() {
    const userExpenses = getUserExpenses();
    let snippet = '';
    let count = 1;
    // let totalSpent = 0;


    let totalAmount = userExpenses.reduce((acc, userExpense) => Number(userExpense.amount) + acc, 0);
    // console.log(totalAmount);

    const total = document.createElement('p');
    total.setAttribute('id', 'grandTotal');

    total.innerText = `Total : ₹${totalAmount} `;

    userExpenses.forEach((userExpense, index) => {
        snippet += `<div id="user-item">
                        <p>${count++}.</p>
                        <p>${userExpense.description}</p> :
                        <p> ₹ <span>${userExpense.amount}</span></p>
                        [<p>${userExpense.catagory}</p>]  
                        <div id="item-buttons">
                           <button id="edit-btn-${index}">Edit</button>
                           <button id="delete-btn-${index}">Delete</button>
                        </div>   
                    </div>`;
    });




    userDataText.innerHTML = snippet;
    userDataText.appendChild(total);

    userExpenses.forEach((_, index) => {
        const editBtn = document.getElementById(`edit-btn-${index}`);
        const deleteBtn = document.getElementById(`delete-btn-${index}`);

        editBtn.addEventListener('click', () => editExpense(index));
        deleteBtn.addEventListener('click', () => deleteExpense(index));
    });

    // Function to handle editing an expense
    function editExpense(index) {

        const userExpenses = getUserExpenses();
        const expenseToEdit = userExpenses[index];

        description.value = expenseToEdit.description;
        amount.value = expenseToEdit.amount;
        category.value = expenseToEdit.catagory;

        // Remove the expense to update it on re-submission
        userExpenses.splice(index, 1);
        localStorage.setItem('userExpenseArray', JSON.stringify(userExpenses));

        displayUserExpenses();
        displayVisuals();
    }

    // Function to handle deleting an expense
    function deleteExpense(index) {
        const userExpenses = getUserExpenses();

        // Remove the expense from the array
        userExpenses.splice(index, 1);
        localStorage.setItem('userExpenseArray', JSON.stringify(userExpenses));

        displayUserExpenses();
        displayVisuals();
    }
}

// Function to display visual representation of expenses
function displayVisuals() {
    const userExpenses = getUserExpenses();

    const categoryTotals = userExpenses.reduce((acc, expense) => {
        const category = expense.catagory;
        const amount = parseFloat(expense.amount);

        acc[category] = (acc[category] || 0) + amount;
        return acc;
    }, {});

    const categories = Object.keys(categoryTotals);
    const amounts = Object.values(categoryTotals);

    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: categories,
            datasets: [{
                label: 'Total Spending by Category',
                data: amounts,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
        }
    });
}


function handleExpenseSubmit(e) {
    e.preventDefault();

    if (!description.value || !amount.value || !category.value) {
        alert("Fill the inputs before submitting");
        return;
    }

    const newExpense = {
        description: description.value,
        amount: amount.value,
        catagory: category.value,
    };

    const userExpenseArray = getUserExpenses();
    userExpenseArray.push(newExpense);
    localStorage.setItem('userExpenseArray', JSON.stringify(userExpenseArray));
    window.location.reload();


    displayUserExpenses();
    displayVisuals();

    description.value = "";
    amount.value = "";
    category.value = "";
}

// Initialize the UI on page load
function init() {
    displayUserExpenses();
    displayVisuals();
}

// Event listener for the submit button
expenseTrackerBtn.addEventListener('click', handleExpenseSubmit);

// Initialize the application
init();




//  AI Integration

// console.log(userExpenses);


function displayAnsOnScreen(params) {
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'none';

    const userAnsDiv = document.getElementById('user-ans-div');

    // Replace * for bold, # for headings, and handle line breaks
    let formattedText = params
        .replace(/# (.+)/g, '<strong>$1</strong>')          // Convert # to strong for headings
        .replace(/\*([^*]+)\*/g, '<strong>$1</strong>')     // Convert *text* to <strong>text</strong>
        .replace(/\n/g, '<br>');                            // Convert newlines to <br> tags

    // Create a paragraph element and set its HTML content
    const ansPara = document.createElement('p');
    ansPara.setAttribute("id", "ansPara");
    // ansPara.setAttribute('class', 'tlt');
    userAnsDiv.innerText = ""
    ansPara.innerHTML = formattedText; // Use innerHTML for formatting

    userAnsDiv.appendChild(ansPara);
}



import { GoogleGenerativeAI } from "@google/generative-ai";




async function askQuestions(prompt) {
    let API_KEY = "AIzaSyA9j_aLpVhvoRtFdNxNEp0AQMgwl4aWc00";
    const genAI = new GoogleGenerativeAI(API_KEY);

    try {
        const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(prompt);

        const ans = result.response.candidates[0].content.parts[0].text;
        console.log(ans);
        
        
        displayAnsOnScreen(ans);



    } catch (error) {
        console.error("Error fetching from Gemini AI:", error);
    }
}

console.log(userExpenses.length);




document.getElementById('getinfo').addEventListener('click', () => {

    const ansDiv = document.getElementById('user-ans-div');
    ansDiv.innerText = "";
    const monthyIncome = document.getElementById('income-input').value
    const spinner = document.getElementById('spinner');
   
    if (userExpenses.length == 0) {
        alert("There are no purchased products in your list");
        return;
    }

    if (!monthyIncome) {
        alert("Please provide your monthly income");
        return;
    }

    spinner.style.display = 'block';



    let AskingPrompt = `my monthly income is ${monthyIncome} rupees and this object says my expenses information ${JSON.stringify(userExpenses)} according to my spending give me a short 200 to 300 word financial advise description, amount, and catagory is given in that object`;

    askQuestions(AskingPrompt);
 
    

});


function calculateTaxAndSalaryCut(salary) {
    let taxRate;

    switch (true) {
        case (salary <= 250000):
            taxRate = 0;
            break;
        case (salary <= 500000 && salary > 250001):
            taxRate = 5;
            break;
        case (salary <= 750000 && salary > 500001):
            taxRate = 10;
            break;
        case (salary <= 1000000 && salary > 750001):
            taxRate = 15;
            break;
        case (salary <= 1250000 && salary > 1000001):
            taxRate = 20;
            break;
        case (salary <= 1500000 && salary > 1250001):
            taxRate = 25;
            break;
        default:
            taxRate = 30;
            break;
    }

    let taxAmount = (taxRate / 100) * salary;
    let remainingIncome = salary - taxAmount;
    // console.log(remainingIncome);
    

    return {taxAmount : taxAmount,remainingSalary : remainingIncome};


}

function displayTaxAmount(tatalTax,remainingIncome) {
    document.getElementById('total-tax-amount').innerText = `Your total tax amount is ₹${tatalTax} and amout after tax cut is ₹${remainingIncome}`
}

document.getElementById('salaryCalculatebtn').addEventListener('click', (e) => {

    const salary = document.getElementById('tax-calculator-input').value
    e.preventDefault();

    if (!salary) {
        alert("Please enter your salary");
        return;
    }

    const taxObject = calculateTaxAndSalaryCut(salary);
    // console.log(taxObject.remainingIncome);
    
    displayTaxAmount(taxObject.taxAmount , taxObject.remainingSalary);
    
    
})



