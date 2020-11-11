const request = require('supertest')
const app = require('../app')
const { User } = require('../models/index')
const { generateToken } = require('../helper/jwt')
const { sequelize } = require("../models")
const { queryInterface } = sequelize

let initial_access_token = null

afterAll((done) => {
    queryInterface
        .bulkDelete("Users")
        .then(() => done())
        .catch((err) => {
            done();
        });
});

//register user untuk mendapatkan token user
beforeAll(done => {
    User.create({
        email: 'sarma@mail.com',
        password: 'asdasd',
        role: 'Admin'
    })
        .then(user => {
            const payload = {
                id: user.id,
                email: user.email,
                password: user.password,
                admin: user.role
            }
            initial_access_token = generateToken(payload)
            // console.log(initial_access_token, "<<< initial access token");
            done()
        })
        .catch(err => done(err))
})

let product_data = {
    name: 'Product name',
    image_url: 'link image',
    price: 100,
    stock: 20
}

describe('Create product / SUCCESS CASE', () => {
    test('test should send object with keys: id, name, image_url, price, stock', (done) => {
        request(app)
            .post('/product')
            .set('token', initial_access_token)
            .send(product_data)
            .end(function (err, res) {
                if (err) throw err
                else {
                    expect(res.status).toBe(201)
                    expect(res.body).toHaveProperty('id', expect.any(Number))
                    expect(res.body).toHaveProperty('name', product_data.name)
                    expect(res.body).toHaveProperty('image_url', product_data.image_url)
                    expect(res.body).toHaveProperty('price', product_data.price)
                    expect(res.body).toHaveProperty('stock', product_data.stock)
                    done()
                }
            })
    })
})

describe('FAILED CASE: invalid sequelize validation error', () => {
    test('test should send object with keys: id, name, image_url, price, stock', (done) => {
        request(app)
            .post('/product')
            .set('token', initial_access_token)
            .send({
                name: '',
                image_url: 'link image',
                price: 100,
                stock: 20
            })
            .end((err, res) => {
                if (err) throw err
                else {
                    expect(res.status).toBe(400)
                    expect(res.body).toHaveProperty('message', 'Name must is required')
                    done()
                }
            })
    })
})

describe('SUCCESS CASE: edit method', () => {
    test('test edit object with returning value: id, image_url, price, stock', (done) => {
        request(app)
            .put('/product/1')
            .set('token', initial_access_token)
            .send({
                name: 'Product name edited',
                image_url: 'link image edited',
                price: 1000,
                stock: 200
            })
            .end((err, res)=>{
                // console.log(res.body);
                if(err) throw err
                else {
                    expect(res.status).toBe(200)
                    expect(res.body[1][0]).toHaveProperty('id', expect.any(Number))
                    expect(res.body[1][0]).toHaveProperty('name', 'Product name edited')
                    expect(res.body[1][0]).toHaveProperty('image_url', 'link image edited')
                    expect(res.body[1][0]).toHaveProperty('price', 1000)
                    expect(res.body[1][0]).toHaveProperty('stock', 200)
                    done()
                }
            })
    })
    //error case edit
})

describe('SUCCESS CASE: delete method', ()=>{
    test('test delete object with returning valude key: id, image_url, price, stock', (done)=> {
        request(app)
        .delete('/product/2')
        .set('token', initial_access_token)
        .end((err, res)=>{
            if(err) throw err
            else {
                expect(res.status).toBe(200)
                expect(res.body).toHaveProperty('msg', 'Item has been deleted')
                done()
            }
        })
    })
    //error case delete
})

