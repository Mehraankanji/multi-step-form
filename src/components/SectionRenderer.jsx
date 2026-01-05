import React, { useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import { useDispatch, useSelector } from "react-redux";
import { updateSection } from "../store/claimSlice";
import { PART_A, PART_B, SECTION_TITLES } from "../constants/fields";
import {
  gatherFilledValues,
  calculateAge,
  calculateRemainingHospitalBill,
  getA6AutoFillValues,
  getB2TotalClaimed,
} from "../utils/calculationLogic";
import FieldRenderer, { NO_AUTOFILL_TYPES } from "./FieldRenderer";
import { validateField } from "../utils/validationLogic";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const NO_AUTOFILL_FIELDS = ["declaration", "signature"];

export default function SectionRenderer({
  part,
  sectionKey,
  onNext,
  onBack,
  isLastStep,
  onReset,
}) {
  const dispatch = useDispatch();
  const fullState = useSelector((s) => s.claim);

  const fields = part === "A" ? PART_A[sectionKey] : PART_B[sectionKey];
  const savedValues = fullState[part][sectionKey] || {};
  const allFilled = gatherFilledValues(fullState);

  // ---------------------- DEFAULT VALUES ----------------------
  const defaultValues = {};
  fields.forEach((field) => {
    if (NO_AUTOFILL_TYPES.includes(field.type)) {
      defaultValues[field.name] =
        field.type === "checkbox" ? false : field.type === "file" ? "" : "";
      return;
    }

    if (
      ["expense-group", "checkbox-group", "yes-no-group"].includes(field.type)
    ) {
      defaultValues[field.name] =
        savedValues[field.name] ?? allFilled[field.name] ?? {};
    } else {
      defaultValues[field.name] =
        savedValues[field.name] ?? allFilled[field.name] ?? "";
    }
  });

  // ---------------------- FORM ----------------------
  const form = useForm({
    defaultValues,
    onSubmit: async ({ value, formApi }) => {
      await formApi.validate();
      if (!formApi.state.isValid) return;

      dispatch(updateSection({ part, sectionKey, data: value }));

      const finalState = {
        ...fullState,
        [part]: {
          ...fullState[part],
          [sectionKey]: value,
        },
      };
      onNext(finalState);
    },
  });

  // ---------------------- AUTO-FILL A6 ----------------------
  useEffect(() => {
    if (part !== "A" || sectionKey !== "A6") return;
    const a5 = fullState.A?.A5;
    if (!a5) return;

    const { totalTreatmentExpensesClaimed, totalCashBenefitClaimed } =
      getA6AutoFillValues(a5);

    form.setFieldValue(
      "totalTreatmentExpensesClaimed",
      totalTreatmentExpensesClaimed
    );
    form.setFieldValue("totalCashBenefitClaimed", totalCashBenefitClaimed);

    const remaining = calculateRemainingHospitalBill({
      hospitalBill: form.getFieldValue("totalhospitalMainBill"),
      pharmacyBill: form.getFieldValue("pharmacyBills"),
      treatmentTotal: totalTreatmentExpensesClaimed,
      cashTotal: totalCashBenefitClaimed,
    });

    form.setFieldValue("remainingHospitalBill", remaining);
  }, [part, sectionKey, fullState.A?.A5]);

  // ---------------------- AUTO-FILL B2 ----------------------
  useEffect(() => {
    if (part !== "B" || sectionKey !== "B2") return;
    const a5 = fullState.A?.A5;
    if (!a5) return;

    form.setFieldValue("totalClaimedAmount", getB2TotalClaimed(a5));
  }, [part, sectionKey, fullState.A?.A5]);

  // ---------------------- HELPERS ----------------------
  form.calculateAge = calculateAge;
  form.calculateRemainingHospitalBill = calculateRemainingHospitalBill;

  // ---------------------- RENDER ----------------------
  return (
    <Card className="rounded-2xl shadow-lg border bg-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold">
          Section {part} – {SECTION_TITLES[sectionKey]}
        </CardTitle>

        <Button variant="destructive" size="sm" onClick={() => onReset(true)}>
          Reset All
        </Button>
      </CardHeader>

      <Separator />

      <CardContent className="pt-6">
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-5"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map((field) => (
              <form.Field
                key={field.name}
                name={field.name}
                validators={{
                  onSubmit: ({ value }) => validateField({ value, field }),
                }}
              >
                {(fieldApi) => (
                  <FieldRenderer
                    field={field}
                    fieldApi={fieldApi}
                    form={form}
                    allFilled={allFilled}
                    savedValues={savedValues}
                    part={part}
                    sectionKey={sectionKey}
                  />
                )}
              </form.Field>
            ))}
          </div>

          {/* FOOTER ACTIONS */}
          <div className="bg-white border-t pt-4 flex justify-between">
            <Button
              variant="outline"
              type="button"
              disabled={!onBack}
              onClick={onBack}
              className="px-10"
            >
              ← Back
            </Button>

            <Button
              type="submit"
              className="px-12 bg-blue-600 hover:bg-blue-700"
            >
              {isLastStep ? "Submit Claim" : "Next →"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
