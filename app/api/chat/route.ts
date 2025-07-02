import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const backendUrl = 'http://localhost:8000/chat'
    const response = await axios.post(backendUrl, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return NextResponse.json(response.data)
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.response?.data?.detail || 'Internal server error' },
      { status: 500 }
    )
  }
}