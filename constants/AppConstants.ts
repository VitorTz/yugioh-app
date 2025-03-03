import { CardOrderBy, Order } from "@/helpers/types";
import { Colors } from "./Colors";
import { wp, hp } from "@/helpers/util";
import { Platform } from "react-native";

export const API_CARD_WITH = 813
export const API_CARD_HEIGHT = 1185

export const WIDTH = wp(100)
export const GRID_COLUMNS = WIDTH < 500 ? 3 : WIDTH < 900 ? 5 : 12
export const DEFAULT_HORIZONTAL_PADDING = 20
export const IMAGE_GRID_GAP = 16
export const IMAGE_GRID_WIDTH = (wp(100) - DEFAULT_HORIZONTAL_PADDING - (GRID_COLUMNS * IMAGE_GRID_GAP)) / GRID_COLUMNS
export const IMAGE_GRID_HEIGHT = IMAGE_GRID_WIDTH * (API_CARD_HEIGHT / API_CARD_WITH)
export const CARD_FETCH_LIMIT = Platform.OS == "web" ? 120 : 60
export const DECK_FETCH_LIMIT = Platform.OS == "web" ? 120 : 60


export const AppConstants = {
    icon: {
        size: 32,
        color: Colors.orange
    },
    hitSlopLarge: {
        left: 20,
        top: 20,
        right: 20,
        bottom: 20
    },
    hitSlop: {
        left: 10,
        top: 10,
        right: 10,
        bottom: 10
    },
    githubUrl: "https://github.com/VitorTz/yugioh-app",
    profileOptions: [
        {
          title: "Profile",
          subtitle: "name, email, password",
          iconName: "person-outline",
          shouldShowLoadingStatus: false
        },
        {
          title: "Settings",
          subtitle: "color theme",
          iconName: "settings-outline",
          shouldShowLoadingStatus: false
        },
        {
          title: "Github",
          subtitle: "source code",
          iconName: "logo-github",
          shouldShowLoadingStatus: false
        },
        {
          title: "Logout",
          subtitle: null,
          iconName: "log-out-outline",
          shouldShowLoadingStatus: true
        }
    ],
    blurhash: '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['
}

export const DECK_TYPES = [
  "Structure",
  "Starter",
  "Speed Duel",
  "Community"
].sort()

