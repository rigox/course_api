const NodeGeocoder =  require("node-geocoder");

const  options = {
    provider : process.env.GEOCODER_PROV,
    httpAdapter:'https',
    apiKey: process.env.GEOCODER_KEY,
    formatter:null
}

const geocoder =  NodeGeocoder(options);

module.exports  =  geocoder;