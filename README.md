<h1 align="center">Sample Size Calculator</h1>

A/B test sample size calculator which uses a two-tailed sequential likelihood ratio test with false discovery rate controls to calculate statistical significance.

[![volkswagen status](https://auchenberg.github.io/volkswagen/volkswargen_ci.svg?v=1)](https://github.com/auchenberg/volkswagen)

## Credits

This package is inspired by the great work done by [Optimizely's Stats Engine](www.optimizely.com).

For the original online version click [here](https://www.optimizely.com/sample-size-calculator/)

## Install

sample-size-calculator is available as an [npm package](https://www.npmjs.com/package/@arpeely/sample-size-calculator).

```sh
#with yarn
yarn add @arpeely/sample-size-calculator

#with npm
npm install @arpeely/sample-size-calculator
```

## Usage

```javascript
import sampleSizeEstimate from '@arpeely/sample-size-calculator'

// The minimum relative change in conversion rate you would like to be able to detect.
const relativeMDE = 0.3 //  30%

// Your control group's expected conversion rate
const baselineConversionRate = 0.3572 //  35.72%

// Sample size per variation
const sampleSize = ampleSizeEstimate(relativeMDE, baselineConversionRate)
console.log(sampleSize) // output: 160
```
