import { GreenContainer } from "./green-container";


interface TitleInterface {
    text: string;
    alignCenter?: boolean;

    style?: React.CSSProperties;
}

export const Title = (props: TitleInterface) => 
    (<GreenContainer className="play-container" style={ props.style }>
        <h1 style={{ textAlign: (props.alignCenter === true ? 'center' : 'start')}}>{ props.text }</h1>
    </GreenContainer>)