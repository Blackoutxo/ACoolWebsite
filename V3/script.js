async function fetchCars() {
    const after = new Date(Date.now() - 864e5).toISOString().slice(0, 19) + 'Z';
    const url = `https://arctic-shift.photon-reddit.com/api/posts/search?subreddit=carporn&limit=100&after=${after}`;

    const { data } = await (await fetch(url)).json();
    const posts = data.sort((a, b) => b.score - a.score);

    displayFeatured(posts[0]);
    displayContenders(posts.slice(1, 6));
}

function displayFeatured(car) {
    const container = document.getElementById('car-of-the-day');
    container.innerHTML  = `
    <img src="${car.url}" class="featured" alt="${car.title}">
    
    <div class="info">
        <h2> ${car.title} </h2>
        <p> Posted by u/${car.author} </p>

        <div class="upvotes">
              <img src="assets/upvote.png" alt="↑" id="upvote-img" width=20 height=20 >
              ${car.score.toLocaleString()}
         </div>
    </div>
    `;
}

function displayContenders(cars) {
    const container = document.getElementById('contenders-grid');
    container.innerHTML = ``;

    cars.forEach(car => {
        container.innerHTML += `
        <div class="contender-card">
            <img src="${car.url}" class="contender-img">
            <div class="contender-info">
                    <h3>${car.title.substring(0, 50)}...</h3>
                    <p id="score"> <img src="assets/upvote.png" width=20 height =20> ${car.score.toLocaleString()}</p>
            </div>
        </div>`;
    });
}

// LES GOOO
fetchCars();