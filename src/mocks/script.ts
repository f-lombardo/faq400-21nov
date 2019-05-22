export const mainEXD: any = JSON.parse(`
{
  "type": "EXD",
  "key": "i000",
  "id": "exd1",
  "title": "",
  "fun": "F()",
  "loaded": true,
  "layout": "aa",
  "sections": [
    {
      "key": "i999",
      "id": "i999",
      "layout": "",
      "dim": "",
      "components": [
        {
          "type": "BTN",
          "key": "i998",
          "id": "i998",
          "title": "",
          "loaded": true,
          "options": {
            "horizontal": true,
            "showText": true
          },
          "data": [
            {
              "value": "PRVSHO",
              "options": true,
              "obj": "",
              "iconClass": "",
              "children": [],
              "exec": "F(EXD;*SCO;) 2(MB;SCP_SCH;[K1])"
            },
            {
              "value": "PRV123",
              "options": true,
              "obj": "",
              "iconClass": "",
              "children": [],
              "exec": "F(EXD;*SCO;) 2(MB;SCP_SCH;[K1])"
            },
            {
              "value": "PRV456",
              "options": true,
              "obj": "",
              "iconClass": "",
              "children": [],
              "exec": "F(EXD;*SCO;) 2(MB;SCP_SCH;[K1])"
            }
          ],
          "variables": [],
          "dynamisms": [
            {
              "event": "click",
              "exec": "",
              "targets": ["exd2"]
            }
          ]
        }
      ]
    },
    {
      "key": "i007",
      "id": "i007",
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
      "id": "i008",
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
              "event": "click",
              "exec": "",
              "targets": ["exd2"]
            }
          ]
        }
      ]
    },
    {
      "key": "i009",
      "id": "i009",
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
`);

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
      "id": "sec4",
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
      "id": "sec5",
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
              "id": "sec6",
              "layout": "",
              "dim": "",
              "components": [
                {
                  "type": "EXB",
                  "key": "i123",
                  "title": "la mia matrice ",
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
                  "data": {
                    "columns": [
                      {
                        "name": "FLD1",
                        "title": "Column A",
                        "size": ""
                      },
                      {
                        "name": "FLD2",
                        "title": "Column B",
                        "size": 10
                      },
                      {
                        "name": "FLD3",
                        "title": "Column C",
                        "size": 10
                      }
                    ],
                    "rows": [
                      {
                        "object": "se presente, il K01",
                        "readOnly": true,
                        "cells": [
                            {
                              "readOnly": true,
                              "options (sarebbe il tasto destro)": true,
                              "obj": {
                                "t": "CN",
                                "p": "COL",
                                "k": "KEKBUR"
                              },
                              "style": "",
                              "type": "itx / acp / etc...",
                              "value": "A 1"
                            },
                            {
                              "readOnly": true,
                              "options (sarebbe il tasto destro)": true,
                              "obj": {
                                "t": "CN",
                                "p": "COL",
                                "k": "M1B"
                              },
                              "style": "",
                              "type": "itx / acp / etc...",
                              "value": "B 55"
                            },
                            {
                              "readOnly": true,
                              "options (sarebbe il tasto destro)": true,
                              "obj": {
                                "t": "CN",
                                "p": "COL",
                                "k": "M1C"
                              },
                              "style": "",
                              "type": "itx / acp / etc...",
                              "value": "C 999"
                            }
                        ]
                      },
                      {
                        "object": "se presente, il K02",
                        "readOnly": true,
                        "cells": [
                            {
                              "readOnly": true,
                              "options (sarebbe il tasto destro)": true,
                              "obj": {
                                "t": "CN",
                                "p": "COL",
                                "k": "M2A"
                              },
                              "style": "",
                              "type": "itx / acp / etc...",
                              "value": "A 2"
                            },
                            {
                              "readOnly": true,
                              "options (sarebbe il tasto destro)": true,
                              "obj": {
                                "t": "CN",
                                "p": "COL",
                                "k": "M2B"
                              },
                              "style": "",
                              "type": "itx / acp / etc...",
                              "value": "B 33"
                            },
                            {
                              "readOnly": true,
                              "options (sarebbe il tasto destro)": true,
                              "obj": {
                                "t": "CN",
                                "p": "COL",
                                "k": "M2C"
                              },
                              "style": "",
                              "type": "itx / acp / etc...",
                              "value": "C 777"
                            }
                        ]
                      },
                      {
                        "object": "se presente, il K02",
                        "readOnly": true,
                        "cells": [
                            {
                              "readOnly": true,
                              "options (sarebbe il tasto destro)": true,
                              "obj": {
                                "t": "CN",
                                "p": "COL",
                                "k": "M3A"
                              },
                              "style": "",
                              "type": "itx / acp / etc...",
                              "value": "A 3"
                            },
                            {
                              "readOnly": true,
                              "options (sarebbe il tasto destro)": true,
                              "obj": {
                                "t": "CN",
                                "p": "COL",
                                "k": "M3B"
                              },
                              "style": "",
                              "type": "itx / acp / etc...",
                              "value": "B 77"
                            },
                            {
                              "readOnly": true,
                              "options (sarebbe il tasto destro)": true,
                              "obj": {
                                "t": "CN",
                                "p": "COL",
                                "k": "M3C"
                              },
                              "style": "",
                              "type": "itx / acp / etc...",
                              "value": "C 555"
                            }
                        ]
                      }
                    ]
                  },
                  "messages": [],
                  "actions": {
                    "row": [
                      {
                        "exec": "",
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
                        "exec": "",
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
      "id": "sec4",
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
`);

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
      "id": "sec4",
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
`);
