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
            "children": [],
            "exec": ""
          },
          {
            "value": "Stop All",
            "options": true,
            "obj": "",
            "iconClass": "mdi mdi-stop",
            "children": [],
            "exec": ""
          },
          {
            "value": "Delete All",
            "options": true,
            "obj": "",
            "iconClass": "mdi mdi-window-close",
            "children": [],
            "exec": ""
          }
        ],
        "variables": [],
        "dynamisms": [{
          "event": "",
          "exec": "",
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
          "id": "TITA37",
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
