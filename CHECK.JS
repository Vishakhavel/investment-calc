function compoundInterestWithDetails(P, r, PMT, n, years) {
  let values = [];
  let currentPrincipal = P;

  for (let k = 1; k <= years; k++) {
    // Calculate the amount without contributions for the current year
    let amountWithoutContributions = currentPrincipal * Math.pow(1 + r / n, n);

    // Calculate the total amount with contributions for the current year
    let totalAmount =
      currentPrincipal * Math.pow(1 + r / n, n) +
      (PMT * (Math.pow(1 + r / n, n) - 1)) / (r / n);

    // Calculate interest earned in the current year
    let interestEarned = totalAmount - currentPrincipal - PMT * n;

    // Update currentPrincipal to include contributions for this year
    currentPrincipal = totalAmount;

    values.push({
      year: k,
      interest: interestEarned.toFixed(2),
      principal: currentPrincipal.toFixed(2),
    });
  }
  return values;
}

const P = 1000; // Principal amount
const r = 0.05; // Annual interest rate (5%)
const PMT = 100; // Regular contribution amount per period
const years = 10; // Number of years

const annualValues = compoundInterestWithDetails(P, r, PMT, 1, years);
const monthlyValues = compoundInterestWithDetails(P, r, PMT, 12, years);
const weeklyValues = compoundInterestWithDetails(P, r, PMT, 52, years);
const dailyValues = compoundInterestWithDetails(P, r, PMT, 365, years);

console.log('Yearly values for annual contributions:', annualValues);
console.log('Yearly values for monthly contributions:', monthlyValues);
console.log('Yearly values for weekly contributions:', weeklyValues);
console.log('Yearly values for daily contributions:', dailyValues);
