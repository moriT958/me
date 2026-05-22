// variation-card.jsx — A: friendly card-based blog
// Hero whoami + activity + recent posts on Home.

const { useState: useStateA, useEffect: useEffectA } = React;

function HeaderA({ t, themeName, setThemeName, screen, go, onSearch }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 18,
      padding: "14px 36px",
      borderBottom: `1px solid ${t.border}`,
      flex: "0 0 auto",
      background: t.bg
    }}>
      <a href="#" onClick={(e) => {e.preventDefault();go("home");}} style={{
        textDecoration: "none",
        color: t.fg,
        fontSize: 15,
        fontWeight: 600,
        letterSpacing: -0.3,
        display: "inline-flex", alignItems: "baseline", gap: 6
      }}>
        <span style={{ color: t.accent }}>$</span>
        <span>kohei.dev</span>
      </a>
      <div style={{ display: "flex", gap: 14, marginLeft: 18 }}>
        <NavLink label="Home" active={screen === "home"} onClick={() => go("home")} t={t} />
        <NavLink label="Posts" active={screen === "posts" || screen === "post"} onClick={() => go("posts")} t={t} />
        <NavLink label="Archives" active={screen === "archives"} onClick={() => go("archives")} t={t} />
      </div>
      <div style={{ flex: 1 }} />
      <button onClick={onSearch} title="Search (⌘K)" style={{
        background: "transparent", border: `1px solid ${t.border}`,
        color: t.muted, borderRadius: 8,
        padding: "5px 10px", fontFamily: "inherit", fontSize: 12,
        cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8,
        transition: "color .12s, border-color .12s",
        marginRight: 8,
      }}
        onMouseEnter={e => { e.currentTarget.style.color = t.fg; e.currentTarget.style.borderColor = t.borderStrong; }}
        onMouseLeave={e => { e.currentTarget.style.color = t.muted; e.currentTarget.style.borderColor = t.border; }}
      >
        <span style={{ fontSize: 14 }}></span>
        <span style={{ color: t.dim, fontSize: 11 }}>⌘K</span>
      </button>
      <ThemeToggle value={themeName} onChange={setThemeName} t={t} />
    </div>);

}

