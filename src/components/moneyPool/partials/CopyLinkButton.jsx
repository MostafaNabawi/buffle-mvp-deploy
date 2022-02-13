/** @format */

import React, { useState, useRef } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { Button, Overlay, Tooltip } from "react-bootstrap";
import { Icon } from "@iconify/react";
function CopyLinkButton({ copyValue }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const target = useRef(null);
  return (
    <>
      <CopyToClipboard text={copyValue}>
        <Button
          ref={target}
          onClick={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <Icon icon="akar-icons:copy" /> Invite code
        </Button>
      </CopyToClipboard>
      <Overlay target={target.current} show={showTooltip} placement="top">
        <Tooltip id="overlay-example">Copied</Tooltip>
      </Overlay>
    </>
  );
}

export default CopyLinkButton;
