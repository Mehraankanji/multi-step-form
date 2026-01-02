export const PART_A = {
  A1: [
    { name: "policyNumber", label: "Policy Number", type: "number" },
    {
      name: "certificateNumber",
      label: "SI / Certificate No.",
      type: "number",
    },
    { name: "companyName", label: "Company Name", type: "text" },
    { name: "name", label: "Name", type: "text" },
    { name: "address", label: "Address", type: "text" },
    { name: "city", label: "City", type: "text" },
    { name: "state", label: "State", type: "text" },
    { name: "pincode", label: "Pin Code", type: "number" },
    { name: "phoneNumber", label: "Phone Number", type: "phone" },
    { name: "emailId", label: "Email Id", type: "email" },
  ],

  A2: [
    {
      name: "currentlyCoveredByAnyOtherMediclaim/healthInsurance",
      label: "Currently Covered By Any Other Mediclaim / Health Insurance",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      name: "previouslyCoveredByAnyOtherMediclaim/healthInsurance",
      label: "Perviously Covered By Any Other Mediclaim / Health Insurance",
      type: "radio",
      options: ["Yes", "No"],
    },
    { name: "companyName", label: "Company Name", type: "text" },
    { name: "policyNumber", label: "Policy Number", type: "number" },
    { name: "sumInsured(rs)", label: "Sum Insured(Rs.)", type: "number" },
    { name: "diagnosis", label: "Diagnosis", type: "text" },
    {
      name: "dateOfCommencementOfFirstInsuranceWithoutBreak",
      label: "Date Of Commencement Of First Insurance Without Break",
      type: "date",
    },
    {
      name: "haveYouHospitalizedInTheLastFourYearsSinceInceptionOfTheContract",
      label:
        "Have You Hospitalized In The Last Four Years Since Inception Of The Contract",
      type: "radio",
      options: ["Yes", "No"],
    },
    { name: "phoneNumber", label: "Phone Number", type: "phone" },
  ],

  A3: [
    { name: "name", label: "Name", type: "text" },
    {
      name: "gender",
      label: "Gender",
      type: "radio",
      options: ["Male", "Female", "Other"],
    },
    { name: "dob", label: "Date of Birth", type: "date" },
    {
      name: "age",
      label: "Age",
      type: "number",
      readOnly: true,
    },
    {
      name: "relationshipToPrimaryInsured",
      label: "Relationship To Primary Insured",
      type: "radio",
      options: ["Self", "Spouse", "Child", "Father", "Mother", "other"],
    },
    {
      name: "occupation",
      label: "Occupation",
      type: "radio",
      options: [
        "Service",
        "Self Employed",
        "Home Maker",
        "Student",
        "Retired",
        "other",
      ],
    },
    { name: "address", label: "Address", type: "text" },
    { name: "city", label: "City", type: "text" },
    { name: "state", label: "State", type: "text" },
    { name: "pincode", label: "Pin Code", type: "number" },
    { name: "phoneNumber", label: "Phone Number", type: "phone" },
    { name: "emailId", label: "Email Id", type: "email" },
  ],

  A4: [
    {
      name: "hospitalName",
      label: "Hospital Name",
      type: "text",
    },
    {
      name: "roomCategoryOccupied",
      label: "Room Category Occupied",
      type: "radio",
      options: [
        "Day Care",
        "Single Occupancy",
        "Twin Sharing",
        "3 Beds Per Room",
      ],
    },
    {
      name: "hospitalizationDueTo",
      label: " Hospitalization Due To",
      type: "radio",
      options: ["Injury", "illness", "Maternity"],
    },
    {
      name: "ifInjuryGiveCause",
      label: "If Injury Give Cause",
      type: "radio",
      options: [
        "Self inflicted",
        "Road Traffic Accident",
        "Substance Abuse",
        "3 Beds Per Room",
      ],
    },
    { name: "dateOfInjury", label: "Date Of Injury", type: "date" },
    {
      name: "dateOfAdmissionAndTime",
      label: "Date Of Admission and Time",
      type: "datetime-local",
    },
    { name: "medicine", label: "Medicine", type: "text" },
  ],

  A5: [
    {
      name: "detailsOfTheTreatmentExpensesClaimed",
      label: "Details Of The Treatment Expenses Claimed:",
      type: "expense-group",
      options: [
        "Pre-hospitalization Expenses",
        "Post-hospitalization Expenses",
        "Hospitalization Expenses",
        "Health-Checkup Cost",
        "Ambulance Charges",
        "Total Sum Of Treatment Expenses Claimed:",
      ],
    },
    {
      name: "detailsOfLumpSum_CashBenefitClaimed",
      label: "Details Of Lump Sum / Cash Benefit Claimed:",
      type: "expense-group",
      options: [
        "Hospital Daily Cash",
        "Surgical Cash",
        "Critical Illness Benefits",
        "Convalescence",
        "Pre/Post Hospitalization Lump Sum Benefit",
        "Total Cash Benefit Claimed:",
      ],
    },
    {
      name: "claimForDomicilaryHospitalization",
      label: "Claim For Domicilary Hospitalization",
      type: "radio",
      options: ["Yes", "No"],
    },
  ],

  A6: [
    {
      name: "totalhospitalMainBill",
      label: "Total Hospital Main Bill",
      type: "number",
    },
    {
      name: "totalTreatmentExpensesClaimed",
      label: "Total Treatment Expenses Claimed",
      type: "number",
    },
    {
      name: "totalCashBenefitClaimed",
      label: "Total Cash Benefit Claimed",
      type: "number",
    },
    { name: "pharmacyBills", label: "Pharmacy Bills", type: "number" },
    {
      name: "remainingHospitalBill",
      label: "Remaining Hospital Bill",
      type: "number",
    },
  ],

  A7: [
    {
      name: "pan",
      label: "PAN",
      type: "text",
    },
    { name: "accountNumber", label: "Account Number", type: "number" },
    {
      name: "branchName",
      label: "Branch Name",
      type: "text",
    },
    { name: "ifscCode", label: "IFSC Code", type: "text" },
  ],

  A8: [
    {
      name: "declaration",
      label: "Declaration",
      type: "declaration",
    },
    { name: "signature", label: "Signature", type: "file" },
    {
      name: "place",
      label: "Place",
      type: "text",
    },
    { name: "date", label: "Date", type: "date" },
  ],
};

