/* ================= AGE ================= */
export function calculateAge(dob) {
  if (!dob) return "";
  const birthDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
}

/* ================= EXPENSE TOTAL ================= */
export function calculateTotalExpense(expenses = {}) {
  return Object.entries(expenses)
    .filter(([key]) => !key.toLowerCase().includes("total"))
    .reduce((sum, [, value]) => sum + (Number(value) || 0), 0);
}

/* ================= REMAINING HOSPITAL BILL ================= */
export function calculateRemainingHospitalBill({
  hospitalBill = 0,
  pharmacyBill = 0,
  treatmentTotal = 0,
  cashTotal = 0,
}) {
  return (
    Number(hospitalBill) -
    (Number(pharmacyBill) + Number(treatmentTotal) + Number(cashTotal))
  );
}

/* ================= A6 AUTOFILL ================= */
export function getA6AutoFillValues(a5 = {}) {
  const treatmentTotal = calculateTotalExpense(
    a5.detailsOfTheTreatmentExpensesClaimed || {}
  );

  const cashTotal = calculateTotalExpense(
    a5.detailsOfLumpSum_CashBenefitClaimed || {}
  );

  return {
    totalTreatmentExpensesClaimed: treatmentTotal,
    totalCashBenefitClaimed: cashTotal,
  };
}

/* ================= B2 AUTOFILL ================= */
export function getB2TotalClaimed(a5 = {}) {
  const treatmentTotal = calculateTotalExpense(
    a5.detailsOfTheTreatmentExpensesClaimed || {}
  );

  const cashTotal = calculateTotalExpense(
    a5.detailsOfLumpSum_CashBenefitClaimed || {}
  );

  return treatmentTotal + cashTotal;
}

/* ================= AUTOFILL ================= */
export function gatherFilledValues(state) {
  const collected = {};

  ["A", "B"].forEach((part) => {
    Object.values(state[part] || {}).forEach((section) => {
      Object.entries(section || {}).forEach(([key, value]) => {
        if (value && collected[key] === undefined) {
          collected[key] = value;
        }
      });
    });
  });

  return collected;
}
