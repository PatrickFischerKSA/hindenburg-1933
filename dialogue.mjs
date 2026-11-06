export const opening = {
  role: 'Sie wollen wissen, weshalb ich Hitler zum Reichskanzler ernannt habe? Nach Schleichers Rücktritt setzte ich auf ein Kabinett, in dem konservative Minister Hitler begrenzen sollten. Was halten Sie für den schwächsten Punkt dieser Überlegung?',
  note: 'Berlin, 30. Januar 1933. Hindenburgs Antworten stellen eine mögliche damalige Sicht dar. Der historische Kommentar blickt auch auf die Folgen.',
  refs: [1,2],
  prompts: ['Warum ernannten Sie Hitler?', 'Wie wollten Sie Hitler kontrollieren?', 'Welche Alternativen hatten Sie?']
};

const topics = {
  motives: [/warum|wieso|weshalb|weswegen|motiv|beweggrund|ordnung|krise|instabil|schleicher|ernenn/, 'Schleichers Regierung war gescheitert. Papens Vorschlag erschien mir als Ausweg aus der Regierungskrise: Hitler sollte Kanzler werden, während Konservative viele Ministerposten behielten. Warum würden Sie diesem Plan misstrauen?', 'Die Ernennung war eine politische Entscheidung Hindenburgs. Papen half, das Bündnis auszuhandeln. Eine stabile Regierung war damit keineswegs gesichert.', [1,2], ['Warum vertrauten Sie Papen?', 'War Hitler überhaupt gewählt?', 'Welche Warnzeichen gab es?']],
  control: [/kontroll|papen|kabinett|minister|einrahm|einbind|einheg|unterschaetz|zaehm/, 'Ich setzte darauf, dass Papen und die konservativen Minister das Kabinett bestimmen würden. Sie bezweifeln also, dass eine Mehrheit im Kabinett genügt. Welche Machtmittel hatte der Kanzler trotz dieser Mehrheit?', 'Papen wurde Vizekanzler. Neben Hitler sassen zunächst nur zwei weitere NSDAP-Mitglieder im Kabinett: Wilhelm Frick und Hermann Göring. Frick erhielt das Reichsinnenministerium. Die Verteilung der Ministerposten verhinderte den Zugriff der NSDAP auf staatliche Machtmittel nicht.', [1,2], ['Welche Warnzeichen gab es?', 'Was geschah mit den Grundrechten?', 'Welche Alternativen hatten Sie?']],
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
  note: 'Die Simulation arbeitet mit vorbereiteten Antworten zu diesen historischen Themen. Versuche es mit einer konkreteren Frage.',
  refs: [], prompts: opening.prompts
};

export function reply(input, previous) {
  const text = input.toLowerCase().replaceAll('ä','ae').replaceAll('ö','oe').replaceAll('ü','ue').replaceAll('ß','ss');
  let topic = order.find(key => topics[key][0].test(text));
  if (!topic && previous && /^(aber|und|wieso|warum|wie|das|sie|ich|doch)/.test(text)) {
    if (/^(aber|doch)|stimm.{0,8}nicht|glaube.{0,10}nicht/.test(text)) {
      const [, , note, refs, prompts] = topics[previous];
      return {topic:previous, role:'Sie widersprechen meiner Begründung. Nennen Sie ein konkretes Ereignis, das Ihrer Ansicht nach schon damals gegen die Ernennung sprach.', note, refs, prompts};
    }
    if (/^(und|wie|wieso|warum).{0,24}[?]?$/.test(text)) topic = {motives:'control',control:'warning',warning:'alternatives',alternatives:'election',election:'control',decree:'act',act:'verdict',verdict:'warning'}[previous];
  }
  if (!topic) return fallback;
  const [,role,note,refs,prompts] = topics[topic];
  if (topic === previous) return {topic, role:role ? 'Welche Aussage meiner Begründung möchten Sie überprüfen? Wählen Sie einen der Anknüpfungspunkte oder bringen Sie einen konkreten Gegenbeleg ein.' : null, note, refs, prompts};
  return {topic,role,note,refs,prompts};
}
