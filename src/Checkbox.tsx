import React from 'react'
import { Form, ToggleButton } from 'react-bootstrap';

interface ICheckbox{
    text: String;
    checked: boolean;
    changeHandler: (checked: boolean) => void;
}

export const Checkbox:React.FC<ICheckbox> = (props) => {

    const [value, setValue] = React.useState<boolean>(props.checked);

    const setChecked = (element) => {
        setValue(element.currentTarget.checked);
        props.changeHandler(element.currentTarget.checked)
    }

    return (
        <ToggleButton
            type="checkbox"
            variant="transparent"
            checked = {value}
            value = "1"
            onChange={(element) => {setChecked(element)}}
            style={{fontWeight: "bold", color: "lightgray"}}
            >
            {'  '}{props.text}
        </ToggleButton>
    );

}