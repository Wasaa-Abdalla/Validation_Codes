from flask import Flask, send_from_directory, jsonify
import os

app = Flask(__name__, static_folder="../qr-validator/dist")

# Example in-memory receipts
receipts = {
    "8DEB11A545EE76E": {
        "code": "8DEB11A545EE76E",
        "description": "BUSINESS PERMIT BILL FOR YEAR-2026, OWNER :",
        "document_date": "2026-06-16 18:10:02",
        "generated_by": "REHEMA OMAR",
        "amount": "1000000.00",
        "issued_to": "BUSINESS PERMIT BILL FOR YEAR-2026, OWNER :",
        "sub_county": "",
        "ward": "",
        "zone": ""
    },
    "XYZ123456789": {
        "code": "XYZ123456789",
        "description": "PHARMACY RECEIPT - SALE",
        "document_date": "2026-06-17 12:15:00",
        "generated_by": "LATE NIGHT CHEMIST",
        "amount": "1500.00",
        "issued_to": "Customer: John Doe",
        "sub_county": "Kwale",
        "ward": "Ward 5",
        "zone": "Zone A"
    },
    "8DE6D728FF73D97": {
        "code": "8DE6D728FF73D97",
        "description": "Sand & Stone Cess",
        "document_date": "2026-06-27 15:10:02",
        "generated_by": "MARIAM BAYA",
        "amount": "131400.00",
        "issued_to": "Sand & Stone Cess",
        "sub_county": "",
        "ward": "",
        "zone": ""
    },
    "ADEXYKWPLVA": {
            "code": "ADEXYKWPLVA",
            "description": "ADVERT CHARGE FOR CLIENT",
            "document_date": "2026-09-14 15:10:02",
            "generated_by": "CATHERINE MBULWA",
            "amount": "600000.00",
            "issued_to": "ADVERT CHARGE FOR CLIENT",
            "sub_county": "",
            "ward": "",
            "zone": ""
        },
        "MSX4SNLH2MJ": {
                "code": "MSX4SNLH2MJ",
                "description": "RIVER SAND CESS-TSUNZA LUTSANGANI",
                "document_date": "2026-08-14 10:37:43",
                "generated_by": "JEFFA JEFFA",
                "amount": "100.00",
                "issued_to": "RIVER SAND CESS-TSUNZA LUTSANGANI",
                "sub_county": "",
                "ward": "",
                "zone": ""
            },
}

@app.route("/api/validate/<code>")
def validate(code):
    receipt = receipts.get(code)
    if receipt:
        return jsonify(receipt)
    return jsonify({"error": "Receipt not found"}), 404

# Catch-all route to serve React frontend
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")
