const fs = require('fs')
const axios = require('axios')
const { PATH_TO_PROJECT_DIR, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env

module.exports={
  readCurrentAccessToken() {
    const currentTokenData = fs.readFileSync(`${PATH_TO_PROJECT_DIR}/token.json`)
    const { access_token } = JSON.parse(currentTokenData)
    return access_token
  },
  currentTokenHasExpired() {
    const currentDate = new Date();
    const currentTokenData = fs.readFileSync(`${PATH_TO_PROJECT_DIR}/token.json`)
    const { access_token, expiration_date } = JSON.parse(currentTokenData)
    if (!access_token) {
      return true
    }
    const expirationDate = new Date(expiration_date)
    return currentDate > expirationDate
  },
  async setAccessToken() {
    const options = {
      url: 'https://accounts.spotify.com/api/token',
      method: 'post',
      params: {
        grant_type: 'client_credentials'
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization': 'Basic ' + (Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64'))
      }
    }
    const response = await axios(options);
    const {data: { access_token, expires_in }} = response;
    const expirationDate = new Date()
    expirationDate.setSeconds(expirationDate.getSeconds() + expires_in)
    const jsonData = JSON.stringify({
      access_token,
      expiration_date: expirationDate
    })
    fs.writeFileSync(`${PATH_TO_PROJECT_DIR}/token.json`, jsonData)
  }
}