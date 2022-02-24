const inputElement = document.querySelector('.new-task-input')
const addTaskButton = document.querySelector('.new-task-button')
const taskContainer = document.querySelector('.tasks-container')


const validateInput = () => inputElement.value.trim().length > 0

const handleAddTask = () => {
    const inputIsValid = validateInput()

    if(!inputIsValid) {
        return inputElement.classList.add('error')
    }

    const taskItemContainer = document.createElement('li')
    taskItemContainer.classList.add('task-item')
    
    const checkBox = document.createElement('input')
    checkBox.type = 'checkbox'

    checkBox.addEventListener('click', () => handleClick(checkBox, taskItemContainer))

    const taskContent = document.createElement('p')
    taskContent.innerText = inputElement.value;

    const deleteButton = document.createElement('button')
    deleteButton.innerText = 'X'

    deleteButton.addEventListener('click', () => handleDeleteClick(taskItemContainer, taskContent))

    taskItemContainer.appendChild(checkBox)
    taskItemContainer.appendChild(taskContent)
    taskItemContainer.appendChild(deleteButton)

    taskContainer.appendChild(taskItemContainer)

    inputElement.value = ""

    updateLocalStorage()
}

const handleDeleteClick = (taskItemContainer, taskContent) => {
    const tasks = taskContainer.childNodes;

    for(const task of tasks) {
        const secondChild = task.childNodes[1]
        if(secondChild.isSameNode(taskContent)) {
            taskItemContainer.remove();
        }
    }

    updateLocalStorage()
}

const handleClick = (checkBox, taskItemContainer) => {
    const tasks = taskContainer.childNodes;

    for(const task of tasks) {
        if(task.firstChild.isSameNode(checkBox)) {
            taskItemContainer.classList.toggle('completed')
        } 
    }

    updateLocalStorage()
}

const handleInputChange = () => {
    const inputIsValid = validateInput() 

    if(inputIsValid) {
        return inputElement.classList.remove('error')
    }
}

const updateLocalStorage = () => {
    const tasks = taskContainer.childNodes;

    const localStorageTasks = [...tasks].map(task => {
        const content = task.childNodes[1]
        const isCompleted = task.classList.contains('completed')

        return {description: content.innerText, isCompleted}
    });

    localStorage.setItem("task-list", JSON.stringify(localStorageTasks))
}

const refreshTasksUsingLocalStorage = () => {
    const taskFromLocalStorage = JSON.parse(localStorage.getItem("task-list"))

    if(!taskFromLocalStorage) return 

    for(const task of taskFromLocalStorage) {
        const taskItemContainer = document.createElement('li')
    taskItemContainer.classList.add('task-item')
   
    const checkBox = document.createElement('input')
    checkBox.type = 'checkbox'

    if(task.isCompleted) {
        taskItemContainer.classList.add('completed')
        checkBox.checked = true
    }   


    checkBox.addEventListener('click', () => handleClick(checkBox, taskItemContainer))

    const taskContent = document.createElement('p')
    taskContent.innerText = task.description;

    const deleteButton = document.createElement('button')
    deleteButton.innerText = 'X'

    deleteButton.addEventListener('click', () => handleDeleteClick(taskItemContainer, taskContent))

    taskItemContainer.appendChild(checkBox)
    taskItemContainer.appendChild(taskContent)
    taskItemContainer.appendChild(deleteButton)

    taskContainer.appendChild(taskItemContainer)

    inputElement.value = ""

    }
}

refreshTasksUsingLocalStorage()

inputElement.addEventListener('change', () => handleInputChange())
addTaskButton.addEventListener('click', () => handleAddTask())