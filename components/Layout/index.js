import DefaultLayout from './DefaultLayout';

const Layout = (props) => {
    const {name} = props;

    switch (name) {
        case 'auth':
            return <AuthLayout {...props} />;

        default:
            return <DefaultLayout {...props} />;
    }
}

export default Layout;