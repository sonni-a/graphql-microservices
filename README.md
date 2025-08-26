# Лабораторная работа №8 Разработка микросервисной архитектуры с GraphQL
## Инструкция по запуску

1. Users Service (PostgreSQL)
```cd users-service
npm install
node index.js
```


http://localhost:4001

2. Products Service (PostgreSQL)
```cd products-service
npm install
node index.js
```

http://localhost:4003

3. Orders Service (MongoDB)
```cd orders-service
npm install
node index.js
```

http://localhost:4002

4. API Gateway
```cd gateway
npm install
node index.js
```

http://localhost:4000/graphql

5. Frontend
```cd frontend
npm install
npm start
```

http://localhost:3000
