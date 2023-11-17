interface QuestionInterface {
    index: number, 
    question: string, 
    selectedIndex: number, 
    onClick: (index: number) => void
}

export const Question = (props: QuestionInterface) => {
    return (
        <p onClick={() => props.onClick(props.index)} className={props.selectedIndex == props.index ? 'selected' : ''}>{props.index} - {props.question}</p>
    );  
}