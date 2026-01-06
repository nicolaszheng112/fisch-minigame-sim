
import { Rod } from '../types';

export const RODS: Rod[] = [
  // Stage 1
  { name: "Flimsy Rod", resilience: 0, control: 0, speedBonus: 0, description: "Max Kg: 10.4" },
  { name: "Fischer's Rod", resilience: 0.05, control: 0.05, speedBonus: 0, description: "Max Kg: 100" },
  { name: "Training Rod", resilience: 0.2, control: 0.2, speedBonus: 0, description: "Max Kg: 9" },
  { name: "Plastic Rod", resilience: 0.1, control: 0, speedBonus: 0, description: "Max Kg: 100" },
  { name: "Carbon Rod", resilience: 0.1, control: 0.05, speedBonus: 0, description: "Max Kg: 600" },
  { name: "Fast Rod", resilience: -0.05, control: 0.05, speedBonus: 0, description: "Max Kg: 175" },
  { name: "Lucky Rod", resilience: 0.07, control: 0.07, speedBonus: 0, description: "Max Kg: 175" },
  { name: "Long Rod", resilience: 0.2, control: -0.1, speedBonus: 0, description: "Max Kg: 250" },
  { name: "Stone Rod", resilience: 0.05, control: 0.2, speedBonus: 0, description: "Max Kg: 50,000" },
  { name: "Rose Rend", resilience: 0.15, control: 0.15, speedBonus: 15, description: "+15% Progress Speed. Max Kg: 100,000" },
  { name: "Scarlet Ravager", resilience: 0.2, control: 0.2, speedBonus: 20, description: "+20% Progress Speed. Max Kg: 125,000" },

  // Stage 2
  { name: "Magma Rod", resilience: 0, control: 0.15, speedBonus: 0, description: "Can fish in Roslit Volcano. 35% chance for Ember (3×)" },
  { name: "Fungal Rod", resilience: 0.2, control: 0, speedBonus: 0, description: "70% chance to give 45s of +50% Luck after a catch. 30% chance for Fungal (4×)" },
  { name: "Steady Rod", resilience: 0.3, control: 0.05, speedBonus: 0, description: "Increases shake button size" },
  { name: "Fortune Rod", resilience: 0.1, control: 0.05, speedBonus: 0, description: "Max Kg: 3,000" },
  { name: "Rapid Rod", resilience: 0.09, control: 0, speedBonus: 0, description: "Max Kg: 800" },
  { name: "Magnet Rod", resilience: 0, control: 0.05, speedBonus: 0, description: "Greatly increases chances for catching Crates." },
  { name: "Nocturnal Rod", resilience: 0, control: 0, speedBonus: 0, description: "Removes time preference Luck penalty" },
  { name: "Precision Rod", resilience: 0.15, control: 0, speedBonus: 0, description: "Max Kg: 12,000" },

  // Stage 3
  { name: "Reinforced Rod", resilience: 0.15, control: 0.1, speedBonus: 0, description: "Fishing in Roslit Volcano/Brine Pool" },
  { name: "Arctic Rod", resilience: 0.15, control: 0.06, speedBonus: 0, description: "All fish caught are Frozen (1.5×)" },
  { name: "Avalanche Rod", resilience: 0.1, control: 0.15, speedBonus: 0, description: "25% chance for Sleet (2.4×)" },
  { name: "Phoenix Rod", resilience: 0.15, control: 0.02, speedBonus: 0, description: "40% chance for Scorched (3×). 10% chance for Solarblaze (3×)" },
  { name: "Scurvy Rod", resilience: 0.15, control: 0, speedBonus: 0, description: "15% chance for Greedy (5×)" },
  { name: "Midas Rod", resilience: -0.3, control: 0.2, speedBonus: 0, description: "All fish caught are Midas (2.5×)" },
  { name: "Crystalized Rod", resilience: 0.15, control: 0.15, speedBonus: 0, description: "20% chance for Crystalized (3.5×)" },
  { name: "Depthseeker Rod", resilience: 0.25, control: 0.17, speedBonus: 5, description: "+5% Progress Speed" },
  { name: "Wildflower Rod", resilience: 0.17, control: 0.17, speedBonus: 0, description: "30% chance to catch Mother Nature (3× Value)" },
  { name: "Cinder Block Rod", resilience: 10.0, control: 0.7, speedBonus: -85, description: "70% chance for Cement (1.5×). Always sets Progress Speed to -85%" },
  { name: "Boreal Rod", resilience: 0.25, control: 0.05, speedBonus: 0, description: "30% chance for Boreal (4×)" },

  // Stage 4
  { name: "Aurora Rod", resilience: 0.16, control: 0.06, speedBonus: 0, description: "15% chance for Aurora (6.5×). 30% chance for Aurora during Aurora Borealis" },
  { name: "Mythical Rod", resilience: 0.15, control: 0.05, speedBonus: 0, description: "30% chance for Mythical (5.5×)" },
  { name: "Kings Rod", resilience: 0.35, control: 0.15, speedBonus: 0, description: "+30% weight buff to all fish caught" },
  { name: "Ice Warpers Rod", resilience: 0.2, control: 0.15, speedBonus: 0, description: "25% chance for Blighted (3×)" },
  { name: "Brick Rod", resilience: 0.35, control: 0.35, speedBonus: 0, description: "100% chance for Studded (1.8×)" },
  { name: "Champions Rod", resilience: 0.2, control: 0.25, speedBonus: 0, description: "Max Kg: 100,000" },
  { name: "Friendly Rod", resilience: 100.0, control: 0.05, speedBonus: 0, description: "10% chance to catch a Friend Fish" },
  { name: "Carrot Rod", resilience: 0.25, control: 0.15, speedBonus: 0, description: "15% chance for Carrot (5×). 10% chance to create Carrot Pool" },

  // Stage 5
  { name: "Wisdom Rod", resilience: 0.4, control: -0.02, speedBonus: 0, description: "+5% XP for every perfect catch streak. -10% XP for perfect catch failed" },
  { name: "Trident Rod", resilience: 0, control: 0.05, speedBonus: 0, description: "25% chance per fish movement to stab for +6% progress. 30% chance for Atlantean (4×)" },
  { name: "Summit Rod", resilience: 0.15, control: 0.25, speedBonus: 10, description: "+10% Progress Speed. 40% chance for Frozen (1.5×). 20% chance for Sleet (2.4×)" },
  { name: "Resourceful Rod", resilience: 0.1, control: -0.01, speedBonus: 0, description: "Doubles the effect of all Bait. 60% chance to not consume Bait" },
  { name: "Volcanic Rod", resilience: 0.15, control: 0.1, speedBonus: 0, description: "25% chance for Ashen Fortune (5×). Can Fish in Roslit Volcano" },
  { name: "Voyager Rod", resilience: 0.2, control: 0.08, speedBonus: 0, description: "Laser that fills up 20% progress. 35% chance for Fossilized (3.3×)" },
  { name: "Riptide Rod", resilience: 0.2, control: 0.05, speedBonus: 0, description: "After 3 perfect catches gain 5 enhanced casts with: +30% Luck, +25% Lure Speed" },
  { name: "Seasons Rod", resilience: 0.2, control: 0.03, speedBonus: 0, description: "+40% luck for fish preferring current season. 50% chance for Seasonal Mutation" },
  { name: "Rainbow Cluster Rod", resilience: 0.25, control: 0, speedBonus: 50, description: "+50% Progress Speed. 20% chance for Rainbow Cluster (5×)" },
  { name: "Great Dreamer Rod", resilience: 0.17, control: 0.17, speedBonus: 0, description: "Every 1-4 catches, gain another fish with a 50% chance for Cursed Touch (5×)" },
  { name: "Duskwire", resilience: 1.75, control: -0.2, speedBonus: 25, description: "+25% Progress Speed. 5% chance to fill the progress bar instantly. High chance for Darkened/Chaotic" },

  // Stage 6
  { name: "Sunken Rod", resilience: 0.15, control: 0.15, speedBonus: 0, description: "25% increased chance for Treasure Map every 10 catches. 8% chance for Sunken" },
  { name: "Auric Rod", resilience: 0.2, control: 0.05, speedBonus: 0, description: "All fish caught will be Aurous/Aurelian/Aureate/Aurulent/Aureolin" },
  { name: "Rod Of The Depths", resilience: 0.1, control: 0.15, speedBonus: 0, description: "Every 3 catches, gain another Abyssal fish. 30% chance for Abyssal" },
  { name: "Rod Of The Exalted One", resilience: 0.2, control: 0.15, speedBonus: 0, description: "4× more likely to catch Exalted Relics" },
  { name: "Destiny Rod", resilience: 0.1, control: 0.2, speedBonus: 0, description: "+10% chance for Shiny (1.85×). +10% chance for Sparkling (1.85×)" },
  { name: "Abyssal Specter Rod", resilience: 0.7, control: 0.3, speedBonus: 0, description: "+20% weight buff to all fish caught. 25% chance for Abyssal (5.5×)" },
  { name: "The Lost Rod", resilience: 0.2, control: 0.08, speedBonus: 0, description: "36% chance for Lost (4.5×) after a perfect catch" },
  { name: "The Boom Ball", resilience: -5.0, control: 0.5, speedBonus: 100, description: "50% chance for Exploded (0.1×) with +100% Progress Speed" },
  { name: "Scarlet Spincaster Rod", resilience: 1.5, control: -0.2, speedBonus: 0, description: "30% chance for Crimson (4×)" },
  { name: "Vineweaver Rod", resilience: 0.4, control: 0.1, speedBonus: 10, description: "Freezes fish after 70% progress. 30% chance for Vined. +10% Forced Progress Speed" },
  { name: "Toxic Spire Rod", resilience: -0.2, control: 0.3, speedBonus: 20, description: "+20% Progress Speed. 15% chance to freeze fish & grant +70% Progress Speed. 15% chance for Toxic" },
  { name: "Nico's Yarncaster", resilience: 0.35, control: 0.1, speedBonus: 0, description: "30% chance for Skrunkly (2.5x). Chance for Nico's Nyantics fish" },

  // Stage 7
  { name: "Heaven's Rod", resilience: 0.3, control: 0.2, speedBonus: 0, description: "35% chance for Heavenly (6×)" },
  { name: "No-Life Rod", resilience: 100.0, control: 0.23, speedBonus: 0, description: "25% chance per fish movement to stab for +6% progress. 50% chance for Hexed (3×)" },
  { name: "Zeus Rod", resilience: 0.2, control: 0.05, speedBonus: 0, description: "10% chance for thunderstorm. Catches inside provide chance for Electric Shock/Charred" },
  { name: "Tempest Rod", resilience: 0.4, control: 0.15, speedBonus: 15, description: "+15% Progress Speed" },
  { name: "Kraken Rod", resilience: 0.15, control: 0.2, speedBonus: 0, description: "20% chance to double fish on catch. 10% chance to double fish with Tentacle Surge" },
  { name: "Poseidon Rod", resilience: 0.4, control: 0.2, speedBonus: 0, description: "25% chance to gain 75% of caught fish's base value. 10% chance for King's Blessing" },
  { name: "Leviathan's Fang Rod", resilience: 0.1, control: 0.1, speedBonus: 0, description: "25% chance per fish movement to stab for +3% progress. Bypasses Scylla Progress Speed lock" },
  { name: "Challenger's Rod", resilience: 0.2, control: 0.2, speedBonus: 25, description: "+25% Progress Speed" },
  { name: "Great Rod of Oscar", resilience: 0.2, control: 0.1, speedBonus: 30, description: "+30% Progress Speed. 1.35× XP from fish. 5% chance for Oscar (6.4×)" },
  { name: "Luminescent Oath", resilience: 0.12, control: 0.1, speedBonus: 0, description: "5% chance for slashes that fills up 2% progress. 15% chance for Luminescent. During Perfect Catch: Control decreases, speed increases" },
  { name: "Lucid Rod", resilience: 0.45, control: -0.05, speedBonus: 10, description: "20% chance for Lucid (3.5x) and to dupe fish caught. +10% Progress Speed" },
  { name: "Random Rod", resilience: 0.1, control: 0.1, speedBonus: 0, description: "Each cast randomizes stats: -80% to +80% Resilience, -0.3 to +0.3 Control, -77% to +100% Progress Speed" },
  { name: "Merlin's Staff", resilience: 0.5, control: 0.1, speedBonus: 0, description: "25% chance for Magical. Control decreases then resets with progress boost" },
  { name: "Cryolash", resilience: 0.75, control: -0.1, speedBonus: 0, description: "50% chance for Frozen (1.5×). 15% chance for Glacial (8×). Icicles fall increasing progress" },

  // Stage 8
  { name: "Celestial Rod", resilience: 0.25, control: 0.21, speedBonus: 0, description: "After 15 fish: +60% Lure Speed, +100% Luck, 100% chance for Celestial, +50% XP" },
  { name: "Rod Of The Eternal King", resilience: 0.15, control: 0.175, speedBonus: 0, description: "Every 30s 5% chance to get 150% luck. 60% chance for Greedy" },
  { name: "Rod Of The Forgotten Fang", resilience: 0.25, control: 0.22, speedBonus: 0, description: "25% chance for Tidal (7×). After 3 perfect catches, next catch is boosted" },
  { name: "Cerulean Fang Rod", resilience: 0.35, control: 0.25, speedBonus: 15, description: "15% for Nova. 40% chance per fish movement to stab for 8% progress. +15% Progress Speed" },
  { name: "Wicked Fang Rod", resilience: 0.15, control: 0, speedBonus: 20, description: "25% chance per fish movement to stab for +10% progress. 30% chance for Solarblaze. +20% Progress Speed" },
  { name: "Blade Of Glorp", resilience: 100.0, control: 0.05, speedBonus: 0, description: "23% chance for Gleebous. Laser strikes that reduce Control but boost Progress" },

  // Stage 9
  { name: "Ethereal Prism Rod", resilience: 0.4, control: 0.25, speedBonus: 0, description: "50% chance for Prismize (5.5×)" },
  { name: "Rod Of The Zenith", resilience: 0.12, control: -0.1, speedBonus: 0, description: "70% chance for Wrath (4.5×). 20% weight buff to all fish caught" },
  { name: "Seraphic Rod", resilience: 100.0, control: 0.25, speedBonus: 0, description: "Beam that rapidly fills up the Progress bar to 60%" },
  { name: "Spiritbinder", resilience: 0.05, control: 0.03, speedBonus: 0, description: "25% chance for Spirit (5.2×). 5% to gain a fish of the highest rarity" },
  { name: "Evil Pitchfork", resilience: -0.1, control: -0.1, speedBonus: 35, description: "20% chance for Evil (6.5×). 25% chance to stab for +6% progress. +35% Progress Speed" },
  { name: "Elder Mossripper", resilience: 0.5, control: 0.2, speedBonus: 30, description: "+45% Fish Weight. 20% chance for Shrouded. 5% chance for Mossy. +30% Progress Speed" },
  { name: "Eidolon Rod", resilience: 0, control: 0.25, speedBonus: 40, description: "35% chance for Phantom. +40% Progress Speed. At 70% Progress: Sets Speed to +666%, Control to 0.7" },

  // Stage 10
  { name: "Onirifalx", resilience: 100.0, control: 0.17, speedBonus: 70, description: "+70% Progress Speed. +5% per perfect catch. 50% chance for Levitas" },
  { name: "Ruinous Oath", resilience: 0.25, control: 0.08, speedBonus: 0, description: "5% chance for slashes. 25% chance for Luminescent. Perfect Catch: Speed increases by 5%/s" },
  { name: "Wind Elemental", resilience: 0.55, control: 0.055, speedBonus: 0, description: "Instantly fills 50% of the bar every catch. 30% chance for Breezed. Windy: +50% Progress Speed" },
  { name: "Tryhard Rod", resilience: -5.0, control: -0.37, speedBonus: 300, description: "All fish caught are Tryhard (10×). +300% Progress Speed" },

  // Stage 11
  { name: "Dreambreaker", resilience: 0.66, control: 0.23, speedBonus: 15, description: "Input inverted after 20% progress. +15% Progress Speed. 25-35% chance for Distraught" },
  { name: "Astraeus Serenade", resilience: 0.2, control: 0.3, speedBonus: 50, description: "+50% Progress Speed. Falling stars grant +3% Progress. 15% chance for Astraeus" },

  // Stage 12
  { name: "Fabulous Rod", resilience: 0.5, control: 0, speedBonus: 0, description: "26% chance for Fabulous (9.6×). Slashes for 3% progress. 3 Slashes = +0.2 Control, +200% Forced Speed" },
];
