import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { email } = body

        // Validate email
        if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
            return NextResponse.json(
                { error: 'Please enter a valid email address.' },
                { status: 400 }
            )
        }

        // Insert into Supabase
        const { error } = await supabase
            .from('subscribers')
            .insert({ email: email.trim().toLowerCase() })

        if (error) {
            // Duplicate email (unique constraint violation)
            if (error.code === '23505') {
                return NextResponse.json(
                    { error: 'already_subscribed', message: "You're already subscribed. Thank you for your support!" },
                    { status: 409 }
                )
            }

            console.error('Supabase newsletter error:', error)
            return NextResponse.json(
                { error: 'Something went wrong. Please try again later.' },
                { status: 500 }
            )
        }

        return NextResponse.json(
            { message: 'Successfully subscribed!' },
            { status: 201 }
        )
    } catch {
        return NextResponse.json(
            { error: 'Something went wrong. Please try again later.' },
            { status: 500 }
        )
    }
}
