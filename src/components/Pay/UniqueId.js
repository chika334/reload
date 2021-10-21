import React from "react";

export default function UniqueId(props) {
  const [values, setValues] = React.useState(null);

  // const concatenate = () => {
  //   const value = props.join("BLACKSILICON");
  // };

  React.useEffect(() => {
    const value = props.join("BLACKSILICON");
    setValues(value);
  }, []);

  return <div>{values}</div>;
}
