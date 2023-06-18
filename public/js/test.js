// Store the chatGPT generated questions in local storage with the key being the question answer pair.
// This means when we reset the session storage, the keys are not affected and the answers can persist over multiple browses to reduce the load on the API.
// Each time a quiz is completed, a score will be shown and each local storage KV pair for each question answer pair will be removed.
// chatGPT answers are generated if the local storage does not currently contain
var questionObject;
var currentQuestion;
var selectedAnswers;
var currentTopicID;

/**
 * Load the topics from session storage.
 */
const loadTopics = () => {
    const topicnav = document.getElementById('topicnav');
    const sessionKeys = Object.keys(sessionStorage);
    
    for (var i = 0; i < sessionKeys.length; i++) {
        addNewTopic()

        var topicAnchors = topicnav.getElementsByClassName('topic');
        var topicAnchor = topicAnchors[i]
        topicAnchor.innerHTML = sessionKeys[i];
        topicAnchor.setAttribute('data-questions',sessionStorage.getItem(sessionKeys[i]));

        // Blur topic.
        topicAnchor.blur();
    }
}

const addNewTopic = () => {
    // Get the topicnav and add-new-topic elements.
    const topicnav = document.getElementById('topicnav');
    
    // Create the new div.
    const topicDiv = document.createElement('div');
    topicDiv.setAttribute('class','topicdiv');

    const allTopicDivs = topicnav.getElementsByClassName('topicdiv');
    const allTopicAnchors = topicnav.getElementsByClassName('topic');

    // Find the number of the new topic.
    const newTopicNum = allTopicDivs.length + 1;

    // Get the maximum topic ID so the new one is unique.
    var maxID = 0;
    for (var i = 0; i < allTopicAnchors.length; i++) {
        currentID = allTopicAnchors[i].id;
        if (currentID > maxID) {
            maxID = currentID;
        }
    }
    maxID++;

    // Create the new element and set its data-test attribute.
    const newTopicAnchor = document.createElement('a');
    newTopicAnchor.setAttribute('id',maxID);
    newTopicAnchor.setAttribute('class','topic nowrap');
    newTopicAnchor.setAttribute('href','#');
    newTopicAnchor.setAttribute('onclick','showTopicQuestions(this)');
    newTopicAnchor.setAttribute('data-questions','{"questions":[],"answers":[]}');
    newTopicAnchor.setAttribute('data-test',`topic-${newTopicNum}`);

    // Create the text for the new topic.
    const newTopicAnchorText = document.createTextNode(`Topic ${newTopicNum}`);

    newTopicAnchor.appendChild(newTopicAnchorText);

    topicDiv.appendChild(newTopicAnchor);

    // Add the new topic to the end of the list, ensuring the add topic button stays at the bottom.
    topicnav.appendChild(topicDiv);
}

/**
 * Show the topic questions for a given topic.
 */
