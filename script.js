const cardHolder = document.querySelector('#card-holder')
const cardTitle = document.querySelector('#title');
const cardDesc = document.querySelector('#description');
const cardLink = document.querySelector('#link');
const addCardBtn = document.querySelector('#add-card');
const source = document.querySelector('#source');
const filedata = document.querySelector('#fileName');
const dialog = document.querySelector('#favDialog');
const bg = document.querySelector('#bg');
const add = document.querySelector('#add');
const addDialog = document.querySelector('#cardDialog');
const head = document.querySelector('#head');

document.addEventListener('keyup', function (event) {
    if (event.key == "Escape") {
        bg.classList.remove("blur");
        dialog.close();
        addDialog.close();
    }
})


var blogs = 0;

function toggle_error() {
    dialog.showModal();
    bg.classList.add("blur");
}

function newCard() {
    addDialog.showModal();
    bg.classList.add("blur");
}

function close_error() {
    dialog.close();
    bg.classList.remove("blur");
    newCard();
}

function addNewCard() {
    const title = cardTitle.value;
    const desc = cardDesc.value;
    const file = source.files[0];
    const link = cardLink.value;
    index = Math.floor(Math.random() * (1000000000 - 9999999999)) + 1000000000;
    if (title == "") {
        toggle_error();
        return;
    }
    if (desc == "") {
        toggle_error();
        return;
    }
    if (link == "") {
        toggle_error();
        return;
    }
    if (source.value == "") {
        toggle_error();
        return;
    }
    console.log(source.value)
    const img = window.URL.createObjectURL(file);
    const cardItem = document.createElement('li');
    cardHolder.classList.add('card-item');
    cardItem.innerHTML = `
        <div class="card" id="${index}">
            <img name="image" class="cardimage" src="${img}" />
            <div class="detail">
                <label for="image" class="cardtitle"><strong>${title}</strong></label>
                <label for="image" class="cardtext">${desc}</label>
                <div class="commands">
                    <button class="cardCustomInput" type="button" onclick="window.open('${link}', '_blank')" >check</button>
                    <button class="cardCustomInput delete" data-index="${index}">Delete</button>
                </div>
            </div>
        </div>
        `;
    cardHolder.appendChild(cardItem);
    blogs += 1;
    reset()
}

function deleteCard(index) {
    var elem = document.getElementById(index);
    elem.parentNode.removeChild(elem);
    blogs -= 1;
    reset();
}

addCardBtn.addEventListener('click', addNewCard);



cardHolder.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        deleteCard(e.target.dataset.index);
    }
});

source.addEventListener('change', (e) => {
    if (e.target.files.length == 0) {
        alert("Please Select A Image");
        return;
    }
    filedata.innerHTML = `Image Selected`;
});

function reset() {
    cardTitle.value = "";
    cardDesc.value = "";
    source.value = "";
    cardLink.value = "";
    filedata.innerHTML = `Select Image`;
    addDialog.close()
    dialog.close()
    bg.classList.remove("blur");
    if (blogs == 0) {
        head.classList.add("show")
        head.classList.remove("hide")
    }
    else {
        head.classList.remove("show")
        head.classList.add("hide")
    }

}


reset();
