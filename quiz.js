let allQuestion = "";
let totalMarks = 0;
let count = 0;
async function getUsers() {
    let url = 'quiz.json';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderUsers(id) {
    allQuestion = await getUsers();
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

renderUsers(1);

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

    if(selectAnswer == "") {
        // dont move to next question
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

    console.log(totalQuestion);
    if(answer == selectAnswer) {
        totalMarks++;
    }

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
    renderUsers(questionNumber+1);
}
