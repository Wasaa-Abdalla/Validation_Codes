import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QrGenerator() {
  const [code, setCode] = useState("");
  const url = code ? `https://epay-n90g.onrender.com/validate/${code}` : "";

  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="text-2xl font-bold mb-4">Generate QR Code</h1>
      <input
        type="text"
        placeholder="Enter receipt code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="border p-2 mb-4 w-64"
      />
      {code && (
        <>
          <QRCodeCanvas value={url} size={200} />
          <p className="mt-4 text-blue-600">{url}</p>
        </>
      )}
    </div>
  );
}
