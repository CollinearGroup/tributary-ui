import React, {Fragment} from 'react'

const DataSourcePropertyInput = ({property, onChange, currentValue, serviceName}) => {
  let input
  if (!property || !property.name) {
    return null
  }

  const obtainSortedOptions = (values) => {

    let type = (typeof values)
    if(type === 'object' && Array.isArray(values)){ //differentiate Array from Object
      type = 'array'
    }

    let reorder = []
    let options = []

    switch (type) {
      case 'object' :
        //initial structure should be {key:val}
        //ordering array of keys by its values
        reorder = Object.keys(values).sort((a,b) => {
          let A = values[a]
          let B = values[b]
          return A < B ? -1 : A > B ? 1 : 0
        })
        //mapping into options
        options = reorder.map(key => {
          return (
            <option key={key} value={key}>
              {property.values[key]}
            </option>
            )
          })
        return options
      case 'array' :
        //initial structure should be [{name:'string',value:'string',order:int}]
        //orders array of obj by obj.order
        reorder = values.sort((a,b) => a.sort-b.sort)
        //maps each obj into options
        options = reorder.map(obj => {
          return (
            <option key={obj.name} value={obj.name}>
             {obj.value}
            </option>
          )
        })
        return options
      default:
        return values
    }
  }

  switch (property.type) {
    case 'select-map':
      input = <select
        onChange={onChange}
        className="tbt-form-input"
        name={`${serviceName}-prop-select`}
        value={currentValue}>
        {
          obtainSortedOptions(property.values)
        }
      </select>
      break;
    default:
      input = <input
        className="tbt-form-input"
        type="text"
        value={currentValue}
        name={`${serviceName}-prop-input`}
        placeholder={property.description}
        onChange={onChange}
      />
  }

  return <Fragment>
    <label className="tbt-form-label">{property.name}</label>
    {input}
  </Fragment>
}

export default DataSourcePropertyInput