import React from "react";
import DisplayMessages from "./DisplayMessages.js";

function DirectMessages() {
  return (
    <div className="mx-auto w-75 mt-4 p-2">
      <p className="text-center h1">Your Messages</p>
      <DisplayMessages />
    </div>
  );
}

export default DirectMessages;