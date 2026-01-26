"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";

/* ---------------- CONFIG & TYPES ---------------- */

interface Asset {
  id: string;
  name: string;
  startPrice: number;
}

interface Trade {
  id: number;
  type: "BUY" | "SELL" | "LIQUIDATION";
  asset: string;
  units: number;
  price: number;
  leverage: number;
  time: number;
  notes?: string;
}

interface TimelinePoint {
  t: number;
  value: number;
  friends: number[]; // two friends max shown
}

interface Position {
  units: number;
  invested: number; // user's equity
  borrowed: number; // debt
}

const ASSETS: Asset[] = [
  { id: "BTC", name: "Bitcoin", startPrice: 30000 },
  { id: "ETH", name: "Ethereum", startPrice: 1800 },
  { id: "AAPL", name: "Apple", startPrice: 165 },
];

const FRIENDS = [
  { id: "lucas", name: "Lucas", color: "#f97316" },
  { id: "maria", name: "Maria", color: "#8b5cf6" },
  { id: "ahmed", name: "Ahmed", color: "#06b6d4" },
];

const MAX_FRIENDS_TO_SHOW = 2;
const TICK_MS = 2200;
const TIMELINE_MAX_POINTS = 40;
const STORAGE_KEY = "fancy_trading_demo_v3";

/* ---------------- HELPERS ---------------- */

const formatCurrency = (n: number) =>
  Number.isFinite(n) ? (n >= 1000 ? `$${(n / 1000).toFixed(2)}k` : `$${n.toFixed(2)}`) : "$0.00";

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

function nextPrice(prev: number): number {
  const vol = 0.03;
  const drift = 1 + (Math.random() - 0.5) * vol;
  return Math.max(0.01, parseFloat((prev * drift).toFixed(2)));
}

function loadState(): any | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function saveState(state: any) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

/* ---------------- COMPONENT ---------------- */

