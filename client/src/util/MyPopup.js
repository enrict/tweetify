import React from "react";
import { Popup } from "semantic-ui-react";

function MyPopup({ content, children }) {
  return (
    <Popup
      inverted
      position="top center"
      content={content}
      trigger={children}
    />
  );
}

export default MyPopup;
