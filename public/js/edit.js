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

    // Find the number of the new topic.
    const newTopicNum = topicnav.getElementsByClassName('topicdiv').length + 1

    // Create the new element and set its data-test attribute.
    const newTopicAnchor = document.createElement('a');
    newTopicAnchor.setAttribute('class','topic');
    newTopicAnchor.setAttribute('href','#');
    newTopicAnchor.setAttribute('data-test',`topic-${newTopicNum}`);

    // Create the text for the new topic.
    const newTopicAnchorText = document.createTextNode(`Topic ${newTopicNum}`);

    newTopicAnchor.appendChild(newTopicAnchorText);

    const modifyDiv = document.createElement('div');
    modifyDiv.setAttribute('class','modify-buttons');

    const editAnchor = document.createElement('a');
    editAnchor.setAttribute('class','edit-button');
    editAnchor.setAttribute('href','#edit');
    editAnchor.setAttribute('onclick','editTopicName(this)');

    const editImage = document.createElement('img');
    editImage.setAttribute('class','icon');
    editImage.setAttribute('src','img/edit.png');
    editImage.setAttribute('alt','Edit');

    editAnchor.appendChild(editImage);

    // Create a delete anchor to allow the topic to be deleted.
    const deleteAnchor = document.createElement('a');
    deleteAnchor.setAttribute('class','delete-button');
    deleteAnchor.setAttribute('href','#delete');
    deleteAnchor.setAttribute('onclick','deleteTopicName(this)');

    const deleteImage = document.createElement('img');
    deleteImage.setAttribute('class','icon');
    deleteImage.setAttribute('src','img/delete.png');
    deleteImage.setAttribute('alt','Delete');

    deleteAnchor.appendChild(deleteImage);

    // Append edit and delete to the modify div.
    modifyDiv.append(editAnchor, deleteAnchor);

    // Append the topic anchor, edit anchor, delete anchor to the div.
    topicDiv.append(newTopicAnchor, modifyDiv);

    // Add the new topic to the end of the list, ensuring the add topic button stays at the bottom.
    topicnav.removeChild(addNewTopic);
    topicnav.append(topicDiv);
    topicnav.appendChild(addNewTopic);
}

/**
 * Edit a topic name.
 * 
 * @param {*} editElement the edit button that was clicked
 */
const editTopicName = (editElement) => {
    const topicDiv = editElement.parentElement.parentElement;
    const topicAnchor = topicDiv.querySelector('.topic');
    topicAnchor.contentEditable = true;
    topicAnchor.addEventListener('keydown', (e) => {
        if (e.code === 'Enter') { // Check if enter pressed.
            topicAnchor.contentEditable = false;
        } 
    });
    topicAnchor.addEventListener('blur', (e) => {
        topicAnchor.contentEditable = false;
    })
    topicAnchor.focus();
}

/**
 * Delete a topic.
 * 
 * @param {*} deleteElement the delete button that was clicked
 */
const deleteTopicName = (deleteElement) => {
    const topicDiv = deleteElement.parentElement.parentElement;
    const topicAnchor = topicDiv.getElementsByClassName('topic');
    console.log(topicAnchor);
    if (confirm(`Do you really want to delete this topic?\nPress OK to delete: "${topicDiv.textContent}"`)) {
        topicDiv.remove();
    }
}