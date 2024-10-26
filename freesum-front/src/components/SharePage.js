// src/components/SharePage.js
import React from "react";

function SharePage() {
  const shareLink = "http://yourapp.com/space/abc123";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="share-page">
      <h2>Share this Space</h2>
      <input type="text" value={shareLink} readOnly />
      <button onClick={copyToClipboard}>Copy Link</button>
      <button>Send Email Invite</button>
    </div>
  );
}

export default SharePage;