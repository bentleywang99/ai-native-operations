#!/usr/bin/env node
/**
 * run-scenarios.js — regression set for the readiness rubric.
 *
 *   node method/run-scenarios.js [scenario-name ...]
 *
 * Drives each scenario in scenarios/scenarios.json through the real consulting engine
 * (site/lib/consulting.js, whose prompt is compiled from this book), sending the scripted
 * owner turns until the consultant produces a read-out. Parses the six scores and the band
 * from the read-out and compares with what the scenario expects. Exit code 1 on any hard
 * failure. Costs roughly $0.03 per scenario on Sonnet 5.
 *
 * Pass rules: band must match; a scenario may name `soft` bands that count as a pass with a
 * warning (see the `note` fields). Scores are reported, not asserted, because they are a
 * judgment; a drift of more than 2 points total is flagged.
 */
const fs = require('fs'); const os = require('os'); const path = require('path');
for (const line of fs.readFileSync(path.join(os.homedir(), '.env'), 'utf8').split('\n')) { const m = line.match(/^([A-Z0-9_]+)=(.*)$/); if (m && !process.env[m[1]]) process.env[m[1]] = m[2]; }
const { reply } = require(path.join(__dirname, '..', '..', 'site', 'lib', 'consulting.js'));
const DIMS = ['decision clarity', 'data accessibility', 'volume', 'error tolerance', 'existing structure', 'ownership'];

const all = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'scenarios', 'scenarios.json'), 'utf8')).scenarios;
const only = process.argv.slice(2);
const scenarios = only.length ? all.filter((s) => only.includes(s.name)) : all;

function parseReadout(text) {
  const clean = text.replace(/\*/g, '');
  const band = (clean.match(/Readiness[^A-Za-z\n]{0,12}(Early|Ready|Advanced)/i) || clean.match(/\/\s*12[^\n]{0,30}?(Early|Ready|Advanced)/i) || clean.match(/\b(Early|Ready|Advanced)\b[^\n]{0,10}\(?\d{1,2}\s*\/\s*12/i) || [])[1] || null;
  const scores = DIMS.map((d) => { const m = clean.match(new RegExp(d.split(' ')[0] + '[^\\n]{0,80}?(\\d)\\s*\\/\\s*2', 'i')); return m ? +m[1] : null; });
  const total = (text.match(/(\d{1,2})\s*\/\s*12/) || [])[1];
  return { band, scores, total: total ? +total : null };
}

(async () => {
  let fails = 0, cost = 0; const rows = [];
  for (const sc of scenarios) {
    const history = []; let out = null, turns = 0;
    for (const line of sc.owner) {
      history.push({ role: 'user', content: line }); turns++;
      const r = await reply({ messages: history });
      cost += r.cost; history.push({ role: 'assistant', content: r.text });
      if (r.done) { out = r.text; break; }
    }
    if (!out) { // close with the brief (all six facts stated plainly), then ask for the read-out
      history.push({ role: 'user', content: (sc.brief ? sc.brief + ' ' : '') + 'That is everything I know. Please give me the read-out now.' }); turns++;
      const r = await reply({ messages: history }); cost += r.cost; out = r.text; history.push({ role: 'assistant', content: r.text });
    }
    const p = parseReadout(out);
    const bandOk = p.band && p.band.toLowerCase() === sc.expected.band.toLowerCase();
    const soft = sc.note && /accept (\w+) as a soft pass/i.exec(sc.note);
    const softOk = !bandOk && soft && p.band && p.band.toLowerCase() === soft[1].toLowerCase();
    const drift = p.scores.every((x) => x !== null) ? Math.abs(p.scores.reduce((a, b) => a + b, 0) - sc.expected.total) : null;
    const status = bandOk ? 'PASS' : softOk ? 'SOFT' : 'FAIL';
    if (status === 'FAIL') fails++;
    rows.push({ name: sc.name, status, expected: sc.expected.band, got: p.band, scores: p.scores.map((x) => x ?? '?').join(''), expScores: sc.expected.scores.join(''), drift, turns });
    fs.mkdirSync(path.join(__dirname, '..', 'scenarios', 'runs'), { recursive: true });
    fs.writeFileSync(path.join(__dirname, '..', 'scenarios', 'runs', `${sc.name}.last.md`), `# ${sc.name}\n\n${history.map((m) => `**${m.role}:** ${m.content}`).join('\n\n')}\n`);
  }
  console.log('scenario              status  expected   got        scores(exp)  drift turns');
  for (const r of rows) console.log(`${r.name.padEnd(22)}${r.status.padEnd(8)}${r.expected.padEnd(11)}${String(r.got).padEnd(11)}${r.scores}(${r.expScores})   ${String(r.drift ?? '?').padEnd(5)} ${r.turns}`);
  console.log(`\n${rows.length - fails}/${rows.length} passed, cost $${cost.toFixed(3)}. Transcripts in scenarios/runs/.`);
  process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(2); });
