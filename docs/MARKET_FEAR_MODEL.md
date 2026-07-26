# JARVIS Human Fear and Market Sentiment Model

## Purpose

Market behavior is produced by people, institutions, algorithms, leverage, and constraints. JARVIS must not treat price movement as a purely mechanical pattern. Fear changes participation, liquidity, decision speed, order placement, and the reliability of normal technical relationships.

The fear model is an adjustment layer applied to trading analysis. It does not independently authorize a trade.

## Human fear factors

JARVIS should estimate fear from several classes of evidence rather than relying on one indicator.

### Price behavior
- acceleration of downward movement
- unusually large candle bodies and ranges
- repeated failure to reclaim prior support
- gap behavior
- distance from intraday and multi-day reference prices
- frequency and severity of new lows
- asymmetry between selloffs and rebounds

### Volume and liquidity
- abnormal volume relative to the same time of day
- concentrated sell volume
- widening spreads
- reduced depth or abrupt order-book withdrawal when available
- slippage and rapid price movement through expected support
- forced-liquidation characteristics

### Volatility
- realized volatility expansion
- implied-volatility changes when available
- volatility-of-volatility
- divergence between price and volatility
- instability across normally related instruments

### Cross-market evidence
- index breadth and percentage of components declining
- defensive rotation
- bond, currency, commodity, and credit-market confirmation
- correlation spikes across risk assets
- movement in volatility products

### Narrative and crowd behavior
- breaking-news severity and credibility
- repeated negative headlines
- social and financial-media urgency
- language associated with panic, capitulation, insolvency, contagion, or forced selling
- disagreement between headlines and actual price response

### Positioning and vulnerability
- crowded trades
- leverage and margin sensitivity
- options positioning and dealer exposure when reliable data exists
- proximity to common stops
- recent speculative excess
- time pressure around expiration, economic releases, or market close

## Fear state

JARVIS should classify the market into a transparent state, for example:

- calm
- concern
- elevated fear
- panic
- capitulation
- stabilization after fear

The state must include a confidence score and the main supporting evidence. A single dramatic headline must not automatically produce a panic classification.

## Mathematical adjustment

The base strategy produces an unadjusted setup score. The fear layer modifies the assumptions behind that score rather than simply adding a bullish or bearish point.

Depending on the fear state, JARVIS should adjust:
- expected volatility and price range
- probability of support or resistance holding
- expected slippage
- stop distance needed for normal noise
- position size required to preserve fixed dollar risk
- likelihood of false breakouts and failed retests
- expected speed of movement
- acceptable order type
- confidence in mean reversion
- probability of continuation after a breakdown
- expected time to target or invalidation

Higher fear normally means smaller proposed size, stricter liquidity checks, shorter approval validity, larger uncertainty ranges, and greater willingness to recommend no trade.

## Nonlinear behavior

Fear is not linear. A move from concern to panic can change behavior more than a move from calm to concern. Models should therefore support thresholds, regime changes, and interaction terms rather than assuming each indicator contributes a fixed amount.

Examples:
- high volume is not automatically fear if price remains orderly
- a volatility spike with recovering breadth may indicate stabilization
- a fast drop on thin liquidity differs from broad, high-volume institutional selling
- extreme fear can favor continuation during forced liquidation, but later favor reversal when selling exhausts

JARVIS must evaluate both continuation and exhaustion scenarios.

## Humanity layer

JARVIS should explicitly consider common human reactions:
- loss aversion
- panic selling
- herd behavior
- anchoring to prior prices
- reluctance to realize losses
- fear of missing a reversal
- revenge trading
- freezing after a loss
- premature profit taking after stress
- overconfidence after a successful reversal

It should evaluate the market's behavior and the user's behavior separately. A fearful market does not prove the user is fearful, and the user's fear does not prove the market is at a bottom.

## User protection

When fear is elevated, JARVIS should show:
- what the market appears afraid of
- whether price action confirms that fear
- whether selling looks orderly, forced, or exhausted
- the uncertainty range
- what would invalidate the interpretation
- how the proposed risk differs from normal conditions
- whether waiting is preferable

JARVIS must not exploit the user's fear to encourage activity. It should prefer no trade over a weak setup.

## Approval integration

Every proposal affected by elevated fear must disclose the fear state and its impact on size, stop, target, slippage estimate, and proposal expiration.

Any meaningful change in fear regime after approval invalidates the approval and requires a new order proposal. JARVIS still cannot place, modify, cancel, or close a trade without explicit permission.

## Model review

The fear model should be calibrated using historical and paper-trading results. Review performance by regime, including false panic classifications, missed capitulation, slippage error, continuation accuracy, and reversal accuracy. Changes to live risk logic require testing and human review.
