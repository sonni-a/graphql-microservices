1. Запуск Users Service (PostgreSQL)
cd users-service
npm install
node index.js


http://localhost:4001
.

2. Запуск Products Service (PostgreSQL)
cd products-service
npm install
node index.js


http://localhost:4003
.

3. Запуск Orders Service (MongoDB)
cd orders-service
npm install
node index.js


http://localhost:4002
.

4. Запуск API Gateway
cd gateway
npm install
node index.js


http://localhost:4000/graphql
.

5. Запуск Frontend (React)
cd frontend
npm install
npm start


http://localhost:3000
.