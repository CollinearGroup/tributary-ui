import { observable, action, decorate } from 'mobx';

//TODO: remove this
import { data } from './mockDataSources';

class CatalogStore {
  // @observable
  dataSources = data

  // @action
  addDataSource = (dataSources) => {
    this.dataSources = dataSources
  }

}

decorate(CatalogStore, {
  dataSources: observable,
  addDataSource: action
})

const catalogStore = new CatalogStore()

export default catalogStore