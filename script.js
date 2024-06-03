// הפעלת הפונקציה בעת טעינת המסמך
document.addEventListener('DOMContentLoaded', loadTasks);
// הוספת מאזין לאירוע לכפתור הוספת מטלה
document.getElementById('addTaskButton').addEventListener('click', addTask);

function loadTasks() {
    // טעינת המטלות מהאחסון המקומי
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // הוספת כל מטלה ל-DOM
    tasks.forEach((task, index) => addTaskToDOM(task, index + 1));
}

function addTask() {
const taskInput = document.getElementById('taskInput'); // שדה קלט למטלה
    const task = taskInput.value.trim(); // קבלת ערך המטלה
    if (task === '') return; // בדיקה אם הערך ריק

    const taskIndex = document.getElementById('taskList').children.length + 1; // מספר המטלה
    addTaskToDOM(task, taskIndex); // הוספת המטלה ל-DOM
    saveTask(task); // שמירת המטלה באחסון המקומי
    taskInput.value = ''; // ניקוי שדה הקלט

    startConfetti(); // הפעלת אנימציית קונפטי
}

function addTaskToDOM(task, taskIndex) {
    const taskList = document.getElementById('taskList'); // רשימת המטלות

    const li = document.createElement('li'); // יצירת פריט חדש
    li.className = 'task-item'; // הוספת מחלקה לפריט

    const taskNumber = document.createElement('span'); // יצירת אלמנט מספר המטלה
    taskNumber.className = 'task-number'; // הוספת מחלקה
    taskNumber.textContent = taskIndex + '.'; // הגדרת מספר המטלה

    const input = document.createElement('input'); // יצירת שדה קלט למטלה
    input.type = 'text';
    input.value = task;
    input.setAttribute('readonly', 'readonly'); // הגדרת קריאה בלבד
    input.classList.add('task-input'); // הוספת מחלקה

    const editButton = document.createElement('button'); // יצירת כפתור עריכה
    editButton.textContent = 'ערוך';
    editButton.classList.add('edit-button'); // הוספת מחלקה

    const deleteButton = document.createElement('button'); // יצירת כפתור מחיקה
    deleteButton.textContent = 'מחק';
    deleteButton.classList.add('delete-button'); // הוספת מחלקה

    // הוספת אלמנטים לפריט
    li.appendChild(taskNumber);
    li.appendChild(input);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li); // הוספת הפריט לרשימה

    editButton.addEventListener('click', () => {
        // מאזין לאירוע עריכה
        if (editButton.textContent === 'ערוך') {
            input.removeAttribute('readonly'); // הסרת קריאה בלבד
            input.focus(); // מיקוד בשדה הקלט
            editButton.textContent = 'שמור'; // שינוי טקסט הכפתור
        } else {
            input.setAttribute('readonly', 'readonly'); // הגדרת קריאה בלבד
            editButton.textContent = 'ערוך'; // שינוי טקסט הכפתור חזרה
            updateTask(task, input.value); // עדכון המטלה באחסון המקומי
        }
    });

    deleteButton.addEventListener('click', () => {
        // מאזין לאירוע מחיקה
        li.remove(); // הסרת הפריט מה-DOM
        deleteTask(task); // מחיקת המטלה מהאחסון המקומי
        updateTaskIndices(); // עדכון מספרי המטלות
    });
}

function saveTask(task) {
    // שמירת המטלה באחסון המקומי
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTask(oldTask, newTask) {
    // עדכון מטלה באחסון המקומי
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const index = tasks.indexOf(oldTask);
    if (index !== -1) {
        tasks[index] = newTask;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function deleteTask(task) {
    // מחיקת מטלה מהאחסון המקומי
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

function updateTaskIndices() {
    // עדכון מספרי המטלות ברשימה
    const taskList = document.getElementById('taskList');
    const tasks = taskList.children;
    Array.from(tasks).forEach((task, index) => {
        const taskNumber = task.querySelector('.task-number');
        taskNumber.textContent = (index + 1) + '.';
    });
}

function startConfetti() {
    // הפעלת אנימציית קונפטי
    const confettiContainer = document.getElementById('confetti-container');
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti ' + getRandomShape(); // הוספת צורת קונפטי
        confetti.style.left = Math.random() * 100 + '%'; // מיקום אקראי לרוחב
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's'; // משך אקראי לאנימציה
        confetti.style.backgroundColor = getRandomPink(); // צבע אקראי בגווני ורוד
        confettiContainer.appendChild(confetti);
    }
    setTimeout(() => confettiContainer.innerHTML = '', 3000); // ניקוי קונפטי לאחר 3 שניות
}

function getRandomPink() {
    // הפקת צבע ורוד אקראי
    const pinkShades = ['#ffc0cb', '#ffb6c1', '#ff69b4', '#ff1493', '#db7093'];
    return pinkShades[Math.floor(Math.random() * pinkShades.length)];
}

function getRandomShape() {
    // הפקת צורת קונפטי אקראית
    const shapes = ['circle', 'square', 'triangle', 'rectangle', 'curved'];
    return shapes[Math.floor(Math.random() * shapes.length)];
}
