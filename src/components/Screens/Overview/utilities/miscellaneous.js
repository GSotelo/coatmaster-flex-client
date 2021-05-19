import _ from "lodash";
import cryptoRandomString from "crypto-random-string";

// Maybe the first 2 funcs can be one...
export const validateDataAPL = (data, objKey) => {
  const dataIsEmpty = _.isEmpty(data);
  const noObjKey = !(objKey in data);

  if (dataIsEmpty && noObjKey) {
    throw new Error("Data validation failed (applications)");
  }
}

export const validateDataBLK = (data, objKey) => {
  const dataIsEmpty = _.isEmpty(data);
  const noObjKey = !(objKey in data);

  if (dataIsEmpty && noObjKey) {
    throw new Error("Data validation failed (blocks)");
  }
}

export const createDropdownOptions = (data, validateData, objKey) => {
  console.log("Data to create DROPDOWN OPTIONS", data, objKey);
  const fallback = [{ key: 1, value: 1, text: "default" }];

  try {
    validateData(data, objKey);
  } catch (err) {
    console.error("[createDropdownOptions]", err.message);
    return fallback;
  }

  const configurationNames = _.map(data[objKey], "name");

  console.log("configurationNames", configurationNames);

  const dropdownOptions = configurationNames.map(
    (name, index) => (
      {
        key: cryptoRandomString({ length: 10 }),
        text: name,
        value: index + 1
      }
    )
  );

  return dropdownOptions;
}