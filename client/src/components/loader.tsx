import '../asset/scss/loader.scss';

export enum LoaderColor {
    green = 'green',
    blue = 'blue',
    white = 'white'
}

interface LoaderInterface {
    color?: LoaderColor
}

const Loader = (props: LoaderInterface) => {
    return (
        <div id="loader" className={`loader-container flex flex-column flex-center
            ${ props.color !== undefined && props.color}
        `}>
            <div className="square-container">
                <div className={ `square ${ props.color !== undefined && props.color }` }></div>
            </div>
        </div>
    );
}

export default Loader;