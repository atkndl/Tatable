
export interface MonthlyTaxResult {
    month: number;
    monthName: string;
    grossSalary: number;
    sgkWorker: number; // %14
    unemploymentWorker: number; // %1
    incomeTaxBase: number; // GVM (Gross - SGK - Unemployment)
    cumulativeIncomeTaxBase: number; // Kumulatif GVM
    calculatedIncomeTax: number; // Hesaplanan Gelir Vergisi
    stampTax: number; // Damga Vergisi

    minWageExemptionTotal: number; // Toplam İstisna (GV + DV)
    payableIncomeTax: number; // Ödenecek Gelir Vergisi (Net Kesinti)
    payableStampTax: number; // Ödenecek Damga Vergisi (Net Kesinti)

    netSalary: number;
}

// 2025/2026 Estimates (Easily updating these constants updates the whole logic)
export const TAX_CONSTANTS = {
    A_MIN_WAGE_GROSS: 25503, // Estimated 2026/Late 2025 (Currently ~20002 in 2024, ~25-26k estimate)
    A_MIN_WAGE_NET: 21500, // Estimate
    SGK_WORKER_RATE: 0.14,
    UNEMPLOYMENT_WORKER_RATE: 0.01,
    STAMP_TAX_RATE: 0.00759,
    INCOME_TAX_BRACKETS: [
        { limit: 158000, rate: 0.15 }, // 2025 Estimate (Adjusted from 110k)
        { limit: 380000, rate: 0.20 }, // Estimate
        { limit: 1100000, rate: 0.27 }, // Estimate
        { limit: 4300000, rate: 0.35 }, // Estimate
        { limit: Infinity, rate: 0.40 }
    ]
};

// Calculate tax for a specific cumulative base amount
export function calculateIncomeTax(cumulativeBase: number, currentMonthBase: number): number {
    const brackets = TAX_CONSTANTS.INCOME_TAX_BRACKETS;
    let remainingBase = currentMonthBase;
    let tax = 0;
    // Calculate total tax for (cumulative) and subtract total tax for (cumulative - current)
    return calculateTotalTaxForAmount(cumulativeBase) - calculateTotalTaxForAmount(cumulativeBase - currentMonthBase);
}

function calculateTotalTaxForAmount(amount: number): number {
    let tax = 0;
    let remaining = amount;
    let previousLimit = 0;

    for (const bracket of TAX_CONSTANTS.INCOME_TAX_BRACKETS) {
        if (remaining <= 0) break;

        const range = bracket.limit - previousLimit;
        const taxableAmount = Math.min(remaining, range); // Amount falling into this bracket

        tax += taxableAmount * bracket.rate;

        remaining -= taxableAmount;
        previousLimit = bracket.limit;
    }
    return tax;
}


export function calculateYearlySalary(monthlyGross: number): MonthlyTaxResult[] {
    const results: MonthlyTaxResult[] = [];
    let cumulativeGVM = 0;

    // Calculate Min Wage Exemption amounts (Fixed for every month usually, unless min wage changes mid-year)
    // Min Wage Tax Logic:
    // Min Wage GVM = Gross - SGK - Unemployment
    const mwGross = TAX_CONSTANTS.A_MIN_WAGE_GROSS;
    const mwSGK = mwGross * TAX_CONSTANTS.SGK_WORKER_RATE;
    const mwUnemployment = mwGross * TAX_CONSTANTS.UNEMPLOYMENT_WORKER_RATE;
    const mwGVM = mwGross - mwSGK - mwUnemployment;
    const mwStamp = mwGross * TAX_CONSTANTS.STAMP_TAX_RATE;

    // We need to track Min Wage Cumulative GVM to calculate its tax exemption correctly (progressive)
    let mwCumulativeGVM = 0;

    const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

    for (let i = 0; i < 12; i++) {
        // 1. Deductions
        const sgk = monthlyGross * TAX_CONSTANTS.SGK_WORKER_RATE;
        const unemployment = monthlyGross * TAX_CONSTANTS.UNEMPLOYMENT_WORKER_RATE;

        // 2. Tax Base
        const gvm = monthlyGross - sgk - unemployment;
        cumulativeGVM += gvm;

        // 3. Income Tax
        const incomeTax = calculateIncomeTax(cumulativeGVM, gvm);

        // 4. Stamp Tax
        const stampTax = monthlyGross * TAX_CONSTANTS.STAMP_TAX_RATE;

        // 5. Min Wage Exemption Calculation
        mwCumulativeGVM += mwGVM;
        const mwIncomeTax = calculateIncomeTax(mwCumulativeGVM, mwGVM); // Tax that would be paid on min wage

        let exemptedIncomeTax = mwIncomeTax;
        let exemptedStampTax = mwStamp;

        // Actual Payable Tax (Net Deduction)
        let payableIncomeTax = incomeTax - exemptedIncomeTax;
        if (payableIncomeTax < 0) payableIncomeTax = 0;

        let payableStampTax = stampTax - exemptedStampTax;
        if (payableStampTax < 0) payableStampTax = 0;


        // 6. Net Salary
        const net = (monthlyGross - sgk - unemployment) - payableIncomeTax - payableStampTax;

        results.push({
            month: i + 1,
            monthName: monthNames[i],
            grossSalary: monthlyGross,
            sgkWorker: sgk,
            unemploymentWorker: unemployment,
            incomeTaxBase: gvm,
            cumulativeIncomeTaxBase: cumulativeGVM,
            calculatedIncomeTax: incomeTax,
            stampTax: stampTax,
            minWageExemptionTotal: exemptedIncomeTax + exemptedStampTax,
            payableIncomeTax: payableIncomeTax,
            payableStampTax: payableStampTax,
            netSalary: net
        });
    }

    return results;
}
