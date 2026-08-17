import { Check, Line, Reading, SceneCard } from "./shell";

/**
 * Scenes for /services/wix-studio-development.
 */

/**
 * "The feature you need isn't in the editor": the add-elements list scrolls
 * past everything the editor does have, and the one thing being looked for
 * ends as an empty dashed slot.
 */
export function NoButtonScene() {
  const elements = [
    "Gallery",
    "Repeater",
    "Form",
    "Table",
    "Slideshow",
    "Menu",
    "Video",
    "Map",
  ];

  return (
    <SceneCard
      label="Blocking feature"
      aside={
        <span className="font-mono text-[10px] uppercase track-label text-negative-ink [animation:wf-fade_.4s_ease-out_3.4s_both]">
          Not native
        </span>
      }
      note="Everything else is a button. This one is a build."
    >
      <div className="mt-5 flex gap-3">
        {/* The element list, scrolling for something that isn't in it */}
        <div className="relative h-[184px] w-[46%] overflow-hidden rounded-[6px] border border-light-border bg-light-surface">
          <div className="p-2 [animation:wf-hunt-list_4s_ease-in-out_.4s_both]">
            {elements.map((el) => (
              <div
                key={el}
                className="flex items-center gap-2 rounded-[4px] px-2 py-2.5"
              >
                <span className="h-3.5 w-3.5 shrink-0 rounded-[3px] border border-light-border bg-light-bg" />
                <span className="text-[12px] text-light-muted">{el}</span>
              </div>
            ))}
          </div>
        </div>

        {/* What the page actually needs */}
        <div className="flex flex-1 flex-col justify-center gap-2.5">
          <div className="rounded-[6px] border border-light-border bg-light-bg p-3 [animation:wf-fade_.4s_ease-out_.2s_both]">
            <Line className="w-2/3 bg-light-border" />
            <Line className="mt-2 w-1/2 bg-light-border" />
          </div>
          <div className="rounded-[6px] border border-dashed border-negative/50 bg-light-bg p-3 [animation:wf-pop_.35s_ease-out_2.6s_both]">
            <span className="font-mono text-[10px] uppercase track-label text-negative-ink">
              Filtered search
            </span>
            <p className="mt-1.5 text-[12px] leading-snug text-light-muted">
              No element for it
            </p>
          </div>
        </div>
      </div>
    </SceneCard>
  );
}

/**
 * "Someone told you it needs a custom build": the quoted stack stacks up its
 * recurring lines, then the native route lands beside it with the same
 * feature and none of the tail.
 */
export function QuotedStackScene() {
  const stack = ["Hosting", "Server maintenance", "Developer retainer"];

  return (
    <SceneCard
      label="Quoted solution"
      aside={
        <Reading
          values={["One-off build", "Plus upkeep", "Plus a retainer"]}
          start={0.7}
          className="font-mono text-[10px] uppercase track-label text-warning-ink"
        />
      }
      note="Sometimes that's the right answer. Often it's the one that suits the quote."
    >
      <div className="mt-5 grid grid-cols-2 gap-3">
        {/* The full custom stack, with its tail */}
        <div className="rounded-[6px] border border-light-border bg-light-surface p-4">
          <p className="font-mono text-[10px] uppercase track-label text-light-muted">
            Custom stack
          </p>
          <div className="mt-3 rounded-[4px] border border-light-border bg-light-bg px-3 py-2.5 text-[12px] font-medium">
            The feature
          </div>
          <ul className="mt-2 flex flex-col gap-2">
            {stack.map((row, i) => (
              <li
                key={row}
                className="flex items-center gap-2 rounded-[4px] border border-warning/40 bg-warning/10 px-3 py-2 text-[12px] text-light-text"
                style={{
                  animation: `wf-rise .4s ease-out ${0.9 + i * 0.5}s both`,
                }}
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-warning" />
                {row}
              </li>
            ))}
          </ul>
        </div>

        {/* Built native, on the platform already paid for */}
        <div className="rounded-[6px] border border-accent-line bg-accent-subtle p-4 [animation:wf-fade_.4s_ease-out_2.6s_both]">
          <p className="font-mono text-[10px] uppercase track-label text-light-muted">
            Built native
          </p>
          <div className="mt-3 rounded-[4px] border border-light-border bg-light-bg px-3 py-2.5 text-[12px] font-medium">
            The same feature
          </div>
          <div className="mt-4 flex items-start gap-2 [animation:wf-fade_.4s_ease-out_3.2s_both]">
            <Check className="text-positive-ink" />
            <span className="text-[12px] leading-snug text-light-muted">
              No second platform to run
            </span>
          </div>
        </div>
      </div>
    </SceneCard>
  );
}

/**
 * "Your team is doing work software should do": an enquiry lands and a person
 * carries it to the CRM by hand, again and again, until the automation picks
 * the trip up instead.
 */
export function ManualHandlingScene() {
  return (
    <SceneCard
      label="Manual handling"
      aside={
        <Reading
          values={["1 enquiry", "18 enquiries", "40 enquiries"]}
          start={0.8}
          className="font-mono text-[10px] uppercase track-label text-negative-ink"
        />
      }
      note="The site already collected it. Someone types it in anyway."
    >
      <div className="mt-6">
        <div className="relative flex items-center justify-between gap-3">
          <div className="w-[38%] rounded-[6px] border border-light-border bg-light-surface p-3 text-center">
            <p className="font-mono text-[10px] uppercase track-label text-light-muted">
              Form
            </p>
            <Line className="mx-auto mt-2.5 w-3/4 bg-light-border" />
          </div>

          {/* The trip a person makes, three times over */}
          <div className="relative h-8 flex-1">
            <span
              className="absolute left-0 top-1/2 h-px w-full border-t border-dashed border-light-border"
              aria-hidden
            />
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="absolute left-0 top-1/2 -mt-2 h-4 w-4 rounded-[3px] border border-light-border bg-light-bg"
                style={{
                  animation: `wf-carry 1.5s ease-in-out ${0.4 + i * 1.1}s both`,
                }}
              />
            ))}
          </div>

          <div className="w-[38%] rounded-[6px] border border-light-border bg-light-surface p-3 text-center">
            <p className="font-mono text-[10px] uppercase track-label text-light-muted">
              CRM
            </p>
            <Line className="mx-auto mt-2.5 w-3/4 bg-light-border" />
          </div>
        </div>

        <div className="mt-6 rounded-[6px] border border-accent-line bg-accent-subtle px-4 py-3 [animation:wf-fade_.4s_ease-out_3.8s_both]">
          <div className="flex items-center gap-2">
            <Check className="text-positive-ink" />
            <span className="text-[12px] font-medium">
              An automation makes the trip instead
            </span>
          </div>
        </div>
      </div>
    </SceneCard>
  );
}
