# Porsche Rent

**Porsche Rent** is a non-commercial project for renting Porsche cars with a modern React + Material UI interface.

## How to run

1. Clone the repository:
    ```sh
    git clone https://github.com/DarrosHere/porsche-rent.git
    cd porsche-rent
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the development server:
    ```sh
    npm run dev
    ```


---

## AWS Lambda Functions (Backend)

### Reservations (GET/POST)

```js
const { DynamoDBClient, PutItemCommand, ScanCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient();

exports.handler = async (event) => {
  try {
    if (event.requestContext?.http?.method === 'GET' || event.httpMethod === 'GET') {
      const data = await client.send(new ScanCommand({ TableName: "rents" }));

      const reservations = (data.Items || []).map(item => ({
        id: item.id.S,
        carId: item.carId.N,
        name: item.name.S,
        phone: item.phone.S,
        date: item.date.S,
        days: item.days.N,
        createdAt: item.createdAt.S
      }));
      return {
        statusCode: 200,
        body: JSON.stringify(reservations)
      };
    }

    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;

    const rent = {
      id:      { S: Date.now().toString() },
      carId:   { N: body.carId.toString() },
      name:    { S: body.name },
      phone:   { S: body.phone },
      date:    { S: body.date },
      days:    { N: body.days.toString() },
      createdAt: { S: new Date().toISOString() }
    };

    await client.send(new PutItemCommand({
      TableName: "rents",
      Item: rent
    }));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Rent request saved', rent })
    };
  } catch (err) {
    console.error('Lambda error:', err); 
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
```

### Car List (GET)

```js
const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");
const client = new DynamoDBClient();

function fromDynamoValue(val) {
  if ('S' in val) return val.S;
  if ('N' in val) return Number(val.N);
  if ('BOOL' in val) return val.BOOL;
  if ('NULL' in val) return null;
  if ('L' in val) return val.L.map(fromDynamoValue);
  if ('M' in val) {
    const obj = {};
    for (const k in val.M) obj[k] = fromDynamoValue(val.M[k]);
    return obj;
  }
  return undefined;
}

exports.handler = async () => {
  try {
    const data = await client.send(new ScanCommand({ TableName: "cars" }));
    const cars = data.Items.map(item => {
      const obj = {};
      for (const k in item) obj[k] = fromDynamoValue(item[k]);
      return obj;
    });
    return {
      statusCode: 200,
      body: JSON.stringify(cars)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
```

### Add Car (POST)

```js
const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const client = new DynamoDBClient();

function toDynamoValue(val) {
  if (val === null || val === undefined) return { NULL: true };
  if (Array.isArray(val)) return { L: val.map(toDynamoValue) };
  if (typeof val === 'object') {
    const obj = {};
    for (const k in val) obj[k] = toDynamoValue(val[k]);
    return { M: obj };
  }
  if (typeof val === 'number') return { N: val.toString() };
  if (typeof val === 'boolean') return { BOOL: val };
  return { S: val.toString() };
}

exports.handler = async (event) => {
  try {
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;

    const car = {
      id:          { S: body.id.toString() },
      name:        toDynamoValue(body.name),
      price:       toDynamoValue(body.price),
      images:      toDynamoValue(body.images),
      description: toDynamoValue(body.description),
      acceleration:toDynamoValue(body.acceleration),
      power:       toDynamoValue(body.power),
      speed:       toDynamoValue(body.speed),
      fuel:        toDynamoValue(body.fuel),
      specs:       toDynamoValue(body.specs ?? null)
    };

    await client.send(new PutItemCommand({
      TableName: "cars",
      Item: car
    }));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Car added', car })
    };
  } catch (err) {
    console.error('Lambda error:', err); 
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
```

---

> This project is for personal and educational use only. Not affiliated with Porsche AG.