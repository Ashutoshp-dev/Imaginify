// import FileSaver from 'file-saver';
export const surpriseMePrompts = [
  'A cathedral made entirely of melting candles, glowing with ghostly blue flames under a thunderstorm',
  'A samurai octopus wielding eight katanas, fighting robots in a flooded Tokyo street, cinematic digital art',
  'A Victorian-era dinner party where every guest has a clock for a head, surrealism oil painting',
  'An astronaut unzipping the night sky to reveal a neon galaxy beneath, vaporwave',
  'A hyper-realistic photograph of a lion with butterfly wings made of stained glass, roaring in a cyberpunk alley',
  'A colossal jellyfish floating over New York City, its tentacles made of glowing skyscraper windows',
  'A surrealist painting of a man holding an umbrella raining goldfish instead of water',
  'A ballerina with a face of shattered porcelain, dancing on a lake of liquid mercury, cinematic lighting',
  'A humanoid tree with veins of glowing lava, reaching toward a sky of floating whales',
  'A dystopian carnival where the rides are made of bones and powered by lightning',
  'A crow wearing royal armor, perched on a throne made of shattered mirrors, gothic digital art',
  'A storm made of violins raining down music notes on a futuristic city',
  'A cybernetic horse galloping across a glass desert under three suns',
  'A colossal pizza planet orbiting a soda star, with astronauts mining its crust for cheese',
  'A portrait of a queen with a crown made of writhing snakes, painted in Renaissance style',
  'A cosmic dragon curled around Saturn, breathing auroras across its rings',
  'A submarine shaped like a whale, diving into a glowing abyss filled with ancient statues',
  'A surreal macro shot of a human eye containing a tiny galaxy inside the iris',
  'A chessboard where the pieces are alive and screaming, lit by candlelight',
  'A futuristic opera where holographic wolves are singing in harmony',
  'A wizard brewing a potion inside a giant floating teacup above a cityscape',
  'A robotic raven delivering neon letters across a steampunk city at night',
  'A haunted forest where the trees grow human hands instead of leaves',
  'A colossal mechanical spider carrying an entire city on its back',
  'A surrealist circus with performers whose heads are glowing lanterns',
  'A painting of a knight with a shattered mirror shield, reflecting alternate universes',
  'A realistic photo of a desert with giant hourglasses buried in the sand',
  'A ship sailing on a sea made of stars, with constellations as waves',
  'A cyberpunk market where vendors are AI holograms selling memories',
  'A colossal ice cream cone melting into an ocean, with people surfing the syrup',
  'A phoenix rising from a skyscraper explosion, wings made of holograms',
  'A cosmic library where books float like planets in zero gravity',
  'A surrealist oil painting of a fox playing violin on top of a burning comet',
  'A colossal hand emerging from the ocean holding a futuristic city in its palm',
  'A dystopian classroom where students are robots writing on glowing chalkboards',
  'A floating castle made of glass, orbiting above a stormy Earth',
  'A surrealist battlefield where soldiers fire ink instead of bullets',
  'A portrait of a cybernetic samurai meditating under a neon bonsai tree',
  'A realistic photograph of a whale swimming through a desert sandstorm',
  'A colossal cathedral organ made of bones, played by ghostly monks',
  'A carnival ride spinning so fast it creates a black hole in the center',
  'A futuristic colosseum where holograms of ancient gods are fighting',
  'A surrealist still-life painting of fruit that bleeds neon light when sliced',
  'A landscape of mountains shaped like giant human skulls under a red eclipse',
  'A cyberpunk street where vending machines sell bottled dreams',
  'A surrealist oil painting of a man peeling his own face to reveal a galaxy inside',
  'A colossal dragonfly made of chrome soaring over a neon swamp',
  'A haunting photograph of mannequins praying inside a cathedral of ice',
];



  export function getRandomPrompt(prompt) {
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
    const randomPrompt = surpriseMePrompts[randomIndex];
  
    if (randomPrompt === prompt) return getRandomPrompt(prompt);
  
    return randomPrompt;
  }
  
//   export async function downloadImage(_id, photo) {
//     FileSaver.saveAs(photo, `download-${_id}.jpg`);
//   }