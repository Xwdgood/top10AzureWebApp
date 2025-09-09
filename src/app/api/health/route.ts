export async function GET() {
  return Response.json(
    {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'top10-holiday-parks',
      version: '1.0.0'
    },
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}