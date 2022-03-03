import React, { useState } from 'react';
import TimeField from 'react-simple-timefield';
import axios from 'axios';
const Form = () => {
    const [time, setTime] = useState('00:00:00')
    const [selected, setSelected] = useState("");
    const changeSelectOptionHandler = (e) => {
        setSelected(e.target.value);
    };
    const types = ['choose food', 'pizza', 'soup', 'sandwich']
    const [state, setState] = useState({
        diameter: "",
        name: "",
        preparation_time: "",
        type: [],
        no_of_slices: "",
        spiciness_scale: "",
        slices_of_bread: ""
    });
    const { diameter, name, preparation_time, type, no_of_slices } = state
    const handleChange = (e) => {
        const value = e.target.value;
        console.log(state.type)
        setState({
            ...state,
            [e.target.diameter]: value,
            [e.target.name]: value,
            [e.target.preparation_time]: value,
            [e.target.type]: value,
            [e.target.no_of_slices]: value,
            [e.target.spiciness_scale]: value,
            [e.target.slices_of_bread]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            diameter: state.diameter,
            name: state.name,
            preparation_time: state.preparation_time,
            type: state.type,
            no_of_slices: state.no_of_slices,
            spiciness_scale: state.spiciness_scale,
            slices_of_bread: state.slices_of_bread
        };
        axios.post("https://reqres.in/api/users", userData).then((response) => {
            console.log(response.status);
            console.log(response.data);
        });
    };

    return (
        <section className='page'>
            <article className='page__contact'>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form__row">
                        <label htmlFor="name">dish name</label>
                        <input
                            onChange={handleChange}
                            value={state.name}
                            type="text"
                            placeholder='dish name'
                            id="name"
                            name='name'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="time">preparation time</label>
                        <TimeField
                            onChange={handleChange}
                            value={state.preparation_time}
                            name='preparation_time'
                            showSeconds={true}
                        />
                    </div>
                    <div>
                        <select onChange={handleChange} name='type' value={type}>
                            <option value="choose food">choose food</option>
                            <option value="pizza">pizza</option>
                            <option value="soup">soup</option>
                            <option value="sandwich">sandwich</option>
                        </select>
                    </div>
                    {type === "pizza" &&
                        <div>
                            <label htmlFor="no_of_slices">number of slices</label>
                            <input
                                onChange={handleChange}
                                value={state.no_of_slices}
                                type="number"
                                placeholder='number of slices'
                                id="no_of_slices"
                                name='no_of_slices'
                                required
                            />
                            <label htmlFor="diameter">diameter</label>
                            <input
                                onChange={handleChange}
                                value={state.diameter}
                                type="number"
                                placeholder='diameter'
                                id="diameter"
                                name='diameter'
                                max='50'
                                min='30'
                                step="10"
                                required
                            />
                        </div>}
                    {type === "soup" &&
                        <div>
                            <label htmlFor="spiciness_scale">spiciness scale</label>
                            <input
                                onChange={handleChange}
                                value={state.spiciness_scale}
                                type="number"
                                placeholder='spiciness scale'
                                id="spiciness_scale"
                                name='spiciness_scale'
                                min={1}
                                max={10}
                                required
                            />
                        </div>}
                    {type === "sandwich" &&
                        <div>
                            <label htmlFor="slices_of_bread">slices of bread</label>
                            <input
                                onChange={handleChange}
                                value={state.slices_of_bread}
                                type="number"
                                placeholder='slices of bread'
                                id="slices_of_bread"
                                name='slices_of_bread'
                                required
                            />
                        </div>}
                    <button type="submit" className="btn block">
                        submit
                    </button>
                </form>
            </article>
        </section>
    );
};

export default Form;