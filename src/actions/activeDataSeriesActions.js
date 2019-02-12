// import { observable, decorate, action } from 'mobx';
import axios from 'axios'

async function getSeriesData(url) {
  //TODO add try/catch to handle errors
  let response = await axios.get(url)
  return response.data
}

export async function addActiveDataSeries(store, seriesInfo) {
  if (!seriesInfo.plotlyData) {
    let url = `${seriesInfo.serviceUrl}/api/${seriesInfo.property.key}`
    if (seriesInfo.propertyInput) {
      //TODO sanitize input
      url += `?${seriesInfo.attribute}=${seriesInfo.propertyInput}`
    }

    console.log("Requesting data from: ", url)
    let seriesData = await getSeriesData(url)
    // console.log("RESPONSE: ", seriesData)

    //Inject some fake data
    //TODO extract to some utility
    seriesInfo.plotlyData = {
      x: seriesData.initialDataSet.map(v => v[0] ),
      y: seriesData.initialDataSet.map(v => v[1] ),
      name: seriesInfo.name,
      // marker: { color: 'purple' },
    }
  }
  // console.log("ADDING: ", JSON.stringify(seriesInfo))
  const nextDataSeries = [...store.activeDataSeries, seriesInfo]
  store.setActiveDataSeries(nextDataSeries)
}

export function removeActiveSeries( store, id ){
  const nextDataSeries = store.activeDataSeries.filter(series => series.id !== id)
  store.setActiveDataSeries(nextDataSeries)
}