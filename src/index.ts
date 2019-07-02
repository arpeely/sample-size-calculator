const roundToSigFigs = (inputNumber: number): number => {
  const n = Math.round(inputNumber)
  // sigFigs can be updated to any number
  const sigFigs = 2
  const mult = Math.pow(10, sigFigs - Math.floor(Math.log(n) / Math.LN10) - 1)
  const roundOnce = Math.round(n * mult) / mult
  return Math.round(roundOnce)
}

interface Input {
  effect: number
  significance: number
  conversion: number
}

const calcVariance = (significance: number, variance: number, theta: number) => (2 * (1 - significance) * variance * Math.log(1 + Math.sqrt(variance) / theta)) / (theta * theta)

const sampleSizeEstimate = (processedModels: Input): number | '---' => {
  const relativeMDE = processedModels.effect
  const significance = 1 - processedModels.significance / 100
  const baselineConversionRate = processedModels.conversion
  const absoluteMDE = baselineConversionRate * relativeMDE
  const c1 = baselineConversionRate
  const c2 = baselineConversionRate - absoluteMDE
  const c3 = baselineConversionRate + absoluteMDE
  const theta = Math.abs(absoluteMDE)

  let sampleEstimate
  // Note: This is the variance estimate for conversion events. If you want to have a sample size calculation for revenue, customers should provide variance
  const variance1 = c1 * (1 - c1) + c2 * (1 - c2)
  const variance2 = c1 * (1 - c1) + c3 * (1 - c3)

  // looking for greatest absolute value of two possible sample estimates. two possibilities based on swapping c2 for c3
  const sampleEstimate1 = calcVariance(significance, variance1, theta)
  const sampleEstimate2 = calcVariance(significance, variance2, theta)

  if (Math.abs(sampleEstimate1) >= Math.abs(sampleEstimate2)) {
    sampleEstimate = sampleEstimate1
  } else {
    sampleEstimate = sampleEstimate2
  }

  if (!isFinite(sampleEstimate) || sampleEstimate < 0) {
    return '---'
  }

  return roundToSigFigs(sampleEstimate)
}

export default sampleSizeEstimate
