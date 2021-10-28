import { useEffect , useState } from 'react';
import { AuthService } from '../../../services';
import LoginComponent from '../Login';
//import * as redux  from '../../../utils/redux';
import { useStateValue } from '../../../utils/redux';
import {USER_DETAILS} from '../../../utils/redux/actions';
import { useRouter } from 'next/router';

import { PATHS} from '../../../constants/routes';
import {HomeProps} from '../../../../pages/index';


const HomeComponent = (props : HomeProps): JSX.Element  => {
  const [storeState, dispatch] = useStateValue();
  const [userLoggedIn, setUserLoggedIn] = useState(props.userLoggedIn);
  const router = useRouter();
  console.log(props);
    //Has to be wrapped in useEffect, cannot setState of one component while rendering another
  
   useEffect(() => {
    dispatch({
      type: USER_DETAILS,
      payload: { user : props.getLoggedInUserData}
    });
  },[]);

  if(userLoggedIn){
    typeof window !== 'undefined' &&  router.push(PATHS.PROFILE);
  } 

  /*
  useEffect(() => {
    const checkMeFunction : () => void = async () => {
      console.log(AuthService.checkIfLoggedIn());
      if (AuthService.checkIfLoggedIn()) {
        try {
        let getLoggedInUserData = await AuthService.me();
        console.log("getLoggedInUserData",getLoggedInUserData);
        setUserLoggedIn(true);
        console.log(getLoggedInUserData);
        dispatch({
              type: USER_DETAILS,
              payload: getLoggedInUserData
          });
          router.push(PATHS.PROFILE);
        }
        catch(error){
            dispatch({
              type: USER_DETAILS,
              payload: null
            });
        }
        setUserLoggedIn(false);
      }
      else{
        setUserLoggedIn(false);
      }
    } 
    checkMeFunction();
  },[]); */

  return (<>
     {!userLoggedIn && <LoginComponent></LoginComponent>}
    </>
  );
}





export default HomeComponent;
