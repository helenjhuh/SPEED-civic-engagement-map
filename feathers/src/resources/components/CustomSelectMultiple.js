import React from 'react';
import ReactSelect from 'react-select';
import CreatableSelect from 'react-select/creatable';

const CustomSelectMultiple = ({
  field,
  form,
  isMulti = false,
  isCreatable = false,
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
    isCreatable
      ? <CreatableSelect
        {...props}
        onChange={onChange}
        options={options}
        isMulti={isMulti}
      />
      : <ReactSelect
        {...props}
        onChange={onChange}
        options={options}
        isMulti={isMulti}
      />
  );
};

export default CustomSelectMultiple;
