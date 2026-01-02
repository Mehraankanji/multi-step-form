import React from "react";
import SectionRenderer from "../../components/SectionRenderer";

export default function A6({ onNext, onBack }) {
  return (
    <SectionRenderer part="A" sectionKey="A6" onNext={onNext} onBack={onBack} />
  );
}
