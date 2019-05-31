export const DASHBOARD: any = JSON.parse(`
{
  "type": "EXD",
  "id": "SCHINF",
  "title": "Scheda dashboard gateway",
  "fun": "F(EXD;*SCO;) 2(MB;SCP_SCH;[K1])",
  "loaded": true,
  "layout": "column",
  "sections": [
    {
      "id": "S1",
      "components": [
        {
          "type": "EXB",
          "id": "TITDSH",
          "title": "Dashboard del gateway",
          "loaded": true,
          "fun": "F(EXD;DASHBOARD;LIST)",
          "options": {},
          "data": {},
          "messages": [],
          "actions": {},
          "variables": [],
          "dynamisms": []
        }
      ]
    }
  ]
}
`);
