import React from "react";
import SectionRenderer from "../../components/SectionRenderer";

export default function B3({ onNext, onBack }) {
  return <SectionRenderer part="A" sectionKey="B3" onNext={onNext} onBack={onBack} />;
}