import { observable, action, decorate } from 'mobx';

class CatalogStore {
  // @observable
  dataSources = []

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