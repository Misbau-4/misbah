/**
 * Container.jsx
 *
 * Reusable max-width wrapper used by every section.
 * Caps content at 128rem and centres it horizontally.
 * The outer element of each section (background, border, etc.)
 * remains full-width — only the content inside is constrained.
 *
 * Usage:
 *   <section>
 *     <Container>
 *       ... section content ...
 *     </Container>
 *   </section>
 *
 * Props:
 *   as        — HTML tag to render as (default: 'div')
 *   className — additional Tailwind / CSS classes
 *   children  — content
 */

export default function Container({
  // eslint-disable-next-line no-unused-vars
  as: Tag = 'div',
  className = '',
  children,
  ...props
}) {
  return (
    <Tag
      className={`site-container ${className}`.trim()}
      {...props}
    >
      {children}
    </Tag>
  )
}
