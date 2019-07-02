import sampleSizeEstimate from './index'

test('return a number', () => {
  expect(sampleSizeEstimate(0.3, 0.3572)).toBe(160)
})
test('return NaN', () => {
  expect(sampleSizeEstimate(0.3, 0)).toBe(NaN)
  expect(sampleSizeEstimate(0, 0.3572)).toBe(NaN)
})
