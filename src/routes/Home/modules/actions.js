
export function fetchData(typeValue, value) {
  return {
    type: "FETCH_DATA",
    typeValue,
    value,
  };
}
