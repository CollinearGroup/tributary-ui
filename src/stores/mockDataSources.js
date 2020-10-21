export const data = [
    {
        "id": "bike",
        "meta": {
            "server": {
                "name": "Fremont Bike Traffic",
                "apiVersion": "0.2",
                "attribution": {
                    "logo": "http://tributary.collineargroup.com/fremontBikes/logo.png",
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
        "serviceUrl": "http://tributary.collineargroup.com/fremontBikes",
        "status": {}
    },
    {
        "id": "noaa",
        "meta": {
            "server": {
                "name": "NOAA Server",
                "apiVersion": "0.2",
                "attribution": {
                    "logo": "http://tributary.collineargroup.com/noaaWx/logo.jpg",
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
        "serviceUrl": "http://tributary.collineargroup.com/noaaWx",
        "status": {}
    },
    // {
    //     "id": "SidewalkCafe",
    //     "meta": {
    //         "server": {
    //             "name": "Seattle Sidewalk Cafe Applications",
    //             "apiVersion": "0.2",
    //             "baseUrl": 'https://data.seattle.gov/resource/evxa-pai5.json',
    //             "attribution": {
    //                 "logo": '/logo.png', //This will be dynamically set to a fully qualified url based on the request headers
    //                 "link": 'https://data.seattle.gov/'
    //             }
    //         },
    //         "availableDataSeries": {
    //             "status_approved": {
    //                 "name": "Approved",
    //                 "description": "Approved applications for sidewalk cafes"
    //             },
    //             "status_commented_on": {
    //                 "name": "Commented On",
    //                 "description": "Commented on applications not yet approved"
    //             }
    //         }
    //     },
    //     "serviceUrl": "http://localhost:3005",
    //     "status": {}
    // },
    // {
    //     "id": "roadWeather",
    //     "meta": {
    //         "server": {
    //             "name": "Seattle Road Weather",
    //             "apiVersion": "0.2",
    //             "baseUrl": ' https://data.seattle.gov/resource/ivtm-938t.json',
    //             "attribution": {
    //                 "logo": '/logo.png', //This will be dynamically set to a fully qualified url based on the request headers
    //                 "link": 'https://data.seattle.gov/'
    //             }
    //         },
    //         "availableDataSeries": {
    //             "stationname": {
    //                 "name": "Location",
    //                 "description": "Station location",
    //                 "attributes": {
    //                     "location": {
    //                         "name": "location",
    //                         "description": "Bridge or Street",
    //                         "type": "selection",
    //                         "selectionList": [
    //                             "Albro Place Airport Way",
    //                             "Magnolia Bridge",
    //                             "Harbor Ave Upper North Bridge",
    //                             "NE 45 St Viaduct",
    //                             "Aurora Bridge",
    //                             '35th Ave SW MyrtleSt',
    //                             "Roosevelt Way NE 80th St",
    //                             "Spokane Swing Bridge",
    //                             "Jose Rizal Bridge North",
    //                             "Alaskan Way Viaduct King St"
    //                         ]
    //                     }
    //                 }
    //             }
    //         }
    //     },
    //     "serviceUrl": "http://localhost:3006",
    //     "status": {}
    // },

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
                            "description": "US Census Bureau State Code",
                            "type": "select-map",
                            "values": {
                                "10": "DELAWARE (10)",
                                "11": "DISTRICT OF COLUMBIA (11)",
                                "12": "FLORIDA (12)",
                                "13": "GEORGIA (13)",
                                "15": "HAWAII (15)",
                                "16": "IDAHO (16)",
                                "17": "ILLINOIS (17)",
                                "18": "INDIANA (18)",
                                "19": "IOWA (19)",
                                "20": "KANSAS (20)",
                                "21": "KENTUCKY (21)",
                                "22": "LOUISIANA (22)",
                                "23": "MAINE (23)",
                                "24": "MARYLAND (24)",
                                "25": "MASSACHUSETTS (25)",
                                "26": "MICHIGAN (26)",
                                "27": "MINNESOTA (27)",
                                "28": "MISSISSIPPI (28)",
                                "29": "MISSOURI (29)",
                                "30": "MONTANA (30)",
                                "31": "NEBRASKA (31)",
                                "32": "NEVADA (32)",
                                "33": "NEW HAMPSHIRE (33)",
                                "34": "NEW JERSEY (34)",
                                "35": "NEW MEXICO (35)",
                                "36": "NEW YORK (36)",
                                "37": "NORTH CAROLINA (37)",
                                "38": "NORTH DAKOTA (38)",
                                "39": "OHIO (39)",
                                "40": "OKLAHOMA (40)",
                                "41": "OREGON (41)",
                                "42": "PENNSYLVANIA (42)",
                                "44": "RHODE ISLAND (44)",
                                "45": "SOUTH CAROLINA (45)",
                                "46": "SOUTH DAKOTA (46)",
                                "47": "TENNESSEE (47)",
                                "48": "TEXAS (48)",
                                "49": "UTAH (49)",
                                "50": "VERMONT (50)",
                                "51": "VIRGINIA (51)",
                                "53": "WASHINGTON (53)",
                                "54": "WEST VIRGINIA (54)",
                                "55": "WISCONSIN (55)",
                                "56": "WYOMING (56)",
                                "60": "AMERICAN SAMOA (60)",
                                "66": "GUAM (66)",
                                "72": "PUERTO RICO (72)",
                                "78": "VIRGIN ISLANDS (78)",
                                "01": "ALABAMA (01)",
                                "02": "ALASKA (02)",
                                "04": "ARIZONA (04)",
                                "05": "ARKANSAS (05)",
                                "06": "CALIFORNIA (06)",
                                "08": "COLORADO (08)",
                                "09": "CONNECTICUT (09)"
                            }
                        }
                    }
                }
            }
        },
        "serviceUrl": "http://tributary.collineargroup.com/census",
        "status": {}
    },
    {
        "id": "nrel",
        "meta": {
            "server": {
                "name": "NREL Api",
                "apiVersion": "0.2",
                "description": "Solar photovoltaic array infromation from nrel.gov",
                "attribution": {
                    "link": "http://www.nrel.gov"
                }
            },
            "availableDataSeries": {
                "array_yield": {
                    "name": "Golden Solar Array Yield",
                    "description": "Solar array yield for a location in Golden, CO"
                }
            }
        },
        "serviceUrl": "http://tributary.collineargroup.com/nrel"
    },
    {
        "id": "stock-data",
        "meta": {
            "server": {
                "name": "Stock Data",
                "description": "Stock closing price data in US dollars",
                "apiVersion": "0.2",
                "baseURL": "https://api.iextrading.com/1.0/stock/",
                "attribution": {
                    "logo": "http://tributary.collineargroup.com:3011/logo.png",
                    "link": "https://iextrading.com/developer/docs/#getting-started"
                }
            },
            "availableDataSeries": {
                "stock": {
                    "name": "Closing Prices",
                    "description": "Stock closing price data",
                    "attributes": {
                        "stock": {
                            "name": "stock",
                            "description": "Recognized Stock Ticker ex. AAPL"
                        },
                        "duration": {
                            "name": "chart duration",
                            "description": "Chart Duration Length",
                            "type": "select-map",
                            "values": [
                                {
                                    "name": "1m",
                                    "value": "1 month",
                                    "order": 0
                                },
                                {
                                    "name": "3m",
                                    "value": "3 months",
                                    "order": 1
                                },
                                {
                                    "name": "6m",
                                    "value": "6 months",
                                    "order": 2
                                },
                                {
                                    "name": "ytd",
                                    "value": "year to date",
                                    "order": 3
                                },
                                {
                                    "name": "1y",
                                    "value": "1 year",
                                    "order": 4
                                },
                                {
                                    "name": "2y",
                                    "value": "2 years",
                                    "order": 5
                                },
                                {
                                    "name": "5y",
                                    "value": "5 years",
                                    "order": 6
                                }
                            ]
                        }
                    }
                }
            }
        },
        "serviceUrl": "http://tributary.collineargroup.com/stockData",
        "status": {}
    }
]