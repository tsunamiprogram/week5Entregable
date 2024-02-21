const request = require('supertest')
const app = require('../app')

const URL_ACTORS = '/actors'

const actor = {
    firstName: "ronald",
    lastName: "reagan",
    nationality: "UES",
    image: "https://es.wikipedia.org/wiki/Ronald_Reagan#/media/Archivo:Official_Portrait_of_President_Reagan_1981.jpg",
    birthday:"19500924"
}

let actorId;

test("Post -> 'URL_ACTORS', should return to be status code 201 and res.body to be defined and res.body.name = actor.name", 
async() => {
    const res = await request(app)
    .post(URL_ACTORS)
    .send(actor)

    actorId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
})

test("GetAll -> 'URL_ACTORS', should to be status code 200 and res.body to be defined and res.body.length = 1", 
async() => {
    const res = await request(app)
    .get(URL_ACTORS)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("GetOne -> 'URL_ACTORS', should to be status code 200 and res.body to be defined and res.body.name = actor.name", 
async() => {
    const res = await request(app)
    .get(`${URL_ACTORS}/${actorId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
})


test("Put -> 'URL_ACTORS/:id', should return status code 200, res.body to be defined and res.body.name = 'rayoMacken' ", 
async() => {
    const res = await request(app)
    .put(`${URL_ACTORS}/${actorId}`)
    .send({ firstName: 'rayoMacken'})

    //console.log(res.body)
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe('rayoMacken')
})

test("Delete -> 'URL_ACTORS/:id', should return status code 204",
async() => {
    const res = await request(app)
    .delete(`${URL_ACTORS}/${actorId}`)

    expect(res.statusCode).toBe(204)
    
})