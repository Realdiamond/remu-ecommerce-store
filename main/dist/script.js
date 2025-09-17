let currentlyDisplayed = 0;
const productPerload = 30; 
function displayLightningProducts(products){
    const limitedProducts = document.getElementById('limited-deals-products');
    
    products.forEach(product => {  
        const LimitedProductCard = createLimitedProductCard(product);
        limitedProducts.append(LimitedProductCard);
    });


}

function createStarRating(rating) {
    const starContainer = document.createElement('div');
    starContainer.className = 'star-rating';
    
    for (let i = 1; i <= 5; i++) {
        const starWrapper = document.createElement('div');
        starWrapper.className = 'star-wrapper';
        
        
        const emptyStar = document.createElement('span');
        emptyStar.className = 'star-empty';
        emptyStar.textContent = '★';
        
        
        const filledStar = document.createElement('span');
        filledStar.className = 'star-filled';
        filledStar.textContent = '★';
        
        
        let fillPercentage = 0;
        if (rating >= i) {
            fillPercentage = 100;
        } else if (rating > i - 1) {
            fillPercentage = (rating - (i - 1)) * 100;
        }
        
        filledStar.style.width = `${fillPercentage}%`;
        
        starWrapper.append(emptyStar);
        starWrapper.append(filledStar);
        starContainer.append(starWrapper);
    }
    
    return starContainer;
}


function createLimitedProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';

    
    const productImage = document.createElement('img');
    productImage.src = product.images[0] || product.images[1];
    productImage.alt = product.title;

    const productTitle = document.createElement('h4');
    productTitle.className = 'product-title';
    productTitle.textContent = product.title;
    productTitle.style.whiteSpace = 'nowrap';
    productTitle.style.overflow = 'hidden';
    productTitle.style.textOverflow = 'ellipsis';

    const productDescription = document.createElement('p');
    productDescription.className = 'product-description';
    if (product.description.length > 30) {
        let sliced = product.description.slice(0, 30);
        productDescription.textContent = `${sliced}...`;
        
    } else {
        productDescription.textContent = product.description
    }

    const productPrice = document.createElement('p');
    productPrice.className = 'product-price';
    productPrice.textContent = `$${product.price}`;

    const productAvailabilityContainer = document.createElement('div');
    productAvailabilityContainer.className = 'availability-container';

    const availabilityStatus = document.createElement('p');
    availabilityStatus.textContent = product.availabilityStatus;
    availabilityStatus.className = 'availability-status';

    productAvailabilityContainer.append(availabilityStatus);


    const ReviewContainer = document.createElement('div');
    ReviewContainer.className = 'review-container';

    const starRating = createStarRating(product.rating);

    const reviewCount = product.reviews.length || 0;

    const reviewText = document.createElement('p');
    reviewText.textContent = `(${reviewCount} reviews)`;
    reviewText.className = 'review-count'


    
    ReviewContainer.append(starRating);
    ReviewContainer.append(reviewText);


    card.append(productImage);
    card.append(productTitle);
    card.append(productDescription);    
    card.append(productPrice);
    card.append(productAvailabilityContainer)
    card.append(ReviewContainer);

    return card;
}

function displayFirstProducts() {
    const megaSales = document.getElementById('mega-sales-products');

    const firstLoad = allProducts.slice(0, productPerload);
    currentlyDisplayed = firstLoad.length;

    firstLoad.forEach(product => {
        const megaSalesProduct = createMegaProductCard(product);
        megaSales.append(megaSalesProduct)
    });
}



function createMegaProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';

    
    const productImage = document.createElement('img');
    productImage.src = product.images[0] || product.images[1];
    productImage.alt = product.title;

    const productTitle = document.createElement('h4');
    productTitle.className = 'product-title';
    productTitle.textContent = product.title;
    productTitle.style.whiteSpace = 'nowrap';
    productTitle.style.overflow = 'hidden';
    productTitle.style.textOverflow = 'ellipsis';

    const productDescription = document.createElement('p');
    productDescription.className = 'product-description';
    if (product.description.length > 30) {
        let sliced = product.description.slice(0, 30);
        productDescription.textContent = `${sliced}...`;
        
    } else {
        productDescription.textContent = product.description
    }

    const productPrice = document.createElement('p');
    productPrice.className = 'product-price';
    productPrice.textContent = `$${product.price}`;

    const productAvailabilityContainer = document.createElement('div');
    productAvailabilityContainer.className = 'availability-container';

    const availabilityStatus = document.createElement('p');
    availabilityStatus.textContent = product.availabilityStatus;
    availabilityStatus.className = 'availability-status';

    productAvailabilityContainer.append(availabilityStatus);


    const ReviewContainer = document.createElement('div');
    ReviewContainer.className = 'review-container';

    const starRating = createStarRating(product.rating);

    const reviewCount = product.reviews.length || 0;

    const reviewText = document.createElement('p');
    reviewText.textContent = `(${reviewCount} reviews)`;
    reviewText.className = 'review-count'


    
    ReviewContainer.append(starRating);
    ReviewContainer.append(reviewText);


    card.append(productImage);
    card.append(productTitle);
    card.append(productDescription);    
    card.append(productPrice);
    card.append(productAvailabilityContainer)
    card.append(ReviewContainer);

    return card;
}

function startShowMoreButton() {
    const showMoreButton = document.getElementById('show-more-button');

   showMoreButton.addEventListener('click', showMoreProducts);
}

function showMoreProducts() {
    const megaSales = document.getElementById('mega-sales-products');
    
   
    const nextBatch = allProducts.slice(currentlyDisplayed, currentlyDisplayed + productPerload);
    
    
    nextBatch.forEach(product => {
        const megaSalesProduct = createMegaProductCard(product);
        megaSales.append(megaSalesProduct);
    });
    
    
    currentlyDisplayed = currentlyDisplayed + nextBatch.length;
    
    updateShowMoreButton();
}

function updateShowMoreButton() {
    const showMoreButton = document.getElementById('show-more-button');
    
    if (currentlyDisplayed >= allProducts.length) {
        showMoreButton.style.display = 'none';
        
    } else {
        showMoreButton.style.display = 'block';
    }
}
