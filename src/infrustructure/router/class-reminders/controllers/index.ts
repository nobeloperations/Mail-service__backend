import { Request, Response } from 'express';
import ClassReminderService from '../services/index';

const setClassReminders = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        await ClassReminderService.setClassReminders(data);
    
        res.status(200).send('OK');
    } catch(e) {
        console.log(e);
        res.status(500).send('Server error');
    }
};

const deleteClassRemindersByCourseIdentifier = async (req: Request, res: Response) => {
    try {
        const { courseIdentifier } = req.body;
        console.log(courseIdentifier);
        await ClassReminderService.deleteClassRemindersByCourseIdentifier(courseIdentifier);
    
        res.status(200).send('OK');
    } catch(e) {
        console.log(e);
        res.status(500).send('Server error');
    }
};

export default {
    setClassReminders,
    deleteClassRemindersByCourseIdentifier,
};