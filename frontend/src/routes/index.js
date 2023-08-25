import config from '../config';
import LoginPage from '../pages/Auth/Login';
import RegisterPage from '../pages/Auth/Register';
import ChatPage from '../pages/Chat';
import EditPage from '../pages/Edit';
import HomePage from '../pages/HomePage';
import GroupPage from '../pages/Group';
import ProfilePage from '../pages/Profile';

const publicRoutes = [
    { path: config.home, component: HomePage },
    { path: config.login, component: LoginPage, layout: null },
    { path: config.register, component: RegisterPage, layout: null },
];

const privateRoutes = [
    { path: config.profile, component: ProfilePage },
    { path: config.edit, component: EditPage },
    { path: config.chat, component: GroupPage, layout: null },
    { path: config.message, component: ChatPage, layout: null },
];

export { publicRoutes, privateRoutes };
