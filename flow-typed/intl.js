declare var Intl: {
  Collator: Class<Intl$Collator>,
  DateTimeFormat: Class<Intl$DateTimeFormat>,
  Locale: Class<Intl$LocaleClass>,
  NumberFormat: Class<Intl$NumberFormat>,
  PluralRules: ?Class<Intl$PluralRules>,
  RelativeTimeFormat?: Class<Intl$RelativeTimeFormat>,
  getCanonicalLocales?: (locales?: Intl$Locales) => Intl$Locale[],
  ...
}

type Intl$Locale = string
type Intl$Locales = Intl$Locale | Intl$Locale[]

declare class Intl$Collator {
  constructor(
    locales?: Intl$Locales,
    options?: Intl$CollatorOptions,
  ): Intl$Collator;

  static (
    locales?: Intl$Locales,
    options?: Intl$CollatorOptions,
  ): Intl$Collator;

  compare(string, string): number;

  resolvedOptions(): {
    locale: Intl$Locale,
    usage: 'sort' | 'search',
    sensitivity: 'base' | 'accent' | 'case' | 'variant',
    ignorePunctuation: boolean,
    collation: string,
    numeric: boolean,
    caseFirst?: 'upper' | 'lower' | 'false',
    ...
  };

  static supportedLocalesOf(locales?: Intl$Locales): Intl$Locale[];
}

type FormatToPartsType =
  | 'day'
  | 'dayPeriod'
  | 'era'
  | 'hour'
  | 'literal'
  | 'minute'
  | 'month'
  | 'second'
  | 'timeZoneName'
  | 'weekday'
  | 'year'

declare class Intl$DateTimeFormat {
  constructor(
    locales?: Intl$Locales,
    options?: Intl$DateTimeFormatOptions,
  ): Intl$DateTimeFormat;

  static (
    locales?: Intl$Locales,
    options?: Intl$DateTimeFormatOptions,
  ): Intl$DateTimeFormat;

  format(value?: Date | number): string;

  formatRange(startDate?: Date | number, endDate?: Date | number): string;

  formatToParts(value?: Date | number): Array<{
    type: FormatToPartsType,
    value: string,
    ...
  }>;

  resolvedOptions(): {
    locale: Intl$Locale,
    calendar: string,
    numberingSystem: string,
    timeZone?: string,
    hour12: boolean,
    weekday?: 'narrow' | 'short' | 'long',
    era?: 'narrow' | 'short' | 'long',
    year?: 'numeric' | '2-digit',
    month?: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long',
    day?: 'numeric' | '2-digit',
    hour?: 'numeric' | '2-digit',
    minute?: 'numeric' | '2-digit',
    second?: 'numeric' | '2-digit',
    timeZoneName?: 'short' | 'long',
    ...
  };

  static supportedLocalesOf(locales?: Intl$Locales): Intl$Locale[];
}

declare class Intl$LocaleClass {
  baseName: string;
  calendar?: string;
  caseFirst?: 'upper' | 'lower' | 'false';
  collation?: string;
  hourCycle?: 'h11' | 'h12' | 'h23' | 'h24';
  language: string;
  numberingSystem?: string;
  numeric?: boolean;
  region?: string;
  script?: string;

  constructor(tag: string, options?: Intl$LocaleOptions): Intl$LocaleClass;

  maximize(): Intl$LocaleClass;

  minimize(): Intl$LocaleClass;
}

declare type Intl$LocaleOptions = {
  calendar?: string,
  caseFirst?: 'upper' | 'lower' | 'false',
  collation?: string,
  hourCycle?: 'h11' | 'h12' | 'h23' | 'h24',
  numeric?: boolean,
  numberingSystem?: string,
  ...
}

declare class Intl$NumberFormat {
  constructor(
    locales?: Intl$Locales,
    options?: Intl$NumberFormatOptions,
  ): Intl$NumberFormat;

  static (
    locales?: Intl$Locales,
    options?: Intl$NumberFormatOptions,
  ): Intl$NumberFormat;

  format(number): string;

  resolvedOptions(): {
    locale: Intl$Locale,
    numberingSystem: string,
    style: 'decimal' | 'currency' | 'percent' | 'unit',
    currency?: string,
    currencyDisplay?: 'symbol' | 'code' | 'name' | 'narrowSymbol',
    useGrouping: boolean,
    minimumIntegerDigits?: number,
    minimumFractionDigits?: number,
    maximumFractionDigits?: number,
    minimumSignificantDigits?: number,
    maximumSignificantDigits?: number,
    ...
  };

