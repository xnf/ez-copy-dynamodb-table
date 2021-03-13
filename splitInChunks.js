export const splitInChunks = (response, MAX_BATCH_WRITE_SIZE = 25) => {
    console.log(` > Found ${response.ScannedCount} items\n > Consumed capacity: ${response.ConsumedCapacity.CapacityUnits}`);
    return response.Items.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / MAX_BATCH_WRITE_SIZE)
        if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = []
        }
        resultArray[chunkIndex].push(item)
        return resultArray
    }, []);
}