const showTopicQuestions = (topicAnchor) => {
    // Reset global variables.
    currentQuestion = 0;
    questionObject = JSON.parse(topicAnchor.dataset.questions);
    selectedAnswers = {};
    currentTopicID = topicAnchor.id;

    // Get the page content div.
    const pageContentDiv = document.getElementById('test-page-content');

    // Remove existing elements.
    while(pageContentDiv.firstChild) {
        pageContentDiv.removeChild(pageContentDiv.lastChild);
    }

    // Add the progress bar.
    const progressBar = document.createElement('progress')
    progressBar.setAttribute('id','question-progress-bar');
    progressBar.setAttribute('value','1');
    progressBar.setAttribute('max',questionObject["questions"].length);
    progressBar.setAttribute('data-test','progress-bar');

    // Create the question div.
    const questionDiv = document.createElement('div');
    questionDiv.setAttribute('id','question-div');

    // Add the first question.
    const question = document.createElement('p');
    question.setAttribute('id','test-question');
    question.setAttribute('data-test','test-question');

    // Create an answer div.
    const answerFieldset = document.createElement('fieldset');
    answerFieldset.setAttribute('data-test','answer-fieldset');

    // Add the answer radio buttons.
    // First answer
    const answer1Div = document.createElement('div');
    answer1Div.class = 'inner-answer-div';

    const answer1 = document.createElement('input');
    answer1.id = 'answer1';
    answer1.type = 'radio';
    answer1.name = 'answer';
    answer1.class = 'test-answer';
    answer1.setAttribute('data-test','answer1');

    const answer1Label = document.createElement('label');
    answer1Label.for = 'answer1';
    answer1Label.onclick = () => { answer1.checked = true; }

    answer1Div.append(answer1, answer1Label);

    // Second answer
    const answer2Div = document.createElement('div');
    answer2Div.class = 'inner-answer-div';

    const answer2 = document.createElement('input');
    answer2.id = 'answer2'
    answer2.type = 'radio';
    answer2.name = 'answer';
    answer2.class = 'test-answer';
    answer2.setAttribute('data-test','answer2');

    const answer2Label = document.createElement('label');
    answer2Label.for = 'answer2';
    answer2Label.onclick = () => { answer2.checked = true; }

    answer2Div.append(answer2, answer2Label);

    // Third answer
    const answer3Div = document.createElement('div');
    answer3Div.class = 'inner-answer-div';

    const answer3 = document.createElement('input');
    answer3.id = 'answer3'
    answer3.type = 'radio';
    answer3.name = 'answer';
    answer3.class = 'test-answer';
    answer3.setAttribute('data-test','answer3');

    const answer3Label = document.createElement('label');
    answer3Label.for = 'answer3';
    answer3Label.onclick = () => { answer3.checked = true; }

    answer3Div.append(answer3, answer3Label);

    // Fourth answer
    const answer4Div = document.createElement('div');
    answer4Div.class = 'inner-answer-div';

    const answer4 = document.createElement('input');
    answer4.id = 'answer4'
    answer4.type = 'radio';
    answer4.name = 'answer';
    answer4.class = 'test-answer';
    answer4.setAttribute('data-test','answer4');

    const answer4Label = document.createElement('label');
    answer4Label.for = 'answer4';
    answer4Label.onclick = () => { answer4.checked = true; }

    answer4Div.append(answer4, answer4Label);

    answerFieldset.append(answer1Div, 
                          document.createElement('br'), 
                          answer2Div,
                          document.createElement('br'), 
                          answer3Div,
                          document.createElement('br'), 
                          answer4Div);

    questionDiv.append(question, answerFieldset);

    // Create the question navigation div.
    const questionNavDiv = document.createElement('div');
    questionNavDiv.setAttribute('id','question-nav-div');

    // Create the goto first element.
    const gotoFirst = document.createElement('a');
    gotoFirst.setAttribute('id','goto-first');
    gotoFirst.setAttribute('href','#first');
    gotoFirst.setAttribute('data-test','goto-first');
    gotoFirst.onclick = () => {
            currentQuestion = 0;
            updateQuestionDiv(currentQuestion); 
        }

    const gotoFirstText = document.createTextNode('<<');
    gotoFirst.appendChild(gotoFirstText);

    // Create the goto prev element.
    const gotoPrev = document.createElement('a');
    gotoPrev.setAttribute('id','goto-prev');
    gotoPrev.setAttribute('href','#prev');
    gotoPrev.setAttribute('data-test','goto-prev');
    gotoPrev.onclick = () => { 
        if (currentQuestion > 0) {
            updateQuestionDiv(--currentQuestion); 
        }
    }

    const gotoPrevText = document.createTextNode('<');
    gotoPrev.appendChild(gotoPrevText);

    // Create the goto next element.
    const gotoNext = document.createElement('a');
    gotoNext.setAttribute('id','goto-next');
    gotoNext.setAttribute('href','#next');
    gotoNext.setAttribute('data-test','goto-next');
    gotoNext.onclick = () => {
        if (currentQuestion < questionObject["questions"].length - 1) {
            updateQuestionDiv(++currentQuestion);
        }
    }

    const gotoNextText = document.createTextNode('>');
    gotoNext.appendChild(gotoNextText);

    // Create the goto last element.
    const gotoLast = document.createElement('a');
    gotoLast.setAttribute('id','goto-last');
    gotoLast.setAttribute('href','#last');
    gotoLast.setAttribute('data-test','goto-last');
    gotoLast.onclick = () => {
        currentQuestion = questionObject["questions"].length - 1;
        updateQuestionDiv(currentQuestion);
    }

    const gotoLastText = document.createTextNode('>>');
    gotoLast.appendChild(gotoLastText);

    questionNavDiv.append(gotoFirst, gotoPrev, gotoNext, gotoLast);

    pageContentDiv.append(progressBar, questionDiv, questionNavDiv);


    updateQuestionDiv(currentQuestion);
}