// Part B
export const PART_B = {
  B1: [
    { name: "hospitalName", label: "Hospital Name", type: "text" },
    {
      name: "hospitalRegNoB1",
      label: "Hospital Registration No.",
      type: "text",
    },
    { name: "hospitalId", label: "Hospital Id", type: "number" },
    { name: "typeOfHospital", label: "Type Of Hospital", type: "text" },
    {
      name: "nameOfTheTreatingDoctor",
      label: "Name Of The Treating Doctor",
      type: "text",
    },
    {
      name: "hospitalregistrationNumber",
      label: "Hospital Registration Number",
      type: "number",
    },
    {
      name: "hospitalPhoneNumber1",
      label: "Hospital Phone Number 1",
      type: "phone",
    },
    {
      name: "hospitalPhoneNumber2",
      label: "Hospital Phone Number 2",
      type: "phone",
    },
  ],

  B2: [
    { name: "name", label: "Name", type: "text" },
    {
      name: "ipRegistrationNumber",
      label: "IP Registration Number",
      type: "number",
    },
    {
      name: "gender",
      label: "Gender",
      type: "radio",
      options: ["Male", "Female", "Other"],
    },
    { name: "dob", label: "Date of Birth", type: "date" },
    {
      name: "age",
      label: "Age",
      type: "number",
      readOnly: true,
    },
    {
      name: "dateOfAdmissionAndTime",
      label: "Date Of Admission and Time",
      type: "datetime-local",
    },
    {
      name: "dateOfDischargeAndTime",
      label: "Date Of Discharge And Time",
      type: "datetime-local",
    },
    {
      name: "typeOfAdmission",
      label: "Type Of Admission",
      type: "radio",
      options: ["Emergency", "Planned", "Day Care", "Maternity"],
    },

    {
      name: "totalClaimedAmount",
      label: "Total Claimed Amount",
      type: "number",
    },
  ],

  B3: [
    {
      name: "primaryDiagnosis",
      label: "Primary Diagnosis",
      type: "text",
    },
    {
      name: "additionalDiagnosis",
      label: "Additional Diagnosis",
      type: "text",
    },
    {
      name: "coMorbidities",
      label: "Co-Morbidities",
      type: "text",
    },
    {
      name: "procedure1",
      label: "Procedure 1",
      type: "text",
    },
    {
      name: "procedure2",
      label: "Procedure 2",
      type: "text",
    },
    {
      name: "procedure3",
      label: "Procedure 3",
      type: "text",
    },
  ],

  B4: [
    {
      name: "documentsSubmitted",
      label: "Documents Submitted",
      type: "checkbox-group",
      options: [
        "Claim Form Duly Signed",
        "Original Pre-authorization Request",
        "Copy Of Pre-authorization Approval Letter",
        "Copy Of Photo ID",
        "Hospital Discharge Summary",
        "Hospital Main Bill",
        "Investigation Report",
        "ECG",
        "Pharmacy Bill",
      ],
    },
  ],

  B5: [
    { name: "addressOfHospital", label: "Address Of Hospital", type: "text" },
    { name: "locatedCity", label: "Located City", type: "text" },
    { name: "locatedState", label: "Located State", type: "text" },
    { name: "hospitalPinCode", label: "Hospital Pin Code", type: "number" },
    { name: "hospitalPhone", label: "Hospital Phone", type: "phone" },
    { name: "hospitalPan", label: "Hospital Pan", type: "text" },
    {
      name: "facilitiesAvailableInTheHospital",
      label: "Facilities Available In The Hospital",
      type: "yes-no-group",
      options: ["OT", "ICU"],
    },
    { name: "others", label: "Others", type: "text" },
  ],

  B6: [
    {
      name: "declaration",
      label: "Declaration",
      type: "declaration",
    },
    { name: "signature", label: "Signature", type: "file" },
    {
      name: "place",
      label: "Place",
      type: "text",
    },
    { name: "date", label: "Date", type: "date" },
  ],
};

export const SECTION_TITLES = {
  A1: "Details of Primary Insured:",
  A2: "Details of Insurance History:",
  A3: "Details of Insured Person Hospitalized:",
  A4: "Details of Hospitalization:",
  A5: "Details of Claim:",
  A6: "Details of Bill Enclosed:",
  A7: "Details of Bank Account:",
  A8: "Insured Declaration:",

  B1: "Details of Hospital:",
  B2: "Details of Patient Admitted:",
  B3: "Details of Diagnosis & Procedures:",
  B4: "Documents Submitted:",
  B5: "Details of Non-Network Hospital: ",
  B6: "Hospital Declaration:",
};

export const PART_A_KEYS = Object.keys(PART_A);
export const PART_B_KEYS = Object.keys(PART_B);

export default { PART_A, PART_B };
