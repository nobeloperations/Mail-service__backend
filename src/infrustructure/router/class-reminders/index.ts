import Router from 'express';

import ClassReminderController from './controllers/index';
import classRemindersDataSchema from './requested-schema';

import requestBodyValidator from '../../../api/middlewares/request-body-validator';


const router = Router();

router.post(
    '/set-class-reminders', 
    requestBodyValidator(classRemindersDataSchema),
    ClassReminderController.setClassReminders,
);

router.post(
    '/delete-class-reminders', 
    ClassReminderController.deleteClassRemindersByCourseIdentifier,
);

export default router;