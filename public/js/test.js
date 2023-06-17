/**
 * Load the topics from session storage.
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

const addNewTopic = () => {
    
}

window.addEventListener('load', loadTopics)