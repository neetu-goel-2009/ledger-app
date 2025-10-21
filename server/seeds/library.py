from seeds.libinfo import libinfo

library = [
    { "id": 1, "name": "Raw Material Master", "type": "simple", "status": "active", "info": { **libinfo['simple'] } },
    { "id": 2, "name": "Labour Master", "type": "simple", "status": "active", "info": { **libinfo['simple'] } },
    { "id": 3, "name": "Rental Master", "type": "simple", "status": "active", "info": { **libinfo['simple'] } },
    { "id": 4, "name": "Office Expense Master", "type": "simple", "status": "active", "info": { **libinfo['simple_office_exp'] } },
    { "id": 5, "name": "Credit Master", "type": "credit", "status": "active", "info": { **libinfo['credit'] } },
    { "id": 6, "name": "Site Master", "type": "site", "status": "active", "info": { **libinfo['site'] } },
    { "id": 7, "name": "Vendor Master", "type": "vendor", "status": "active", "info": { **libinfo['vendor'] } },
]

raw_matrial = [
    { "id": 1, "library_id": 1, "name": "Steel", "variant": "40mm", "status": "active" },
    { "id": 2, "library_id": 1, "name": "Steel", "variant": "25mm", "status": "active" },
    { "id": 3, "library_id": 1, "name": "Steel", "variant": "20mm", "status": "active" },
    { "id": 4, "library_id": 1, "name": "Steel", "variant": "16mm", "status": "active" },
    { "id": 5, "library_id": 1, "name": "Steel", "variant": "12mm", "status": "active" },
    { "id": 6, "library_id": 1, "name": "Steel", "variant": "10mm", "status": "active" },
    { "id": 7, "library_id": 1, "name": "Steel", "variant": "8mm", "status": "active" },
    { "id": 8, "library_id": 1, "name": "Garter", "variant": None, "status": "active" },
    { "id": 9, "library_id": 1, "name": "Stone", "variant": "Tukadi", "status": "active" },
    { "id": 10, "library_id": 1, "name": "Stone", "variant": "Greynite", "status": "active" },
    { "id": 11, "library_id": 1, "name": "Tile", "variant": "Wall Tile", "status": "active" },
    { "id": 12, "library_id": 1, "name": "Tile", "variant": "Floor Tile", "status": "active" },
    { "id": 13, "library_id": 1, "name": "Tile", "variant": "100mm", "status": "active" },
    { "id": 14, "library_id": 1, "name": "Tile", "variant": "80mm", "status": "active" },
    { "id": 15, "library_id": 1, "name": "Tile", "variant": "60mm", "status": "active" },
    { "id": 16, "library_id": 1, "name": "Tile", "variant": "40mm", "status": "active" },
    { "id": 17, "library_id": 1, "name": "Tile", "variant": "Jabra", "status": "active" },
    { "id": 18, "library_id": 1, "name": "Tile", "variant": "Grass Pure", "status": "active" },
    { "id": 19, "library_id": 1, "name": "Rodi", "variant": "65mm", "status": "active" },
    { "id": 20, "library_id": 1, "name": "Rodi", "variant": "40mm", "status": "active" },
    { "id": 21, "library_id": 1, "name": "Rodi", "variant": "20mm", "status": "active" },
    { "id": 22, "library_id": 1, "name": "Rodi", "variant": "10mm", "status": "active" },
    { "id": 23, "library_id": 1, "name": "GSB", "variant": None, "status": "active" },
    { "id": 24, "library_id": 1, "name": "Stone Dust", "variant": "Nila", "status": "active" },
    { "id": 25, "library_id": 1, "name": "Stone Dust", "variant": "Bhura", "status": "active" },
    { "id": 26, "library_id": 1, "name": "Stone Dust", "variant": "White", "status": "active" },
    { "id": 27, "library_id": 1, "name": "Bricks", "variant": "1st Class", "status": "active" },
    { "id": 28, "library_id": 1, "name": "Bricks", "variant": "2nd Class", "status": "active" },
    { "id": 29, "library_id": 1, "name": "Bricks", "variant": "Tile", "status": "active" },
    { "id": 30, "library_id": 1, "name": "Bricks", "variant": "Blast", "status": "active" },
    { "id": 31, "library_id": 1, "name": "Reti", "variant": None, "status": "active" },
    { "id": 32, "library_id": 1, "name": "Double Wash", "variant": None, "status": "active" },
    { "id": 33, "library_id": 1, "name": "Cement", "variant": None, "status": "active" },
    { "id": 34, "library_id": 1, "name": "Mitti", "variant": "per Hiva", "status": "active" },
    { "id": 35, "library_id": 1, "name": "Mitti", "variant": "per Trolley", "status": "active" },
]

