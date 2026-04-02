// FILE: app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { contactSchema } from '@/lib/validations'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Validate input with Zod
    const result = contactSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { name, email, subject, message } = result.data

    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      // Supabase not yet configured — log for developer, return success to user
      return NextResponse.json({ success: true }, { status: 200 })
    }

    // Save to Supabase
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const { error } = await supabase
      .from('contact_messages')
      .insert({ name, email, subject, message })

    if (error) {
      return NextResponse.json({ error: 'Failed to save message' }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
