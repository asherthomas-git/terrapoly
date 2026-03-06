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
  price?: number
  color?: string
  icon?: string
}

export const tiles: TileData[] = [

{ id:0, name:"START", type:"start",  },

{ id:1, name:"Salvador", type:"property", price:60, color:"#8B4513", icon:"/flags/climate.png" },
{ id:2, name:"Treasure", type:"treasure",  },
{ id:3, name:"Rio", type:"property", price:60, color:"#8B4513", icon:"/flags/health.png" },
{ id:4, name:"Earnings Tax", type:"tax",  },
{ id:5, name:"TLV Airport", type:"airport", price:200,  },
{ id:6, name:"Tel Aviv", type:"property", price:100, color:"#87CEEB", icon:"/flags/education.png" },
{ id:7, name:"Surprise", type:"chance",},
{ id:8, name:"Haifa", type:"property", price:100, color:"#87CEEB", icon:"/flags/economy.png" },
{ id:9, name:"Jerusalem", type:"property", price:120, color:"#87CEEB", icon:"/flags/economy.png" },

{ id:10, name:"Passing By / Jail", type:"jail",  },

{ id:11, name:"Venice", type:"property", price:140, color:"#FF69B4", icon:"/flags/justice.png" },
{ id:12, name:"Electric Company", type:"utility", price:150,  },
{ id:13, name:"Milan", type:"property", price:140, color:"#FF69B4", icon:"/flags/justice.png" },
{ id:14, name:"Rome", type:"property", price:160, color:"#FF69B4", icon:"/flags/justice.png" },
{ id:15, name:"MUC Airport", type:"airport", price:200,  },
{ id:16, name:"Frankfurt", type:"property", price:180, color:"#FFA500", icon:"/flags/economy.png" },
{ id:17, name:"Treasure", type:"treasure",  },
{ id:18, name:"Munich", type:"property", price:180, color:"#FFA500", icon:"/flags/economy.png" },
{ id:19, name:"Berlin", type:"property", price:200, color:"#FFA500", icon:"/flags/economy.png" },

{ id:20, name:"Free Parking", type:"parking",  },

{ id:21, name:"Paris", type:"property", price:280, color:"#FF0000", icon:"/flags/climate.png" },
{ id:22, name:"Water Company", type:"utility", price:150,  },
{ id:23, name:"Toulouse", type:"property", price:260, color:"#FF0000", icon:"/flags/climate.png" },
{ id:24, name:"Lyon", type:"property", price:260, color:"#FF0000", icon:"/flags/climate.png" },
{ id:25, name:"CDG Airport", type:"airport", price:200,  },
{ id:26, name:"Shanghai", type:"property", price:240, color:"#FFD700", icon:"/flags/economy.png" },
{ id:27, name:"Beijing", type:"property", price:220, color:"#FFD700", icon:"/flags/economy.png" },
{ id:28, name:"Surprise", type:"chance",},
{ id:29, name:"Shenzhen", type:"property", price:220, color:"#FFD700", icon:"/flags/economy.png" },

{ id:30, name:"Go To Prison", type:"goToJail",  },

{ id:31, name:"New York", type:"property", price:400, color:"#1E3A8A", icon:"/flags/health.png" },
{ id:32, name:"Premium Tax", type:"tax",  },
{ id:33, name:"San Francisco", type:"property", price:300, color:"#1E3A8A", icon:"/flags/health.png" },
{ id:34, name:"Surprise", type:"chance",  },
{ id:35, name:"JFK Airport", type:"airport", price:200,  },
{ id:36, name:"London", type:"property", price:320, color:"#228B22", icon:"/flags/climate.png" },
{ id:37, name:"Treasure", type:"treasure",  },
{ id:38, name:"Manchester", type:"property", price:350, color:"#228B22", icon:"/flags/climate.png" },
{ id:39, name:"Liverpool", type:"property", price:300, color:"#228B22", icon:"/flags/climate.png" }

];