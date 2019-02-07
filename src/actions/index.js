// adds data source to your observable store and local storage 
export function addLocalDataSource(catalogStore, source) {
  const nextDataSources = [...catalogStore.dataSources, source]
  catalogStore.addDataSource(nextDataSources)
}