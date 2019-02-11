import { observable, decorate, action } from 'mobx';

class ActiveDataSeriesStore {

  // @observable
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