export const LIST: any = JSON.parse(`
{
  "type": "EXD",
  "id": "SCHINF",
  "title": "Template list gateway",
  "fun": "F(EXD;*SCO;) 2(MB;SCP_SCH;[K1])",
  "loaded": true,
  "layout": "column",
  "sections": [
    {
      "id": "S1",
      "components": [
        {
          "type": "EXB",
          "id": "TMPLIS",
          "title": "Lista dei template",
          "loaded": true,
          "fun": "F(EXD;LISTTEMPLATE;LIST)",
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
