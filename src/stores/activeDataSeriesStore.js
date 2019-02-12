import { observable, decorate, action } from 'mobx';

class ActiveDataSeriesStore {

  // @observable
  /**
   * Expected store format:
   * id
   * sourceId
   * propertyInput
   * property.key
   */
  activeDataSeries = []

  // @action
  setActiveDataSeries(dataSeries) {
    this.activeDataSeries = dataSeries || []
  }

}

decorate(ActiveDataSeriesStore, {
  activeDataSeries: observable,
  setActiveDataSeries: action
})



const activeDataSeriesStore = new ActiveDataSeriesStore()

export default activeDataSeriesStore