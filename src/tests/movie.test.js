const request = require('supertest')
const app = require('../app')
const Actor = require('../models/Actor')
const Director = require('../models/Director')
const Genre = require('../models/Genre')
require('../models')

let genre
let director
let actor

let movieId

const URL_MOVIES = '/movies'

beforeAll(async() => {

    genre = await Genre.create({
        name: "thriller"
    })

    director = await Director.create({
        firstName: "John",
        lastName: "Leguizamo",
        nationality: "Colombia",
        image: "https://es.wikipedia.org/wiki/John_Leguizamo#/media/Archivo:9.21.14JohnLeguizamoByLuigiNovi1_(cropped).jpg",
        birthday:"19640622"
    })
    actor = await Actor.create({
    firstName: "Vito",
    lastName: "Corleone",
    nationality: "ital-Ust.",
    image: "https://static.wikia.nocookie.net/doblaje/images/9/9a/Elpadrino.jpg/revision/latest?cb=20211023042804&path-prefix=es",
    birthday: "1945"
    })

    movie = {
        name: "john wick 4",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4ykN8FJvoxbbMCOX30QWyINsykm29ZGQ7mbFGuFDk5NeEqbqL",
        synopsis: "Después de los eventos de John Wick: Chapter 3 - Parabellum, John se prepara para vengarse de la Alta Mesa mientras se esconde en la clandestinidad con el Rey del barrio. ",
        releaseYear: "2023",
        genreId: genre.id,
        directorId: director.id,
        actorId: actor.id
    }
})


test("Post -> 'URL_MOVIES', should return to be status code 201 and res.body to be defined and res.body.name = movie.name", 
async() => {
    const res = await request(app)
    .post(URL_MOVIES)
    .send(movie)

    movieId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
})

test("GetAll -> 'URL_MOVIES', should to be status code 200 and res.body to be defined and res.body.length = 1", 
async() => {
    const res = await request(app)
    .get(URL_MOVIES)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("GetOne -> 'URL_MOVIES', should to be status code 200 and res.body to be defined and res.body.name = movie.name", 
async() => {
    const res = await request(app)
    .get(`${URL_MOVIES}/${movieId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)

})


test("Put -> 'URL_MOVIES/:id', should return status code 200, res.body to be defined and res.body.name = 'los soprano' ", 
async() => {
    const res = await request(app)
    .put(`${URL_MOVIES}/${movieId}`)
    .send({ name: 'sinatra'})

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe('sinatra')

})

test("Delete -> 'URL_MOVIES/:id', should return status code 204",
async() => {
    const res = await request(app)
    .delete(`${URL_MOVIES}/${movieId}`)

    expect(res.statusCode).toBe(204)

    await genre.destroy()
    await director.destroy()
    await actor.destroy()
})