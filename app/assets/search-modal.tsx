import {
  clientEntry,
  css,
  on,
  type Handle,
  type SerializableProps,
} from "remix/ui";

import { SearchIcon } from "./icons/search-icon.tsx";

export type SearchPost = SerializableProps & {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  tags: string[];
};

type SearchButtonProps = SerializableProps & {
  posts: SearchPost[];
};

const INPUT_ID = "search-modal-input";

export const SearchButton = clientEntry(
  import.meta.url,
  function SearchButton(handle: Handle<SearchButtonProps>) {
    let isOpen = false;
    let query = "";
    let selectedIdx = 0;

    const getResults = () => {
      const q = query.trim().toLowerCase();
      if (!q) return handle.props.posts.slice(0, 6);
      return handle.props.posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      );
    };

    const openModal = () => {
      isOpen = true;
      query = "";
      selectedIdx = 0;
      handle.update();
      if (typeof document !== "undefined") {
        setTimeout(() => {
          document.getElementById(INPUT_ID)?.focus();
        }, 30);
      }
    };

    const closeModal = () => {
      isOpen = false;
      handle.update();
    };

    // Global keyboard handler — handles both ⌘K and modal navigation
    // Only attach DOM listeners in the browser (clientEntry body also runs on server for SSR)
    if (typeof document !== "undefined") {
      document.addEventListener("keydown", (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === "k") {
          e.preventDefault();
          if (isOpen) {
            closeModal();
          } else {
            openModal();
          }
          return;
        }

        if (!isOpen) return;

        const results = getResults();
        if (e.key === "Escape") {
          closeModal();
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          selectedIdx = Math.min(selectedIdx + 1, results.length - 1);
          handle.update();
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          selectedIdx = Math.max(selectedIdx - 1, 0);
          handle.update();
        } else if (e.key === "Enter") {
          const post = results[selectedIdx];
          if (post) {
            window.location.href = `/posts/${post.slug}`;
          }
        }
      });

      // Input handler via delegation — survives DOM re-renders
      document.addEventListener("input", (e: Event) => {
        if (!isOpen || (e.target as HTMLElement).id !== INPUT_ID) return;
        const newQuery = (e.target as HTMLInputElement).value;
        if (newQuery !== query) {
          query = newQuery;
          selectedIdx = 0;
          handle.update();
        }
      });
    }

    function highlight(text: string) {
      if (!query.trim()) return [text];
      const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const parts = text.split(new RegExp(`(${escaped})`, "gi"));
      return parts.map((part, i) =>
        i % 2 === 1 ? (
          <mark
            key={i}
            style={{
              background: "var(--accent-soft)",
              color: "var(--accent)",
              borderRadius: "2px",
            }}
          >
            {part}
          </mark>
        ) : (
          part
        ),
      );
    }

    return () => {
      const results = getResults();
      const clampedIdx = Math.min(selectedIdx, Math.max(0, results.length - 1));

      return (
        <div mix={wrapperStyle}>
          <button type="button" mix={[buttonStyle, on("click", openModal)]}>
            <SearchIcon />
            <span mix={shortcutLabelStyle}>⌘K</span>
          </button>

          {isOpen && (
            <div mix={[overlayStyle, on("click", closeModal)]}>
              <div mix={[panelStyle, on("click", (e) => e.stopPropagation())]}>
                {/* Input row */}
                <div mix={inputRowStyle}>
                  <SearchIcon />
                  <input
                    id={INPUT_ID}
                    type="text"
                    placeholder="Search posts..."
                    mix={inputStyle}
                  />
                  {query && (
                    <button
                      type="button"
                      mix={[
                        clearBtnStyle,
                        on("click", () => {
                          query = "";
                          handle.update();
                          const el = document.getElementById(
                            INPUT_ID,
                          ) as HTMLInputElement | null;
                          if (el) {
                            el.value = "";
                            el.focus();
                          }
                        }),
                      ]}
                    >
                      ✕
                    </button>
                  )}
                  <span mix={escHintStyle}>esc</span>
                </div>

                {/* Results */}
                <div mix={resultsListStyle}>
                  {results.length === 0 ? (
                    <div mix={emptyStyle}>
                      No results for "
                      <span style={{ color: "var(--fg)" }}>{query}</span>"
                    </div>
                  ) : (
                    results.map((p, i) => (
                      <a
                        rmx-document
                        key={p.slug}
                        href={`/posts/${p.slug}`}
                        mix={[
                          resultItemStyle,
                          i === clampedIdx ? resultItemActiveStyle : null,
                          on("mouseenter", () => {
                            selectedIdx = i;
                            handle.update();
                          }),
                          on("click", () => closeModal()),
                        ]}
                      >
                        <div mix={resultTitleStyle}>{highlight(p.title)}</div>
                        <div mix={resultMetaStyle}>
                          <span>{p.date}</span>
                          {p.tags.map((tg) => (
                            <span key={tg} mix={resultTagStyle}>
                              #{tg}
                            </span>
                          ))}
                        </div>
                      </a>
                    ))
                  )}
                </div>

                {/* Footer */}
                <div mix={footerStyle}>
                  <span>↑↓ navigate</span>
                  <span>↵ open</span>
                  <span>esc close</span>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    };
  },
);

const wrapperStyle = css({ display: "contents" });

const buttonStyle = css({
  background: "transparent",
  border: "1px solid var(--border)",
  color: "var(--muted)",
  borderRadius: "8px",
  padding: "5px 10px",
  fontFamily: "inherit",
  fontSize: "12px",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  marginRight: "8px",
  transition: "color .12s, border-color .12s",
  "&:hover": {
    color: "var(--fg)",
    borderColor: "var(--border-strong)",
  },
});

const shortcutLabelStyle = css({ color: "var(--dim)", fontSize: "11px" });

const overlayStyle = css({
  position: "fixed",
  inset: 0,
  zIndex: 100,
  background: "var(--search-overlay-bg)",
  backdropFilter: "blur(4px)",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  paddingTop: "60px",
});

const panelStyle = css({
  width: "560px",
  maxWidth: "90%",
  background: "var(--search-panel-bg)",
  border: "1px solid var(--border)",
  borderRadius: "14px",
  boxShadow: "0 1px 2px rgba(0,0,0,0.08), 0 8px 32px -8px rgba(0,0,0,0.2)",
  overflow: "hidden",
});

const inputRowStyle = css({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "14px 18px",
  borderBottom: "1px solid var(--border)",
});

const inputStyle = css({
  flex: 1,
  background: "transparent",
  border: "none",
  outline: "none",
  color: "var(--fg)",
  fontFamily: "inherit",
  fontSize: "14px",
  caretColor: "var(--accent)",
  "::placeholder": { color: "var(--muted)" },
});

const clearBtnStyle = css({
  background: "transparent",
  border: "none",
  color: "var(--muted)",
  cursor: "pointer",
  fontSize: "12px",
  fontFamily: "inherit",
  padding: "0",
  lineHeight: 1,
});

const escHintStyle = css({
  color: "var(--dim)",
  fontSize: "11px",
  border: "1px solid var(--border)",
  borderRadius: "4px",
  padding: "1px 6px",
  flexShrink: 0,
});

const resultsListStyle = css({ maxHeight: "360px", overflow: "auto" });

const emptyStyle = css({
  padding: "24px 18px",
  color: "var(--muted)",
  fontSize: "13px",
  textAlign: "center",
});

const resultItemStyle = css({
  display: "block",
  padding: "12px 18px",
  borderBottom: "1px solid var(--border)",
  cursor: "pointer",
  background: "transparent",
  transition: "background .1s",
  textDecoration: "none",
  color: "var(--fg)",
});

const resultItemActiveStyle = css({ background: "var(--hover-bg)" });

const resultTitleStyle = css({
  color: "var(--fg)",
  fontSize: "14px",
  fontWeight: 500,
});

const resultMetaStyle = css({
  color: "var(--muted)",
  fontSize: "12px",
  marginTop: "3px",
  display: "flex",
  gap: "10px",
});

const resultTagStyle = css({ color: "var(--accent)" });

const footerStyle = css({
  padding: "8px 18px",
  display: "flex",
  gap: "14px",
  color: "var(--dim)",
  fontSize: "11px",
});
