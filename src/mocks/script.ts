export const mainEXD: any = JSON.parse(`
{
  "type": "EXD",
  "key": "i000",
  "id": "exd1",
  "title": "",
  "fun": "F()",
  "loaded": true,
  "layout": "column",
  "sections": [
	{
      "key": "i999",
      "id": "",
      "layout": "",
      "dim": "",
      "components": [
        {
          "type": "BTN",
          "key": "i998",
          "id": "lbl9",
          "title": "",
          "loaded": true,
          "data": [
            {
              "value": "Debug",
              "options": true,
              "obj": "",
              "iconClass": "",
              "children": []
            }
          ],
          "variables": [],
          "dynamisms": [
            {
              "event": "click",
              "exec": "F()",
              "targets": []
            }
          ]
        }
      ]
    },
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
                "initialValue": {
                  "value": "PRVSHO"
                },
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
              "exec": "",
              "targets": ["exd2"]
            },
            {
              "event": "click",
              "exec": "F(EXD;*SCO;) 2(MB;SCP_SCH;[K1])",
              "targets": []
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
          "fun": "F(EXD;*SCO;) 2(MB;SCP_SCH;[K1])",
          "loaded": false,
          "layout": "column",
          "sections": []
        }
      ]
    }
  ]
}
`)

export const defaultSections: any = JSON.parse(`
{
  "type": "EXD",
  "key": "i003",
  "id": "exd2",
  "title": "",
  "fun": "F(EXD;*SCO;) 2(MB;SCP_SCH;[K1])",
  "loaded": true,
  "layout": "column",
  "sections": [
    {
      "key": "sec4",
      "id": "",
      "layout": "",
      "dim": "",
      "components": [
        {
          "type": "FLD",
          "key": "fld2",
          "id": "fld2",
          "title": "",
          "fun": "F()",
          "options": {
            "FLD": {
              "default": {
                "type": "rad",
                "showSubmit": false,
                "valueField": "value",
                "displayedField": "value",
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
              "targets": ["exd3"]
            }
          ]
        }
      ]
    },
    {
      "key": "sec5",
      "id": "",
      "layout": "",
      "dim": "",
      "components": [
        {
          "type": "EXD",
          "key": "exd3",
          "id": "exd3",
          "title": "",
          "fun": "F()",
          "loaded": true,
          "sections": [
            {
              "key": "sec6",
              "id": "",
              "layout": "",
              "dim": "",
              "components": [
                {
                  "type": "MAT",
                  "key": "mat1",
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
`)

export const prv123: any = JSON.parse(`
{
  "type": "EXD",
  "key": "i003",
  "id": "exd2",
  "title": "",
  "fun": "F(EXD;*SCO;) 2(MB;SCP_SCH;[K1])",
  "loaded": true,
  "layout": "column",
  "sections": [
    {
      "key": "sec4",
      "id": "",
      "layout": "",
      "dim": "",
      "components": [
        {
          "type": "LAB",
          "key": "i001",
          "id": "lbl2",
          "title": "",
          "loaded": true,
          "data": [
            {
              "value": "PRV123",
              "options": true,
              "obj": "",
              "iconClass": "",
              "children": []
            }
          ]
        }
      ]
    }
  ]
}
`)

export const prv456: any = JSON.parse(`
{
  "type": "EXD",
  "key": "i003",
  "id": "exd2",
  "title": "",
  "fun": "F(EXD;*SCO;) 2(MB;SCP_SCH;[K1])",
  "loaded": true,
  "layout": "column",
  "sections": [
    {
      "key": "sec4",
      "id": "",
      "layout": "",
      "dim": "",
      "components": [
        {
          "type": "LAB",
          "key": "i001",
          "id": "lbl2",
          "title": "",
          "loaded": true,
          "data": [
            {
              "value": "PRV456",
              "options": true,
              "obj": "",
              "iconClass": "",
              "children": []
            }
          ]
        }
      ]
    }
  ]
}
`)
