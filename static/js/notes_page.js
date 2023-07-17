    // Function to generate a unique key based on the current page's URL
    function getCookie(name) {
        const cookieValue = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
        return cookieValue ? cookieValue.pop() : '';
      }
  
      function generateKey() {
        const noteId = window.location.pathname.split('/').filter(Boolean).pop();
        return 'savedTitle_' + noteId;
      }
  
      // Get the editable div element and editor container
      const editableDiv = document.getElementById('editableDiv');
      const editorContainer = document.getElementById('editor-container');
  
      // Retrieve the saved title and content from localStorage using the unique key
      const savedTitle = localStorage.getItem(generateKey());
      const savedContent = localStorage.getItem(generateKey() + '_content');
      if (savedTitle) {
        editableDiv.innerHTML = savedTitle;
      }
      if (savedContent) {
        editorContainer.innerHTML = savedContent;
      }
  
      // Function to extract the note ID from the page key
      function extractNoteId(pageKey) {
        const keyParts = pageKey.split('_');
        return keyParts.length > 1 ? keyParts[1] : null;
      }
  
      editableDiv.addEventListener('input', function () {
        const updatedTitle = editableDiv.innerText.trim();
        const updatedContent = editorContainer.innerHTML;
        const pageKey = generateKey();
        const noteId = extractNoteId(pageKey);
  
        if (noteId) {
          localStorage.setItem(pageKey, updatedTitle);
  
          // Update the note title and content in the database
          fetch(`/update-note/${noteId}/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify({ title: updatedTitle, content: updatedContent, noteId: noteId })
          })
            .then(response => response.json())
            .then(data => {
              if (data.status === 'success') {
                document.title = updatedTitle;
                console.log(data);
              } else {
                console.log('Failed to update note: ' + data.message);
              }
            })
            .catch(error => console.log('Error occurred while updating note: ' + error));
        }
      });
  
  
      editorContainer.addEventListener('input', function () {
        const updatedContent = editorContainer.innerHTML; // Use innerHTML instead of innerText
        const pageKey = generateKey();
        const noteId = extractNoteId(pageKey);
  
        if (noteId) {
          localStorage.setItem(pageKey + '_content', updatedContent);
  
          // Update the note content in the database
          fetch(`/update-note/${noteId}/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify({ content: updatedContent, noteId: noteId })
          })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));
        }
      });
  
      // Initialize the Quill editor
      var quill = new Quill('#editor-container', {
        theme: 'snow',
        placeholder: 'Start typing here...',
        modules: {
          toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],      // Headings
            [{ 'font': [] }],                            // Font family
            ['bold', 'italic', 'underline'],      // Basic formatting options
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],  // Ordered and unordered lists
            [{ 'indent': '-1' }, { 'indent': '+1' }],        // Indentation
            [{ 'align': [] }],                           // Text alignment
            ['link', 'image'],                          // Links and images
          ]
        }
      });
  
  
      // Save content function
      function saveContent() {
        const updatedContent = editorContainer.innerHTML; // Use innerHTML instead of innerText
        const pageKey = generateKey();
        const noteId = extractNoteId(pageKey);
  
        if (noteId) {
          localStorage.setItem(pageKey + '_content', updatedContent); // Store content as HTML
  
          // Update the note content in the database
          fetch(`/update-note/${noteId}/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': getCookie('csrftoken'),
            },
            body: JSON.stringify({ content: updatedContent, noteId: noteId }),
          })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.log(error));
        }
      }
  
      // Event listener to save content when changes are made
      quill.on('text-change', function () {
        saveContent();
      });