import { Metadata } from "next";
import { SalaryCalculator } from "../_components/salary-calculator";
export const metadata: Metadata = {
    title: "Free Salary Calculator India 2024-25 | Calculate Take Home Pay, CTC to Net",
    description:
      "Calculate take home salary, CTC to net conversion, gross salary with our free calculator. Includes HRA, PF, tax deductions for FY 2024-25. Accurate for Indian employees.",
    keywords: [
      'salary calculator india',
      'take home salary calculator',
      'ctc to net salary calculator',
      'gross salary calculator',
      'net salary calculator india',
      'salary calculator take home pay',
      'free salary calculator',
      'calculate take home salary',
      'salary breakdown calculator',
      'payroll calculator india',
      'in hand salary calculator',
      'net pay calculator india',
      'salary after tax calculator',
      'employee salary calculator',
      'monthly salary calculator',
      'annual salary calculator',
      'salary estimator india',
      'pay calculator india'
    ],
  }
export default function page(){
    return(
        <>
        <SalaryCalculator/>
        </>
    )
}