const task = document.getElementById('task');
const date = document.getElementById('date');
let list = document.getElementById('list');
const notasks = document.getElementById('no-tasks');
const warning = document.getElementById('warning');
const form = document.getElementById('form');
const form_button = document.getElementById('form-show-button');
const save_button = document.getElementById('save-button');
const reminder = document.getElementById('reminder');
let form_show = false;

listItemBoiler = (title, time, id) => `
    <div class= "task-left-text">
        <h6>${title}</h6>
        <p>${time}</p>
    </div>
    <div class="task-button">
        <button id="button-${id}">X</button>
    </div>
    `;

const checkTask = () => {
    if (list.getElementsByTagName('li').length > 0) {
        notasks.style.display = 'none';
    } else {
        notasks.style.display = 'block';
    }
};

form.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        saveTask();
    } else {
        return;
    }
});

save_button.addEventListener(
    'click',
    (saveTask = (e) => {
        // console.log(e);
        const listItem = document.createElement('li');
        const listItemId = task.value + (list.children.length + 1);
        listItem.setAttribute('id', listItemId);
        if (reminder.checked) {
            listItem.classList.add('reminder-border')
        } else {
            listItem.classList.add('no-reminder')
        }
        listItem.innerHTML = listItemBoiler(task.value, date.value, listItemId);

        listItem.addEventListener('dblclick', () => {
            if(listItem.classList.contains('reminder-border')) {
                listItem.classList.remove('reminder-border')
                listItem.classList.add('no-reminder-border')
            } else {
                listItem.classList.add('reminder-border');
                listItem.classList.remove('no-reminder-border')
            }
        })

        if (task.value.trim() == '' || date.value.trim() == '') {
            warning.style.display = 'block';
            if (warning.style.display == 'block') {
                warning.classList.add('animation-shake-warning-box');
                setTimeout(() => {
                    warning.classList.remove('animation-shake-warning-box');
                }, 500);
            } else {
                return;
            }
            return;
        } else {
            list.append(listItem);
            const button = document.getElementById(`button-${listItemId}`);
            console.log(button);
            button.addEventListener('click', () => {
                deleteTask(listItemId);
            });
            warning.style.display = 'none';
        }
        console.log(listItem);
        reminder.checked = false;
        task.value = '';
        date.value = '';
        checkTask();
    })
);

const deleteTask = (listItemId) => {
    const item = document.getElementById(listItemId);
    list.removeChild(item);
    checkTask();
};

const checkForm = () => {
    if (form_show) {
        form.style.display = 'flex';
        form_button.style.backgroundColor = '#f00';
        form_button.innerText = 'Close';
    } else {
        form.style.display = 'none';
        warning.style.display = 'none';
        form_button.style.backgroundColor = '#0f0';
        form_button.innerText = 'Add';
    }
};

form_button.addEventListener('click', () => {
    form_show = !form_show;
    checkForm();
});

document.body.addEventListener('load', checkTask, checkForm());
