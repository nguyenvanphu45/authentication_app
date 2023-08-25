import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DefaultLayout from './layout/DefaultLayout/DefaultLayout';
import { publicRoutes, privateRoutes } from './routes';

function App() {
    const isLogged = useSelector((state) => state.auth.isLogged);

    function requireAuth(nextState, replace, next) {
        if (!isLogged) {
            replace({
                pathname: '/login',
                state: { nextPathname: nextState.location.pathname },
            });
        }
        next();
    }

    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                                key={index}
                            />
                        );
                    })}
                    <Route path="*" element={<Navigate to="/login" />} />
                    {isLogged &&
                        privateRoutes.map((route, index) => {
                            const Page = route.component;
                            let Layout = DefaultLayout;

                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }

                            return (
                                <Route
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                    onEnter={requireAuth}
                                    key={index}
                                />
                            );
                        })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
