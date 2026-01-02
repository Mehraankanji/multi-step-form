import React from "react";
import {
  calculateRemainingHospitalBill,
  calculateTotalExpense,
} from "../utils/calculationLogic";
import {
  DECLARATION_TEXT_FIRST,
  DECLARATION_TEXT_SECOND,
} from "../constants/declarationText";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const NO_AUTOFILL_TYPES = ["file", "checkbox", "declaration"];

const AUTO_FILLED_FIELDS_MAP = {
  A: {
    A2: ["companyName", "policyNumber", "phoneNumber"],
    A3: [
      "name",
      "address",
      "city",
      "state",
      "pincode",
      "phoneNumber",
      "emailId",
    ],
    A6: [
      "totalTreatmentExpensesClaimed",
      "totalCashBenefitClaimed",
      "remainingHospitalBill",
    ],
  },
  B: {
    B1: ["hospitalName"],
    B2: ["name", "age", "dob", "totalClaimedAmount", "dateOfAdmissionAndTime"],
    B6: ["place", "date"],
  },
};

export default function FieldRenderer({
  field,
  fieldApi,
  form,
  part,
  sectionKey,
}) {
  const isAgeField = field.name === "age";

  const isAutoFilledField =
    AUTO_FILLED_FIELDS_MAP?.[part]?.[sectionKey]?.includes(field.name) ?? false;

  const shouldDisable = isAgeField || isAutoFilledField;

  const handleInputChange = (e) => {
    let val = e.target.value;

    if (field.type === "number" || field.type === "phone")
      val = val.replace(/\D/g, "");

    if (field.name === "pincode") val = val.slice(0, 6);
    if (field.type === "phone") val = val.slice(0, 10);

    fieldApi.handleChange(val);

    if (field.name === "dob") {
      form.setFieldValue("age", form.calculateAge(val));
    }

    if (
      [
        "totalhospitalMainBill",
        "pharmacyBills",
        "totalTreatmentExpensesClaimed",
        "totalCashBenefitClaimed",
      ].includes(field.name)
    ) {
      const remaining = calculateRemainingHospitalBill({
        hospitalBill:
          field.name === "totalhospitalMainBill"
            ? val
            : form.getFieldValue("totalhospitalMainBill") || 0,
        pharmacyBill:
          field.name === "pharmacyBills"
            ? val
            : form.getFieldValue("pharmacyBills") || 0,
        treatmentTotal:
          field.name === "totalTreatmentExpensesClaimed"
            ? val
            : form.getFieldValue("totalTreatmentExpensesClaimed") || 0,
        cashTotal:
          field.name === "totalCashBenefitClaimed"
            ? val
            : form.getFieldValue("totalCashBenefitClaimed") || 0,
      });
      form.setFieldValue("remainingHospitalBill", remaining);
    }
  };

  return (
    <div
      className={`flex flex-col ${
        ["expense-group", "checkbox-group", "yes-no-group"].includes(field.type)
          ? "col-span-2"
          : ""
      }`}
    >
      <Label className="mb-1 text-sm font-semibold text-gray-800">
        {field.label}
      </Label>

      {/* EXPENSE GROUP */}
      {field.type === "expense-group" && (
        <div className="grid gap-3 p-3 border rounded-lg bg-gray-50">
          {field.options.map((opt) => {
            const totalLabel = field.options[field.options.length - 1];
            const isTotal = opt === totalLabel;

            return (
              <div
                key={opt}
                className="grid grid-cols-[2fr_1fr] gap-3 items-center"
              >
                <span className={isTotal ? "font-semibold" : ""}>{opt}</span>
                <input
                  type="number"
                  value={fieldApi.state.value?.[opt] || ""}
                  readOnly={isTotal}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    const updated = { ...fieldApi.state.value, [opt]: val };
                    updated[totalLabel] = calculateTotalExpense(updated);
                    fieldApi.handleChange(updated);
                  }}
                  className={`px-3 py-2 rounded-md ${
                    isTotal
                      ? "bg-blue-50 border-2 border-red-500 text-red-600 font-bold cursor-not-allowed"
                      : "border"
                  }`}
                />
              </div>
            );
          })}
        </div>
      )}

      {/* CHECKBOX GROUP */}
      {field.type === "checkbox-group" && (
        <div className="flex flex-col gap-2">
          {field.options.map((opt) => (
            <label key={opt} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={fieldApi.state.value?.[opt] === true}
                onChange={(e) => {
                  fieldApi.handleChange({
                    ...fieldApi.state.value,
                    [opt]: e.target.checked,
                  });
                  fieldApi.handleBlur();
                }}
              />
              {opt}
            </label>
          ))}
        </div>
      )}

      {/* YES / NO GROUP */}
      {field.type === "yes-no-group" && (
        <div className="flex flex-col gap-2">
          {field.options.map((opt) => (
            <div key={opt} className="flex items-center gap-3">
              <span>{opt}</span>

              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  checked={fieldApi.state.value?.[opt] === "Yes"}
                  onChange={() => {
                    fieldApi.handleChange({
                      ...fieldApi.state.value,
                      [opt]: "Yes",
                    });
                    fieldApi.handleBlur();
                  }}
                />
                Yes
              </label>

              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  checked={fieldApi.state.value?.[opt] === "No"}
                  onChange={() => {
                    fieldApi.handleChange({
                      ...fieldApi.state.value,
                      [opt]: "No",
                    });
                    fieldApi.handleBlur();
                  }}
                />
                No
              </label>
            </div>
          ))}
        </div>
      )}

      {/* DECLARATION */}
      {field.type === "declaration" && (
        <div className="p-4 border rounded-lg bg-gray-50 text-sm leading-6">
          <p>
            {part === "A" ? DECLARATION_TEXT_FIRST : DECLARATION_TEXT_SECOND}
          </p>

          <label className="mt-3 flex items-center gap-2">
            <input
              type="checkbox"
              checked={fieldApi.state.value === true}
              onChange={(e) => {
                fieldApi.handleChange(e.target.checked);
                fieldApi.handleBlur();
              }}
            />
            <span>I agree to the above declaration</span>
          </label>
        </div>
      )}

      {/* RADIO */}
      {field.type === "radio" && field.options && (
        <div className="flex gap-3">
          {field.options.map((opt) => (
            <label key={opt} className="flex items-center gap-1">
              <input
                type="radio"
                checked={fieldApi.state.value === opt}
                onChange={() => {
                  fieldApi.handleChange(opt);
                  fieldApi.handleBlur();
                }}
              />
              {opt}
            </label>
          ))}
        </div>
      )}

      {/* NORMAL INPUT */}
      {[
        "text",
        "number",
        "phone",
        "email",
        "date",
        "datetime-local",
        "file",
      ].includes(field.type) && (
        <Input
          type={field.type === "phone" ? "text" : field.type}
          value={field.type === "file" ? undefined : fieldApi.state.value || ""}
          disabled={shouldDisable}
          onChange={(e) => {
            if (shouldDisable) return;

            if (field.type === "file") {
              const file = e.target.files?.[0];
              if (!file) return;

              const reader = new FileReader();
              reader.onload = () => {
                fieldApi.handleChange(reader.result);
                fieldApi.handleBlur();
              };
              reader.readAsDataURL(file);
            } else {
              handleInputChange(e);
            }
          }}
          onBlur={!shouldDisable ? fieldApi.handleBlur : undefined}
          className={`px-3 py-3 border rounded-md text-sm ${
            shouldDisable ? "bg-gray-200 cursor-not-allowed" : "bg-white"
          }`}
        />
      )}

      {/* ERROR */}
      {fieldApi.state.meta.errors.length > 0 && (
        <span className="mt-1 text-xs text-red-600">
          {fieldApi.state.meta.errors[0]}
        </span>
      )}
    </div>
  );
}