function HomeA({ t, go }) {
  const [showAll, setShowAll] = React.useState(false);
  const [glow, setGlow] = React.useState(null);
  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
    const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
    setGlow({ x, y });
  };
  return (
    <div style={{ padding: "36px 36px 48px", maxWidth: 820, margin: "0 auto" }}>
      {/* Liquid glass hero */}
      <div style={{ position: "relative" }}>
        {/* Animated blobs */}
        <div style={{
          position: "absolute", inset: -10, borderRadius: 20,
          overflow: "hidden", zIndex: 0, pointerEvents: "none",
        }}>
          <div style={{
            position: "absolute", width: 220, height: 220, borderRadius: "50%",
            background: t.accent, opacity: t.isDark ? 0.28 : 0.22,
            top: -50, left: 30,
            filter: "blur(48px)",
            animation: "blob-drift-1 11s ease-in-out infinite",
          }} />
          <div style={{
            position: "absolute", width: 180, height: 180, borderRadius: "50%",
            background: t.isDark ? "#5b8aff" : "#ff7eb3",
            opacity: t.isDark ? 0.22 : 0.18,
            bottom: -20, right: 50,
            filter: "blur(40px)",
            animation: "blob-drift-2 14s ease-in-out infinite",
          }} />
        </div>

        {/* Spinning border glow wrapper */}
        <div
          onMouseMove={handleMove}
          onMouseLeave={() => setGlow(null)}
          style={{
            position: "relative", zIndex: 1,
            borderRadius: 18,
            padding: 2,
            overflow: "hidden",
            background: t.isDark ? "rgba(12,12,22,0.52)" : "rgba(240,238,255,0.52)",
          }}>
          {/* Rotating conic gradient that creates the glow ring */}
          <div style={{
            position: "absolute",
            width: "200%", height: "200%",
            top: "-50%", left: "-50%",
            background: t.isDark
              ? `conic-gradient(from 0deg, transparent 30%, ${t.accent}cc 48%, #ffffff55 50%, ${t.accent}cc 52%, transparent 70%)`
              : `conic-gradient(from 0deg, transparent 30%, ${t.accent}99 48%, #ffffff 50%, ${t.accent}99 52%, transparent 70%)`,
            animation: "border-spin 4s linear infinite",
          }} />
          {/* Inner glass card */}
          <div style={{
            position: "relative",
            borderRadius: 16,
            padding: "24px 28px",
            background: t.isDark ? "rgba(12,12,22,0.68)" : "rgba(248,246,255,0.68)",
            backdropFilter: "blur(22px) saturate(1.6)",
            WebkitBackdropFilter: "blur(22px) saturate(1.6)",
            overflow: "hidden",
          }}>
            {/* Mouse-tracking glow */}
            {glow && (
              <div style={{
                position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
                background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, ${t.accent}38 0%, transparent 55%)`,
              }} />
            )}
            <div style={{ position: "relative", zIndex: 1, display: "flex", gap: 22, alignItems: "flex-start" }}>
              <Avatar size={72} t={t} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <h1 style={{ fontSize: 28, fontWeight: 700, color: t.fg, margin: "0 0 4px", letterSpacing: -0.5 }}>
                  {WHOAMI.user}
                  <span style={{ color: t.muted, fontWeight: 400, fontSize: 14, marginLeft: 8 }}>{WHOAMI.handle}</span>
                </h1>
                <div style={{ color: t.muted, fontSize: 13, marginBottom: 12 }}>{WHOAMI.role}</div>
                <p style={{ color: t.text, fontSize: 15, lineHeight: 1.75, margin: 0 }}>{WHOAMI.bio}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
                  {WHOAMI.links.map((l) => (
                    <a key={l.label} href={l.href} onClick={(e) => e.preventDefault()} style={{
                      display: "inline-flex", alignItems: "center", gap: 6,
                      padding: "6px 12px", borderRadius: 999,
                      border: t.isDark ? "1px solid rgba(255,255,255,0.10)" : "1px solid rgba(0,0,0,0.07)",
                      background: t.isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.55)",
                      color: t.text, fontSize: 12, textDecoration: "none",
                      transition: "border-color .15s, color .15s",
                    }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = t.accentBorder; e.currentTarget.style.color = t.fg; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = t.isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.07)"; e.currentTarget.style.color = t.text; }}
                    >
                      <span style={{ color: t.accent }}>{l.icon}</span>
                      <span style={{ color: t.muted }}>{l.label}</span>
                      <span>{l.url}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent activities (posts) */}
      <section style={{ marginTop: 36 }}>
        <SectionTitle t={t} icon="$" label="Recent activities" />
        <ActivityList t={t} go={go} showAll={showAll} />
        <div style={{ marginTop: 12, textAlign: "center" }}>
          <button onClick={() => setShowAll(s => !s)} style={{
            background: "transparent",
            border: `1px solid ${t.border}`,
            color: t.muted,
            fontFamily: "inherit",
            fontSize: 12,
            padding: "4px 18px",
            borderRadius: 999,
            cursor: "pointer",
            transition: "color .12s, border-color .12s",
          }}
            onMouseEnter={e => { e.currentTarget.style.color = t.fg; e.currentTarget.style.borderColor = t.borderStrong; }}
            onMouseLeave={e => { e.currentTarget.style.color = t.muted; e.currentTarget.style.borderColor = t.border; }}
          >{showAll ? "less" : "more"}</button>
        </div>
      </section>
    </div>);

}

function ActivityList({ t, go, showAll }) {
  const items = showAll ? ACTIVITIES : ACTIVITIES.slice(0, 4);
  return (
    <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 2 }}>
      {items.map((a, i) => {
        const isExternal = !a.slug;
        return (
          <a
            key={i}
            href="#"
            onClick={(e) => { e.preventDefault(); if (a.slug) go("post", a.slug); }}
            style={{
              display: "grid",
              gridTemplateColumns: "94px 1fr",
              gap: 14,
              padding: "10px 4px",
              borderBottom: `1px solid ${t.border}`,
              textDecoration: "none",
              color: t.fg,
              borderRadius: 4,
              cursor: isExternal ? "default" : "pointer",
              transition: "background .12s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = t.hoverBg; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
          >
            <span style={{ color: t.muted, fontSize: 12, paddingTop: 2 }}>{a.date}</span>
            <span style={{ color: t.fg, fontSize: 14 }}>
              {a.title}
              {isExternal && <span style={{ color: t.muted, marginLeft: 5, fontSize: 12 }}>↗</span>}
            </span>
          </a>
        );
      })}
    </div>
  );
}

function SectionTitle({ t, icon, label, hint }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
      <h2 style={{
        margin: 0, color: t.fg, fontSize: 15, fontWeight: 600,
        display: "inline-flex", alignItems: "baseline", gap: 8
      }}>
        {icon && <span style={{ color: t.accent, fontSize: 14 }}>{icon}</span>}
        <span>{label}</span>
      </h2>
      {hint && <span style={{ color: t.muted, fontSize: 11 }}>{hint}</span>}
    </div>);

}

// Flat tag: #name with dashed underline — clickable if onClick provided
function TagFlat({ name, t, onClick }) {
  const style = {
    color: t.accent,
    fontSize: 12,
    borderBottom: `1px dashed ${t.accent}`,
    paddingBottom: 1,
    cursor: onClick ? "pointer" : "default",
    textDecoration: "none",
  };
  if (onClick) {
    return <a href="#" onClick={e => { e.preventDefault(); e.stopPropagation(); onClick(name); }} style={style}>#{name}</a>;
  }
  return <span style={style}>#{name}</span>;
}

function PostsListA({ t, go }) {
  const CMD = "ls posts/";
  const typed = useTyping(CMD, { speed: 42, start: 0 });
  const done = typed.length === CMD.length;
  const [page, setPage] = React.useState(0);
  const PER_PAGE = 4;
  const totalPages = Math.ceil(POSTS.length / PER_PAGE);
  const pagePosts = POSTS.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  return (
    <div style={{ padding: "32px 36px 48px", maxWidth: 820, margin: "0 auto" }}>
      {/* $ ls posts/ as the page title */}
      <div style={{ borderBottom: `1px solid ${t.border}`, paddingBottom: 14, marginBottom: 4 }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: t.fg, letterSpacing: -0.3 }}>
          <span style={{ color: t.accent }}>$</span>{" "}
          <span>{typed}</span>
          {!done && <span className="caret thin" style={{ background: t.fg }} />}
        </div>
        <div style={{
          color: t.muted, fontSize: 12, marginTop: 4,
          opacity: done ? 1 : 0, transition: "opacity .3s ease",
        }}>
          {POSTS.length} entries · 最新から
        </div>
      </div>

      {/* list fades in once typing is done */}
      <div style={{ opacity: done ? 1 : 0, transition: "opacity .35s ease" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {pagePosts.map((p) => (
            <a key={p.slug} href="#" onClick={(e) => { e.preventDefault(); go("post", p.slug); }} style={{
              display: "block",
              padding: "18px 8px",
              borderBottom: `1px solid ${t.border}`,
              textDecoration: "none",
              color: t.fg,
              borderRadius: 6,
              transition: "background .12s",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = t.hoverBg; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, color: t.muted, fontSize: 12 }}>
                <span>{p.date}</span>
                <span>·</span>
                <span>{p.read}</span>
              </div>
              <h3 style={{ margin: "6px 0 6px", color: t.fg, fontSize: 17, fontWeight: 600, letterSpacing: -0.2 }}>
                {p.title}{p.external && <span style={{ color: t.muted, marginLeft: 5, fontSize: 13 }}>↗</span>}
              </h3>
              <p style={{ margin: 0, color: t.text, fontSize: 13, lineHeight: 1.7 }}>{p.excerpt}</p>
              <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
                {p.tags.map((tg) => <TagFlat key={tg} name={tg} t={t} onClick={(name) => go("tags", name)} />)}
              </div>
            </a>
          ))}
        </div>

        {/* Pager */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 6, marginTop: 28, paddingTop: 16,
        }}>
          <PagerBtn
            label="←"
            disabled={page === 0}
            onClick={() => setPage(p => p - 1)}
            t={t}
          />
          {Array.from({ length: totalPages }, (_, i) => (
            <PagerBtn
              key={i}
              label={String(i + 1)}
              active={i === page}
              onClick={() => setPage(i)}
              t={t}
            />
          ))}
          <PagerBtn
            label="→"
            disabled={page === totalPages - 1}
            onClick={() => setPage(p => p + 1)}
            t={t}
          />
        </div>
      </div>
    </div>
  );
}

function PagerBtn({ label, active, disabled, onClick, t }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: active ? t.accentSoft : "transparent",
        color: disabled ? t.dim : active ? t.accent : t.muted,
        border: active ? `1px solid ${t.accentBorder}` : `1px solid transparent`,
        borderRadius: 6,
        padding: "4px 10px",
        fontFamily: "inherit",
        fontSize: 13,
        cursor: disabled ? "default" : "pointer",
        transition: "color .12s, background .12s, border-color .12s",
        minWidth: 32,
      }}
      onMouseEnter={(e) => { if (!disabled && !active) { e.currentTarget.style.color = t.fg; e.currentTarget.style.borderColor = t.border; } }}
      onMouseLeave={(e) => { if (!disabled && !active) { e.currentTarget.style.color = t.muted; e.currentTarget.style.borderColor = "transparent"; } }}
    >
      {label}
    </button>
  );
}

function PostDetailA({ t, go, slug }) {
  const p = POSTS.find((x) => x.slug === slug) || POSTS[0];
  const idx = POSTS.findIndex((x) => x.slug === p.slug);
  const prev = POSTS[idx + 1];
  const next = POSTS[idx - 1];
  return (
    <div style={{ padding: "28px 36px 60px", maxWidth: 720, margin: "0 auto" }}>
      <a href="#" onClick={(e) => {e.preventDefault();go("posts");}} style={{
        color: t.muted, fontSize: 12, textDecoration: "none",
        display: "inline-flex", alignItems: "center", gap: 6
      }}>
        <span></span> Posts
      </a>
      <div style={{ color: t.muted, fontSize: 12, marginTop: 24 }}>
        {p.date} · {p.read}
      </div>
      <h1 style={{ margin: "6px 0 10px", color: t.fg, fontSize: 28, lineHeight: 1.35, letterSpacing: -0.4, fontWeight: 700 }}>
        {p.title}
      </h1>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {p.tags.map((tg) => <TagFlat key={tg} name={tg} t={t} onClick={(name) => go("tags", name)} />)}
      </div>
      <div style={{ marginTop: 22, color: t.text, fontSize: 15, lineHeight: 1.85 }}>
        <p style={{ margin: 0 }}>{p.excerpt}</p>
        <p style={{ marginTop: 18 }}>
          この記事はダミーの本文です。実運用では Markdown を SSG でレンダリングする想定です。
          PlemolJP Console NF は等幅でありながら和文が読みやすく、コードブロックでも違和感がありません。
        </p>
        <pre style={{
          background: t.panel2,
          border: `1px solid ${t.border}`,
          borderRadius: 8,
          padding: "14px 18px",
          fontSize: 13,
          color: t.fg,
          overflow: "auto",
          marginTop: 18
        }}>
          <span style={{ color: t.muted }}>{"// example.ts"}</span>{"\n"}
          <span style={{ color: t.accent }}>export const</span>{" "}
          <span style={{ color: t.fg }}>greet</span> = (
          <span style={{ color: t.fg }}>name</span>: <span style={{ color: t.accent }}>string</span>) =&gt; {"{"}
          {"\n  "}console.log(<span style={{ color: KIND_COLORS(t).git }}>{`\`hello, \${name}\``}</span>);
          {"\n}"}
        </pre>
        <p style={{ marginTop: 18 }}>
          見出しや本文には等幅の和文を使うことで、独特のリズムが生まれます。
          コードと本文のフォントサイズの差を小さくできるので、コードを含む技術記事との相性が良いです。
        </p>
      </div>

      {/* prev/next */}
      <div style={{
        marginTop: 36, paddingTop: 18, borderTop: `1px solid ${t.border}`,
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12
      }}>
        {prev ?
        <a href="#" onClick={(e) => {e.preventDefault();go("post", prev.slug);}} style={{
          padding: 14, background: t.panel, borderRadius: 8, border: `1px solid ${t.border}`,
          color: t.fg, textDecoration: "none"
        }}>
            <div style={{ color: t.muted, fontSize: 11 }}> 前の記事</div>
            <div style={{ fontSize: 13, marginTop: 3 }}>{prev.title}</div>
          </a> :
        <div />}
        {next ?
        <a href="#" onClick={(e) => {e.preventDefault();go("post", next.slug);}} style={{
          padding: 14, background: t.panel, borderRadius: 8, border: `1px solid ${t.border}`,
          color: t.fg, textDecoration: "none", textAlign: "right"
        }}>
            <div style={{ color: t.muted, fontSize: 11 }}>次の記事 </div>
            <div style={{ fontSize: 13, marginTop: 3 }}>{next.title}</div>
          </a> :
        <div />}
      </div>
    </div>);

}

