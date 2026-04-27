// Trading Dashboard data, types, and simulation logic
// Self-contained module for the /prueba123 route

export const BASE_RESULTS = {
  initialCapital: 100000,
  finalCapital: 165890.36,
  totalPnl: 65890.36,
  totalPnlPct: 64.34,
  openPnl: 3923.27,
  openPnlPct: 2.42,
  netPnl: 61839.98,
  netPnlPct: 61.84,
  grossProfit: 110595.40,
  grossLoss: 48755.42,
  maxEquityDrawdown: 25517.42,
  maxEquityDrawdownPct: 17.02,
  totalTrades: 33,
  winningTrades: 18,
  losingTrades: 15,
  breakEvenTrades: 0,
  winRate: 54.55,
  profitFactor: 2.268,
  expectedPayoff: 1873.94,
  cagr: 27.22,
  avgWinningTrade: 6144.19,
  avgWinningTradePct: 16.43,
  avgLosingTrade: 3250.36,
  avgLosingTradePct: 7.94,
  largestWinningTrade: 11727.66,
  largestWinningTradePct: 29.54,
  largestLosingTrade: 4160.16,
  largestLosingTradePct: 9.19,
};

export const BASE_EQUITY_SERIES = [
  { month: "Apr '24", equity: 100000 },
  { month: "May '24", equity: 107500 },
  { month: "Jun '24", equity: 116000 },
  { month: "Jul '24", equity: 111500 },
  { month: "Aug '24", equity: 104000 },
  { month: "Sep '24", equity: 96000 },
  { month: "Oct '24", equity: 108500 },
  { month: "Nov '24", equity: 121000 },
  { month: "Dec '24", equity: 134500 },
  { month: "Jan '25", equity: 152000 },
  { month: "Feb '25", equity: 146500 },
  { month: "Mar '25", equity: 139500 },
  { month: "Apr '25", equity: 148000 },
  { month: "May '25", equity: 143000 },
  { month: "Jun '25", equity: 137000 },
  { month: "Jul '25", equity: 130000 },
  { month: "Aug '25", equity: 125000 },
  { month: "Sep '25", equity: 121000 },
  { month: "Oct '25", equity: 129000 },
  { month: "Nov '25", equity: 140000 },
  { month: "Dec '25", equity: 149000 },
  { month: "Jan '26", equity: 160000 },
  { month: "Feb '26", equity: 154000 },
  { month: "Mar '26", equity: 162500 },
  { month: "Apr '26", equity: 165890.36 },
];

export interface SimulatorInputs {
  initialCapital: number;
  totalTrades: number;
  winRate: number;
  includeOpenPnl: boolean;
}

export interface SimulatedResults {
  initialCapital: number;
  finalCapital: number;
  totalPnl: number;
  totalPnlPct: number;
  openPnl: number;
  openPnlPct: number;
  netPnl: number;
  netPnlPct: number;
  grossProfit: number;
  grossLoss: number;
  maxEquityDrawdown: number;
  maxEquityDrawdownPct: number;
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  breakEvenTrades: number;
  winRate: number;
  profitFactor: number;
  expectedPayoff: number;
  cagr: number;
  avgWinningTrade: number;
  avgWinningTradePct: number;
  avgLosingTrade: number;
  avgLosingTradePct: number;
  largestWinningTrade: number;
  largestWinningTradePct: number;
  largestLosingTrade: number;
  largestLosingTradePct: number;
}

export const DEFAULT_INPUTS: SimulatorInputs = {
  initialCapital: 100000,
  totalTrades: 33,
  winRate: 54.55,
  includeOpenPnl: true,
};

function isDefault(inputs: SimulatorInputs): boolean {
  return (
    inputs.initialCapital === DEFAULT_INPUTS.initialCapital &&
    inputs.totalTrades === DEFAULT_INPUTS.totalTrades &&
    Math.abs(inputs.winRate - DEFAULT_INPUTS.winRate) < 0.01 &&
    inputs.includeOpenPnl === DEFAULT_INPUTS.includeOpenPnl
  );
}

