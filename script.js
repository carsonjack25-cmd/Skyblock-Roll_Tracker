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
      "catacombs": "'catacombs_xp'",
      "skill_xp": "'foraging_xp'",
      "fishing": "'treasures_caught'",
      "slayer": "'wolf_xp'",
      "completions": "'f7_completions'"
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
const odds = {
    catacombs: {
        'catacombs_xp': 0,
        'normal_completions': 0,
        'master_completions': 0,
        'secrets': 0
    },
    skill_xp: {
        'combat_xp': 0,
        'mining_xp': 0,
        'foraging_xp': 0,
        'taming_xp': 0,
        'farming_xp': 0,
    },
    fishing: {
        'jawbus_kills': 0,
        'thunder_kills': 0,
        'treasures_caught': 0,
        'fishing_xp': 0,
        'blobfish_caught': 0
    },
    slayer: {
        'zombie_xp': 0,
        'spider_xp': 0,
        'wolf_xp': 0,
        'enderman_xp': 0,
        'blaze_xp': 0,
        'vampire_xp': 0
    },
    completions: {
        'f7_completions': 0,
        'm7_completions': 0,
        't5_completions': 0
    }
};
for (const category in categories) {
    let totalWeight = Object.values(categories[category]).reduce((a, b) => a + b, 0);
    for (const item in categories[category]) {
        odds[category][item] = parseFloat(((categories[category][item] / totalWeight) * 100).toFixed(2)) + '%';
    }
}

const highestOdds = {
    catacombs: {item: null, odds: 0},
    skill_xp: {item: null, odds: 0},
    fishing: {item: null, odds: 0},
    slayer: {item: null, odds: 0},
    completions: {item: null, odds: 0}
};
for (const category in odds) {
    for (const item in odds[category]) {
        const itemOdds = parseFloat(odds[category][item]);
        const currentHighestOdds = parseFloat(highestOdds[category].odds);

        if (itemOdds > currentHighestOdds) {
            highestOdds[category] = {item, odds: itemOdds + '%'};
        } else if (itemOdds === currentHighestOdds) {
            highestOdds[category].item += ` / ${item}`;
        }
    }
}

console.log("Odds:", JSON.stringify(odds, null, 2));
console.log("Prediction:", JSON.stringify(highestOdds, null, 2));
