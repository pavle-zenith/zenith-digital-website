import {
  Line,
  Reading,
  SceneCard,
} from "@/components/sections/service/who-for-scenes/shell";

import {
  Avatar,
  Body,
  Browser,
  Cycle,
  Done,
  PanelTitle,
  Tick,
  anim,
  cta,
  item,
  panel,
  play,
  slot,
  slotOn,
  tag,
} from "./parts";

/**
 * Step scenes for /industries/professional-services. Same family as
 * travel's (see ./parts.tsx for the rules every scene follows).
 */

/**
 * Step 1, offer: the service names a firm uses internally rewrite into the
 * words its clients use, and the one that should lead is marked.
 */
export function ProOfferScene() {
  const rows = [
    { from: "Workforce optimisation", to: "Help hiring your first staff" },
    { from: "Regulatory compliance advisory", to: "Stay on the right side of the rules" },
    { from: "Strategic financial planning", to: "Know what you can afford next year" },
  ];
  return (
    <SceneCard
      label="Services"
      aside={
        <Reading
          values={["Jargon", "Plain words"]}
          start={0.3}
          step={2.2}
          className={`${tag} text-light-muted`}
          finalClassName="text-positive-ink"
        />
      }
    >
      <Body className="flex flex-col justify-center gap-2">
        {rows.map((r, i) => (
          <div
            key={r.from}
            className={
              i === 0
                ? "relative flex h-11 items-center justify-between gap-2 rounded-[4px] border border-accent bg-accent-subtle px-2.5 text-[12px] leading-tight"
                : `flex h-11 items-center ${item}`
            }
            style={i === 0 ? anim(play("wf-target", 0.4, 2.6)) : undefined}
          >
            <Cycle
              values={[r.from, r.to]}
              start={0.1}
              step={0.9 + i * 0.5}
              restClassName="text-light-muted line-through decoration-light-muted/60"
              finalClassName="font-medium text-light-text"
            />
            {i === 0 ? (
              <span
                className="shrink-0 rounded-[4px] bg-accent px-1.5 py-0.5 text-[10px] font-medium text-accent-ink"
                style={anim(play("wf-pop", 0.3, 2.8))}
              >
                Leads
              </span>
            ) : null}
          </div>
        ))}
      </Body>
    </SceneCard>
  );
}

/**
 * Step 2, trust: the people, their years and the accreditation arrive next
 * to the service they stand behind.
 */
export function ProTrustScene() {
  return (
    <SceneCard label="Service page" aside={<Done at={2.8}>Beside the offer</Done>}>
      <Body className="grid grid-cols-2 gap-3">
        <div className={`flex flex-col ${panel}`}>
          <PanelTitle icon="briefcase">Hiring help</PanelTitle>
          <p className="mt-3 font-display text-[13px] font-medium leading-snug text-light-text">
            Help hiring your first staff
          </p>
          <div className="mt-3 flex flex-col gap-1.5">
            <Line className="w-full bg-light-border" />
            <Line className="w-5/6 bg-light-border" />
            <Line className="w-2/3 bg-light-border" />
          </div>
          <span className={`mt-auto self-start ${cta}`}>Book a call</span>
        </div>
        <div className="flex min-w-0 flex-col gap-2">
          <div className={item}>
            <p className={`${tag} text-light-muted`}>Your team</p>
            <div className="mt-2 flex -space-x-1.5">
              {["MN", "JS", "AK"].map((p, i) => (
                <Avatar
                  key={p}
                  initials={p}
                  style={anim(play("wf-pop", 0.3, 0.5 + i * 0.15))}
                />
              ))}
            </div>
          </div>
          <div className={item} style={anim(play("wf-rise", 0.4, 1.3))}>
            <p className="font-display text-[20px] font-medium leading-none tabular-nums text-light-text">
              15
            </p>
            <p className="mt-1 truncate text-[11px] text-light-muted">
              Years in business
            </p>
          </div>
          <div
            className={`flex items-center justify-between gap-2 ${item}`}
            style={anim(play("wf-rise", 0.4, 1.9))}
          >
            <span className={`truncate ${tag} text-light-text`}>Accredited</span>
            <Tick at={2.3} />
          </div>
        </div>
      </Body>
    </SceneCard>
  );
}

