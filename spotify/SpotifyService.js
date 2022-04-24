const SpotifyWebApi = require('spotify-web-api-node')
const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, PATH_TO_PROJECT_DIR } = process.env
const { readCurrentAccessToken } = require('./SpotifyUtils')
const axios = require('axios')

class SpotifyService {
  constructor () {
    this.accessToken=readCurrentAccessToken()
    this.baseUrl='https://api.spotify.com/v1'
  }

  async getUserProfile() {
    let response = 'Failed to retrieve spotify user profile.'
    const options = {
      url: 'https://api.spotify.com/v1/me',
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + this.accessToken
      }
    }

    try {
      response = await axios(options)
    } catch (e) {
      console.error(e)
    }
    
    return response
  }



}

module.exports=SpotifyService