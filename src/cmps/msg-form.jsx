import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react"
import Select from "react-select";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

export function MsgForm({ msg, setMsg, addStoryMsg }) {

    const MsgSchema = Yup.object().shape({
        txt: Yup.string()
            .min(2, 'Too Short!')
            .max(20, 'Too Long!')
            .required('Required')
    })

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setMsg(prevMsg => {
            return { ...prevMsg, [field]: value }
        })
    }

    return <Formik
        initialValues={{
            txt: ''
        }}
        validationSchema={MsgSchema}
    >
        {({ errors, touched }) => (
            <Form className='msg-form'
            // onSubmit={addStoryMsg}
            >
                <Field
                    name="txt"
                    id="txt"
                    value={msg.txt}
                    onChange={handleChange}
                    placeholder="Your Msg"
                />
                {errors.txt && touched.txt ? (
                    <span>{errors.txt}</span>
                ) : null}

                <button onClick={addStoryMsg}>Add Story Msg</button>
            </Form>
        )}
    </Formik>
}