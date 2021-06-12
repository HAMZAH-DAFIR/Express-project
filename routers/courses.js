const express = require('express');
const router = express.Router();


let courses = [
    {id : 1 , title : "Angular"},
    {id : 2 , title : "ReactJs"},
    {id : 3 , title : "VueJs"},
]


router.get('/api/course/:id' ,(req,res) => {
    
    let course = courses.find(course => course.id === parseInt(req.params.id))
    course && !isNaN(req.params.id)? res.send(course):res.status(404).send('course not found') 
   
})
router.post('/api/courses' , (req,res) => {
    const { error , value} = validator(req.body)
   if (error) res.status(400).send(error.details[0].message)
   else{
    const course = {
        id : courses.length+1, 
        title : value.title
    }
    courses = [...courses,course]
    res.send(course)
   }
  
})

router.put('/:id',(req,res) => {
    //verify course is exist 
    let course = courses.find(course => course.id === parseInt(req.params.id))
    if (!(course && !isNaN(req.params.id))) res.status(404).send('course Not Found')
    // validate request
    const { error , value} = validator(req.body)
    
    if (error) res.status(400).send(error.details[0].message)
    
})

router.delete('/:id',(req,res) => {
    let course = courses.find(course => course.id === parseInt(req.params.id))
    if(!(course && !isNaN(req.params.id))) res.status(404).send('course Not Found')
    const index = courses.indexOf(course)
    res.status(204).send(courses.splice(index,1))
})

router.get('',(req,res) => {
    res.send(['Angular','laravel','Vuejs','javascript'])
})

router.get('/:index' , (req,res) => {
   const courses = ['Angular','javascript','Laravel']
    const index =req.params.index-1
    res.send(courses[index])
})

function validator (course){
    const schema = Joi.object({
        title : Joi.string().required().min(3).max(10).alphanum()
    })
    return schema.validate(course)
}
     
router.get('/allcourses' ,(req,res) => {
    res.send(courses)
})
module.exports =router;