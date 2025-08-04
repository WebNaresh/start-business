"use client"

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface CalculatorAnalyticsProps {
    calculatorType: string
    action?: 'view' | 'calculate' | 'download' | 'share'
    value?: number
    additionalData?: Record<string, any>
}

export default function CalculatorAnalytics({
    calculatorType,
    action = 'view',
    value,
    additionalData = {}
}: CalculatorAnalyticsProps) {
    const pathname = usePathname()

    useEffect(() => {
        // Google Analytics 4 tracking
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'calculator_interaction', {
                calculator_type: calculatorType,
                action: action,
                page_path: pathname,
                value: value,
                ...additionalData
            })
        }

        // Custom event for detailed tracking
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('calculator_event', {
                detail: {
                    calculatorType,
                    action,
                    pathname,
                    value,
                    timestamp: new Date().toISOString(),
                    ...additionalData
                }
            }))
        }
    }, [calculatorType, action, value, pathname, additionalData])

    return null
}

// Hook for calculator tracking
export function useCalculatorTracking(calculatorType: string) {
    const pathname = usePathname()

    const trackCalculation = (inputs: Record<string, any>, results: Record<string, any>) => {
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'calculator_calculation', {
                calculator_type: calculatorType,
                page_path: pathname,
                inputs: JSON.stringify(inputs),
                results: JSON.stringify(results),
                timestamp: new Date().toISOString()
            })
        }
    }

    const trackDownload = (format: 'pdf' | 'excel' | 'csv') => {
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'calculator_download', {
                calculator_type: calculatorType,
                format: format,
                page_path: pathname
            })
        }
    }

    const trackShare = (platform: 'whatsapp' | 'email' | 'copy' | 'social') => {
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'calculator_share', {
                calculator_type: calculatorType,
                platform: platform,
                page_path: pathname
            })
        }
    }

    const trackError = (error: string, context?: Record<string, any>) => {
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'calculator_error', {
                calculator_type: calculatorType,
                error_message: error,
                page_path: pathname,
                context: JSON.stringify(context || {})
            })
        }
    }

    return {
        trackCalculation,
        trackDownload,
        trackShare,
        trackError
    }
}

// Global type declaration for gtag
declare global {
    interface Window {
        gtag: (
            command: 'event',
            eventName: string,
            parameters: Record<string, any>
        ) => void
    }
}