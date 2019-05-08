import React, {Fragment} from 'react'

const DataSourcePropertyInput = ({property, onChange, currentValue, serviceName}) => {
  let input
  if (!property || !property.name) {
    return null
  }

  const sortOptions = (options) => {
    //chart duration options are already in order
    if(property.name === "chart duration"){
      return options
    }
    return options.sort()
  }

  switch (property.type) {
    case 'select-map':
      input = <select
        onChange={onChange}
        className="tbt-form-input"
        name={`${serviceName}-prop-select`}
        value={currentValue}>
        {
          sortOptions(Object.keys(property.values))
          .map(key => {
          return (
            <option key={key} value={key}>
              {property.values[key]}
            </option>
            )
          })
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