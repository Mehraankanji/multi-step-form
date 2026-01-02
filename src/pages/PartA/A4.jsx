import React from "react";
import SectionRenderer from "../../components/SectionRenderer";

export default function A4({ onNext, onBack }) {
  return <SectionRenderer part="A" sectionKey="A4" onNext={onNext} onBack={onBack} />;
}
