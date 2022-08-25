const add = document.getElementById('add_button');

add.addEventListener('click', () => {
  const willDo = document.getElementsByClassName('will_do')[0];

  const cloneDo = willDo.cloneNode(true);
  cloneDo.style.display = "block";

  const main = document.getElementById('todo');
  main.appendChild(cloneDo);
});

const $ulSeletor = document.getElementById("todo");
$ulSeletor.onclick = (e) => {
  if (e.target.type === 'checkbox') {
    const grandParent = e.target.closest('li');

    if (e.target.checked) {
      grandParent.querySelector('input[type=text]').disabled = true;
      grandParent.querySelector('input[type=text]').style.textDecoration = 'line-through';
    }
    else {
      e.target.parentElement.parentElement.querySelector('input[type=text]').disabled = false;
      grandParent.querySelector('input[type=text]').style.textDecoration = 'none';
    }
  }

  if (e.target.type === 'button') {
    const parent = e.target.parentElement;

    const main = document.getElementById('todo');
    main.removeChild(parent);
  }
}