import { Metadata } from "next";
import { SalaryCalculator } from "../_components/salary-calculator";
export const metadata: Metadata = {
    title: "Salary Calculator - Calculate Gross, Net, and Take-Home Salary | Free Tool",
    description:
      "Calculate your salary with our comprehensive salary calculator. Support for all deductions, and latest tax slabs for FY 2024-25.",
  }     
export default function page(){
    return(
        <>
        <SalaryCalculator/>
        </>
    )
}