/**
 * Add a new topic so that the topicnav will result with the following format:
 * 
 *  <nav id="topicnav">
 *      ...
 *      ---------------------------New-----------------------------
 *      <div id="topicdiv">
 *          <div class="topicdiv">
 *              <a class="topic" href="#" onclick="displayTopic()">Topic N</a>
 *              <div class="modify-buttons">
 *                  <a class="edit-button" href="#edit" onclick="editTopicName()">
 *                      <img class="icon" src="img/edit.png" alt="Edit"></img>
 *                  </a>
 *                  <a class="delete-button" href="#delete" onclick="deleteTopic()">
 *                      <img class="icon" src="img/delete.png" alt="Delete"></img>            
 *                  </a>
 *              </div>
 *          </div>
 *      </topicdiv>
 *      -----------------------------------------------------------     
 *      <a id="add-new-topic" href="#" onclick="addNewTopic()" data-test="add-new-topic">+</a>
 *  </topicnav>
 */
const addNewTopic = () => {
    // Get the topicnav and add-new-topic elements.
    const topicnav = document.getElementById('topicnav');
    const addNewTopic = document.getElementById('add-new-topic');
    
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

    // Append the topic anchor, edit anchor, delete anchor to the div.
    const modifyDiv = generateModifyButtons('editTopicName','deleteTopicName','edit-topic-button','delete-topic-button');
    topicDiv.append(newTopicAnchor, modifyDiv);

    // Add the new topic to the end of the list, ensuring the add topic button stays at the bottom.
    topicnav.removeChild(addNewTopic);
    topicnav.append(topicDiv);
    topicnav.appendChild(addNewTopic);

    editTopicName(modifyDiv.querySelector('.edit-topic-button'));
}

/**
 * Edit a topic name.
 * 
 * @param {*} editAnchor the edit anchor that was clicked
 */
const editTopicName = (editAnchor) => {
    // Change the edit button to a check button to confirm changes.
    const editImage = editAnchor.querySelector('.icon');
    editImage.src = 'img/checked.png';
    editAnchor.setAttribute('onclick','unselectTopic(this)');

    const topicDiv = editAnchor.parentElement.parentElement;
    const topicAnchor = topicDiv.querySelector('.topic');
    topicAnchor.setAttribute('class','topic wrap');
    topicAnchor.contentEditable = true;
    
    // Check if user presses enter.
    topicAnchor.addEventListener('keydown', (e) => {
        if (e.code === 'Enter') { // Check if enter pressed.
            unselectTopic(editAnchor);
        } 
    });

    topicAnchor.focus();

    // Select the content of the topic.
    selection = window.getSelection();
    range = document.createRange();
    range.selectNodeContents(topicAnchor);
    selection.removeAllRanges();
    selection.addRange(range);
}

/**
 * Topic unselect helper function.
 * 
 * @param {*} editAnchor the edit anchor to unselect
 */
const unselectTopic = (editAnchor) => {
    const topicDiv = editAnchor.parentElement.parentElement;
    const topicAnchor = topicDiv.querySelector('.topic');

    topicAnchor.contentEditable = false;
    topicAnchor.setAttribute('class','topic nowrap');
    selection = window.getSelection().empty();

    const editImage = editAnchor.querySelector('.icon');
    editImage.src = 'img/edit.png';
    editAnchor.setAttribute('onclick','editTopicName(this)');
}

/**
 * Delete a topic.
 * 
 * @param {*} deleteAnchor the delete button that was clicked
 */
const deleteTopicName = (deleteAnchor) => {
    const topicDiv = deleteAnchor.parentElement.parentElement;
    if (confirm(`Do you really want to delete this topic?\nPress OK to delete: "${topicDiv.textContent}"`)) {
        topicDiv.remove();
    }
}

/**
 * Show the questions and answers for a topic so the user can edit them.
 * 
 * @param {*} topicAnchor 
 */
