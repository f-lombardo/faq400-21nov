export const PRVSHO: any = JSON.parse(`
{
  "type": "EXD",
  "id": "exd2",
  "title": "",
  "fun": "F(EXD;*SCO;) 2(MB;SCP_SCH;[K1])",
  "loaded": true,
  "layout": "column",
  "sections": [
    {
      "id": "sec4",
      "layout": "",
      "dim": "",
      "components": [
        {
          "type": "FLD",
          "key": "fld2",
          "id": "fld2",
          "title": "",
          "fun": "",
          "options": {
            "FLD": {
              "default": {
                "type": "rad",
                "showSubmit": false,
                "valueField": "value",
                "displayedField": "value",
                "initialValue": {
                  "value": "Dashboard"
                },
                "extensions": {
                  "minQueryLength": 4,
                  "forceSelection": true
                }
              }
            }
          },
          "data": [
            {
              "value": "Dashboard",
              "options": true,
              "obj": "J1KEY",
              "iconClass": "-smeup-fixed-icon TA-B-AMO-A-BASE",
              "children": []
            },
            {
              "value": "Templates list",
              "options": true,
              "obj": "J2KEY",
              "iconClass": "-smeup-fixed-icon TA-B-AMO-A-BASE",
              "children": []
            },
            {
              "value": "A38 plugins",
              "options": true,
              "obj": "J3KEY",
              "iconClass": "-smeup-fixed-icon TA-B-AMO-A-BASE",
              "children": []
            },
            {
              "value": "A37 plugins",
              "options": true,
              "obj": "J4KEY",
              "iconClass": "-smeup-fixed-icon TA-B-AMO-A-BASE",
              "children": []
            },
            {
              "value": "Queue rabbit",
              "options": true,
              "obj": "J5KEY",
              "iconClass": "-smeup-fixed-icon TA-B-AMO-A-BASE",
              "children": []
            },
            {
              "value": "Logs",
              "options": true,
              "obj": "J6KEY",
              "iconClass": "-smeup-fixed-icon TA-B-AMO-A-BASE",
              "children": []
            }
          ],
          "variables": [],
          "dynamisms": [
            {
              "event": "change",
              "exec": "",
              "targets": ["exb1"]
            }
          ]
        }
      ]
    },
    {
      "id": "sec5",
      "layout": "",
      "dim": "",
      "components": [
        {
          "type": "EXD",
          "id": "exd3",
          "title": "",
          "fun": "",
          "loaded": true,
          "sections": [
            {
              "key": "sec6",
              "id": "",
              "layout": "",
              "dim": "",
              "components": [
                {
                  "type": "EXB",
                  "id": "exb1",
                  "title": "",
                  "loaded": false,
                  "fun": "F(EXD;[K1];list)",
                  "options": {
                    "EXB": {
                      "": {
                        "enableSort": true
                      },
                      "A01": {
                        "showFilter": true
                      }
                    },
                    "CHA": {
                      "": {
                        "type": "BAR"
                      }
                    }
                  },
                  "data": {},
                  "messages": [],
                  "actions": {
                    "row": [
                      {
                        "exec": "...",
                        "icon": "mdi-clock",
                        "text": "Scheda orologio"
                      }
                    ],
                    "global": [],
                    "auto (tag action attuale)": [
                      "F() / CLOSE / ETC...",
                      "F() / CLOSE / ETC...",
                      "F() / CLOSE / ETC...",
                      "F() / CLOSE / ETC..."
                    ],
                    "command": [
                      {
                        "exec": "...",
                        "icon": "mdi-play",
                        "text": "Spotify"
                      }
                    ]
                  },
                  "variables": [],
                  "dynamisms": []
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
`);