export const ARCHETYPES = [
  "\"C\"",
  "-Eyes Dragon",
  "25Th Anniversary Monsters",
  "@Ignister",
  "A-To-Z",
  "A.I.",
  "Abc",
  "Abyss Actor",
  "Abyss Script",
  "Abyss-",
  "Adamancipator",
  "Advanced Crystal Beast",
  "Adventurer",
  "Adventurer Token",
  "Aesir",
  "Aether",
  "Albaz Dragon",
  "Alien",
  "Alligator",
  "Allure Queen",
  "Ally Of Justice",
  "Altergeist",
  "Amazement",
  "Amazoness",
  "Amorphage",
  "Ancient Fairy Dragon",
  "Ancient Gear",
  "Ancient Treasure",
  "Ancient Warriors",
  "Anotherverse",
  "Anti",
  "Apoqliphort",
  "Appliancer",
  "Aqua Jet",
  "Aquaactress",
  "Aquamirror",
  "Arcana Force",
  "Archfiend",
  "Argostars",
  "Armed Dragon",
  "Aroma",
  "Artifact",
  "Ashened",
  "Assault Mode",
  "Atlantean",
  "Attraction",
  "Attribute Summoner",
  "Azamina",
  "B.E.S.",
  "Bamboo Sword",
  "Barbaros",
  "Barian'S",
  "Batteryman",
  "Battleguard",
  "Battlewasp",
  "Battlin' Boxer",
  "Battlin' Boxing",
  "Beetrooper",
  "Black Luster Soldier",
  "Blackwing",
  "Blaze Accelerator",
  "Blue Tears",
  "Blue-Eyes",
  "Bonding",
  "Book Of",
  "Boot-Up",
  "Borrel",
  "Bounzer",
  "Branded",
  "Broken World",
  "Bugroth",
  "Bujin",
  "Burning Abyss",
  "Butterfly",
  "Butterspy",
  "Bystial",
  "Cataclysmic",
  "Celebration",
  "Celtic Guard",
  "Centur-Ion",
  "Chaos",
  "Chaos Phantom",
  "Charmer",
  "Chemicritter",
  "Chimera",
  "Chronomaly",
  "Chrysalis",
  "Cipher",
  "Circular",
  "Clear",
  "Clear Wing",
  "Cloudian",
  "Code Talker",
  "Codebreaker",
  "Constellar",
  "Contact",
  "Corn",
  "Cosmic Synchro Monster",
  "Counter Fairy",
  "Crusadia",
  "Crystal",
  "Crystal Beast",
  "Crystron",
  "Cubic",
  "Cupid",
  "Curse Of Dragon",
  "Cxyz",
  "Cyber",
  "Cyber Angel",
  "Cyber Dragon",
  "Cyberdark",
  "Cynet",
  "D.D.",
  "D/D",
  "Danger!",
  "Dark Contract",
  "Dark Counterpart",
  "Dark Magician",
  "Dark Scorpion",
  "Dark World",
  "Darklord",
  "Deep Sea",
  "Demise",
  "Deskbot",
  "Despia",
  "Destiny Hero",
  "Destruction Sword",
  "Diabell",
  "Diabellstar",
  "Dice",
  "Digital Bug",
  "Dinomist",
  "Dinomorphia",
  "Dinowrestler",
  "Divine Dragon",
  "Djinn",
  "Dododo",
  "Dogmatika",
  "Doll",
  "Doll Monster",
  "Doodle Beast",
  "Doodlebook",
  "Doriado",
  "Draconia",
  "Dracoslayer",
  "Dracoverlord",
  "Dragon Ruler",
  "Dragonmaid",
  "Dragunity",
  "Dream Mirror",
  "Drytron",
  "Dual Avatar",
  "Duston",
  "Earthbound",
  "Edge Imp",
  "Egyptian God",
  "Eldlich",
  "Eldlixir",
  "Elemental Hero",
  "Elemental Lord",
  "Elementsaber",
  "Emblema",
  "Empower",
  "Empowered Warrior",
  "Endymion",
  "Evil Eye",
  "Evil Hero",
  "Evil★Twin",
  "Evol",
  "Evolsaur",
  "Evoltile",
  "Evolzar",
  "Exchange Of The Spirit",
  "Exodd",
  "Exodia",
  "Exosister",
  "Eyes Restrict",
  "F.A.",
  "Fabled",
  "Fairy",
  "Fairy Tail",
  "Fan-Made Cards",
  "Favorite",
  "Felgrand",
  "Field Searcher",
  "Fiendsmith",
  "Fire Fist",
  "Fire Formation",
  "Fire King",
  "Firewall",
  "Fishborg",
  "Flame Swordsman",
  "Flamvell",
  "Fleur",
  "Floowandereeze",
  "Flower Cardian",
  "Fluffal",
  "Forbidden",
  "Fortress Whale",
  "Fortune Fairy",
  "Fortune Lady",
  "Fossil",
  "Frightfur",
  "Frog",
  "From The Underworld",
  "Fur Hire",
  "Fusion",
  "G Golem",
  "Gadget",
  "Gagaga",
  "Gaia Knight",
  "Gaia The Fierce Knight",
  "Galaxy",
  "Galaxy-Eyes",
  "Gandora",
  "Gate Guardian",
  "Geargia",
  "Gem Dragon",
  "Gem-",
  "Generaider",
  "Genex",
  "Ghostrick",
  "Ghoti",
  "Gimmick Puppet",
  "Gishki",
  "Gizmek",
  "Glacial Beast",
  "Gladiator",
  "Gladiator Beast",
  "Goblin",
  "Gogogo",
  "Gold Pride",
  "Golden Castle Of Stromberg",
  "Golden Land",
  "Gorgonic",
  "Gouki",
  "Gransolfachord",
  "Gravekeeper'S",
  "Graydle",
  "Greed",
  "Grepher",
  "Guardian",
  "Guardragon",
  "Gunkan",
  "Gusto",
  "Harpie",
  "Hazy",
  "Heart",
  "Herald",
  "Heraldic",
  "Heraldry",
  "Hero",
  "Heroic",
  "Hi-Speedroid",
  "Hieratic",
  "Hole",
  "Holy Knight",
  "Horus",
  "Horus The Black Flame Dragon",
  "Hunder",
  "Hyperion",
  "Ice Barrier",
  "Icejade",
  "Igknight",
  "Impcantation",
  "Indestructible Insect",
  "Infernity",
  "Infernoble Arms",
  "Infernoble Knight",
  "Infernoid",
  "Infestation",
  "Infinitrack",
  "Invoked",
  "Inzektor",
  "Iron Chain",
  "Jar",
  "Jester",
  "Jinzo",
  "Junk",
  "Jurrac",
  "Kaiju",
  "Kairyu-Shin",
  "Karakuri",
  "Kashtira",
  "Ki-Sikil",
  "Knight",
  "Knightmare",
  "Koa'Ki Meiru",
  "Koala",
  "Konami Arcade Games",
  "Kozmo",
  "Krawler",
  "Kuriboh",
  "Labrynth",
  "Labyrinth Wall",
  "Lady Of Lament",
  "Laval",
  "Legendary Knight",
  "Libromancer",
  "Light And Darkness Dragon",
  "Lightsworn",
  "Lil-La",
  "Live☆Twin",
  "Lswarm",
  "Lunalight",
  "Lyrilusc",
  "Machina",
  "Machine Angel",
  "Madolche",
  "Madoor",
  "Magical Musket",
  "Magician",
  "Magician Girl",
  "Magikey",
  "Magistus",
  "Magnet Warrior",
  "Majespecter",
  "Majestic",
  "Maju",
  "Malefic",
  "Malicevorous",
  "Maliss",
  "Man-Eater Bug",
  "Mannadium",
  "Marincess",
  "Martial Art Spirit",
  "Mask",
  "Masked Hero",
  "Materiactor",
  "Mathmech",
  "Mayakashi",
  "Mecha Phantom Beast",
  "Megalith",
  "Mekk-Knight",
  "Meklord",
  "Melffy",
  "Melodious",
  "Memento",
  "Mermail",
  "Metalfoes",
  "Metalmorph",
  "Metaphys",
  "Mikanko",
  "Millennium",
  "Mimighoul",
  "Mirror Trap",
  "Mist Valley",
  "Mitsurugi",
  "Mokey Mokey",
  "Monarch",
  "Morganite",
  "Morphtronic",
  "Motor",
  "Mulcharmy",
  "Mystical Beast Of The Forest",
  "Mythical Beast",
  "Myutant",
  "Naturia",
  "Nekroz",
  "Nemeses",
  "Nemleria",
  "Nemurelia",
  "Neo Space",
  "Neo-Spacian",
  "Neos",
  "Nephthys",
  "Nimble",
  "Ninja",
  "Ninjitsu Art",
  "Noble Arms",
  "Noble Knight",
  "Nordic",
  "Nouvelles",
  "Number",
  "Numeron",
  "Odd-Eyes",
  "Ogdoadic",
  "Ojama",
  "Onomat",
  "Orcust",
  "Overlay",
  "P.U.N.K.",
  "Paladins Of Dragons",
  "Paleozoic",
  "Panik'S Monsters",
  "Parasite",
  "Parshath",
  "Patissciel",
  "Pendulum",
  "Pendulum Dragon",
  "Penguin",
  "Performage",
  "Performapal",
  "Phantasm",
  "Phantasm Spiral",
  "Phantom Beast",
  "Phantom Knights",
  "Photon",
  "Plunder Patroll",
  "Polymerization",
  "Possessed",
  "Potan",
  "Power Tool",
  "Prank-Kids",
  "Predap",
  "Predaplant",
  "Prediction Princess",
  "Priestess",
  "Primite",
  "Prophecy",
  "Psy-Frame",
  "Puppet",
  "Purrely",
  "Qli",
  "Ragnaraika",
  "Raidraptor",
  "Rainbow Bridge",
  "Raizeol",
  "Rank-Up-Magic",
  "Recipe",
  "Recolored Counterpart",
  "Red-Eyes",
  "Regenesis",
  "Relinquished",
  "Reptilianne",
  "Rescue Squad",
  "Rescue-Ace",
  "Resonator",
  "Rikka",
  "Risebell",
  "Ritual Beast",
  "Roid",
  "Rokket",
  "Roland",
  "Rose",
  "Rose Dragon",
  "Runick",
  "Ryu-Ge",
  "Ryzeal",
  "S-Force",
  "Saber",
  "Sacred Beast",
  "Salamandra",
  "Salamangreat",
  "Sangen",
  "Scareclaw",
  "Schoolwork",
  "Scrap",
  "Scrap-Iron",
  "Sea Stealth",
  "Secret Six Samurai",
  "Seventh",
  "Shaddoll",
  "Shark",
  "Shining Sarcophagus",
  "Shinobird",
  "Shiranui",
  "Signature Move",
  "Silent Magician",
  "Silent Swordsman",
  "Simorgh",
  "Sinful Spoils",
  "Six Samurai",
  "Six Strike",
  "Skilled Magician",
  "Skull Servant",
  "Sky Scourge",
  "Sky Striker",
  "Skyblaster",
  "Slime",
  "Snake-Eye",
  "Solemn",
  "Solfachord",
  "Speedroid",
  "Spellbook",
  "Sphinx",
  "Spider",
  "Spirit Message",
  "Spiritual Art",
  "Spright",
  "Springans",
  "Spyral",
  "Star",
  "Star Seraph",
  "Stardust",
  "Starliege",
  "Starry Knight",
  "Stealth Kragen",
  "Steelswarm",
  "Stellarknight",
  "Subterror",
  "Sunavalon",
  "Sunseed",
  "Sunvine",
  "Super Defense Robot",
  "Super Quant",
  "Superheavy",
  "Superheavy Samurai",
  "Supreme King",
  "Swarm Of",
  "Swordsoul",
  "Sylvan",
  "Symphonic Warrior",
  "Synchro",
  "Synchron",
  "T.G.",
  "Tachyon",
  "Tearlaments",
  "Tellarknight",
  "Tenpai Dragon",
  "Tenyi",
  "Test",
  "The Agent",
  "The Sanctuary In The Sky",
  "The Weather",
  "Therion",
  "Thunder Dragon",
  "Time Thief",
  "Timelord",
  "Tindangle",
  "Tistina",
  "Toon",
  "Toy",
  "Train",
  "Transcendosaurus",
  "Trap Hole",
  "Trap Monster",
  "Traptrix",
  "Tri-Brigade",
  "Triamid",
  "Trickstar",
  "True Draco",
  "U.A.",
  "Umbral Horror",
  "Umi",
  "Unchained",
  "Underworld",
  "Uniform Nomenclature",
  "Ursarctic",
  "Utopia",
  "Utopic",
  "Vaalmonica",
  "Valkyrie",
  "Vampire",
  "Vanquish Soul",
  "Vassal",
  "Vaylantz",
  "Veda",
  "Vendread",
  "Venom",
  "Vernusylph",
  "Virtual World",
  "Visas",
  "Vision Hero",
  "Voiceless Voice",
  "Void",
  "Volcanic",
  "Vylon",
  "War Rock",
  "Watt",
  "Wedju",
  "White",
  "White Forest",
  "Wicked God",
  "Wight",
  "Wind-Up",
  "Windwitch",
  "Witchcrafter",
  "With Eyes Of Blue",
  "World Chalice",
  "World Legacy",
  "Worm",
  "X-Saber",
  "Xyz",
  "Yang Zing",
  "Yosenju",
  "Yubel",
  "Zefra",
  "Zera",
  "Zexal",
  "Zombie Counterpart",
  "Zoodiac"
]

