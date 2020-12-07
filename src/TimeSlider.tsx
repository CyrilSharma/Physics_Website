import React from 'react'
import { Form } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';

interface ISlider{
  text: String;
  min?: number;
  max?: number;
  initVal: number;
  changeHandler: (value: number, max: number | undefined, display?: boolean) => number;
}

export const TimeSlider:React.FC<ISlider> = (props) => {

    const [value, setValue] = React.useState(props.initVal);

    const changeHandler = (element) => {
        setValue(element.target.valueAsNumber);
        props.changeHandler(element.target.valueAsNumber, props.max)
    }
  
    return (
      <Form>
        <Form.Group>
          <Form.Label style={{fontWeight: "bold", color: 'lightgrey', marginBottom: 0}}>
             {props.text}
          </Form.Label>
          <RangeSlider
            min={props.min}
            max={props.max}
            value={value}
            onChange={(element) => {changeHandler(element)}}
            /* tooltipLabel={(value:number) => {
              let time: number = props.changeHandler(value, props.max, false)
              return time.toFixed(2)
            }} */
            tooltipStyle={{marginTop: 0, paddingTop: 0}}
            size="sm"
          />
        </Form.Group>
      </Form>
    );
  
};