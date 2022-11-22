import React from "react";
import { updateName } from "@nitex/utility";

export default function NameComponent() {
  // Create an input to get name from
  const [name, setName] = React.useState("");

  const handleNameChange = (name) => {
    setName(name);
    updateName(name);
  };

  return (
    <div className="pl-4">
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => handleNameChange(e.target.value)}
        className="text-gray-700"
      />
    </div>
  );
}
