const fs = require('fs').promises
const path = require('path')

const priorityGuide = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
    i: 9,
    j: 10,
    k: 11,
    l: 12,
    m: 13,
    n: 14,
    o: 15, 
    p: 16,
    q: 17,
    r: 18,
    s: 19,
    t: 20,
    u: 21,
    v: 22,
    w: 23,
    x: 24, 
    y: 25,
    z: 26,
    A: 27,
    B: 28,
    C: 29, 
    D: 30,
    E: 31,
    F: 32,
    G: 33,
    H: 34,
    I: 35,
    J: 36,
    K: 37,
    L: 38,
    M: 39,
    N: 40,
    O: 41,
    P: 42,
    Q: 43,
    R: 44,
    S: 45,
    T: 46,
    U: 47,
    V: 48,
    W: 49,
    X: 50,
    Y: 51,
    Z: 52

}


async function readFile(location) {
    try {
      const content = await fs.readFile(location, { encoding: "utf8" });
      const splittedContent = content.split(/\n/g);
      console.log("rucksacks num", splittedContent.length);
      return splittedContent.filter(content => content !== "");
    } catch (e) {
      console.log(e);
    }
}

const groupRucksacks = (rucksacks) => {
    let groupedThreeRucksacks = [];
    while(rucksacks.length > 0){
        groupedThreeRucksacks.push(rucksacks.slice(0,3))
        rucksacks.shift()
        rucksacks.shift()
        rucksacks.shift()
    }
    return [...groupedThreeRucksacks]
}

const divideRucksack = (rucksack) => {
    const comp1 = rucksack.slice(0, rucksack.length/2)
    const comp2 = rucksack.slice(rucksack.length/2)
    return [comp1, comp2]
}

function storeUniqueItems(groupedRuck){
    return groupedRuck.map( group => {
        // console.log('group..',group)
        // group.forEach( rucksack => {
        //     console.log(rucksack)
        // })
        let uniqueSetItems = [];
        for (const rucksack of group){
            const itemsSet = new Set();
            for(const item of rucksack){
                itemsSet.add(item)
            }
            uniqueSetItems.push(itemsSet)
        }
        return uniqueSetItems
    })
}

function findCommonItem(rucksack){
    const [firstSet,secondSet, thirdSet] = [...rucksack]
    console.log(firstSet)
    console.log(secondSet)
    for (const item of firstSet){
        if(secondSet.has(item) && thirdSet.has(item)){
            // console.log('common!', item)
            return item
        }
    }
}

(async function() {
    try{
        const rucksacks = await readFile(path.join(__dirname, "rucksack.txt"))
        console.log('rucksakcs',rucksacks)
        const groupedRucksacks = groupRucksacks(rucksacks);
        console.log(groupedRucksacks);
        //const dividedRucksacks = rucksacks.map(rucksack => divideRucksack(rucksack))
        //console.log('dividedRucksacks', dividedRucksacks)
        const uniqueItemsInRucksacks = storeUniqueItems(groupedRucksacks)
        console.log('uniqueItemsInRucksacks', uniqueItemsInRucksacks)
        const commonItemInRucksacks = uniqueItemsInRucksacks.map(rucksack => findCommonItem(rucksack))
        console.log(commonItemInRucksacks)

        let sumOfPriorities = 0;
        commonItemInRucksacks.forEach( item =>{
            sumOfPriorities += priorityGuide[item]
        })
        console.log(sumOfPriorities)
    }catch(e){
        console.log(e)
    }

})();