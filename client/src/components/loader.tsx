import '../asset/css/loader.scss';

interface LoaderInterface {
}

const Loader = (props: LoaderInterface) => {
    return (
        <div id="loader" className="container">
            <div className="square-container">
                <div className="square"></div>
            </div>
        </div>
    );
}

export default Loader;