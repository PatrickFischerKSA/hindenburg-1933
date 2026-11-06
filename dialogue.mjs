export const opening = {
  role: 'Treten Sie ein. Nehmen Sie Platz. Sie kommen wegen meiner Entscheidung, nehme ich an. Ja, ich habe Hitler heute zum Reichskanzler ernannt. Sie hätten an meiner Stelle anders entschieden?',
  note: 'Berlin, 30. Januar 1933. Hindenburgs Antworten stellen eine mögliche damalige Sicht dar. Der historische Kommentar blickt auch auf die Folgen.',
  refs: [1,2],
  prompts: ['Warum ernannten Sie Hitler?', 'Wie wollten Sie Hitler kontrollieren?', 'Welche Alternativen hatten Sie?']
};

const topics = {
  motives: [/warum|wieso|weshalb|weswegen|motiv|beweggrund|ordnung|krise|instabil|schleicher|ernenn/, 'Schleichers Regierung war gescheitert. Papens Vorschlag erschien mir als Ausweg aus der Regierungskrise: Hitler sollte Kanzler werden, während Konservative viele Ministerposten behielten. Warum würden Sie diesem Plan misstrauen?', 'Die Ernennung war eine politische Entscheidung Hindenburgs. Papen half, das Bündnis auszuhandeln. Eine stabile Regierung war damit keineswegs gesichert.', [1,2], ['Warum vertrauten Sie Papen?', 'War Hitler überhaupt gewählt?', 'Welche Warnzeichen gab es?']],
  control: [/kontroll|papen|kabinett|minister|einrahm|einbind|einheg|unterschaetz|zaehm/, 'Ich setzte darauf, dass Papen und die konservativen Minister das Kabinett bestimmen würden. Papen sitzt als Vizekanzler mit am Tisch. Aber Sie scheinen ihm weniger zuzutrauen als ich. Wo, meinen Sie, würde er die Kontrolle verlieren?', 'Papen wurde Vizekanzler. Neben Hitler sassen zunächst nur zwei weitere NSDAP-Mitglieder im Kabinett: Wilhelm Frick und Hermann Göring. Frick erhielt das Reichsinnenministerium. Die Verteilung der Ministerposten verhinderte den Zugriff der NSDAP auf staatliche Machtmittel nicht.', [1,2], ['Welche Warnzeichen gab es?', 'Was geschah mit den Grundrechten?', 'Welche Alternativen hatten Sie?']],
  election: [/wahl|waehl|stimmen|mehrheit|mandat/, 'Die NSDAP war die stärkste Fraktion. Aber die Entscheidung über den Kanzler lag bei mir. Welchen Unterschied macht es für Ihre Beurteilung, ob eine Partei stark ist oder eine eigene Mehrheit hat?', 'Im November 1932 erhielt die NSDAP rund 33 Prozent und blieb stärkste Partei. Sie hatte keine eigene Mehrheit. Hitler wurde am 30. Januar durch Hindenburg ernannt.', [1,2], ['Welche Alternativen hatten Sie?', 'Wie wollten Sie Hitler kontrollieren?']],
  alternatives: [/alternativ|andere[nr]? (weg|kanzler|loesung)|nicht ernenn|mussten|zwang|anders|stattdessen|verweiger|abwarten|hinauszoegern|hin(aus)?zoeger/, 'Ich hätte Papens Vorschlag ablehnen und weiter nach einer Regierung suchen können. Eine stabile Mehrheit wäre damit noch nicht gefunden gewesen. Welches Risiko hätten Sie bei einer weiteren Suche eher in Kauf genommen?', 'Hindenburg war zur Ernennung Hitlers nicht gezwungen. Weitere Verhandlungen waren möglich, ihr Ausgang aber offen. Ein Vergleich muss die schwierige Mehrheitslage und die Risiken für die Demokratie berücksichtigen.', [1,2], ['Welche Warnzeichen gab es?', 'War die Entscheidung verhängnisvoll?']],
  warning: [/warn|gefahr|risik|putsch|1923|antisemit|rassis|gewalt|strass|\bsa\b|juden|menschenveracht|mein kampf/, 'Hitlers Putschversuch und die Gewalt der Nationalsozialisten konnte ich kennen. Ich setzte dennoch auf Kontrolle durch das Kabinett. Welches dieser Warnzeichen wiegt für Sie schwerer als mein Versprechen politischer Stabilität?', 'Der Putschversuch von 1923, die offen antidemokratische und antisemitische Politik der NSDAP und die Gewalt ihrer Anhänger waren vor der Ernennung erkennbar. Das machte die Entscheidung schon damals kritisierbar.', [2], ['Welche Alternativen hatten Sie?', 'Welche Verantwortung tragen Sie?']],
  decree: [/grundrecht|reichstagsbrand|notverordnung|28.{0,3} februar|artikel 48/, null, 'Am 28. Februar 1933 unterzeichnete Hindenburg die Reichstagsbrandverordnung. Sie setzte zentrale Grundrechte ausser Kraft und schuf eine Grundlage für die Verfolgung politischer Gegner. Das war eine weitere Entscheidung Hindenburgs nach der Ernennung.', [2], ['Was änderte das Ermächtigungsgesetz?', 'Welche Verantwortung tragen Sie?']],
  act: [/ermaechtigung|23.{0,3} maerz|gesetzgebung|entmacht/, null, 'Am 23. März 1933 beschloss der Reichstag unter Verfolgung und Einschüchterung das Ermächtigungsgesetz. Die Regierung konnte damit Gesetze ohne parlamentarische Zustimmung erlassen. Die SPD stimmte dagegen; die KPD-Abgeordneten konnten nicht teilnehmen.', [3], ['Was geschah mit den Grundrechten?', 'War die Entscheidung verhängnisvoll?']],
  verdict: [/verhaengnis|katastroph|fehler|schuld|verantwort|folgen|diktatur|holocaust|weltkrieg|gute entscheidung|gut entschieden|bereu|gerechtfertigt|rechtfertig|mitschuld/, 'Für die Ernennung trage ich als Reichspräsident Verantwortung. Ich berief mich auf die Regierungskrise und die erhoffte Kontrolle durch Konservative. Welche Einwände hätte ich schon im Januar ernst nehmen müssen?', 'Die Ernennung war verhängnisvoll: Sie eröffnete der NSDAP den Zugriff auf die Regierung und erleichterte den Aufbau der Diktatur. NS-Verfolgung, Holocaust und der von NS-Deutschland entfesselte Zweite Weltkrieg gehören zu den späteren Folgen der NS-Herrschaft. Das genaue Ausmass war im Januar 1933 nicht vorhersehbar; die antidemokratische Ausrichtung und Gewalt waren erkennbar.', [1,2,3], ['Welche Warnzeichen gab es?', 'Was geschah mit den Grundrechten?']]
};
const order = ['decree','act','alternatives','warning','election','control','verdict','motives'];
const fallback = {
  role: 'Können Sie Ihren Einwand an einem konkreten Punkt festmachen? Fragen Sie mich etwa nach Papens Plan, der Wahl, politischen Alternativen oder den erkennbaren Warnzeichen.',
  note: 'Die Gesprächsszene kann auf Fragen zur Ernennung, zu den Warnzeichen und zum Machtaufbau eingehen.',
  refs: [], prompts: opening.prompts
};

