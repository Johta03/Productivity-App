function replaceWithForm(buttonContainerID, formContainerID) {
    var buttonContainer = document.getElementById(buttonContainerID);
    var formContainer = document.getElementById(formContainerID);

    buttonContainer.style.display = 'none';
    formContainer.style.display = 'block';

    // Store form visibility status in local storage
    localStorage.setItem(formContainerID + 'Visible', 'true');
}

function cancelOut(buttonContainerID, formContainerID, taskInputID) {
    var buttonContainer = document.getElementById(buttonContainerID);
    var formContainer = document.getElementById(formContainerID);
    var taskInput = document.getElementById(taskInputID);

    buttonContainer.style.display = 'block';
    formContainer.style.display = 'none';

    // Store form visibility status in local storage
    localStorage.setItem(formContainerID + 'Visible', 'false');
}

function handleFormSubmit(buttonContainerID, formContainerID, taskInputID) {
  cancelOut(buttonContainerID,formContainerID,taskInputID)
  addTask(formContainerID, taskInputID);
}

function addTask(formContainerID, buttonContainerID) {
  var form = document.getElementById(formContainerID);
  var taskInput = document.getElementById(taskInputID);

  // Perform any necessary actions before adding the task

  // Submit the form
  form.submit();

}