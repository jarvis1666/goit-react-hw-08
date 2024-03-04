
import { register } from "../../redux/auth/operations";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useId } from "react"; 
import css from '../RegisterForm/RegisterForm.module.css'

export const RegisterForm = () => {
    const emailId = useId();
    const passwordId = useId();
    const nameId = useId();
    const dispatch = useDispatch();
      

    const userSchema = Yup.object().shape(
        {
            email: Yup.string()
                .min(10, 'E-mail повинен містити не менше 10 символів!')
                .max(50, 'E-mail повинен містити не більше 50 символів!')
                .required('Рядок є обовʼязковим до заповнення!'),
            password: Yup.string()
                .min(3, 'Пароль повинен містити не менше 3 символів!')
                .max(50, 'Пароль повинен містити не більше 50 символів!')
                .required('Рядок є обовʼязковим до заповнення!'),
            name: Yup.string()
                .min(2, 'Імʼя повинне містити не менше 2 символів!')
                .max(50, 'Імʼя повинне містити не більше 50 символів!')
                .required('Рядок є обовʼязковим до заповнення!')
        }
    )
    return (
        <>
            <Formik initialValues={{
                    name: '',
                    email: '',
                    password: ''
            }}
                validationSchema={userSchema}
                onSubmit={(values, actions) => {
                    // console.log(values.email);
                    dispatch(register({
                    name: values.name,
                    email: values.email,
                    password: values.password,
                }))
                    .unwrap()
                    .then(() => { console.log('Регістрація виконана успішно'); })
                    .catch(() => { console.log('Помилка регістрації'); });
                actions.resetForm();
            }}
            >
                <Form className={css.containerFormReg}>
                    <div className={css.elemFormReg}>
                        <label htmlFor={nameId}>Name</label>
                        <Field type='text' name="name" id={nameId} className={css.fildFormReg}></Field>
                        <ErrorMessage name="name" component="span" className={css.errorReg}></ErrorMessage>
                    </div>
                    <div className={css.elemFormReg}>
                        <label htmlFor={emailId}>Email</label>
                        <Field type='email' name="email" id={emailId} className={css.fildFormReg}></Field>
                        <ErrorMessage name="email" component="span" className={css.errorReg}></ErrorMessage>
                    </div>
                     <div className={css.elemFormReg}>
                        <label htmlFor={passwordId}>Password</label>
                        <Field type='password' name="password" id={passwordId} className={css.fildFormReg}></Field>
                        <ErrorMessage name="password" component="span" className={css.errorReg}></ErrorMessage>
                    </div>
                    <button type="submit">Register</button>
                </Form>
            </Formik>
        </>
        
    )
}