const fs = require('fs').promises
const path = require('path')


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

const createIntervals = (zones) =>{
    const splittedZones = zones.split(',')
    const intervalZones = splittedZones.map(zone => zone.split('-'))
    //console.log(intervalZones)
    return [...intervalZones]
}


(async function() {
    try{
        const cleanZones = await readFile(path.join(__dirname, "clean.txt"))
        console.log('cleanZones',cleanZones)
        const freshIntervals = cleanZones.map(zones =>createIntervals(zones))
        //console.log(freshIntervals)
        let counter = 0;
        for(const intervals of freshIntervals){
            console.log(intervals)
            const [int1, int2] = [...intervals]
            const [i1fe, i1se] = [...int1]
            const [i2fe, i2se] = [...int2]
            if(i1fe - i2fe <= 0 && i1se - i2se >= 0){
                console.log('int 1 contains int 2')
                counter += 1;
            } else if(i2fe - i1fe <= 0 && i2se - i1se >= 0){
                console.log('int 2 contains int 1')
                counter += 1;
            } else {
                console.log('not contained')
            }
        }
        console.log(counter)
    }catch(e){
        console.log(e)
    }

})();

