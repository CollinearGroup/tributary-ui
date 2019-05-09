import React, {Fragment} from 'react'
import _ from 'lodash'

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
        //initial structure should be {'string':'string'}
        //safety checks for structure
        if(!Object.keys(values).length 
        || typeof Object.keys(values)[0] !== 'string'
        || typeof values[Object.keys(values)[0]] !== 'string') {
          return []
        }

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
        //safety checks for structure
        if(!values.length 
          || typeof values[0] !== 'object'
          || Array.isArray(values[0])){
            return []
          }

        //orders array of obj by obj.order
        reorder = values.sort((a,b) => {
          //sends object to end if no 'order' key. Additional check bc 0 is falsy
          let A = (a.order || a.order === 0) ? a.order : Infinity
          let B = (b.order || b.order === 0) ? b.order : Infinity
          return A-B
        })
        //maps each obj into options
        options = reorder.map(obj => {
          //sets defaults if no obj.name or obj.value is present
          let key = obj.name ? obj.name : 'key'
          let value = obj.value ? obj.value : 'value'
          return (
            <option key={key} value={key}>
             {value}
            </option>
          )
        })
        return options
      default:
        return []
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
          obtainSortedOptions(_.cloneDeep(property.values))
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