function TagsA({ t, go, filterTag }) {
  const tag = filterTag || "";
  const filtered = tag ? POSTS.filter(p => p.tags.includes(tag)) : POSTS;
  return (
    <div style={{ padding: "32px 36px 48px", maxWidth: 820, margin: "0 auto" }}>
      <div style={{ borderBottom: `1px solid ${t.border}`, paddingBottom: 14, marginBottom: 4 }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: t.fg, letterSpacing: -0.3 }}>
          <span style={{ color: t.accent }}>$</span>{" "}
          <span style={{ color: t.muted }}>ls posts/</span>{" "}
          <span style={{ color: t.accent }}>--tag=</span>
          <span>{tag}</span>
        </div>
        <div style={{ color: t.muted, fontSize: 12, marginTop: 4, display: "flex", alignItems: "center", gap: 10 }}>
          <span>{filtered.length} posts tagged <span style={{ color: t.accent }}>#{tag}</span></span>
          <span>·</span>
          <a href="#" onClick={e => { e.preventDefault(); go("posts"); }} style={{ color: t.muted, textDecoration: "none", fontSize: 12 }}>
            ← all posts
          </a>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {filtered.map((p) => (
          <a key={p.slug} href="#" onClick={e => { e.preventDefault(); go("post", p.slug); }} style={{
            display: "block", padding: "18px 8px",
            borderBottom: `1px solid ${t.border}`,
            textDecoration: "none", color: t.fg,
            borderRadius: 6, transition: "background .12s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = t.hoverBg; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, color: t.muted, fontSize: 12 }}>
              <span>{p.date}</span><span>·</span><span>{p.read}</span>
            </div>
            <h3 style={{ margin: "6px 0 6px", color: t.fg, fontSize: 17, fontWeight: 600, letterSpacing: -0.2 }}>
              {p.title}{p.external && <span style={{ color: t.muted, marginLeft: 5, fontSize: 13 }}>↗</span>}
            </h3>
            <p style={{ margin: 0, color: t.text, fontSize: 13, lineHeight: 1.7 }}>{p.excerpt}</p>
            <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
              {p.tags.map(tg => <TagFlat key={tg} name={tg} t={t} onClick={name => go("tags", name)} />)}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function ArchivesA({ t, go }) {
  const CMD = "ls archives/";
  const typed = useTyping(CMD, { speed: 42, start: 0 });
  const done = typed.length === CMD.length;

  // Group posts by year
  const byYear = POSTS.reduce((acc, p) => {
    const y = p.date.slice(0, 4);
    if (!acc[y]) acc[y] = [];
    acc[y].push(p);
    return acc;
  }, {});
  const years = Object.keys(byYear).sort((a, b) => b - a);

  return (
    <div style={{ padding: "32px 36px 48px", maxWidth: 820, margin: "0 auto" }}>
      {/* animated heading */}
      <div style={{ borderBottom: `1px solid ${t.border}`, paddingBottom: 14, marginBottom: 4 }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: t.fg, letterSpacing: -0.3 }}>
          <span style={{ color: t.accent }}>$</span>{" "}
          <span>{typed}</span>
          {!done && <span className="caret thin" style={{ background: t.fg }} />}
        </div>
        <div style={{
          color: t.muted, fontSize: 12, marginTop: 4,
          opacity: done ? 1 : 0, transition: "opacity .3s",
        }}>
          {POSTS.length} posts
        </div>
      </div>

      <div style={{ opacity: done ? 1 : 0, transition: "opacity .35s ease" }}>
        {years.map(year => (
          <div key={year} style={{ marginTop: 24 }}>
            <div style={{ color: t.accent, fontSize: 13, fontWeight: 600, marginBottom: 4 }}>
              {year}
            </div>
            {byYear[year].map((p, i) => (
              <a key={p.slug} href="#" onClick={e => { e.preventDefault(); go("post", p.slug); }} style={{
                display: "grid",
                gridTemplateColumns: "82px 1fr",
                gap: 14,
                padding: "8px 6px",
                borderTop: i === 0 ? "none" : `1px solid ${t.border}`,
                textDecoration: "none",
                color: t.fg,
                borderRadius: 4,
                transition: "background .12s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = t.hoverBg; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
              >
                <span style={{ color: t.muted, fontSize: 12, paddingTop: 1 }}>{p.date.slice(5)}</span>
                <span style={{ fontSize: 14, color: t.fg }}>
                  {p.title}
                  {p.external && <span style={{ color: t.muted, marginLeft: 5, fontSize: 12 }}>↗</span>}
                </span>
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function SearchModal({ t, go, onClose }) {
  const [query, setQuery] = React.useState("");
  const [idx, setIdx] = React.useState(0);
  const inputRef = React.useRef(null);

  const results = query.trim()
    ? POSTS.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some(tg => tg.toLowerCase().includes(query.toLowerCase()))
      )
    : POSTS.slice(0, 6);

  React.useEffect(() => { setIdx(0); }, [query]);
  React.useEffect(() => { setTimeout(() => inputRef.current && inputRef.current.focus(), 30); }, []);

  function handleKey(e) {
    if (e.key === "Escape") { onClose(); }
    else if (e.key === "ArrowDown") { e.preventDefault(); setIdx(i => Math.min(i + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setIdx(i => Math.max(i - 1, 0)); }
    else if (e.key === "Enter" && results[idx]) { go("post", results[idx].slug); onClose(); }
  }

  function hi(text) {
    if (!query.trim()) return text;
    const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    const parts = text.split(re);
    return parts.map((p, i) => re.test(p)
      ? <mark key={i} style={{ background: t.accentSoft, color: t.accent, borderRadius: 2 }}>{p}</mark>
      : p
    );
  }

  return (
    <div onClick={onClose} style={{
      position: "absolute", inset: 0, zIndex: 100,
      background: t.isDark ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.25)",
      backdropFilter: "blur(4px)",
      display: "flex", alignItems: "flex-start", justifyContent: "center",
      paddingTop: 60,
    }}>
      <div onClick={e => e.stopPropagation()} onKeyDown={handleKey} style={{
        width: 560, maxWidth: "90%",
        background: t.isDark ? "rgba(22,22,34,0.96)" : "rgba(255,255,255,0.97)",
        border: `1px solid ${t.border}`,
        borderRadius: 14,
        boxShadow: t.cardShadow,
        overflow: "hidden",
      }}>
        {/* Input */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 18px", borderBottom: `1px solid ${t.border}` }}>
          <span style={{ color: t.muted, fontSize: 16 }}></span>
          <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search posts..."
            style={{
              flex: 1, background: "transparent", border: "none", outline: "none",
              color: t.fg, fontFamily: "inherit", fontSize: 14, caretColor: t.accent,
            }}
          />
          {query && <button onClick={() => setQuery("")} style={{ background: "transparent", border: "none", color: t.muted, cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}>✕</button>}
          <span style={{ color: t.dim, fontSize: 11, border: `1px solid ${t.border}`, borderRadius: 4, padding: "1px 6px" }}>esc</span>
        </div>
        {/* Results */}
        <div style={{ maxHeight: 360, overflow: "auto" }}>
          {results.length === 0 ? (
            <div style={{ padding: "24px 18px", color: t.muted, fontSize: 13, textAlign: "center" }}>
              No results for "<span style={{ color: t.fg }}>{query}</span>"
            </div>
          ) : results.map((p, i) => (
            <div key={p.slug} onClick={() => { go("post", p.slug); onClose(); }}
              style={{
                padding: "12px 18px",
                borderBottom: `1px solid ${t.border}`,
                cursor: "pointer",
                background: i === idx ? t.hoverBg : "transparent",
                transition: "background .1s",
              }}
              onMouseEnter={() => setIdx(i)}
            >
              <div style={{ color: t.fg, fontSize: 14, fontWeight: 500 }}>{hi(p.title)}</div>
              <div style={{ color: t.muted, fontSize: 12, marginTop: 3, display: "flex", gap: 10 }}>
                <span>{p.date}</span>
                {p.tags.map(tg => <span key={tg} style={{ color: t.accent }}>#{tg}</span>)}
              </div>
            </div>
          ))}
        </div>
        {/* Footer hint */}
        <div style={{ padding: "8px 18px", display: "flex", gap: 14, color: t.dim, fontSize: 11 }}>
          <span>↑↓ navigate</span><span>↵ open</span><span>esc close</span>
        </div>
      </div>
    </div>
  );
}

function VariationCard() {
  const [themeName, setThemeName, t] = usePersistentTheme("var-card-theme", "light");
  const [screen, setScreen] = useStateA({ name: "home", arg: null });
  const [searchOpen, setSearchOpen] = useStateA(false);
  const go = (name, arg = null) => setScreen({ name, arg });

  useEffectA(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(o => !o);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  return (
    <div className="vbox" style={{
      width: "100%", height: "100%",
      background: t.bg, color: t.text,
      display: "flex", flexDirection: "column",
      overflow: "hidden"
    }}>
      <HeaderA t={t} themeName={themeName} setThemeName={setThemeName}
        screen={screen.name} go={go} onSearch={() => setSearchOpen(true)} />
      <div style={{ flex: 1, overflow: "auto", minHeight: 0, position: "relative" }}>
        {searchOpen && <SearchModal t={t} go={(name, arg) => { go(name, arg); setSearchOpen(false); }} onClose={() => setSearchOpen(false)} />}
        {screen.name === "home"     && <HomeA t={t} go={go} />}
        {screen.name === "posts"    && <PostsListA t={t} go={go} />}
        {screen.name === "post"     && <PostDetailA t={t} go={go} slug={screen.arg} />}
        {screen.name === "tags"     && <TagsA t={t} go={go} filterTag={screen.arg} />}
        {screen.name === "archives" && <ArchivesA t={t} go={go} />}
      </div>
      <div style={{
        flex: "0 0 auto",
        padding: "16px 36px",
        color: t.dim,
        fontSize: 11,
        textAlign: "center",
        background: t.bg,
      }}>
        Copyright © 2026 &nbsp;|&nbsp; All rights reserved.
      </div>
    </div>);

}

window.VariationCard = VariationCard;