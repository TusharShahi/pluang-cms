
import {Form , Button} from 'react-bootstrap'
import {useState} from 'react';
import Validator from '../../../helpers/validators';
import { makeRequest , AuthService } from '../../../services';

import {ROUTES , PATHS} from '../../../constants/routes';
import { sha256 } from 'js-sha256';

import { useRouter } from 'next/router';

interface LoginResponseData {
    token: string,
    user: {
    active: boolean,
    createdAt: string,
    deleteAt: string,
    email: string,
    id: number,
    name: string,
    phone: string,
    resetKey: any, //Do not know
    resetKeyExpiry:  any, //Do not know
    roleIds: string[],
    roles: string[], //Can be typed better
    updatedAt: string
    }
}

    
interface ResponseData {
    data : LoginResponseData,
    success : boolean
}


const validateFields  = (email : string, password : string) : boolean => {
    return (Validator.validateEmail(email) && Validator.validatePassword(password));
}



const ArticleComponent = () : JSX.Element   => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true); 
  const [validationError, setValidationError ] = useState('');

  const router = useRouter()

  const submitForm : () => void = async () => {
    console.log(email,password);

    //Make request to login user


    AuthService.logout();
    //let result = await 
    //console.log(result);

    let result : ResponseData = await makeRequest({
        method: "POST",
        url: ROUTES.ADMIN_LOGIN,
        data: { email,
            password: sha256(password)
        }
    });
    console.log(result);
    let loginResponseData : LoginResponseData= result.data;
    console.log('cookie',document.cookie);
    //window.localStorage.setItem(AuthService.ACCESS_TOKEN_KEY, loginResponseData.token);
    //createCookieWithExpirationTime('tokenKey',loginResponseData.token);
    router.push(PATHS.PROFILE)

  }

  const changeFields : (fieldName : string , value : string) => void = (fieldName , value) => {

    if(fieldName === 'email'){
        if (validateFields(value,password)) {
            setButtonDisabled(false);
        }
        else  setButtonDisabled(true);
    }
    else {
        if (validateFields(email,value)) {
            setButtonDisabled(false);
        }
        else  setButtonDisabled(true);
    }
  }


  return (
    <div className="login-page-container">
    <div className="loginBox">
        <div className="adminLogo"/>
        <div className="loginArea">
            <Form onSubmit={(e) => e.preventDefault()}> 
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); changeFields('email' , e.target.value);}}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); changeFields('password' , e.target.value); }}/>
                </Form.Group>
                <Button
                    variant="primary" type="submit" onClick={submitForm}
                    disabled={buttonDisabled}>
                    Submit
                </Button>
            </Form>
            {/*<div className="forgotPass"><Link to={LOCAL.FORGOT}> Forgot Password?</Link></div>*/}
        
        </div>
    </div>
</div>
    )
}

export default ArticleComponent
