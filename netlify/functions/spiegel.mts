import type { Config } from "@netlify/functions";

// De eerste blik van Loek, voor de pagina /normaal/.
// Staat uit tot er een ANTHROPIC_API_KEY in de Netlify-omgeving staat. Zonder sleutel geeft deze
// functie 501 terug en belooft de pagina een persoonlijke reactie van Loek binnen twee werkdagen.
// Optioneel: SPIEGEL_MODEL om een ander model te kiezen, ANTHROPIC_BASE_URL voor een gateway.

const SYSTEM = `Je bent de eerste blik van Loek Luijbregts. Loek is een buitenstaander die ondernemers helpt zien wat ertoe doet en er werk van te maken. Je leest de antwoorden die een ondernemer net heeft gegeven en schrijft op wat Loek zou zien.

Werkwijze
- Begin bij wat de ondernemer zelf normaal vindt en wat de klant letterlijk zei. Het verschil daartussen is de overgekeken waarde.
- Klanten kopen niet wat iemand doet, maar wat zij daarna anders doen. Gebruik wat de klant daarna deed.
- Scheid feit, interpretatie en claim. Beweer niets wat de antwoorden niet dragen.
- Verzin niets. Gebruik alleen namen, aantallen, bedragen en resultaten die letterlijk in de antwoorden staan. Geen verdubbeling van omzet, geen aantallen klanten, geen bedrijfsnamen die er niet staan.
- Zijn de antwoorden kort of vaag, zeg dat eerlijk en vraag om één concreet voorbeeld. Liever minder zeggen dan iets invullen.
- Wees eerlijk. Lijkt de waarde niet verborgen, maar zit het probleem in bereik, prijs, opvolging of keuzes, zeg dat.
- Schrijf een volwassen commerciële zin volgens deze vorm: Ik help [voor wie] die [waar ze tegenaan lopen] om [wat er daarna anders is] door [wat de ondernemer normaal vindt], zonder [het risico of de moeite die ze willen vermijden]. Laat het deel met zonder weg als de antwoorden geen risico of moeite noemen. Gebruik de woorden van de klant waar het kan.
- Halveer die zin tot iets wat een twaalfjarige snapt.
- Sluit af met de ene vraag die Loek als eerste zou stellen. Een vraag die anderen zelden stellen.

Schrijfstijl
- Nederlands. Spreek de ondernemer aan met je en jij. Schrijf in de ik-vorm als Loek.
- Begin met de conclusie. Korte, concrete zinnen. Gewone taal. Persoonlijk, maar niet vrijblijvend. Hoopvol en realistisch.
- Geen gedachtestreepjes. Gebruik nooit een lang streepje.
- Geen jargon en geen marketingtaal. Gebruik nooit: sprint, funnel, conversie, hustle, opschalen, businesscoach, leadgeneratie, doelgroep, uurtarief, full-service, ontzorgen, synergie.
- Geen overdreven complimenten en niet belerend.
- Controleer je spelling voordat je antwoordt.

Antwoord met alleen een JSON-object, zonder uitleg ervoor of erna:
{"spiegel": "drie tot vijf zinnen: wat ik zie", "zin": "de volwassen commerciële zin", "zin_kort": "de gehalveerde zin", "ontbreekt": "een of twee zinnen: welk bewijs of welke keuze nog ontbreekt", "vraag": "de ene vraag die ik als eerste zou stellen"}`;

const FIELDS: Array<[string, string]> = [
  ["wat", "Wat de ondernemer doet"],
  ["omvang", "Omvang van het bedrijf"],
  ["voor_wie", "Voor wie de ondernemer het liefst werkt"],
  ["klant_zei", "Wat de blijste klant letterlijk zei"],
  ["normaal", "Wat de ondernemer zelf normaal vond"],
  ["anders", "Wat de klant daarna aantoonbaar anders deed"],
  ["bewijs", "Bewijs dat er is"],
  ["vastloop", "Waar het nu blijft hangen"],
  ["uren", "Uren per week aan werk dat een ander kan doen of uitgestelde keuzes"],
  ["uurwaarde", "Realistische waarde van een uur, in euro"],
  ["over12", "Wat er over twaalf maanden aantoonbaar anders moet zijn"],
  ["rem", "Wat zou maken dat de ondernemer na een goed gesprek niets doet"],
];

function clip(value: unknown, max = 900): string {
  const text = Array.isArray(value) ? value.join(", ") : value == null ? "" : String(value);
  return text.replace(/\u2014|\u2013/g, "-").slice(0, max).trim();
}

export default async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const key = Netlify.env.get("ANTHROPIC_API_KEY");
  if (!key) {
    return Response.json({ error: "not_configured" }, { status: 501 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  const answers = FIELDS.map(([name, label]) => `${label}: ${clip(body[name]) || "(niet ingevuld)"}`).join("\n");
  if (clip(body.normaal).length < 3 || clip(body.klant_zei).length < 3) {
    return Response.json({ error: "too_short" }, { status: 422 });
  }

  const base = (Netlify.env.get("ANTHROPIC_BASE_URL") || "https://api.anthropic.com").replace(/\/$/, "");
  const model = Netlify.env.get("SPIEGEL_MODEL") || "claude-haiku-4-5-20251001";
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 9000);

  try {
    const response = await fetch(`${base}/v1/messages`, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model,
        max_tokens: 700,
        temperature: 0.3,
        system: SYSTEM,
        messages: [{ role: "user", content: `De antwoorden van de ondernemer:\n\n${answers}` }],
      }),
    });

    if (!response.ok) {
      return Response.json({ error: "upstream", status: response.status }, { status: 502 });
    }

    const data = await response.json();
    const text: string = (data.content || [])
      .filter((part: { type: string }) => part.type === "text")
      .map((part: { text: string }) => part.text)
      .join("");
    const parsed = JSON.parse(text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1));

    return Response.json({
      ok: true,
      spiegel: clip(parsed.spiegel, 1200),
      zin: clip(parsed.zin, 400),
      zin_kort: clip(parsed.zin_kort, 220),
      ontbreekt: clip(parsed.ontbreekt, 500),
      vraag: clip(parsed.vraag, 300),
    });
  } catch {
    return Response.json({ error: "failed" }, { status: 502 });
  } finally {
    clearTimeout(timer);
  }
};

export const config: Config = {
  path: "/api/spiegel",
};
