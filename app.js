let userInput
let toDoContainer
let doneContainer
    //make an id counter one for the task boxes 
let giveTaskBoxAnId = 0
    // XXlet giveDoneBoxAnId = 0 XX dont do this! you want the same counter causse the DONE tasks can come back!

//grab the todo span and assign it each time a new count
let taskContainerCount
let numberOfTasksCounter = 0

//grab the done span and assign it each time a new count
let doneContainerCount
let numberofDONETasksCounter = 0

// let taskCounter  //this is the whole div of the task counter with a span inside. but  dont need it (need the span)
// let taskDoneCounter //this is the whole div of the task DONE counter with a span inside

//The only reason to create this variable is for the counter!!!!:
// let isDoneEditMode = false //no it actually doesnt work :( I cant be in a mode becuase I dont konw which delete the user will press next



document.onreadystatechange = () => {

    if (document.readyState === 'complete') {
        onInit()
    }
}

function onInit() {

    userInput = document.querySelector('#toDoListEntry')
    toDoContainer = document.querySelector('.toDo')
    doneContainer = document.querySelector('.done')
        // taskCounter = document.querySelector('.task-counter')  dont need it (need the span)
        // taskDoneCounter = document.querySelector('.task-done-counter')
    taskContainerCount = document.querySelector('#taskContainerCount')
    doneContainerCount = document.querySelector('#doneContainerCount')

}



function enterValInList() {

    //TODO: Take the input from the user and enter the value into a span  in the todoBox
    // 1.1 Render a rectangle with these createed elements inside it:  
    let taskBox = createToDoBox() //return a rectangle
        // a. span     + span.innerHTML = userInput.value
        //b.an archive button
        //c.an edit button
        //d. a delete button

    // 1.2  Append the rectangle to the div .todo
    toDoContainer.append(taskBox)

}

function createToDoBox() {
    taskContainerCount.innerHTML = ++numberOfTasksCounter
    let taskBox = document.createElement('div') //same name like in above function but local so its ok.
    taskBox.id = ++giveTaskBoxAnId
    taskBox.classList.add('todo-entry')
        //craete span inside with task:
    let span = createSpan()
    taskBox.append(span)
        //how to: ???
        // let btnArchive = createButton()
        // let btnEditTask= createButton()
        // let btnDeleteTask= createButton()
    let btnArchive = `<button type="button" class="archive" onclick="archive(${giveTaskBoxAnId})">Archive</button>`
    let btnEditTask = `<button type="button" class="editTask" onclick="editTask(${giveTaskBoxAnId})">Edit Task</button>`
    let btnDeleteTask = `<button type="button" class="deleteTask" onclick="deleteTask(${giveTaskBoxAnId})">Delete Task</button>`
        //you cant append the variables only append html elelments so have to use innerHTML
    taskBox.innerHTML += btnArchive
    taskBox.innerHTML += btnEditTask
    taskBox.innerHTML += btnDeleteTask
        //give the taskBox an id so you can do things with it later:

    return taskBox
}

function createSpan() {
    let taskSpan = document.createElement('span')
    taskSpan.innerHTML = userInput.value
    userInput.value = ''
    return taskSpan
}

function createButton() {
    //???????????????????????????HOw to make an onclick without innerHTML??
}



function editTask(id) {
    //edit makes you edit the values of the task
    console.log(id)
    let parent = document.getElementById(id)
    let promptResponse = prompt('Enter a new value')
    if (promptResponse) {
        parent.firstElementChild.innerHTML = promptResponse
    }
}

function deleteTask(id) {
    //    deletes the row 
    console.log('id', id)
    let toDoEntry = document.getElementById(id)

    console.log(toDoEntry) //<divid='2'class='todo-entry'>......</div> the whole box
    toDoEntry.remove()
    console.log('number of tasks before remove', numberOfTasksCounter)
        // if (!isDoneEditMode) { //no cant use this unfortunately cause dont know which delete the user will press. so need to make this function again
    taskContainerCount.innerHTML = --numberOfTasksCounter
        // }
    console.log('number of tasks after remove', numberOfTasksCounter)

}


//########################################  SECOND PART ###########################################
//*** Basically the second part is activated when the user hits the archive button */
//I wonder what functions I can reuse from above. I can reuse the createToDoBox but I need to make changes so I will duplicate it and change what I need to change.


function archive(id) {

    //Archive makes the box go into the done box (so it also needs to get deleted)
    //Plus we need to create the taskboxes in the done container using same functions like above but we just need to tweak them
    //hmmm but would be better if i could have reused them somehow???
    console.log('id', id)
    enterValInDONEList(id)


    let toDoEntry = document.getElementById(id)
    toDoEntry.remove()
    console.log('number of tasks before remove', numberOfTasksCounter)
    taskContainerCount.innerHTML = --numberOfTasksCounter
    console.log('number of tasks after remove', numberOfTasksCounter)
}



