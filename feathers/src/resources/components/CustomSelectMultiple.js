import React from 'react';
import ReactSelect from 'react-select';

const CustomSelectMultiple = ({
  field,
  form,
  isMulti = false,
  options,
  ...props
}) => {
  const onChange = option => {
    form.setFieldValue(
      field.name,
      isMulti ? option.map(item => item.value) : option.value
    );
  };

  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter(option => field.value.indexOf(option.value) >= 0)
        : options.find(option => option.value === field.value);
    } else {
      return isMulti ? [] : '';
    }
  };

  return (
    <ReactSelect
      {...props}
      onChange={onChange}
      options={options}
      isMulti={isMulti}
    />
  );
};

export default CustomSelectMultiple;
