const makeDiv = value => {
  const $todo = document.createElement('div');

  // 체크 박스
  const $checkBox = document.createElement('label');
  $checkBox.className = "todo-check-box";

  const $checkInput = document.createElement('input');
  $checkInput.setAttribute('type', 'checkbox');
  $checkInput.className = 'todo-check';
  
  const $checkSpan = document.createElement('span');
  $checkSpan.className = 'todo-check-custom';

  $checkBox.appendChild($checkInput);
  $checkBox.appendChild($checkSpan);

  // 할 일 텍스트
  const $todoContent = document.createElement('p');
  $todoContent.textContent = value;
  $todoContent.className = "todo-content";

  // edit button
  const $editButton = document.createElement('button');
  $editButton.setAttribute('type', 'button');
  $editButton.className = "edit-button";
  const $editImg = document.createElement('img');
  $editImg.src = '../res/edit.png';
  $editButton.appendChild($editImg);

  // delete button
  const $deleteButton = document.createElement('button');
  $deleteButton.setAttribute('type', 'button');
  $deleteButton.className = "delete-button";
  const $delImg = document.createElement('img');
  $delImg.src = '../res/delete.png';
  $deleteButton.appendChild($delImg);

  $todo.appendChild($checkBox);
  $todo.appendChild($todoContent);
  $todo.appendChild($editButton);
  $todo.appendChild($deleteButton);

  return $todo;
}

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
  
  const $todo = makeDiv(value);
  document.getElementById('main').appendChild($todo);
}

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
}


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