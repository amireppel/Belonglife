Country flags Web page 
# build and run in docker container

Make sure docker is installd, 
build the containr:  docker build -t amir-blife-app:latest .
run the container:  docker run -p 3001:3001 amir-blife-app:latest

application will appear on [http://localhost:3001/](http://localhost:3001/)

# run locally 

You can run the code locally by using node version 20:
npm install
npm run dev

the application will appear on  [http://localhost:3000/](http://localhost:3000/)

# test
Runing  unit tests( jest): 
npm run test