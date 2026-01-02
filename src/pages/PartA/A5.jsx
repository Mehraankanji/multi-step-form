import React from "react";
import SectionRenderer from "../../components/SectionRenderer";

export default function A5({ onNext, onBack }) {
  return (
    <SectionRenderer part="A" sectionKey="A5" onNext={onNext} onBack={onBack} />
  );
}
