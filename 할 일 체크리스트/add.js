const addInput = document.querySelector('.add-input');
const list = document.querySelector('.list');

function add(data) {
  const inputValue = addInput.value;
  const index = data.length;

  const li = document.createElement('li');
  li.classList.add('item');
  li.innerHTML = `<b>${index + 1}</b>${inputValue}<button class="del-btn" data-index="${index}">x</div>`;
  list.append(li);

  data.push(inputValue);

  addInput.value = '';
  addInput.focus();
}

function emptyAlert() {
  alert('오늘 할 일을 입력해 주세요.');
  addInput.focus();
}

function maxAlert() {
  alert('할 일은 최대 5개까지만 고민할 수 있습니다.');
  addInput.value = '';
}

export function addMenu(data) {
  const inputValue = addInput.value;

  if (inputValue === '') {
    emptyAlert();
  } else if (data.length > 4) {
    maxAlert();
  } else {
    add(data);
  }
};
