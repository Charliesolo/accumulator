export function timingsRequired(num){
    const reps = Number(num)
    const sets = [20]
    const subset = [15, 20]
    if (reps === 1){
        return sets
    }
    for (let i = reps-2; i>= 0; i-- ){
        subset.push(20)
        const subsetCopy = [...subset]
        sets.push(subsetCopy)
    }
return sets.flat()
}

// 1 20
// 2 20 15 20 20
// 3 20 15 20 20 15 20 20 20
// 4 20 15 20 20 15 20 20 20 15 20 20 20 20