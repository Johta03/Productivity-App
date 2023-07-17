function replaceWithForm(buttonContainerID, formContainerID) {
     // Function to replace button with form

    var buttonContainer = document.getElementById(buttonContainerID);
    var formContainer = document.getElementById(formContainerID);

     // Change container visibility accordingly
    buttonContainer.style.display = 'none';
    formContainer.style.display = 'block';

    // Store form visibility status in local storage
    localStorage.setItem(formContainerID + 'Visible', 'true');
}

function cancelOut(buttonContainerID, formContainerID, taskInputID) {
     // Function to cancel out of the form view

    var buttonContainer = document.getElementById(buttonContainerID);
    var formContainer = document.getElementById(formContainerID);
    var taskInput = document.getElementById(taskInputID);

     // Change container visibility accordingly
    buttonContainer.style.display = 'block';
    formContainer.style.display = 'none';

    // Store form visibility status in local storage
    localStorage.setItem(formContainerID + 'Visible', 'false');
}

function handleFormSubmit(buttonContainerID, formContainerID, taskInputID) {
    cancelOut(buttonContainerID, formContainerID, taskInputID) // Cancel out of the form view after form is submitted
    addTask(formContainerID, taskInputID); // add task by submitting form
}

function addTask(formContainerID, buttonContainerID) {
    var form = document.getElementById(formContainerID);
    var taskInput = document.getElementById(taskInputID);

    // Submit the form
    form.submit();
}

function toggleTask(checkbox, ID) {
    if (ID === 1) {
        var taskText = document.getElementById("taskText" + checkbox.id.slice(4)); // Extract the taskText element
    }
    else if (ID === 2) {
        var taskText = document.getElementById("taskText2" + checkbox.id.slice(4));
    }
    if (checkbox.checked) {
        taskText.classList.add("completed-task"); // Add the completed-task class to apply line-through style
    } else {
        taskText.classList.remove("completed-task"); // Remove the completed-task class to remove line-through style
    }

}