  static supportedLocalesOf(locales?: Intl$Locales): Intl$Locale[];
}

declare class Intl$PluralRules {
  constructor(
    locales?: Intl$Locales,
    options?: Intl$PluralRulesOptions,
  ): Intl$PluralRules;

  select(number): Intl$PluralRule;

  resolvedOptions(): {
    locale: Intl$Locale,
    type: 'cardinal' | 'ordinal',
    minimumIntegerDigits?: number,
    minimumFractionDigits?: number,
    maximumFractionDigits?: number,
    minimumSignificantDigits?: number,
    maximumSignificantDigits?: number,
    pluralCategories: Intl$PluralRule[],
    ...
  };

  static supportedLocalesOf(locales?: Intl$Locales): Intl$Locale[];
}

type Intl$PluralRule = 'zero' | 'one' | 'two' | 'few' | 'many' | 'other'

declare type Intl$PluralRulesOptions = {
  localeMatcher?: 'lookup' | 'best fit',
  type?: 'cardinal' | 'ordinal',
  minimumIntegerDigits?: number,
  minimumFractionDigits?: number,
  maximumFractionDigits?: number,
  minimumSignificantDigits?: number,
  maximumSignificantDigits?: number,
  ...
}

declare class Intl$RelativeTimeFormat {
  constructor(
    locales?: void | Intl$Locales,
    options?: Intl$RelativeTimeFormatOptions,
  ): Intl$RelativeTimeFormat;

  static supportedLocalesOf(
    locales?: Intl$Locales,
    options?: { +localeMatcher?: 'lookup' | 'best fit' },
  ): Intl$Locale[];

  format(value: number, unit: Intl$RelativeTimeUnit): string;

  formatToParts(
    value: number,
    unit: Intl$RelativeTimeUnit,
  ): Array<{ type: string, value: string, unit?: string }>;

  resolvedOptions(): $ReadOnly<{
    localeMatcher: 'lookup' | 'best fit',
    numberingSystem: Intl$NumberingSystem,
    style: 'long' | 'short' | 'narrow',
    numeric: 'always' | 'auto',
  }>;
}

type Intl$RelativeTimeUnit =
  | 'year'
  | 'years'
  | 'quarter'
  | 'quarters'
  | 'month'
  | 'months'
  | 'week'
  | 'weeks'
  | 'day'
  | 'days'
  | 'hour'
  | 'hours'
  | 'minute'
  | 'minutes'
  | 'second'
  | 'seconds'

