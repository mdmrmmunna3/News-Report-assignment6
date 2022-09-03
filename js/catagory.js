const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
}


const displayCategories = (categories) => {
    // console.log(categories);
    categories.forEach(category => {
        // console.log(category)
        const categoriesContainer = document.getElementById('category-container');
        const categoryLi = document.createElement('li');
        categoryLi.classList.add('category-item')
        categoryLi.innerHTML = `
        <a onclick="loadCategoryId(${category.category_id})" class="nav-link " aria-current="page" href="#">${category.category_name}</a>
        `;
        categoriesContainer.appendChild(categoryLi);
    })

}
const loadCategoryId = categoryId => {
    console.log(categoryId)
    // const categoryString = JSON.stringify(category_id);
    // console.log(categoryString)
    const url = ` https://openapi.programming-hero.com/api/news/category/0${categoryId}`;
    // console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategoryId(data.data))
}


const displayCategoryId = categoriesId => {

      // Show news number in input field
    const inputField = document.getElementById('input-field');
    const number = categoriesId.length;
    if (number === 0) {
        inputField.value = 'No data found';
        lodder(false);
    } else {
        inputField.value = `${number} items found of this category `
    }

    const categoryDetailsContainer = document.getElementById('category-container-details')
    categoriesId.forEach(data => {
        categoryDetailsContainer.innerHTML = `
            <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${data.image_url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${data.title}</h5>
                            <p class="card-text row-5 text-truncate">${data.details}</p>
                            <div class="d-flex">
                                <div style="width: 30px;">
                                    <img class="rounded img-fluid" src="${data.author.img}" alt="">
                                </div>
                                <p class="ms-2 me-5">${data.author.name}</p>
                                <div>
                                <i class="fa-solid fa-eye"></i><span class="ms-2 me-5">${data.total_view}</span>
                                </div>
                                <div>
                                <button onclick="showDitals('${data._id}')" class="btn btn-primary ms-5 pt-0 pb-0 ps-3 pe-3" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
    `;
    
    })
}
loadCategories();

