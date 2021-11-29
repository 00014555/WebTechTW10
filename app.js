let question = document.getElementById('question');
let answers = document.getElementById('answers');
let score = document.getElementById('score');
let nextBtn = document.getElementById('next-btn');

let currentQuestion = 0;
let scores = 0;


window.addEventListener('load', function () {

init (currentQuestion);
});

nextBtn.addEventListener('click', function() {
    currentQuestion++;
})

function init (current) {
    nextBtn.style.visibility = 'hidden';
    fetch('questions.json')
        .then(res => {
            return res.json();
        })
        .then(data => {
            setQuestion(data[current]);
        })
}        

function setQuestion (q) {
    question.textContent = q.question; 

    q.answers.forEach(answer => {
        let li = document.createElement('li');
        let span = document.createElement('span');
        let p = document.createElement('p');

        p.textContent = answer.value; 

        li.classList.add('answer');
        span.classList.add('answer-indicator');
        p.classList.add('answer-text');

        li.appendChild(span);
        li.appendChild(p);

        li.title = q.id;

        li.addEventListener('click', chooseAnswer);

        answers.appendChild(li);
    });
}

function chooseAnswer(event) {
    fetch('questions.json')
    .then(res => {
        return res.json();
    })
    .then(data => {
        for (let item of data) {
            if (item.id == event.target.title) {
                for (let a of item.answers) {
                    if (event.target.getElementsByTagName('p')[0].textContent == a.value) {
                        if (a.is) {
                            event.target.getElementsByTagName('span')[0].classList.add('green');
                            scoreAdd();
                            disable();
                            nextBtn.style.visibility = 'visible';

                        } else {
                            event.target.getElementsByTagName('span')[0].classList.add('red');
                            scoreSub();
                        }
                    }
                }
            }
        }

    })
}

function scoreAdd() {
    score.textContent = `Overall score: ${ scores = scores + 5}`;
}

function scoreSub() {
    score.textContent = `Overall score: ${ scores = scores - 2}`;
}

function disable() {
    let lis = document.querySelectorAll('li');

    lis.forEach(li => {
        li.removeEventListener('click', chooseAnswer, false);
    })
}
