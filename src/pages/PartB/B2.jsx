import React from "react";
import SectionRenderer from "../../components/SectionRenderer";

export default function B2({ onNext, onBack }) {
  return <SectionRenderer part="A" sectionKey="B2" onNext={onNext} onBack={onBack} />;
}