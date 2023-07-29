import { register, login, verify, logout } from '../controllers/authRoutes.js';

const router = express.Router();


router.post('/register', register);
router.post('/login', login);
router.get('/profile', verify);
router.post('/logout', logout);


export default router;