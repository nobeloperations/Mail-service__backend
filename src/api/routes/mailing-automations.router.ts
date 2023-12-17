import Router from 'express';

const router = Router();

router.get('mailing-automations');

router.post('mailing-automations');

router.get('mailing-automations/:id');

router.put('mailing-automations/:id');

router.delete('mailing-automations/:id');

router.post('mailing-automations/:id/add-contacts');

router.post('mailing-automations/:id/remove-contacts');

export default router;