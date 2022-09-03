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
    // console.log(categoryId)
    lodderSpinner(true)
    // const categoryString = JSON.stringify(category_id);
    // console.log(categoryString)
    const url = ` https://openapi.programming-hero.com/api/news/category/0${categoryId}`;
    console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategoryId(data.data))
        .catch(error => console.log(error))
}


const displayCategoryId = datas => {
    // console.log(datas)
    // sorting data ///
    datas.sort((a, b) => {
        return b.total_view - a.total_view;
    });
    // console.log(datas);

    // Show news number in input field
    const inputField = document.getElementById('input-field');
    const number = datas.length;
    if (number === 0) {
        inputField.value = 'No data found';
        lodderSpinner(false);
    } else {
        inputField.value = `${number} items found of this category `
    }

    const categoryDetailsContainer = document.getElementById('category-container-details')
    categoryDetailsContainer.innerHTML = '';
    datas.forEach(data => {


        // *author name total views are not found masseage ***

        if (data.total_view === 0 || data.total_view == null) {
            data.total_view = 'No data available'
        }

        if (data.author.name === null) {
            data.author.name = 'No data available';
        }

        const allNewsDiv = document.createElement('div');
        allNewsDiv.classList.add('card');
        allNewsDiv.classList.add('mb-3');
        allNewsDiv.innerHTML = `
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
                                <p class="ms-2 me-5">${data.author.name ? data.author.name : "No Author name found"}</p>
                                <div>
                                <i class="fa-solid fa-eye"></i><span class="ms-2 me-5">${data.total_view ? data.total_view : "no view found"}</span>
                                </div>
                                <div>
                                <button onclick="showDetails('${data._id}')" class="btn btn-primary ms-5 pt-0 pb-0 ps-3 pe-3" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
    `;
        categoryDetailsContainer.appendChild(allNewsDiv);
        lodderSpinner(false);
    })
}


// loder part start 
const lodderSpinner = isLoaderSpinner => {
    const loderSection = document.getElementById('loder-field');
    if (isLoaderSpinner) {
        loderSection.classList.remove('d-none');
    } else {
        loderSection.classList.add('d-none');
    }
}


// show details modal ***

const showDetails = id => {
    // console.log(id)
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayModalDitails(data.data[0]))
        .catch(error => console.log(error))
}

const displayModalDitails = data => {
    // console.log(data)

     // *author name total views are not found masseage ***

     if (data.total_view === 0 || data.total_view == null) {
        data.total_view = 'No data available'
    }

    if (data.author.name === null) {
        data.author.name = 'No data available';
    }




    const Modaltitle = document.getElementById('exampleModalLabel');
    Modaltitle.innerText = data.title;

    const image = document.getElementById('image-of-modal');
    image.innerHTML = `
    <img class="img-fluid" src="${data.image_url}" alt="">

    `;

    const detail = document.getElementById('detail-of-modal');
    detail.innerText = data.details;

    const authorImage = document.getElementById('author-img');
    authorImage.innerHTML =` <img class="img-fluid" src="${data.author.img}" alt="">

    `;

    
}


loadCategories();
