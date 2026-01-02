import React from "react";
import SectionRenderer from "../../components/SectionRenderer";

export default function A7({ onNext, onBack }) {
  return (
    <SectionRenderer part="A" sectionKey="A7" onNext={onNext} onBack={onBack} />
  );
}
