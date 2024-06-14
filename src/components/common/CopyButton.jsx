import * as React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaRegCopy } from "react-icons/fa";

function CopyButton({ code }) {
  const [copied, setCopied] = React.useState(false);
  return (
    <button className="CopyButtonClass">
      <CopyToClipboard
        text={code}
        onCopy={() => {
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 3000);
        }}
      >
        <div className="text-white dark:text-black flex items-center gap-2">
          {copied && <p className="text-sm font-apple_system">copied</p>}
          <FaRegCopy />
        </div>
      </CopyToClipboard>
    </button>
  );
}

export default CopyButton;
