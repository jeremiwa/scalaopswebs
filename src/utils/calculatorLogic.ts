export type CalculatorData = {
  industry: string;
  dailyLeads: number;
  averageTicket: number;
  closeRateRange: number;
  responseDelayRate: number;
  followUpRate: number;
  crmRate: number;
  afterHoursRate: number;
};

export type CalculatorResult = {
  monthlyLeads: number;
  currentEstimatedRevenue: number;
  rawLeakageRate: number;
  leakageRate: number;
  baseMonthlyLoss: number;
  monthlyLossLow: number;
  monthlyLossHigh: number;
  annualLossLow: number;
  annualLossHigh: number;
  recoverableLow: number;
  recoverableHigh: number;
  finalScore: number;
  riskLevel: 'baja' | 'moderada' | 'alta' | 'crítica';
  mainLeak: string;
  benchmark: number;
};

export function calculateLeakage(data: CalculatorData): CalculatorResult {
  const monthlyLeads = data.dailyLeads * 30;
  const currentEstimatedRevenue = monthlyLeads * data.averageTicket * data.closeRateRange;

  // Formula ponderada
  const rawLeakageRate = 
    data.responseDelayRate * 0.32 +
    data.followUpRate * 0.28 +
    data.crmRate * 0.25 +
    data.afterHoursRate * 0.15;

  // Cap maximo 58%
  const leakageRate = Math.min(rawLeakageRate, 0.58);

  const baseMonthlyLoss = currentEstimatedRevenue * leakageRate;

  const monthlyLossLow = baseMonthlyLoss * 0.75;
  const monthlyLossHigh = baseMonthlyLoss * 1.25;
  const annualLossLow = monthlyLossLow * 12;
  const annualLossHigh = monthlyLossHigh * 12;

  const recoverableLow = baseMonthlyLoss * 0.15;
  const recoverableHigh = baseMonthlyLoss * 0.30;

  // Score Penalties
  let responsePenalty = 0;
  if (data.responseDelayRate === 0.02) responsePenalty = 0;
  else if (data.responseDelayRate === 0.06) responsePenalty = 6;
  else if (data.responseDelayRate === 0.12) responsePenalty = 13;
  else if (data.responseDelayRate === 0.20) responsePenalty = 22;
  else if (data.responseDelayRate === 0.30) responsePenalty = 31;
  else if (data.responseDelayRate === 0.38) responsePenalty = 38;
  else responsePenalty = 17; // No se

  let followUpPenalty = 0;
  if (data.followUpRate === 0.03) followUpPenalty = 0;
  else if (data.followUpRate === 0.10) followUpPenalty = 9;
  else if (data.followUpRate === 0.17) followUpPenalty = 17;
  else if (data.followUpRate === 0.26) followUpPenalty = 27;
  else followUpPenalty = 15; // No se

  let crmPenalty = 0;
  if (data.crmRate === 0.02) crmPenalty = 0;
  else if (data.crmRate === 0.08) crmPenalty = 8;
  else if (data.crmRate === 0.14) crmPenalty = 15;
  else if (data.crmRate === 0.21) crmPenalty = 23;
  else if (data.crmRate === 0.27) crmPenalty = 30;
  else crmPenalty = 16; // No se

  let afterHoursPenalty = 0;
  if (data.afterHoursRate === 0.01) afterHoursPenalty = 0;
  else if (data.afterHoursRate === 0.07) afterHoursPenalty = 7;
  else if (data.afterHoursRate === 0.14) afterHoursPenalty = 14;
  else afterHoursPenalty = 9; // No se

  let leadVolumeModifier = 0;
  if (data.dailyLeads >= 100) leadVolumeModifier = 8;
  else if (data.dailyLeads >= 50) leadVolumeModifier = 5;

  const totalPenalties = responsePenalty + followUpPenalty + crmPenalty + afterHoursPenalty + leadVolumeModifier;
  const finalScore = Math.max(0, Math.min(100, 100 - totalPenalties));

  let riskLevel: 'baja' | 'moderada' | 'alta' | 'crítica' = 'crítica';
  if (finalScore >= 80) riskLevel = 'baja';
  else if (finalScore >= 60) riskLevel = 'moderada';
  else if (finalScore >= 40) riskLevel = 'alta';

  // Normalization for Main Leak
  const normalize = (val: number, min: number, max: number) => ((val - min) / (max - min)) * 100;
  const responseImpact = normalize(data.responseDelayRate, 0.02, 0.38);
  const followUpImpact = normalize(data.followUpRate, 0.03, 0.26);
  const crmImpact = normalize(data.crmRate, 0.02, 0.27);
  const afterHoursImpact = normalize(data.afterHoursRate, 0.01, 0.14);

  const responseImpactWeighted = responseImpact * 1.10;
  const followUpImpactWeighted = followUpImpact * 1.00;
  const crmImpactWeighted = crmImpact * 0.95;
  const afterHoursImpactWeighted = afterHoursImpact * 0.85;

  const impacts = [
    { name: 'respuesta_lenta', val: responseImpactWeighted },
    { name: 'falta_seguimiento', val: followUpImpactWeighted },
    { name: 'crm', val: crmImpactWeighted },
    { name: 'fuera_horario', val: afterHoursImpactWeighted },
  ];
  
  impacts.sort((a, b) => b.val - a.val);
  const mainLeak = impacts[0].name;

  let benchmark = 0.10;
  if (data.industry === 'cursos') benchmark = 0.09;
  else if (data.industry === 'inmobiliaria') benchmark = 0.12;
  else if (data.industry === 'autos') benchmark = 0.10;
  else if (data.industry === 'salud') benchmark = 0.08;
  else if (data.industry === 'ecommerce') benchmark = 0.07;
  else if (data.industry === 'servicios') benchmark = 0.09;
  else if (data.industry === 'turismo') benchmark = 0.11;

  return {
    monthlyLeads,
    currentEstimatedRevenue,
    rawLeakageRate,
    leakageRate,
    baseMonthlyLoss,
    monthlyLossLow,
    monthlyLossHigh,
    annualLossLow,
    annualLossHigh,
    recoverableLow,
    recoverableHigh,
    finalScore,
    riskLevel,
    mainLeak,
    benchmark
  };
}
