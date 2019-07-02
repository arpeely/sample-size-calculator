const roundToSigFigs = (inputNumber: number, sigFigs: number = 2) => {
  const n = Math.round(inputNumber)
  const mult = Math.pow(10, sigFigs - Math.floor(Math.log(n) / Math.LN10) - 1)
  const roundOnce = Math.round(n * mult) / mult
  return Math.round(roundOnce)
}

const calcVariance = (c1: number, c2: number) => c1 * (1 - c1) + c2 * (1 - c2)

const calcSampleEstimate = (significance: number, variance: number, theta: number) => {
  return (2 * (1 - significance) * variance * Math.log(1 + Math.sqrt(variance) / theta)) / (theta * theta)
}

const sampleSizeEstimate = (relativeMDE: number, baselineConversionRate: number, significance: number = 0.95): number => {
  const significanceReversed = 1 - significance

  const absoluteMDE = baselineConversionRate * relativeMDE
  const c2 = baselineConversionRate - absoluteMDE
  const c3 = baselineConversionRate + absoluteMDE

  const theta = Math.abs(absoluteMDE)

  const variance1 = calcVariance(baselineConversionRate, c2)
  const variance2 = calcVariance(baselineConversionRate, c3)
  const sampleEstimate1 = calcSampleEstimate(significanceReversed, variance1, theta)
  const sampleEstimate2 = calcSampleEstimate(significanceReversed, variance2, theta)

  const sampleEstimate = Math.abs(sampleEstimate1) >= Math.abs(sampleEstimate2) ? sampleEstimate1 : sampleEstimate2

  if (!isFinite(sampleEstimate) || sampleEstimate < 0) {
    return NaN
  }

  return roundToSigFigs(sampleEstimate)
}

export default sampleSizeEstimate
