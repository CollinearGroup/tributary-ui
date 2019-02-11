// import { observable, decorate, action } from 'mobx';


export function addActiveDataSeries(store, data) {
  const nextDataSeries = [...store.activeDataSeries, data]
  store.setActiveDataSeries(nextDataSeries)
}