labour = [
    { "id": 101, "library_id": 2, "name": "Labour", "variant": "Daily Wages", "status": "active" },
    { "id": 102, "library_id": 2, "name": "Labour", "variant": "Contract", "status": "active" },
    { "id": 103, "library_id": 2, "name": "Labour", "variant": "Mansion", "status": "active" },
    { "id": 104, "library_id": 2, "name": "Labour", "variant": "Labour", "status": "active" },
]

rental = [
    { "id": 201, "library_id": 3, "name": "JCB", "variant": "per hour", "status": "active" },
    { "id": 202, "library_id": 3, "name": "JCB", "variant": "per day", "status": "active" },
    { "id": 203, "library_id": 3, "name": "Tractor-Troley", "variant": "per hour", "status": "active" },
    { "id": 204, "library_id": 3, "name": "Tractor-Troley", "variant": "per day", "status": "active" },
    { "id": 205, "library_id": 3, "name": "Road Roller", "variant": "per hour", "status": "active" },
    { "id": 206, "library_id": 3, "name": "Road Roller", "variant": "per day", "status": "active" },
    { "id": 207, "library_id": 3, "name": "Water Tanker", "variant": "per hour", "status": "active" },
    { "id": 208, "library_id": 3, "name": "Water Tanker", "variant": "per day", "status": "active" },
    { "id": 209, "library_id": 3, "name": "Mixer Vibrator", "variant": "per hour", "status": "active" },
    { "id": 210, "library_id": 3, "name": "Mixer Vibrator", "variant": "per day", "status": "active" },
    { "id": 211, "library_id": 3, "name": "Transportation", "variant": "per hour", "status": "active" },
    { "id": 212, "library_id": 3, "name": "Transportation", "variant": "per day", "status": "active" },
    { "id": 213, "library_id": 3, "name": "Misc.", "variant": "per hour", "status": "active" },
    { "id": 214, "library_id": 3, "name": "Misc.", "variant": "per day", "status": "active" },
]

office = [
    { "id": 301, "library_id": 4, "name": "Salary", "variant": None, "status": "active" },
]

credit = [
    { "id": 401, "library_id": 5, "name": "EMD", "variant": None, "value": "2", "value_type": "%", "status": "active" },
    { "id": 402, "library_id": 5, "name": "Performance Guarantee", "variant": "BG", "value": "5", "value_type": "%", "status": "active" },
    { "id": 403, "library_id": 5, "name": "Security", "variant": None, "value": "5", "value_type": "%", "status": "active" },
    { "id": 404, "library_id": 5, "name": "GST", "variant": None, "value": "2", "value_type": "%", "status": "active" },
    { "id": 405, "library_id": 5, "name": "Income Tax", "variant": None, "value": "1", "value_type": "%", "status": "active" },
    { "id": 406, "library_id": 5, "name": "Net Payment", "variant": None, "value": "", "value_type": "", "status": "active" },
    { "id": 407, "library_id": 5, "name": "GST Return", "variant": None, "value": "18", "value_type": "%", "status": "active" },
]

sites = [
    { "id": 501, "library_id": 6, "name": "Gurugram", "variant": "Manesar", "status": "active",
     "info": { "address": "Manesar", "owner": "xyz", "phone": "1234567890", "GST": "12345" },
    },
    { "id": 502, "library_id": 6, "name": "Haryana", "variant": "Samhalka", "status": "active",
     "info": { "address": "Samhalka", "owner": "xyz", "phone": "1234567890", "GST": "12345" },
    },
]

vendors = [
    { "id": 601, "library_id": 7, "name": "XYZ Hardwares", "variant": "Gurugram", "status": "active",
     "info": { "address": "Gurugram", "owner": "xyz", "phone": "1234567890", "GST": "12345" },
    },
    { "id": 602, "library_id": 7, "name": "ABC Hardwares", "variant": "Samhalka", "status": "active",
     "info": { "address": "Gurugram", "owner": "xyz", "phone": "1234567890", "GST": "12345" },
    },
]

library_master = [
    *raw_matrial,
    *labour,
    *rental,
    *office,
    *credit,
    *sites,
    *vendors,
]

library_master_data = [
    { "id": 1, "quantity": 10, "price": 100, "createdon": "2024-04-13 10:38:30", "version": 1, "site_id": 501, "vendor_id": 601, "library_id": 1, "library_master_id": 1, "status": "active", "info": { **libinfo['simple'] } },
    { "id": 2, "quantity": 10, "price": 100, "createdon": "2024-04-13 10:38:30", "version": 1, "site_id": 501, "vendor_id": 601, "library_id": 1, "library_master_id": 2, "status": "active", "info": { **libinfo['simple'] } },
    { "id": 3, "quantity": 10, "price": 100, "createdon": "2024-04-13 10:38:30", "version": 1, "site_id": 501, "vendor_id": 601, "library_id": 1, "library_master_id": 3, "status": "active", "info": { **libinfo['simple'] } },
]