const TradingApp: React.FC = () => {
  // prices
  const [prices, setPrices] = useState<Record<string, number>>(() =>
    Object.fromEntries(ASSETS.map((a) => [a.id, a.startPrice]))
  );

  const loaded = useMemo(() => loadState(), []);
  // positions per asset
  const [positions, setPositions] = useState<Record<string, Position>>(() =>
    (loaded && loaded.positions) ||
    Object.fromEntries(ASSETS.map((a) => [a.id, { units: 0, invested: 0, borrowed: 0 }]))
  );

  const [cash, setCash] = useState<number>(() => (loaded && loaded.cash) || 7000);
  const [trades, setTrades] = useState<Trade[]>(() => (loaded && loaded.trades) || []);
  const [timeline, setTimeline] = useState<TimelinePoint[]>(
    () => (loaded && loaded.timeline) || [{ t: Date.now(), value: (loaded && loaded.initial) || 7000, friends: (loaded && loaded.friends) || [7000, 7000] }]
  );

  const [friendsTimeline, setFriendsTimeline] = useState<number[]>(
    () => (loaded && loaded.friends) || FRIENDS.slice(0, MAX_FRIENDS_TO_SHOW).map((_, i) => 7000 + (i + 1) * 400 * (Math.random() - 0.3))
  );

  // UI state
  const [selectedAsset, setSelectedAsset] = useState<string>(ASSETS[0].id);
  const [amountUnits, setAmountUnits] = useState<string>("");
  const [tab, setTab] = useState<"BUY" | "SELL">("BUY");
  const [leverage, setLeverage] = useState<number>(1);
  const [tradeToast, setTradeToast] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  // balance animation (simple)
  const [displayedCash, setDisplayedCash] = useState<number>(cash);

  // persist state
  useEffect(() => {
    saveState({ positions, cash, trades, timeline, friends: friendsTimeline, initial: timeline[0]?.value || cash });
  }, [positions, cash, trades, timeline, friendsTimeline]);

  // smooth cash counter
  useEffect(() => {
    let raf = 0;
    const start = displayedCash;
    const end = cash;
    const dur = 400;
    const startT = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - startT) / dur);
      const val = start + (end - start) * p;
      setDisplayedCash(val);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [cash]);

  // helper: compute total portfolio value (positions market value + cash)
  const portfolioMarketValue = useMemo(() => {
    const posValue = ASSETS.reduce((sum, a) => {
      const p = positions[a.id];
      const price = prices[a.id] || a.startPrice;
      return sum + (p?.units || 0) * price;
    }, 0);
    return posValue + cash;
  }, [positions, prices, cash]);

  // timeline update & price tick, also handle liquidation checking
  useEffect(() => {
    const id = setInterval(() => {
      // update prices
      setPrices((prev) => {
        const updated: Record<string, number> = { ...prev };
        ASSETS.forEach((a) => {
          updated[a.id] = nextPrice(prev[a.id]);
        });
        return updated;
      });
    }, TICK_MS);

    return () => clearInterval(id);
  }, []);

  // Recompute timeline and check liquidation whenever prices or positions/cash change
  useEffect(() => {
    // Update friends
    const newFriends = friendsTimeline.map((v) => clamp(v * (1 + (Math.random() - 0.5) * 0.02), 200, 200000));
    setFriendsTimeline(newFriends);

    // Check liquidation per position
    const updatedPositions = { ...positions };
    let liquidations: string[] = [];

    ASSETS.forEach((a) => {
      const pos = updatedPositions[a.id];
      if (!pos || pos.units <= 0) return;
      const price = prices[a.id] || a.startPrice;
      const totalValue = pos.units * price;
      const equity = totalValue - pos.borrowed;
      if (equity <= 0) {
        // liquidate: remove position, do not return equity (equity <=0)
        liquidations.push(a.id);
        // record trade
        setTrades((t) => [
          ...t,
          { id: t.length + 1, type: "LIQUIDATION", asset: a.id, units: pos.units, price, leverage: pos.borrowed > 0 ? Math.max(1, Math.round((pos.borrowed + pos.invested) / Math.max(1, pos.invested || 1))) : 1, time: Date.now(), notes: "Liquidated" },
        ]);
        updatedPositions[a.id] = { units: 0, invested: 0, borrowed: 0 };
      }
    });

    if (liquidations.length > 0) {
      doToast(`❌ Liquidated: ${liquidations.join(", ")}`);
      setPositions(updatedPositions);
    }

    // update timeline
    const portfolioValue = ASSETS.reduce((sum, a) => {
      const p = positions[a.id];
      const price = prices[a.id] || a.startPrice;
      return sum + (p?.units || 0) * price;
    }, cash);

    setTimeline((prev) => {
      const next = [...prev, { t: Date.now(), value: portfolioValue, friends: newFriends }];
      if (next.length > TIMELINE_MAX_POINTS) next.shift();
      return next;
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prices, positions, cash]);

  /* ----------------- Derived / helpers ----------------- */

  const initialNet = timeline[0]?.value || 7000;
  const profit = portfolioMarketValue - initialNet;
  const profitPct = (profit / initialNet) * 100;

  // parse typed units
  const typedUnits = parseFloat(amountUnits || "0") || 0;
  const currentPrice = prices[selectedAsset] || ASSETS.find(a => a.id === selectedAsset)!.startPrice;
  const costPreview = typedUnits * currentPrice;
  const equityNeeded = leverage > 0 ? costPreview / leverage : costPreview; // user's cash required
  const borrowedWould = Math.max(0, costPreview - equityNeeded);
  const positionSize = costPreview; // total position value (units*price)
  const sellPossible = (positions[selectedAsset]?.units || 0) >= typedUnits && typedUnits > 0;

  // per-asset PnL (based on position invested & borrowed)
  const assetPnL = (assetId: string) => {
    const pos = positions[assetId];
    if (!pos || pos.units <= 0) return { avgEntry: 0, pnl: 0 };
    const totalCost = pos.invested + pos.borrowed; // total position notional previously acquired
    const avgEntry = totalCost / pos.units;
    const current = (prices[assetId] || ASSETS.find(a=>a.id===assetId)!.startPrice) * pos.units;
    const pnl = current - totalCost;
    return { avgEntry, pnl };
  };

  const shownFriends = FRIENDS.slice(0, MAX_FRIENDS_TO_SHOW);

  const topGainer = useMemo(() => {
    let best = ASSETS[0];
    let bestPct = -Infinity;
    ASSETS.forEach(a => {
      const pct = ((prices[a.id] - a.startPrice) / a.startPrice) * 100;
      if (pct > bestPct) { bestPct = pct; best = a; }
    });
    return { asset: best, pct: bestPct };
  }, [prices]);

  /* ----------------- Actions ----------------- */

  function doToast(text: string) {
    setTradeToast(text);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setTradeToast(null), 3000);
  }

  function recordTrade(trade: Trade) {
    setTrades((t) => [...t, trade]);
  }

  // Buy with leverage logic
  function buyWithLeverage(assetId: string, units: number, L: number) {
    if (units <= 0) return;
    const price = prices[assetId] || ASSETS.find(a => a.id === assetId)!.startPrice;
    const cost = units * price; // total position
    const equityRequired = cost / L; // user's cash to put up
    if (equityRequired > cash) {
      alert("Not enough cash for this leveraged buy.");
      return;
    }

    // borrowed amount
    const borrowed = cost - equityRequired;

    // update positions: if existing position, combine proportionally
    setPositions((prev) => {
      const prevPos = prev[assetId] || { units: 0, invested: 0, borrowed: 0 };
      // new totals
      const newUnits = prevPos.units + units;
      const newInvested = prevPos.invested + equityRequired;
      const newBorrowed = prevPos.borrowed + borrowed;
      return { ...prev, [assetId]: { units: newUnits, invested: newInvested, borrowed: newBorrowed } };
    });

    // deduct cash (user only pays equityRequired)
    setCash((c) => +(c - equityRequired).toFixed(2));

    // record trade
    recordTrade({
      id: trades.length + 1,
      type: "BUY",
      asset: assetId,
      units,
      price,
      leverage: L,
      time: Date.now(),
    });

    doToast(`Bought ${units} ${assetId} (${L}x)`);
  }

  // Sell logic (partial or full)
  function sellAsset(assetId: string, unitsToSell: number) {
    if (unitsToSell <= 0) return;
    const pos = positions[assetId];
    if (!pos || pos.units <= 0) return;
    if (unitsToSell > pos.units) return alert("Not enough units to sell.");

    const price = prices[assetId] || ASSETS.find(a => a.id === assetId)!.startPrice;
    const sellValue = unitsToSell * price;

    // proportion of position sold
    const fraction = unitsToSell / pos.units;

    // reduce debt and invested proportionally
    const debtReduced = +(pos.borrowed * fraction);
    const investedReduced = +(pos.invested * fraction);

    // proceeds to user = sellValue - debtReduced (repay borrowed portion first)
    const proceeds = +(sellValue - debtReduced);

    // update position
    const remainingUnits = +(pos.units - unitsToSell);
    const remainingBorrowed = +(pos.borrowed - debtReduced);
    const remainingInvested = +(pos.invested - investedReduced);

    const updatedPositions = { ...positions };
    if (remainingUnits <= 1e-12) {
      // fully closed
      updatedPositions[assetId] = { units: 0, invested: 0, borrowed: 0 };
    } else {
      updatedPositions[assetId] = { units: remainingUnits, invested: remainingInvested, borrowed: remainingBorrowed };
    }
    setPositions(updatedPositions);

    // add proceeds to cash
    setCash((c) => +(c + proceeds).toFixed(2));

    // record trade
    recordTrade({
      id: trades.length + 1,
      type: "SELL",
      asset: assetId,
      units: unitsToSell,
      price,
      leverage: pos.borrowed > 0 ? Math.max(1, Math.round((pos.invested + pos.borrowed) / Math.max(1, pos.invested || 1))) : 1,
      time: Date.now(),
    });

    doToast(`Sold ${unitsToSell} ${assetId}`);
  }

  // Sell entire position (sell all)
  function sellAllAsset(assetId: string) {
    const pos = positions[assetId];
    if (!pos || pos.units <= 0) return;
    sellAsset(assetId, pos.units);
  }

  // Force liquidate (called internally if equity <= 0) - we already handle via timeline check,
  // but expose to UI maybe later
  function forceLiquidate(assetId: string) {
    const pos = positions[assetId];
    if (!pos || pos.units <= 0) return;
    const price = prices[assetId] || ASSETS.find(a => a.id === assetId)!.startPrice;
    // remove position
    setPositions((prev) => ({ ...prev, [assetId]: { units: 0, invested: 0, borrowed: 0 } }));
    // record trade
    recordTrade({
      id: trades.length + 1,
      type: "LIQUIDATION",
      asset: assetId,
      units: pos.units,
      price,
      leverage: pos.borrowed > 0 ? Math.max(1, Math.round((pos.invested + pos.borrowed) / Math.max(1, pos.invested || 1))) : 1,
      time: Date.now(),
      notes: "Manual liquidation",
    });
    doToast(`❌ Liquidated ${assetId}`);
  }

  function resetDemo() {
    if (!confirm("Reset demo?")) return;
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  }

  /* ----------------- Chart Component ----------------- */

  const Chart: React.FC<{ data: TimelinePoint[]; friendsData: number[][] }> = ({ data, friendsData }) => {
    const width = 760;
    const height = 220;
    if (!data || data.length === 0) return null;

    const values = data.map(d => d.value);
    const friendVals = friendsData.flat();
    const max = Math.max(...values, ...friendVals, 1);
    const min = Math.min(...values, ...friendVals, 0);
    const pad = (max - min) * 0.12 || 1;

    const mapX = (i: number) => (i / (data.length - 1 || 1)) * width;
    const mapY = (v: number) => {
      const norm = (v - (min - pad)) / ((max + pad) - (min - pad));
      return height - norm * height;
    };

    const myPoints = data.map((p, i) => `${mapX(i)},${mapY(p.value)}`).join(" ");
    const friendPoints = friendsData.map(arr => arr.map((v, i) => `${mapX(i)},${mapY(v)}`).join(" "));

    return (
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} className="rounded-xl bg-gradient-to-b from-slate-900/80 to-slate-900/40 p-2">
        {/* vertical grid */}
        {Array.from({ length: 6 }).map((_, i) => <line key={`v${i}`} x1={(i/5)*width} x2={(i/5)*width} y1={0} y2={height} stroke="rgba(255,255,255,0.03)"/>)}
        {/* horizontal lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((g, idx) => <line key={idx} x1={0} x2={width} y1={g*height} y2={g*height} stroke="rgba(255,255,255,0.03)"/>)}

        {/* friends lines (thin) */}
        {friendPoints.map((pts, idx) => (
          <polyline key={idx} points={pts} fill="none" stroke={shownFriends[idx]?.color ?? "#888"} strokeOpacity={0.35} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        ))}

        {/* my line (glow) */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <polyline points={myPoints} fill="none" stroke="#06b6d4" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" style={{filter: 'url(#glow)'}} />

        {/* points */}
        {data.map((p, i) => (
          <circle key={i} cx={mapX(i)} cy={mapY(p.value)} r={3} fill="#06b6d4" />
        ))}
      </svg>
    );
  };

  /* ----------------- UI ----------------- */

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* header */}
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">OINK</h1>
          <p className="text-sm text-slate-400">Crypto & Stocks · Simulated</p>
        </div>

        <div className="text-right">
          <div className="text-xs text-slate-400">Cash</div>
          <div className="text-lg font-semibold">
            <span className="inline-block w-36 text-right">{formatCurrency(displayedCash)}</span>
          </div>
        </div>
      </header>

      {/* top widgets */}
      <div className="grid grid-cols-12 gap-4 mb-6">
        <div className="col-span-12 lg:col-span-3 bg-slate-800/50 rounded-xl p-4">
          <div className="text-xs text-slate-400">Portfolio</div>
          <div className={`text-2xl font-bold ${portfolioMarketValue - initialNet >= 0 ? "text-emerald-400" : "text-rose-400"}`}>{formatCurrency(portfolioMarketValue)}</div>
          <div className="text-xs text-slate-400">{portfolioMarketValue - initialNet >= 0 ? "+" : ""}{(portfolioMarketValue - initialNet).toFixed(2)} ({(((portfolioMarketValue - initialNet)/initialNet)*100).toFixed(2)}%)</div>
        </div>

        <div className="col-span-12 lg:col-span-3 bg-slate-800/50 rounded-xl p-4">
          <div className="text-xs text-slate-400">Top Gainer</div>
          <div className="text-lg font-semibold">{topGainer.asset.id} <span className="text-xs text-slate-400">({topGainer.pct.toFixed(2)}%)</span></div>
          <div className="text-xs text-slate-400">{topGainer.asset.name}</div>
        </div>

        <div className="col-span-12 lg:col-span-6 bg-slate-800/50 rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400">Market Heat</div>
            <div className="w-60 h-3 bg-white/5 rounded overflow-hidden mt-2">
              <div style={{ width: `${clamp((portfolioMarketValue / Math.max(...timeline.map(t=>t.value))) * 100, 5, 100)}%` }} className="h-3 bg-gradient-to-r from-emerald-400 to-amber-400" />
            </div>
          </div>
          <div className="text-xs text-slate-400">Friends: {shownFriends.map(f=>f.name).join(", ")}</div>
        </div>
      </div>

      {/* main */}
      <main className="grid grid-cols-12 gap-6">
        {/* left panel */}
        <section className="col-span-12 lg:col-span-5 bg-slate-800/40 p-4 rounded-xl space-y-4 shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Trade</h2>
            <div className="flex gap-2 bg-slate-900/30 p-1 rounded">
              <button onClick={() => setTab("BUY")} className={`px-3 py-1 rounded ${tab==="BUY" ? "bg-emerald-600" : ""}`}>Buy</button>
              <button onClick={() => setTab("SELL")} className={`px-3 py-1 rounded ${tab==="SELL" ? "bg-rose-600" : ""}`}>Sell</button>
            </div>
          </div>

          {/* market list */}
          <div className="space-y-2">
            {ASSETS.map(a => (
              <div key={a.id} className="flex items-center justify-between p-2 rounded hover:bg-slate-700/30">
                <div>
                  <div className="font-medium">{a.id} <span className="text-xs text-slate-400">{a.name}</span></div>
                  <div className="text-xs text-slate-400">Price {formatCurrency(prices[a.id])}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Position</div>
                  <div className="font-semibold">{(positions[a.id]?.units || 0).toFixed(4)}</div>
                </div>
              </div>
            ))}
          </div>

          {/* form */}
          <div className="border-t border-slate-700/50 pt-4 mt-4">
            <div className="flex items-center gap-2">
              <select value={selectedAsset} onChange={(e)=>setSelectedAsset(e.target.value)} className="bg-slate-900/50 px-3 py-2 rounded">
                {ASSETS.map(a=> <option key={a.id} value={a.id}>{a.id}</option>)}
              </select>

              <input value={amountUnits} onChange={(e)=>setAmountUnits(e.target.value)} placeholder="units" className="bg-slate-900/50 px-3 py-2 rounded w-full" />
            </div>

            {/* leverage */}
            <div className="mt-3 flex items-center gap-2">
              <div className="text-xs text-slate-400">Leverage</div>
              {[1,2,5,10].map(l => (
                <button key={l} onClick={()=>setLeverage(l)} className={`px-2 py-1 rounded ${leverage===l ? "bg-slate-700" : "bg-slate-900/30"}`}>{l}x</button>
              ))}
              <div className="ml-auto text-xs text-slate-400">Position: <span className="font-semibold">{formatCurrency(positionSize)}</span></div>
            </div>

            {/* preview */}
            <div className="mt-3 p-3 bg-slate-900/40 rounded">
              <div className="text-xs text-slate-400">Preview</div>
              {tab === "BUY" ? (
                <>
                  <div className="flex justify-between"><div>Units</div><div className="font-semibold">{typedUnits}</div></div>
                  <div className="flex justify-between"><div>Price</div><div className="font-semibold">{formatCurrency(currentPrice)}</div></div>
                  <div className="flex justify-between"><div>Total cost</div><div className="font-semibold">{formatCurrency(costPreview)}</div></div>
                  <div className="flex justify-between"><div>Your cash required ({leverage}x)</div><div className="font-semibold">{formatCurrency(equityNeeded)}</div></div>
                  <div className="flex justify-between"><div>Borrowed</div><div className="font-semibold">{formatCurrency(borrowedWould)}</div></div>
                </>
              ) : (
                <>
                  <div className="flex justify-between"><div>Units to sell</div><div className="font-semibold">{typedUnits}</div></div>
                  <div className="flex justify-between"><div>Estimated revenue</div><div className="font-semibold">{formatCurrency(typedUnits * currentPrice)}</div></div>
                  <div className="text-xs text-slate-400">You own: {(positions[selectedAsset]?.units||0).toFixed(4)} units</div>
                </>
              )}
            </div>

            <div className="mt-3 flex gap-2">
              {tab==="BUY" ? (
                <button onClick={()=>buyWithLeverage(selectedAsset, typedUnits, leverage)} className="flex-1 bg-emerald-500 py-2 rounded font-medium">Buy</button>
              ) : (
                <>
                  <button onClick={()=>sellAsset(selectedAsset, typedUnits)} className="flex-1 bg-rose-500 py-2 rounded font-medium" disabled={!sellPossible}>Sell</button>
                  <button onClick={()=>sellAllAsset(selectedAsset)} className="px-4 py-2 bg-rose-700/70 rounded">Sell All</button>
                </>
              )}
              <button onClick={()=>{ setAmountUnits(''); }} className="px-4 py-2 bg-slate-900/30 rounded">Clear</button>
            </div>
          </div>

          {/* sell tab breakdown */}
          {tab==="SELL" && (
            <div className="border-t border-slate-700/50 pt-4 mt-4">
              <h3 className="font-medium mb-2">Your Assets</h3>
              <div className="space-y-2">
                {ASSETS.map(a => {
                  const pos = positions[a.id] || { units: 0, invested: 0, borrowed: 0 };
                  const units = pos.units;
                  const totalValue = units * (prices[a.id] || a.startPrice);
                  const totalCost = pos.invested + pos.borrowed;
                  const avgEntry = units > 0 ? totalCost / units : 0;
                  const pnl = totalValue - totalCost;
                  return (
                    <div key={a.id} className="flex items-center justify-between p-2 rounded hover:bg-slate-700/30">
                      <div>
                        <div className="font-medium">{a.id}</div>
                        <div className="text-xs text-slate-400">Avg entry: {avgEntry ? formatCurrency(avgEntry) : "-"}</div>
                        {pos.borrowed > 0 && <div className="text-xs text-amber-400">Leverage: {((pos.invested + pos.borrowed) / Math.max(1, pos.invested || 1)).toFixed(1)}x</div>}
                      </div>
                      <div className="text-right">
                        <div className="text-sm">{units.toFixed(4)} units</div>
                        <div className={`font-semibold ${pnl>=0 ? "text-emerald-400" : "text-rose-400"}`}>{formatCurrency(pnl)}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* trade history small */}
          <div className="border-t border-slate-700/50 pt-4 mt-4 text-sm">
            <div className="flex items-center justify-between">
              <div className="font-medium">Trade History</div>
              <div className="flex items-center gap-2">
                <button onClick={()=>{ setTrades([]); localStorage.removeItem(STORAGE_KEY); }} className="text-xs text-slate-400 hover:underline">Clear</button>
                <button onClick={()=>{ setPositions(Object.fromEntries(ASSETS.map(a=>[a.id,{units:0,invested:0,borrowed:0}]))); setTrades([]); localStorage.removeItem(STORAGE_KEY); }} className="text-xs text-slate-400 hover:underline">Reset Positions</button>
              </div>
            </div>
            <div className="max-h-40 overflow-y-auto mt-2 space-y-2">
              {trades.slice().reverse().map(t => (
                <div key={t.id} className="flex justify-between px-2 py-1 rounded hover:bg-slate-700/20">
                  <div>
                    <div className="font-medium">{t.type} {t.asset} {t.units} {t.leverage ? `(${t.leverage}x)` : ""}</div>
                    <div className="text-xs text-slate-400">{new Date(t.time).toLocaleTimeString()} {t.notes ? `· ${t.notes}` : ""}</div>
                  </div>
                  <div className="font-semibold">{formatCurrency(t.price)}</div>
                </div>
              ))}
              {trades.length===0 && <div className="text-sm text-slate-400">No trades yet</div>}
            </div>
          </div>
        </section>

        {/* right: chart + holdings */}
        <section className="col-span-12 lg:col-span-7 space-y-4">
          <div className="bg-slate-800/40 p-4 rounded-xl shadow">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-lg">Portfolio Value</h3>
                <p className="text-sm text-slate-400">You vs friends</p>
              </div>
              <div className="text-right">
                <div className={`text-lg font-bold ${portfolioMarketValue - initialNet >= 0 ? "text-emerald-400" : "text-rose-400"}`}>{formatCurrency(portfolioMarketValue)}</div>
                <div className="text-xs text-slate-400">{portfolioMarketValue - initialNet >= 0 ? "+" : ""}{(portfolioMarketValue - initialNet).toFixed(2)} ({(((portfolioMarketValue - initialNet)/initialNet)*100).toFixed(2)}%)</div>
              </div>
            </div>

            <Chart data={timeline} friendsData={timeline.map(p=>p.friends.slice(0,MAX_FRIENDS_TO_SHOW))} />
          </div>

          <div className="bg-slate-800/40 p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-3">Holdings</h3>
            <div className="grid grid-cols-12 gap-2 text-sm">
              <div className="col-span-3 text-slate-400">Asset</div>
              <div className="col-span-3 text-slate-400">Units</div>
              <div className="col-span-3 text-slate-400">Price</div>
              <div className="col-span-3 text-slate-400">Value</div>

              {ASSETS.map(a => (
                <React.Fragment key={a.id}>
                  <div className="col-span-3 font-medium">{a.id}</div>
                  <div className="col-span-3">{(positions[a.id]?.units||0).toFixed(4)}</div>
                  <div className="col-span-3">{formatCurrency(prices[a.id])}</div>
                  <div className="col-span-3 font-semibold">{formatCurrency((positions[a.id]?.units||0)*prices[a.id])}</div>
                </React.Fragment>
              ))}
            </div>

            <div className="border-t border-slate-700/50 mt-4 pt-4 flex justify-between items-center">
              <div>
                <div className="text-xs text-slate-400">Net Worth</div>
                <div className="text-lg font-semibold">{formatCurrency(portfolioMarketValue)}</div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={resetDemo} className="text-sm text-rose-400 hover:underline">Reset demo</button>
                <button onClick={() => {
                  // sell everything across all assets
                  ASSETS.forEach(a => {
                    const p = positions[a.id];
                    if (p && p.units > 0) sellAsset(a.id, p.units);
                  });
                }} className="text-sm text-emerald-400 hover:underline">Sell Everything</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* toast */}
      {tradeToast && (
        <div className="fixed right-6 bottom-6 bg-slate-900/80 backdrop-blur py-3 px-4 rounded-lg shadow-lg animate-fade-in">
          <div className="font-medium">{tradeToast}</div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 240ms ease; }
      `}</style>
    </div>
  );
};

export default TradingApp;
