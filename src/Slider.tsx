import React from 'react'
import { Form } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

interface ISlider{
  text: String;
  min?: number;
  max?: number;
  initVal: number;
  changeHandler: (value: number, max: number | undefined) => void;
}

export const Slider:React.FC<ISlider> = (props) => {

    const [value, setValue] = React.useState(props.initVal);

    const changeHandler = (element) => {
        setValue(element.target.valueAsNumber);
        props.changeHandler(value, props.max);
    }
  
    return (
      <Form>
        <Form.Group>
          <Form.Label>
             {props.text}
          </Form.Label>
          <RangeSlider
            min={props.min}
            max={props.max}
            value={value}
            onChange={(element) => {changeHandler(element)}}
          />
        </Form.Group>
      </Form>
    );
  
};