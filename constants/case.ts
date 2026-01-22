export interface Case {
    id: string;
    name: string; // Ex: "Revolution Case"
    image: string;
    price: number; // Prix de la clé (ex: 2.35)
    skinIds: string[]; // C'est ici qu'on fait la liaison !
    type: 'basique' | 'souvenir' | 'sticker';
}

export const CASES: Case[] = [
    {
        id: 'kilowatt_case',
        name: 'Kilowatt Case',
        type: 'basique',
        image: 'https://community.fastly.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_frnEVvqf_a6VoIfGSXz7Hlbwg57QwSS_mxhl15jiGyN37c3_GZw91W8BwRflK7EfKsa2sfw/330x192?allow_animated=1',
        price: 2.35,
        skinIds: [
            'skin_ak_inheritance',
            'skin_awp_chrome_canon',
            'skin_m4a1-s_black_lotus',
            'skin_usp-s_jawbreaker',
            'skin_five-seven_hybrid',
            'skin_ssg08_dezastre',
            'skin_kukri_knife_vanilla'
        ]
    }
];