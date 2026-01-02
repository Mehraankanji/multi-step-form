import React from "react";
import SectionRenderer from "../../components/SectionRenderer";

export default function A3({ onNext, onBack }) {
  return <SectionRenderer part="A" sectionKey="A3" onNext={onNext} onBack={onBack} />;
}
