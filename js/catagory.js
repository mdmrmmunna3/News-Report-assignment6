const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
}


const displayCategories = (categories) => {
    // console.log(categories);
    categories.forEach(category => {
        console.log(category)
        const categoriesContainer = document.getElementById('category-container');
        const categoryLi = document.createElement('li');
        categoryLi.classList.add('category-item')
        categoryLi.innerHTML = `
        <a onclick="loadCategoryId('${category.category_id}')" class="nav-link " aria-current="page" href="#">${category.category_name}</a>
        `;
        categoriesContainer.appendChild(categoryLi);
    })

}
const loadCategoryId = (categoryId) => {
    // console.log(categoryId)
    // const categoryString = JSON.stringify(category_id);
    // console.log(categoryString)
    const url = ` https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategoryId(data.data))
}

const displayCategoryId = categoriesId => {
    const categoryDetailsContainer = document.getElementById('category-container-details')
    categoriesId.forEach(category => {
        categoryDetailsContainer.innerHTML = `
        <div class="col-md-4">
            <img src="${category.thumbnail_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${category.title}</h5>
                <p class="card-text">${category.details}</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
        </div>
    `;
    
    })
}
loadCategories();
