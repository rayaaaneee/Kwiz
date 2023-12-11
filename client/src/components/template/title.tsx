import { Container, ContainerColor } from "./container";


interface TitleInterface {
    text: string;
    alignCenter?: boolean;

    style?: React.CSSProperties;
    color?: ContainerColor;
}

export const Title = (props: TitleInterface) => 
    (<Container color={ props.color }className="play-container" style={ props.style }>
        <h1 style={{ textAlign: (props.alignCenter === true ? 'center' : 'start')}}>{ props.text }</h1>
    </Container>)