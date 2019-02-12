// import { observable, decorate, action } from 'mobx';


export function addActiveDataSeries(store, data) {
  const nextDataSeries = [...store.activeDataSeries, data]
  store.setActiveDataSeries(nextDataSeries)
}

export function removeActiveSeries( store, id ){
  const nextDataSeries = store.activeDataSeries.filter(series => series.id !== id)
  store.setActiveDataSeries(nextDataSeries)
}