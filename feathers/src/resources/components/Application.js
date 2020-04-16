import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainNavbar from './MainNavbar';
import Container from 'react-bootstrap/Container';
import Overlay from 'react-bootstrap/Overlay';
import Alert from 'react-bootstrap/Alert';
import LoginCard from './LoginCard';
import SignupCard from './SignupCard';
import Dimmer from './Dimmer';
import feathers, { services } from '../feathers';
import AboutPage from '../pages/about.page';
import FAQPage from '../pages/faq.page';
import ManagePage from '../pages/manage.page';
import MyProjectsPage from '../pages/myProjects.page';
import HomePage from '../pages/home.page';
import ProjectsPage from '../pages/projects.page';
import FeathersConfig from '../../../config/default.json'; 
import Footer from '../components/Footer';

const TYPE_LOGIN_MODAL = 'TYPE_LOGIN_MODAL';
const TYPE_SIGNUP_MODAL = 'TYPE_SIGNUP_MODAL';

// bootstrap contexts
const SUCCESS = 'success';
const DANGER = 'danger';

const Application = () => {

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [permissions, setPermissions] = useState([]);
    const [token, setToken] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [alertText, setAlertText] = useState('');
    const [alertType, setAlertType] = useState('');
    const [featuredProjects, setFeaturedProjects] = useState([]);

    const ref = useRef(null);

    const showLoginForm = () => {
        setShowModal(true);
        setModalType(TYPE_LOGIN_MODAL);
    };

    const showSignupForm = () => {
        setShowModal(true);
        setModalType(TYPE_SIGNUP_MODAL);
    };

    const closeModals = () => {
        setShowModal(false);
        setModalType(null);
    };

    const clearAlerts = () => {
        setAlertText('');
        setAlertType('');
    };

    const handleLoginClick = () => {
        showLoginForm();
    };

    const handleSignupClick = () => {
        showSignupForm();
    };

    const handleLogoutClick = () => {
        closeModals();
        logout();
    };

    const login = async ({ email, password }) => {
        try {
            setLoading(true);
            const payload = { strategy: 'local', email, password };
            const res = await feathers.authenticate(payload);
            setAlertText('Logged in!');
            setAlertType(SUCCESS);
            setUser(res.user);
            setPermissions(res.user.permissions);
            setToken(res.accessToken);
        } catch (error) {
            setAlertText(error.message);
            setAlertType(DANGER);
        } finally {
            closeModals();
            setLoading(false);
        }
    };

    const signup = async ({ first, last, email, college, password }) => {
        try {
            setLoading(true);
            const payload = { first, last, email, college, password };
            await services.users.create(payload);
            setAlertText('You can now login to your account');
            setAlertType(SUCCESS);
        } catch (error) {
            setAlertText(error.message);
            setAlertType(DANGER);
        } finally {
            closeModals();
            setLoading(false);
        }
    };

    const logout = async () => {
        await feathers.logout();
        document.location.href = '/';
    };

    const getFeaturedProjects = async() => {
        try {
            setLoading(true);
            const {data} = await services.projects.find({
                query: {
                    verified: true,
                    featured: true
                }
            });
            setFeaturedProjects(data); 
        } catch (error) {
            setAlertText(error.message);
            setAlertType(DANGER);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
    // hate to use this syntax here when everything else async/await
    // but it looks cleaner like this
        feathers.reAuthenticate().then(({ user, accessToken }) => {
            setUser(user);
            setToken(accessToken);
        });
        getFeaturedProjects();
    }, []);

    return (
        <div id="Application">
            <Router>
                <Dimmer open={showModal} />
                <MainNavbar
                    onLogoutClick={handleLogoutClick}
                    onLoginClick={handleLoginClick}
                    onSignupClick={handleSignupClick}
                    permissions={permissions}
                    loggedIn={token && user}
                />

                <Overlay
                    container={ref.current}
                    show={modalType === TYPE_LOGIN_MODAL && showModal}
                    placement="top-end"
                    onHide={() => closeModals()}
                    rootClose={true}
                >
                    {({
                        placement,
                        scheduleUpdate,
                        arrowProps,
                        outOfBoundaries,
                        show: _show,
                        ...props
                    }) => (
                        <div
                            {...props}
                            style={{
                                padding: '10px',
                                borderRadius: 2,
                                zIndex: 9999,
                                ...props.style
                            }}
                        >
                            <LoginCard handleSubmit={login} />
                        </div>
                    )}
                </Overlay>

                <Overlay
                    container={ref.current}
                    show={modalType === TYPE_SIGNUP_MODAL && showModal}
                    placement="top-end"
                    onHide={() => closeModals()}
                    rootClose={true}
                >
                    {({
                        placement,
                        scheduleUpdate,
                        arrowProps,
                        outOfBoundaries,
                        show: _show,
                        ...props
                    }) => (
                        <div
                            {...props}
                            style={{
                                padding: '10px',
                                borderRadius: 2,
                                zIndex: 9999,
                                ...props.style
                            }}
                        >
                            <SignupCard handleSubmit={signup} />
                        </div>
                    )}
                </Overlay>

                {FeathersConfig.development && <Container className="container-xl">
                    <Alert variant="info">
            This app if currently running in development mode.  
                    </Alert>          
                </Container>}

                {alertText && (
                    <Container className="container-xl">
                        <Alert variant={alertType} dismissible onClose={clearAlerts}>
                            {alertText}
                        </Alert>
                    </Container>
                )}

                <Switch>
                    <Route exact path="/" render={props => <HomePage {...props} featuredProjects={featuredProjects} />} />
                    <Route path="/faq" component={FAQPage} />
                    <Route path="/about" component={AboutPage} />
                    <Route path="/manage" component={ManagePage} />
                    <Route path="/projects" component={ProjectsPage} />
                    <Route path="/myprojects" component={MyProjectsPage} />
                </Switch>

                <Footer />
            </Router>
        </div>
    );
};

export default Application;
