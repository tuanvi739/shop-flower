if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}
else{
    ready()
}
function ready(){
    var removeCartItemButtons = document.getElementsByClassName('remove-item')
    console.log(removeCartItemButtons);

    for(var i = 0; i < removeCartItemButtons.length; i++){
        var button = removeCartItemButtons[i]
        button.addEventListener('click',removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('quantity-input')
    for(var i = 0; i<quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('product-btn')
    for (var i = 0; i < addToCartButtons.length; i++){
        var button = addToCartButtons[i]
        button.addEventListener('click',addToCartClicked)
    }

    document.getElementsByClassName('checkout')[0].addEventListener('click',purchaseClicked)

}

function purchaseClicked(){
    alert('Thank you for your purchase !')
    var cartItems = document.getElementsByClassName('top-cart')[0]
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event){
    var input = event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value =1
    }
    updateCartTotal()
}

function addToCartClicked(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('product-name')[0].innerText
    var price = shopItem.getElementsByClassName('product-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('image-item')[0].src
    console.log(title, price, imageSrc)
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc){
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-item')
    var cartItems = document.getElementsByClassName('top-cart')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-name')
    for(var i = 0; i<cartItemNames.length; i++){
        if(cartItemNames[i].innerText == title)
        {
            alert('This item is already added to the cart.')
            return
        }
    }
    var cartRowContents =`
            <div class="cart-image">
                <img src="${imageSrc}" alt="pd-1">
            </div>
            <div class="info-item">
            <span class="cart-item-name">${title}</span><br>
            <input class="quantity-input" type="number" value="1" min="1" max="5000" type="text"><span> X </span><span class="price-item">${price}</span>
            </div>
            <div class="remove-btn">
                <button class="remove-item">
                 +
                </button>
            </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('remove-item')[0].addEventListener('click',removeCartItem)
    cartRow.getElementsByClassName('quantity-input')[0].addEventListener('change',quantityChanged)
}

function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('top-cart')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-item')
    var total = 0
    for(var i = 0; i < cartRows.length; i++){
        var cartRow =cartRows[i]
        var priceElement = cartRow.getElementsByClassName('price-item')[0]
        var  quantityElement = cartRow.getElementsByClassName('quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$',''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total *100) /100
    document.getElementsByClassName('total-price')[0].innerText = '$' + total
}