import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Adjust the backend URL if running on a different host/port
    const backendUrl = 'http://localhost:8000/chat'
    const response = await axios.post(backendUrl, req.body, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return res.status(200).json(response.data)
  } catch (error: any) {
    return res.status(500).json({ error: error?.response?.data?.detail || 'Internal server error' })
  }
} 