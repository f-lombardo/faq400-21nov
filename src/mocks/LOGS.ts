export const LOGS: any = JSON.parse(`
{
  "type": "EXD",
  "id": "LOGS",
  "title": "Logs list",
  "loaded": true,
  "layout": "column",
  "sections": [
    {
      "id": "SRLOG1",
      "components": [
        {
          "type": "EXB",
          "id": "TITLOG",
          "title": "Scheda logs",
          "loaded": true,
          "fun": "F(EXD;LOGS;LIST)",
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
