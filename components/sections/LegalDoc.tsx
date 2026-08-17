import { Section } from "@/components/ui/Section";
import type { LegalDocument } from "@/content/legal";

/**
 * Renders a legal document: /privacy and /terms both come through here, so the
 * two can never drift apart typographically.
 *
 * Deliberately plain. Single measured column, hairline rules between sections,
 * tables that scroll rather than squash on phones. A legal page's job is to be
 * read, so it gets the body face and a real measure instead of the display
 * register the marketing sections use.
 */
export function LegalDoc({ doc }: { doc: LegalDocument }) {
  return (
    <Section tone="light" divide={false} frameClassName="!py-12 md:!py-20">
      <div className="max-w-[72ch]">
        <h1 className="font-display text-h1 font-medium leading-tight tracking-tight text-balance">
          {doc.title}
        </h1>
        <p className="mt-4 font-mono text-label uppercase track-label text-light-muted">
          Last updated {doc.updated}
        </p>
        <p className="mt-6 text-body-lg leading-relaxed text-light-muted">
          {doc.intro}
        </p>

        {doc.sections.map((section) => (
          <section
            key={section.heading}
            className="mt-12 border-t border-light-border pt-8"
          >
            <h2 className="font-display text-h3 font-medium leading-tight">
              {section.heading}
            </h2>

            {section.blocks.map((block, i) => {
              if (block.type === "p") {
                return (
                  <p
                    key={i}
                    className="mt-4 text-body leading-relaxed text-light-muted"
                  >
                    {block.text}
                  </p>
                );
              }

              if (block.type === "list") {
                return (
                  <ul key={i} className="mt-4 flex flex-col gap-3">
                    {block.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-body leading-relaxed text-light-muted"
                      >
                        <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-light-muted" />
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              }

              // Wide tables scroll inside their own container so the page body
              // never scrolls sideways on a phone.
              return (
                <div key={i} className="mt-6 overflow-x-auto">
                  <table className="w-full min-w-[34rem] border-collapse text-left">
                    <thead>
                      <tr>
                        {block.head.map((cell) => (
                          <th
                            key={cell}
                            scope="col"
                            className="border-b border-light-border pb-3 pr-6 font-mono text-label uppercase track-label font-normal text-light-muted"
                          >
                            {cell}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row) => (
                        <tr key={row.join("|")}>
                          {row.map((cell, ci) => (
                            <td
                              key={ci}
                              className="border-b border-light-border py-3 pr-6 align-top text-body leading-relaxed text-light-muted"
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </section>
        ))}
      </div>
    </Section>
  );
}
