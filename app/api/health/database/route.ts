import { NextResponse } from 'next/server'
import { checkDatabaseHealth } from '@/lib/db-health'

export async function GET() {
    try {
        const health = await checkDatabaseHealth()
        
        return NextResponse.json({
            ...health,
            timestamp: health.timestamp.toISOString()
        })
    } catch (error) {
        return NextResponse.json({
            isConnected: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            timestamp: new Date().toISOString()
        }, { status: 500 })
    }
}
