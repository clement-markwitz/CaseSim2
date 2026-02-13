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
        image: 'https://cdn.tradeit.gg/csgo%2FKilowatt%20Case_134x95.webp',
        price: 2.35,
        skinIds: [
            'skin_kukri_knife_vanilla',
            'skin_ak_inheritance',
            'skin_awp_chrome_canon',
            'skin_m4a1-s_black_lotus',
            'skin_zeus_x27_olympus',
            'skin_usp-s_jawbreaker',
            'skin_five-seven_hybrid',
            'skin_glock-18_block-18',
            'skin_sawed-off_analog_input',
            'skin_m4a4_etch_lord',
            'skin_mp7_just_smile',
            'skin_ssg08_dezastre',
            'skin_tec-9_slag',
            'skin_dual_barettas_hideout',
            'skin_mac-10_light_box',
            'skin_ump-45_motorized',
            'skin_nova_dark_sigil',
            'skin_xm1014_irezumi',
        ]
    },
    {
        id: 'gallery_case',
        name: 'Gallery Case',
        type: 'basique',
        image: 'https://cdn.tradeit.gg/csgo%2FGallery%20Case_134x95.webp',
        price: 2.89,
        skinIds: [
            'skin_kukri_knife_vanilla',
            'skin_m4a1-s_vaporwave',
            'skin_glock-18_gold_toof',
            'skin_ak47_the_outsiders',
            'skin_ump-45_neo-noir',
            'skin_p250_epicenter',
            'skin_m4a4_turbine',
            'skin_mac-10_saibā_oni',
            'skin_ssg_08_rapid_transit',
            'skin_p90_randy_rush',
            'skin_dual_barettas_hydro_strike',
            'skin_aug_luxe_trim',
            'skin_desert_eagle_calligraffiti',
            'skin_m249_hypnosis',
            'skin_r8_revolver_tango',
            'skin_mp5-sd_statics',
            'skin_scar-20_trail_blazer',
            'skin_usp-s_27',

        ]
    },
    {
        id: 'fever_case',
        name: 'Fever Case',
        type: 'basique',
        image: 'https://cdn.tradeit.gg/csgo%2FFever%20Case_134x95.webp',
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
    },
    {
        id: 'chroma_2_case',
        name: 'Chroma 2 Case',
        type: 'basique',
        image: 'https://cdn.tradeit.gg/csgo%2FChroma%202%20Case_134x95.webp',
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
    },
    {
        id: 'chroma_case',
        name: 'Chroma Case',
        type: 'basique',
        image: 'https://cdn.tradeit.gg/csgo%2FChroma%20Case_134x95.webp',
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
    },
    {
        id: 'clutch_case',
        name: 'Clutch Case',
        type: 'basique',
        image: 'https://cdn.tradeit.gg/csgo%2FClutch%20Case_134x95.webp',
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
    },
    {
        id: 'cs20_case',
        name: 'CS20 Case',
        type: 'basique',
        image: 'https://cdn.tradeit.gg/csgo%2FCS20%20Case_134x95.webp',
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
    },
    {
        id: 'falchion_case',
        name: 'Falchion Case',
        type: 'basique',
        image: 'https://cdn.tradeit.gg/csgo%2FFalchion%20Case_134x95.webp',
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
    },
    {
        id: 'fracture_case',
        name: 'Fracture Case',
        type: 'basique',
        image: 'https://cdn.tradeit.gg/csgo%2FFracture%20Case_134x95.webp',
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
    },
    {
        id: 'gamma_2_case',
        name: 'Gamma 2 Case',
        type: 'basique',
        image: 'https://cdn.tradeit.gg/csgo%2FGamma%202%20Case_134x95.webp',
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
    },
    {
        id: 'glove_case',
        name: 'Glove Case',
        type: 'basique',
        image: 'https://cdn.tradeit.gg/csgo%2FGlove%20Case_134x95.webp',
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
    },
    {
        id: 'horizon_case',
        name: 'Horizon Case',
        type: 'basique',
        image: 'https://cdn.tradeit.gg/csgo%2FHorizon%20Case_134x95.webp',
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
    },
    {
        id: 'huntsman_weapon_case',
        name: 'Huntsman Weapon Case',
        type: 'basique',
        image: 'https://cdn.tradeit.gg/csgo%2FHuntsman%20Weapon%20Case_134x95.webp',
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
    },
    {
        id: 'operation_breakout_case',
        name: 'Operation Breakout Case',
        type: 'basique',
        image: 'https://cdn.tradeit.gg/csgo%2FOperation%20Breakout%20Weapon%20Case_70x48.webp',
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
    },
    {
        id: 'operation_broken_fang_case',
        name: 'Operation Broken Fang Case',
        type: 'basique',
        image: 'https://cdn.tradeit.gg/csgo%2FOperation%20Broken%20Fang%20Case_134x95.webp',
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
    },
    {
        id: 'operation_hydra_case',
        name: 'Operation Hydra Case',
        type: 'basique',
        image: 'https://cdn.tradeit.gg/csgo%2FOperation%20Hydra%20Case_134x95.webp',
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
    },
    {
        id: 'operation_pheonix_case',
        name: 'Operation Phoenix Case',
        type: 'basique',
        image: 'https://cdn.tradeit.gg/csgo%2FOperation%20Phoenix%20Weapon%20Case_70x48.webp',
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
    },
    {
        id: 'operation_riptide_case',
        name: 'Operation Riptide Case',
        type: 'basique',
        image: 'https://cdn.tradeit.gg/csgo%2FOperation%20Riptide%20Case_134x95.webp',
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
    },
    {
        id: 'operation_vanguard_case',
        name: 'Operation Vanguard Case',
        type: 'basique',
        image: 'https://cdn.tradeit.gg/csgo%2FOperation%20Vanguard%20Weapon%20Case_70x48.webp',
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
    },
    {
        id: 'operation_wildfire_case',
        name: 'Operation Wildfire Case',
        type: 'basique',
        image: 'https://cdn.tradeit.gg/csgo%2FOperation%20Wildfire%20Case_134x95.webp',
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
    },
    {
        id: 'prisma_2_case',
        name: 'Prisma 2 Case',
        type: 'basique',
        image: 'https://cdn.tradeit.gg/csgo%2FPrisma%202%20Case_134x95.webp',
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
    },
    {
        id: 'prisma_case',
        name: 'Prisma Case',
        type: 'basique',
        image: 'https://cdn.tradeit.gg/csgo%2FPrisma%20Case_134x95.webp',
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
    },
    {
        id: 'revolver_case',
        name: 'Revolver Case',
        type: 'basique',
        image: 'https://cdn.tradeit.gg/csgo%2FRevolver%20Case_134x95.webp',
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
    },
    {
        id: 'shadow_case',
        name: 'Shadow Case',
        type: 'basique',
        image: 'https://cdn.tradeit.gg/csgo%2FShadow%20Case_134x95.webp',
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
    },
    {
        id: 'shattered_web_case',
        name: 'Shattered Web Case',
        type: 'basique',
        image: 'https://cdn.tradeit.gg/csgo%2FShattered%20Web%20Case_134x95.webp',
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
    },
    {
        id: 'spectrum_2_case',
        name: 'Spectrum 2 Case',
        type: 'basique',
        image: 'https://cdn.tradeit.gg/csgo%2FSpectrum%202%20Case_134x95.webp',
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
    },
    {
        id: 'spectrum_case',
        name: 'Spectrum Case',
        type: 'basique',
        image: 'https://cdn.tradeit.gg/csgo%2FSpectrum%20Case_134x95.webp',
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
    },
    {
        id: 'winter_offensive_case',
        name: 'Winter Offensive Case',
        type: 'basique',
        image: 'https://cdn.tradeit.gg/csgo%2FWinter%20Offensive%20Weapon%20Case_70x48.webp',
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
    },
    {
        id: 'recoil_case',
        name: 'Recoil Case',
        type: 'basique',
        image: 'https://cdn.tradeit.gg/csgo%2FRecoil%20Case_134x95.webp',
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
    },
    {
        id: 'revolute_case',
        name: 'Revolute Case',
        type: 'basique',
        image: 'https://cdn.tradeit.gg/csgo%2FRevolution%20Case_134x95.webp',
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
    },
    {
        id: 'CS:GO_weapon_case_2',
        name: 'CS:GO Weapon Case 2',
        type: 'basique',
        image: 'https://cdn.tradeit.gg/csgo%2FCS-GO%20Weapon%20Case%202_134x95.webp',
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
    }, {
        id: 'CS:GO_weapon_case_3',
        name: 'CS:GO Weapon Case 3',
        type: 'basique',
        image: 'https://cdn.tradeit.gg/csgo%2FCS-GO%20Weapon%20Case%203_134x95.webp',
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
    },
    {
        id: 'CS:GO_weapon_case',
        name: 'CS:GO Weapon Case',
        type: 'basique',
        image: 'https://cdn.tradeit.gg/csgo%2FCS-GO%20Weapon%20Case_134x95.webp',
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
    },
    {
        id: 'danger_zone_case',
        name: 'Danger Zone Case',
        type: 'basique',
        image: 'https://cdn.tradeit.gg/csgo%2FDanger%20Zone%20Case_134x95.webp',
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
    },
    {
        id: 'dreams_&_nightmares_case',
        name: 'Dreams & Nightmares Case',
        type: 'basique',
        image: 'https://cdn.tradeit.gg/csgo%2FDreams%20%26%20Nightmares%20Case_134x95.webp',
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
    },
    {
        id: 'ESports_2013_case',
        name: 'ESports 2013 Case',
        type: 'basique',
        image: 'https://cdn.tradeit.gg/csgo%2FeSports%202013%20Case_134x95.webp',
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
    },
    {
        id: 'ESports_2013_winter_case',
        name: 'ESports 2013 Winter Case',
        type: 'basique',
        image: 'https://cdn.tradeit.gg/csgo%2FeSports%202013%20Winter%20Case_134x95.webp',
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
    },
    {
        id: 'ESports_2014_summer_case',
        name: 'ESports 2014 Summer Case',
        type: 'basique',
        image: 'https://cdn.tradeit.gg/csgo%2FeSports%202014%20Summer%20Case_134x95.webp',
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
    },
    {
        id: 'operation_bravo_case',
        name: 'Operation Bravo Case',
        type: 'basique',
        image: 'https://cdn.tradeit.gg/csgo%2FOperation%20Bravo%20Case_134x95.webp',
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
    },

];