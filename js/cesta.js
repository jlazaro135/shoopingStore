const addToCartButtons = document.querySelectorAll('.add-item');
addToCartButtons.forEach(addToCartButton => {
    addToCartButton.addEventListener('click', addingToCart);
})

const articleContainer = document.querySelector('.articleContainer');

function addingToCart(event){
   const button = event.target;
   const article = button.closest('.article');
   
   const articleTitle = article.querySelector('.title').textContent;
   const articlePrice = article.querySelector('.precio').textContent;
   const articleQt = article.querySelector('.qt').value;
   const articleImg = article.querySelector('.img').src;
   
   addArticleToCart(articleTitle, articlePrice, articleQt, articleImg);
}

function addArticleToCart(articleTitle, articlePrice, articleQt, articleImg){

    const titleDescriptionCart = articleContainer.getElementsByClassName('titleDescription');
    
    for (let i= 0; i < titleDescriptionCart.length; i++){
        console.log(titleDescriptionCart[i]);
        if (titleDescriptionCart[i].textContent === articleTitle){
            
            let articleCartQt = titleDescriptionCart[
                i
                ].closest('.cartArticle').querySelector(
                '.qt-cart'
                );

            // si vuelve a añadir artículo/artículos con el mismo nombre, suma uds seleccionadas a las uds ya existentes en el ArticleContainer
            articleCartQt1 = Number(articleCartQt.value);
            articleQt = Number(articleQt);
            articleCartQt1 += articleQt;
            articleCartQt.value = articleCartQt1;
            updateCartTotal();
            updateCestaHeader();
            return;
        }
    }

    const cartArticleBlock = document.createElement('div');
    cartArticleBlock.className = "cartArticle row border-bottom border-dark py-2";
    const articleContent = `              
        <div class="img col-2">
            <img src=${articleImg} alt="producto" class="w-100">
        </div>
        <div class="col-10 d-flex flex-column justify-content-center">
            <h5 class="titleDescription">${articleTitle}</h5>
            <div class="d-flex align-items-center justify-content-between col-12 pb-3">
                <label class="qt me-2">cantidad</label>
                <div class="d-flex align-items-center col-4">
                <input type="number" class="qt-cart form-control w-50 me-2" value=${articleQt} min="1">
                <p class="mb-0">x <span class="price-unit">${articlePrice}</span>€</p>
                </div> 
                <button class="deleteArticle ms-auto btn btn-danger">X</button>
            </div>
        </div>`;
    cartArticleBlock.innerHTML = articleContent;
    articleContainer.append(cartArticleBlock);

    cartArticleBlock.querySelector('.deleteArticle').addEventListener('click', deleteCartArticle)
    updateCartTotal();
    updateCestaHeader();

    cartArticleBlock.querySelector('.qt-cart').addEventListener('change', updateCartTotal)
}

function updateCartTotal(){
    let total = 0;
    const cartTotal = document.querySelector('.cartTotal');

    const cartArticles = document.querySelectorAll('.cartArticle');

    cartArticles.forEach(cartArticle => {
        const articlePriceElement = cartArticle.querySelector('.price-unit');
        const cartArticlePrice = Number(articlePriceElement.textContent);
        const articleQtElement = cartArticle.querySelector('.qt-cart');
        const cartArticleQt = Number(articleQtElement.value);
        total = total + cartArticlePrice * cartArticleQt;
    })
    cartTotal.innerHTML = `${total.toFixed(2)}€`


    const iva = document.getElementById('noIva');
    const noIva = document.getElementById('iva');

    iva.innerHTML = `${(total/1.21).toFixed(2)}`
    noIva.innerHTML = `${(total-(total/1.21)).toFixed(2)}`

    updateCestaHeader();
    
}

function deleteCartArticle(event){
    const buttonClicked = event.target;
    buttonClicked.closest('.cartArticle').remove();
    updateCartTotal();
    updateCestaHeader();
}

function updateCestaHeader(){
    const cestaHeader = document.getElementById('cestaHeader');
    const cartArticles = document.querySelectorAll('.cartArticle');

    let qtTotal = 0;
    cartArticles.forEach(cartArticle => {
        const articleQtElement = cartArticle.querySelector('.qt-cart');
        const cartArticleQt = Number(articleQtElement.value);
        qtTotal = qtTotal + cartArticleQt   
    });
    cestaHeader.innerHTML = qtTotal;
}

const buyHeader = document.querySelector('.buy');

const emptyCartBtn = document.getElementById('emptyCart')
emptyCartBtn.addEventListener('click', emptyCart)

function emptyCart(){
    while (articleContainer.firstChild) {
        articleContainer.removeChild(articleContainer.firstChild);
        updateCestaHeader();
        updateCartTotal()
    }
}

const btns = document.querySelectorAll('.add-item');
btns.forEach(btnAddItem => {
    btnAddItem.addEventListener('click', sweetAlert)
})

const articleTitle = document.querySelector('.title');

function sweetAlert(){
    Swal.fire({
        title: '¡Artículo añadido!',
        text: 'Su artículo se ha añadido a la cesta',
        icon: 'success',
        showCloseButton: true,
        confirmButtonText: 'seguir comprando',
      })
};









