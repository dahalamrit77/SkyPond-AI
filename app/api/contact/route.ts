/**
 * app/api/contact/route.ts — HubSpot form submission
 * Portal ID: 244306063
 * Form GUID: 84b62d3b-b4ed-4ce1-94e6-0169b86a335e
 *
 * HubSpot Forms API v3 — no server-side secret required for public form submissions.
 * Portal ID and Form GUID are safe to embed (same values used in public JS embeds).
 */

import { NextResponse } from 'next/server'

const PORTAL_ID = '244306063'
const FORM_GUID = '84b62d3b-b4ed-4ce1-94e6-0169b86a335e'

export async function POST(req: Request) {
  let body: {
    firstName:      string
    lastName:       string
    email:          string
    company?:       string
    phone?:         string
    areaOfInterest?: string
    message?:       string
  }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { firstName, lastName, email, company, phone, areaOfInterest, message } = body

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  const hsPayload = {
    fields: [
      { objectTypeId: '0-1', name: 'firstname',         value: firstName        || '' },
      { objectTypeId: '0-1', name: 'lastname',          value: lastName         || '' },
      { objectTypeId: '0-1', name: 'email',             value: email },
      { objectTypeId: '0-1', name: 'company',           value: company          || '' },
      { objectTypeId: '0-1', name: 'phone',             value: phone            || '' },
      { objectTypeId: '0-1', name: 'area_of_interest',  value: areaOfInterest   || '' },
      { objectTypeId: '0-1', name: 'message',           value: message          || '' },
    ],
    context: {
      pageUri:  'https://skypondtech.ai',
      pageName: 'Homepage — Start a Conversation',
    },
  }

  try {
    const hsRes = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_GUID}`,
      {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(hsPayload),
      }
    )

    if (!hsRes.ok) {
      const errText = await hsRes.text()
      console.error('[Contact] HubSpot error:', hsRes.status, errText)
      return NextResponse.json(
        { error: 'Submission failed. Please email us at info@skypondtech.com.' },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[Contact] Network error:', err)
    return NextResponse.json(
      { error: 'Network error. Please email us at info@skypondtech.com.' },
      { status: 500 }
    )
  }
}
