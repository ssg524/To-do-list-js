const makeDiv = value => {
  const templete 
  = `<label>
        <input type="checkbox" class="todo-check">
        <span class="todo-check-custom"></span>
    </label>
    <p class="todo-content">${value}</p>
    <button type="button" class="edit-button"><img src="../res/edit.png" /></button>
    <button type="button" class="delete-button"><img src="../res/delete.png" /></button>
</label>`;
  
  const todo = document.getElementById('main');
  const div = document.createElement('div');
  div.innerHTML = templete;
  todo.appendChild(div);
};

const enter = (event) => {
  let value = 0;
  if (event.type === 'keydown') {
    if (event.key !== 'Enter' || event.target.value === '' || event.isComposing) return;
    value = event.target.value;
    event.target.value = '';
  }
  else if (event.type === 'click') {
    const $addInput = document.getElementById('todo-input');
    if ($addInput.value === '') return;
    value = $addInput.value;
    $addInput.value = '';
  }
  
  makeDiv(value);
};

const edit = (parent) => {
  const $editInput = document.createElement('input');
  $editInput.setAttribute('type', 'text');

  const pTag = parent.previousElementSibling;
  const value = pTag.textContent;
  pTag.textContent = '';
  pTag.appendChild($editInput);

  pTag.firstElementChild.value = value;
  pTag.firstElementChild.focus();

  pTag.firstElementChild.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' || event.target.value === '' || event.isComposing) {
      event.target.placeholder = '할 일을 입력해주세요.';
      return;
    }

    pTag.textContent = event.target.value;
  });
  pTag.firstElementChild.addEventListener('blur', (event) => {
    if (event.target.value === '') { 
      event.target.placeholder = '할 일을 입력해주세요.';
      return;
    }

    pTag.textContent = event.target.value;
  });
};


const $addInput = document.getElementById('todo-input');
const $addButton = document.getElementById('todo-button');
const $mainDiv = document.getElementById('main');

$addButton.addEventListener('click', enter);
$addInput.addEventListener('keydown', enter);

$mainDiv.addEventListener('click', (event) => {
  if (event.target.tagName === 'IMG') {
    parent = event.target.parentNode;

    if (parent.className === 'edit-button') {
      edit(parent);
    }
    else if (parent.className === 'delete-button') {
      document.getElementById('main').removeChild(parent.closest('div'));
    }
  }
  if (event.target.type === 'checkbox') {
    const pTag = event.target.closest('div').getElementsByClassName('todo-content')[0];
    if (event.target.checked) {      
      pTag.style.textDecoration = 'line-through';
      pTag.style.color = 'gray';
    }
    else {
      pTag.style.textDecoration = 'none';
      pTag.style.color = 'black';
    }
  }
});