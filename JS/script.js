document.addEventListener('click', function(event) {
    if (!event.target.matches('.add-to-cart')) return;
    event.preventDefault();
    addToCart(event);
}, false);

let total = 0;

var itemCount = document.getElementById('item-count');

function addToCart(event) {
    var productImage = event.target.previousElementSibling.previousElementSibling.previousElementSibling.getAttribute('src');
    var productName = event.target.previousElementSibling.previousElementSibling.textContent;
    var productPrice = parseFloat(event.target.previousElementSibling.getAttribute('data-price'));
    var cartItems = document.getElementById('cart-items');
    var listItem = document.createElement('li');
    var div = document.createElement('div');
    div.className = 'cart-item';

    var imgWrapper = document.createElement('div');
    imgWrapper.className = 'img-wrapper';
    var img = document.createElement('img');
    img.src = productImage;
    imgWrapper.appendChild(img);
    div.appendChild(imgWrapper);

    var namePriceDiv = document.createElement('div');

    var name = document.createElement('p');
    name.textContent = productName;
    namePriceDiv.appendChild(name); 
    
    var price = document.createElement('p');
    price.textContent = productPrice.toFixed(2); 
    namePriceDiv.appendChild(price); 
    
    div.appendChild(namePriceDiv); 

    //Remove Button

    var removeBtn = document.createElement('button');
    removeBtn.textContent = 'X';
    removeBtn.className = 'remove-button';
    
    removeBtn.addEventListener('click', function() {
        cartItems.removeChild(listItem);
        total -= productPrice;
        document.getElementById('total').textContent = 'TOTAL: PHP ' + total.toFixed(2);
    
        itemCount.textContent = parseInt(itemCount.textContent) - 1;
    });
    div.appendChild(removeBtn);

    listItem.appendChild(div);
    cartItems.appendChild(listItem);
    total += productPrice;
    document.getElementById('total').textContent = 'Total: Php ' + total.toFixed(2);

    itemCount.textContent = parseInt(itemCount.textContent) + 1;

    /*Add to cart animation*/

    var tempElement = document.createElement('div');
    tempElement.className = 'temp-element';
    tempElement.style.backgroundImage = `url(${productImage})`;

    // Position the temporary element over the actual item
    var rect = event.target.getBoundingClientRect();
    tempElement.style.position = 'absolute';
    tempElement.style.top = `${rect.top}px`;
    tempElement.style.left = `${rect.left}px`;

    // Add the temporary element to the body
    document.body.appendChild(tempElement);

    // Animate the temporary element to the cart
    var cartRect = document.querySelector('.fa-shopping-bag').getBoundingClientRect();
    tempElement.style.transition = 'all 0.5s ease-in-out';
    tempElement.style.top = `${window.scrollY + cartRect.top}px`; 
    tempElement.style.left = `${window.scrollX + cartRect.left}px`; 
    tempElement.style.transform = 'scale(0.5)';

    // Remove the temporary element after the animation
    setTimeout(function() {
        document.body.removeChild(tempElement);
    }, 500);

}

//Checkout Button

var checkoutButton = document.querySelector('.checkout');

checkoutButton.addEventListener('click', function() {
    var cartItems = document.getElementById('cart-items');

    while (cartItems.firstChild) {
        cartItems.removeChild(cartItems.firstChild);
    }
    total = 0;
    document.getElementById('total').textContent = 'Total: Php ' + total.toFixed(2);

    itemCount.textContent = '0';
});

//Thank you for shopping with us!

var checkoutDiv = document.querySelector('.checkout');
var modal = document.getElementById('checkout-modal');

checkoutDiv.addEventListener('click', function() {
    modal.style.display = 'block';
});

var continueShoppingButton = document.getElementById('continue-shopping');

continueShoppingButton.addEventListener('click', function() {
    modal.style.display = 'none';
});