const showTopicQuestions = (topicAnchor) => {
    // How to store and retrieve questions and answers using JSON stored as an attribute.
    // newTopicAnchor.setAttribute('data-questions','{"questionArray":["q1","q2","q3"],"answerArray":["a1","a2","a3"]}');
    // var myObject = JSON.parse(topicAnchor.dataset.questions);
    // console.log(myObject['questionArray']);

    // Get the page content div.
    const pageContentDiv = document.getElementById('edit-page-content');

    // Remove existing elements.
    while(pageContentDiv.firstChild) {
        pageContentDiv.removeChild(pageContentDiv.lastChild);
    }

    // Add the "add new question" anchor.
    const newQuestionAnchor = document.createElement('a');
    newQuestionAnchor.setAttribute('id','add-new-question');
    newQuestionAnchor.setAttribute('href','#!');
    newQuestionAnchor.setAttribute('onclick','addNewQuestion()');
    newQuestionAnchor.tabIndex = 1;
    newQuestionAnchor.setAttribute('data-test','add-new-question');

    // Add the new question text to the anchor.
    const newQuestionText = document.createTextNode('+');
    newQuestionAnchor.appendChild(newQuestionText);

    // Add the question list to the div.
    const questionList = document.createElement('ol');
    questionList.setAttribute('id',`questions-${topicAnchor.id}`);
    questionList.setAttribute('class','question-list');
    questionList.setAttribute('data-test','question-list');

    pageContentDiv.append(questionList);

    // Add the existing questions
    var existingQuestions = JSON.parse(topicAnchor.dataset.questions);

    for (var i = 0; i < existingQuestions.questions.length; i++) {
        // Add a new question to the list.
        addNewQuestion();

        // Get the current question li element.
        questionLi = questionList.getElementsByTagName('li')[i];

        // Set the question value.
        questionLi.querySelector('.question').innerHTML = existingQuestions["questions"][i];

        // Set the answer value.
        questionLi.querySelector('.answer').innerHTML = existingQuestions["answers"][i];

        // Unselect the question.
        unselectQuestion(questionLi.querySelector('.edit-question-button'));
    }

    pageContentDiv.append(newQuestionAnchor);
}

const addNewQuestion = () => {
    // Get the page content and add-new-question elements.
    const questionList = document.getElementsByClassName('question-list')[0];

    // Find the number of the new question.
    const newQuestionNum = questionList.getElementsByTagName('li').length + 1;

    // Create the new div.
    const questionLi = document.createElement('li');
    questionLi.setAttribute('class','question-li');

    // Create the question element.
    const question = document.createElement('p');
    question.setAttribute('class','question');
    question.setAttribute('data-test',`question-${newQuestionNum}`);
    
    const questionText = document.createTextNode(`Question ${newQuestionNum}?`);
    question.appendChild(questionText);

    // Create the answer element.
    const answer = document.createElement('p');
    answer.setAttribute('class','answer');
    answer.setAttribute('data-test',`answer-${newQuestionNum}`);

    const answerText = document.createTextNode(`Answer ${newQuestionNum}.`);
    answer.appendChild(answerText);

    // Add the quesiton and answer to the next list element.
    const modifyDiv = generateModifyButtons('editQuestion','deleteQuestion','edit-question-button','delete-question-button')
    questionLi.append(question, modifyDiv ,answer);

    questionList.appendChild(questionLi);

    editQuestion(modifyDiv.querySelector('.edit-question-button'));

    // Save the question to its topic.
    saveQuestionsToJSON(questionList);
}

/**
 * Generate a modify button div containing an edit and delete button which call the functions provided using this as an input.
 * 
 * @param {string} editFunctionName the function the edit button should call
 * @param {string} deleteFunctionName the function the delete button should call
 * @param {string} editButtonClass the css class for the edit button to be given
 * @param {string} deleteButtonClass the css class for the delete button to be given
 * @returns A div containing an edit and delete button.
 */
const generateModifyButtons = (editFunctionName, deleteFunctionName, editButtonClass, deleteButtonClass) => {
    // Create the modify button div.
    const modifyDiv = document.createElement('div');
    modifyDiv.setAttribute('class','modify-buttons');

    const editAnchor = document.createElement('a');
    editAnchor.setAttribute('class',editButtonClass);
    editAnchor.setAttribute('href','#edit');
    editAnchor.setAttribute('onclick',`${editFunctionName}(this)`);

    const editImage = document.createElement('img');
    editImage.setAttribute('class','icon');
    editImage.setAttribute('src','img/edit.png');
    editImage.setAttribute('alt','Edit');

    editAnchor.appendChild(editImage);

    // Create a delete anchor to allow the topic to be deleted.
    const deleteAnchor = document.createElement('a');
    deleteAnchor.setAttribute('class',deleteButtonClass);
    deleteAnchor.setAttribute('href','#delete');
    deleteAnchor.setAttribute('onclick',`${deleteFunctionName}(this)`);

    const deleteImage = document.createElement('img');
    deleteImage.setAttribute('class','icon');
    deleteImage.setAttribute('src','img/delete.png');
    deleteImage.setAttribute('alt','Delete');

    deleteAnchor.appendChild(deleteImage);

    // Append edit and delete to the modify div.
    modifyDiv.append(editAnchor, deleteAnchor);

    return modifyDiv;
}

