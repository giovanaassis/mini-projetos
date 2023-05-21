const input = document.querySelector('input');
const button = document.querySelector('.btn-add-task');
const fullList = document.querySelector('#task-list')

let listaDeItens = []

function addItem() {

    if (input.value === '') {
        alert('Por favor, adicione uma tarefa.')
        showTask()
    } else {
    listaDeItens.push({
        task: input.value,
        complete: false
    })
    input.value = ''
    showTask()
    }
}


function showTask() {
    let newLi = ''

    listaDeItens.forEach((item, index) => {
        newLi = newLi + `
        
        <li class="${item.complete && "done"}">
            <img src="imagens/checked.png" alt="Ícone de check" onclick="completeTask(${index})">
            <p>${item.task}</p>
            <img src="imagens/trash.png" alt="ícone de lixo" onclick='deleteItem(${index})'>
        </li>

        `
    })

    fullList.innerHTML = newLi

    localStorage.setItem('list', JSON.stringify(listaDeItens))
}

function completeTask(position) {
    listaDeItens[position].complete = !listaDeItens[position].complete

    showTask()
}

function deleteItem(position) {
    listaDeItens.splice(position, 1)

    showTask()
}

function reloadTasks() {
    const localStorageTasks = localStorage.getItem('list')

    if (localStorageTasks) {
    listaDeItens = JSON.parse(localStorageTasks)
    }

    showTask()
}

reloadTasks()
button.addEventListener('click', addItem)