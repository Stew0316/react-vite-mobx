export function numberStrToBool(str) {
  return Number(str) === 1;
}

export function numberStrToBoolList(dataList = [], key = "value") {
  return dataList.map((data) => {
    return {
      ...data,
      [key]: numberStrToBool(data[key]),
    };
  });
}

export function stringToNumber(dataList = [], key = "value") {
  return dataList.map((data) => {
    return {
      ...data,
      [key]: Number(data[key]),
    };
  });
}
