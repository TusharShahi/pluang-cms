import type { NextPage } from 'next'
import { AuthService  } from '../src/services';
import { logout } from '../src/services/authService';
import HomeComponent from "../src/ui/components/Home";
import Cookies from 'cookies';

//Where should i keep this
export interface HomeProps {
  userLoggedIn : boolean, 
  getLoggedInUserData : any 
}

const Home: NextPage<HomeProps> = ( props : HomeProps ) => {


  return (<>
  <HomeComponent {...props}></HomeComponent>
    </>
    )
}

const checkMeFunction : (bearerToken : string) => Promise<HomeProps> = async (bearerToken : string) => {
  let userData : HomeProps = {
    userLoggedIn : false, 
    getLoggedInUserData : null
  }

  try {
    let getLoggedInUserData = await AuthService.meServer(bearerToken);
    console.log("getLoggedInUserData",getLoggedInUserData);
    userData = { userLoggedIn : true , getLoggedInUserData }
  }
    catch(error){
        console.log("Error in Me() method", error);
  }

  return userData;
}



export async function getServerSideProps(context : any)  {
  let props: HomeProps = {
    userLoggedIn : false, 
    getLoggedInUserData : null
  }
  const cookies = new Cookies(context.req, context.res);
  let cookieVal = cookies.get(AuthService.COOKIE_KEY);
  const cookie : string = context.req.headers.cookie;
  if(cookieVal){
    if(cookieVal!==undefined)
    props  = await checkMeFunction(cookieVal);
    if(!props.userLoggedIn){
      //Delete Cookie
      cookies.set(AuthService.COOKIE_KEY);

    }
  }
  console.log('props',props);
  return { props };
    
} 




export default Home
