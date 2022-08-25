let add = document.getElementById('add_button');
console.log(add);

add.addEventListener('click', () => {
  const willDo = document.getElementsByClassName('will_do')[0];

  const cloneDo = willDo.cloneNode(true);
  cloneDo.style.display = "inline-block";

  const main = document.getElementById('todo');
  main.appendChild(cloneDo);
});

const $ulSeletor = document.querySelector("#todo");

$ulSeletor.onclick = (e) => {
  const nodes = [...$box.childNodes];
  let index = nodes.indexOf(e.target);
  if (index == -1) {
    index = nodes.indexOf(e.target.parentElement);
    if (index == -1) {
      index = nodes.indexOf(e.target.parentElement.parentElement);
    }
  }

  const ul = document.getElementById('todo');
  const li = ul.getElementsByClassName('will_do');
  const check = li[index-2].getElementsByClassName('input')[0].checked;

  if (check != undefined) {
    if (check) {
      li[index-2].getElementsByClassName('will_do_text')[0].disabled = true;
    }
    else {
      li[index-2].getElementsByClassName('will_do_text')[0].disabled = false;
    }
  }
}