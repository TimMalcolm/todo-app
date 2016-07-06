//Problem: User interaction doesn't provide desired results.
//Solution: Add interactivity so the user can manage daily task.

var taskInput = document.getElementById("new-task");; //new-task
var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
var completedTasksHolder  = document.getElementById("completed-tasks"); // completed-tasks

//New Task List itesm
var createNewTaskElement = function(taskstring){
	//create list item
	var listItem = document.createElement("li");
	//input (checkbox)
	var checkBox = document.createElement("input");//checkbox
	//label
	var label = document.createElement("label");//text
	//input (text)
	var editInput = document.createElement("input");//test
	//button.edit
	var editButton = document.createElement("button");
	//button.delete
	var deleteButton = document.createElement("button");
	//elements will need modifying

	checkBox.type = "checkbox";
	editInput.type = "text";

	editButton.innerText = "Edit";
	editButton.className = "edit";
	deleteButton.innerText = "Delete";
	deleteButton.className = "delete";
	label.innerText = taskstring;

	//elements will need appending
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
	
	return listItem;
}

//Add a new task
var addTask = function() {
	console.log("add task...");
	//Create a new list item with the text from #new-task:
	var listItem = createNewTaskElement(taskInput.value);
	//append listItem to incompleteTaskHolder
	incompleteTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);
	//Change task input value to default
	taskInput.value="";
}

//Edit an existing task
var editTask = function(){
	console.log("edit task...");
	var listItem = this.parentNode
	var editInput = listItem.querySelector("input[type=text");
	var label = listItem.querySelector("label");
	var containsClass = listItem.classList.contains("editMode");
	var editButton = listItem.querySelector("button.edit");
	//if the class of the parent is .editMode
	if(containsClass){
		//Switch from .editMode
		//label text to become the input's value
		label.innerText = editInput.value;
		console.log(editButton.innerText);
		editButton.innerText = "Edit";

	}else{
			//swich to .editMode
			//input value becomes the label's text
		editInput.value = label.innerText;
		console.log(editButton.innerText);
		editButton.innerText = "Save";

	}	
	//toggle .editMode on the list item
	listItem.classList.toggle("editMode");

}

//delect an exisitng task
var deleteTask = function(){
	console.log("delete task...");
	var listItem = this.parentNode;
	var ul = listItem.parentNode;
	//Remove the parent list item from the ul
	ul.removeChild(listItem);
}

//Mark a task as complete
var taskCompleted = function(){
	console.log("task complete...");
	//Append the task list item to the #completed-tasks
	var listItem = this.parentNode;
	completedTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete);
}	
//Mark a task as incomplete 
var taskIncomplete = function(){
	console.log("task incomplete...");
	//Append the task list item to the #incompleted-tasks
	var listItem = this.parentNode;
	incompleteTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler){
	console.log("Bind list items events...");
	//select taskListItem childern
	var checkBox = taskListItem.querySelector("input[type=checkbox]");
	var editButton = taskListItem.querySelector("button.edit");
	var deleteButton = taskListItem.querySelector("button.delete");
	var editLabel = taskListItem.querySelector("label");
		//bind editTask to edit button
		editButton.onclick = editTask;
		//editLabel.addEventListener("click", editTask);
		//bind deleteTask to the delete button
		deleteButton.onclick = deleteTask;
		//bind checkBoxEventHandler to the checkbox
		checkBox.onchange = checkBoxEventHandler;
}
	//When the checkbox is unchecked
		//Append the task list item to the #incomplete-tasks




//Set the click handler to the addtask function
addButton.onchange = addTask;
taskInput.addEventListener("change", addTask);


//cycle over incompleteTaskHolder ul list items
for(var i=0; i < incompleteTasksHolder.children.length; i++){
	//bind events to list item's childern (taskCompleted)
	bindTaskEvents(incompleteTasksHolder.children[i],taskCompleted);
}
	


//cycle over completedTaskHolder ul list items
for(var i=0; i < completedTasksHolder.children.length; i++){
	//bind events to list item's childern (taskIncomplete)
	bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}

		




