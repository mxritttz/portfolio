"use client";

import React, { useMemo, useState } from "react";
import {
  IconBrandTelegram,
  IconChartBar,
  IconClipboardList,
  IconHeadset,
  IconMinus,
  IconPlus,
  IconSettings,
  IconShoppingBag,
} from "@tabler/icons-react";

type OrderStage = "new" | "confirmed" | "preparing" | "pickup" | "done";
type ViewMode = "orders" | "tracking" | "direct";

type OrderItem = {
  id: string;
  customer: string;
  phone: string;
  source: "Web" | "Telegram";
  pickupAt: string;
  elapsed: string;
  amount: string;
  aiConfidence: string;
  stage: OrderStage;
  items: string[];
};

type MenuItem = {
  id: string;
  name: string;
  price: number;
  tag: string;
  description: string;
};

const INITIAL_ORDERS: OrderItem[] = [
  {
    id: "WEB-118893-25",
    customer: "Test",
    phone: "+82929283",
    source: "Web",
    pickupAt: "01:03",
    elapsed: "00:28 · vor 2 Min",
    amount: "3.00 EUR",
    aiConfidence: "0%",
    stage: "pickup",
    items: ["1x Pommes klein"],
  },
  {
    id: "WEB-964113-10",
    customer: "Kay",
    phone: "+49176812344",
    source: "Telegram",
    pickupAt: "00:46",
    elapsed: "00:26 · 4 min ago",
    amount: "7.50 EUR",
    aiConfidence: "0%",
    stage: "preparing",
    items: ["1x Doner Kebab"],
  },
  {
    id: "WEB-500371-41",
    customer: "testest",
    phone: "+49151744100",
    source: "Web",
    pickupAt: "00:38",
    elapsed: "00:18 · 12 min ago",
    amount: "7.50 EUR",
    aiConfidence: "0%",
    stage: "new",
    items: ["1x Doner Kebab"],
  },
  {
    id: "WEB-450212-42",
    customer: "Ttt",
    phone: "+49176222891",
    source: "Telegram",
    pickupAt: "04:55",
    elapsed: "04:40 · 43 hrs ago",
    amount: "8.50 EUR",
    aiConfidence: "0%",
    stage: "confirmed",
    items: ["1x Durum", "1x Ayran"],
  },
];

const MENU: MenuItem[] = [
  {
    id: "doener-kebab",
    name: "Doner Kebab",
    price: 7.5,
    tag: "Bestseller",
    description: "Freshly grilled, house sauce, crisp salad.",
  },
  {
    id: "doener-teller",
    name: "Doner Plate",
    price: 9,
    tag: "Bestseller",
    description: "More meat, rice or fries, and a full portion.",
  },
  {
    id: "dueruem",
    name: "Durum",
    price: 8,
    tag: "Bestseller",
    description: "Wrapped for on-the-go, fast and uncomplicated.",
  },
];

const STAGE_META: Record<
  OrderStage,
  {
    label: string;
    className: string;
    next?: OrderStage;
    button: string;
  }
> = {
  new: {
    label: "New",
    className: "border-rose-400/25 bg-rose-400/10 text-rose-200",
    next: "confirmed",
    button: "Confirm",
  },
  confirmed: {
    label: "Confirmed",
    className: "border-amber-300/25 bg-amber-300/10 text-amber-100",
    next: "preparing",
    button: "Start Preparing",
  },
  preparing: {
    label: "Preparing",
    className: "border-sky-300/25 bg-sky-300/10 text-sky-100",
    next: "pickup",
    button: "Ready for Pickup",
  },
  pickup: {
    label: "Ready for Pickup",
    className: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
    next: "done",
    button: "Complete",
  },
  done: {
    label: "Completed",
    className: "border-white/10 bg-white/5 text-white/45",
    button: "Done",
  },
};

const ORDER_STAGE_SEQUENCE: OrderStage[] = ["new", "confirmed", "preparing", "pickup", "done"];

