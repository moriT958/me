import type { Root, Element, ElementContent, RootContent, Properties } from "hast";
import type { RemixNode } from "remix/ui";

import { CodeBlock, codeWrapperStyle, preStyle } from "../assets/code-block.tsx";

const PROP_RENAMES: Record<string, string> = {
  className: "class",
  htmlFor: "for",
  httpEquiv: "http-equiv",
  crossOrigin: "crossorigin",
  tabIndex: "tabindex",
  readOnly: "readonly",
  maxLength: "maxlength",
  minLength: "minlength",
  autoComplete: "autocomplete",
  autoFocus: "autofocus",
};

function hastPropsToJsx(properties: Properties | undefined): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  if (!properties) return out;
  for (const [key, val] of Object.entries(properties)) {
    if (val === undefined || val === null || val === false) continue;
    const attr = PROP_RENAMES[key] ?? key;
    if (Array.isArray(val)) {
      out[attr] = val.join(" ");
    } else {
      out[attr] = val;
    }
  }
  return out;
}

function extractPlainText(node: Element): string {
  let text = "";
  function walk(n: ElementContent) {
    if (n.type === "text") {
      text += n.value;
    } else if (n.type === "element") {
      n.children.forEach(walk);
    }
  }
  node.children.forEach(walk);
  return text;
}

function hastToJsx(node: RootContent | ElementContent): RemixNode {
  if (node.type === "text") return node.value;
  if (node.type === "comment") return null;
  if (node.type === "doctype") return null;

  const el = node as Element;

  if (el.tagName === "pre") {
    const plainText = extractPlainText(el);
    const props = hastPropsToJsx(el.properties);
    const children = el.children.map(hastToJsx);
    return (
      <div mix={codeWrapperStyle}>
        <pre {...props} mix={preStyle}>
          {children}
        </pre>
        <CodeBlock code={plainText} />
      </div>
    );
  }

  const Tag = el.tagName as any;
  const props = hastPropsToJsx(el.properties);
  const children = el.children.map(hastToJsx);
  return <Tag {...props}>{children}</Tag>;
}

export function hastRootToJsx(root: Root): RemixNode {
  return <>{(root.children as (RootContent | ElementContent)[]).map(hastToJsx)}</>;
}
