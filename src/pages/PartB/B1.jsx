import React from "react";
import SectionRenderer from "../../components/SectionRenderer";

export default function B1({ onNext, onBack }) {
  return <SectionRenderer part="A" sectionKey="B1" onNext={onNext} onBack={onBack} />;
}
