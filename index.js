const search = document.querySelector('.search')
const points = document.querySelector('.container__points')
const repos = document.querySelector('.container__selected')



    
    
function addPoint(repo) {
    const point = document.createElement('li')
    point.classList.add('container__point')
    point.textContent = repo.name
    points.appendChild(point)

    point.addEventListener("click", function(event) {
        addRepo(repo);
        search.value = '';
        deletePoint();
    })

}

function deletePoint() {
    while (points.firstChild) {
        points.removeChild(points.firstChild);
    }
}
    
function addRepo(item) {
    const repo = document.createElement('li')
    repo.classList.add('container__select')

    const nameRepo = document.createElement('p')
    nameRepo.textContent = `Name: ${item.name}`
        
    const ownerRepo = document.createElement("p");
    ownerRepo.textContent = `Owner: ${item.owner.login}`
        
    const starsRepo = document.createElement("p")
    starsRepo.textContent = `Stars: ${item.stargazers_count}`

    const textContent = document.createElement('div')
    textContent.appendChild(nameRepo)
    textContent.appendChild(ownerRepo)
    textContent.appendChild(starsRepo)
        
    const deleteRepo = document.createElement('button')
    deleteRepo.classList.add('container__close')
    deleteRepo.addEventListener('click', function (event) {
        repo.remove()
    })
    repo.appendChild(textContent)
    repo.appendChild(deleteRepo)
    repos.appendChild(repo)
}



async function getRepo(event) {
    try {
        const response = await fetch(`https://api.github.com/search/repositories?q=${event.target.value}&per_page=5`);
        const json = await response.json();
        const items = json.items;

        deletePoint();

        items.forEach(item => {
            addPoint(item)
        })


    } catch (err) {
        console.log(err);
    }
}
    
function debounce(fn, delay) {
    let timeout;
    return function(...args) {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}

const getRepoDebounce = debounce(getRepo, 500);
    
search.addEventListener("input", getRepoDebounce);
