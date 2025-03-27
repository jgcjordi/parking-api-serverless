# parking-api-serverless

API to manage parking spaces. The domain consists of a group of spaces, each assigned a type such as motorcycle or car. It includes the number of each type per floor and tracks occupied spaces.

## Infrastructure

Since it will be deployed as a Lambda function, it uses @codegenie/serverless-express to convert the microservice into a serverless function, while still running as a normal service locally.
This approach keeps the microservice decoupled from the deployment infrastructure.
At the same time on AWS uses an aurora DB that allows it to be totally serverless.

## Architecture

This project follows a hexagonal architecture, using Express to expose a REST API and TypeORM to manage a PostgreSQL database.

## Setup

To run it locally build firs the db:

```bash
docker compose up db -d
```

After start the local server

```bash
npm run dev
```

## Requests

### Filter
```bash
curl --location 'http://localhost:3000/space-group/find-all' \
--header 'Content-Type: application/json' \
--data '    {
        "type": ["CAR"],
        "floor": [1,2]
    }'
```

### Create
```bash
curl --location 'http://localhost:3000/space-group' \
--header 'Content-Type: application/json' \
--data '[
  {
    "floor": 1,
    "type": "MOTORBIKE",
    "day": "2025-06-10",
    "spaces": 10,
    "usedSpaces": 2
  },
  {
    "floor": 2,
    "type": "CAR",
    "day": "2025-06-10",
    "spaces": 40,
    "usedSpaces": 24
  },
  {
    "floor": 2,
    "type": "MOTORBIKE",
    "day": "2025-06-10",
    "spaces": 10,
    "usedSpaces": 5
  }
]'
```

### Update
```bash
curl --location --request PUT 'http://localhost:3000/space-group/74845e89-d1fe-4b42-94b7-871540225d59' \
--header 'Content-Type: application/json' \
--data '    {
        "id": "74845e89-d1fe-4b42-94b7-871540225d59",
        "day": "2025-06-10",
        "floor": 2,
        "type": "CAR",
        "spaces": 40,
        "usedSpaces": 24
    }
'
```

### Delete
```bash
curl --location --request DELETE 'http://localhost:3000/space-group/cd68ab7b-dc79-49e5-ba1a-884327676877' \
--data ''
```

### Replicate
```bash
curl --location 'http://localhost:3000/space-group/replicate' \
--header 'Content-Type: application/json' \
--data '    {
        "dateToReplicate": "2025-06-10",
        "dateFrom": "2025-06-13",
        "dateTo": "2025-06-16"
    }'
```
