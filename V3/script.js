async function fetchCars() {
    try {
        const reddit = await fetch('https://www.reddit.com/r/carporn/top.json?t=day&limit=10');
        const img = await reddit.json();

        const posts = img.data.children;

        if(posts.length > 0) {
            displayFeatured(posts[0].data);
            displayContenders(posts.slice(1, 6));
        } else {
            document.getElementById('car-of-the-day').innerText = 'No images were found today.....'
        }

    } catch (error) {
        console.error("Error fetching car data:", error);
        document.getElementById('car-of-the-day').innerHTML = "Failed to load data. Check console (F12).";
    }
}

function displayFeatured(car) {
    const container = document.getElementById('car-of-the-day');
    container.innerHTML  = `
    <img src="${car.url}" class="featured" alt="${car.title}">
    
    <div class="info">
        <h2> ${car.title} </h2>
        <p> Posted by u/${car.author} </p>

        <div class="upvotes">
              <img src="images/upvote.png" alt="↑" id="upvote-img" width=20 height=20 >
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
            <img src="${car.data.url}" class="contender-img">
            <div class="contender-info">
                    <h3>${car.data.title.substring(0, 50)}...</h3>
                    <p id="score"> <img src="images/upvote.png" width=20 height =20> ${car.data.score.toLocaleString()}</p>
            </div>
        </div>`;
    });
}

// LES GOOO
fetchCars();