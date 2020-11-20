import Header from '../Header';
import Navigation from '../Navigation';

export default function DefaultLayout(props) {
    return (
        <div className="max-w-screen-md mx-auto bg-gray-200">
            <Header />
            <div className="py-10 p-3 md:p-5">
                {props.children}
            </div>

            <Navigation />
        </div>
    )
}