// Argumente, die eine präzisere Antwort als das allgemeine Thema brauchen.
const objections = [
  { topic: 'control', pattern: /innenminister|\bfrick\b|\bgoering\b|\bpolizei\b/, point: 'die Macht der Nationalsozialisten über die Innenpolitik',
    role: 'Die Zahl der Ministerposten sagt tatsächlich wenig darüber aus, wer die entscheidenden Ämter innehat. Frick bekommt das Reichsinnenministerium. Ich rechne damit, dass die übrigen Minister ihn begrenzen. Wenn diese Rechnung nicht aufgeht, genügt Papens Sitz im Kabinett allein kaum.' },
  { topic: 'warning', pattern: /putsch|1923/, point: 'Hitlers Putschversuch von 1923',
    role: 'Der Putsch von 1923 spricht gegen mein Vertrauen in Hitler. Damals versuchte er, sich mit Gewalt an die Macht zu bringen. Ich setze heute darauf, ihn im Amt durch das Kabinett zu begrenzen. Ihr Einwand trifft die Schwachstelle: Wieso sollte ihn eine Grenze im Kabinett binden, wenn ihn die Verfassung damals nicht gebunden hat?' },
  { topic: 'warning', pattern: /antisemit|juden|rassis/, point: 'den offenen Antisemitismus der NSDAP',
    role: 'Sie fragen, was meine Entscheidung für die Menschen bedeutet, gegen die sich die NSDAP richtet. Ihre Feindseligkeit gegenüber Jüdinnen und Juden ist öffentlich. Eine konservative Mehrheit im Kabinett bietet ihnen für sich genommen keinen Schutz. Da hilft mir der Verweis auf die Regierungskrise wenig.' },
  { topic: 'warning', pattern: /\bsa\b|strassengewalt|gewalt|einschuechter/, point: 'die Gewalt der Nationalsozialisten',
    role: 'Sie sprechen von der Gewalt auf der Strasse. Die verschwindet nicht, nur weil Hitler einen Platz am Kabinettstisch erhält. Ich erwarte, dass ein Regierungsamt ihn zur Zurückhaltung zwingt. Sie halten mir entgegen, dass es ihm vielmehr Einfluss auf diejenigen verschafft, die gegen diese Gewalt vorgehen müssten.' },
  { topic: 'election', pattern: /33\s*%|33\s*prozent|keine\w* (eigene |absolute )?mehrheit|keine\w* mandat|stimmenverlust|stimmen verloren/, point: 'das fehlende Mehrheitsmandat der NSDAP',
    role: 'Die NSDAP hat keine eigene Mehrheit. Ich kann mich also nicht darauf berufen, dass die Wähler mir diese Ernennung vorgeschrieben hätten. Ich habe entschieden, Hitler mit den Konservativen regieren zu lassen. Ob diese Regierung im Reichstag eine Mehrheit findet, ist eine andere Frage.' },
  { topic: 'alternatives', pattern: /schleicher.{0,35}(lassen|behalt|bleib|weitermach)|schleicher.{0,35}(zurueckhol|zurueckkehr)|weitere verhandlung|weiter verhandel/, point: 'eine Fortsetzung der Verhandlungen',
    role: 'Ich hätte weiter verhandeln können. Schleicher hatte für seine Regierung jedoch keine tragfähige Mehrheit gefunden. Mehr Zeit hätte dieses Problem nicht von selbst gelöst. Sie fragen mit Recht, ob ich die Unsicherheit weiterer Verhandlungen hätte hinnehmen sollen, bevor ich Hitler das Kanzleramt überliess.' },
  { topic: 'control', pattern: /zu (naiv|optimistisch)|unterschaetz|machtmittel|wer.{0,25}kontrollier|kontrollier.{0,30}(nicht|unmoeglich)/, point: 'die Grenzen von Papens Einfluss',
    role: 'Papen kann Hitler im Kabinett widersprechen. Er kann dem Kanzler aber nicht einfach seine Entscheidungen vorschreiben. Meine Rechnung setzt voraus, dass die konservativen Minister geschlossen auftreten und Hitler auf sie angewiesen bleibt. Ihr Einwand ist, dass genau das nicht gesichert ist.' }
];
const topicPoints = {
  motives: 'die Regierungskrise', control: 'Papens Plan, Hitler im Kabinett zu begrenzen',
  election: 'die Stärke der NSDAP im Reichstag', alternatives: 'andere Wege aus der Regierungskrise',
  warning: 'die erkennbaren Warnzeichen', verdict: 'meine Verantwortung für die Ernennung'
};
const followups = {
  motives: 'Nach Schleichers Scheitern wollte ich rasch eine Regierung bilden. Das erklärt die Eile. Ob sie es rechtfertigte, einem Gegner der Republik die Regierung zu überlassen, ist eine Frage, der ich mich stellen muss.',
  control: 'Meine Annahme war, dass Hitler ohne die Konservativen im Kabinett wenig ausrichten könne. Sie fragen, worauf diese Annahme beruht. Ein gemeinsames Kabinett bindet ihn nur, solange die Minister ihre Stellung auch tatsächlich nutzen können.',
  election: 'Die Wähler bestimmten die Zusammensetzung des Reichstags. Die Ernennung zum Kanzler habe ich vorgenommen. Für diese Entscheidung kann ich die Verantwortung nicht auf das Wahlergebnis abwälzen.',
  alternatives: 'Eine weitere Suche hätte Zeit gekostet und womöglich wieder keine Mehrheit ergeben. Trotzdem war es meine Entscheidung, die Suche abzubrechen und Papens Vorschlag anzunehmen.',
  warning: 'Dass ich auf das Kabinett vertraue, lässt die Warnzeichen nicht verschwinden. Ich habe eine Möglichkeit zur Kontrolle angenommen, obwohl ich wusste, dass Hitler bereits Gewalt gegen die Republik eingesetzt hatte.',
  verdict: 'Ich habe Papens Vorschlag angenommen und Hitler ernannt. Auch wenn andere mir dazu rieten, lag die Entscheidung bei mir.'
};
function normalize(input) {
  return input.toLowerCase().replaceAll('ä','ae').replaceAll('ö','oe').replaceAll('ü','ue').replaceAll('ß','ss');
}

