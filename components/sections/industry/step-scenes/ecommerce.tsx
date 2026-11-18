import Image from "next/image";

import {
  Line,
  Reading,
  SceneCard,
} from "@/components/sections/service/who-for-scenes/shell";
import { FeatureIcon } from "@/components/ui/FeatureIcon";

import {
  Body,
  Browser,
  FilterChip,
  PanelTitle,
  Tick,
  anim,
  ghost,
  item,
  moveFrom,
  panel,
  play,
  tag,
} from "./parts";

/**
 * Step scenes for /industries/ecommerce. Same family as travel's (see
 * ./parts.tsx for the rules every scene follows).
 */

/**
 * Step 1, platform: the brand's traits drop into the Wix Studio lane, and
 * that lane is recommended. Shopify's lane shows what it's for, dashed,
 * because none of this brand's traits land there.
 */
export function EcommercePlatformScene() {
  const traits = [
    { label: "Brand story", at: 0.5 },
    { label: "Curated range", at: 0.95 },
    { label: "Seasonal drops", at: 1.4 },
  ];
  return (
    <SceneCard
      label="Platform"
      aside={
        <Reading
          values={["Comparing", "Wix Studio"]}
          start={0.3}
          step={2.4}
          className={`${tag} text-light-muted`}
          finalClassName="text-positive-ink"
        />
      }
    >
      <Body className="grid grid-cols-2 gap-3">
        <div className={`relative ${panel}`}>
          {/* The recommendation: an accent wash over the lane. */}
          <span
            aria-hidden
            className="absolute -inset-px rounded-[6px] border border-accent bg-accent-subtle"
            style={anim(play("wf-fade", 0.5, 2.6))}
          />
          <div className="relative">
            <PanelTitle icon="palette">Wix Studio</PanelTitle>
            <p className="mt-1 text-[11px] text-light-muted">Brand leads</p>
            <div className="mt-3 flex flex-col gap-2">
              {traits.map((t, i) => (
                <div
                  key={t.label}
                  // Phones keep two: the third overran the lane at that width.
                  className={`${item} ${i === 2 ? "max-sm:hidden" : ""}`}
                  style={moveFrom("0", "-18px", 0.55, t.at, play("wf-fade", 0.3, t.at))}
                >
                  {t.label}
                </div>
              ))}
            </div>
          </div>
          <Tick at={2.9} className="absolute -right-1.5 -top-1.5" />
        </div>
        <div className={panel}>
          <PanelTitle icon="cart">Shopify</PanelTitle>
          <p className="mt-1 text-[11px] text-light-muted">Catalogue leads</p>
          <div className="mt-3 flex flex-col gap-2">
            <div className={ghost}>Big catalogue</div>
            <div className={ghost}>App stack</div>
          </div>
        </div>
      </Body>
    </SceneCard>
  );
}

/**
 * Step 2, catalogue: loose products sort into the collections people shop
 * by, then a filter switches on and the grid narrows to what matches.
 */
