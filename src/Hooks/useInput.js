import { useState } from "react";

export default (defaultValue) => {
  const [value, setValue] = useState(defaultValue);

  const onChange = (e) => {
    const {
      target: { value2 },
    } = e;
    setValue(value2);
  };

  return { value, onChange };
};
