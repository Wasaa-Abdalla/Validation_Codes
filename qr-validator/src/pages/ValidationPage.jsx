import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ValidationPage() {
  const { code } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`/api/validate/${code}`)
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error("Error fetching validation data:", err));
  }, [code]);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-8">
      <div className="bg-white w-full max-w-lg shadow-lg border border-gray-300">

        {/* Page Title */}
        <div className="p-8 text-center">
          <h1 className="text-5xl font-bold text-gray-800">
            QR Code Validation
          </h1>
        </div>

        {/* VALID Banner */}
        <div className="py-10 text-center">
          <h2 className="text-6xl font-extrabold text-green-600">
            VALID
          </h2>
        </div>

        {/* Data Table */}
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border bg-gray-100 p-3 text-left">
                Attribute
              </th>
              <th className="border bg-gray-100 p-3 text-left">
                Value/Details
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data).map(([label, value]) => (
              <tr key={label}>
                <td className="border p-3 font-bold text-gray-700">
                  {label === "document_date" ? "Document Date" : label}
                </td>
                <td className="border p-3 text-sky-500">
                  {label === "document_date"
                    ? new Date(value).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })
                    : value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}
