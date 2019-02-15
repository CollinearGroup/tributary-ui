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
  if (!seriesInfo.plotlyData) {
    let url = `${seriesInfo.serviceUrl}/api/${seriesInfo.property.key}`
    if (seriesInfo.propertyInput) {
      //TODO sanitize input
      url += `?${seriesInfo.attribute}=${seriesInfo.propertyInput}`
    }

    console.log("Requesting data from: ", url)
    let seriesData = await getSeriesData(url)

    //Inject some fake data
    //TODO extract to some utility

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
    }

  }
  // console.log("ADDING: ", JSON.stringify(seriesInfo))
  const nextDataSeries = [...store.activeDataSeries, seriesInfo]
  store.setActiveDataSeries(nextDataSeries)

  return true
}

export function removeActiveSeries(store, id) {
  const nextDataSeries = store.activeDataSeries.filter(series => series.id !== id)
  store.setActiveDataSeries(nextDataSeries)
}
