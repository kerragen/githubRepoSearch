const search = document.querySelector('.search')
const points = document.querySelector('.container__points')
const repos = document.querySelector('.container__selected')



    
    
function addPoint(repo) {
    const point = document.createElement('li')
    point.classList.add('container__point')
    point.textContent = repo.name
    points.appendChild(point)
}

function deletePoint() {
    if (points.children.length !== 0) {
        for (let i = 0; i < points.children.length; i++) {
            while (points.firstChild) {
                points.removeChild(points.firstChild);
            }
        }
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
    deleteRepo.addEventListener('click', function () {
        repo.remove()
    })
    repo.appendChild(textContent)
    repo.appendChild(deleteRepo)
    repos.appendChild(repo)
}



async function getRepo() {
    try {
        return await fetch (`https://api.github.com/search/repositories?q=${search.value}`)
        .then((response) => {
            return response.json()
        })
        .then((response) => {
            let items = response.items;
            deletePoint();
            if (items.length >= 5) {
                for (let i = 0; i < 5; i++) {
                    addPoint(items[i]);
                }
            } else {
                for (let item of items) {
                    addPoint(item);
                }
            }
            return items;
        })
        .then((response) => {
            let points = document.querySelectorAll('.container__point')
            for (let i = 0; i < points.length; i++) {
                points[i].addEventListener("click", function() {
                    addRepo(response[i]);
                    search.value = "";
                    deletePoint();
                })
            }
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

getRepoDebounce = debounce(getRepo, 500);
    
search.addEventListener("input", getRepoDebounce);;
























