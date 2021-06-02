import _ from "lodash";
import cryptoRandomString from "crypto-random-string";

export const validateData = (data) => {
  const dataIsEmpty = _.isEmpty(data);

  if (dataIsEmpty) {
    throw new Error("Not possible to create dropdown options from empty data");
  }
}

export const createDropdownOptions = (data, validateData) => {
 
  const fallback = [{ key: 1, value: 1, text: "no-data" }];

  try {
    validateData(data);
  } catch (err) {
    console.error("[createDropdownOptions]", err.message);
    return fallback;
  }

  // There is always a name prop in the response object. This is defined by the local server itself
  const applicationNames = _.map(data, "name"); // Use "id" to verify application - block relationship on main screen

  const dropdownOptions = applicationNames.map(
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