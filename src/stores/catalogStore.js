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