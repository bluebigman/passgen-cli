#!/usr/bin/env node
const crypto = require('crypto');
function out(ok, data, error) { process.stdout.write(JSON.stringify(ok ? { code: 0, ok: true, data } : { code: 1, ok: false, error }) + '\n'); }
const args = process.argv.slice(2); const cmd = args[0] || '';
function rand(n) { return crypto.randomInt(0, n); }
const WORDS = ['云杉', '灯塔', '琥珀', '银河', '赤狐', '青竹', '雪豹', '海盐', '风铃', '松果', '月桂', '锦鲤', '山雀', '白鹭', '橡木', '砂砾', '茉莉', '星尘', '蓝鲸', '黄莺'];
try {
  if (cmd === 'status' || cmd === 'auth') return out(true, { ok: 'passgen ready' });
  if (cmd === 'strong') { const len = Math.min(64, Math.max(8, parseInt(args[1]) || 16)); const sets = { l: 'abcdefghijkmnpqrstuvwxyz', u: 'ABCDEFGHJKLMNPQRSTUVWXYZ', n: '23456789', s: '!@#$%^&*-_=+' }; let opt = (args[2] || 'lun'); let pool = ''; if (opt.includes('l')) pool += sets.l; if (opt.includes('u')) pool += sets.u; if (opt.includes('n')) pool += sets.n; if (opt.includes('s')) pool += sets.s; if (!pool) pool = sets.l + sets.n; let pw = ''; for (let i = 0; i < len; i++) pw += pool[rand(pool.length)]; const safe = /[!@#$%^&*]/.test(pw) ? 2 : (/\d/.test(pw) && /[a-z]/.test(pw) ? 1 : 0); return out(true, { password: pw, length: pw.length, strength: ['弱', '中', '强'][safe] }); }
  if (cmd === 'phrase') { const n = Math.min(8, Math.max(3, parseInt(args[1]) || 4)); const sep = args[2] === 'n' ? '-' : (args[2] || '-'); const words = []; for (let i = 0; i < n; i++) words.push(WORDS[rand(WORDS.length)]); return out(true, { phrase: words.join(sep), words: n, note: '中文口令便于记忆，可加数字后缀增强' }); }
  if (cmd === 'check') { const p = args.slice(1).join(''); if (!p) return out(false, null, '缺少密码'); return out(true, { length: p.length, hasUpper: /[A-Z]/.test(p), hasLower: /[a-z]/.test(p), hasDigit: /\d/.test(p), hasSymbol: /[^A-Za-z0-9]/.test(p), score: Math.min(4, (p.length >= 8) + /[A-Z]/.test(p) + /\d/.test(p) + /[^A-Za-z0-9]/.test(p)) + (p.length >= 16 ? 1 : 0), suggest: p.length < 8 ? '至少 8 位并混合大小写数字符号' : '可通过 strong/phrase 生成更强密码' }); }
  return out(false, null, '未知命令。支持: status/auth/strong/phrase/check');
} catch (e) { out(false, null, '执行错误: ' + e.message); }
