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
                "description": "Hourly bike count across Fremont Bridge from Seattle Open Data"
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
                "description": "7 day weather forecast from NOAA."
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
                "description": "10 day weather forecast from Weather Underground."
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
        "id": "SidewalkCafe",
        "meta": {
            "server": {
                "name": "Seattle Sidewalk Cafe Applications",
                "apiVersion": "0.2",
                "baseUrl": 'https://data.seattle.gov/resource/evxa-pai5.json',
                "attribution": {
                    "logo": '/logo.png', //This will be dynamically set to a fully qualified url based on the request headers
                    "link": 'https://data.seattle.gov/'
                }
            },
            "availableDataSeries": {
                "status_approved": {
                    "name": "Approved",
                    "description": "Approved applications for sidewalk cafes"
                },
                "status_commented_on": {
                    "name": "Commented On",
                    "description": "Commented on applications not yet approved"
                }
            }
        },
        "serviceUrl": "http://localhost:3005",
        "status": {}
    },
    {
        "id": "roadWeather",
        "meta": {
            "server": {
                "name": "Seattle Road Weather",
                "apiVersion": "0.2",
                "baseUrl": ' https://data.seattle.gov/resource/ivtm-938t.json',
                "attribution": {
                    "logo": '/logo.png', //This will be dynamically set to a fully qualified url based on the request headers
                    "link": 'https://data.seattle.gov/'
                }
            },
            "availableDataSeries": {
                "stationname": {
                    "name": "Location",
                    "description": "Station location",
                    "attributes": {
                        "location": {
                            "name": "location",
                            "description": "Bridge or Street",
                            "type": "selection",
                            "selectionList": [
                                "Albro Place Airport Way",
                                "Magnolia Bridge",
                                "Harbor Ave Upper North Bridge",
                                "NE 45 St Viaduct",
                                "Aurora Bridge",
                                '35th Ave SW MyrtleSt',
                                "Roosevelt Way NE 80th St",
                                "Spokane Swing Bridge",
                                "Jose Rizal Bridge North",
                                "Alaskan Way Viaduct King St"
                            ]
                        }
                    }
                }
            }
        },
        "serviceUrl": "http://localhost:3006",
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
                "description": "Data from US Census"
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