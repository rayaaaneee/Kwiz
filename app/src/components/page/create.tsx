import '../../css/page/create.css';
import { useParams } from 'react-router-dom';
import { InputText } from '../template/input-text';
import { GreenContainer } from '../template/green-container';
import { MainContainerPage } from '../template/main-container-page';
import { Button } from '../template/button';
import { Answer } from '../template/create/answer';
import { QuestionsRecap } from '../template/create/questions-recap';
import { ChangeEvent } from 'react';

import { useState } from 'react';

 const Create = (): JSX.Element => {

    const {id} = useParams();

    const [index, setIndex] = useState<number>(1);
    let titleText: string = "";

    if (id === undefined) {
        document.title = "Créer un quiz - Kwiz";
        titleText = "Nouveau quiz";
    } else {
        document.title = "Modifier un quiz - Kwiz";
        titleText = "Modifier le quiz";
    }

    return (
        <>
            <GreenContainer className="" children={
                    <h1>{titleText}</h1>
            }/>
            <MainContainerPage children={
                <>
                    <GreenContainer className="create-container theme-container flex-row align-center justify-start" children={
                        <>
                            <h1 className='no-bold'>Thème -</h1>
                            <InputText id="theme" placeholder="" value=""/>
                        </>
                    }/>
                    <GreenContainer className="create-container new-question-container flex-column flex-center" children={
                        <>
                            <div className="enter-question-container flex-row align-center justify-start">
                                <h1 className='no-bold'>Nouvelle Question -</h1>
                                <InputText id="question" placeholder="" value=""/>
                            </div>
                            <div className="grid-answers">
                            {[...Array(4)].map((_, i) => (
                                i += 1,
                                <Answer key={i} index={i} />
                            ))}
                            </div>
                            <Button id="validateQuestion" onClick={() => {}} text="OK"/>
                        </>
                    }/>
                    <GreenContainer className="create-container questions-container flex-column align-start justify-center" children={
                        <>
                            <h1 className='no-bold'>Questions du quizz :</h1>
                            <QuestionsRecap />
                        </>
                    }/>
                    <div className="validate-button-container flex align-center justify-end">
                        <Button id="validate" onClick={() => {}} text="Valider"/>
                    </div>
                </>
            }/>
        </>
    );
}

export default Create;