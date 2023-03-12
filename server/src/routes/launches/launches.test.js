//its better to creste our test file alongside with our other files
const request = require('supertest'); //because supertest makes request against our API
const app = require('../../app');//چون این app به ریکوست های ما گوش میدهد.

const{mongoConnect} = require('../../../services/mongo');
const { loadPlanetsData } = require('../../models/planets.model');

describe('Launches API', ()=>{
    beforeAll(async()=>{
             await mongoConnect();
             await loadPlanetsData();
        });
    describe('Test GET /launches', ()=>{
        test('it should respond with 200 success', async ()=>{
            const response = await request(app)
            .get('/v1/launches')
            .expect('Content-type',/json/)
            .expect(200)
    
            //expect(response.statusCode).toBe(200);//I commented it cause supetest has it's own 
            //conveniet assertion way like above
        });
    });
    
    describe('Test POST /launch', ()=>{
        const completeLaunchData = ({
            mission:'Kurd Enterprise',
            rocket: 'NCC 1701-T',
            target: 'Kepler-62 f',
            launchDate:'January 4,2029',
        });
        const launchDataWithoutDate = ({
            mission:'Kurd Enterprise',
            rocket: 'NCC 1701-T',
            target: 'Kepler-62 f',
        });
    
        const launchDataWithInvalidDate = ({
            mission:'Kurd Enterprise',
            rocket: 'NCC 1701-T',
            target: 'Kepler-62 f',
            launchDate:'zoot',
        });
    
        test('it should respond with 201 created', async()=>{
            const response = await request(app)
            .post('/v1/launches')
            .send(completeLaunchData)
            .expect('Content-type', /json/)
            .expect(201);
    
         const requestDate = new Date(completeLaunchData.launchDate).valueOf();
         const responseDate = new Date(response.body.launchDate).valueOf()
         expect(responseDate).toBe(requestDate);
    
            //whenever we check the body we are going to use our jest assertions
        expect(response.body).toMatchObject(launchDataWithoutDate)
        })
    
        test('It should catch missing required property',async()=>{
            const response = await request(app)
            .post('/v1/launches')
            .send({launchDataWithoutDate})
            .expect('Content-type', /json/)
            .expect(400)
    
        expect(response.body).toStrictEqual({
                error: "Missing required launch property"
            });
        });
          
        test('It should catch invalid date',async() =>{
            const response = await request(app)
            .post('/v1/launches')
            .send(launchDataWithInvalidDate)
            .expect('Content-type', /json/)
            .expect(400)
    
         expect(response.body).toStrictEqual({
                error: "Invalid launch date"
              });
        });
         
    });
});


