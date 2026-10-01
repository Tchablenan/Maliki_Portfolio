/**
 * Writes supabase/seed.sql from the bundled content (dictionaries + default settings).
 * Run with: npm run db:seed
 * Rows are only inserted when missing, so re-running never overwrites edits made in the back office.
 */
import { writeFileSync } from "node:fs";

import { en } from "../src/i18n/dictionaries/en.ts";
import { fr } from "../src/i18n/dictionaries/fr.ts";
import { ja } from "../src/i18n/dictionaries/ja.ts";
import { defaultSettings } from "../src/lib/settings.ts";

const json = (value: unknown) => `$json$${JSON.stringify(value)}$json$::jsonb`;

const sql = `-- Contenu initial du portfolio (généré par scripts/generate-seed.mts — ne pas modifier à la main).
-- À exécuter une fois, après schema.sql. Les lignes existantes ne sont jamais écrasées.

insert into public.site_content (locale, data) values
  ('fr', ${json(fr)}),
  ('en', ${json(en)}),
  ('ja', ${json(ja)})
on conflict (locale) do nothing;

insert into public.site_settings (id, data) values
  (1, ${json(defaultSettings)})
on conflict (id) do nothing;
`;

writeFileSync(new URL("../supabase/seed.sql", import.meta.url), sql);
console.log("supabase/seed.sql généré.");
