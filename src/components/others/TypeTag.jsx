export function TypeTag ({ type }) {
  return (<span className={`typeTag ${type.toLowerCase()}`}>{type}</span>)
}
