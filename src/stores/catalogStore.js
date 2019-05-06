import { observable, action, decorate } from 'mobx';

//TODO: remove this
import { data } from './mockDataSources';
class CatalogStore {
  // @observable
  dataSources = []

  // @observable
  state = "pending" // "pending" / "done" / "error"

  // @observable 
  activePage = 'main'

  // @action
  fetchCatalogSources = () => {
    this.dataSources = []
    this.state = "pending"
    
    let promiseA = new Promise((resolve, reject) => {
      let wait = setTimeout(()=>{
        clearTimeout(wait)
        resolve(data)
      }, 3000)
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