export const savePermanentItem = (name, value) => {
  console.log(name, value);
  return {
    type: 'CHANGE_PERMANENT',
    fieldName: name,
    value: value,
  };
};
