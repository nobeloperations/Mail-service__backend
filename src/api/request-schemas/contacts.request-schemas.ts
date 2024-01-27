import Joi from 'joi';

const createResourse = Joi.object({
    firstName: Joi.string().required(), 
    lastName: Joi.string().required(),   
    age: Joi.number().required(),                  
    city: Joi.string().required(),                
    email: Joi.string().required().email(),               
    gender: Joi.string().required(),              
    country: Joi.string().required(),             
    timezone: Joi.string().required(),            
    occupation: Joi.string().required(),          
    sourceOfReferral: Joi.string().required(),    
    intershipMotivation: Joi.string().required(),
    birthDate: Joi.date().required(),    
    eduQuestSelectedDateTime: Joi.date(),
});

const updateResource = Joi.object({
    firstName: Joi.string(), 
    lastName: Joi.string(),   
    age: Joi.number(),                  
    city: Joi.string(),                
    email: Joi.string().email(),               
    gender: Joi.string(),              
    country: Joi.string(),             
    timezone: Joi.string(),            
    occupation: Joi.string(),          
    sourceOfReferral: Joi.string(),    
    eduQuestDecision: Joi.string(),   
    intershipMotivation: Joi.string(),
    birthDate: Joi.date(),               
    eduQuestSelectedDateTime: Joi.date(),
});

const createResourseFormSubmitionForm = Joi.object({
    firstName: Joi.string().required(), 
    lastName: Joi.string().required(),   
    age: Joi.number().required(),                                  
    email: Joi.string().required().email(),               
    gender: Joi.string().required(),              
    country: Joi.string(),                        
    occupation: Joi.string().required(),          
    sourceOfReferral: Joi.string().required(),    
    intershipMotivation: Joi.string().required(),
    birthDate: Joi.date().required(),    
    eduQuestSelectedDateTime: Joi.date().allow(null),
});

const bulkUpdatingResouces = Joi.object({
    contactIds: Joi.array().items(Joi.string()).required(),
    updates: updateResource
});

const bulkDeletingResouces = Joi.object({
    contactIds: Joi.array().items(Joi.string()).required(),
});

export default {
    createResourse,
    updateResource,
    bulkUpdatingResouces,
    bulkDeletingResouces,
    createResourseFormSubmitionForm
};

