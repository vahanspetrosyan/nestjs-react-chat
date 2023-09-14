## About the project
This is a simple group live chat

## Tech Stack
- Nest JS
- React JS
- Docker

## How to install and run project on local machine
1. `Clone this repository`
2. `Install docker in your machine`

### Open project folder in terminal and run
```
docker-compose up -d
```

### In browser open
```
http://localhost:3000
```

### For production build run
```
docker-compose -f docker-compose-prod.yml up -d
```

## If you wish to test without docker here are some steps

### In order to run backend
1. `cd server`
2. `npm install`
3. `npm run start:dev`

### In order to run frontend
1. `cd client`
2. `npm install`
3. `npm run dev`

#### In browser open
```
http://localhost:3000
```

#### *Please note the project uses node v18.16.0

