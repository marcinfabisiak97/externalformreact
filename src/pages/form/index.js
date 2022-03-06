import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { change } from '../../features/order';
import { MdOutlineFastfood } from 'react-icons/md';
import { Field, reduxForm } from 'redux-form'

const Form = () => {
    const order = useSelector((state) => state.order.value);
    const dispatch = useDispatch()
    const types = [{ name: 'choose food', value: '' }, { name: 'pizza', value: 'pizza' }, { name: 'soup', value: 'soup' }, { name: 'sandwich', value: 'sandwich' }]
    const { type } = order
    const handleChange = (e) => {
        const value = e.target.value;
        dispatch(change({
            ...order,
            [e.target.diameter]: value,
            [e.target.name]: value,
            [e.target.preparation_time]: value,
            [e.target.type]: value,
            [e.target.no_of_slices]: value,
            [e.target.spiciness_scale]: value,
            [e.target.slices_of_bread]: value
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            diameter: parseInt(order.diameter),
            name: order.name,
            preparation_time: order.preparation_time,
            type: order.type,
            no_of_slices: parseInt(order.no_of_slices),
            spiciness_scale: parseInt(order.spiciness_scale),
            slices_of_bread: parseInt(order.slices_of_bread)
        };
        axios.post("https://frosty-wood-6558.getsandbox.com:443/dishes", userData).then((response) => {
            response(window.alert("Form filled properly!!!"))
        }).catch(error => {
            if (error.response) {
                window.alert("Wrong values in form")
            }
        })
    };
    return (
        <div className='page'>
            <form className="form" onSubmit={handleSubmit}>
                <MdOutlineFastfood size={70} />
                <h1>Order Form</h1>
                <div className="form__row">
                    <label htmlFor="name">dish name</label>
                    <Field
                        component='input'
                        onChange={handleChange}
                        value={order.name}
                        type="text"
                        placeholder='dish name'
                        id="name"
                        name='name'
                        required
                    />
                </div>
                <div className="form__row">
                    <label htmlFor="preparation_time">preparation time</label>
                    <Field
                        component='input'
                        className="form__field"
                        onChange={handleChange}
                        value={order.preparation_time}
                        name='preparation_time'
                        showSeconds={true}
                        placeholder="00:00:00"
                        required
                    />
                </div>
                <Field
                    className="form__select"
                    component='select'
                    onChange={handleChange}
                    name='type'
                    value={type}
                    required="required"
                >
                    {types.map((el, id) => <option key={id} value={el.value}>{el.name}</option>)}
                </Field>

                {type === "pizza" &&
                    <div className="form__row">
                        <label htmlFor="no_of_slices">number of slices</label>
                        <Field
                            component='input'
                            onChange={handleChange}
                            value={order.no_of_slices}
                            type="number"
                            placeholder='number of slices'
                            id="no_of_slices"
                            name='no_of_slices'
                            required
                        />
                        <label htmlFor="diameter">diameter</label>
                        <Field
                            component='input'
                            onChange={handleChange}
                            value={order.diameter}
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
                    <div className="form__row">
                        <label htmlFor="spiciness_scale">spiciness scale</label>
                        <Field
                            component='input'
                            onChange={handleChange}
                            value={order.spiciness_scale}
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
                    <div className="form__row">
                        <label htmlFor="slices_of_bread">slices of bread</label>
                        <Field
                            component='input'
                            onChange={handleChange}
                            value={order.slices_of_bread}
                            type="number"
                            placeholder='slices of bread'
                            id="slices_of_bread"
                            name='slices_of_bread'
                            min={1}
                            max={10}
                            required
                        />
                    </div>}
                <button type="submit" className="btn">
                    submit
                </button>
            </form>
        </div >
    );
};
export default reduxForm({
    form: 'formOrder',
    destroyOnUnmount: false,

})(Form)