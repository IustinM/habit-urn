export const habitCateogoryData = ['Health','Sport','Productivity and Personal Development','Social Relationships','Mental and Emotional Well-being','Financial','Daily Responsibilities','Other']

export const defaultHabits = [
    {
      "id": "6d7b1f22-cce4-4431-ab52-cb5950bfe529",
      "name": "Run ",
      "type": "Positive",
      "category": "sport",
      "target": {
        "category": "Times",
        "title": "times",
        "value": "2",
        "currentValue": "0"
      },
      "habitDate": {
        "startDate":new Date(new Date().setHours(0,0,0,0)).toDateString() ,
        "endDate": "Tue Mar 19 2024",
        "key": "selection"
      },
      "currentDate":new Date(new Date().setHours(0,0,0,0)).toDateString() ,
      "expectedResults": [
        {
          "id": "5682bd8c-c9cd-4a95-b3b5-81fa6d5a009b",
          "text": "To lose weight"
        },
        {
          "id": "991e2e1a-2eac-433c-b64e-c642cbd76843",
          "text": "To have a better blood pressure"
        }
      ],
      "identity": {
        "name": "",
        "type": ""
      },
      "actionSystem": {
        "hint": "",
        "desire": "",
        "reaction": "",
        "reward": ""
      },
      "positiveMeasure": {
        "percentage": 15,
        "habitValue": 30,
        "habitResult": 2.3,
        "habitExpectedResult": 2
      },
      "place": "In Park",
      "habitRange": {
        "current": 0,
        "total": 17
      }
    },
    {
      "id": "55a6c016-83c2-4ca0-9685-24a56779c75a",
      "name": "To stop smokings",
      "type": "Negative",
      "category": "health",
      "target": {
        "category": "Times",
        "title": "times",
        "value": "6",
        "currentValue": "2"
      },
      "habitDate": {
        "startDate": "Wed Mar 06 2024",
        "endDate": "Wed Mar 13 2024",
        "key": "selection"
      },
      "currentDate": "Wed Mar 06 2024",
      "expectedResults": [
        {
          "id": "58630d15-31cb-471a-bf62-48411c6df47f",
          "text": "To have a better lifestyle"
        }
      ],
      "identity": {
        "name": "Smoker",
        "type": "Amateur"
      },
      "actionSystem": {
        "hint": "When i see someone smoking",
        "desire": "To smoke",
        "reaction": "I will smoke",
        "reward": "I will lose stress"
      },
      "positiveMeasure": {
        "percentage": 0,
        "habitValue": 0,
        "habitResult": 0,
        "habitExpectedResult": 0
      },
      "place": "",
      "habitRange": {
        "current": 0,
        "total": 8
      }
    },
    {
      "id": "d6396af2-5203-4e5c-97e3-43bb62150d4a",
      "name": "To read",
      "type": "Neutral",
      "category": "mental_and_emotional_well-being",
      "target": {
        "category": "Timer",
        "title": "min",
        "value": "30",
        "currentValue": "12"
      },
      "habitDate": {
        "startDate": "Wed Mar 06 2024",
        "endDate": "Wed Mar 13 2024",
        "key": "selection"
      },
      "currentDate": "Wed Mar 06 2024",
      "expectedResults": [
        {
          "id": "cbe5015d-3e83-4f67-b4d0-6004286bc0f8",
          "text": "To develop myself"
        }
      ],
      "identity": {
        "name": "",
        "type": ""
      },
      "actionSystem": {
        "hint": "",
        "desire": "",
        "reaction": "",
        "reward": ""
      },
      "positiveMeasure": {
        "percentage": 0,
        "habitValue": 0,
        "habitResult": 0,
        "habitExpectedResult": 0
      },
      "place": "",
      "habitRange": {
        "current": 0,
        "total": 8
      }
    },
    {
      "id": "a7ff69d8-229f-491b-9901-79f41d3fd36f",
      "name": "To save money",
      "type": "Neutral",
      "category": "",
      "target": {
        "category": "Other",
        "title": "pounds",
        "value": "100",
        "currentValue": "24"
      },
      "habitDate": {
        "startDate": new Date(new Date().setHours(0,0,0,0)).toDateString(),
        "endDate": "Wed Mar 13 2024",
        "key": "selection"
      },
      "currentDate": new Date(new Date().setHours(0,0,0,0)).toDateString(),
      "expectedResults": [
        {
          "id": "d116f87b-078c-40e7-ab12-469e9bf68606",
          "text": "To save money for holiday"
        }
      ],
      "identity": {
        "name": "",
        "type": ""
      },
      "actionSystem": {
        "hint": "",
        "desire": "",
        "reaction": "",
        "reward": ""
      },
      "positiveMeasure": {
        "percentage": 0,
        "habitValue": 0,
        "habitResult": 0,
        "habitExpectedResult": 0
      },
      "place": "",
      "habitRange": {
        "current": 0,
        "total": 8
      }
    }
  ]