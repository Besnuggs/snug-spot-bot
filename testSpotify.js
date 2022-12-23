const util = require('util')
const exec = util.promisify(require('child_process').exec)

const isSpotifydRunning = async () => {
  try {
    return Boolean(await exec('pidof spotifyd'))
  } catch {
    return false
  }
}

const getAllInstancesOfSpotifyd = async () => {
  try {
    
  } catch {
    return false
  }
}

const killSpotifyd = async () => {
  try {
    // get all pids.
    await exec(`sudo kill -9 ${pid}`)
  } catch (e) {
    console.error(e)
    return;
  }
}

const main = async () => {
  const spotifydCheck = await isSpotifydRunning()
  await killSpotifyd()
  console.log(spotifydCheck)
}


main()