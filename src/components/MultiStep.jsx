import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";

import SectionRenderer from "./SectionRenderer";
import { PART_A_KEYS, PART_B_KEYS } from "../constants/fields";
import { clearAll } from "../store/claimSlice";
import submitClaim from "../api/submitClaim";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// Combine all steps from PART_A and PART_B
const STEPS = [
  ...PART_A_KEYS.map((key) => ({ part: "A", key })),
  ...PART_B_KEYS.map((key) => ({ part: "B", key })),
];

export default function MultiStep() {
  const [index, setIndex] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const dispatch = useDispatch();
  const mutation = useMutation({ mutationFn: submitClaim });

  const currentStep = STEPS[index];

  // Navigation
  const goNext = () => setIndex((i) => Math.min(i + 1, STEPS.length - 1));
  const goBack = () => setIndex((i) => Math.max(i - 1, 0));

  // Final submit
  const handleFinalSubmit = (finalState) => {
    setIsSubmitted(true);
    mutation.mutate(
      { ...finalState, submittedAt: new Date().toISOString() },
      {
        onSuccess: (res) =>
          alert("Submitted successfully — ref: " + (res?.id ?? "NA")),
        onError: () => alert("Submission failed"),
      }
    );
    console.log("FULL CLAIM DATA:", finalState);
  };

  // Render stepper progress
  const renderStepper = () => (
    <div className="flex items-center justify-between mb-8">
      {STEPS.map((s, i) => (
        <div key={i} className="flex-1 flex items-center">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${
              i < index || (i === index && isSubmitted)
                ? "bg-green-500 text-white"
                : i === index
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {i + 1}
          </div>

          {i < STEPS.length - 1 && (
            <div
              className={`flex-1 h-1 mx-2 rounded ${
                i < index || (i === index && isSubmitted)
                  ? "bg-green-500"
                  : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  // Render reset confirmation dialog
  const renderResetDialog = () => (
    <Dialog open={showResetConfirm} onOpenChange={setShowResetConfirm}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 text-red-600 font-bold">
              !
            </span>
            Are you sure you want to reset all the data?
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500 mt-2">
            Once you clicked on Yes the data won't be restored.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => setShowResetConfirm(false)}>
            NO
          </Button>

          <Button
            variant="destructive"
            onClick={() => {
              dispatch(clearAll());
              setIndex(0);
              setResetKey((k) => k + 1);
              setShowResetConfirm(false);
            }}
          >
            YES
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 pb-32">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-2xl font-bold text-red-500">Step Progress</h2>
      </div>

      {/* Stepper */}
      {renderStepper()}

      {/* Current Section */}
      <SectionRenderer
        key={`${resetKey}-${index}`}
        part={currentStep.part}
        sectionKey={currentStep.key}
        onNext={(finalState) => {
          if (index === STEPS.length - 1) {
            handleFinalSubmit(finalState);
          } else {
            goNext();
          }
        }}
        onBack={index === 0 ? null : goBack}
        isLastStep={index === STEPS.length - 1}
        onReset={() => setShowResetConfirm(true)}
      />

      {/* Reset Confirmation */}
      {renderResetDialog()}
    </div>
  );
}
