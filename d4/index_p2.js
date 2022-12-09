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
            // [ [ '38', '38' ], [ '19', '37' ] ]
            // overlaps!
            if(Number(i2fe) > Number(i1se) || Number(i1se) < Number(i2fe) || Number(i1fe) > Number(i2se)){
                console.log('not overlaps')
            } else {
                console.log('overlaps!')
                counter += 1;                    
            }
            // if(Number(i2fe) >= Number(i1fe) && Number(i2se) <= Number(i1se)){
            //     console.log('overlaps!')
            //     counter += 1;                
            // }else if(Number(i2fe) >= Number(i1fe) && Number(i2fe) <= Number(i1se)){
            //     console.log('overlaps!')
            //     counter += 1;
            // }else if(Number(i2se) >= Number(i1fe)){
            //     console.log('overlaps!')
            //     counter += 1;
            // } else {
            //     console.log('NOT overlaps!')
            // }
        }
        console.log(counter)
    }catch(e){
        console.log(e)
    }

})();

