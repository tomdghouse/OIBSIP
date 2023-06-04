// Task list arrays
let pendingTasks = [];
let completedTasks = [];

// Add a new task
function addTask() {
  const taskInput = document.getElementById('task-input');
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    const task = {
      text: taskText,
      added: new Date()
    };

    pendingTasks.push(task);
    taskInput.value = '';
    renderTasks();
  }
}

// Mark task as complete
function completeTask(index) {
  const task = pendingTasks[index];
  task.completed = new Date();
  completedTasks.push(task);
  pendingTasks.splice(index, 1);
  renderTasks();
}

// Delete a task
function deleteTask(index, list) {
  if (list === 'pending') {
    pendingTasks.splice(index, 1);
  } else if (list === 'completed') {
    completedTasks.splice(index, 1);
  }
  renderTasks();
}

// Render the task lists
function renderTasks() {
  const allTasksSection = document.getElementById('all-tasks');
  const pendingTasksSection = document.getElementById('pending-tasks');
  const completedTasksSection = document.getElementById('completed-tasks');

  // Clear the sections
  allTasksSection.innerHTML = '';
  pendingTasksSection.innerHTML = '';
  completedTasksSection.innerHTML = '';

  // Render all tasks
  const allTasks = pendingTasks.concat(completedTasks);
  allTasks.sort((a, b) => a.added - b.added);

  allTasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    if (task.completed) {
      listItem.className = 'completed';
      listItem.textContent = task.text + ' (Completed: ' + task.completed.toLocaleString() + ')';
    } else {
      listItem.textContent = task.text + ' (Added: ' + task.added.toLocaleString() + ')';
    }

    const deleteButton = document.createElement('span');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete';
    deleteButton.onclick = function() {
      deleteTask(index, task.completed ? 'completed' : 'pending');
    };

    listItem.appendChild(deleteButton);
    allTasksSection.appendChild(listItem);
  });

  // Render pending tasks
  pendingTasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = task.text + ' (Added: ' + task.added.toLocaleString() + ')';
    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.onclick = function() {
      completeTask(index);
    };
    const deleteButton = document.createElement('span');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete';
    deleteButton.onclick = function() {
      deleteTask(index, 'pending');
    };
    listItem.appendChild(completeButton);
    listItem.appendChild(deleteButton);
    pendingTasksSection.appendChild(listItem);
  });

  // Render completed tasks
  completedTasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.className = 'completed';
    listItem.textContent = task.text + ' (Completed: ' + task.completed.toLocaleString() + ')';
    const deleteButton = document.createElement('span');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete';
    deleteButton.onclick = function() {
      deleteTask(index, 'completed');
    };
    listItem.appendChild(deleteButton);
    completedTasksSection.appendChild(listItem);
  });
}

// Initial rendering
renderTasks();