function enterValInDONEList(id) {
    // we need to pass this id all the way!!
    //TODO: Take the input from the user and enter the value into a span  in the todoBox
    // 1.1 Render a rectangle with these createed elements inside it:  
    let doneBox = createDONEBox(id) //return a rectangle
        // a. span     + span.innerHTML = userInput.value
        //b.an archive button
        //c.an edit button
        //d. a delete button

    // 1.2  Append the rectangle to the div .done (instead of div. todo)
    doneContainer.append(doneBox)

}


function createDONEBox(id) {
    doneContainerCount.innerHTML = ++numberofDONETasksCounter
    let doneBox = document.createElement('div')
    doneBox.id = id //it needs it so you can grab the row later
    doneBox.classList.add('task-entry-done')
        //craete span inside with task:
    let span = document.getElementById(id).children[0]
    span.classList.add('strikeThrough')
        // let span = createSpan() /NO!! how do i create a span?? do I need to create a span?? i just grab the children instead..
    doneBox.append(span)

    let btnUnarchive = `<button type="button" class="unArchive" onclick="unArchive('${id}')">Unarchive</button>`
    let btnDeleteTask = `<button type="button" class="deleteTask" onclick="deleteTask2('${id}')">Delete Task</button>`
    doneBox.innerHTML += btnUnarchive
    doneBox.innerHTML += btnDeleteTask


    return doneBox

    // alternative we could  have:
    //  
    // for (let i = 0; i < doneBox.childElementCount; i++ ) {
    //    doneContainer.append( doneBox.children[i])
    // }
}




//The only reason I needed to create this function again is for the counter!!:
function deleteTask2(id) {
    //    deletes the row 
    console.log('id', id)
    let doneEntry = document.getElementById(id)

    console.log(doneEntry) //<divid='2'class='todo-entry'>......</div> the whole box
    doneEntry.remove()
    console.log('number of DONE tasks before remove', numberofDONETasksCounter)
        // if (!isDoneEditMode) { //no cant use this unfortunately cause dont know which delete the user will press. so need to make this function again    
    doneContainerCount.innerHTML = --numberofDONETasksCounter
        // }
    console.log('number of DONE tasks after remove', numberofDONETasksCounter)

}

function unArchive(id) {

    //same functionality like the archive basically! SHOULD i really recreate all the divs again...but i can reuse functions at least this time :) NO!! actually i need a whole new function!!! becasue I want it to have same id.

    //just to remove the strikethrough:
    let span = document.getElementById(id).children[0]
    span.classList.remove('strikeThrough')

    //needs also to be deleted
    let doneEntry = document.getElementById(id) //IMPROTANT this needs to be in beginning of function we dont want to remove from todo list we want to remove from done list so we grabbing the whole element in the DONE AREA

    doneContainerCount.innerHTML = --numberofDONETasksCounter
    taskContainerCount.innerHTML = ++numberOfTasksCounter
    againRENTERValInList(id)

    //IMPORTANT dont remove the whole DONE ELEMENT before you recreate the list it has the same id!! so just save doneEntry with an id in this function. becasue otherwise if you delete it the id gets deleted and you cant recreate it in the TODO part.
    doneEntry.remove()

}

//these next two function i need to remake again!! But this time we passing the same id!!!!
function againRENTERValInList(id) {

    //TODO: Take the input from the user and enter the value into a span  in the todoBox
    // 1.1 Render a rectangle with these createed elements inside it:  
    let taskBox = againRECREATEToDoBox(id) //return a rectangle
        // a. span     + span.innerHTML = userInput.value
        //b.an archive button
        //c.an edit button
        //d. a delete button

    // 1.2  Append the rectangle to the div .todo
    toDoContainer.append(taskBox)

}

//The reason for recreateing this function is becasue we need the same id we cant create a new id!! when it goes back into list
function againRECREATEToDoBox(id) {
    let taskBox = document.createElement('div') //same name like in above function but local so its ok.
    taskBox.id = id
    taskBox.classList.add('todo-entry')
        //craete span inside with task:
    let span = document.getElementById(id).children[0]
    taskBox.append(span)

    let btnArchive = `<button type="button" class="archive" onclick="archive(${id})">Archive</button>`
    let btnEditTask = `<button type="button" class="editTask" onclick="editTask(${id})">Edit Task</button>`
    let btnDeleteTask = `<button type="button" class="deleteTask" onclick="deleteTask(${id})">Delete Task</button>`

    taskBox.innerHTML += btnArchive
    taskBox.innerHTML += btnEditTask
    taskBox.innerHTML += btnDeleteTask

    return taskBox
}