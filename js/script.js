let objectInCard = {};

fetch('https://api.npoint.io/607eea28f41460f5be2d')
    .then(response => response.json())
    .then(data => {
        localStorage.setItem("products_items", JSON.stringify(data))
        let objectInStorage = localStorage.getItem("products_items")
        renderArray(JSON.parse(objectInStorage))
    })
    .catch(() => console.log('Oops! Is your server disconnected!?'))

// let objectInCard = new Object();
//
// let xhr = new XMLHttpRequest();
// xhr.open("GET", "https://api.npoint.io/607eea28f41460f5be2d");
// xhr.send();
// xhr.onload = function () {
//     localStorage.setItem("products_items", xhr.response)
//     let object_in_storage = JSON.parse(localStorage.getItem("products_items"))
//     renderArray(object_in_storage)
// }

function renderArray(responseObj) {

    document.body.insertAdjacentHTML("afterbegin", `
               <div class="container">
                   <div class="products" id="products">${renderObj(responseObj)}</div>
                   <div class="cart reverse" id="cart">
                   <p class="cart_title" id="cart_title">Cart:</p>
                   <div class="cardItems" id="cardItems"></div>
                   <p class="cart_total" id="cart_total">Total SUM:
                        <span class="cart_total_sum" id="cart_total_sum">0<span class="cart_total_sum_currency">USD</span></span>
                   </p>
                   </div>
               </div>
         `)

    if (localStorage.cartUpdate){
        objectInCard = JSON.parse(localStorage.cartUpdate);
    }


    updateCardAndSum();

    let products = document.querySelector('#products');
    let cart = document.querySelector('#cart');

    products.addEventListener('click', clickOnButton);

    function clickOnButton(e) {
        if (e.target.id === 'products_button_add') {

            let phone_name = e.target.dataset.name;
            let phone_price = e.target.previousElementSibling.textContent;
            let phone_id = e.target.dataset.id;

            if (!objectInCard[e.target.dataset.id]) {
                objectInCard[e.target.dataset.id] = {
                    id: phone_id,
                    name: phone_name,
                    price: phone_price,
                    qty: 1
                }
            } else {
                objectInCard[e.target.dataset.id].qty += 1;
            }
            updateCardAndSum();
        }
    }

    cart.addEventListener('click', buttonRemoveItem);

    function buttonRemoveItem(e) {
        if (e.target.id === 'cart_button_remove_item') {
            if (objectInCard[e.target.dataset.id].qty > 1) {
                objectInCard[e.target.dataset.id].qty -= 1;
            } else {
                delete objectInCard[e.target.dataset.id];
            }
        } else if (e.target.id === 'cart_products_button_add_item') {
            objectInCard[e.target.dataset.id].qty += 1;
        } else if (e.target.id === 'cart_remove_items_all') {
            delete objectInCard[e.target.dataset.id];
        }
        updateCardAndSum();
    }
}

function updateCardAndSum() {
    let cardItems = document.querySelector('#cardItems');
    let cart_total_sum = document.querySelector('#cart_total_sum');
    let totalSum = 0;

    cardItems.textContent = "";

    for (let key in objectInCard) {
        cardItems.insertAdjacentHTML("beforeend", renderItemCard(objectInCard[key]))
        totalSum += parseInt(objectInCard[key].price) * objectInCard[key].qty;
    }
    cart_total_sum.innerHTML = `${totalSum.toString()}<span class="cart_total_sum_currency">USD</span>`;

    localStorage.setItem("cartUpdate", JSON.stringify(objectInCard));
}


function renderItemCard(elem) {
    return `<div class="cart_item">
                    <p class="phone_name" id="phone_name">${elem.name}</p>
                    <p class="phone_price" id="phone_price">${parseInt(elem.price)}
                        <span class="phone_price_currency">USD for 1 item</span>
                    </p>
                    <p class="phone_quantity" id="phone_quantity">Quantity:
                        <span class="phone_quantity_amount">${elem.qty}</span>
                        <div class="cart_block_of_buttons">
                            <button class="cart_products_button_add_item portray_button" id="cart_products_button_add_item" data-id="${elem.id}" data-id="${elem.id.qty}">Add</button>      
                            <button class="cart_button_remove_item portray_button" id="cart_button_remove_item" data-id="${elem.id}" data-id="${elem.id.qty}">Remove one item</button>
                            <button class="cart_remove_items_all portray_button" id="cart_remove_items_all" data-id="${elem.id}">Remove all item</button>      
                        </div>
                    </p>
            </div>`
}

function renderObj(changeObj) {
    return changeObj.map(function (item) {
        return `
            <div class="products_item" id="products_item">
                <h4 class="products_name" id="products_name">${item.name}</h4>
                <div class="products_img">
                    <img class="products_pict" src="${item.img}">
                </div> 
                <div class="products_choice" id="products_choice">
                    <p class="products_price" id="products_price">${item.price}<span class="products_price_currency">USD</span></p>
                    <button class="products_button_add portray_button" id="products_button_add" data-id="${item.id}" data-name="${item.name}">To cart</button>
                </div> 
             </div>
    `
    }).join('');
}













