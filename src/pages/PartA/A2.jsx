import React from "react";
import SectionRenderer from "../../components/SectionRenderer";

export default function A2({ onNext, onBack }) {
  return (
    <SectionRenderer part="A" sectionKey="A2" onNext={onNext} onBack={onBack} />
  );
}
