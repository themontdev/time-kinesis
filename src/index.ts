let defaultTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
export function getTimezoneOffset(timezone:string): number{
    // @ts-ignore
    let found = list.find(tz => tz.utc.find(u => u == timezone));
    return found.offset*60*60*1000;
};

export function setDefaultTimezone(timezone:timezones): void{
    defaultTimezone = timezone;
};

export enum units {
    millisecond = 'millisecond',
    second = 'second',
    minute = 'minute',
    hour = 'hour',
    day = 'day',
    week = 'week',
    month = 'month',
    quarter = 'quarter',
    year = 'year'
};

export enum unitFactor {
    millisecond = 1,
    second = millisecond * 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24
};

export enum timezones {
    Etc_GMTPlus12 = "Etc/GMT+12",
    Etc_GMTPlus11 = "Etc/GMT+11",
    Pacific_Midway = "Pacific/Midway",
    Pacific_Niue = "Pacific/Niue",
    Pacific_PagoPago = "Pacific/Pago_Pago",
    Etc_GMTPlus10 = "Etc/GMT+10",
    Pacific_Honolulu = "Pacific/Honolulu",
    Pacific_Johnston = "Pacific/Johnston",
    Pacific_Rarotonga = "Pacific/Rarotonga",
    Pacific_Tahiti = "Pacific/Tahiti",
    America_Anchorage = "America/Anchorage",
    America_Juneau = "America/Juneau",
    America_Nome = "America/Nome",
    America_Sitka = "America/Sitka",
    America_Yakutat = "America/Yakutat",
    America_SantaIsabel = "America/Santa_Isabel",
    America_LosAngeles = "America/Los_Angeles",
    America_Tijuana = "America/Tijuana",
    America_Vancouver = "America/Vancouver",
    PST8PDT = "PST8PDT",
    America_Creston = "America/Creston",
    America_Dawson = "America/Dawson",
    America_DawsonCreek = "America/Dawson_Creek",
    America_Hermosillo = "America/Hermosillo",
    America_Phoenix = "America/Phoenix",
    America_Whitehorse = "America/Whitehorse",
    Etc_GMTPlus7 = "Etc/GMT+7",
    America_Chihuahua = "America/Chihuahua",
    America_Mazatlan = "America/Mazatlan",
    America_Boise = "America/Boise",
    America_CambridgeBay = "America/Cambridge_Bay",
    America_Denver = "America/Denver",
    America_Edmonton = "America/Edmonton",
    America_Inuvik = "America/Inuvik",
    America_Ojinaga = "America/Ojinaga",
    America_Yellowknife = "America/Yellowknife",
    MST7MDT = "MST7MDT",
    America_Belize = "America/Belize",
    America_CostaRica = "America/Costa_Rica",
    America_ElSalvador = "America/El_Salvador",
    America_Guatemala = "America/Guatemala",
    America_Managua = "America/Managua",
    America_Tegucigalpa = "America/Tegucigalpa",
    Etc_GMTPlus6 = "Etc/GMT+6",
    Pacific_Galapagos = "Pacific/Galapagos",
    America_Chicago = "America/Chicago",
    America_Indiana_Knox = "America/Indiana/Knox",
    America_Indiana_TellCity = "America/Indiana/Tell_City",
    America_Matamoros = "America/Matamoros",
    America_Menominee = "America/Menominee",
    America_NorthDakota_Beulah = "America/North_Dakota/Beulah",
    America_NorthDakota_Center = "America/North_Dakota/Center",
    America_NorthDakota_NewSalem = "America/North_Dakota/New_Salem",
    America_RainyRiver = "America/Rainy_River",
    America_RankinInlet = "America/Rankin_Inlet",
    America_Resolute = "America/Resolute",
    America_Winnipeg = "America/Winnipeg",
    CST6CDT = "CST6CDT",
    America_BahiaBanderas = "America/Bahia_Banderas",
    America_Cancun = "America/Cancun",
    America_Merida = "America/Merida",
    America_MexicoCity = "America/Mexico_City",
    America_Monterrey = "America/Monterrey",
    America_Regina = "America/Regina",
    America_SwiftCurrent = "America/Swift_Current",
    America_Bogota = "America/Bogota",
    America_Cayman = "America/Cayman",
    America_CoralHarbour = "America/Coral_Harbour",
    America_Eirunepe = "America/Eirunepe",
    America_Guayaquil = "America/Guayaquil",
    America_Jamaica = "America/Jamaica",
    America_Lima = "America/Lima",
    America_Panama = "America/Panama",
    America_RioBranco = "America/Rio_Branco",
    Etc_GMTPlus5 = "Etc/GMT+5",
    America_Detroit = "America/Detroit",
    America_Havana = "America/Havana",
    America_Indiana_Petersburg = "America/Indiana/Petersburg",
    America_Indiana_Vincennes = "America/Indiana/Vincennes",
    America_Indiana_Winamac = "America/Indiana/Winamac",
    America_Iqaluit = "America/Iqaluit",
    America_Kentucky_Monticello = "America/Kentucky/Monticello",
    America_Louisville = "America/Louisville",
    America_Montreal = "America/Montreal",
    America_Nassau = "America/Nassau",
    America_NewYork = "America/New_York",
    America_Nipigon = "America/Nipigon",
    America_Pangnirtung = "America/Pangnirtung",
    America_PortMinusau_Prince = "America/Port-au-Prince",
    America_ThunderBay = "America/Thunder_Bay",
    America_Toronto = "America/Toronto",
    America_Indiana_Marengo = "America/Indiana/Marengo",
    America_Indiana_Vevay = "America/Indiana/Vevay",
    America_Indianapolis = "America/Indianapolis",
    America_Caracas = "America/Caracas",
    America_Asuncion = "America/Asuncion",
    America_GlaceBay = "America/Glace_Bay",
    America_GooseBay = "America/Goose_Bay",
    America_Halifax = "America/Halifax",
    America_Moncton = "America/Moncton",
    America_Thule = "America/Thule",
    Atlantic_Bermuda = "Atlantic/Bermuda",
    America_CampoGrande = "America/Campo_Grande",
    America_Cuiaba = "America/Cuiaba",
    America_Anguilla = "America/Anguilla",
    America_Antigua = "America/Antigua",
    America_Aruba = "America/Aruba",
    America_Barbados = "America/Barbados",
    America_BlancMinusSablon = "America/Blanc-Sablon",
    America_BoaVista = "America/Boa_Vista",
    America_Curacao = "America/Curacao",
    America_Dominica = "America/Dominica",
    America_GrandTurk = "America/Grand_Turk",
    America_Grenada = "America/Grenada",
    America_Guadeloupe = "America/Guadeloupe",
    America_Guyana = "America/Guyana",
    America_Kralendijk = "America/Kralendijk",
    America_LaPaz = "America/La_Paz",
    America_LowerPrinces = "America/Lower_Princes",
    America_Manaus = "America/Manaus",
    America_Marigot = "America/Marigot",
    America_Martinique = "America/Martinique",
    America_Montserrat = "America/Montserrat",
    America_PortofSpain = "America/Port_of_Spain",
    America_PortoVelho = "America/Porto_Velho",
    America_PuertoRico = "America/Puerto_Rico",
    America_SantoDomingo = "America/Santo_Domingo",
    America_StBarthelemy = "America/St_Barthelemy",
    America_StKitts = "America/St_Kitts",
    America_StLucia = "America/St_Lucia",
    America_StThomas = "America/St_Thomas",
    America_StVincent = "America/St_Vincent",
    America_Tortola = "America/Tortola",
    Etc_GMTPlus4 = "Etc/GMT+4",
    America_Santiago = "America/Santiago",
    Antarctica_Palmer = "Antarctica/Palmer",
    America_StJohns = "America/St_Johns",
    America_SaoPaulo = "America/Sao_Paulo",
    America_Argentina_LaRioja = "America/Argentina/La_Rioja",
    America_Argentina_RioGallegos = "America/Argentina/Rio_Gallegos",
    America_Argentina_Salta = "America/Argentina/Salta",
    America_Argentina_SanJuan = "America/Argentina/San_Juan",
    America_Argentina_SanLuis = "America/Argentina/San_Luis",
    America_Argentina_Tucuman = "America/Argentina/Tucuman",
    America_Argentina_Ushuaia = "America/Argentina/Ushuaia",
    America_BuenosAires = "America/Buenos_Aires",
    America_Catamarca = "America/Catamarca",
    America_Cordoba = "America/Cordoba",
    America_Jujuy = "America/Jujuy",
    America_Mendoza = "America/Mendoza",
    America_Araguaina = "America/Araguaina",
    America_Belem = "America/Belem",
    America_Cayenne = "America/Cayenne",
    America_Fortaleza = "America/Fortaleza",
    America_Maceio = "America/Maceio",
    America_Paramaribo = "America/Paramaribo",
    America_Recife = "America/Recife",
    America_Santarem = "America/Santarem",
    Antarctica_Rothera = "Antarctica/Rothera",
    Atlantic_Stanley = "Atlantic/Stanley",
    Etc_GMTPlus3 = "Etc/GMT+3",
    America_Godthab = "America/Godthab",
    America_Montevideo = "America/Montevideo",
    America_Bahia = "America/Bahia",
    America_Noronha = "America/Noronha",
    Atlantic_SouthGeorgia = "Atlantic/South_Georgia",
    Etc_GMTPlus2 = "Etc/GMT+2",
    America_Scoresbysund = "America/Scoresbysund",
    Atlantic_Azores = "Atlantic/Azores",
    Atlantic_CapeVerde = "Atlantic/Cape_Verde",
    Etc_GMTPlus1 = "Etc/GMT+1",
    Africa_Casablanca = "Africa/Casablanca",
    Africa_ElAaiun = "Africa/El_Aaiun",
    America_Danmarkshavn = "America/Danmarkshavn",
    Etc_GMT = "Etc/GMT",
    UTC = "UTC",
    Europe_IsleofMan = "Europe/Isle_of_Man",
    Europe_Guernsey = "Europe/Guernsey",
    Europe_Jersey = "Europe/Jersey",
    Europe_London = "Europe/London",
    Atlantic_Canary = "Atlantic/Canary",
    Atlantic_Faeroe = "Atlantic/Faeroe",
    Atlantic_Madeira = "Atlantic/Madeira",
    Europe_Dublin = "Europe/Dublin",
    Europe_Lisbon = "Europe/Lisbon",
    Africa_Abidjan = "Africa/Abidjan",
    Africa_Accra = "Africa/Accra",
    Africa_Bamako = "Africa/Bamako",
    Africa_Banjul = "Africa/Banjul",
    Africa_Bissau = "Africa/Bissau",
    Africa_Conakry = "Africa/Conakry",
    Africa_Dakar = "Africa/Dakar",
    Africa_Freetown = "Africa/Freetown",
    Africa_Lome = "Africa/Lome",
    Africa_Monrovia = "Africa/Monrovia",
    Africa_Nouakchott = "Africa/Nouakchott",
    Africa_Ouagadougou = "Africa/Ouagadougou",
    Africa_SaoTome = "Africa/Sao_Tome",
    Atlantic_Reykjavik = "Atlantic/Reykjavik",
    Atlantic_StHelena = "Atlantic/St_Helena",
    Arctic_Longyearbyen = "Arctic/Longyearbyen",
    Europe_Amsterdam = "Europe/Amsterdam",
    Europe_Andorra = "Europe/Andorra",
    Europe_Berlin = "Europe/Berlin",
    Europe_Busingen = "Europe/Busingen",
    Europe_Gibraltar = "Europe/Gibraltar",
    Europe_Luxembourg = "Europe/Luxembourg",
    Europe_Malta = "Europe/Malta",
    Europe_Monaco = "Europe/Monaco",
    Europe_Oslo = "Europe/Oslo",
    Europe_Rome = "Europe/Rome",
    Europe_SanMarino = "Europe/San_Marino",
    Europe_Stockholm = "Europe/Stockholm",
    Europe_Vaduz = "Europe/Vaduz",
    Europe_Vatican = "Europe/Vatican",
    Europe_Vienna = "Europe/Vienna",
    Europe_Zurich = "Europe/Zurich",
    Europe_Belgrade = "Europe/Belgrade",
    Europe_Bratislava = "Europe/Bratislava",
    Europe_Budapest = "Europe/Budapest",
    Europe_Ljubljana = "Europe/Ljubljana",
    Europe_Podgorica = "Europe/Podgorica",
    Europe_Prague = "Europe/Prague",
    Europe_Tirane = "Europe/Tirane",
    Africa_Ceuta = "Africa/Ceuta",
    Europe_Brussels = "Europe/Brussels",
    Europe_Copenhagen = "Europe/Copenhagen",
    Europe_Madrid = "Europe/Madrid",
    Europe_Paris = "Europe/Paris",
    Europe_Sarajevo = "Europe/Sarajevo",
    Europe_Skopje = "Europe/Skopje",
    Europe_Warsaw = "Europe/Warsaw",
    Europe_Zagreb = "Europe/Zagreb",
    Africa_Algiers = "Africa/Algiers",
    Africa_Bangui = "Africa/Bangui",
    Africa_Brazzaville = "Africa/Brazzaville",
    Africa_Douala = "Africa/Douala",
    Africa_Kinshasa = "Africa/Kinshasa",
    Africa_Lagos = "Africa/Lagos",
    Africa_Libreville = "Africa/Libreville",
    Africa_Luanda = "Africa/Luanda",
    Africa_Malabo = "Africa/Malabo",
    Africa_Ndjamena = "Africa/Ndjamena",
    Africa_Niamey = "Africa/Niamey",
    Africa_PortoMinusNovo = "Africa/Porto-Novo",
    Africa_Tunis = "Africa/Tunis",
    Etc_GMTMinus1 = "Etc/GMT-1",
    Africa_Windhoek = "Africa/Windhoek",
    Asia_Nicosia = "Asia/Nicosia",
    Europe_Athens = "Europe/Athens",
    Europe_Bucharest = "Europe/Bucharest",
    Europe_Chisinau = "Europe/Chisinau",
    Asia_Beirut = "Asia/Beirut",
    Africa_Cairo = "Africa/Cairo",
    Asia_Damascus = "Asia/Damascus",
    Europe_Helsinki = "Europe/Helsinki",
    Europe_Kiev = "Europe/Kiev",
    Europe_Mariehamn = "Europe/Mariehamn",
    Europe_Nicosia = "Europe/Nicosia",
    Europe_Riga = "Europe/Riga",
    Europe_Sofia = "Europe/Sofia",
    Europe_Tallinn = "Europe/Tallinn",
    Europe_Uzhgorod = "Europe/Uzhgorod",
    Europe_Vilnius = "Europe/Vilnius",
    Europe_Zaporozhye = "Europe/Zaporozhye",
    Africa_Blantyre = "Africa/Blantyre",
    Africa_Bujumbura = "Africa/Bujumbura",
    Africa_Gaborone = "Africa/Gaborone",
    Africa_Harare = "Africa/Harare",
    Africa_Johannesburg = "Africa/Johannesburg",
    Africa_Kigali = "Africa/Kigali",
    Africa_Lubumbashi = "Africa/Lubumbashi",
    Africa_Lusaka = "Africa/Lusaka",
    Africa_Maputo = "Africa/Maputo",
    Africa_Maseru = "Africa/Maseru",
    Africa_Mbabane = "Africa/Mbabane",
    Etc_GMTMinus2 = "Etc/GMT-2",
    Europe_Istanbul = "Europe/Istanbul",
    Asia_Jerusalem = "Asia/Jerusalem",
    Africa_Tripoli = "Africa/Tripoli",
    Asia_Amman = "Asia/Amman",
    Asia_Baghdad = "Asia/Baghdad",
    Europe_Kaliningrad = "Europe/Kaliningrad",
    Asia_Aden = "Asia/Aden",
    Asia_Bahrain = "Asia/Bahrain",
    Asia_Kuwait = "Asia/Kuwait",
    Asia_Qatar = "Asia/Qatar",
    Asia_Riyadh = "Asia/Riyadh",
    Africa_AddisAbaba = "Africa/Addis_Ababa",
    Africa_Asmera = "Africa/Asmera",
    Africa_DaresSalaam = "Africa/Dar_es_Salaam",
    Africa_Djibouti = "Africa/Djibouti",
    Africa_Juba = "Africa/Juba",
    Africa_Kampala = "Africa/Kampala",
    Africa_Khartoum = "Africa/Khartoum",
    Africa_Mogadishu = "Africa/Mogadishu",
    Africa_Nairobi = "Africa/Nairobi",
    Antarctica_Syowa = "Antarctica/Syowa",
    Etc_GMTMinus3 = "Etc/GMT-3",
    Indian_Antananarivo = "Indian/Antananarivo",
    Indian_Comoro = "Indian/Comoro",
    Indian_Mayotte = "Indian/Mayotte",
    Europe_Kirov = "Europe/Kirov",
    Europe_Moscow = "Europe/Moscow",
    Europe_Simferopol = "Europe/Simferopol",
    Europe_Volgograd = "Europe/Volgograd",
    Europe_Minsk = "Europe/Minsk",
    Europe_Astrakhan = "Europe/Astrakhan",
    Europe_Samara = "Europe/Samara",
    Europe_Ulyanovsk = "Europe/Ulyanovsk",
    Asia_Tehran = "Asia/Tehran",
    Asia_Dubai = "Asia/Dubai",
    Asia_Muscat = "Asia/Muscat",
    Etc_GMTMinus4 = "Etc/GMT-4",
    Asia_Baku = "Asia/Baku",
    Indian_Mahe = "Indian/Mahe",
    Indian_Mauritius = "Indian/Mauritius",
    Indian_Reunion = "Indian/Reunion",
    Asia_Tbilisi = "Asia/Tbilisi",
    Asia_Yerevan = "Asia/Yerevan",
    Asia_Kabul = "Asia/Kabul",
    Antarctica_Mawson = "Antarctica/Mawson",
    Asia_Aqtau = "Asia/Aqtau",
    Asia_Aqtobe = "Asia/Aqtobe",
    Asia_Ashgabat = "Asia/Ashgabat",
    Asia_Dushanbe = "Asia/Dushanbe",
    Asia_Oral = "Asia/Oral",
    Asia_Samarkand = "Asia/Samarkand",
    Asia_Tashkent = "Asia/Tashkent",
    Etc_GMTMinus5 = "Etc/GMT-5",
    Indian_Kerguelen = "Indian/Kerguelen",
    Indian_Maldives = "Indian/Maldives",
    Asia_Yekaterinburg = "Asia/Yekaterinburg",
    Asia_Karachi = "Asia/Karachi",
    Asia_Kolkata = "Asia/Kolkata",
    Asia_Calcutta = "Asia/Calcutta",
    Asia_Colombo = "Asia/Colombo",
    Asia_Kathmandu = "Asia/Kathmandu",
    Antarctica_Vostok = "Antarctica/Vostok",
    Asia_Almaty = "Asia/Almaty",
    Asia_Bishkek = "Asia/Bishkek",
    Asia_Qyzylorda = "Asia/Qyzylorda",
    Asia_Urumqi = "Asia/Urumqi",
    Etc_GMTMinus6 = "Etc/GMT-6",
    Indian_Chagos = "Indian/Chagos",
    Asia_Dhaka = "Asia/Dhaka",
    Asia_Thimphu = "Asia/Thimphu",
    Asia_Rangoon = "Asia/Rangoon",
    Indian_Cocos = "Indian/Cocos",
    Antarctica_Davis = "Antarctica/Davis",
    Asia_Bangkok = "Asia/Bangkok",
    Asia_Hovd = "Asia/Hovd",
    Asia_Jakarta = "Asia/Jakarta",
    Asia_PhnomPenh = "Asia/Phnom_Penh",
    Asia_Pontianak = "Asia/Pontianak",
    Asia_Saigon = "Asia/Saigon",
    Asia_Vientiane = "Asia/Vientiane",
    Etc_GMTMinus7 = "Etc/GMT-7",
    Indian_Christmas = "Indian/Christmas",
    Asia_Novokuznetsk = "Asia/Novokuznetsk",
    Asia_Novosibirsk = "Asia/Novosibirsk",
    Asia_Omsk = "Asia/Omsk",
    Asia_HongKong = "Asia/Hong_Kong",
    Asia_Macau = "Asia/Macau",
    Asia_Shanghai = "Asia/Shanghai",
    Asia_Krasnoyarsk = "Asia/Krasnoyarsk",
    Asia_Brunei = "Asia/Brunei",
    Asia_KualaLumpur = "Asia/Kuala_Lumpur",
    Asia_Kuching = "Asia/Kuching",
    Asia_Makassar = "Asia/Makassar",
    Asia_Manila = "Asia/Manila",
    Asia_Singapore = "Asia/Singapore",
    Etc_GMTMinus8 = "Etc/GMT-8",
    Antarctica_Casey = "Antarctica/Casey",
    Australia_Perth = "Australia/Perth",
    Asia_Taipei = "Asia/Taipei",
    Asia_Choibalsan = "Asia/Choibalsan",
    Asia_Ulaanbaatar = "Asia/Ulaanbaatar",
    Asia_Irkutsk = "Asia/Irkutsk",
    Asia_Dili = "Asia/Dili",
    Asia_Jayapura = "Asia/Jayapura",
    Asia_Tokyo = "Asia/Tokyo",
    Etc_GMTMinus9 = "Etc/GMT-9",
    Pacific_Palau = "Pacific/Palau",
    Asia_Pyongyang = "Asia/Pyongyang",
    Asia_Seoul = "Asia/Seoul",
    Australia_Adelaide = "Australia/Adelaide",
    Australia_BrokenHill = "Australia/Broken_Hill",
    Australia_Darwin = "Australia/Darwin",
    Australia_Brisbane = "Australia/Brisbane",
    Australia_Lindeman = "Australia/Lindeman",
    Australia_Melbourne = "Australia/Melbourne",
    Australia_Sydney = "Australia/Sydney",
    Antarctica_DumontDUrville = "Antarctica/DumontDUrville",
    Etc_GMTMinus10 = "Etc/GMT-10",
    Pacific_Guam = "Pacific/Guam",
    Pacific_PortMoresby = "Pacific/Port_Moresby",
    Pacific_Saipan = "Pacific/Saipan",
    Pacific_Truk = "Pacific/Truk",
    Australia_Currie = "Australia/Currie",
    Australia_Hobart = "Australia/Hobart",
    Asia_Chita = "Asia/Chita",
    Asia_Khandyga = "Asia/Khandyga",
    Asia_Yakutsk = "Asia/Yakutsk",
    Antarctica_Macquarie = "Antarctica/Macquarie",
    Etc_GMTMinus11 = "Etc/GMT-11",
    Pacific_Efate = "Pacific/Efate",
    Pacific_Guadalcanal = "Pacific/Guadalcanal",
    Pacific_Kosrae = "Pacific/Kosrae",
    Pacific_Noumea = "Pacific/Noumea",
    Pacific_Ponape = "Pacific/Ponape",
    Asia_Sakhalin = "Asia/Sakhalin",
    Asia_UstMinusNera = "Asia/Ust-Nera",
    Asia_Vladivostok = "Asia/Vladivostok",
    Antarctica_McMurdo = "Antarctica/McMurdo",
    Pacific_Auckland = "Pacific/Auckland",
    Etc_GMTMinus12 = "Etc/GMT-12",
    Pacific_Funafuti = "Pacific/Funafuti",
    Pacific_Kwajalein = "Pacific/Kwajalein",
    Pacific_Majuro = "Pacific/Majuro",
    Pacific_Nauru = "Pacific/Nauru",
    Pacific_Tarawa = "Pacific/Tarawa",
    Pacific_Wake = "Pacific/Wake",
    Pacific_Wallis = "Pacific/Wallis",
    Pacific_Fiji = "Pacific/Fiji",
    Asia_Anadyr = "Asia/Anadyr",
    Asia_Kamchatka = "Asia/Kamchatka",
    Asia_Magadan = "Asia/Magadan",
    Asia_Srednekolymsk = "Asia/Srednekolymsk",
    Etc_GMTMinus13 = "Etc/GMT-13",
    Pacific_Enderbury = "Pacific/Enderbury",
    Pacific_Fakaofo = "Pacific/Fakaofo",
    Pacific_Tongatapu = "Pacific/Tongatapu",
    Pacific_Apia = "Pacific/Apia"
}

