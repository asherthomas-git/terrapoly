export type TileType =
  | "start"
  | "property"
  | "tax"
  | "chance"
  | "treasure"
  | "airport"
  | "utility"
  | "jail"
  | "goToJail"
  | "parking";

export type TileData = {
  id: number
  name: string
  type: TileType
  sdgno?: string
  prop?: string
  icon?: string
  region?: string
  cat?: string
  desc?: string
  catsec?: string

  // ✅ ADDED ONLY THIS FIELD
  category?: "Climate" | "Education" | "Health" | "Economy" | "Justice" | "Event" }

export const tiles: TileData[] = [
  { "id": 0, "name": "START", "prop": "🚀 START", "type": "start", "region": "—", "cat": "corner", "desc": "Every player begins here. Collect 200 Impact Points each time you pass START to invest in SDG projects.", "category": "Event" },

  { "id": 1, "name": "Solar Farms", "prop": "☀️ Solar Farms", "type": "property", "sdgno": "SDG 7", "region": "Sub-Saharan Africa", "cat": "#26B68A", "catsec": "rgba(38, 182, 138, 0.8)", "desc": "Build large-scale solar energy farms to power millions of rural homes with clean electricity and reduce carbon emissions.", "icon": "/flags/Climate.png", "category": "Climate" },

  { "id": 2, "name": "Girls Education", "prop": "📖 Girls Education", "type": "property", "sdgno": "SDG 4&5", "region": "South Asia", "cat": "#E6A70A", "catsec": "rgba(230, 167, 10, 0.8)", "desc": "Fund schools, scholarships and safety programs for girls in South Asia to combat gender inequality and illiteracy.", "category": "Education" },

  { "id": 3, "name": "Headlines", "prop": "🃏 Global Headlines", "type": "chance", "region": "—", "cat": "event", "desc": "A world event has occurred. Draw a Global Headlines card. Could be a major gain or a devastating loss.", "category": "Event" },

  { "id": 4, "name": "Water Pipeline", "prop": "💧 Clean Water Pipeline", "type": "property", "sdgno": "SDG 6", "region": "Sub-Saharan Africa", "cat": "#2B77C2", "catsec": "rgba(43, 119, 194, 0.8)", "desc": "Build clean water pipelines and sanitation systems across rural Sub-Saharan Africa, preventing waterborne disease.", "category": "Health" },

  { "id": 5, "name": "Green Jobs", "prop": "🏭 Green Jobs Program", "type": "property", "sdgno": "SDG 8", "region": "Industrial Regions", "cat": "#E4693F", "catsec": "rgba(228, 105, 63, 0.8)", "desc": "Retrain fossil fuel workers and create new green energy jobs, accelerating the clean energy transition.", "category": "Economy" },

  { "id": 6, "name": "Headlines", "prop": "🃏 Global Headlines", "type": "treasure", "region": "—", "cat": "event", "desc": "A world event has occurred. Draw a Global Headlines card.", "category": "Event" },

  { "id": 7, "name": "Healthcare", "prop": "🏥 Universal Healthcare", "type": "property", "sdgno": "SDG 3", "region": "Latin America", "cat": "#2B77C2", "catsec": "rgba(43, 119, 194, 0.8)", "desc": "Build universal Healthcare clinics and digital Health infrastructure across Latin America.", "category": "Health" },

  { "id": 8, "name": "Ocean Cleanup", "prop": "🌊 Ocean Cleanup", "type": "property", "sdgno": "SDG 14", "region": "Pacific Islands", "cat": "#26B68A", "catsec": "rgba(38, 182, 138, 0.8)", "desc": "Fund large-scale ocean plastic removal and marine biodiversity protection across the Pacific Ocean.", "icon": "/flags/Economy.png", "category": "Climate" },

  { "id": 9, "name": "People's Voice", "prop": "🗣️ People's Voice", "type": "chance", "region": "—", "cat": "event", "desc": "The people have spoken. Draw a People's Voice card representing grassroots demands and social movements.", "category": "Event" },

  { "id": 10, "name": "Tipping Point", "prop": "🌡️ Climate Tipping Point", "type": "jail", "region": "—", "cat": "corner", "desc": "The game checks which SDG category is most neglected. The worst offender triggers a global crisis affecting EVERYONE.", "category": "Event" },

  { "id": 11, "name": "Reforestation", "prop": "🌲 Amazon Reforestation", "type": "property", "sdgno": "SDG 15", "region": "Brazil", "cat": "#26B68A", "catsec": "rgba(38, 182, 138, 0.8)", "desc": "Plant millions of trees in the Amazon rainforest to restore biodiversity and absorb carbon at a planetary scale.", "icon": "/flags/Justice.png", "category": "Climate" },

  { "id": 12, "name": "Anti-Corruption", "prop": "⚖️ Anti-Corruption Courts", "type": "property", "sdgno": "SDG 16", "region": "South America", "cat": "#DBADCA", "catsec": "rgba(219, 173, 202, 0.8)", "desc": "Establish independent anti-corruption judicial systems to strengthen democratic institutions and rule of law.", "category": "Justice" },

  { "id": 13, "name": "Inclusion", "prop": "♿ Disability Inclusion", "type": "property", "sdgno": "SDG 10", "region": "Southeast Asia", "cat": "#E6A70A", "catsec": "rgba(230, 167, 10, 0.8)", "desc": "Build inclusive infrastructure ensuring people with disabilities have equal access to opportunity.", "icon": "/flags/Justice.png", "category": "Justice" },

  { "id": 14, "name": "Rural Internet", "prop": "📡 Rural Internet", "type": "property", "sdgno": "SDG 9", "region": "Central Asia", "cat": "#E4693F", "catsec": "rgba(228, 105, 63, 0.8)", "desc": "Deploy broadband internet to remote rural areas in Central Asia, connecting millions to Education and economic opportunities.", "icon": "/flags/Justice.png", "category": "Economy" },

  { "id": 15, "name": "Vaccines", "prop": "🧬 Vaccine Distribution", "type": "property", "sdgno": "SDG 3", "region": "South Asia", "cat": "#2B77C2", "catsec": "rgba(43, 119, 194, 0.8)", "desc": "Build cold-chain vaccine distribution networks to protect millions from preventable diseases and future outbreaks.", "category": "Health" },

  { "id": 16, "name": "People's Voice", "prop": "🗣️ People's Voice", "type": "chance", "region": "—", "cat": "event", "desc": "The people have spoken. Draw a People's Voice card.", "category": "Event" },

  { "id": 17, "name": "Headlines", "prop": "🃏 Global Headlines", "type": "treasure", "region": "—", "cat": "event", "desc": "A world event has occurred. Draw a Global Headlines card.", "category": "Event" },

  { "id": 18, "name": "Uni Access", "prop": "🎓 Free University Access", "type": "property", "sdgno": "SDG 4", "region": "Latin America", "cat": "#E6A70A", "catsec": "rgba(230, 167, 10, 0.8)", "desc": "Fund tuition-free university programs giving millions of young people a path out of poverty.", "icon": "/flags/Economy.png", "category": "Education" },

  { "id": 19, "name": "Climate Fund", "prop": "🌐 Global Climate Fund", "type": "property", "sdgno": "SDG 17", "region": "Worldwide", "cat": "#DBADCA", "catsec": "rgba(219, 173, 202, 0.8)", "desc": "Contribute to the international Global Climate Fund. Players who invest together unlock partnership bonuses.", "category": "Justice" },

  { "id": 20, "name": "UN Summit", "prop": "🏦 UN Summit", "type": "parking", "region": "—", "cat": "corner", "desc": "All players vote on a global SDG policy. Majority wins. The new policy affects all players for the next 3 rounds.", "category": "Event" },

  { "id": 21, "name": "Ice Monitoring", "prop": "❄️ Arctic Ice Monitoring", "type": "property", "sdgno": "SDG 13", "region": "Norway", "cat": "#26B68A", "catsec": "rgba(38, 182, 138, 0.8)", "desc": "Deploy satellite and ground sensors to monitor Arctic ice melt, providing critical Climate data for global policymakers.", "icon": "/flags/Climate.png", "category": "Climate" },

  { "id": 22, "name": "Headlines", "prop": "🃏 Global Headlines", "type": "treasure", "region": "—", "cat": "event", "desc": "A world event has occurred. Draw a Global Headlines card.", "category": "Event" },

  { "id": 23, "name": "Food Banks", "prop": "🍽️ Food Bank Infrastructure", "type": "property", "sdgno": "SDG 2", "region": "Eastern Europe", "cat": "#2B77C2", "catsec": "rgba(43, 119, 194, 0.8)", "desc": "Establish food bank networks and meal programs to eliminate hunger in underserved communities.", "icon": "/flags/Climate.png", "category": "Health" },

  { "id": 24, "name": "Women's Fund", "prop": "👩‍💼 Women Entrepreneur Fund", "type": "property", "sdgno": "SDG 5", "region": "Middle East", "cat": "#E6A70A", "catsec": "rgba(230, 167, 10, 0.8)", "desc": "Provide microloans, mentorship and business training for women entrepreneurs to drive gender economic equality.", "icon": "/flags/Climate.png", "category": "Education" },

  { "id": 25, "name": "Wind Energy", "prop": "💨 Wind Energy Grid", "type": "property", "sdgno": "SDG 7", "region": "North Sea", "cat": "#E4693F", "catsec": "rgba(228, 105, 63, 0.8)", "desc": "Construct a large offshore wind energy grid powering millions of European homes with clean renewable electricity.", "category": "Climate" },

  { "id": 26, "name": "Electric Transport", "prop": "🚇 Electric Transport", "type": "property", "sdgno": "SDG 11", "region": "South America", "cat": "#E4693F", "catsec": "rgba(228, 105, 63, 0.8)", "desc": "Build electric bus and metro rail networks across South American cities to reduce emissions and improve urban mobility.", "icon": "/flags/Economy.png", "category": "Economy" },

  { "id": 27, "name": "Headlines", "prop": "🃏 Global Headlines", "type": "treasure", "region": "—", "cat": "event", "desc": "A world event has occurred. Draw a Global Headlines card.", "category": "Event" },

  { "id": 28, "name": "Coral Reefs", "prop": "🪸 Coral Reef Restoration", "type": "property", "sdgno": "SDG 14", "region": "Australia", "cat": "#26B68A", "catsec": "rgba(38, 182, 138, 0.8)", "desc": "Fund coral reef restoration programs along the Great Barrier Reef and Indo-Pacific to protect marine ecosystems.", "category": "Climate" },

  { "id": 29, "name": "Refugee Education", "prop": "📚 Refugee Education", "type": "property", "sdgno": "SDG 4", "region": "Europe", "cat": "#E6A70A", "catsec": "rgba(230, 167, 10, 0.8)", "desc": "Fund Education programs and safe learning spaces for refugee children across Europe.", "icon": "/flags/Economy.png", "category": "Education" },

  { "id": 30, "name": "Economic Boom", "prop": "💸 Economic Boom", "type": "goToJail", "region": "—", "cat": "corner", "desc": "Players with the highest Education investments earn massive bonus impact points. The knowledge Economy pays off.", "category": "Event" },

  { "id": 31, "name": "Mental Health", "prop": "🧠 Mental Health Clinics", "type": "property", "sdgno": "SDG 3", "region": "North America", "cat": "#2B77C2", "catsec": "rgba(43, 119, 194, 0.8)", "desc": "Build accessible mental Health clinics and digital therapy platforms to address the growing mental Health crisis.", "icon": "/flags/Health.png", "category": "Health" },

  { "id": 32, "name": "Innovation Hubs", "prop": "💡 Tech Innovation Hubs", "type": "property", "sdgno": "SDG 9", "region": "Southeast Asia", "cat": "#E4693F", "catsec": "rgba(228, 105, 63, 0.8)", "desc": "Establish technology and innovation hubs to incubate sustainable startups and drive inclusive economic development.", "category": "Economy" },

  { "id": 33, "name": "Open Data", "prop": "📊 Open Data Platforms", "type": "property", "sdgno": "SDG 16", "region": "Africa", "cat": "#DBADCA", "catsec": "rgba(219, 173, 202, 0.8)", "desc": "Fund open government data platforms to increase transparency, fight corruption and enable citizen accountability.", "icon": "/flags/Health.png", "category": "Justice" },

  { "id": 34, "name": "Carbon Capture", "prop": "🌫️ Carbon Capture Plant", "type": "property", "sdgno": "SDG 13", "region": "Germany", "cat": "#26B68A", "catsec": "rgba(38, 182, 138, 0.8)", "desc": "Invest in cutting-edge direct air carbon capture technology to actively remove CO2 from the atmosphere.", "category": "Climate" },

  { "id": 35, "name": "People's Voice", "prop": "🗣️ People's Voice", "type": "airport", "region": "—", "cat": "event", "desc": "The people have spoken. Draw a People's Voice card.", "category": "Event" },

  { "id": 36, "name": "Digital Schools", "prop": "🏫 Rural Digital Schools", "type": "property", "sdgno": "SDG 4", "region": "East Africa", "cat": "#E6A70A", "catsec": "rgba(230, 167, 10, 0.8)", "desc": "Deploy solar-powered digital learning centers to remote communities, connecting students to quality Education.", "icon": "/flags/Climate.png", "category": "Education" },

  { "id": 37, "name": "Microfinance", "prop": "🌾 Microfinance for Farmers", "type": "property", "sdgno": "SDG 1&2", "region": "West Africa", "cat": "#E4693F", "catsec": "rgba(228, 105, 63, 0.8)", "desc": "Provide microloans and agricultural training to smallholder farmers to end poverty and improve food security.", "category": "Economy" },

  { "id": 38, "name": "Peace Centers", "prop": "🕊️ Peace Mediation Centers", "type": "property", "sdgno": "SDG 16", "region": "Conflict Zones", "cat": "#DBADCA", "catsec": "rgba(219, 173, 202, 0.8)", "desc": "Establish international peace mediation centers in active conflict zones to resolve disputes diplomatically.", "icon": "/flags/Climate.png", "category": "Justice" },

  { "id": 39, "name": "Sanitation", "prop": "🚿 Sanitation for All", "type": "property", "sdgno": "SDG 6", "region": "Southeast Asia", "cat": "#2B77C2", "catsec": "rgba(43, 119, 194, 0.8)", "desc": "Construct sanitation facilities and hygiene Education campaigns across Southeast Asia to prevent disease.", "icon": "/flags/Climate.png", "category": "Health" }
]