/**
 * Update the questions and answers being displayed based on an index.
 */
const updateQuestionDiv = (index) => {
    // Get question.
    const question = document.getElementById('test-question');

    // Radio buttons
    const answer1 = document.getElementById('answer1');
    const answer2 = document.getElementById('answer2');
    const answer3 = document.getElementById('answer3');
    const answer4 = document.getElementById('answer4');

    // Save the current selection.
    // This means that the local storage element for this question must have been initialised so we are safe to just get it.
    // ...unless this is the first element
    /*
    {
        "radioButtons":[bool,bool,bool,bool],
        "answerList":["answer1","answer2","answer3","answer4"]
    }
    */
    if (localStorage.getItem(question.textContent + currentTopicID) !== null) {
        const oldQuestionKey = question.textContent + currentTopicID;
        var previousQuestionStorageObject = JSON.parse(localStorage.getItem(oldQuestionKey));
        var radioButtonArray = [answer1.checked, answer2.checked, answer3.checked, answer4.checked];
        previousQuestionStorageObject['radioButtons'] = radioButtonArray;
        localStorage.setItem(oldQuestionKey, JSON.stringify(previousQuestionStorageObject));
    } 
    
    // Check if the new question/answer pair is already stored in the local storage.
    const newQuestionText = questionObject["questions"][index];
    const newAnswerText = questionObject["answers"][index];
    const questionKey = newQuestionText + currentTopicID;

    // Update question
    question.textContent = newQuestionText;

    // Create array of answer labels.
    const answerLabelArray = document.getElementsByTagName('label');

    // Check if this question answer pair is in the local storage. If it is then present the same answers.
    if (localStorage.getItem(questionKey) === null) {
        // Generate fake answers using ChatGPT.
        

        // Initialise answer array.
        answerList = [];

        randomAnswer = Math.floor(Math.random() * 4);
        for(var i = 0; i < 4; i++) {
            if (i===randomAnswer) {
                answerLabelArray[i].textContent = newAnswerText;
                answerList.push(newAnswerText);
            } else {
                // Lookup in local storage logic here.
                answerLabelArray[i].textContent = 'fake answer';
                answerList.push(`fakeAnswer${i}`);
            }
        }
        // Set item to be an object containing the radio buttons selected and then the corresponding answers.
        localStorage.setItem(questionKey,JSON.stringify({'radioButtons':[false,false,false,false],'answerList':answerList}));
    }

    // With the item in local storage, either previously or now set the radio buttons and answers.
    storageObject = JSON.parse(localStorage.getItem(questionKey));

    // Anti-loop gang rise up.
    // Set the radio buttons.
    answer1.checked = storageObject['radioButtons'][0];
    answer2.checked = storageObject['radioButtons'][1];
    answer3.checked = storageObject['radioButtons'][2];
    answer4.checked = storageObject['radioButtons'][3];

    // Set the answers.
    answerLabelArray[0].textContent = storageObject['answerList'][0];
    answerLabelArray[1].textContent = storageObject['answerList'][1];
    answerLabelArray[2].textContent = storageObject['answerList'][2];
    answerLabelArray[3].textContent = storageObject['answerList'][3];

    // Update the progress bar
    const progressBar = document.getElementById('question-progress-bar');
    progressBar.value = index + 1;

    // Hide navigation icons that should not be visible.
    const gotoFirst = document.getElementById('goto-first');
    const gotoPrev = document.getElementById('goto-prev');
    const gotoNext = document.getElementById('goto-next');
    const gotoLast = document.getElementById('goto-last');

    if (index === 0) {
        gotoFirst.style.visibility = 'hidden';
        gotoPrev.style.visibility = 'hidden';
        gotoNext.style.visibility = 'visible';
        gotoLast.style.visibility = 'visible';
    } else if (index === questionObject["questions"].length - 1) {
        gotoFirst.style.visibility = 'visible';
        gotoPrev.style.visibility = 'visible';
        gotoNext.style.visibility = 'hidden';
        gotoLast.style.visibility = 'hidden';
    } else {
        gotoFirst.style.visibility = 'visible';
        gotoPrev.style.visibility = 'visible';
        gotoNext.style.visibility = 'visible';
        gotoLast.style.visibility = 'visible';
    }
}

window.addEventListener('load', loadTopics)