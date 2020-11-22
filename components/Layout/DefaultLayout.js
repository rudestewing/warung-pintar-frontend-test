import Header from '../Header';

export default function DefaultLayout(props) {
    return (
        <div className="max-w-screen-md mx-auto bg-gray-200">
            <Header />
            <div className="py-5">
                {props.children}
            </div>
        </div>
    )
}