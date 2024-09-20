FROM node:lts

WORKDIR /app

COPY package*.json .
COPY prisma prisma

RUN npm install --legacy-peer-deps
RUN npx prisma generate

COPY . .

ENV DATABASE_URL postgres://postgres:JVVAxyXC68p7nRjul3WMVvcOvmJC2gRSyf64F9z2Sc6iBPpc7J7sJOZBROfjhWw4@157.10.253.112:5432/postgres

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]

