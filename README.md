## Create project with typescript and nodemon

1. yarn init --yes (add package.json).
2. yarn add express typescript ts-node nodemon @types/node @types/express --dev (add necessary packages).
3. yarn tsc --init(project initialization).
4. In file tsconfig.json change properties:rootDir:./src,outDir:./dist and add folder in this project with name 'src'
5. add file index.ts,create app application via 'express'
6. add to package.json scripts: "watch": "tsc -w","dev": "nodemon --inspect ./dist/index.js"..
7. yarn add jest ts-jest @types/jest supertest @types/supertest --dev
8. yarn ts-jest config:init and add in file jest.config.js testRegex: "__tests__/.*.e2e.test.ts$"