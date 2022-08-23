import { useEffect, useState } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBIcon,
  MDBInput,
  MDBValidation,
  MDBBtn,
  MDBSpinner,
  MDBValidationItem,
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { GoogleLogin } from 'react-google-login';

import { login, authActions } from '../redux/features';

const initialState = {
  email: '',
  password: '',
};

function Login() {
  const { resetError } = authActions;
  const [formValue, setFormValue] = useState(initialState);
  const { email, password } = formValue;
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    error && toast.error(error);
    return () => {
      dispatch(resetError());
    };
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(login({ formValue, navigate, toast }));
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const googleSuccess = () => {};
  const googleFailure = () => {};

  return (
    <div
      style={{
        margin: 'auto',
        padding: '15px',
        maxWidth: '450px',
        alignContent: 'center',
        marginTop: '120px',
      }}
      className="login"
    >
      <MDBCard alignment="center">
        <MDBIcon fas icon="user-circle" className="fa-2x" />
        <h5>Sign In</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <MDBValidationItem
              feedback="please provide your email."
              invalid
              className="col-md-12"
            >
              <MDBInput
                label="Email"
                type="email"
                value={email}
                name="email"
                onChange={onInputChange}
                required
              />
            </MDBValidationItem>
            <MDBValidationItem
              feedback="please provide your password."
              invalid
              className="col-md-12"
            >
              <MDBInput
                label="Password"
                type="password"
                value={password}
                name="password"
                onChange={onInputChange}
                required
              />
            </MDBValidationItem>
            <div className="col-12">
              <MDBBtn
                style={{
                  width: '100%',
                }}
                className="mt-2"
              >
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Login
              </MDBBtn>
            </div>
          </MDBValidation>
          <br />
          <GoogleLogin
            clientId="..."
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
            render={(renderProps) => (
              <MDBBtn
                style={{ width: '100%' }}
                color={'danger'}
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <MDBIcon className="me-2" fab icon="google" /> Google Sign In
              </MDBBtn>
            )}
          />
        </MDBCardBody>
        <MDBCardFooter>
          <Link to={'/register'}>
            <p>Don't have an account? Sign Up</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
}

export default Login;
