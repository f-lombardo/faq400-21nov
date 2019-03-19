const parsedJson = JSON.parse(`{
  "type": "EXD",
  "key": "i000",
  "id": "exd1",
  "title": "",
  "fun": "F()",
  "loaded": true,
  "layout": "column",
  "sections": [
    {
      "key": "i007",
      "id": "",
      "layout": "",
      "dim": "",
      "components": [
        {
          "type": "LAB",
          "key": "i001",
          "id": "lbl1",
          "title": "",
          "loaded": true,
          "data": [
            {
              "value": "Sme.UP Gateway",
              "options": true,
              "obj": "",
              "iconClass": "",
              "children": []
            }
          ]
        }
      ]
    },
    {
      "key": "i008",
      "id": "",
      "layout": "",
      "dim": "",
      "components": [
        {
          "type": "FLD",
          "key": "i002",
          "id": "fld1",
          "title": "",
          "loaded": true,
          "fun": "F()",
          "options": {
            "FLD": {
              "default": {
                "type": "cmb",
                "displayedField": "value",
                "initialValue": "PRVSHO",
                "showSubmit": true,
                "submitLabel": "Conferma"
              }
            }
          },
          "data": [
            { "value": "PRVSHO" },
            { "value": "PRV123" },
            { "value": "PRV456" }
          ],
          "variables": [],
          "dynamisms": [
            {
              "event": "change",
              "exec": "F()",
              "targets": ["exd2"]
            }
          ]
        }
      ]
    },
    {
      "key": "i009",
      "id": "",
      "layout": "",
      "dim": "",
      "components": [
        {
          "type": "EXD",
          "key": "i003",
          "id": "exd2",
          "title": "",
          "fun": "F(EXD;*SCO;) 2(MB;SCP_SCH;[T1])",
          "loaded": false,
          "layout": "column",
          "sections": [
            {
              "key": "i010",
              "id": "",
              "layout": "",
              "dim": "",
              "components": [
                {
                  "type": "FLD",
                  "key": "i004",
                  "id": "fld2",
                  "title": "",
                  "loaded": false,
                  "fun": "F()",
                  "options": {
                    "FLD": {
                      "default": {
                        "type": "rad",
                        "showSubmit": false,
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
                      "exec": "F()",
                      "targets": ["exd3"]
                    }
                  ]
                }
              ]
            },
            {
              "key": "i011",
              "id": "",
              "layout": "",
              "dim": "",
              "components": [
                {
                  "type": "EXD",
                  "key": "i005",
                  "id": "exd3",
                  "title": "",
                  "fun": "F()",
                  "loaded": false,
                  "sections": [
                    {
                      "key": "i012",
                      "id": "",
                      "layout": "",
                      "dim": "",
                      "components": [
                        {
                          "type": "MAT",
                          "key": "i006",
                          "id": "mat1",
                          "title": "mat1",
                          "fun": "F()",
                          "loaded": true,
                          "data": [],
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
      ]
    }
  ]
}
`)

export default parsedJson
