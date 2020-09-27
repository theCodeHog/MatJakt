import React, { useEffect, useState } from "react";
import { Input } from "reactstrap";

export default function ProductSearchBar(props) {
    const [value, setValue] = useState('');
    const [options, setOptions] = useState([]);

    return (
        <Input
            className="col-12 justify-content-center matjakt-inputfield oblique small-inputfield"
            type="select"
            placeholder={props.placeholder}
            onChange={(e) => { props.handleChange(props.product, props.field, e.target.value) }} >
            <option defaultValue selected> {props.defaultOption}  </option>
            {props.options.map((x) => {
                return (<option value={x._id}> {x.value} </option>)
            })}
        </Input>
    );
}