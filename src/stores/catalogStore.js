import { observable, action, decorate } from 'mobx';

//TODO: remove this
import { data } from './mockDataSources';

class CatalogStore {
  // @observable
  dataSources = data

  // @observable 
  activePage = 'main'

  // @action
  setDataSources = (dataSources) => {
    this.dataSources = dataSources
  }

  // @action
  addDataSource = (dataSource) => {
    this.dataSources.push(dataSource)
  }
}

decorate(CatalogStore, {
  dataSources: observable,
  activePage: observable,
  setDataSources: action,
  addDataSource: action
})

const catalogStore = new CatalogStore()

export default catalogStore