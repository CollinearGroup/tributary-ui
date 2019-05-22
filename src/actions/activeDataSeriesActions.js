// import { observable, decorate, action } from 'mobx';
import axios from 'axios'

async function getSeriesData(url) {
  //TODO add try/catch to handle errors
  let response = await axios.get(url)
  
  if (response.status !== 200) {
    console.error("bad response", response.data)
    return new Error("invalid response")
  }

  return response.data
}

export async function addActiveDataSeries(store, seriesInfo) {
  //Add the series to the store right away
  const nextDataSeries = [...store.activeDataSeries, seriesInfo]
  store.setActiveDataSeries(nextDataSeries)

  if (!seriesInfo.plotlyData) {
    let url = `${seriesInfo.serviceUrl}/api/${seriesInfo.property.key}`
    if (seriesInfo.propertyInput) {
      let keys = Object.keys(seriesInfo.propertyInput)
      keys.forEach((key, i) => {
        if(i===0){
          url += `?${key}=${seriesInfo.propertyInput[key]}`
        } else {
          url += `&${key}=${seriesInfo.propertyInput[key]}`
        }
      })
    }

    console.log("Requesting data from: ", url)
    let seriesData = await getSeriesData(url)

    seriesInfo.plotlyData = {
      x: seriesData.initialDataSet.map(v => v[0]),
      y: seriesData.initialDataSet.map(v => v[1]),
      name: seriesInfo.name,
      // type will default to scatter unless the type is added in the initialDataSet index 3
      type: seriesData.initialDataSet[0][3] ? seriesData.initialDataSet[0][3].type : 'scatter',
      // text is for additional info on hover over the graph points
      text : seriesData.initialDataSet[0][2] ? seriesData.initialDataSet.map(v => v[2]) :'',
      // seriesId: seriesInfo.id
      // marker: { color: 'purple' },
      units : (seriesData.units && seriesData.units.name) ? seriesData.units.name : '',
      yaxis: 'y' //default yaxis to y1, or y
    }

    //Update the store and remove the 'inFlight' flag for this data
    seriesInfo.requestInFlight = false

    //Replace the series info in the store
    let currentSeriesInStore = store.activeDataSeries.filter(it => it.id === seriesInfo.id)

    if (currentSeriesInStore.length) {
      let filteredDataSeries = store.activeDataSeries.filter(it => it.id !== seriesInfo.id)
      let nextDataSeries = [...filteredDataSeries, seriesInfo]

      store.setActiveDataSeries(nextDataSeries)
    } else {
      console.warn("Request finished, but series not found in store")
    }
  }

  return true
}

export function removeActiveSeries(store, id) {
  const nextDataSeries = store.activeDataSeries.filter(series => series.id !== id)
  store.setActiveDataSeries(nextDataSeries)
}

export function updateYaxis(store, name, yaxis) {
  const nextDataSeries = store.activeDataSeries.map(series => {
    if(series.name===name){
      series.yaxis = yaxis
    } 
    return series
  })
  store.setActiveDataSeries(nextDataSeries)
}
