export const Question = (props: {index: number, question: string, selectedIndex: number, onClick: (index: number) => void}) => {
    return (
        <p onClick={() => props.onClick(props.index)} className={props.selectedIndex == props.index ? 'selected' : ''}>{props.index} - {props.question}</p>
    );  
}