export class DateTime {
    date: Date;
    timezone: timezones;

    unix(): number {
        return this.date.getTime();
    };

    add(amount: number = 0, unit: units = units.millisecond): DateTime {
        if (unit == units.millisecond)
            return new DateTime(this.unix() + amount);
        ;
        return new DateTime(this.unix() + (unitFactor[unit] * amount), this.timezone);
    };

    sub(amount: number = 0, unit: units = units.millisecond): DateTime {
        return this.add(-amount, unit);
    };

    setTimezone(timezone: timezones): void {
        this.timezone = timezone;
        return;
    };

    tzOffset(timezone: timezones): number {
        return getTimezoneOffset(timezone) - getTimezoneOffset(this.timezone);
    };

    tz(timezone: timezones): DateTime {
        return new DateTime(this.date.getTime()+this.tzOffset(timezone), timezone)
    };

    utc(): DateTime {
        return this.add(this.date.getTimezoneOffset(), units.minute);
    };

    constructor(date?: string | number | Date, timezone: string = defaultTimezone) {
        // @ts-ignore
        let validTimezone = Object.values(timezones).some(tz => tz == timezone)
        if(!validTimezone)
            throw new Error('invalid timezone');
        // @ts-ignore
        this.timezone = timezone;
        if (!date && typeof date != 'number'){
            this.date = new Date();
            return
        }

        if (date instanceof Date)
            this.date = date;
        else
            this.date = new Date(date);

        return this;
    };
};



