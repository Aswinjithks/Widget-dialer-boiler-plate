import {ReactElement , useState} from 'react'


export function useEditWidget(steps: ReactElement[]){
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [width, setWidth] = useState(33.33);

    function next (){
        setCurrentStepIndex(i => {
            if(i >= steps.length - 1){
                return i ;
            } else {
                setWidth(33.33*(i+1));
                return i + 1;
            }
        })
    }
    function prev (){
        setCurrentStepIndex(i => {
            if(i <= 0){
                
                return i ;
            } else {
                setWidth(33.33*(i-1));
                return i - 1;
            }
        })
    }
    function goTo (index: number){
        setCurrentStepIndex(index);
    } 

    return {
        currentStepIndex ,
        step: steps[currentStepIndex],
        steps,
        isFirstStep: currentStepIndex === 0,
        isLastStep: currentStepIndex === steps.length - 1,
        next,
        prev,
        goTo,
        width
    }
}