export default function RestaurantOps() {
  const [view, setView] = useState<ViewMode>("orders");
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [selectedOrderId, setSelectedOrderId] = useState(INITIAL_ORDERS[0].id);
  const [cart, setCart] = useState<Record<string, number>>({});

  const selectedOrder = orders.find((order) => order.id === selectedOrderId) ?? orders[0];

  const stats = useMemo(() => {
    const open = orders.filter((order) => order.stage !== "done").length;
    const done = orders.filter((order) => order.stage === "done").length;
    return {
      open,
      done,
      revenue: "94.00 EUR",
      aiConfidence: "67%",
      processing: "4.2 Min",
    };
  }, [orders]);

  const cartCount = Object.values(cart).reduce((sum, value) => sum + value, 0);
  const cartTotal = MENU.reduce((sum, item) => sum + item.price * (cart[item.id] ?? 0), 0);

  const advanceOrder = (id: string) => {
    setOrders((current) =>
      current.map((order) => {
        if (order.id !== id) return order;
        const next = STAGE_META[order.stage].next;
        return next ? { ...order, stage: next } : order;
      })
    );
  };

  const setOrderStage = (id: string, stage: OrderStage) => {
    setOrders((current) =>
      current.map((order) => (order.id === id ? { ...order, stage } : order))
    );
  };

  const updateCart = (id: string, delta: number) => {
    setCart((current) => {
      const next = Math.max(0, (current[id] ?? 0) + delta);
      return { ...current, [id]: next };
    });
  };

  const logoCard = (
    <div className="overflow-hidden rounded-[1.15rem] border border-white/10 bg-white/95 shadow-[0_12px_40px_rgba(0,0,0,0.22)]">
      <img
        src="/images/OrderlyLogo.png"
        alt="Orderly logo"
        className="h-16 w-auto object-contain md:h-20"
      />
    </div>
  );

  return (
    <div className="relative h-full w-full overflow-hidden bg-[radial-gradient(circle_at_left,rgba(249,115,22,0.16),transparent_28%),radial-gradient(circle_at_right,rgba(56,189,248,0.14),transparent_32%),linear-gradient(180deg,#07101f_0%,#02091a_46%,#041433_100%)] text-white">
      <div className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent)]" />
      <div className="relative z-10 flex h-full flex-col gap-4 p-5 md:p-6">
        <div className="self-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] font-medium tracking-[0.16em] text-white/55">
          *This is only a visual demo*
        </div>

        <div className="flex items-center justify-between gap-4">
          {logoCard}

          <div className="flex rounded-full border border-white/10 bg-black/20 p-1 shadow-[0_0_24px_rgba(29,78,216,0.14)]">
            {[
              { key: "orders", label: "Orders", icon: IconClipboardList },
              { key: "tracking", label: "Integrations", icon: IconChartBar },
              { key: "direct", label: "Direct Ordering", icon: IconShoppingBag },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => setView(key as ViewMode)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                  view === key
                    ? "bg-[#2563eb] text-white shadow-[0_0_18px_rgba(37,99,235,0.35)]"
                    : "text-white/72"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>

          <div className="rounded-full border border-white/10 bg-black/20 px-4 py-3 text-right">
            <div className="text-[10px] uppercase tracking-[0.28em] text-white/45">Tenant</div>
            <div className="mt-1 text-sm font-semibold text-white">Doener Palace (Berlin)</div>
          </div>
        </div>

        {view === "orders" && (
          <>
            <div className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(90deg,rgba(0,0,0,0.26),rgba(5,15,44,0.92))] px-5 py-4">
              <h2 className="text-4xl font-extrabold tracking-tight">Orders</h2>
              <p className="mt-1 text-base text-white/55">
                Overview of all incoming orders captured by the AI agent.
              </p>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {[
                { label: "Open Orders", value: stats.open, sub: "1 new", tone: "text-rose-300" },
                { label: "Revenue Today", value: stats.revenue, sub: "Completed orders", tone: "text-emerald-300" },
                { label: "AI Accuracy", value: stats.aiConfidence, sub: "Average confidence", tone: "text-sky-300" },
                { label: "Processing Time", value: stats.processing, sub: "From intake to confirmation", tone: "text-violet-300" },
              ].map((card) => (
                <div key={card.label} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
                  <div className="text-sm text-white/45">{card.label}</div>
                  <div className={`mt-4 text-4xl font-bold ${card.tone}`}>{card.value}</div>
                  <div className="mt-1 text-sm text-white/55">{card.sub}</div>
                </div>
              ))}
            </div>

            <div className="grid flex-1 grid-cols-[1.35fr_0.3fr] gap-4">
              <div className="space-y-3 overflow-y-auto pr-1">
                {orders.map((order) => {
                  const stage = STAGE_META[order.stage];
                  return (
                    <button
                      key={order.id}
                      type="button"
                      onClick={() => setSelectedOrderId(order.id)}
                      className={`w-full rounded-[1.6rem] border p-4 text-left transition ${
                        selectedOrderId === order.id
                          ? "border-sky-300/30 bg-[#0b1428]"
                          : "border-white/10 bg-white/[0.035]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <div className="text-[2rem] font-extrabold tracking-tight">{order.id}</div>
                            <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${stage.className}`}>
                              {stage.label}
                            </span>
                            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/55">
                              {order.source}
                            </span>
                          </div>
                          <div className="mt-2 text-lg font-semibold text-white">{order.customer}</div>
                          <div className="text-sm text-white/45">
                            {order.elapsed} · Pickup <span className="font-semibold text-white/70">{order.pickupAt}</span>
                          </div>
                          <div className="mt-1 text-sm text-white/45">
                            Location: <span className="font-semibold text-white/70">Legacy Main Location</span>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {order.items.map((item) => (
                              <span
                                key={item}
                                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/72"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-3">
                          <div className="text-right">
                            <div className="text-4xl font-extrabold">{order.amount}</div>
                            <div className="text-sm text-white/35">AI {order.aiConfidence}</div>
                          </div>
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              advanceOrder(order.id);
                            }}
                            disabled={!stage.next}
                            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10 disabled:opacity-40"
                          >
                            {stage.button}
                          </button>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {ORDER_STAGE_SEQUENCE.map((stageKey) => {
                          const stageMeta = STAGE_META[stageKey];
                          const isActive = order.stage === stageKey;
                          return (
                            <button
                              key={stageKey}
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation();
                                setOrderStage(order.id, stageKey);
                              }}
                              className={`rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                                isActive
                                  ? stageMeta.className
                                  : "border-white/10 bg-white/[0.03] text-white/48 hover:text-white/72"
                              }`}
                            >
                              {stageMeta.label}
                            </button>
                          );
                        })}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="rounded-[1.6rem] border border-white/10 bg-[#061124] p-4">
                <div className="text-[11px] uppercase tracking-[0.34em] text-white/45">
                  Selected Order
                </div>
                <div className="mt-4 text-3xl font-extrabold tracking-tight">{selectedOrder.id}</div>
                <div className="mt-1 text-sm text-white/55">
                  {selectedOrder.customer} · {selectedOrder.phone}
                </div>
                <div className="mt-5 space-y-3">
                  {selectedOrder.items.map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm"
                    >
                      <span>{item}</span>
                      <span>{selectedOrder.amount}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 border-t border-dashed border-white/10 pt-4">
                  <div className="flex items-center justify-between text-xl font-bold">
                    <span>Total</span>
                    <span>{selectedOrder.amount}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {view === "tracking" && (
          <div className="grid flex-1 grid-cols-[0.58fr_0.42fr] gap-4">
            <div className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(0,0,0,0.32),rgba(2,8,24,0.8))] p-6">
              <div className="flex items-center justify-between">
              {logoCard}
                <div className="rounded-[1.4rem] border border-white/10 bg-white/5 px-5 py-3 text-right">
                  <div className="text-2xl font-extrabold">Doener Palace</div>
                  <div className="text-sm text-white/45">Live Tracking</div>
                </div>
              </div>

              <div className="mt-6 rounded-[2rem] border border-white/10 bg-[linear-gradient(90deg,rgba(22,10,24,0.75),rgba(0,17,60,0.75))] p-6">
                <div className="text-6xl font-extrabold tracking-tight">{selectedOrder.id}</div>
                <div className="mt-4 text-2xl text-white/58">
                  Hallo {selectedOrder.customer}, hier ist dein aktueller Stand.
                </div>
                <div className="mt-5 inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-base font-semibold text-emerald-200">
                  Live Status
                </div>
                <div className="mt-6 max-w-md rounded-[1.5rem] border border-sky-300/20 bg-[#07142b] px-5 py-4">
                  <div className="text-[11px] uppercase tracking-[0.32em] text-sky-200/70">
                    Estimated Pickup
                  </div>
                  <div className="mt-2 text-4xl font-extrabold">in about 34 min</div>
                </div>

                <div className="mt-6 h-4 rounded-full bg-white/10">
                  <div className="h-4 w-[48%] rounded-full bg-[linear-gradient(90deg,#1da1f2,#2563eb,#10b981)]" />
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  {[
                    ["1", "Order received", "We have received your order.", true],
                    ["2", "Confirmed", "Your order has been accepted by the team.", true],
                    ["3", "Preparing", "The kitchen is currently working on your order.", false],
                    ["4", "Ready for pickup", "Almost done. You can head over soon.", false],
                  ].map(([step, title, copy, active]) => (
                    <div
                      key={String(title)}
                      className={`rounded-[1.5rem] border p-5 ${
                        active
                          ? "border-emerald-400/35 bg-emerald-400/10"
                          : "border-white/10 bg-[#07142b]"
                      }`}
                    >
                      <div className={`flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold ${active ? "bg-emerald-400 text-slate-950" : "bg-white/80 text-slate-700"}`}>
                        {step}
                      </div>
                      <div className="mt-4 text-2xl font-extrabold">{title}</div>
                      <div className="mt-2 text-lg text-white/55">{copy}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-5">
              <div className="text-[11px] uppercase tracking-[0.32em] text-white/45">Channels & Future</div>
              <div className="mt-4 space-y-4">
                <div className="rounded-[1.5rem] border border-white/10 bg-[#07142b] p-4">
                  <div className="flex items-center gap-2 text-lg font-semibold text-sky-100">
                    <IconBrandTelegram className="h-5 w-5" />
                    Telegram Bot
                  </div>
                  <div className="mt-3 text-sm leading-relaxed text-white/60">
                    Customers order or reserve through chat. Address details, time slots, and party
                    size all land in the same Orderly workflow.
                  </div>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-[#07142b] p-4">
                  <div className="flex items-center gap-2 text-lg font-semibold text-orange-100">
                    <IconHeadset className="h-5 w-5" />
                    AI Call Agent
                  </div>
                  <div className="mt-3 text-sm leading-relaxed text-white/60">
                    Planned next step: automatically answer phone calls, capture orders, reserve
                    tables, and hand everything off directly into Orderly.
                  </div>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-[#07142b] p-4">
                  <div className="flex items-center gap-2 text-lg font-semibold text-white">
                    <IconSettings className="h-5 w-5" />
                    Integrations
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-white/60">
                    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">Online Checkout</div>
                    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">Status Tracking</div>
                    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">Multi-tenant</div>
                    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">Kitchen Workflow</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {view === "direct" && (
          <div className="grid flex-1 grid-cols-[0.6fr_0.4fr] gap-4">
            <div className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(0,0,0,0.32),rgba(2,8,24,0.86))] p-5">
              <div className="flex items-center justify-between rounded-[1.5rem] border border-white/10 bg-white/[0.03] px-4 py-3">
                <div className="flex items-center gap-3">
                  {logoCard}
                  <div className="text-sm text-white/45">Orderly Direct · Order fast. Track live.</div>
                </div>
                <div className="rounded-[1.2rem] border border-white/10 bg-white/5 px-4 py-2 text-right">
                  <div className="text-xl font-bold">Doener Palace</div>
                  <div className="text-sm text-white/45">Berlin</div>
                </div>
              </div>

              <div className="mt-5 rounded-[2rem] border border-white/10 bg-[linear-gradient(90deg,rgba(0,0,0,0.35),rgba(1,13,52,0.85))] p-5">
                <div className="inline-flex rounded-full bg-orange-400/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-200">
                  Direct Ordering
                </div>
                <div className="mt-4 text-6xl font-extrabold leading-none tracking-tight">
                  Order fresh at Doener Palace
                </div>
                <div className="mt-4 max-w-3xl text-xl text-white/45">
                  Modern checkout, clear pickup timing, and live tracking right after submission.
                </div>
                <div className="mt-5 flex flex-wrap gap-3 text-sm">
                  {[
                    "Checkout in under 30 sec.",
                    "Live status after ordering",
                    "Guest or account",
                    "Fresh from Berlin",
                  ].map((pill) => (
                    <div
                      key={pill}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 font-semibold text-orange-100"
                    >
                      {pill}
                    </div>
                  ))}
                </div>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {[
                    ["10", "Items online"],
                    [String(cartCount), "Items in cart"],
                    ["18-22 Min", "Current pickup time"],
                  ].map(([value, label]) => (
                    <div key={label} className="rounded-[1.35rem] border border-white/10 bg-[#07142b] px-4 py-3">
                      <div className="text-3xl font-extrabold">{value}</div>
                      <div className="text-sm text-white/45">{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <div className="text-3xl font-extrabold">Doner</div>
                <div className="mt-1 text-base text-white/45">House classics for fast lunch and dinner service.</div>
              </div>

              <div className="mt-4 space-y-3">
                {MENU.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] px-4 py-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="text-[11px] uppercase tracking-[0.3em] text-orange-300">Doner</div>
                          <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-900">
                            {item.tag}
                          </span>
                        </div>
                        <div className="mt-2 text-3xl font-extrabold">{item.name}</div>
                        <div className="mt-2 text-lg text-white/48">{item.description}</div>
                      </div>
                      <div className="flex flex-col items-end gap-4">
                        <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-3xl font-extrabold">
                          {item.price.toFixed(2)} EUR
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => updateCart(item.id, -1)}
                            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#7c3f18] text-white"
                          >
                            <IconMinus className="h-4 w-4" />
                          </button>
                          <div className="w-6 text-center text-xl font-bold">{cart[item.id] ?? 0}</div>
                          <button
                            type="button"
                            onClick={() => updateCart(item.id, 1)}
                            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ff6b00] text-white"
                          >
                            <IconPlus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-white/10 bg-[#061124] p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="inline-flex rounded-full bg-orange-400/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-200">
                    Cart
                  </div>
                  <div className="mt-3 text-4xl font-extrabold">Your Order</div>
                </div>
                <div className="rounded-full bg-white/5 px-3 py-2 text-sm font-semibold text-white/75">
                  {cartCount} items
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3">
                  <div className="text-[11px] uppercase tracking-[0.28em] text-orange-300">Pickup</div>
                  <div className="mt-2 text-3xl font-extrabold">18-22 Min</div>
                </div>
                <div className="rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3">
                  <div className="text-[11px] uppercase tracking-[0.28em] text-orange-300">Total</div>
                  <div className="mt-2 text-3xl font-extrabold">{cartTotal.toFixed(2)} EUR</div>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-white/72">Guest</div>
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-white/40">Name</div>
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-white/40">+49 ...</div>
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-white/40">As soon as possible</div>
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-white/40">e.g. without onions</div>
              </div>

              <div className="mt-5 border-y border-dashed border-white/10 py-4">
                {cartCount === 0 ? (
                  <div className="text-base text-white/45">No items in the cart yet.</div>
                ) : (
                  <div className="space-y-2">
                    {MENU.filter((item) => (cart[item.id] ?? 0) > 0).map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-sm text-white/72">
                        <span>
                          {cart[item.id]}x {item.name}
                        </span>
                        <span>{(item.price * (cart[item.id] ?? 0)).toFixed(2)} EUR</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-5 flex items-center justify-between text-4xl font-extrabold">
                <span>Total</span>
                <span>{cartTotal.toFixed(2)} EUR</span>
              </div>

              <button
                type="button"
                onClick={() => setView("tracking")}
                className="mt-5 w-full rounded-[1.25rem] bg-[linear-gradient(90deg,#ff6b00,#f97316,#10b981)] px-4 py-4 text-xl font-extrabold text-white"
              >
                Submit order
              </button>
              <button
                type="button"
                onClick={() => setView("tracking")}
                className="mt-3 w-full text-center text-base font-semibold text-orange-300"
              >
                View demo tracking
              </button>

              <div className="mt-5 text-center text-sm leading-relaxed text-white/48">
                After submitting, you are taken directly to the live tracking page.
              </div>
            </div>
          </div>
        )}

        <div className="rounded-[1.35rem] border border-fuchsia-300/15 bg-fuchsia-300/[0.07] px-4 py-3 text-sm text-fuchsia-50/82">
          Next step: AI handles incoming phone calls automatically, creates orders, reserves tables,
          and routes everything directly into Orderly.
        </div>
      </div>
    </div>
  );
}
