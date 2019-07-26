export const A37: any = JSON.parse(`
{
  "type": "EXD",
  "id": "SCHINF",
  "title": "Plugin A37 gateway",
  "loaded": true,
  "layout": "column",
  "sections": [
    {
      "id": "SA371",
      "components": [
        {
        "type": "BTN",
        "id": "BTNA37",
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
          },
          {
            "value": "Update All Configurations",
            "options": true,
            "obj": "",
            "iconClass": "mdi mdi-refresh",
            "children": []
          },
          {
            "value": "Delete All Configurations",
            "options": true,
            "obj": "",
            "iconClass": "mdi mdi-delete",
            "children": []
          },
          {
            "value": "Create All Plugins",
            "options": true,
            "obj": "",
            "iconClass": "mdi mdi-plus-circle",
            "children": []
          },
          {
            "value": "Delete All Plugins",
            "options": true,
            "obj": "",
            "iconClass": "mdi mdi-delete",
            "children": []
          }
        ],
        "variables": [],
        "dynamisms": [{
          "event": "click",
          "exec": "F(FBK;A37;[K1]) NOTIFY(TITA37)",
          "targets": []
        }]
		}
      ]
    },
	{
      "id": "S2",
      "components": [
        {
          "type": "EXB",
          "id": "TITA37",
          "title": "Lista plugin A37",
          "loaded": true,
          "fun": "F(EXD;A37;LIST)",
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
