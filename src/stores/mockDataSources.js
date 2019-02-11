export const data = [
    {
        "id": "bike",
        "meta": {
            "server": {
                "name": "Fremont Bike Traffic",
                "apiVersion": "0.2",
                "attribution": {
                    "logo": "http://snickerdoodle.collineargroup.com:3007/logo.png",
                    "link": "https://data.seattle.gov/"
                },
                "description": "sdafqwafsredfsrazd dsthts  %saa j this is a long dessfdiasdjfp asdfoasdijf adsoijf asdofjsaodipfj poisam j jfposadiofj poasdijf padosijfiopdsaj fpoiasdj fpjsapfij  pajsdfipoasdj fpoiasdj fpodsji a"
            },
            "availableDataSeries": {
                "fremont_bridge_nb": {
                    "name": "Northbound Traffic",
                    "description": "Provides the number of northbound bikes crossing the Fremont Bridge"
                },
                "fremont_bridge_sb": {
                    "name": "Southbound Traffic",
                    "description": "Provides the number of southbound bikes crossing the Fremont Bridge"
                }
            }
        },
        "serviceUrl": "http://snickerdoodle.collineargroup.com:3007",
        "status": {}
    },
    {
        "id": "noaa",
        "meta": {
            "server": {
                "name": "NOAA Server",
                "apiVersion": "0.2",
                "attribution": {
                    "logo": "http://snickerdoodle.collineargroup.com:3003/logo.jpg",
                    "link": "http://www.noaa.gov"
                },
                "description": "sdafqwafsredfsrazd dsthts  %saa j"
            },
            "availableDataSeries": {
                "temperature": {
                    "name": "Temperature",
                    "description": "Provides temperature forcast for provided location.",
                    "attributes": {
                        "location": {
                            "name": "Location",
                            "description": "Zipcode or City, State"
                        }
                    }
                }
            }
        },
        "serviceUrl": "http://snickerdoodle.collineargroup.com:3003",
        "status": {}
    },
    {
        "id": "wuwx",
        "meta": {
            "server": {
                "name": "Weather Underground",
                "apiVersion": "0.2",
                "attribution": {
                    "logo": "http://snickerdoodle.collineargroup.com:3004/logo.jpg",
                    "link": "http://www.wunderground.com"
                },
                "description": "sdafqwafsredfsrazd dsthts  %saa j"
            },
            "availableDataSeries": {
                "temperature": {
                    "name": "Temperature",
                    "description": "Provides temperature forecast for provided location.",
                    "attributes": {
                        "location": {
                            "name": "Location",
                            "description": "Zipcode or City, State"
                        }
                    }
                },
                "humidity": {
                    "name": "Humidity",
                    "description": "Provides humidity forecast for provided location.",
                    "attributes": {
                        "location": {
                            "name": "Location",
                            "description": "Zipcode or City, State"
                        }
                    }
                }
            }
        },
        "serviceUrl": "http://snickerdoodle.collineargroup.com:3004",
        "status": {}
    },
    {
        "id": "census",
        "meta": {
            "server": {
                "name": "US Census Data",
                "apiVersion": "0.2",
                "attribution": {
                    "text": "This product uses the Census Bureau Data API but is not endorsed or certified by the Census Bureau."
                },
                "description": "sdafqwafsredfsrazd dsthts  %saa j"
            },
            "availableDataSeries": {
                "povertyRate": {
                    "name": "Poverty Rate By State",
                    "description": "Poverty rate by state",
                    "attributes": {
                        "stateCode": {
                            "name": "State FIPS Code",
                            "description": "US Census Bureau State Code"
                        }
                    }
                }
            }
        },
        "serviceUrl": "http://snickerdoodle.collineargroup.com:3005",
        "status": {}
    }
]