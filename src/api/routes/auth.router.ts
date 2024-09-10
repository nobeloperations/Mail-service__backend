import Router from 'express';
import passport from 'passport';

const router = Router();

router.get( 
    '/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] }),
);
  
router.get(
    '/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/auth/google/unauthorized',
      successRedirect: '/api/contacts',
    }),
);
  
router.get(
    '/auth/google/unauthorized',
    (req, res) => res.sendStatus(401)
);
  
router.get(
    '/logout',
    (req, res) => {
        req.logout((err) => {
            if (err) {
                return res.sendStatus(500);
            }
            req.session.destroy(() => res.redirect('/'));
      });
    },
);

export default router;