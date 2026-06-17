const categories = {
    catacombs: {
        'catacombs_xp': 100/3,
        'normal_completions': 100/3/2,
        'master_completions': 100/3/2,
        'secrets': 100/3
    },
    skill_xp: {
        'combat_xp': 100/5,
        'mining_xp': 100/5,
        'foraging_xp': 100/5,
        'taming_xp': 100/5, 
        'farming_xp': 100/5,
    },
    fishing: {
        'jawbus_kills': 100/4/2,
        'thunder_kills': 100/4/2,
        'treasures_caught': 100/4,
        'fishing_xp': 100/4,
        'blobfish_caught': 100/4
    },
    slayer: {
        'zombie_xp': 100/6,
        'spider_xp': 100/6,
        'wolf_xp': 100/6,
        'enderman_xp': 100/6,
        'blaze_xp': 100/6,
        'vampire_xp': 100/6
    },
    completions: {
        'f7_completions': 100/3,
        'm7_completions': 100/3,
        't5_completions': 100/3
    }
};

const lastRolledItems = [
    {
      "catacombs": "",
      "skill_xp": "",
      "fishing": "",
      "slayer": "",
      "completions": ""
    },
]

function forceWeight(category, item) {
    let items = Object.keys(categories[category]);
    let weights = Object.values(categories[category]);
    let totalWeight = weights.reduce((a, b) => a + b, 0);
    const rolledItem = item;
    const rolledItemWeight = categories[category][rolledItem];
    
    // Set the weight of the rolled item to 0
    categories[category][rolledItem] = 0;

    // Get the items that still have weight
    const remainingItems = Object.keys(categories[category]).filter(item => item !== rolledItem)       
    const weightToDistribute = rolledItemWeight / remainingItems.length;
    for (const item of remainingItems) {
        categories[category][item] += weightToDistribute;
    }
}

for (const roll of lastRolledItems) {
    for (const category in roll) {
        const item = roll[category];
        forceWeight(category, item);
    }
}
const highestWeightItems = {};
document.getElementById("output").textContent =
    JSON.stringify(categories, null, 2);
