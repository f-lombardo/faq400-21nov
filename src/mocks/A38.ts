export const A38: any = JSON.parse(`
{
  "type": "EXD",
  "id": "A38",
  "title": "Plugin A38 gateway",
  "loaded": true,
  "layout": "column",
  "sections": [
    {
      "id": "SA371",
      "components": [
        {
        "type": "BTN",
        "id": "BTNA38",
        "title": "",
        "loaded": true,
        "options": {
          "horizontal": true,
          "showText": true
        },
        "data": [{
            "value": "Start All",
            "options": true,
            "obj": "",
            "iconClass": "mdi mdi-play",
            "children": []
          },
          {
            "value": "Stop All",
            "options": true,
            "obj": "",
            "iconClass": "mdi mdi-stop",
            "children": []
          }
        ],
        "variables": [],
        "dynamisms": [{
          "event": "click",
          "exec": "F(FBK;A38;[K1]) NOTIFY(TITA38)",
          "targets": []
        }]
		}
      ]
    },
	{
      "id": "S2A",
      "components": [
        {
          "type": "EXB",
          "id": "TITA38",
          "title": "Lista plugin A38",
          "loaded": true,
          "fun": "F(EXD;A38;LIST)",
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
