import { css, type Handle, type SerializableProps } from "remix/ui";

import { GitHubIcon } from "../assets/icons/github-icon.tsx";
import { RssIcon } from "../assets/icons/rss-icon.tsx";
import { XIcon } from "../assets/icons/x-icon.tsx";

const T = {
  fg: "var(--fg)",
  text: "var(--text)",
  muted: "var(--muted)",
  accent: "var(--accent)",
  accentBorder: "var(--accent-border)",
};

type HomeLink = SerializableProps & {
  label: string;
  url: string;
  href: string;
};

export type HeroProfile = SerializableProps & {
  user: string;
  handle: string;
  role: string;
  bio: string;
  links: HomeLink[];
};

type HeroCardProps = SerializableProps & {
  profile: HeroProfile;
};

export function HeroCard(handle: Handle<HeroCardProps>) {
  return () => (
    <section mix={sectionStyle}>
      <div mix={blobWrapStyle}>
        <div mix={blobPrimaryStyle} />
        <div mix={blobSecondaryStyle} />
      </div>

      <div mix={cardShellStyle}>
        <div mix={ringGlowStyle} />
        <div mix={innerCardStyle}>
          <div mix={contentRowStyle}>
            <img src="/images/morit958.png" alt={handle.props.profile.user} mix={avatarStyle} />
            <div mix={contentBodyStyle}>
              <h1 mix={userNameStyle}>
                {handle.props.profile.user}
                <span mix={handleStyle}>{handle.props.profile.handle}</span>
              </h1>
              <div mix={roleStyle}>{handle.props.profile.role}</div>
              <p mix={bioStyle}>{handle.props.profile.bio}</p>
              <div mix={linkListStyle}>
                {handle.props.profile.links.map((link) => (
                  <a
                    remix-document
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    mix={pillLinkStyle}
                  >
                    <LinkIcon label={link.label} />
                    <span>{link.url}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type LinkIconProps = SerializableProps & { label: string };

function LinkIcon(handle: Handle<LinkIconProps>) {
  return () => {
    const { label } = handle.props;
    if (label === "GitHub") return <GitHubIcon />;
    if (label === "X") return <XIcon />;
    if (label === "RSS") return <RssIcon />;
    return null;
  };
}

const sectionStyle = css({ position: "relative" });

const blobWrapStyle = css({
  position: "absolute",
  inset: "-10px",
  borderRadius: "20px",
  overflow: "hidden",
  zIndex: 0,
  pointerEvents: "none",
});

const blobPrimaryStyle = css({
  position: "absolute",
  width: "220px",
  height: "220px",
  borderRadius: "50%",
  background: T.accent,
  opacity: 0.22,
  top: "-50px",
  left: "30px",
  filter: "blur(48px)",
  animation: "blob-drift-1 11s ease-in-out infinite",
});

const blobSecondaryStyle = css({
  position: "absolute",
  width: "180px",
  height: "180px",
  borderRadius: "50%",
  background: "var(--hero-blob-secondary)",
  opacity: "var(--hero-blob-secondary-opacity)",
  bottom: "-20px",
  right: "50px",
  filter: "blur(40px)",
  animation: "blob-drift-2 14s ease-in-out infinite",
});

const cardShellStyle = css({
  position: "relative",
  zIndex: 1,
  borderRadius: "18px",
  padding: "2px",
  overflow: "hidden",
  background: "var(--hero-shell-bg)",
});

const ringGlowStyle = css({
  position: "absolute",
  width: "200%",
  height: "200%",
  top: "-50%",
  left: "-50%",
  background: "var(--hero-ring-gradient)",
  animation: "border-spin 4s linear infinite",
});

const innerCardStyle = css({
  position: "relative",
  borderRadius: "16px",
  padding: "24px 28px",
  background: "var(--hero-inner-bg)",
  backdropFilter: "blur(22px) saturate(1.6)",
  WebkitBackdropFilter: "blur(22px) saturate(1.6)",
  overflow: "hidden",
});

const contentRowStyle = css({
  position: "relative",
  zIndex: 1,
  display: "flex",
  gap: "22px",
  alignItems: "flex-start",
  "@media (max-width: 640px)": {
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
  },
});

const avatarStyle = css({
  width: "88px",
  height: "88px",
  borderRadius: "88px",
  boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.15)",
  flex: "0 0 auto",
  objectFit: "cover",
});

const contentBodyStyle = css({
  flex: 1,
  minWidth: 0,
  "@media (max-width: 640px)": {
    textAlign: "center",
    width: "100%",
  },
});

const userNameStyle = css({
  fontSize: "28px",
  fontWeight: 700,
  color: T.fg,
  margin: "0 0 4px",
  letterSpacing: "-0.5px",
});

const handleStyle = css({
  color: T.muted,
  fontWeight: 400,
  fontSize: "14px",
  marginLeft: "8px",
});

const roleStyle = css({
  color: T.muted,
  fontSize: "13px",
  marginBottom: "12px",
});

const bioStyle = css({
  color: T.text,
  fontSize: "15px",
  lineHeight: 1.75,
  margin: 0,
});

const linkListStyle = css({
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
  marginTop: "14px",
  "@media (max-width: 640px)": {
    justifyContent: "center",
  },
});

const pillLinkStyle = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  padding: "6px 12px",
  borderRadius: "999px",
  border: "1px solid var(--hero-pill-border)",
  background: "var(--hero-pill-bg)",
  color: T.text,
  fontSize: "12px",
  textDecoration: "none",
  transition: "border-color .15s, color .15s",
  "&:hover": {
    borderColor: T.accentBorder,
    color: T.fg,
  },
});
