export const DASHBOARD: any = JSON.parse(`
{
  "type": "EXD",
  "id": "SCHINF",
  "title": "Scheda dashboard gateway",
  "fun": "F(EXD;*SCO;) 2(MB;SCP_SCH;[K1])",
  "loaded": true,
  "layout": "column",
  "sections": [{
      "id": "SDAS1",
      "components": [{
        "type": "EXB",
        "id": "TITMSV",
        "title": "Microservice List",
        "loaded": true,
        "fun": "F(EXB;DASHBOARD;MCRSRVLIST)",
        "options": {},
        "data": {},
        "messages": [],
        "actions": {},
        "variables": [],
        "dynamisms": []
      }]
    },
    {
      "id": "SDAS2",
      "components": [{
        "type": "EXB",
        "id": "TITDSH",
        "title": "Dashboard",
        "loaded": true,
        "fun": "F(EXB;DASHBOARD;DSHLIST)",
        "options": {},
        "data": {},
        "messages": [],
        "actions": {},
        "variables": [],
        "dynamisms": []
      }]
    },
    {
      "id": "SDAS3",
      "components": [{
        "type": "EXB",
        "id": "TIT37L",
        "title": "A37 List",
        "loaded": true,
        "fun": "F(EXB;DASHBOARD;A37LIST)",
        "options": {},
        "data": {},
        "messages": [],
        "actions": {},
        "variables": [],
        "dynamisms": []
      }]
    },
    {
      "id": "SDAS4",
      "components": [{
        "type": "EXB",
        "id": "TIT38L",
        "title": "A38 List",
        "loaded": true,
        "fun": "F(EXB;DASHBOARD;A38LIST)",
        "options": {},
        "data": {},
        "messages": [],
        "actions": {},
        "variables": [],
        "dynamisms": []
      }]
    }
  ]
}
`);
