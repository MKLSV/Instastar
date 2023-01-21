
import { Formik, Form, Field } from 'formik';

export function MsgForm({ comment, setComment, addStoryComment }) {
    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setComment(prevMsg => {
            return { ...prevMsg, [field]: value }
        })
    }

    return <Formik
        initialValues={{
            txt: ''
        }}
    >
        {({ errors, touched }) => (
            <Form className='msg-form'
                onSubmit={addStoryComment}
            >
                <Field className='msg-input'
                    name="txt"
                    id="txt"
                    value={comment.txt}
                    onChange={handleChange}
                    placeholder="Add a comment..."
                />
                {errors.txt && touched.txt ? (
                    <span>{errors.txt}</span>
                ) : null}
            </Form>
        )}
    </Formik>
}