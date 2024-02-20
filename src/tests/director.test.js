const request = require('supertest')
const app = require('../app')

const URL_DIRECTORS = '/directors'

const director = {
    firstName: "John",
    lastName: "Leguizamo",
    nationality: "Colombia",
    image: "https://es.wikipedia.org/wiki/John_Leguizamo#/media/Archivo:9.21.14JohnLeguizamoByLuigiNovi1_(cropped).jpg",
    birthday:"19640622"
}

let directorId;

test("Post -> 'URL_DIRECTORS', should return to be status code 201 and res.body to be defined and res.body.name = actor.name", 
async() => {
    const res = await request(app)
    .post(URL_DIRECTORS)
    .send(director)

    directorId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
})

test("GetAll -> 'URL_DIRECTORS', should to be status code 200 and res.body to be defined and res.body.length = 1", 
async() => {
    const res = await request(app)
    .get(URL_DIRECTORS)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("GetOne -> 'URL_DIRECTORS', should to be status code 200 and res.body to be defined and res.body.name = director.name", 
async() => {
    const res = await request(app)
    .get(`${URL_DIRECTORS}/${directorId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
})


test("Put -> 'URL_DIRECTORS/:id', should return status code 200, res.body to be defined and res.body.name = 'rayoMacken' ", 
async() => {
    const res = await request(app)
    .put(`${URL_DIRECTORS}/${directorId}`)
    .send({ firstName: 'sinatra'})

    //console.log(res.body)
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe('sinatra')
})

test("Delete -> 'URL_DIRECTORS/:id', should return status code 204",
async() => {
    const res = await request(app)
    .delete(`${URL_DIRECTORS}/${directorId}`)

    expect(res.statusCode).toBe(204)
})