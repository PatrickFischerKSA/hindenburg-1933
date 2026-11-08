import {opening,generateReply} from './dialogue.mjs?v=biografie-pruefung';
const $ = id => document.getElementById(id);
const question = $('question'), log = $('log'), mic = $('mic'), status = $('speech-status');
const send = $('send'), micLabel = mic.querySelector('span');
const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;
const defaultHint = Speech ? 'Sprechen oder schreiben Sie. Den erkannten Text können Sie vor dem Antworten bearbeiten.' : 'Dieser Browser bietet keine Spracheingabe. Sie können Ihren Beitrag tippen.';
let transcript = [], active, state = 'idle';
status.textContent = defaultHint;
mic.disabled = !Speech;

function node(tag,text,cls) {
  const el = document.createElement(tag);
  if (text) el.textContent = text;
  if (cls) el.className = cls;
  return el;
}
function append(data) {
  transcript.push(data);
  const article = node('article','',data.user ? 'message user' : 'message');
  if (data.user || data.role) {
    article.append(node('div',data.user ? 'Sie' : 'Hindenburg','role'),
      node('p',data.user || data.role));
  }
  if (data.sources?.length) {
    const citation = node('div','','context');
    citation.append(node('strong','Originalstellen'));
    const list = node('ul');
    for (const source of data.sources) {
      const item = node('li');
      const link = node('a',source.label);
      link.href = source.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      item.append(link);
      list.append(item);
    }
    citation.append(list, node('strong','Historische Einordnung'), node('p',data.historicalContext));
    article.append(citation);
  }
  if (data.note) {
    const context = node(data.role ? 'details' : 'div','','context');
    context.append(node(data.role ? 'summary' : 'div',data.role ? 'Historische Einordnung' : 'Blick aus der Szene · spätere Ereignisse'),node('p',data.note));
    for (const ref of data.refs) {
      const link = node('a',`[${ref}]`);
      link.href = `#quelle-${ref}`;
      link.setAttribute('aria-label',`Zur Quelle ${ref}`);
      link.addEventListener('click',() => {
        const sources = $('quellen');
        if (sources) sources.open = true;
      });
      context.append(link,' ');
    }
    article.append(context);
  }
  log.append(article);
}
function showPrompts(prompts) {
  $('prompts').replaceChildren(...prompts.map(prompt => {
    const button = node('button',prompt);
    button.type = 'button';
    button.addEventListener('click',() => {
      if (!question.value.trim()) question.value = prompt;
      else question.setRangeText(prompt, question.selectionStart, question.selectionEnd, 'end');
      question.value = question.value.slice(0,1200);
      question.focus();
    });
    button.disabled = state !== 'idle';
    return button;
  }));
}
function reset() {
  if (active) {
    const old = active;
    active = undefined;
    try { old.abort(); } catch {}
  }
  setState('idle',defaultHint);
  transcript = [];
  log.replaceChildren();
  question.value = '';
  $('verdict').value = '';
  append(opening);
  showPrompts(opening.prompts);
}
$('form').addEventListener('submit',async event => {
  event.preventDefault();
  const input = question.value.trim();
  if (!input || state !== 'idle') return;
  setState('thinking','Das Gesprächsmodell wird vorbereitet …');
  let message = defaultHint;
  try {
    const answer = await generateReply(input,transcript,percent => {
      status.textContent = percent < 100
        ? `Das Modell wird auf dieses Gerät geladen … ${percent} %`
        : 'Hindenburg formuliert seine Antwort …';
    });
    append({user:input});
    append(answer);
    question.value = '';
    log.scrollTop = log.scrollHeight;
  } catch (error) {
    console.error(error);
    if (/WebGPU/.test(error.message) && !navigator.gpu) message = error.message;
    else if (error.message === 'Das Modell hat keine passende Antwort erzeugt.') {
      message = 'Das Modell hat keine passende Antwort gefunden. Sie können Ihren Beitrag erneut senden oder die Frage anders formulieren.';
    } else if (/context window|context length|ContextWindow|exceed.*context/i.test(error.message)) {
      message = 'Der Gesprächsverlauf ist für das Modell zu lang. Sie können das Protokoll herunterladen und ein neues Gespräch beginnen.';
    } else {
      message = 'Die Antwort konnte nicht erzeugt werden. Prüfen Sie die Verbindung und die WebGPU-Unterstützung Ihres Geräts. Ihr Beitrag bleibt im Eingabefeld.';
    }
  } finally {
    setState('idle',message);
    question.focus({preventScroll:true});
  }
});
function setState(next,message) {
  state = next;
  mic.setAttribute('aria-pressed',String(['starting','listening','finishing'].includes(next)));
  micLabel.textContent = next === 'listening' ? 'Aufnahme stoppen' : ['idle','thinking'].includes(next) ? 'Mikrofon' : next === 'starting' ? 'Mikrofon startet …' : 'Wird erkannt …';
  mic.disabled = !Speech || !['idle','listening'].includes(next);
  send.disabled = next !== 'idle';
  question.readOnly = next !== 'idle';
  for (const button of $('prompts').querySelectorAll('button')) button.disabled = next !== 'idle';
  status.textContent = message;
}
mic.addEventListener('click',() => {
  if (!Speech) return;
  if (state === 'listening') {
    setState('finishing','Die Sprache wird in Text umgewandelt …');
    try { active.stop(); } catch { active = undefined; setState('idle','Aufnahme beendet. Sie können den Text bearbeiten.'); }
    return;
  }
  if (state !== 'idle') return;
  const session = new Speech();
  active = session;
  session.lang = 'de-CH';
  session.interimResults = true;
  session.continuous = true;
  const base = question.value.trimEnd();
  let finalText = '', preview = '', error = '';
  session.onstart = () => {
    if (active === session) setState('listening','Ich höre zu. Wählen Sie «Aufnahme stoppen», wenn Sie fertig sind.');
  };
  session.onresult = event => {
    if (active !== session) return;
    preview = '';
    finalText = '';
    for (const result of Array.from(event.results)) {
      if (result.isFinal) finalText += ' ' + result[0].transcript.trim();
      else preview += ' ' + result[0].transcript.trim();
    }
    question.value = [base,(finalText + ' ' + preview).trim()].filter(Boolean).join(' ').slice(0,1200);
  };
  session.onerror = event => {
    if (active !== session) return;
    error = ({
      'not-allowed':'Kein Mikrofonzugriff. Erlauben Sie ihn in den Browsereinstellungen oder tippen Sie Ihren Beitrag.',
      'service-not-allowed':'Der Browser lässt die Spracherkennung hier nicht zu. Sie können Ihren Beitrag tippen.',
      'audio-capture':'Kein Mikrofon verfügbar. Sie können Ihren Beitrag tippen.',
      'no-speech':'Keine Sprache erkannt. Versuchen Sie es erneut oder tippen Sie Ihren Beitrag.',
      network:'Die Spracherkennung ist gerade nicht erreichbar. Sie können Ihren Beitrag tippen.',
      'language-not-supported':'Der Browser unterstützt die gewählte Sprache nicht. Sie können Ihren Beitrag tippen.'
    })[event.error] || 'Spracheingabe unterbrochen. Sie können Ihren Beitrag tippen.';
    status.textContent = error;
  };
  session.onend = () => {
    if (active !== session) return;
    active = undefined;
    const spokenText = (finalText + preview).trim();
    question.value = [base,spokenText].filter(Boolean).join(' ').slice(0,1200);
    setState('idle',error || (spokenText ? 'Text erkannt. Prüfen und bearbeiten Sie ihn vor dem Senden.' : 'Keine Sprache erkannt. Versuchen Sie es erneut oder tippen Sie Ihren Beitrag.'));
  };
  setState('starting','Der Browser fragt gegebenenfalls nach der Mikrofonfreigabe.');
  try { session.start(); } catch { active = undefined; setState('idle','Spracheingabe konnte nicht starten. Sie können Ihren Beitrag tippen.'); }
});
$('reset').addEventListener('click',() => {
  if (state === 'thinking') return;
  if ((transcript.length > 1 || question.value.trim() || $('verdict').value.trim() || active) &&
      !window.confirm('Gespräch, Entwurf und Urteil löschen und neu starten?')) return;
  reset();
  question.focus();
});
$('export').addEventListener('click',() => {
  const text = [
    '1. AUGUST 1934 · FIKTIVES GESPRÄCH',
    'Simulation – Rollenrede ist kein Originalzitat.',
    ...transcript.map(item => item.user ? 'Sie: ' + item.user : [
      item.role && 'Hindenburg (simuliert): ' + item.role,
      item.note && 'Historischer Kommentar: ' + item.note,
      item.historicalContext && 'Historische Einordnung: ' + item.historicalContext,
      ...(item.sources ?? []).map(source => source.label + ': ' + source.url)
    ].filter(Boolean).join('\n')),
    'Meine Notiz:\n' + ($('verdict').value.trim() || '—'),
    'Quellen:\n' + [...document.querySelectorAll('#quellen li a')].map((a,i)=> `[${i+1}] ${a.href}`).join('\n')
  ].join('\n\n');
  const url = URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));
  const a = node('a');
  a.href = url;
  a.download = 'gespraech-hindenburg-1934-08-01.txt';
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url),1000);
});
reset();
