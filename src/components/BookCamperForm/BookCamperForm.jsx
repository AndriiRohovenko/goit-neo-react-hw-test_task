import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './BookCamperForm.module.css';
import { useState } from 'react';

const BookingForm = () => {
  const initialValues = {
    name: '',
    email: '',
    bookingDate: '',
    comment: '',
  };

  const [showSuccess, setShowSuccess] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    bookingDate: Yup.date().required('Booking date is required'),
    comment: Yup.string(),
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log('Form submitted:', values);
    resetForm();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <>
      {showSuccess ? (
        <p className={styles.successMessage}>Booking submitted successfully!</p>
      ) : (
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Book your camper now!</h2>
          <p className={styles.formSubtitle}>
            Stay connected! We are always ready to help you.
          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className={styles.bookingForm}>
                <div className={styles.fieldWrapper}>
                  <label htmlFor="name">Name</label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name*"
                    className={styles.formInput}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className={styles.error}
                  />
                </div>
                <div className={styles.fieldWrapper}>
                  <label htmlFor="email">Email</label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email*"
                    className={styles.formInput}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={styles.error}
                  />
                </div>
                <div className={styles.fieldWrapper}>
                  <label htmlFor="bookingDate">Booking Date</label>
                  <Field
                    type="date"
                    id="bookingDate"
                    name="bookingDate"
                    className={styles.formInput}
                  />
                  <ErrorMessage
                    name="bookingDate"
                    component="div"
                    className={styles.error}
                  />
                </div>
                <div className={styles.fieldWrapper}>
                  <label htmlFor="comment">Comment</label>
                  <Field
                    as="textarea"
                    id="comment"
                    name="comment"
                    placeholder="Comment"
                    className={styles.formTextarea}
                  />
                </div>
                <button type="submit" className={styles.formButton}>
                  Send
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
};

export default BookingForm;
