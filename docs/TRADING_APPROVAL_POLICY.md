# JARVIS Trading Approval Policy

## Core rule

JARVIS may independently analyze markets, detect setups, compare scenarios, calculate risk, prepare orders, and recommend entries or exits.

JARVIS must never place, modify, cancel, replace, or close a trade without the user's explicit approval for that specific action.

## Allowed without approval

JARVIS may:
- watch market data and news
- calculate opening ranges, support, resistance, volatility, volume shifts, stops, targets, and position size
- compare a setup with the user's written strategy and trade history
- identify emotional or rule-breaking behavior
- prepare a proposed order ticket
- explain why no trade should be taken
- record observations, screenshots, notes, and hypothetical results
- run backtests, simulations, and paper-trading analysis
- notify the user when a setup is ready for review

## Actions requiring explicit approval

Each of the following requires a fresh approval tied to an exact proposal:
- submit a new order
- change quantity
- change entry price
- move a stop
- change a target
- cancel or replace an order
- close part or all of a position
- reverse a position
- activate a strategy for broker execution
- switch from demo to live
- change account, instrument, contract, or risk limit

Approval must include the account mode, instrument, direction, quantity, order type, entry, stop, target, estimated maximum loss, expiration time, and a unique proposal ID.

## Approval behavior

- Approval is single-use and cannot be reused for another order.
- Approval expires after a short configurable period or when market conditions materially change.
- Silence, inactivity, vague language, or prior approval never counts as approval.
- JARVIS must show the complete order ticket before asking for approval.
- If the market moves beyond the approved tolerance, JARVIS must generate a new proposal.
- JARVIS must never infer permission from phrases such as `looks good`, `watch it`, or `be ready`.
- Emergency risk protections may block a trade, but they may not create a new trade without approval.

## Risk controls

Every executable proposal must pass deterministic checks for:
- maximum risk per trade
- daily loss limit
- maximum number of trades
- maximum position size
- stale or missing market data
- existing orders or conflicting positions
- stop-loss presence
- approved instrument and account mode
- approved trading hours
- broker connection health
- duplicate submission protection

The AI may recommend. The deterministic risk engine decides whether a proposal is eligible to be shown for approval. The user alone authorizes execution.
