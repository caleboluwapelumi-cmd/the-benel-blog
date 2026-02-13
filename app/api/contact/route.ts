import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface ContactBody {
    name: string
    email: string
    subject: string
    message: string
}

export async function POST(request: Request) {
    try {
        const body: ContactBody = await request.json()
        const { name, email, subject, message } = body

        // Validate all fields present
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'All fields are required.' },
                { status: 400 }
            )
        }

        // Validate name
        if (typeof name !== 'string' || name.trim().length < 2) {
            return NextResponse.json(
                { error: 'Name must be at least 2 characters.' },
                { status: 400 }
            )
        }

        // Validate email
        if (typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
            return NextResponse.json(
                { error: 'Please enter a valid email address.' },
                { status: 400 }
            )
        }

        // Validate subject
        if (typeof subject !== 'string' || subject.trim().length === 0) {
            return NextResponse.json(
                { error: 'Please select a subject.' },
                { status: 400 }
            )
        }

        // Validate message length
        if (typeof message !== 'string' || message.trim().length < 10) {
            return NextResponse.json(
                { error: 'Message must be at least 10 characters.' },
                { status: 400 }
            )
        }

        // Insert into Supabase
        const { error } = await supabase
            .from('contact_messages')
            .insert({
                name: name.trim(),
                email: email.trim().toLowerCase(),
                subject: subject.trim(),
                message: message.trim(),
            })

        if (error) {
            console.error('Supabase contact error:', error)
            return NextResponse.json(
                { error: 'Something went wrong. Please try again later.' },
                { status: 500 }
            )
        }

        return NextResponse.json(
            { message: 'Message sent successfully!' },
            { status: 201 }
        )
    } catch {
        return NextResponse.json(
            { error: 'Something went wrong. Please try again later.' },
            { status: 500 }
        )
    }
}