export function reply(input, transcript = []) {
  const text = normalize(input);
  const history = transcript.filter(turn => turn.topic && turn.point);
  const previous = history.at(-1);
  const objection = objections.find(item => item.pattern.test(text));
  const detected = order.find(key => topics[key][0].test(text));
  let topic = ['decree', 'act'].includes(detected) ? detected : objection?.topic || detected;
  const explicitReference = /\b(vorhin|zuvor|vorher|noch einmal|mein\w* (?:erst\w*|urspruenglich\w*) einwand)\b/.test(text);
  const first = /\b(erst\w*|urspruenglich\w*)\b/.test(text);
  const followup = /^(aber|doch|und (was|wie|warum|wieso)|warum|wieso|wie (denn|genau)|das|genau|was (meinen|heisst))\b/.test(text);
  const genericTopic = !topic || topic === 'motives' && (/^(warum|wieso|weshalb|weswegen)[?! .]*$/.test(text) || explicitReference || /\b(das|daran|darauf|damit|ihn|ihm)\b/.test(text));
  const recalled = explicitReference && first ? history[0]
    : explicitReference || (genericTopic && followup) ? previous : undefined;

  if (!objection && recalled && (genericTopic || explicitReference && topic === recalled.topic)) {
    topic = recalled.topic;
    const [, , note, refs, prompts] = topics[topic];
    return {topic, point: recalled.point, role: `Kommen wir auf ${recalled.point} zurück. ${followups[topic]}`, note, refs, prompts};
  }
  if (!topic) return fallback;

  const [, initialRole, note, refs, prompts] = topics[topic];
  if (!initialRole) return {topic, role: null, note, refs, prompts};

  const point = objection?.point || topicPoints[topic];
  const related = explicitReference ? (first ? history[0] : history.findLast(turn => turn.topic === topic) || previous)
    : history.findLast(turn => turn.point === point);
  const bridge = related && related.point !== point
    ? `Sie hatten bereits ${related.point} angesprochen. Jetzt kommt ein weiterer Punkt hinzu. `
    : related ? `Sie kommen auf ${point} zurück. ` : '';
  const role = bridge + (related?.point === point ? followups[topic] : objection?.role || initialRole);
  return {topic, point, role, note, refs, prompts};
}
