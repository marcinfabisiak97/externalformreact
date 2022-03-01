import React, { useState } from 'react';
import TimeField from 'react-simple-timefield';
import Axios from 'axios';
const Form = () => {
    const [time, setTime] = useState('00:00:00')
    const [selected, setSelected] = useState("");
    const changeSelectOptionHandler = (event) => {
        setSelected(event.target.value);
    };
    const url = "https://frosty-wood-6558.getsandbox.com:443/dishes"
    const [data, setData] = useState({
        dish_name: "",
    })
    const submit = (e) => {
        e.preventDefault();
        Axios.post(url, {
            dish_name: data.dish_name
        })
            .then(res => {
                console.log(res.data)
            })
    }
    const handle = (e) => {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)
    }

    return (
        <section className='page'>
            <article className='page__contact'>
                <form className="form" onSubmit={(e) => submit(e)}>
                    <div className="form__row">
                        <label htmlFor="dish_name">dish name</label>
                        <input onChange={(e) => handle(e)} value={data.dish_name} type="text" placeholder='dish name' id="dish_name" required />
                    </div>

                    <button type="submit" className="btn block">
                        submit
                    </button>
                </form>
            </article>
        </section>
    );
};

export default Form;