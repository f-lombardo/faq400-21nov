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
        "type": "EXD",
        "id": "SCHDS1",
        "title": "Scheda Dashboard 1",
        "fun": "",
        "loaded": true,
        "layout": "row",
        "sections": [{
            "id": "SDAS1A",
            "components": [{
              "type": "EXB",
              "id": "TITDSH",
              "title": "Dashboard",
              "loaded": true,
              "fun": "F(EXD;DASHBOARD;DSHLIST)",
              "options": {},
              "data": {},
              "messages": [],
              "actions": {},
              "variables": [],
              "dynamisms": []
            }]
          },
          {
            "id": "SDAS1B",
            "components": [{
              "type": "EXB",
              "id": "TITMSV",
              "title": "Microservice List",
              "loaded": true,
              "fun": "F(EXD;DASHBOARD;MCRSRVLIST)",
              "options": {},
              "data": {},
              "messages": [],
              "actions": {},
              "variables": [],
              "dynamisms": []
            }]
          }
        ]
      }]
    },
    {
      "id": "SDAS2",
      "components": [{
        "type": "EXD",
        "id": "SCHDS2",
        "title": "Scheda Dashboard 2",
        "fun": "",
        "loaded": true,
        "layout": "row",
        "sections": [{
            "id": "SDAS2A",
            "components": [{
              "type": "EXB",
              "id": "TIT37L",
              "title": "A37 List",
              "loaded": true,
              "fun": "F(EXD;DASHBOARD;A37LIST)",
              "options": {},
              "data": {},
              "messages": [],
              "actions": {},
              "variables": [],
              "dynamisms": []
            }]
          },
          {
            "id": "SDAS2B",
            "components": [{
              "type": "EXB",
              "id": "TIT38L",
              "title": "A38 List",
              "loaded": true,
              "fun": "F(EXD;DASHBOARD;A38LIST)",
              "options": {},
              "data": {},
              "messages": [],
              "actions": {},
              "variables": [],
              "dynamisms": []
            }]
          }
        ]
      }]
    }
  ]
}
`);
