import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { profile } from '../data'

/* ---------- helpers ---------- */
const SUBJECT = "Let's work together"
const enc = encodeURIComponent
const phoneDigits = profile.phone.replace(/[^\d+]/g, '') // +918249892879

// Clipboard API needs a secure context; fall back to execCommand elsewhere.
export function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text).catch(() => legacyCopy(text))
  legacyCopy(text)
  return Promise.resolve()
}
function legacyCopy(text) {
  const t = document.createElement('textarea')
  t.value = text
  t.setAttribute('readonly', '')
  t.style.cssText = 'position:fixed;opacity:0;pointer-events:none'
  document.body.appendChild(t)
  t.select()
  try { document.execCommand('copy') } catch { /* ignore */ }
  t.remove()
}

// Any component (terminal, buttons) can open a sheet without prop drilling.
export const openSheet = (name) => window.dispatchEvent(new CustomEvent('open-sheet', { detail: name }))

function downloadVCard() {
  const vcf = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:Kumar;Tangudu Praveen;;;`,
    `FN:${profile.name}`,
    `TITLE:${profile.role}`,
    `TEL;TYPE=CELL:${phoneDigits}`,
    `EMAIL;TYPE=INTERNET:${profile.email}`,
    `URL:${profile.linkedin}`,
    'END:VCARD',
  ].join('\r\n')
  const url = URL.createObjectURL(new Blob([vcf], { type: 'text/vcard' }))
  const a = document.createElement('a')
  a.href = url
  a.download = 'Tangudu_Praveen_Kumar.vcf'
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

/* ---------- icons ---------- */
const Icon = {
  gmail: (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#4caf50" d="M45 16.2l-5 2.75-5 4.75V40h7a3 3 0 0 0 3-3V16.2z" />
      <path fill="#1e88e5" d="M3 16.2l3.614 1.71L13 23.7V40H6a3 3 0 0 1-3-3V16.2z" />
      <polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17" />
      <path fill="#c62828" d="M3 12.298V16.2l10 7.5V11.2L9.876 8.859A4.298 4.298 0 0 0 3 12.298z" />
      <path fill="#fbc02d" d="M45 12.298V16.2l-10 7.5V11.2l3.124-2.341A4.298 4.298 0 0 1 45 12.298z" />
    </svg>
  ),
  outlook: (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <rect x="17" y="12" width="28" height="24" rx="3" fill="#28a8ea" />
      <path d="M17 15l14 10 14-10" fill="none" stroke="#0a2767" strokeWidth="2" opacity=".45" />
      <rect x="3" y="8" width="26" height="32" rx="4" fill="#0364b8" />
      <ellipse cx="16" cy="24" rx="6.2" ry="7.8" fill="none" stroke="#fff" strokeWidth="3.2" />
    </svg>
  ),
  zoho: (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <rect x="4" y="15" width="11" height="17" rx="2" fill="#e42527" transform="rotate(-8 9.5 23.5)" />
      <rect x="14" y="13" width="11" height="17" rx="2" fill="#089949" transform="rotate(6 19.5 21.5)" />
      <rect x="24" y="16" width="10" height="17" rx="2" fill="#226db4" transform="rotate(-6 29 24.5)" />
      <rect x="34" y="14" width="10" height="17" rx="2" fill="#f9b21d" transform="rotate(8 39 22.5)" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  ),
  copy: (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5 15V5a2 2 0 0 1 2-2h10" />
    </svg>
  ),
  call: (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#25d366" d="M24 4C13 4 4 12.9 4 23.9c0 3.5.9 6.9 2.7 9.9L4 44l10.5-2.7c2.9 1.6 6.2 2.4 9.5 2.4 11 0 20-8.9 20-19.9S35 4 24 4z" />
      <path fill="#fff" d="M34.6 29.6c-.5 1.3-2.6 2.5-3.6 2.6-.9.1-2.1.2-6.6-1.6-5.6-2.3-9.2-8-9.5-8.4-.3-.4-2.3-3-2.3-5.8s1.4-4.1 2-4.7c.5-.5 1.1-.7 1.5-.7h1.1c.3 0 .8-.1 1.2.9.5 1.1 1.5 3.8 1.7 4.1.1.3.2.6 0 1-.2.4-.3.6-.6.9l-.9 1c-.3.3-.6.6-.3 1.2.3.6 1.5 2.5 3.3 4 2.3 2 4.2 2.6 4.8 2.9.6.3.9.2 1.3-.1.3-.4 1.4-1.6 1.8-2.2.4-.6.8-.5 1.3-.3.5.2 3.3 1.5 3.9 1.8.6.3.9.4 1.1.6.1.2.1 1.4-.4 2.8z" />
    </svg>
  ),
  sms: (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.8A8 8 0 1 1 21 12z" />
      <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" strokeWidth="2.6" />
    </svg>
  ),
  save: (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="4" />
      <path d="M2 21a7 7 0 0 1 14 0M19 8v6M16 11h6" />
    </svg>
  ),
}

/* ---------- generic sheet ---------- */
function Sheet({ open, onClose, kicker, title, children }) {
  const panel = useRef(null)
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const prev = document.activeElement
    setTimeout(() => panel.current?.querySelector('a,button')?.focus(), 50)
    return () => {
      window.removeEventListener('keydown', onKey)
      prev?.focus?.()
    }
  }, [open, onClose])
  // Portal to <body> so the popup sits above the fixed nav (main is its own stacking context).
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="sheet-backdrop"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          data-lenis-prevent
        >
          <motion.div
            ref={panel}
            className="sheet"
            role="dialog"
            aria-modal="true"
            aria-label={title}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <button className="sheet-close" onClick={onClose} aria-label="Close">×</button>
            <span className="kicker">{kicker}</span>
            <h3 className="sheet-title">{title}</h3>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

function Option({ icon, label, sub, href, onClick, external, download }) {
  const props = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  const inner = (
    <>
      <span className="opt-icon">{icon}</span>
      <span className="opt-text">
        <strong>{label}</strong>
        <small>{sub}</small>
      </span>
      <span className="opt-arrow">{external ? '↗' : '→'}</span>
    </>
  )
  return href ? (
    <a className="opt" href={href} onClick={onClick} download={download} {...props}>{inner}</a>
  ) : (
    <button type="button" className="opt" onClick={onClick}>{inner}</button>
  )
}

/* ---------- the two sheets, mounted once ---------- */
export function ContactSheets() {
  const [which, setWhich] = useState(null)
  const [note, setNote] = useState('')
  const close = () => { setWhich(null); setNote('') }

  useEffect(() => {
    const on = (e) => { setNote(''); setWhich(e.detail) }
    window.addEventListener('open-sheet', on)
    return () => window.removeEventListener('open-sheet', on)
  }, [])

  const flash = (msg) => {
    setNote(msg)
    setTimeout(() => setNote(''), 2600)
  }
  // copy as a safety net whenever a mail service is picked
  const copyMail = () => copyText(profile.email)

  return (
    <>
      <Sheet open={which === 'mail'} onClose={close} kicker="Email" title={profile.email}>
        <p className="sheet-sub">Pick where you’d like to write from:</p>
        <div className="opts">
          <Option
            icon={Icon.gmail}
            label="Gmail"
            sub="Opens a new Gmail draft"
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}&su=${enc(SUBJECT)}`}
            onClick={copyMail}
            external
          />
          <Option
            icon={Icon.outlook}
            label="Microsoft Outlook"
            sub="Outlook web — personal & work accounts"
            href={`https://outlook.office.com/mail/deeplink/compose?to=${profile.email}&subject=${enc(SUBJECT)}`}
            onClick={copyMail}
            external
          />
          <Option
            icon={Icon.zoho}
            label="Zoho Mail"
            sub="Opens Zoho compose · address copied"
            href={`https://mail.zoho.com/mail/compose.do?mode=compose&tp=zb&ct=${enc(profile.email)}`}
            onClick={copyMail}
            external
          />
          <Option
            icon={Icon.mail}
            label="Default mail app"
            sub="Outlook desktop, Apple Mail, Thunderbird…"
            href={`mailto:${profile.email}?subject=${enc(SUBJECT)}`}
            onClick={copyMail}
          />
          <Option icon={Icon.copy} label="Copy email address" sub="Paste it anywhere" onClick={() => { copyMail(); flash('Email copied ✓') }} />
        </div>
        <SheetNote note={note} />
      </Sheet>

      <Sheet open={which === 'phone'} onClose={close} kicker="Phone" title={profile.phone}>
        <p className="sheet-sub">How would you like to reach me?</p>
        <div className="opts">
          <Option icon={Icon.call} label="Call" sub="Use your phone or calling app" href={`tel:${phoneDigits}`} />
          <Option
            icon={Icon.whatsapp}
            label="WhatsApp"
            sub="Chat on WhatsApp"
            href={`https://wa.me/${phoneDigits.replace('+', '')}?text=${enc('Hi Praveen, I saw your portfolio!')}`}
            external
          />
          <Option icon={Icon.sms} label="Text message" sub="Send an SMS" href={`sms:${phoneDigits}`} />
          <Option icon={Icon.save} label="Save contact" sub="Download vCard (.vcf)" onClick={() => { downloadVCard(); flash('Contact card downloaded ✓') }} />
          <Option icon={Icon.copy} label="Copy number" sub="Paste it anywhere" onClick={() => { copyText(phoneDigits); flash('Number copied ✓') }} />
        </div>
        <SheetNote note={note} />
      </Sheet>
    </>
  )
}

function SheetNote({ note }) {
  return (
    <AnimatePresence>
      {note && (
        <motion.p className="sheet-note" role="status" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
          {note}
        </motion.p>
      )}
    </AnimatePresence>
  )
}
