export interface TreeTemplate {
  id: number
  name: string
  description: string
  image: string
  accentColor: string
  spirits: string
  mood: string
}

export const TREE_TEMPLATES: TreeTemplate[] = [
  {
    id: 1,
    name: "The Eternal Oak",
    description: "Full cosmic amber & gold. The original sacred tree with spirit ancestors glowing in the roots.",
    image: "/images/family-trees/1-the-eternal-oak.jpg",
    accentColor: "#FF9500",
    spirits: "Wolf, Eagle, Turtle",
    mood: "Cosmic / Sacred",
  },
  {
    id: 2,
    name: "The Seedling",
    description: "A young tree just beginning its journey. Roots-forward with delicate branches reaching for the sky.",
    image: "/images/family-trees/2-the-seedling.jpg",
    accentColor: "#48bb78",
    spirits: "Wolf Cub, Young Eagle",
    mood: "New Beginnings",
  },
  {
    id: 3,
    name: "Autumn Fire",
    description: "Crimson, copper & gold leaves cascading like fire. The harvest tree of remembrance.",
    image: "/images/family-trees/3-autumn-fire.jpg",
    accentColor: "#e53e3e",
    spirits: "Bear, Owl, Fox",
    mood: "Warm / Harvest",
  },
  {
    id: 4,
    name: "Winter Ancestor",
    description: "Ice-blue roots with ancestral spirits glowing beneath the frost. Northern lights dance above.",
    image: "/images/family-trees/4-winter-ancestor.jpg",
    accentColor: "#4fd1c5",
    spirits: "Arctic Wolf, Snow Owl, Polar Bear",
    mood: "Mystical / Ice",
  },
  {
    id: 5,
    name: "Spring Renewal",
    description: "Fresh green buds, cherry blossoms, and a rainbow serpent coiled in luminous roots.",
    image: "/images/family-trees/5-spring-renewal.jpg",
    accentColor: "#68d391",
    spirits: "Rainbow Serpent, Hummingbird",
    mood: "Rebirth / Growth",
  },
  {
    id: 6,
    name: "Summer Canopy",
    description: "Lush deep green canopy with golden sunlight streaming through. Fireflies dance at dusk.",
    image: "/images/family-trees/6-summer-canopy.jpg",
    accentColor: "#ecc94b",
    spirits: "Deer, Eagle, Wildflowers",
    mood: "Abundance / Light",
  },
  {
    id: 7,
    name: "Midnight Cosmic",
    description: "Branches transform into stardust. Roots become a swirling galaxy of ancestral spirits.",
    image: "/images/family-trees/7-midnight-cosmic.jpg",
    accentColor: "#9f7aea",
    spirits: "Stellar Wolf, Cosmic Eagle",
    mood: "Cosmic / Infinite",
  },
  {
    id: 8,
    name: "Desert Medicine",
    description: "Red canyon earth, sagebrush, and petroglyphs. The Southwest healing tree.",
    image: "/images/family-trees/8-desert-medicine.jpg",
    accentColor: "#ed8936",
    spirits: "Coyote, Red Hawk, Tortoise",
    mood: "Earthy / Warm",
  },
  {
    id: 9,
    name: "Tropical Water",
    description: "Lush jungle greens with a waterfall behind the trunk. Roots flow through crystal water.",
    image: "/images/family-trees/9-tropical-water.jpg",
    accentColor: "#38b2ac",
    spirits: "Sea Turtle, Jaguar, Manatee",
    mood: "Flowing / Lush",
  },
  {
    id: 10,
    name: "The Council Tree",
    description: "The most regal tree. Elders' faces carved in bark. Wolf pack & eagle council guard the roots.",
    image: "/images/family-trees/10-the-council-tree.jpg",
    accentColor: "#d69e2e",
    spirits: "Wolf Pack, Eagle Council, Great Turtle",
    mood: "Regal / Eternal",
  },
]
