async function categoryData(){
    try{
        const response = await fetch("https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json");
        const productList = await response.json();
        return productList.categories;
    }catch(err){
        console.log(err);
    }
}
function discountCalculator(currentPrice, originalPrice){
    return parseInt(((originalPrice-currentPrice)/originalPrice)*100);
}

async function productList(category){
    let data = await categoryData();
    let productTab = document.querySelector(".product");
    productTab.innerHTML = "";
    for(let i=0; i<data.length; i++){
        if(data[i]['category_name']==category){
            for(let product of data[i].category_products){
                let img = document.createElement('img');
                img.setAttribute("src", product['image']);
                let div = document.createElement('div');
                div.classList.add("card");
                let addToCartBtn = document.createElement('button');
                addToCartBtn.innerText="Add to cat";
                let title = document.createElement('span');
                title.classList.add('title');
                title.innerText= product['title'];
                let currentPrice = document.createElement('span');
                currentPrice.classList.add('currentPrice');
                currentPrice.innerText = `Rs. ${product['price']}.00`;
                let originalPrice = document.createElement('span');
                originalPrice.classList.add("originalPrice");
                originalPrice.innerText = `${product['compare_at_price']}`;
                let vendor = document.createElement('span');
                vendor.classList.add('vendor');
                vendor.innerHTML = `&#x2022; ${product['vendor']}`;
                let discount = document.createElement('span');
                discount.classList.add('discount');
                discount.innerText = `${discountCalculator( parseInt(product['price']), parseInt(product['compare_at_price']) )}% off`;
                let upperDiv = document.createElement('div');
                upperDiv.classList.add('upperDiv');
                let lowerDiv = document.createElement('div');
                lowerDiv.classList.add('lowerDiv');
                upperDiv.append(title, vendor);
                lowerDiv.append(currentPrice, originalPrice, discount);
                let cardContent = document.createElement('div');
                if(product['badge_text']){
                    let badge = document.createElement('div');
                    badge.classList.add('badge');
                    badge.innerText = product['badge_text'];
                    div.appendChild(badge);
                }
                cardContent.append(upperDiv, lowerDiv, addToCartBtn);
                cardContent.classList.add('card-content');
                div.append(img, cardContent);
                productTab.appendChild(div);
            }            
        }
    }
}
productList("Men")
const radioBtns = document.querySelectorAll('input');
for(let btn of radioBtns){
    btn.addEventListener('change', ()=>{
        productList(btn.value);
    });
}
