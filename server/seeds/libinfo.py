simple = {
    "type": "simple",
    "formElements": [
        {
            "element": "input",
            "type": "hidden",
            "label": "",
            "name": "site_id",
            "value": "",
            "validation": "required",
        },
        {
            "element": "input",
            "type": "hidden",
            "label": "",
            "name": "library_id",
            "value": "",
            "validation": "required",
        },
        {
            "element": "dropdown",
            "type": "single",
            "name": "vendor_id",
            "label": "Vendor",
            "placeholder": "Select Vendor",
            "value": "",
            "validation": "required",
        },
        {
            "element": "dropdown",
            "type": "single",
            "name": "library_master_id",
            "label": "Category",
            "placeholder": "Select Category",
            "value": "",
            "validation": "required",
        },
        # {
        #     "element": "dropdown",
        #     "type": "single",
        #     "name": "variant",
        #     "label": "Sub-Category",
        #     "placeholder": "Select Sub-Category",
        #     "value": "",
        #     "validation": "required",
        # },
        {
            "element": "input",
            "type": "text",
            "name": "quantity",
            "label": "Quantity",
            "placeholder": "Enter Quantity",
            "value": "",
            "validation": "required",
        },
        {
            "element": "input",
            "type": "text",
            "name": "price",
            "label": "Price",
            "placeholder": "Enter Price",
            "value": "",
            "validation": "required",
        },
        {
            "element": "dropdown",
            "type": "single",
            "name": "status",
            "label": "Status",
            "placeholder": "Select Status",
            "value": "active",
            "options": [
                {"key": "active", "value": "Active"},
                {"key": "inactive", "value": "In-Active"},
            ],
        },
    ],
}
simple_office_exp = {
    "type": "simple",
    "formElements": [
        {
            "element": "input",
            "type": "hidden",
            "label": "",
            "name": "site_id",
            "value": "",
            "validation": "required",
        },
        {
            "element": "input",
            "type": "hidden",
            "label": "",
            "name": "library_id",
            "value": "",
            "validation": "required",
        },
        {
            "element": "dropdown",
            "type": "single",
            "name": "vendor_id",
            "label": "Vendor",
            "placeholder": "Select Vendor",
            "value": "",
            "validation": "required",
        },
        {
            "element": "dropdown",
            "type": "single",
            "name": "library_master_id",
            "label": "Category",
            "placeholder": "Select Category",
            "value": "",
            "validation": "required",
        },
        {
            "element": "input",
            "type": "text",
            "name": "misc[name]",
            "label": "Name",
            "placeholder": "Enter Name",
            "value": "",
            "validation": "required",
        },
        {
            "element": "input",
            "type": "text",
            "name": "quantity",
            "label": "Quantity",
            "placeholder": "Enter Quantity",
            "value": "",
            "validation": "required",
        },
        {
            "element": "input",
            "type": "text",
            "name": "price",
            "label": "Price",
            "placeholder": "Enter Price",
            "value": "",
            "validation": "required",
        },
        {
            "element": "dropdown",
            "type": "single",
            "name": "status",
            "label": "Status",
            "placeholder": "Select Status",
            "value": "active",
            "options": [
                {"key": "active", "value": "Active"},
                {"key": "inactive", "value": "In-Active"},
            ],
        },
    ],
}

credit = {
    "type": "credit",
    "formElements": [
        *simple["formElements"],
    ]
}

site = {
    "type": "site",
    "formElements": [
        {
            "element": "input",
            "type": "text",
            "name": "info[name]",
            "label": "Name",
            "placeholder": "Enter Site Name",
            "value": "",
            "validation": "required",
        },
        {
            "element": "input",
            "type": "textarea",
            "name": "info[address]",
            "label": "Address",
            "placeholder": "Enter Address",
            "value": "",
            "validation": "required",
        },
        {
            "element": "input",
            "type": "text",
            "name": "info[gst]",
            "label": "GST",
            "placeholder": "Enter GST",
            "value": "",
            "validation": "required",
        },
        {
            "element": "input",
            "type": "text",
            "name": "info[phone]",
            "label": "Phone",
            "placeholder": "Enter Phone",
            "value": "",
            "validation": "required",
        },
        {
            "element": "input",
            "type": "text",
            "name": "info[account_no]",
            "label": "Bank Account No.",
            "placeholder": "Enter Bank Account No.",
            "value": "",
            "validation": "required",
        },
        {
            "element": "input",
            "type": "text",
            "name": "info[account_ifsc]",
            "label": "Bank Account IFSC Code",
            "placeholder": "Enter Bank Account IFSC Code",
            "value": "",
            "validation": "required",
        },
    ],
}

vendor = {
    "type": "vendor",
    "formElements": [
        *site["formElements"],
    ]
}

libinfo = {
    "simple": { **simple },
    "simple_office_exp": { **simple_office_exp },
    "credit": { **credit },
    "site": { **site },
    "vendor": { **vendor },
}