export const RACES = [
  "Warrior",     
  "Counter",     
  "Machine", 
  "Arkana", 
  "Cyberse", 
  "Fairy",   
  "Pyro",   
  "Fish",   
  "Insect", 
  "Nightshroud", 
  "Mako",   
  "Winged Beast", 
  "Lumis Umbra", 
  "Reptile", 
  "Equip",   
  "Dragon",       
  "Rock",   
  "Normal",   
  "Field",     
  "Plant", 
  "Tyranno Hassl",  
  "Sea Serpent", 
  "Dinosaur", 
  "Illusion",   
  "Beast-Warrior",         
  "Thunder",   
  "Spellcaster", 
  "Psychic",   
  "Fiend", 
  "Aqua", 
  "Ritual", 
  "Beast",  
  "Continuous", 
  "Wyrm",
  "Creator God",
  "Syrus Truesda",
  "Zombie",
  "Rex",  
  "Divine-Beast"
].sort()

export const CARD_TYPES = [
  "Effect Monster", 
  "Flip Effect Monster", 
  "Flip Tuner Effect Monster", 
  "Fusion Monster", 
  "Gemini Monster", 
  "Link Monster", 
  "Normal Monster", 
  "Normal Tuner Monster", 
  "Pendulum Effect Fusion Monster", 
  "Pendulum Effect Monster", 
  "Pendulum Effect Ritual Monster",
  "Pendulum Flip Effect Monster", 
  "Pendulum Normal Monster", 
  "Pendulum Tuner Effect Monster", 
  "Ritual Effect Monster", 
  "Ritual Monster", 
  "Skill Card", 
  "Spell Card", 
  "Spirit Monster", 
  "Synchro Monster", 
  "Synchro Pendulum Effect Monster", 
  "Synchro Tuner Monster", 
  "Token",
  "Toon Monster", 
  "Trap Card", 
  "Tuner Monster", 
  "Union Effect Monster", 
  "Xyz Monster", 
  "Xyz Pendulum Effect Monster"
]


export const FRAMETYPES = [
  "Synchro_Pendulum", 
  "Normal_Pendulum", 
  "Spell", 
  "Trap", 
  "Token", 
  "Fusion", 
  "Xyz", 
  "Fusion_Pendulum", 
  "Xyz_Pendulum", 
  "Ritual", 
  "Synchro", 
  "Effect_Pendulum", 
  "Skill",
  "Ritual_Pendulum", 
  "Effect", 
  "Normal", 
  "Link"
].sort()

export const ATTRIBUTES = [
  "Dark", 
  "Divine", 
  "Earth", 
  "Fire", 
  "Light", 
  "Water", 
  "Wind"
].sort()

export const CARD_ORDER_BY_OPTIONS: CardOrderBy[] = [
  'name',
  'attack',
  'defence',
  'level'
]


export const ORDER_OPTIONS: Order[] = [
  "ASC",
  "DESC"
]