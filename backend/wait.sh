#!/bin/sh

dockerize -wait tcp://db:5432 -timeout 40s

npx prisma migrate dev

npm run start
