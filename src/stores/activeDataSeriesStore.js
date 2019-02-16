import { observable, decorate, action } from 'mobx';

class ActiveDataSeriesStore {

  // @observable
  /**
   * Expected store format:
   * id
   * sourceId
   * propertyInput
   * property.key
   * property.name
   * plotlyData.key
   */
  activeDataSeries = []

  // @observable
  /**
   * {
   *   name: ''
   *   x: 123
   *   y: 123
   * }
   */
  hoverData = []

  // @action
  setActiveDataSeries(dataSeries) {
    this.activeDataSeries = dataSeries || []
  }

  // @action
  setHoverData(nextHoverData) {
    // console.log("SETTING DATA: ", nextHoverData)
    this.hoverData = nextHoverData
  }

}

decorate(ActiveDataSeriesStore, {
  activeDataSeries: observable,
  setActiveDataSeries: action,
  hoverData: observable,
  setHoverData: action
})



const activeDataSeriesStore = new ActiveDataSeriesStore()

export default activeDataSeriesStore