import React, { useState } from "react";
import Button from "../component/ClickColor";

const MySate = () => {
  const [count, setCount] = useState<number>(0);

  const handelButton = () => {
    setCount(count + 1);
  };
  const handelButton2 = () => {
    setCount((prev) => prev + 1);
  };
  return (
    <div>
      count: {count};
      <Button
        label="count 1"
        color="bg-blue-600"
        onClick={() => setCount(count + 1)}
      />
      <Button label="count 2" color="bg-red-600" onClick={handelButton} />
      <Button label="count 3" color="bg-yellow-600" onClick={handelButton2} />
    </div>
  );
};

export default MySate;
