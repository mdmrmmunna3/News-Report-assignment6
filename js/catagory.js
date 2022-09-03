const loadCategories= () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.data.news_category))
}


const displayCategories = (categories) => {
    // console.log(categories);
    categories.forEach (category => {
        console.log(category)
        const categoriesContainer = document.getElementById('category-container');
        const categoryLi = document.createElement('li');
        categoryLi.classList.add('category-item')
        categoryLi.innerHTML = `
        <a onclick="loadCategoryId(${category.category_id})" class="nav-link " aria-current="page" href="#">${category.category_name}</a>
        `;
        categoriesContainer.appendChild(categoryLi);
    })

}
const loadCategoryId = (category_id) => {
    const url = ` https://openapi.programming-hero.com/api/news/category/01/ `;
    fetch(url)
    .then(res => res.json())
    .then(data => console.log(data.data))
}

const displayCategoryId = category => {
    
}
loadCategories();
