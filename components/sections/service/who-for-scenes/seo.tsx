import { Line, Reading, SceneCard } from "./shell";

/**
 * Scenes for /services/seo-aeo-ppc.
 */

/**
 * "The site is live and nobody sees it": the results list fills in, the top
 * three take the attention, then the list scrolls past pages two and three
 * to find you sitting on page four.
 */
export function SerpScene() {
  return (
    <SceneCard
      label="Search position"
      note="The site is fine. Nobody scrolls far enough to see it."
    >
      <div className="relative mt-4 h-[196px] overflow-hidden">
        <div className="[animation:wf-serp_5s_ease-in-out_both]">
          {/* Page one: the results collecting the clicks */}
          <div className="flex flex-col gap-2.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="rounded-[6px] border border-light-border bg-light-surface p-3"
                style={{
                  animation: `wf-rise .4s ease-out ${0.2 + i * 0.2}s both`,
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-light-border" />
                  <Line className="w-1/2 bg-light-muted/50" />
                </div>
                <Line className="mt-2.5 w-5/6 bg-light-border" />
              </div>
            ))}
          </div>

          <p className="mt-2 text-right font-mono text-[10px] uppercase track-label text-light-muted [animation:wf-blip_2.4s_ease-out_1s_both]">
            Clicks land here
          </p>

          {/* The pages nobody opens */}
          <div className="mt-2 flex items-center gap-3">
            <span className="h-px flex-1 border-t border-dashed border-light-border" />
            <span className="font-mono text-[10px] uppercase track-label text-light-muted">
              Pages 2 &ndash; 3
            </span>
            <span className="h-px flex-1 border-t border-dashed border-light-border" />
          </div>

          {/* You */}
          <div className="mt-3 rounded-[6px] border border-negative/40 bg-light-bg p-3">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[13px] font-medium">Your site</span>
              <span className="rounded-full border border-light-border px-2 py-0.5 font-mono text-[10px] uppercase track-label text-negative-ink">
                Page 4
              </span>
            </div>
            <Line className="mt-2.5 w-5/6 bg-light-border" />
          </div>
        </div>
      </div>
    </SceneCard>
  );
}

/**
 * "Ad spend goes out, conversions don't come back": spend climbs month over
 * month while the leads bars stay where they were.
 */
export function AdSpendScene() {
  const months = [
    { spend: 34, leads: 20 },
    { spend: 46, leads: 18 },
    { spend: 58, leads: 21 },
    { spend: 70, leads: 17 },
    { spend: 84, leads: 19 },
  ];

  return (
    <SceneCard
      label="Cost per lead"
      aside={
        <Reading
          values={["Steady", "Rising", "Climbing"]}
          className="font-mono text-[10px] uppercase track-label text-negative-ink"
        />
      }
      note="The campaigns are running fine. The page they land on isn't."
    >
      <div className="mt-6 flex h-[132px] items-end justify-between gap-3">
        {months.map((m, i) => (
          <div key={i} className="flex flex-1 items-end justify-center gap-1.5">
            <span
              className="w-3.5 origin-bottom rounded-t-[3px] bg-bg"
              style={{
                height: m.spend,
                animation: `wf-grow-y .5s ease-out ${0.3 + i * 0.16}s both`,
              }}
            />
            <span
              className="w-3.5 origin-bottom rounded-t-[3px] bg-light-border"
              style={{
                height: m.leads,
                animation: `wf-grow-y .5s ease-out ${0.42 + i * 0.16}s both`,
              }}
            />
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-5 border-t border-light-border pt-4">
        <span className="flex items-center gap-2 text-[13px] text-light-muted">
          <span className="h-2.5 w-2.5 rounded-[2px] bg-bg" />
          Ad spend
        </span>
        <span className="flex items-center gap-2 text-[13px] text-light-muted">
          <span className="h-2.5 w-2.5 rounded-[2px] bg-light-border" />
          Leads
        </span>
      </div>
    </SceneCard>
  );
}

/**
 * "You're invisible when someone asks an AI": the answer gets written, three
 * sources get cited, and the slot where you would be stays empty.
 */
export function AiAnswerScene() {
  return (
    <SceneCard
      label="Answer engine"
      note="Nothing recommends a business it never read."
    >
      <div className="mt-5 flex flex-col gap-4">
        <div className="max-w-[85%] self-end [animation:wf-rise_.4s_ease-out_.2s_both]">
          <div className="rounded-[8px] rounded-br-[2px] bg-bg px-4 py-2.5 text-[13px] leading-snug text-white">
            Who should I hire to build my site?
          </div>
        </div>

        <div className="rounded-[8px] border border-light-border bg-light-surface p-4">
          {/* The answer being written */}
          <div className="flex flex-col gap-2">
            <Line className="w-full bg-light-border [animation:wf-fade_.3s_ease-out_.7s_both]" />
            <Line className="w-11/12 bg-light-border [animation:wf-fade_.3s_ease-out_.9s_both]" />
            <Line className="w-3/4 bg-light-border [animation:wf-fade_.3s_ease-out_1.1s_both]" />
          </div>

          <p className="mt-4 font-mono text-[10px] uppercase track-label text-light-muted">
            Sources cited
          </p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="flex items-center gap-2 rounded-full border border-light-border bg-light-bg px-3 py-1.5"
                style={{
                  animation: `wf-pop .35s ease-out ${1.5 + i * 0.3}s both`,
                }}
              >
                <span className="h-3 w-3 rounded-[3px] bg-light-border" />
                <Line className="w-10 bg-light-border" />
              </span>
            ))}
            <span className="flex items-center gap-2 rounded-full border border-dashed border-negative/50 px-3 py-1.5 [animation:wf-fade_.4s_ease-out_2.7s_both]">
              <span className="font-mono text-[10px] uppercase track-label text-negative-ink">
                You, not cited
              </span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 [animation:wf-fade_.4s_ease-out_3.3s_both]">
          <span className="h-2 w-2 shrink-0 rounded-full bg-warning" />
          <span className="text-[13px] text-light-muted">
            Competitors are already being named
          </span>
        </div>
      </div>
    </SceneCard>
  );
}
