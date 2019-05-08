import React, {Fragment} from 'react'

const DataSourcePropertyInput = ({property, onChange, currentValue, serviceName}) => {
  let input
  if (!property || !property.name) {
    return null
  }
  switch (property.type) {
    case 'select-map':
      input = <select
        onChange={onChange}
        className="tbt-form-input"
        name={`${serviceName}-prop-select`}
        value={currentValue}>
        {Object.keys(property.values).sort((a,b) => {
          const A = property.values[a]
          const B = property.values[b]
          return A < B ? -1 : A > B ? 1 : 0
        }).map(key => {
          return <option
            key={key}
            value={key}
          >
            {property.values[key]}
          </option>
        })}
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