type Intl$NumberingSystem =
  | 'adlm' //	Adlam digits	𞥐𞥑𞥒𞥓𞥔𞥕𞥖𞥗𞥘𞥙 (U+1E950 to U+1E959)
  | 'ahom' //	Ahom digits	𑜰𑜱𑜲𑜳𑜴𑜵𑜶𑜷𑜸𑜹 (U+11730 to U+11739)
  | 'arab' //	Arabic-Indic digits	٠١٢٣٤٥٦٧٨٩ (U+0660 to U+0669)
  | 'arabext' //	Extended Arabic-Indic digits	۰۰۱۲۳۴۵۶۷۸۹ (U+06F0 to U+06F9)
  | 'armn' //	Armenian upper case numerals	algorithmic
  | 'armnlow' //	Armenian lower case numerals	algorithmic
  | 'bali' //	Balinese digits	᭐᭑᭒᭓᭔᭕᭖᭗᭘᭙ (U+1B50 to U+1B59)
  | 'beng' //	Bengali digits	০১২৩৪৫৬৭৮৯ (U+09E6 to U+09EF)
  | 'bhks' //	Bhaiksuki digits	𑱐𑱑𑱒𑱓𑱔𑱕𑱖𑱗𑱘𑱙 (U+11C50 to U+11C59)
  | 'brah' //	Brahmi digits	𑁦𑁧𑁨𑁩𑁪𑁫𑁬𑁭𑁮𑁯 (U+11066 to U+1106F)
  | 'cakm' //	Chakma digits	𑄶𑄷𑄸𑄹𑄺𑄻𑄼𑄽𑄾𑄿 (U+11136 to U+1113F)
  | 'cham' //	Cham digits	꩐꩑꩒꩓꩔꩕꩖꩗꩘꩙ (U+AA50 to U+AA59)
  | 'cyrl' //	Cyrillic numerals	algorithmic
  | 'deva' //	Devanagari digits	०१२३४५६७८९ (U+0966 to U+096F)
  | 'diak' //	Dives Akuru digits	𑥐𑥑𑥒𑥓𑥔𑥕𑥖𑥗𑥘𑥙 (U+11950 to U+11959)
  | 'ethi' //	Ethiopic numerals	algorithmic
  | 'fullwide' //	Full width digits	０１２３４５６７８９ (U+FF10 to U+FF19)
  | 'gara' //	Garay digits	𐵀𐵁𐵂𐵃𐵄𐵅𐵆𐵇𐵈𐵉 (U+10D40 to U+10D49)
  | 'geor' //	Georgian numerals	algorithmic
  | 'gong' //	Gunjala Gondi digits	𑶠𑶡𑶢𑶣𑶤𑶥𑶦𑶧𑶨𑶩 (U+11DA0 to U+11DA9)
  | 'gonm' //	Masaram Gondi digits	𑵐𑵑𑵒𑵓𑵔𑵕𑵖𑵗𑵘𑵙 (U+11D50 to U+11D59)
  | 'grek' //	Greek upper case numerals	algorithmic
  | 'greklow' //	Greek lower case numerals	algorithmic
  | 'gujr' //	Gujarati digits	૦૧૨૩૪૫૬૭૮૯ (U+0AE6 to U+0AEF)
  | 'gukh' //	Gurung Khema digits	𖄰𖄱𖄲𖄳𖄴𖄵𖄶𖄷𖄸𖄹 (U+16130 to U+16139)
  | 'guru' //	Gurmukhi digits	੦੧੨੩੪੫੬੭੮੯ (U+0A66 to U+0A6F)
  | 'hanidays' //	Han-character day-of-month numbering for lunar/other traditional calendars
  | 'hanidec' //	Positional decimal system using Chinese number ideographs as digits	〇一二三四五六七八九 (U+3007, U+4E00, U+4E8C, U+4E09, U+56DB, U+4E94, U+516D, U+4E03, U+516B, U+4E5D)
  | 'hans' //	Simplified Chinese numerals	algorithmic
  | 'hansfin' //	Simplified Chinese financial numerals	algorithmic
  | 'hant' //	Traditional Chinese numerals	algorithmic
  | 'hantfin' //	Traditional Chinese financial numerals	algorithmic
  | 'hebr' //	Hebrew numerals	algorithmic
  | 'hmng' //	Pahawh Hmong digits	𖭐𖭑𖭒𖭓𖭔𖭕𖭖𖭗𖭘𖭙 (U+16B50 to U+16B59)
  | 'hmnp' //	Nyiakeng Puachue Hmong digits	𞅀𞅁𞅂𞅃𞅄𞅅𞅆𞅇𞅈𞅉 (U+1E140 to U+1E149)
  | 'java' //	Javanese digits	꧐꧑꧒꧓꧔꧕꧖꧗꧘꧙ (U+A9D0 to U+A9D9)
  | 'jpan' //	Japanese numerals	algorithmic
  | 'jpanfin' //	Japanese financial numerals	algorithmic
  | 'jpanyear' //	Japanese first-year Gannen numbering for Japanese calendar	algorithmic
  | 'kali' //	Kayah Li digits	꤀꤁꤂꤃꤄꤅꤆꤇꤈꤉ (U+A900 to U+A909)
  | 'kawi' //	Kawi digits	𑽐𑽑𑽒𑽓𑽔𑽕𑽖𑽗𑽘𑽙 (U+11F50 to U+11F59)
  | 'khmr' //	Khmer digits	០១២៣៤៥៦៧៨៩ (U+17E0 to U+17E9)
  | 'knda' //	Kannada digits	೦೧೨೩೪೫೬೭೮೯ (U+0CE6 to U+0CEF)
  | 'krai' //	Kirat Rai digits	𖵰𖵱𖵲𖵳𖵴𖵵𖵶𖵷𖵸𖵹 (U+16D70 to U+16D79)
  | 'lana' //	Tai Tham Hora (secular) digits	᪀᪁᪂᪃᪄᪅᪆᪇᪈᪉ (U+1A80 to U+1A89)
  | 'lanatham' //	Tai Tham (ecclesiastical) digits	᪐᪑᪒᪓᪔᪕᪖᪗᪘᪙ (U+1A90 to U+1A99)
  | 'laoo' //	Lao digits	໐໑໒໓໔໕໖໗໘໙ (U+0ED0 to U+0ED9)
  | 'latn' //	Latin digits	0123456789 (U+0030 to U+0039)
  | 'lepc' //	Lepcha digits	᱀᱁᱂᱃᱄᱅᱆᱇᱈᱉ (U+1C40 to U+1C49)
  | 'limb' //	Limbu digits	᥆᥇᥈᥉᥊᥋᥌᥍᥎᥏ (U+1946 to U+194F)
  | 'mathbold' //	Mathematical bold digits	𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗 (U+1D7CE to U+1D7D7)
  | 'mathdbl' //	Mathematical double-struck digits	𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡 (U+1D7D8 to U+1D7E1)
  | 'mathmono' //	Mathematical monospace digits	𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿 (U+1D7F6 to U+1D7FF)
  | 'mathsanb' //	Mathematical sans-serif bold digits	𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵 (U+1D7EC to U+1D7F5)
  | 'mathsans' //	Mathematical sans-serif digits	𝟢𝟣𝟤𝟥𝟦𝟧𝟨𝟩𝟪𝟫 (U+1D7E2 to U+1D7EB)
  | 'mlym' //	Malayalam digits	൦൧൨൩൪൫൬൭൮൯ (U+0D66 to U+0D6F)
  | 'modi' //	Modi digits	𑙐𑙑𑙒𑙓𑙔𑙕𑙖𑙗𑙘𑙙 (U+11650 to U+11659)
  | 'mong' //	Mongolian digits	᠐᠑᠒᠓᠔᠕᠖᠗᠘᠙ (U+1810 to U+1819)
  | 'mroo' //	Mro digits	𖩠𖩡𖩢𖩣𖩤𖩥𖩦𖩧𖩨𖩩 (U+16A60 to U+16A69)
  | 'mtei' //	Meetei Mayek digits	꯰꯱꯲꯳꯴꯵꯶꯷꯸꯹ (U+ABF0 to U+ABF9)
  | 'mymr' //	Myanmar digits	၀၁၂၃၄၅၆၇၈၉ (U+1040 to U+1049)
  | 'mymrepka' //	Myanmar Eastern Pwo Karen digits	𑛚𑛛𑛜𑛝𑛞𑛟𑛠𑛡𑛢𑛣 (U+116DA to U+116E3)
  | 'mymrpao' //	Myanmar Pao digits	𑛐𑛑𑛒𑛓𑛔𑛕𑛖𑛗𑛘𑛙 (U+116D0 to U+116D9)
  | 'mymrshan' //	Myanmar Shan digits	႐႑႒႓႔႕႖႗႘႙ (U+1090 to U+1099)
  | 'mymrtlng' //	Myanmar Tai Laing digits	꧰꧱꧲꧳꧴꧵꧶꧷꧸꧹ (U+A9F0 to U+A9F9)
  | 'nagm' //	Nag Mundari digits	𞓰𞓱𞓲𞓳𞓴𞓵𞓶𞓷𞓸𞓹 (U+1E4F0 to U+1E4F9)
  | 'newa' //	Newa digits	𑑐𑑑𑑒𑑓𑑔𑑕𑑖𑑗𑑘𑑙 (U+11450 to U+11459)
  | 'nkoo' //	N'Ko digits	߀߁߂߃߄߅߆߇߈߉ (U+07C0 to U+07C9)
  | 'olck' //	Ol Chiki digits	᱐᱑᱒᱓᱔᱕᱖᱗᱘᱙ (U+1C50 to U+1C59)
  | 'onao' //	Ol Onal digits	𞗱𞗲𞗳𞗴𞗵𞗶𞗷𞗸𞗹𞗺 (U+1E5F1 to U+1E5FA)
  | 'orya' //	Oriya digits	୦୧୨୩୪୫୬୭୮୯ (U+0B66 to U+0B6F)
  | 'osma' //	Osmanya digits	𐒠𐒡𐒢𐒣𐒤𐒥𐒦𐒧𐒨𐒩 (U+104A0 to U+104A9)
  | 'outlined' //	Legacy computing outlined digits	𜳰𜳱𜳲𜳳𜳴𜳵𜳶𜳷𜳸𜳹 (U+1CCF0 to U+1CCF9)
  | 'rohg' //	Hanifi Rohingya digits	𐴰𐴱𐴲𐴳𐴴𐴵𐴶𐴷𐴸𐴹 (U+10D30 to U+10D39)
  | 'roman' //	Roman upper case numerals	algorithmic
  | 'romanlow' //	Roman lowercase numerals	algorithmic
  | 'saur' //	Saurashtra digits	꣐꣑꣒꣓꣔꣕꣖꣗꣘꣙ (U+A8D0 to U+A8D9)
  | 'segment' //	Legacy computing segmented digits	🯰🯱🯲🯳🯴🯵🯶🯷🯸🯹 (U+1FBF0 to U+1FBF9)
  | 'shrd' //	Sharada digits	𑇐𑇑𑇒𑇓𑇔𑇕𑇖𑇗𑇘𑇙 (U+111D0 to U+111D9)
  | 'sind' //	Khudawadi digits	𑋰𑋱𑋲𑋳𑋴𑋵𑋶𑋷𑋸𑋹 (U+112F0 to U+112F9)
  | 'sinh' //	Sinhala Lith digits	෦෧෨෩෪෫෬෭෮෯ (U+0DE6 to U+0DEF)
  | 'sora' //	Sora_Sompeng digits	𑃰𑃱𑃲𑃳𑃴𑃵𑃶𑃷𑃸𑃹 (U+110F0 to U+110F9)
  | 'sund' //	Sundanese digits	᮰᮱᮲᮳᮴᮵᮶᮷᮸᮹ (U+1BB0 to U+1BB9)
  | 'sunu' //	Sunuwar digits	𑯰𑯱𑯲𑯳𑯴𑯵𑯶𑯷𑯸𑯹 (U+11BF0 to U+11BF9)
  | 'takr' //	Takri digits	𑛀𑛁𑛂𑛃𑛄𑛅𑛆𑛇𑛈𑛉 (U+116C0 to U+116C9)
  | 'talu' //	New Tai Lue digits	᧐᧑᧒᧓᧔᧕᧖᧗᧘᧙ (U+19D0 to U+19D9)
  | 'taml' //	Tamil numerals	algorithmic
  | 'tamldec' //	Modern Tamil decimal digits	௦௧௨௩௪௫௬௭௮௯ (U+0BE6 to U+0BEF)
  | 'telu' //	Telugu digits	౦౧౨౩౪౫౬౭౮౯ (U+0C66 to U+0C6F)
  | 'thai' //	Thai digits	๐๑๒๓๔๕๖๗๘๙ (U+0E50 to U+0E59)
  | 'tibt' //	Tibetan digits	༠༡༢༣༤༥༦༧༨༩ (U+0F20 to U+0F29)
  | 'tirh' //	Tirhuta digits	𑓐𑓑𑓒𑓓𑓔𑓕𑓖𑓗𑓘𑓙 (U+114D0 to U+114D9)
  | 'tnsa' //	Tangsa digits	𖫀𖫁𖫂𖫃𖫄𖫅𖫆𖫇𖫈𖫉 (U+16AC0 to U+16AC9)
  | 'vaii' //	Vai digits	꘠꘡꘢꘣꘤꘥꘦꘧꘨꘩ (U+A620 to U+A629)
  | 'wara' //	Warang Citi digits	𑣠𑣡𑣢𑣣𑣤𑣥𑣦𑣧𑣨𑣩 (U+118E0 to U+118E9)
  | 'wcho' //	Wancho digits	𞋰𞋱𞋲𞋳𞋴𞋵𞋶𞋷𞋸𞋹 (U+1E2F0 to U+1E2F9)

type Intl$RelativeTimeFormatOptions = $ReadOnly<{
  localeMatcher?: 'lookup' | 'best fit',
  numberingSystem?: Intl$NumberingSystem,
  style?: 'long' | 'short' | 'narrow',
  numeric?: 'always' | 'auto',
  ...
}>
