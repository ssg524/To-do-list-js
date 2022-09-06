class App {
  constructor() {
    this.todoTemplete = `<label>
        <input type="checkbox" class="todo-check">
        <span class="todo-check-custom"></span>
    </label>
    <p class="todo-content"></p>
    <button type="button" class="edit-button"><img src="../res/edit.png" /></button>
    <button type="button" class="delete-button"><img src="../res/delete.png" /></button>`;

    this.header = document.querySelector('header');
    this.main = document.getElementById('main');

    this.header.addEventListener('click', this.enter.bind(this));
    this.header.addEventListener('keydown', this.enter.bind(this));
  }

  makeDiv(value) {  
    const div = document.createElement('div');

    div.innerHTML = this.todoTemplete;
    div.getElementsByClassName('todo-content')[0].textContent = value;

    // 버튼, 체크박스 이벤트 걸어주기
    const [ editBtn, delBtn ] = div.getElementsByTagName('button');
    editBtn.addEventListener('click', this.editButton.bind(this));
    delBtn.addEventListener('click', this.deleteButton.bind(this));

    const checkBox = div.getElementsByClassName('todo-check')[0];
    checkBox.addEventListener('click', this.check.bind(this));

    this.main.appendChild(div);
  }

  enter(event) {
    if (!(event.target.matches('header > #todo-input') || event.target.matches('header > #todo-button'))) return;

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

    this.makeDiv(value);
  }

  edit(parent) {
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

  editButton(event) {
    this.edit(event.currentTarget);
  }

  deleteButton (event) {
    this.main.removeChild(event.target.closest('div'));
  }

  check(event) {
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
}

window.onload = () => {
  new App();
}