/**
 * Edit a question and its answer.
 * 
 * @param {*} editAnchor 
 */
const editQuestion = (editAnchor) => {
    // Change the edit button to a check button to confirm changes.
    const editImage = editAnchor.querySelector('.icon');
    editImage.src = 'img/checked.png';
    editAnchor.setAttribute('onclick','unselectQuestion(this)');

    const questionLi = editAnchor.parentElement.parentElement;
    const question = questionLi.querySelector('.question');
    question.contentEditable = true;
    const answer = questionLi.querySelector('.answer');
    answer.contentEditable = true;

    question.tabIndex = 1;
    answer.tabIndex = 1;
    
    // Check if user presses enter.
    questionLi.addEventListener('keydown', (e) => {
        if (e.code === 'Enter') { // Check if enter pressed.
            unselectQuestion(editAnchor);
        }
    });

    question.addEventListener('focus', (e) => {
        if (question.contentEditable === 'true') {
            selection = window.getSelection();
            range = document.createRange();
            range.selectNodeContents(question);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    })

    question.addEventListener('blur', () => {
        selection = window.getSelection().empty();
    })
    
    answer.addEventListener('focus', (e) => {
        if (answer.contentEditable === 'true') {
            selection = window.getSelection();
            range = document.createRange();
            range.selectNodeContents(answer);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    });

    answer.addEventListener('blur', () => {
        selection = window.getSelection().empty();
    })

    question.focus();
}

/**
 * Question unselect helper function.
 * 
 * @param {*} editAnchor the edit anchor to unselect
 */
const unselectQuestion = (editAnchor) => {
    const questionLi = editAnchor.parentElement.parentElement;
    const question = questionLi.querySelector('.question');
    const answer = questionLi.querySelector('.answer');

    question.contentEditable = false;
    answer.contentEditable = false;
    question.blur();
    answer.blur();
    selection = window.getSelection().empty();

    const editImage = editAnchor.querySelector('.icon');
    editImage.src = 'img/edit.png';
    editAnchor.setAttribute('onclick','editQuestion(this)');

    saveQuestionsToJSON(questionLi.parentElement);
}

/**
 * Delete a question.
 * 
 * @param {*} deleteAnchor the delete button that was clicked
 */
const deleteQuestion = (deleteAnchor) => {
    const questionLi = deleteAnchor.parentElement.parentElement;
    const questionList = questionLi.parentElement;
    const question = questionLi.querySelector('.question');
    if (confirm(`Do you really want to delete this question?\nPress OK to delete: "${question.textContent}"`)) {
        questionLi.remove();
        saveQuestionsToJSON(questionList);
    }
}

/**
 * Save the questions in this page to JSON.
 * 
 * @param {*} questionList the list of questions on this page (should probably be a form thinking about it now)
 */
const saveQuestionsToJSON = (questionList) => {
    const topicDiv = document.getElementById(questionList.id.split('-')[1]);
    var topicData = JSON.parse(topicDiv.dataset.questions);

    // Create new arrays to store in the JSON.
    questionLis = questionList.getElementsByTagName('li');

    const questions = [];
    const answers = [];
    for (var i = 0; i < questionLis.length; i++) {
        var questionLi = questionLis[i];
        var question = questionLi.querySelector('.question');
        var answer = questionLi.querySelector('.answer');

        questions.push(question.textContent);
        answers.push(answer.textContent);
    }

    topicData['questions'] = questions;
    topicData['answers'] = answers;

    topicDiv.setAttribute('data-questions',JSON.stringify(topicData));
}

/**
 * Save the data from the edit form to the session for use on other pages.
 */
const saveSessionData = () => {
    sessionStorage.clear();
    const topics = document.getElementsByClassName('topic');
    for (var i = 0; i < topics.length; i++) {
        var topic = topics[i];
        sessionStorage.setItem(topic.textContent,topic.dataset.questions);
    }
}

/**
 * Load the topics from the session state.
 */
const loadTopics = () => {
    const topicnav = document.getElementById('topicnav');
    const sessionKeys = Object.keys(sessionStorage);
    
    for (var i = 0; i < sessionKeys.length; i++) {
        addNewTopic()

        var topicanchors = topicnav.getElementsByClassName('topic');
        var topicanchor = topicanchors[i]
        topicanchor.innerHTML = sessionKeys[i];
        topicanchor.setAttribute('data-questions',sessionStorage.getItem(sessionKeys[i]));

        // Unselect the topic.
        unselectTopic(topicanchor.parentElement.querySelector('.edit-topic-button'));

        // Blur topic.
        topicanchor.blur();
    }
}

window.addEventListener('load', loadTopics)