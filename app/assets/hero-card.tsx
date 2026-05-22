import { clientEntry, css, on, type Handle, type SerializableProps } from 'remix/ui'

const T = {
  fg: '#08060d',
  text: '#3d3946',
  muted: '#6b6375',
  accent: '#aa3bff',
  accentBorder: 'rgba(170,59,255,0.35)',
}

type HomeLink = SerializableProps & {
  label: string
  url: string
  href: string
}

export type HeroProfile = SerializableProps & {
  user: string
  handle: string
  role: string
  bio: string
  links: HomeLink[]
}

type HeroCardProps = SerializableProps & {
  profile: HeroProfile
}

export const HeroCard = clientEntry(
  import.meta.url,
  function HeroCard(handle: Handle<HeroCardProps>) {
    let glow: { x: string; y: string } | null = null

    return () => (
      <section mix={sectionStyle}>
        <div mix={blobWrapStyle}>
          <div mix={blobPrimaryStyle} />
          <div mix={blobSecondaryStyle} />
        </div>

        <div
          mix={[
            cardShellStyle,
            on('mousemove', (event) => {
              const rect = event.currentTarget.getBoundingClientRect()
              const x = (((event.clientX - rect.left) / rect.width) * 100).toFixed(1)
              const y = (((event.clientY - rect.top) / rect.height) * 100).toFixed(1)
              if (glow?.x === x && glow?.y === y) return
              glow = { x, y }
              handle.update()
            }),
            on('mouseleave', () => {
              if (!glow) return
              glow = null
              handle.update()
            }),
          ]}
        >
          <div mix={ringGlowStyle} />
          <div mix={innerCardStyle}>
            {glow ? <div mix={mouseGlowStyle} style={{ background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(170,59,255,0.22) 0%, transparent 55%)` }} /> : null}
            <div mix={contentRowStyle}>
              <div aria-hidden="true" mix={avatarStyle}>
                {handle.props.profile.user.slice(0, 1).toUpperCase()}
              </div>
              <div mix={contentBodyStyle}>
                <h1 mix={userNameStyle}>
                  {handle.props.profile.user}
                  <span mix={handleStyle}>{handle.props.profile.handle}</span>
                </h1>
                <div mix={roleStyle}>{handle.props.profile.role}</div>
                <p mix={bioStyle}>{handle.props.profile.bio}</p>
                <div mix={linkListStyle}>
                  {handle.props.profile.links.map((link) => (
                    <a remix-document key={link.href} href={link.href} mix={pillLinkStyle}>
                      <span mix={dotStyle}>•</span>
                      <span mix={labelStyle}>{link.label}</span>
                      <span>{link.url}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  },
)

const sectionStyle = css({ position: 'relative' })

const blobWrapStyle = css({
  position: 'absolute',
  inset: '-10px',
  borderRadius: '20px',
  overflow: 'hidden',
  zIndex: 0,
  pointerEvents: 'none',
})

const blobPrimaryStyle = css({
  position: 'absolute',
  width: '220px',
  height: '220px',
  borderRadius: '50%',
  background: T.accent,
  opacity: 0.22,
  top: '-50px',
  left: '30px',
  filter: 'blur(48px)',
  animation: 'blob-drift-1 11s ease-in-out infinite',
})

const blobSecondaryStyle = css({
  position: 'absolute',
  width: '180px',
  height: '180px',
  borderRadius: '50%',
  background: '#ff7eb3',
  opacity: 0.18,
  bottom: '-20px',
  right: '50px',
  filter: 'blur(40px)',
  animation: 'blob-drift-2 14s ease-in-out infinite',
})

const cardShellStyle = css({
  position: 'relative',
  zIndex: 1,
  borderRadius: '18px',
  padding: '2px',
  overflow: 'hidden',
  background: 'rgba(240,238,255,0.52)',
})

const ringGlowStyle = css({
  position: 'absolute',
  width: '200%',
  height: '200%',
  top: '-50%',
  left: '-50%',
  background:
    'conic-gradient(from 0deg, transparent 30%, rgba(170,59,255,0.6) 48%, #ffffff 50%, rgba(170,59,255,0.6) 52%, transparent 70%)',
  animation: 'border-spin 4s linear infinite',
})

const innerCardStyle = css({
  position: 'relative',
  borderRadius: '16px',
  padding: '24px 28px',
  background: 'rgba(248,246,255,0.68)',
  backdropFilter: 'blur(22px) saturate(1.6)',
  WebkitBackdropFilter: 'blur(22px) saturate(1.6)',
  overflow: 'hidden',
})

const mouseGlowStyle = css({
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
  zIndex: 0,
})

const contentRowStyle = css({
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  gap: '22px',
  alignItems: 'flex-start',
})

const avatarStyle = css({
  width: '72px',
  height: '72px',
  borderRadius: '72px',
  background: `linear-gradient(135deg, ${T.accent}, #ff8a3b)`,
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 600,
  fontSize: '33px',
  boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.15)',
  flex: '0 0 auto',
  letterSpacing: '-1px',
})

const contentBodyStyle = css({ flex: 1, minWidth: 0 })

const userNameStyle = css({
  fontSize: '28px',
  fontWeight: 700,
  color: T.fg,
  margin: '0 0 4px',
  letterSpacing: '-0.5px',
})

const handleStyle = css({
  color: T.muted,
  fontWeight: 400,
  fontSize: '14px',
  marginLeft: '8px',
})

const roleStyle = css({
  color: T.muted,
  fontSize: '13px',
  marginBottom: '12px',
})

const bioStyle = css({
  color: T.text,
  fontSize: '15px',
  lineHeight: 1.75,
  margin: 0,
})

const linkListStyle = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginTop: '14px',
})

const pillLinkStyle = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  padding: '6px 12px',
  borderRadius: '999px',
  border: '1px solid rgba(0,0,0,0.07)',
  background: 'rgba(255,255,255,0.55)',
  color: T.text,
  fontSize: '12px',
  textDecoration: 'none',
  transition: 'border-color .15s, color .15s',
  '&:hover': {
    borderColor: T.accentBorder,
    color: T.fg,
  },
})

const dotStyle = css({ color: T.accent })

const labelStyle = css({ color: T.muted })