export function simulateResults(inputs: SimulatorInputs): SimulatedResults {
  if (isDefault(inputs)) {
    return { ...BASE_RESULTS };
  }

  const { initialCapital, totalTrades, winRate, includeOpenPnl } = inputs;
  const capitalMultiplier = initialCapital / 100000;

  const avgWinUsd = BASE_RESULTS.avgWinningTrade * capitalMultiplier;
  const avgLossUsd = BASE_RESULTS.avgLosingTrade * capitalMultiplier;

  const winningTrades = Math.round(totalTrades * (winRate / 100));
  const losingTrades = totalTrades - winningTrades;

  const grossProfit = winningTrades * avgWinUsd;
  const grossLoss = losingTrades * avgLossUsd;
  const netPnl = grossProfit - grossLoss;

  const openPnl = includeOpenPnl ? BASE_RESULTS.openPnl * capitalMultiplier : 0;
  const totalPnl = netPnl + openPnl;
  const finalCapital = initialCapital + totalPnl;

  const totalPnlPct = (totalPnl / initialCapital) * 100;
  const netPnlPct = (netPnl / initialCapital) * 100;
  const profitFactor = grossLoss > 0 ? grossProfit / grossLoss : grossProfit;
  const expectedPayoff = totalTrades > 0 ? netPnl / totalTrades : 0;

  const maxEquityDrawdown = BASE_RESULTS.maxEquityDrawdown * capitalMultiplier * Math.sqrt(totalTrades / BASE_RESULTS.totalTrades);
  const maxEquityDrawdownPct = BASE_RESULTS.maxEquityDrawdownPct * Math.sqrt(totalTrades / BASE_RESULTS.totalTrades);

  const cagr = finalCapital > 0 ? (Math.pow(finalCapital / initialCapital, 1 / 2) - 1) * 100 : 0;
  const openPnlPct = includeOpenPnl ? (openPnl / initialCapital) * 100 : 0;

  return {
    initialCapital, finalCapital, totalPnl, totalPnlPct,
    openPnl, openPnlPct, netPnl, netPnlPct,
    grossProfit, grossLoss, maxEquityDrawdown, maxEquityDrawdownPct,
    totalTrades, winningTrades, losingTrades, breakEvenTrades: 0, winRate,
    profitFactor, expectedPayoff, cagr,
    avgWinningTrade: avgWinUsd, avgWinningTradePct: BASE_RESULTS.avgWinningTradePct,
    avgLosingTrade: avgLossUsd, avgLosingTradePct: BASE_RESULTS.avgLosingTradePct,
    largestWinningTrade: BASE_RESULTS.largestWinningTrade * capitalMultiplier,
    largestWinningTradePct: BASE_RESULTS.largestWinningTradePct,
    largestLosingTrade: BASE_RESULTS.largestLosingTrade * capitalMultiplier,
    largestLosingTradePct: BASE_RESULTS.largestLosingTradePct,
  };
}

export function getScaledEquitySeries(inputs: SimulatorInputs, results: SimulatedResults) {
  const tradeMultiplier = inputs.totalTrades / BASE_RESULTS.totalTrades;
  const winRateRatio = inputs.winRate / BASE_RESULTS.winRate;

  // Helper: compute equity at a given index
  const equityAt = (idx: number): number => {
    if (idx === 0) return inputs.initialCapital;
    // baseReturn is already a percentage (e.g., 0.075 = 7.5%)
    const baseReturn = (BASE_EQUITY_SERIES[idx].equity - 100000) / 100000;
    const adjustedReturn = baseReturn * Math.sqrt(tradeMultiplier) * winRateRatio;
    return inputs.initialCapital * (1 + adjustedReturn);
  };

  return BASE_EQUITY_SERIES.map((point, i) => {
    if (i === 0) return { ...point, equity: inputs.initialCapital, monthlyPnl: 0 };

    // Last point snaps to the calculated finalCapital for consistency
    const equity = (i === BASE_EQUITY_SERIES.length - 1)
      ? results.finalCapital
      : Math.round(equityAt(i) * 100) / 100;

    const prevEquity = equityAt(i - 1);
    const monthlyPnl = Math.round((equity - prevEquity) * 100) / 100;

    return { ...point, equity, monthlyPnl };
  });
}

export function formatUsd(value: number, decimals = 2): string {
  return Math.abs(value).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export function formatPct(value: number, decimals = 2): string {
  return value.toFixed(decimals) + '%';
}
