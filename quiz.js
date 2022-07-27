let allQuestion = "";
let totalMarks = 0;
let count = 0;

const getAllQuestionFromJson = async() => {
    const response = await fetch("quiz.json");
    const data = await response.json();

    return data;
}

getAllQuestionFromJson().then(data => {
    // asign data into global variable
    allQuestion = data;
    renderQuestion(1);
});

const renderQuestion = id => {
    totalQuestion = Object.keys(allQuestion).length;
    document.querySelector("#numberQuestion").innerText = id;
    const ques = document.querySelector("#question");
    ques.innerText = allQuestion[id].question;
    
    const options = allQuestion[id].option;
    const optionQuestion = Object.keys(options);
    optionQuestion.forEach((key, index) => {

        const breakQuestion = document.createElement("br");
        ques.appendChild(breakQuestion);

        const para = document.createElement("input");
        para.setAttribute('type','radio');
        para.setAttribute('value',key);
        para.setAttribute('name',"option");
        para.setAttribute('id','option-'+key);
        ques.appendChild(para);

        const labelQuestion = document.createElement("label");
        labelQuestion.innerText = key+". "+options[key];
        ques.appendChild(labelQuestion);

    });
}

const next = () => {
    // check what question is now
    const question = document.querySelector("#numberQuestion");
    questionNumber = parseInt(question.textContent);
    const answer = allQuestion[questionNumber].answer;

    const optionA = document.querySelector("#option-A").checked;
    const optionB = document.querySelector("#option-B").checked;
    const optionC = document.querySelector("#option-C").checked;
    const optionD = document.querySelector("#option-D").checked;

    let selectAnswer = "";
    if(optionA) selectAnswer = "A";
    if(optionB) selectAnswer = "B";
    if(optionC) selectAnswer = "C";
    if(optionD) selectAnswer = "D";

    // if user not key in answer, dont let user move to next question
    if(selectAnswer == "") {
        const ques = document.querySelector("#question");

        const alertCheck = document.querySelector("#alertQuestion");
        
        if(!alertCheck) {
            const alertQuestion = document.createElement("div");
            alertQuestion.setAttribute("id", "alertQuestion");
            alertQuestion.innerText = "Please select the answer.";
            alertQuestion.style.color = "red";
            ques.appendChild(alertQuestion);
        }

        return;
    }

    // total marks if correct
    if(answer == selectAnswer) {
        totalMarks++;
    }

    // if last question,  we remove all div and display result
    if(questionNumber == totalQuestion) {
        const questitle = document.querySelector("#questionTitle");
        questitle.remove();
        const nextButton = document.querySelector("#nextButton");
        nextButton.remove();
        const ques = document.querySelector("#question");
        ques.innerHTML = "Results: <br />";
        ques.innerHTML += `${totalMarks} of ${totalQuestion} questions answered correctly`;

        return;
    }
    // change question
    renderQuestion(questionNumber+1);
}
