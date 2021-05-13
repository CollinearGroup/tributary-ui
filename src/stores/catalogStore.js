//Tributary Project User Interface
// MIT License
//
// Copyright (C) 2021  Collinear Group, LLC
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// 
// See LICENSE in the project root for license information.
import {action, decorate, observable} from 'mobx';
import axios from 'axios';
//TODO: remove this when publish functionality complete
import {data} from './mockDataSources';

class CatalogStore {
  // @observable
  dataSources = []

  // @observable
  state = "pending" // "pending" / "done" / "error"

  // @observable 
  activePage = 'main'

  // @action
  fetchCatalogSources = async () => {
    this.dataSources = []
    this.state = "pending"

    // Get catalog url from a config file.
    let { data: config } = await axios.get("/app-config.json")

    let catalog = config.defaultCatalog

    // get catalog from server if no default
    if (!catalog) {
      try {
        let res = await axios.get(config.catalog_url)
        catalog = res.data
        console.log("successfully retrieved catalog data from server", catalog)
      } catch (err) {
        console.error("unable to load catalog data from server: ", err.stack)
      }
    }

    //request catalog information
    let promiseA = new Promise((resolve, reject) => {
      //if catalog server is down use mock data
      //TODO: update with publish functionality
      resolve(catalog ? catalog : data)
    })

    promiseA
    .then(
      action(dataSources=>{
      this.setDataSources(dataSources)
      this.setState("done")
    }),
    action(error => {
      this.state = "error"
    }))
  }

  // @action
  setDataSources = (dataSources) => {
    this.dataSources = dataSources
  }

  // @action
  setState = (state) => {
    this.state = state
  }

  // @action
  addDataSource = async (dataSource) => {
    this.dataSources.push(dataSource)
  }
}

decorate(CatalogStore, {
  dataSources: observable,
  state: observable,
  activePage: observable,
  fetchCatalogSources: action,
  setDataSources: action,
  addDataSource: action
})

const catalogStore = new CatalogStore()

export default catalogStore