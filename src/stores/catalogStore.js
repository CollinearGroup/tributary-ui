import { observable, action, decorate } from 'mobx';

//TODO: remove this
import { data } from './mockDataSources';

class CatalogStore {
  // @observable
  dataSources = data

  // @observable 
  activePage = 'main'

  // @action
  addDataSource = (dataSources) => {
    this.dataSources = dataSources
    // selectedSeries='',

  }

}

decorate(CatalogStore, {
  dataSources: observable,
  activePage: observable,
  addDataSource: action
})

const catalogStore = new CatalogStore()

export default catalogStore