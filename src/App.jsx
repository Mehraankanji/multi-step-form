import React from "react";
import MultiStep from "./components/MultiStep";

export default function App() {
  return (
    <div className="pt-2 font-sans min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <header className="rounded-lg text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-900 ">
          Insured Claim Form
        </h1>
      </header>

      <div className="mt-3">
        <MultiStep />
      </div>
    </div>
  );
}
