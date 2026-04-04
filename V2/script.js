const button = document.getElementById("anvil-btn");
const count = document.getElementById("click-count");
const soundFX = new Audio('assets/audio/anvil-drop.mp3');

const shopContainer = document.getElementById("shop-items");
const statsContainer = document.getElementById("stats-items");

let totalClickCount = 0;

function buttonClick() {
  soundFX.play();
  soundFX.currentTime = 0.25;

  const multiplierOwned = itemsOwned.find((i) => i.name === "Multiplier");
  const multiplierCount = multiplierOwned ? multiplierOwned.amount : 0;

  totalClickCount = totalClickCount + 1 * 2 ** multiplierCount;

  count.textContent = totalClickCount;
}

// Main click handler
button.addEventListener("click", function () {
  buttonClick();
})

let itemsOwned = [];

// Shop
const shopItems = [
  {
    name: "Hammer",
    description: "More hammers = more hammering",
    cost: 10,
    startingCost: 10,
  },
  {
    name: "Multiplier",
    description: "Multiplies the value of each click by 2.",
    cost: 69,
    startingCost: 69,
  },
];

setInterval(() => {
  const hammerOwned = itemsOwned.find((i) => i.name === "Hammer");
  if (hammerOwned) {
    for (let i = 0; i < hammerOwned.amount; i++) {
      buttonClick();
    }
  }
}, 1000);

function createShopItems() {
  // remove all items already in the shop
  document.querySelectorAll(".shop-item").forEach((element) => {
    element.remove();
  });

  shopItems.forEach((item) => {
    const shopItem = document.createElement("div");
    shopItem.className = "shop-item";

    shopItem.innerHTML = `
      <div>
        <h3>${item.name}</h3>
        <p>${item.description}</p>
      </div>
      <button onclick="buyItem('${item.name}')">
        Buy $${item.cost}
      </button>
    `;

    shopContainer.appendChild(shopItem);
  });
}

function createStatsItems() {
  document.querySelectorAll(".stats-item").forEach((element) => {
    element.remove();
  });

  // add new items
  if (itemsOwned.length > 0) {
    itemsOwned.forEach((item) => {
      const shopItem = document.createElement("div");
      shopItem.className = "stats-item";

      shopItem.innerHTML = `
      <div>
        <h3>${item.name}</h3>
        <p>${item.amount}</p>
      </div>
    `;

      statsContainer.appendChild(shopItem);
    });
  } else {
    const shopItem = document.createElement("div");
    shopItem.className = "stats-item";

    shopItem.innerHTML = `
      <div>
        <h3>No items!</h3>
      </div>
    `;

    statsContainer.appendChild(shopItem);
  }
}

// Buy item function
function buyItem(itemName) {
  const item = shopItems.find((i) => i.name === itemName);
  if (totalClickCount >= item.cost) {
    totalClickCount -= item.cost;
    count.textContent = totalClickCount;

    let amount = 1;

    // check if we already own item, if we do then ++ it, else add it
    const itemInArray = itemsOwned.find((obj) => obj.name === item.name);
    if (itemInArray) {
      itemInArray.amount++;
      console.log(`Found ${item.name}, added 1!`);
      amount = itemInArray.amount;
    } else {
      itemsOwned.push({ name: item.name, amount: 1 });
      console.log(`Added ${item.name} to itemsOwned!`);
    }

    // make the item cost more
    item.cost = ((item.startingCost - 1) * amount) ** amount;
    createShopItems();
    createStatsItems();

    console.log(`Bought ${itemName}!`);
  } else {
    console.log(`Not enough clicks! Need ${item.cost}`);
  }
}

// LETS GO GAMBLING :OOOO
function gambleIt() {
  let randomizer = 0;
  let loseCounter = 0;
  
  randomizer = Math.floor(Math.random() * 100) + 1;

  if(randomizer === 17 || loseCounter === Math.floor(Math.random() * 20) + 1) {
    totalClickCount = totalClickCount * 20;
  } else {
    totalClickCount = 0;
    loseCounter++;
    if(loseCounter > 40) loseCounter = 0;
  }

  count.textContent = totalClickCount;

  console.log('Just gambled it all 🙏');
}

// Initialize shop when page loads
createShopItems();
createStatsItems();