export function EcommerceCatalogueScene() {
  const columns = [
    {
      name: "New drop",
      products: [
        { name: "Linen shirt", price: "£65", keep: false, from: ["70px", "40px"] },
        { name: "Cotton tee", price: "£35", keep: true, from: ["150px", "-30px"] },
      ],
    },
    {
      name: "Gifts",
      products: [
        { name: "Gift card", price: "£25", keep: true, from: ["-60px", "55px"] },
        { name: "Candle set", price: "£48", keep: false, from: ["80px", "-50px"] },
      ],
    },
    {
      name: "Bestsellers",
      products: [
        { name: "Canvas tote", price: "£30", keep: true, from: ["-140px", "35px"] },
        { name: "Wool scarf", price: "£55", keep: false, from: ["-70px", "-45px"] },
      ],
    },
  ];
  return (
    <SceneCard
      label="Catalogue"
      aside={
        <Reading
          values={["Sorting", "3 of 6"]}
          start={0.3}
          step={2.3}
          className={`${tag} text-light-muted`}
          finalClassName="text-light-text"
        />
      }
    >
      <Body>
        <div className="flex gap-1.5">
          <FilterChip label="All" off={2.3} />
          <FilterChip label="Under £40" on={2.3} />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {columns.map((col, c) => (
            <div key={col.name} className="min-w-0">
              <p
                className={`truncate ${tag} text-light-muted`}
                style={anim(play("wf-fade", 0.3, 0.2))}
              >
                {col.name}
              </p>
              <div className="mt-2 flex flex-col gap-1.5">
                {col.products.map((p, r) => {
                  const at = 0.5 + (c * 2 + r) * 0.15;
                  return (
                    <div
                      key={p.name}
                      className={`rounded-[4px] border border-light-border bg-light-bg p-1.5 ${p.keep ? "" : "opacity-30"}`}
                      style={moveFrom(
                        p.from[0],
                        p.from[1],
                        0.7,
                        at,
                        ...(p.keep ? [] : [play("wf-mute", 0.4, 2.5)]),
                      )}
                    >
                      <span className="block h-3 rounded-[3px] bg-light-surface" />
                      <p className="mt-1 truncate text-[11px] leading-tight text-light-text">
                        {p.name}
                      </p>
                      <p className="text-[10px] tabular-nums text-light-muted">
                        {p.price}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Body>
    </SceneCard>
  );
}

/**
 * Step 3, design: a grey theme grid gives way to the brand's own product
 * photography, a product line and the button.
 */
export function EcommerceDesignScene() {
  return (
    <SceneCard
      label="Homepage"
      aside={
        <Reading
          values={["Template", "Design"]}
          start={0.3}
          step={1.5}
          className={`${tag} text-light-muted`}
          finalClassName="text-light-text"
        />
      }
    >
      <Body>
        <Browser>
          {/* The theme: equal grey product boxes. */}
          <div className="absolute inset-0 grid grid-cols-3 gap-2 bg-light-surface p-3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <span className="block flex-1 rounded-[3px] bg-light-border" />
                <Line className="w-3/4 bg-light-border" />
              </div>
            ))}
          </div>
          <span
            className={`absolute right-2 top-2 rounded-full border border-light-border bg-light-bg px-2 py-0.5 ${tag} text-light-muted`}
            style={anim(play("wf-exit", 0.3, 1.3))}
          >
            Theme template
          </span>
          {/* The photography takes over. */}
          <div
            className="absolute inset-0 grid grid-cols-[3fr_2fr] gap-px bg-light-border"
            style={anim(play("wf-fade", 0.7, 1.5))}
          >
            <div className="relative">
              <Image
                src="/industries/ecommerce-retail.jpg"
                alt=""
                fill
                sizes="240px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-bg/40" />
            </div>
            <div className="relative">
              <Image
                src="/industries/clothing.jpg"
                alt=""
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>
          </div>
          <div className="absolute bottom-3 left-3 w-[55%]">
            <p
              className="font-display text-[15px] font-medium leading-tight text-white"
              style={anim(play("wf-rise", 0.45, 2.1))}
            >
              The gift box edit
            </p>
            <p
              className="mt-1 text-[11px] text-white/80"
              style={anim(play("wf-rise", 0.45, 2.35))}
            >
              Ships in two days
            </p>
            <span
              className="mt-2.5 inline-block rounded-[4px] bg-white px-2.5 py-1.5 text-[11px] font-medium text-bg"
              style={anim(play("wf-pop", 0.35, 2.7))}
            >
              Shop the drop
            </span>
          </div>
        </Browser>
      </Body>
    </SceneCard>
  );
}

/**
 * Step 4, checkout: a test order runs through cart, payment, shipping and
 * the order email, each ticking as it passes.
 */
export function EcommerceCheckoutScene() {
  const rows = [
    { icon: "cart", label: "Cart", detail: "2 items" },
    { icon: "card", label: "Payment", detail: "Card and Apple Pay" },
    { icon: "globe", label: "Shipping", detail: "UK and EU zones" },
    { icon: "send", label: "Order email", detail: "Sent to customer" },
  ];
  return (
    <SceneCard
      label="Checkout"
      aside={
        <Reading
          values={["Test order", "Passed"]}
          start={0.3}
          step={2.4}
          className={`${tag} text-light-muted`}
          finalClassName="text-positive-ink"
        />
      }
    >
      <Body className="flex flex-col gap-2">
        {rows.map((r, i) => (
          <div
            key={r.label}
            className={`flex h-[38px] items-center gap-2.5 ${item}`}
            style={anim(play("wf-slide", 0.35, 0.15 + i * 0.1))}
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[4px] border border-light-border bg-light-surface text-light-text">
              <FeatureIcon name={r.icon} className="h-3.5 w-3.5" />
            </span>
            <span className="font-medium">{r.label}</span>
            <span className="min-w-0 flex-1 truncate text-[11px] text-light-muted">
              {r.detail}
            </span>
            <Tick at={0.8 + i * 0.5} />
          </div>
        ))}
      </Body>
    </SceneCard>
  );
}
