export const RABBIT: any = JSON.parse(`
{
  "type": "EXD",
  "id": "RABBIT",
  "title": "Rabbit queue gateway",
  "loaded": true,
  "layout": "column",
  "sections": [
    {
      "id": "S1",
      "components": [
        {
          "type": "EXB",
          "id": "TITRAB",
          "title": "Scheda coda eventi rabbit",
          "loaded": true,
          "fun": "F(EXD;RABBIT;LIST)",
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