/**
 * Step 3, first step: one button, one slot in the calendar, and the person
 * who'll take the call, assigned before it happens.
 */
export function ProFirstStepScene() {
  const slots = ["Mon 10:00", "Wed 14:00", "Thu 09:30", "Fri 16:00"];
  return (
    <SceneCard label="First conversation" aside={<Done at={3.0}>Booked</Done>}>
      <Body className="flex flex-col items-center justify-center">
        <span className={cta} style={anim(play("wf-pop", 0.35, 0.2))}>
          Book a consultation
        </span>
        <span
          className="block h-4 w-px origin-top bg-light-border"
          style={anim(play("wf-grow-y", 0.3, 0.7))}
        />
        <div className="flex gap-1.5">
          {slots.map((s, i) =>
            i === 1 ? (
              <span
                key={s}
                className={slotOn}
                style={anim(play("wf-rise", 0.35, 0.9), play("wf-target", 0.4, 1.5))}
              >
                {s}
              </span>
            ) : (
              <span
                key={s}
                className={`${slot} ${i === 3 ? "max-sm:hidden" : ""}`}
                style={anim(play("wf-rise", 0.35, 0.9 + i * 0.05))}
              >
                {s}
              </span>
            ),
          )}
        </div>
        <span
          className="block h-4 w-px origin-top bg-light-border"
          style={anim(play("wf-grow-y", 0.3, 1.9))}
        />
        <div
          className={`relative flex w-full max-w-[260px] items-center gap-2.5 ${item}`}
          style={anim(play("wf-rise", 0.4, 2.2))}
        >
          <Avatar initials="MN" />
          <span className="min-w-0">
            <span className="block font-medium">Marta Novak</span>
            <span className="block truncate text-[11px] text-light-muted">
              Employment law, takes your call
            </span>
          </span>
          <Tick at={2.6} className="absolute -right-1.5 -top-1.5" />
        </div>
      </Body>
    </SceneCard>
  );
}

/**
 * Step 4, language: the same page in English, German and Serbian. The words
 * change; the layout doesn't move.
 */
export function ProLanguageScene() {
  const langs = ["EN", "DE", "SR"];
  const step = 1.4;
  return (
    <SceneCard
      label="Language versions"
      aside={
        <span className="grid grid-cols-3 rounded-[4px] border border-light-border bg-light-surface p-0.5 text-[10px] font-medium leading-none text-light-text">
          {langs.map((l, i) => (
            <span key={l} className="relative px-1.5 py-1 text-center">
              <span
                aria-hidden
                className="absolute inset-0 rounded-[3px] border border-light-border bg-light-bg"
                style={{
                  animation:
                    i < langs.length - 1
                      ? `wf-blip ${step}s ease-out ${i * step}s both`
                      : `wf-fade .3s ease-out ${i * step}s both`,
                }}
              />
              <span className="relative">{l}</span>
            </span>
          ))}
        </span>
      }
    >
      <Body>
        <Browser>
          <div className="flex h-full flex-col p-3">
            <div className="flex items-center gap-2">
              <Line className="w-10 bg-light-text/70" />
              <Line className="ml-auto w-8 bg-light-border" />
              <Line className="w-8 bg-light-border" />
            </div>
            <p className="mt-4 font-display text-[15px] font-medium leading-snug text-light-text">
              <Cycle
                values={[
                  "Security you can plan around",
                  "Sicherheit, mit der Sie planen können",
                  "Bezbednost na koju možete da računate",
                ]}
                start={0}
                step={step}
              />
            </p>
            <div className="mt-3 flex flex-col gap-1.5">
              <Line className="w-full bg-light-border" />
              <Line className="w-4/5 bg-light-border" />
            </div>
            <div className="mt-auto flex items-end justify-between gap-2">
              <span className={cta}>
                <Cycle
                  values={["Book a call", "Termin buchen", "Zakažite poziv"]}
                  start={0}
                  step={step}
                />
              </span>
              <Done at={3.2}>Same layout</Done>
            </div>
          </div>
        </Browser>
      </Body>
    </SceneCard>
  );
}
