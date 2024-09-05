const textInput = document.getElementById('tex-area-div')
const submitbtn = document.getElementById('submit-btn')
const child2div = document.getElementById('child-2');
const emptyline = document.getElementById('empty-line');



submitbtn.addEventListener('click', () => {
    const textInput = document.getElementById('tex-area-div');
    console.log(textInput.value);

    if (!textInput.value) {
        alert("please give an input");
        return;
    }




    
    const bgcolorinput = document.getElementById('color-input');
    const bgcolor = bgcolorinput.value;
    console.log(bgcolor);
     

    const text = textInput.value
    emptyline.innerText = "";
    textInput.innerText = "";

    const div = document.createElement('div');
    div.style.borderRadius = '5px'
    const p = document.createElement('p');
    const crossbtn = document.createElement('button');

    crossbtn.style.marginLeft = 'auto'
    crossbtn.innerText = 'X';
    crossbtn.style.width = '20px'
    crossbtn.style.height = '20px'
    crossbtn.style.backgroundColor = 'rgb(40,162,211)'
    crossbtn.style.borderRadius = '50%'
    crossbtn.style.outline = 'none';
    crossbtn.style.border = 'none'

    div.style.display = 'flex'
    div.style.padding = '10px'
    div.style.height = '150px';
    div.style.width = '150px';
    div.style.fontSize = '15px'
    // div.style.backgroundColor = 'yellow';
    div.style.backgroundColor = bgcolor;
    div.style.color = 'white'
    
    div.appendChild(p);
    div.appendChild(crossbtn);
    p.innerText = text;

    child2div.appendChild(div);

    crossbtn.addEventListener('click', () => {
        div.style.display = 'none'
    });


    textInput.value = "";

})