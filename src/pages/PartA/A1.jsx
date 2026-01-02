import React from "react";
import SectionRenderer from "../../components/SectionRenderer";

export default function A1({ onNext, onBack }) {
  return (
    <>
      <SectionRenderer
        part="A"
        sectionKey="A1"
        onNext={onNext}
        onBack={onBack}
      />
    </>
  );
}
